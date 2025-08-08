# WebNav Hub

WebNav Hub 是一个现代化的网址导航网站，汇集了各种类型的网站链接，包括 AI 搜索工具、社交媒体、实用工具、科技资讯、云存储和电子邮件服务等。

## 🌟 特性

- **现代化设计**：采用玻璃拟态设计风格，具有流畅的动画效果和响应式布局
- **分类导航**：将网站链接按类别组织，便于快速查找所需资源
- **响应式布局**：适配各种设备屏幕尺寸，包括桌面端、平板和手机
- **平滑滚动**：点击导航链接时平滑滚动到相应内容区域
- **直观界面**：卡片式设计，每个链接都有图标和标题，易于识别

## 📁 项目结构

```
.
├── index.html      # 主页面文件
├── style.css       # 样式表文件
├── main.js         # JavaScript 脚本文件
├── manifest.json   # PWA配置文件
├── sw.js           # Service Worker文件
├── data/
│   └── navData.json # 导航数据文件（备份）
├── icons/          # PWA图标文件夹
│   └── icon.svg     # SVG格式的网站图标
└── README.md       # 项目说明文件
```

## 🚀 快速开始

1. 克隆或下载本项目到本地
2. 在浏览器中打开 `index.html` 文件即可使用（推荐使用本地服务器）

## 🎨 设计特点

- **玻璃拟态设计**：卡片采用半透明背景和毛玻璃效果
- **深色主题**：深色背景配合橙色高亮，减少眼部疲劳
- **悬停效果**：鼠标悬停时卡片有提升和发光效果
- **渐变背景**：页面背景采用径向渐变，增强视觉层次感

## 📱 响应式设计

项目针对不同屏幕尺寸进行了优化：
- 桌面端：多列网格布局
- 平板端：适中的网格列数
- 手机端：单列布局，便于触控操作

## 🛠 技术栈

- HTML5
- CSS3（包括 Flexbox 和 Grid 布局）
- JavaScript（ES6+）
- Font Awesome 图标库
- PWA（渐进式Web应用）支持
- SVG图标

## 🔧 技术改进

本项目已实施以下技术改进建议：

1. **代码组织**
   - 将大量的链接数据分离到单独的JSON文件中（`data/navData.json`作为备份）
   - 使用JavaScript动态生成链接卡片
   - 为兼容本地文件访问，数据已内联到 `main.js` 中

2. **响应式优化**
   - 进一步优化移动端体验
   - 添加PWA支持，允许用户安装为应用
   - 使用SVG图标，在所有分辨率下都保持清晰

3. **可访问性**
   - 添加ARIA标签提高可访问性
   - 改善屏幕阅读器支持
   - 添加键盘导航支持

## 📂 网站分类

1. **AI搜索**：各种人工智能搜索引擎和工具
2. **社交媒体**：主流社交平台和相关工具
3. **实用工具**：各种在线工具和服务
4. **科技资讯**：科技新闻和资讯网站
5. **云存储**：在线存储服务
6. **电子邮箱**：邮件服务提供商

## 🛠 管理和自定义

### 添加/删除分类

要添加新的分类，请修改 `main.js` 文件中的 `navData` 对象：

```javascript
{
  "id": "new-category",           // 分类ID（用于URL锚点）
  "title": "新分类名称",           // 分类显示名称
  "links": [                      // 该分类下的链接列表
    // 链接对象...
  ]
}
```

要删除分类，只需从 `navData.categories` 数组中移除相应的分类对象。

同时需要更新 `index.html` 中的导航菜单：

```html
<nav>
  <ul>
    <li><a href="#ai-search" class="active">Ai搜索</a></li>
    <li><a href="#social">社交媒体</a></li>
    <li><a href="#tools">实用工具</a></li>
    <li><a href="#tech-news">科技资讯</a></li>
    <li><a href="#cloud-storage">云存储</a></li>
    <li><a href="#email">电子邮箱</a></li>
    <li><a href="#new-category">新分类名称</a></li> <!-- 添加新分类链接 -->
  </ul>
</nav>
```

### 添加/删除链接

要添加新链接，在相应分类的 `links` 数组中添加新的链接对象：

```javascript
{
  "url": "https://example.com",    // 链接地址
  "icon": "fa-solid fa-star",      // Font Awesome图标类名
  "title": "示例网站"              // 链接显示名称
}
```

要删除链接，只需从相应分类的 `links` 数组中移除链接对象。

### 图标选择

项目使用 [Font Awesome](https://fontawesome.com/icons) 图标库。您可以从以下类别中选择合适的图标：
- `fa-solid` (fas) - 实心图标
- `fa-regular` (far) - 空心图标
- `fa-brands` (fab) - 品牌图标

## ☁️ 免费部署

### Cloudflare Pages 部署步骤

1. 将项目推送到 GitHub 仓库
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
3. 点击 "Create a project"
4. 选择您的 GitHub 仓库
5. 配置以下设置：
   - **Project name**: webnav-hub
   - **Build command**: (留空，这是静态网站)
   - **Build output directory**: /
6. 点击 "Save and Deploy"
7. 等待部署完成，获得您的网站URL

### GitHub Pages 部署步骤

1. 将项目推送到 GitHub 仓库
2. 在仓库页面点击 "Settings"
3. 在左侧菜单中选择 "Pages"
4. 在 "Source" 部分选择 "Deploy from a branch"
5. 选择分支（通常是 main 或 master）
6. 选择根目录 (/)
7. 点击 "Save"
8. 等待部署完成，通常在 `https://<username>.github.io/<repository>/` 访问

### Vercel 部署步骤

1. 将项目推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com/)
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. 保持默认设置：
   - **Build Command**: (留空)
   - **Output Directory**: (留空)
   - **Install Command**: (留空)
6. 点击 "Deploy"
7. 等待部署完成，获得您的网站URL

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进本项目。

## 📄 许可证

© 2025 WebNav Hub. 保留所有权利。