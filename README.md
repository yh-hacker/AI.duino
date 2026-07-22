![AI.duino](http://www.nikolairadke.de/aiduino/aiduino_back_2.png)
# 🤖 AI.duino - AI assistant for Arduino IDE 2.X

> **Fork Notice**: 此分支是基于 [NikolaiRadke/AI.duino](https://github.com/NikolaiRadke/AI.duino) 的修改版，增加了更多的模型供应商支持。

AI.duino 集成了多种 AI 提供商，包括云 API 提供商、聚合服务、本地提供商以及自定义 OpenAI 兼容 API。它同时支持 **Arduino IDE 2.X** 和 **VS Code**。请使用最新版本以避免已知问题。

自 **V2.6.0** 起，AI.duino 支持完整的 Agentic Coding：与传统 AI 聊天不同，Agentic Coding 允许 AI 直接读取、修改和写入项目文件 — 无需复制粘贴。AI 可以通过编译代码并自主修复错误来验证其更改。

自 **V2.7.1** 起，AI.duino 支持自定义 OpenAI 兼容 API 端点，允许您使用任何实现 `/v1/chat/completions` 的 AI 提供商，包括自托管的 LLM 服务器（如 LocalAI、vLLM 等）。

自 **V2.8.0** 起，AI.duino 新增 NVIDIA BUILD 平台支持，可以选择 DeepSeek-V4-Pro 和 DeepSeek-V4-Flash 模型。

自 **V2.8.1** 起，AI.duino 修复了本地提供商的 API 端点路径处理问题。现在同时支持带或不带 `/v1` 后缀的 URL。

> [!NOTE]
> Groq 不是 Grok！AI.duino 与 Elon Musk 无关！

🆕 What's new?  
* **22.07.2026** **Release V2.8.1** 修复了本地提供商的 API 端点路径处理问题，现在同时支持带或不带 `/v1` 后缀的 URL。  
* **22.07.2026** **Release V2.8.0** 新增 NVIDIA BUILD 平台支持，可以选择 DeepSeek-V4-Pro 和 DeepSeek-V4-Flash 模型。包含 bug 修复。  
* **22.07.2026** **Release V2.7.1** 添加了自定义 OpenAI 兼容 API 支持，允许使用任何实现 `/v1/chat/completions` 的 AI 提供商，包括自托管的 LocalAI、vLLM 等。  
* **31.05.2026** **Release V2.7.0** 带来新的 Semantic Anchors 功能。请查看提示编辑器。    
  -- 更多新闻？查看 [newsblog](https://github.com/yh-hacker/AI.duino/blob/main/NEWS.md)。

## Features

### 支持的语言
插件使用 IDE 首选项中选择的语言。如果是非 IDE 语言，请在插件菜单中选择。支持的语言包括：  
**bg, bs, cs, da, de, el, en, es, et, fi, fr, hr, hu, is, it, ja, ko, lt, lv, mk, mt, nl, no, pl, pt, ro, sk, sl, sq, sr, sv, tr, uk, zh**。  

### 代码优化
优化代码。例如：将阻塞代码转换为非阻塞变体，`delay()` 被替换为基于 `millis()` 的实现。

### 代码解释
用通俗易懂的语言解释复杂的 Arduino 命令和硬件寄存器。

### 自动文档
为现有代码添加有意义的注释。

### 错误分析
解释编译器错误消息并提供具体解决方案。使用此功能时，请从 Arduino 输出窗口复制错误消息。

### 直接 AI 提问（支持追问）
标记代码或不标记代码进行提问。您可以提出与上下文相关的后续问题。

### 调试支持
- 串行监视器输出分析
- 常见问题的硬件诊断
- 时序分析

### AI 聊天
像浏览器中一样的多聊天功能，但集成在 IDE 中，具有基于历史的持久化。Claude Code 提供完整的会话持久化。您可以添加文件内容。所有功能结果也可以在此讨论。

### 自定义代理
让 AI 为您执行一些任务，例如编译后的错误检查。代理可以包含构建输出和其他内部及外部文件。

### 离线代码分析
提供有关当前文件的一些信息。

### 行内补全
AI 将在常见关键字（如 `Serial.`）和以 `:` 结尾的注释后建议代码补全。  
示例：`// Let the LED blink for three times:`。按 *<Tab>* 接受建议。  
您可以选择不同的提供商，**Groq** 速度快、免费，推荐用于行内补全。

### 自动更新
提供商设置将在可用时自动更新，每周自动生成。扩展会自我检查并通知用户新版本更新。

## 支持的模型供应商

### 🌐 云 API 提供商
| 供应商 | 图标 | 特点 |
|--------|------|------|
| **Claude** | 🤖 | 强大的代码理解能力，支持长上下文 |
| **ChatGPT** | 🧠 | OpenAI 旗舰模型，广泛应用 |
| **Gemini** | 💎 | Google 模型，免费额度可用 |
| **Mistral** | 🌟 | 高性能开源模型 |
| **Perplexity** | 🔍 | 联网搜索能力 |
| **Cohere** | 🔥 | 命令系列模型 |
| **Groq** | 🚀 | 极快的推理速度，免费额度 |
| **NVIDIA BUILD** | 🟢 | 支持 DeepSeek-V4-Pro 和 DeepSeek-V4-Flash 模型 |

### 🔄 聚合服务（Aggregation Services）
| 供应商 | 图标 | 特点 |
|--------|------|------|
| **OpenRouter** | ⚡ | 聚合多种模型，包含免费选项 |
| **Hugging Face** | 🤗 | 访问大量开源模型 |
| **Fireworks AI** | 🔥 | 高性能模型推理 |
| **Together AI** | 🤝 | 多种开源模型支持 |

### 🤖 Agentic Coding（智能体编码）
| 供应商 | 图标 | 特点 |
|--------|------|------|
| **Claude Code** | 🤖 | 完整的会话持久化 |
| **Codex CLI** | 🧠 | OpenAI Codex 命令行工具 |
| **Mistral Vibe** | 🌟 | Mistral 智能体 |
| **OpenCode** | 🙏 | 开源代码助手 |
| **Gemini CLI** | 💎 | Google Gemini 命令行工具 |
| **Groq Code** | 🚀 | Groq 代码助手 |
| **Ollama Agentic** | 🦙 | 本地智能体 |

### 🖥️ 本地提供商（Local Providers）
| 供应商 | 图标 | 特点 |
|--------|------|------|
| **Ollama** | 🦙 | 本地运行多种开源模型 |
| **LM Studio** | 🖥️ | 本地模型管理与推理 |

### ✨ 自定义 OpenAI 兼容 API（V2.7.1 新增）
- **自托管 LLM 服务器**：LocalAI、vLLM、llama.cpp server、FastChat 等
- **OpenAI 兼容 API 代理**：任何支持 `/v1/chat/completions` 的服务
- **自定义 API 端点**：您自己部署的 AI 服务

## Screenshots (V2.6.1)

![Screenshot 1](http://www.nikolairadke.de/aiduino/screenshot_1_2.png)
![Screenshot 2](http://www.nikolairadke.de/aiduino/screenshot_2_2.png)
![Screenshot 3](http://www.nikolairadke.de/aiduino/screenshot_3_2.png)

## Usage

1. 在 Arduino IDE 中选择代码
2. 右键点击 → `AI.duino` → 在上方菜单中选择功能
* `Ctrl+Shift+C` (Windows/Linux) 或 `Cmd+Shift+C` (Mac)
* 按下下方的 `AI.duino` 按钮
* 通过侧边栏树菜单进入 AI.duino 菜单

### Agentic Mode（新功能！）

您可以通过按右侧第二个按钮将聊天切换为智能体模式。现在，AI 可以访问您文件所在的文件夹。请记住，您需要安装额外的软件。

## Installation

### 自动安装（推荐）

您需要在安装程序所在的同一文件夹中有 VSIX 文件 *aiduino.vsix*。安装程序将把插件安装到您的主文件夹中。如果您想将其安装到 Arduino 程序目录，请参阅 *手动安装*。

#### Windows
以管理员身份运行 `install_aiduino_windows.bat`

#### Linux
```
chmod +x install_aiduino_linux.sh
./install_aiduino_linux.sh
```

#### macOS
```
chmod +x install_aiduino_macos.sh
./install_aiduino_macos.sh
```

## 手动安装

为每个文件夹和文件添加读取权限。将准备好的 `aiduino` 文件夹复制到 Arduino IDE 插件目录。

#### Windows
```
C:\Program Files\Arduino IDE\resources\app\plugins\
```

#### macOS（未测试）
```
/Applications/Arduino IDE.app/Contents/Resources/app/plugins/
```

#### Linux
``` /usr/share/arduino/resources/app/plugins/ ```
或
``` ~/.local/share/arduino-ide/resources/app/plugins/ ```

## 卸载

您可以在 AI.duino 设置面板中点击卸载按钮完全删除扩展。确定要卸载吗？确定真的要卸载吗？

如果您手动将 AI.duino 安装到插件文件夹中，则需要自己删除它。AI.duino 没有权限执行此操作。

## API Keys 和本地提供商

AI.duino 通过 API 与 AI 通信。无法通过 Web 界面连接，因此 API 密钥是 **必需的**。如果您已有月度付费账户，您需要 - *叹气* - 额外购买约 **$5** 的密钥。幸运的是，这真的能用很久。像 Mistral 这样的提供商在您有月度付费账户时会免费提供 API 密钥。

> [!TIP]
> 您可以尝试 **Groq** 和 **Gemini**：它们的 API 密钥有 **免费** 额度。

所需：来自以下任一提供商的 **API 密钥**：
- Claude: https://console.anthropic.com
- ChatGPT: https://platform.openai.com
- Gemini: https://makersuite.google.com
- Mistral: https://console.mistral.ai
- Perplexity: https://www.perplexity.ai/settings/api
- Cohere: https://dashboard.cohere.ai
- Groq: https://console.groq.com
- NVIDIA BUILD: https://build.nvidia.com (≥ V2.8.0)
- OpenRouter: https://openrouter.ai/settings/keys (≥ V2.5.0)
- Hugging Face: https://huggingface.co/settings/tokens (≥ V2.5.0)
- Fireworks: https://app.fireworks.ai/login?redirectURI=%2Fsettings%2Fusers%2Fapi-keys (≥ V2.5.0)
- Together: https://api.together.xyz/sso-signin?redirectUrl=%2Fsettings%2Fapi-keys (≥ V2.5.0)

密钥存储在本地，不会被传输。

对于 **Agentic Coding**，需要以下任一进程提供商：
- Claude Code: https://code.claude.com/docs
- Codex CLI (ChatGPT): https://github.com/openai/codex
- Mistral Vibe: https://docs.mistral.ai/mistral-vibe/introduction
- OpenCode: https://opencode.ai/docs/
- Gemini CLI: https://geminicli.com/docs/get-started/authentication/
- Groq Code: https://github.com/yh-hacker/groq-code-cli
- Ollama: https://ollama.com/

这些 **本地提供商** 中的一些不需要 API 密钥。如果您有账户，例如 Claude 的 *Pro Plan*，您可以免费使用 Claude。像 **Ollama** 这样的基于 HTTP 的提供商会被自动检测，像 **Claude Code** 这样的基于进程的提供商只需要二进制文件的路径，这也应该会被检测到。如果没有，请尝试 *which claude* (Linux/macOS) 或 *where claude* (Windows)，并在选择 Claude Code 时将路径复制到 AI.duino 输入字段。

## Content

```
AI.duino/
Root directory with some explanation files
|
├── aiduinio/
|   The plugin directory structure for manual installation.
└── installer/
    Installer files with plugin VSIX file
```

## Related Projects

- **[Arduino+](https://github.com/NikolaiRadke/Arduinoplus)** - Essential IDE helpers for Arduino development.
- **[Extension Manager](https://github.com/NikolaiRadke/Extension-Manager)** - Manage your Arduino IDE 2.X extensions.

## 💙 Support AI.duino

AI.duino 是免费开源的。如果它帮到了你，请考虑支持开发！🚀
