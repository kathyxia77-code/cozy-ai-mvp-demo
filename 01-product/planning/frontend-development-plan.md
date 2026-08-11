# Cozie MVP 前端开发计划

## 1. 目标

按照 PRD、页面状态矩阵和 Figma 截图开发 Cozie 移动端交互页面，并在没有真实后端、Agent、Forecast 和客服系统时，通过 Mock 数据完整模拟主要操作及异常状态。

MVP 可演示范围：

- 首次隐私授权与激活；
- 新用户问候、推荐问题和 Forecast 冷启动；
- 文本输入、发送、流式回复、停止生成和失败重试；
- Gemini 式语音转文字输入、麦克风授权、实时转写和文字/语音模式切换；
- 快捷任务 Chips 静默、进行中和已完成状态；
- Pumping Log、Sleep Log、Lactation Plan 结构化卡片；
- Forecast 收起、展开、低置信度和刷新；
- 历史会话、新建会话和 Session 恢复；
- RAG 信源、复制、点赞和点踩问卷；
- 医疗红旗识别与人工转接。

## 2. 技术架构

现有工程技术基线：

- TypeScript 6；
- React 19；
- Vite 8；
- Momcozy 3.0 semantic tokens；
- Lucide React 图标；
- 现有 shadcn 风格 `Button`、`Card`、`Badge` 组件。

计划按需补充：

- React Router：授权、对话和设置页面路由；
- TanStack Query：接口缓存、超时、重试和失效刷新；
- Zustand：Session、草稿、抽屉、弹层和 Mock 控制状态；
- React Hook Form + Zod：结构化卡片表单和接口校验；
- MSW：Mock HTTP、延迟、错误和流式事件；
- Vitest + Testing Library：组件与状态测试；
- Playwright：移动端流程和截图验收。

## 3. 设计系统硬约束

实现必须遵守 `03-design-system/momcozy-design-system-kit-1.1.0/`：

1. 页面背景、正文、边框默认使用 Grays semantic tokens；
2. Mom 仅用于泵奶、妈妈健康及主要相关动作；
3. Care 用于睡眠、安抚和婴儿看护；
4. Parenting 用于养育工具和成长记录；
5. Family 用于家庭环境健康；
6. `Fills` 只用于按钮或状态容器背景；
7. `Labels` 只用于填充容器上的文字和图标；
8. 普通正文使用 `Colors / Text`；
9. 页面表面使用 `Colors / Backgrouds`；
10. 页面标题使用 Exposure，产品 UI 和正文使用 Aeonik Soft Pro；
11. 间距、圆角、阴影、状态均使用现有 token，不写孤立视觉值；
12. 优先使用 Button、Input、Textarea、Checkbox、Tabs、Dialog、Sheet、Card、Badge、Alert 和 Form primitives。

## 4. 前端目录规划

```text
src/
├── app/                 # 路由、Provider、Feature Flag、错误边界
├── pages/
│   ├── consent/         # 隐私授权页
│   └── conversation/    # Cozie 主入口
├── features/
│   ├── chat/            # 消息流、输入、流式生成、反馈
│   ├── session/         # 当前会话、历史、新建会话
│   ├── forecast/        # 今日预测
│   ├── quick-tasks/     # Chips 状态与触发
│   ├── tool-cards/      # Pumping、Sleep、Lactation Plan
│   ├── citations/       # RAG 信源
│   ├── safety/          # 风险提示和转人工
│   └── onboarding/      # 问候和推荐问题
├── components/ui/       # Momcozy/shadcn 基础组件
├── services/            # API Client 和流式事件解析
├── mocks/               # handlers、scenarios 和 fixtures
├── stores/              # 页面状态
├── schemas/             # 接口与表单 Schema
├── types/               # 领域类型
└── styles/              # Momcozy tokens 与页面样式
```

## 5. 页面与组件

页面：

- `/cozy-ai/consent`：首次授权；
- `/cozy-ai/chat/:sessionId?`：全局对话；
- `/cozy-ai/settings`：MVP 设置占位。

核心组件：

- `ConsentPage`
- `ConversationHeader`
- `ForecastPanel`
- `WelcomeGuide`
- `SuggestedQuestions`
- `MessageList`
- `TextMessage`
- `ToolCardMessage`
- `CitationList`
- `MessageActions`
- `QuickTaskChips`
- `MessageComposer`
- `VoiceInput`：对话输入栏内的语音转文字能力；
- `VoiceRecorder`：Voice Log 业务任务录音能力，与 `VoiceInput` 独立；
- `HistorySheet`
- `FeedbackSheet`
- `HandoffAlert`
- `MedicalDisclaimer`

## 6. 核心状态

```text
ConsentState: unchecked | checked | submitting | accepted | failed
SessionState: empty | active | restoring | expired | archived
GenerationState: idle | sending | streaming | paused | completed | failed
ComposerState: empty | ready | generating
VoiceInputState: text | permission-requested | listening | transcribing | transcript-ready | denied | failed
ChipState: idle | running | completed | failed
ToolState: draft | validating | submitting | saved | failed
ForecastState: hidden | cold-start | loading | ready | low-confidence | failed
SafetyState: normal | caution | medical-red-flag | crisis | handoff
```

禁止使用互相矛盾的多个布尔值代替状态枚举。

### 6.1 Gemini 式语音输入状态机

语音输入是 `MessageComposer` 的输入方式，不等同于 Quick Task 中的 Voice Log：

