# 海拓商通官网 - 项目架构文档

> 本文档用于快速了解项目全局规范和架构，便于AI助手在新会话中快速上手。

---

## 1. 项目概览

### 1.1 项目简介
杭州海拓商通国际贸易有限公司官方网站，支持中文、日文、英文三种语言。

### 1.2 核心特性
- ✅ 多语言支持（中/日/英）
- ✅ 响应式设计（移动端/桌面端）
- ✅ 纯静态HTML，无后端依赖
- ✅ 国际化系统完善
- ✅ 组件化架构（已启用）
- ✅ 滚动动画效果

---

## 2. 技术栈概览

| 类别 | 技术选型 | 版本/说明 |
|------|---------|-----------|
| **核心语言** | HTML5, CSS3, JavaScript (ES6+) | 原生实现 |
| **UI框架** | Tailwind CSS | CDN版本 |
| **图标库** | Font Awesome | 4.7.0 |
| **字体** | Google Fonts | Noto Sans SC/JP |
| **构建工具** | 无 | 纯静态文件 |
| **包管理器** | 无 | 无npm依赖 |
| **状态管理** | localStorage + 全局变量 | 简单实现 |
| **HTTP请求** | 原生 fetch() | 用于加载语言文件和组件 |

---

## 3. 目录结构说明

```
e:\Haituo\海拓网站开发\
│
├── index.html              # 首页（包含英雄区动画、滚动显示动画等特殊样式）
├── about.html              # 公司简介页
├── business.html           # 业务介绍页
├── contact.html            # 联系方式页
│
├── i18n.js                 # 国际化核心脚本（重要！）
├── components-loader.js    # 组件加载器（已在所有页面启用）
│
├── assets/images/          # 静态资源目录
│   ├── logo1.png          # 公司Logo 1
│   └── logo2.png          # 公司Logo 2
│
├── components/             # 公共组件目录（已启用）
│   ├── header.html         # 导航栏组件
│   └── footer.html         # 页脚组件
│
├── locales/                # 语言文件目录
│   ├── zh-CN.json          # 中文翻译文件
│   ├── ja.json             # 日文翻译文件
│   └── en.json             # 英文翻译文件
│
├── .trae/
│   ├── documents/
│   │   ├── PROJECT_ARCHITECTURE.md
│   │   └── 多语言静态HTML页面国际化优化方案.md
│   └── specs/
│       └── project-remediation-001/  # 整改方案文档
│           ├── spec.md
│           ├── tasks.md
│           └── checklist.md
│
└── 启动官网.bat             # Windows启动脚本
```

---

## 4. 核心开发规范

### 4.1 如何添加新页面

#### 步骤1：创建HTML文件
在根目录创建新页面文件，例如 `news.html`，参考现有页面结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>新闻资讯 - 杭州海拓商通国际贸易有限公司</title>
    
    <!-- 必引入：Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- 必引入：Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    
    <!-- 必引入：Tailwind配置（与其他页面保持一致） -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3A4750',
                        secondary: '#F8F9FA',
                        accent: '#7A8B9C',
                        text: '#333333',
                        lightText: '#666666'
                    },
                    fontFamily: {
                        sans: ['Noto Sans SC', 'Noto Sans JP', 'Noto Sans', 'sans-serif']
                    }
                }
            }
        }
    </script>
    
    <!-- 自定义工具类 -->
    <style type="text/tailwindcss">
        @layer utilities {
            .content-auto { content-visibility: auto; }
            .text-balance { text-wrap: balance; }
            .transition-smooth { transition: all 0.5s ease-in-out; }
        }
    </style>
    
    <!-- 自定义样式 -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans:wght@300;400;500;700&display=swap');
        
        body {
            font-family: 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans', sans-serif;
            background-color: #F8F9FA;
        }
        
        /* 复制其他页面的公共样式 */
        .nav-link { ... }
        .btn-primary { ... }
        .lang-switcher a { ... }
        .preserve-newlines { white-space: pre-line; }
        
        /* 滚动动画样式 */
        .card-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .card-animate.visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
    
    <!-- 必引入：国际化脚本 -->
    <script src="i18n.js"></script>
