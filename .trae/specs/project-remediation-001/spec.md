# 海拓商通官网问题整改方案

## Why

项目存在多个技术债问题需要修复，包括代码规范问题、翻译错误、数据不一致问题以及代码重复等影响开发和维护效率的问题。

## What Changes

### 低优先级修复（第一阶段）
- [ ] 修复 about.html 多余脚本位置问题（HTML结构规范）
- [ ] 移除 business.html 多余的 console.log
- [ ] 修复 ja.json 日语翻译中的 `\n` 错误

### 中优先级修复（第二阶段）
- [ ] 修复 team member4 数据不一致（about.html 与翻译文件）
- [ ] 为 business.html 业务分类按钮添加 data-i18n 翻译支持
- [ ] 评估并优化 AI 生成图片问题（可选修复）

### 高优先级修复（第三阶段）
- [ ] 统一提取公共组件：导航栏和页脚
- [ ] 统一提取 Tailwind 配置为公共文件
- [ ] 完善 contact.html 表单后端对接（模拟提交改为提示）
- [ ] 审查并修正所有页面的一致性问题

## Impact

- Affected specs: 多语言国际化系统、组件化架构
- Affected code:
  - `index.html`, `about.html`, `business.html`, `contact.html`
  - `locales/zh-CN.json`, `locales/ja.json`, `locales/en.json`
  - 新增 `components/header.html`, `components/footer.html`（第三阶段）
  - 新增 `tailwind.config.js`（第三阶段）

---

## ADDED Requirements

### Requirement: 导航栏组件化
系统 SHALL 提供可复用的导航栏组件，包含Logo、导航链接、语言切换器。

#### Scenario: 导航栏渲染
- **WHEN** 用户打开任意页面
- **THEN** 导航栏正确显示当前页面高亮状态和多语言文本

### Requirement: 页脚组件化
系统 SHALL 提供可复用的页脚组件，包含公司信息、导航链接、联系方式和社交媒体。

#### Scenario: 页脚渲染
- **WHEN** 用户打开任意页面
- **THEN** 页脚正确显示所有多语言文本

### Requirement: Tailwind 配置统一
系统 SHALL 提供统一的 Tailwind 配置文件，所有页面引用同一配置。

#### Scenario: 样式一致性
- **WHEN** 开发者修改颜色或字体配置
- **THEN** 所有页面自动使用更新后的配置

---

## MODIFIED Requirements

### Requirement: 翻译数据一致性
**原文**: 翻译文件与HTML页面数据可以不一致
**修改为**: 翻译文件（JSON）作为唯一数据源，HTML页面中的静态文本必须与翻译文件保持同步

### Requirement: 表单提交反馈
**原文**: contact.html 表单提交仅显示 alert 弹窗
**修改为**: contact.html 移除表单提交模块

### Requirement: 移除联系表单
**Reason**: 表单无后端支持且用户要求移除
**Migration**: 从 contact.html 中移除整个联系表单 section

---

## REMOVED Requirements

### Requirement: 团队成员静态数据（临时）
**Reason**: 为解决数据不一致问题，暂时移除 HTML 中的静态团队成员数据，改由翻译文件统一管理
**Migration**: 团队成员信息将统一存储在 `locales/*/json` 的 `pages.about.team` 节点下

---

## 优先级排序说明

| 阶段 | 优先级 | 问题数 | 理由 |
|------|--------|--------|------|
| 第一阶段 | 低 | 3 | 快速修复，不影响核心功能 |
| 第二阶段 | 中 | 3 | 需要翻译文件更新，但风险可控 |
| 第三阶段 | 高 | 4 | 涉及架构改动，需谨慎验证 |

---

## 待确认事项

1. **组件化方案**: 是否接受使用原生 HTML import 或 iframe 方式实现组件化？（推荐 iframe，更简单）
2. **AI 图片处理**: 是否需要我替换为占位图片，还是保持现状？
3. **表单后端**: contact.html 表单是否需要对接真实的后端 API，还是仅改善前端用户体验即可？
