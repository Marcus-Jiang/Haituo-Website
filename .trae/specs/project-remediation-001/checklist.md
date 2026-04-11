# 整改检查清单

## 第一阶段：低优先级修复

### Task 1: 修复 about.html 多余脚本位置
- [x] about.html 脚本已移至正确位置
- [x] 页面加载无控制台错误
- [x] 鼠标悬停展开功能正常

### Task 2: 移除 business.html 多余 console.log
- [x] console.log 已移除
- [x] 业务分类切换按钮功能正常

### Task 3: 修复 ja.json 日语翻译换行错误
- [x] ja.json 中 `\n` 错误已修复
- [x] 日语页面联系信息等区块换行显示正确

---

## 第二阶段：中优先级修复

### Task 4: 修复 team member4 数据不一致
- [x] about.html 中 member4 人名已统一为「近藤」
- [x] zh-CN.json 中 member4 人名已统一
- [x] ja.json 中 member4 人名已统一
- [x] en.json 中 member4 人名已统一
- [x] 三个语言页面显示一致

### Task 5: 为 business.html 按钮添加 data-i18n
- [x] "全部业务" 按钮有 data-i18n 属性
- [x] "商务咨询" 按钮有 data-i18n 属性
- [x] "国际业务" 按钮有 data-i18n 属性
- [x] "市场拓展" 按钮有 data-i18n 属性
- [x] "数字解决方案" 按钮有 data-i18n 属性
- [x] 语言切换后按钮文字正确更新（翻译文件已存在）

### Task 6: 审查 AI 生成图片（可选）
- [x] 已列出所有 AI 图片位置
- [x] 已确认是否需要替换为静态图片（用户选择保持现状）

---

## 第三阶段：高优先级修复

### Task 7: 导航栏组件化
- [x] components/header.html 已创建（基础版本）
- [ ] index.html 使用公共导航栏（待后续页面适配）
- [ ] about.html 使用公共导航栏（待后续页面适配）
- [ ] business.html 使用公共导航栏（待后续页面适配）
- [ ] contact.html 使用公共导航栏（待后续页面适配）
- [ ] 语言切换在所有页面正常（待后续页面适配）
- [ ] 移动端菜单正常（待后续页面适配）

### Task 8: 页脚组件化
- [x] components/footer.html 已创建（基础版本）
- [ ] index.html 使用公共页脚（待后续页面适配）
- [ ] about.html 使用公共页脚（待后续页面适配）
- [ ] business.html 使用公共页脚（待后续页面适配）
- [ ] contact.html 使用公共页脚（待后续页面适配）
- [ ] 语言切换在所有页面正常（待后续页面适配）

### Task 9: 统一 Tailwind 配置
- [x] 保持现状，使用 CDN 版本（用户选择）
- [x] 每个页面配置保持一致

### Task 10: 移除 contact.html 联系表单模块
- [x] contact.html 表单 section 已移除
- [x] 表单样式已移除
- [x] 表单提交脚本已移除
- [x] 页面其他内容结构正常

---

## 最终验证

- [ ] 所有 4 个页面加载无错误
- [ ] 语言切换（中/日/英）全部正常
- [ ] 移动端响应式布局正常
- [ ] 控制台无 JavaScript 错误

---

## 备注

- Task 7, 8 的页面适配工作因涉及 i18n 渲染逻辑和较大的架构调整，已创建组件文件但未强制要求在本轮整改中完成
- 如需完成组件化适配，建议在后续迭代中进行，并充分测试语言切换功能