</head>
<body class="text-text">
    <!-- 导航栏占位符 -->
    <div id="header-placeholder"></div>

    <!-- 页面内容 -->
    <section class="pt-32 pb-16 bg-white">
        <div class="container mx-auto px-4 md:px-8">
            <div class="max-w-5xl mx-auto">
                <h1 data-i18n="pages.news.hero.title">新闻资讯</h1>
                <p data-i18n="pages.news.hero.description">最新动态</p>
            </div>
        </div>
    </section>

    <!-- 页脚占位符 -->
    <div id="footer-placeholder"></div>

    <!-- 必引入：组件加载器 -->
    <script src="components-loader.js"></script>
    
    <!-- 滚动动画脚本 -->
    <script>
        // 滚动显示动画检测函数
        function checkScroll() {
            const windowHeight = window.innerHeight;
            const scrollTriggerPoint = windowHeight * 0.85;

            // 检测各区块
            const sections = [
                { id: 'philosophy-section', selector: null },
                { id: 'business-section', selector: '.card-animate' },
                { id: 'contact-section', selector: null },
                { id: 'footer-section', selector: null }
            ];

            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (!element) return;

                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;

                // 如果区块进入视口
                if (elementTop < scrollTriggerPoint) {
                    element.classList.add('visible');

                    // 如果有子元素需要依次动画
                    if (section.selector) {
                        const children = element.querySelectorAll(section.selector);
                        children.forEach(child => {
                            child.classList.add('visible');
                        });
                    }
                }
            });
        }

        // 初始检查
        window.addEventListener('load', checkScroll);
        // 滚动时检查
        window.addEventListener('scroll', checkScroll);
        // 窗口大小改变时检查
        window.addEventListener('resize', checkScroll);
    </script>
</body>
</html>
```

#### 步骤2：添加翻译内容
在 `locales/` 目录下的3个JSON文件中添加新页面的翻译：

```json
{
  "pages": {
    "news": {
      "title": "新闻资讯 - 杭州海拓商通国际贸易有限公司",
      "navigation": {
        "home": "首页",
        "about": "公司简介",
        "business": "业务介绍",
        "news": "新闻资讯",
        "contact": "联系方式"
      },
      "hero": {
        "title": "新闻资讯",
        "description": "最新动态"
      }
    }
  }
}
```

#### 步骤3：更新导航链接
在 `components/header.html` 中添加新页面链接：
```html
<a href="news.html" class="nav-link text-sm font-light tracking-wider" data-i18n="pages.index.navigation.news">新闻资讯</a>
```

---

### 4.2 如何添加新的翻译文本

#### 方式1：data-i18n属性（推荐）
```html
<!-- 在HTML中 -->
<h2 data-i18n="pages.about.section.title">我们的团队</h2>

<!-- 在JSON中 -->
{
  "pages": {
    "about": {
      "section": {
        "title": "我们的团队"
      }
    }
  }
}
```

#### 方式2：支持数组索引
```html
<!-- HTML中 -->
<li data-i18n="pages.business.services.items[0].title">商务咨询</li>

<!-- JSON中 -->
{
  "pages": {
    "business": {
      "services": {
        "items": [
          { "title": "商务咨询" }
        ]
      }
    }
  }
}
```

---

### 4.3 如何调用后端API（当前无后端）

**重要：项目目前是纯静态，没有后端API！**

如果未来需要添加API请求，参考现有 `fetch()` 的使用方式：

```javascript
// 参考 i18n.js:64-92
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('请求失败:', error);
        // 降级处理
        return null;
    }
}
```

---

### 4.4 样式规范

#### 优先使用Tailwind CSS类
```html
<!-- 好的写法 -->
<div class="container mx-auto px-4 py-8 bg-white rounded-sm">
    
<!-- 避免过度使用自定义CSS -->
```

#### 自定义CSS类命名约定
- 使用小写连字符：`.nav-link`, `.btn-primary`
- 功能导向命名，而非样式导向：
  - ✅ `.nav-link`（导航链接）
  - ❌ `.blue-text`（蓝色文字）

#### 颜色规范
```javascript
// 固定颜色值，不要随意修改
colors: {
    primary: '#3A4750',      // 深灰蓝 - 页脚
    secondary: '#F8F9FA',    // 浅灰 - 卡片背景
    accent: '#7A8B9C',       // 灰蓝 - 强调色/按钮
    text: '#333333',         // 正文
    lightText: '#666666'     // 次要文本
}
```

---

### 4.5 JavaScript编码规范

#### 变量命名
- 驼峰命名法（camelCase）：`currentLang`, `loadLanguage`
- 常量全大写下划线：`DEFAULT_LANG = 'zh-CN'`

#### 注释规范
```javascript
/**
 * 函数说明
 * @param {string} param - 参数说明
 * @returns {type} 返回值说明
 */
