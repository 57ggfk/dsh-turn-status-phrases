# 项目持久记忆 Project Memory

> 本文件由 dsh-memoir 插件维护：记录本项目历次会话的工作归纳、经验教训与行动指南，
> 作为未来 AGENTS 接手本项目时的行动指南。会话开始时自动注入 system prompt。

## 工作记录 Work Log

- [2026-08-20 09:30] [工作记录] 实现思考短语插件 — 在 /mnt/d/code/github/dsh-thiking-tips 创建 dsh-thinking-phrases。它以 DSH Web client bundle 运行，MutationObserver 接管固定 Deep diving 状态并每 1.8 秒轮换；设置页支持启停、词库切换和自定义词库。内置中国神话（嫦娥奔月、精卫填海、夸父逐日、后羿射日、女娲补天等）。package.json 声明 dsh.bundle，cordis.patch.yml 注册 thinking-phrases；npm test 与 npm pack --dry-run 已通过。
- [2026-08-20 11:36] [工作记录] 重做轮次状态插件配置页样式 — 参考 DSH 默认设置卡和桌面启动器插件，将 lib/client.js 的配置页改为 760px 设置卡布局，使用 DSH alias 颜色变量、标题栏/内容区/字段组、统一 select/checkbox/button 控件、焦点态和危险操作色；保留原有 localStorage 与即时生效逻辑。node --check、npm test、npm pack --dry-run 均通过。
- [2026-08-20 11:38] [工作记录] 增加词库内容只读查看器 — 在 lib/client.js 的插件配置页增加只读 textarea，当前词库的每条 phrase 以单独一行展示，支持选中复制、滚动和调整高度；切换词库自动同步，并补充中英文文案与无障碍标签。node --check、npm test、npm pack --dry-run 均通过。
- [2026-08-20 11:46] [工作记录] 拆分内置词库为独立模块 — 内置词库已重构到 lib/builtin-libraries/，每个词库一个文件（chinese-mythology.js、claude-code.js），index.js 负责聚合顺序和默认词库。lib/phrases.js 改为复用注册表；scripts/build-client.mjs 从注册表生成浏览器 client.js 中的嵌入数据，npm test 会先执行构建。新增注册表完整性测试；node --check、npm test（4 项）和 npm pack --dry-run 均通过。
- [2026-08-20 11:48] [工作记录] 暂缓自定义词库编辑流程 — 根据用户要求，lib/client.js 中“新建词库”入口不再使用两段 window.prompt 输入；点击后改为中英文的敬请期待提示，现有内置词库查看、切换及遗留自定义词库删除逻辑保持不变。node --check、npm test（4 项）和 npm pack --dry-run 均通过。
- [2026-08-20 11:49] [工作记录] 补充新增内置词库维护文档 — README.md 新增“新增内置词库”章节，说明在 lib/builtin-libraries 创建单词库模块、登记到 index.js 的 BUILTIN_LIBRARY_LIST、执行 npm run build 生成 client.js、执行 npm test 验证的流程；同步修正 README 中自定义词库编辑尚未开放的描述。npm test（4 项）和 npm pack --dry-run 已通过。
- [2026-08-20 15:42] [工作记录] 延长状态短语轮换时间 — 确认轮换时长公式为 1800ms + 文案字符数 × 100ms，最长 8000ms。已将 lib/client.js 的每字符增量改为 200ms，保留最短 1.8 秒和最长 8 秒，并同步更新 README；npm test 通过（4/4）。
- [2026-08-20 15:45] [工作记录] 按 UTF-8 字节数计算轮换时间 — 按用户澄清改为 UTF-8 字节数时长：lib/client.js 的 getDisplayDuration 使用 new TextEncoder().encode(text).length * 100ms，并 clamp 至 [1800,8000]ms；不再加基础时长。ASCII 计1字节、中文通常计3字节。README 已同步，npm test 4/4 通过。
- [2026-08-20 15:52] [工作记录] 修复展示短语与轮换计时不一致 — 发现并修复轮换显示/计时错配：原 scheduleNext 先 phrase() 算时长但 refresh() 内 writePhrase 再 phrase()，随机策略下计时短语和显示短语可能不同。新增 state.currentPhrase，scheduleNext 传同一文本给 refresh/writePhrase，新捕获节点沿用当前短语；设置变化和删除词库使用 restartSchedule 清除旧 timer 并重新按当前展示内容计时。npm test 4/4 通过。Web profile 的插件为软链接 /home/kaiyu/.dsh/profiles/web/node_modules/dsh-turn-status-phrases -> /mnt/d/code/github/dsh-thiking-tips；现有服务/浏览器需重启和强刷才能加载客户端新 bundle。
- [2026-08-20 15:58] [工作记录] 同步状态文字渐变与动态轮换时长 — 为动态轮换同步原生 turnStatus 渐变动画：在 lib/client.js 增加 scoped STATUS_ANIMATION_CSS，对已接管状态容器及 ::before/::after 用 --dsh-tsp-duration 覆盖 animation-duration；writePhrase 每次由同一 getDisplayDuration(value) 写入 CSS 变量，停用/stop 清除数据属性及变量；apply 时立即注入样式，无须打开设置页。npm test 4/4 通过。
- [2026-08-20 16:16] [工作记录] 强制重启每轮状态渐变 — 按用户反馈完善每次切换文字后强制重启渐变：新增 reset data 属性 CSS（容器及伪元素 animation:none!important），restartAnimation 写入动态时长后加 reset、强制读取 offsetWidth、替换文案、移除 reset、再次强制重排，保证动画从初始位置重新运行。用户确认视觉效果可以。npm test 4/4 通过。
- [2026-08-20 19:59] [工作记录] 补齐 GitHub 发布准备元数据 — 为 dsh-turn-status-phrases 增加 package keywords、MIT LICENSE、.gitignore、GitHub Actions 测试工作流和 package-lock.json；README 增加 DeepSeek Harness / DSH Web / Cordis 检索词。使用 npm ci --legacy-peer-deps、npm test、npm pack --dry-run 验证通过。仓库当前尚未初始化 git，GitHub owner/repository URL 需用户发布时确定。

## 经验教训 Lessons Learned

- [2026-08-20 09:38] [经验教训] 插件命名语义：turnStatus 而非 thinking — dsh-thinking-phrases 更名为 dsh-turn-status-phrases。该状态文字不只是“思考中”，而是模型响应/智能体工作期间的 turn 状态（web 元素 class 为 turnStatus）。包名、cordis id、localStorage key、设置页文案（轮次状态短语）已同步更新；检测仍以 Deep diving 文本为锚点。
