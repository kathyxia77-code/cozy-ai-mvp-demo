# Momcozy Demo 目录

此目录存放可独立运行、可继续扩展的产品 Demo。React App 负责预览导航、主题控制和 iframe 承载，不计入 Demo 编号。

| 编号 | 名称 | 产品场景 | React 预览路由 | 静态入口 |
| --- | --- | --- | --- | --- |
| 01 | User Guide | 新版本功能说明与帮助内容 | `/guide` | `01-user-guide/index.html` |
| 02 | Group Pumping Community | 母婴社区、群组与话题互动 | `/group-pumping` | `02-group-pumping/index.html` |
| 03 | Voice Log | 语音记录、权限、AI 结构化与保存 | `/voice-log` | `03-voice-log/index.html` |
| 04 | Cozy AI | iPhone 16 对话、记录、预测与支持流程 | `/demos/04-cozy-ai-assistant.html` | `04-cozy-ai-assistant.html` |

## 共享约定

- 四个 Demo 统一使用 `01-user-guide/momcozy-theme.css` 中的 Momcozy Light/Dark tokens。
- React 预览壳通过 `postMessage` 把主题同步给静态 Demo。
- 静态 Demo 独立打开时保留自己的主题入口；被 React iframe 嵌入时隐藏内部入口。
- 新增 Demo 时继续使用两位编号，例如 `04-device-onboarding/`，不要把新示例散落在 `public/` 根目录。