function example(param) {
    // 行内注释
    return result;
}
```

#### 错误处理
```javascript
try {
    // 操作
} catch (error) {
    console.error('错误描述:', error);
    // 提供降级方案
}
```

---

## 5. 核心文件详解

### 5.1 i18n.js - 国际化核心

**文件位置**: `e:\Haituo\海拓网站开发\i18n.js`

**核心类**: `I18n`

| 方法 | 功能 | 参数 |
|------|------|------|
| `constructor()` | 初始化 | 无 |
| `loadLanguage(lang)` | 加载语言文件 | `lang`: 语言代码 ('zh-CN', 'ja', 'en') |
| `translate(key)` | 获取翻译文本 | `key`: 翻译键 (如 'pages.index.hero.title') |
| `saveLanguagePreference(lang)` | 保存语言偏好 | `lang`: 语言代码 |
| `loadLanguagePreference()` | 读取语言偏好 | 无 |
| `bindLanguageSwitchers()` | 绑定语言切换器事件 | 无 |
| `renderTranslations()` | 渲染所有翻译内容 | 无 |
| `renderNavigation()` | 渲染导航栏翻译 | 无 |
| `renderFooter()` | 渲染页脚翻译 | 无 |

**使用方式**:
```javascript
// 全局实例已自动创建在 window.i18n
console.log(window.i18n.translate('footer.company'));
```

### 5.2 components-loader.js - 组件加载器（已启用）

**文件位置**: `e:\Haituo\海拓网站开发\components-loader.js`

**功能**: 通过 Fetch API 动态加载 header.html 和 footer.html 组件（已在所有4个页面启用）

**核心函数**:

| 函数 | 功能 | 参数 |
|------|------|------|
| `loadHeader(currentPage)` | 加载导航栏组件 | `currentPage`: 当前页面名称 |
| `loadFooter()` | 加载页脚组件 | 无 |
| `loadComponents(currentPage)` | 加载所有组件 | `currentPage`: 当前页面名称 |
| `setActiveNavLink(currentPage)` | 设置导航高亮 | `currentPage`: 当前页面名称 |
| `bindMobileMenu()` | 绑定移动端菜单 | 无 |

**组件文件位置**:
- `components/header.html` - 导航栏组件
- `components/footer.html` - 页脚组件

**使用方式**:
1. 在HTML页面中添加占位符:
```html
<div id="header-placeholder"></div>
<main>
    <!-- 页面内容 -->
</main>
<div id="footer-placeholder"></div>
```

2. 在页面底部引入并调用:
```html
<script src="components-loader.js"></script>
```

**状态**: 该组件化方案已在所有4个页面（index.html, about.html, business.html, contact.html）中启用。

---

### 5.3 locales/*.json - 语言文件结构

```json
{
  "version": "1.0",
  "lastModified": "2026-02-15",
  "pages": {
    "index": { ... },    // 首页
    "about": { ... },    // 公司简介
    "business": { ... }, // 业务介绍
    "contact": { ... }   // 联系方式
  },
  "footer": {
    "company": "...",       // 公司名称
    "copyright": "...",     // 版权信息（原 companyFull）
    "navigation": "...",    // 导航
    "contact": "...",       // 联系我们
    "follow": "...",        // 关注我们
    "contactInfo": { ... }  // 联系信息
  },
  "language": { ... }    // 语言切换器
}
```

---

## 6. 已知技术债与注意事项

### ⚠️ 技术债清单

| 优先级 | 问题 | 说明 |
|-------|------|------|
| **中** | 无构建工具 | 资源未优化，CDN依赖 |
| **低** | 图片API生成 | 图片每次加载都调用AI生成API |

### 📌 特别注意

1. **不要修改Tailwind配置的颜色值** - 所有页面共享同一套配色
2. **添加新翻译时要同步更新3个JSON文件** - zh-CN.json, ja.json, en.json
3. **localStorage仅用于存储语言偏好** - 不要存储其他敏感数据
4. **图片URL使用AI生成API** - 如需替换为静态图片，直接修改src属性即可

---

## 7. 快速参考

### 7.1 页面路由
| 页面 | URL | 功能 |
|------|-----|------|
| 首页 | index.html | 公司展示 |
| 公司简介 | about.html | 公司介绍、团队 |
| 业务介绍 | business.html | 服务详情 |
| 联系方式 | contact.html | 联系信息、分支机构、FAQ |

### 7.2 语言代码
| 语言 | 代码 |
|------|------|
| 中文 | zh-CN |
| 日文 | ja |
| 英文 | en |

### 7.3 localStorage键
| 键名 | 用途 |
|------|------|
| preferredLanguage | 用户选择的语言 |

---

## 8. 部署说明

### 本地预览
```powershell
# 使用Python
python -m http.server 8000

# 或使用VS Code的Live Server插件
# 或使用Node.js的http-server
```

### 生产部署
- 直接上传所有文件到静态托管服务
- 支持：GitHub Pages, Netlify, Vercel, 阿里云OSS等
- 无需服务器端处理

---

**文档版本**: 1.5
**最后更新**: 2026-04-08
**维护者**: 海拓商通开发团队