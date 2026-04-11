# 整改任务清单

## 第一阶段：低优先级修复（快速修复）

### Task 1: 修复 about.html 多余脚本位置
**描述**: about.html 第490-509行的鼠标悬停展开脚本放在 `</section>` 标签外面，需要移入适当位置
- [x] SubTask 1.1: 检查 about.html 第490行附近的 HTML 结构
- [x] SubTask 1.2: 将脚本移动到正确的 </body> 前位置
- [x] SubTask 1.3: 验证脚本功能正常

### Task 2: 移除 business.html 多余 console.log
**描述**: business.html 业务分类切换功能中有 console.log 需要移除
- [x] SubTask 2.1: 找到 console.log 位置
- [x] SubTask 2.2: 移除该行代码
- [x] SubTask 2.3: 验证功能正常

### Task 3: 修复 ja.json 日语翻译换行错误
**描述**: ja.json 中日语翻译的 `\n` 被错误转义为 `\nn`
- [x] SubTask 3.1: 定位 zh-CN.json 和 en.json 中正确的换行格式
- [x] SubTask 3.2: 对比并修复 ja.json 中的问题行
- [x] SubTask 3.3: 验证日文页面换行显示正常

---

## 第二阶段：中优先级修复

### Task 4: 修复 team member4 数据不一致
**描述**: about.html 第554行团队成员显示"蒋新培"，但翻译文件里是"近藤"
- [x] SubTask 4.1: 确认正确的人名（已确认使用「近藤」）
- [x] SubTask 4.2: 统一更新 about.html 和翻译文件
- [x] SubTask 4.3: 验证中/日/英三语言显示一致

### Task 5: 为 business.html 按钮添加 data-i18n
**描述**: 业务分类按钮（日语、英语）的 data-i18n 属性缺失
- [x] SubTask 5.1: 检查 business.html 中按钮的 HTML 结构（已有 data-i18n）
- [x] SubTask 5.2: 添加对应的 data-i18n 属性（已存在）
- [x] SubTask 5.3: 在翻译文件中添加对应翻译键（已存在）
- [x] SubTask 5.4: 验证多语言切换正常

### Task 6: 审查 AI 生成图片（可选）
**描述**: 图片使用 AI 动态生成，每次加载都会重新生成
- [x] SubTask 6.1: 列出所有使用 AI 图片的页面和位置
- [x] SubTask 6.2: 确认是否需要替换为静态图片（用户选择保持现状）
- [x] SubTask 6.3: 如需替换，执行图片替换（不适用）

---

## 第三阶段：高优先级修复（架构改进）

### Task 7: 组件化 - 创建公共导航栏
**描述**: 将重复的导航栏代码提取为公共组件
- [ ] SubTask 7.1: 创建 `components/header.html` 文件
- [ ] SubTask 7.2: 修改所有页面使用 iframe 或 fetch 加载导航栏
- [ ] SubTask 7.3: 验证导航栏功能正常

### Task 8: 组件化 - 创建公共页脚
**描述**: 将重复的页脚代码提取为公共组件
- [ ] SubTask 8.1: 创建 `components/footer.html` 文件
- [ ] SubTask 8.2: 修改所有页面使用 iframe 或 fetch 加载页脚
- [ ] SubTask 8.3: 验证页脚功能正常

### Task 9: 统一 Tailwind 配置
**描述**: 创建统一的 tailwind.config.js，避免每个页面重复配置
- [x] SubTask 9.1: 创建 `tailwind.config.js` 公共配置文件（用户选择保持现状，使用 CDN 版本）
- [x] SubTask 9.2: 修改所有页面引用公共配置（不适用，CDN 版本只能在页面内配置）
- [x] SubTask 9.3: 验证样式一致（保持现有配置一致性）

### Task 10: 移除 contact.html 联系表单模块
**描述**: 将表单 section 从 contact.html 中移除
- [x] SubTask 10.1: 定位 contact.html 中的联系表单 section
- [x] SubTask 10.2: 移除表单 HTML 代码
- [x] SubTask 10.3: 验证页面结构正常

---

## 任务依赖关系

```
Task 1 ─┬─> 无依赖（并行执行）
Task 2 ─┘
    │
    v
Task 3（依赖 Task 1, 2 完成后再执行第一阶段检查）

--- 第一阶段完成 ---

Task 4 ─┬─> 第一阶段完成
Task 5 ─┤
Task 6 ─┘（可并行）

--- 第二阶段完成 ---

Task 7 ─┬─> 第二阶段完成
Task 8 ─┤（可并行，Task 7, 8 可并行）
Task 9 ─┤
Task 10 ─┘

--- 第三阶段完成 ---
```

---

## 验证清单

每完成一个 Task，需要在对应 SubTask 后标记 [x] 完成
