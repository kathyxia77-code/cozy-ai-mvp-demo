# Momcozy 设计系统交付

正式设计系统包位于：

```text
momcozy-design-system-kit-1.1.0/
```

## 使用要求

1. `momcozy-shadcn-design-system-1.1.0.skill` 是颜色、字体、基础 token、组件规则和 Demo 规则的权威来源；
2. 业务代码不得写入本目录；
3. 前端实现前必须读取以下规则：
   - `SKILL.md`
   - `references/token-mapping.md`
   - `references/color-system.md`
   - `references/foundation-tokens.md`
   - `references/component-rules.md`
   - `references/demo-patterns.md`
   - `references/typography.md`
4. 不从 Figma 截图提取颜色、字号、圆角或阴影覆盖当前 token；
5. 产品线色不是全局主色，默认基础主题使用 Grays；
6. 前端工程已有主题文件时，更新前先验证 token 来源和 Light/Dark 配对。
