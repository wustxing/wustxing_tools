# 🛠️ 工具导航站

一个现代化的工具导航网站，帮助开发者、设计师和职场人士快速发现和使用优质的在线工具。

## ✨ 特性

- 🎨 **现代化设计** - 采用现代化的 UI 设计，支持深色/浅色主题切换
- 🔍 **智能搜索** - 支持工具名称和描述的实时搜索
- 🏷️ **标签筛选** - 多维度标签筛选，快速定位所需工具
- 📱 **响应式布局** - 完美适配桌面和移动设备
- ⭐ **收藏功能** - 支持收藏常用工具，数据本地存储
- 📊 **分类管理** - 按开发工具、设计工具、效率工具等分类展示
- 🔄 **视图切换** - 支持网格视图和列表视图切换
- 🌐 **详情展示** - 点击工具卡片查看详细信息和功能介绍

## 🚀 快速开始

### 本地运行

1. 克隆项目：
```bash
git clone https://github.com/wustxing/wustxing_tools.git
cd wustxing_tools
```

2. 直接用浏览器打开 `index.html` 文件，或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

3. 访问 `http://localhost:8000` 即可使用。

### 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://username.github.io/wustxing_tools`

## 📁 项目结构

```
wustxing_tools/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── data.js         # 工具数据
│   └── app.js          # 主要逻辑
└── README.md           # 项目文档
```

## 🎯 功能说明

### 分类浏览
- **开发工具** - 编程、调试、版本控制等开发相关工具
- **设计工具** - UI/UX 设计、原型制作、平面设计等工具
- **效率工具** - 项目管理、团队协作、知识管理等工具
- **实用工具** - AI 助手、数据分析、在线工具等

### 搜索和筛选
- 实时搜索工具名称和描述
- 多标签组合筛选
- 分类快速切换
- 网格/列表视图切换

### 交互功能
- 点击工具卡片查看详细信息
- 收藏常用工具（数据保存在本地）
- 一键访问工具官网
- 分享工具功能
- 深色/浅色主题切换

## 🛠️ 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代 CSS 特性，CSS Grid、Flexbox
- **Vanilla JavaScript** - 原生 ES6+ JavaScript
- **Web Storage** - 本地数据存储
- **响应式设计** - 移动优先设计

## 📝 添加新工具

要添加新工具，只需编辑 `js/data.js` 文件中的 `toolsData` 数组：

```javascript
{
    id: 16, // 唯一ID
    title: "工具名称",
    description: "工具描述",
    icon: "🔧", // emoji 图标
    category: "development", // 分类：development/design/productivity/utility
    tags: ["标签1", "标签2"], // 搜索标签
    url: "https://example.com", // 工具官网
    features: ["功能1", "功能2"], // 主要功能
    rating: 4.5 // 评分 (1-5)
}
```

## 🎨 自定义样式

所有样式变量都定义在 `css/style.css` 的 `:root` 选择器中，支持深色主题：

```css
:root {
    --primary-color: #4f46e5;
    --background: #ffffff;
    --text-primary: #1e293b;
    /* ... */
}

[data-theme="dark"] {
    --primary-color: #6366f1;
    --background: #0f172a;
    --text-primary: #f1f5f9;
    /* ... */
}
```

## 📈 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有开源工具的开发者们！

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
