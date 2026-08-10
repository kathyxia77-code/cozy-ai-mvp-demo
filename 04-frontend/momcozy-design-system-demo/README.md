# Cozy AI MVP Frontend

这个工程包含基于 Vite + React 的预览壳，以及可独立运行的 Cozy AI iPhone 16 交互页。Cozy AI 以 `393 × 852 CSS px` 为基线，页面结构与交互来自 Cozy AI MVP Figma，视觉值来自 Momcozy 3.0 设计系统 token。

## 运行

```bash
pnpm install
pnpm demo
```

本地预览地址：

```text
Demo 目录：http://127.0.0.1:5177/demos
App 壳：http://127.0.0.1:5177/
Demo 01：http://127.0.0.1:5177/guide
Demo 02：http://127.0.0.1:5177/group-pumping
Demo 03：http://127.0.0.1:5177/voice-log
Cozy AI：http://127.0.0.1:5177/demos/04-cozy-ai-assistant.html
```

其中 `/` 是 React + shadcn/ui 的 App 壳；三个独立 Demo 都由该预览壳承载，并通过右上角开关同步 Light/Dark Mode：

| 编号 | Demo | 预览路由 | 静态源码 |
| --- | --- | --- | --- |
| 01 | User Guide | `/guide` | `public/demos/01-user-guide/` |
| 02 | Group Pumping Community | `/group-pumping` | `public/demos/02-group-pumping/` |
| 03 | Voice Log | `/voice-log` | `public/demos/03-voice-log/` |
| 04 | Cozy AI | `/demos/04-cozy-ai-assistant.html` | `public/demos/04-cozy-ai-assistant.html` |

更新 `src/styles/momcozy-theme.css` 后，运行下面命令同步给静态 User Guide iframe：

```bash
pnpm sync:guide-theme
```

## 使用 OpenAI LLM

Cozie 可通过本地 Python 代理调用 OpenAI Responses API。API Key 只由代理读取，不会写入浏览器代码。

```bash
OPENAI_API_KEY="..." python3 scripts/cozie_llm_server.py
```

然后打开：

```text
http://127.0.0.1:8765/demos/04-cozy-ai-assistant.html
```

可通过 `OPENAI_MODEL` 覆盖默认模型，通过 `COZIE_PORT` 覆盖端口。不要将 API Key 写入页面、文档或仓库。未配置 API Key、Provider 暂时不可用或通过 `file://` 打开时，Cozie 使用本地 Mock 回复；快捷任务和医疗风险拦截不依赖外部模型。

## 结构

- `src/styles/momcozy-theme.css`：Momcozy token 与 shadcn 语义变量。
- `src/components/ui/`：轻量 shadcn/ui 风格组件壳，当前包含 Button、Card、Badge。
- `src/App.tsx`：Cozy AI iPhone 16 预览壳。
- `src/App.css`：移动端预览壳布局。
- `public/fonts/`：Exposure[-10] 与 Aeonik Soft Pro 字体资源。
- `public/figma/`：从 Figma 下载或裁切的页面资产。
- `public/figma/references/`：Figma 原图参考截图和本地 demo 截图。
- `public/demos/01-user-guide/`：User Guide 静态 Demo，已将基础颜色、字体、圆角、间距、按钮和阴影映射到 Momcozy token。
- `public/demos/02-group-pumping/`：社区、群组列表和详情页 Demo，使用主题桥接同步 Light/Dark Mode。
- `public/demos/03-voice-log/`：Voice Log 完整交互 Demo。代码生成的弹层、文字、按钮、边框、状态与控制面板使用 Momcozy semantic tokens；UI 型 PNG 切片随主题适配，照片与设备外框保持原始影像。
- `public/demos/04-cozy-ai-assistant.html`：Cozy AI 授权、对话、Forecast、Voice Log、计划、引用与人工支持流程。
- `public/demos/README.md`：四个 Demo 的编号、入口、职责和共享资源说明。
- `scripts/sync-user-guide-theme.mjs`：把主 token 文件同步到静态 User Guide，避免 iframe 内主题副本漂移。

## 验证

提交前运行：

```bash
pnpm lint
pnpm build
```

交互或布局变化还需在 `393 × 852` 的 iPhone 16 基线视口和宽屏桌面视口验证受影响流程，包括横向溢出、弹层、主题、输入状态和 Reduced Motion。
