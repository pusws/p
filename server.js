const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8000;

// MIME类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  // 默认页面
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // 安全检查，防止路径遍历
  if (filePath.includes('..')) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Forbidden');
    return;
  }
  
  // 构建完整的文件路径
  filePath = path.join(process.cwd(), filePath);
  
  // 获取文件扩展名
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // 读取文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件未找到
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
      } else {
        // 其他错误
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500 Internal Server Error');
      }
    } else {
      // 成功读取文件
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Current directory: ${process.cwd()}`);
});