1. 麦克风按钮始终位于输入框内部；
2. 首次点击进入 `permission-requested`，模拟 iOS 授权弹窗：
  - Title：`“Momcozy” would like to access the Microphone`
  - Description：`Momcozy needs microphone access for Voice Log`
  - Actions：`Don’t Allow`、`Allow`
3. `Don’t Allow` 进入 `denied`，返回文字输入且保留草稿；再次点击提示前往系统设置开启权限；
4. `Allow` 进入 `listening`，输入框展开为深色语音面板，显示附件定义的粉色渐变流体声波和 `Listening...`；
5. 收到转写增量后进入 `transcribing`，面板实时显示转写文本；已有文字草稿与语音转写拼接，不覆盖草稿；
6. 转写有内容时，右侧发送按钮使用附件定义的粉橙到粉紫渐变圆形上箭头并进入可用态；
7. 点击键盘图标退出语音态，转写回填到最多 5 行、1000 字符的文本框，用户可编辑后发送；
8. 点击渐变上箭头直接发送“原文字草稿 + 语音转写”；发送后复用文本消息和 AI generation 流程；
9. AI 正在生成时，暂停按钮优先，麦克风入口禁用；生成结束后恢复麦克风入口；
10. 新建会话、路由离开或页面隐藏时停止采集并释放媒体流。

视觉要求：

- 声波为横向连续流体形态，不使用柱状均衡器；
- 主色从 Mom 粉过渡到粉紫，两端透明衰减，随音量做纵向呼吸与横向漂移；
- 发送按钮为圆形、白色上箭头、粉橙到粉紫渐变填充和轻量内高光；
- `prefers-reduced-motion` 下停止声波动画，保留静态波形与实时转写。

## 7. 前端接口契约

```text
GET    /api/cozy-ai/bootstrap
POST   /api/cozy-ai/consent
GET    /api/chat/sessions/current
POST   /api/chat/sessions
GET    /api/chat/sessions
GET    /api/chat/sessions/:id/messages
DELETE /api/chat/sessions/:id
POST   /api/chat/messages
GET    /api/chat/generations/:id/stream
POST   /api/chat/generations/:id/stop
POST   /api/voice/transcriptions
GET    /api/voice/transcriptions/:id/stream
DELETE /api/voice/transcriptions/:id
GET    /api/forecast/today
POST   /api/tools/:toolId/submit
POST   /api/messages/:id/feedback
POST   /api/handoffs
```

流式事件：

```ts
type StreamEvent =
  | { type: 'text.delta'; content: string }
  | { type: 'text.completed'; messageId: string }
  | { type: 'citation'; citation: Citation }
  | { type: 'tool.card'; card: ToolCard }
  | { type: 'safety.alert'; decision: SafetyDecision }
  | { type: 'generation.completed' }
  | { type: 'generation.failed'; code: string; retryable: boolean }
```

语音转写事件：

```ts
type VoiceTranscriptionEvent =
  | { type: 'transcript.delta'; content: string }
  | { type: 'transcript.completed'; transcriptId: string; content: string }
  | { type: 'transcript.failed'; code: 'permission-denied' | 'no-speech' | 'network' | 'unsupported' }
```

音频仅用于当前转写请求；MVP 默认不持久化原始音频。日志记录权限结果、转写 ID、耗时和错误码，不记录音频内容。

## 8. Mock 数据预设

用户：

- `new-user`：未授权、无记录、无历史；
- `active-mom`：已授权，有宝宝资料、预测和历史；
- `low-data-user`：仅一条记录，Forecast 低置信度；
- `risk-user`：可触发医疗红旗和转人工。

服务场景：

- `happy-path`
- `cold-start`
- `slow-network`
- `agent-timeout`
- `rag-no-match`
- `medical-escalation`

开发环境提供 Mock 控制面板，切换用户、延迟、错误、Forecast 和 Agent 返回类型。UI 始终调用统一 service，不直接读取 fixtures。

## 9. 开发阶段

### Sprint 0：工程与契约

- 建立目录和领域类型；
- 建立 Mock service 与场景；
- 完成路由、移动端壳、Safe Area 和 Feature Flag；
- 扩展设计系统组件。

### Sprint 1：授权与对话框架

- 隐私授权流程；
- 对话页顶部、底部输入、Chips 和新用户引导；
- Session 创建、恢复、新建和历史抽屉；
- Figma 视觉还原。

### Sprint 2：消息交互

- 文本发送、流式回复、停止和重试；
- 输入栏内 Gemini 式语音转文字、授权模拟、动态声波、实时转写和文字回填；
- RAG 信源、复制、点赞和点踩；
- 本地草稿和页面恢复。

### Sprint 3：业务任务

- Pumping Log、Sleep Log、Lactation Plan；
- Chips 三态；
- Forecast 全状态；
- Voice Log 和 IBCLC 占位或能力接入。

### Sprint 4：安全与质量

- 医疗红旗、RAG 无命中、人工转接；
- 弱网、超时、重复点击、跨日和 Session 过期；
- 移动端截图、无障碍和性能验收。

## 10. Mock Demo 验收路径

1. 未授权用户完成授权；
2. 点击推荐问题并收到流式回答；
3. 首次点击麦克风，分别验证拒绝授权和允许授权；
4. 允许后查看动态流体声波与实时转写，切回键盘编辑并发送；
5. 在已有文字草稿后追加语音转写，并通过渐变上箭头直接发送；
6. 完成 Lactation Plan，Chip 转为完成态；
7. 保存 Pumping Log 并更新 Forecast；
8. 停止 AI 生成后再次发送；
9. 恢复历史会话并新建会话；
10. 查看引用并完成消息反馈；
11. 输入医疗红旗内容并触发转人工。
