const CACHE_VERSION = 'v3';
const STATIC_CACHE = `webnav-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `webnav-runtime-${CACHE_VERSION}`;
const RUNTIME_CACHE_LIMIT = 60;

// 同源资源使用相对路径，便于部署在主域或子目录（如 GitHub Pages）下
const PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './manifest.json',
  './favicon.svg',
  './icons/icon.svg',
  './data/navData.json'
];

// 安装事件 - 预缓存应用外壳；单个资源失败不影响整体安装
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.allSettled(PRECACHE_URLS.map(url => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

// 激活事件 - 清理旧版本缓存并立即接管页面
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
          .map(name => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(
    keys.slice(0, keys.length - maxEntries).map(key => cache.delete(key))
  );
}

// 文档导航：网络优先，离线时回退到缓存的应用外壳
async function networkFirst(request) {
  const cache = await caches.open(STATIC_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return (
      (await cache.match(request)) ||
      (await cache.match('./index.html')) ||
      (await cache.match('./')) ||
      Response.error()
    );
  }
}

// 静态资源与第三方资源：先用缓存立即响应，同时后台更新
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then(response => {
      // 跨域资源（如 Font Awesome）常是 opaque 响应，仍然缓存但按需过期
      if (response.ok || response.type === 'opaque') {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || network;
}

// 获取事件 - 拦截网络请求
self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  event.respondWith(
    staleWhileRevalidate(request, RUNTIME_CACHE).then(response => {
      trimCache(RUNTIME_CACHE, RUNTIME_CACHE_LIMIT);
      return response;
    })
  );
});
