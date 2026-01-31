# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 Volumio Apple Music 插件，是一个基于 React 的 Web 应用，用于在 Volumio 平台上播放 Apple Music。应用使用 MusicKit JS API 与 Apple Music 服务集成。

## 核心依赖和技术栈

- **Node.js**: 支持现代版本（已升级，可在 Node.js 18+ 运行）
- **React 18.3.1**: 主要 UI 框架（已从 16.6 升级）
- **MusicKit JS**: Apple Music 的官方 JavaScript API（通过 `window.MusicKit` 访问）
- **Blueprint.js 5.x**: UI 组件库（用于按钮、卡片、图标等）
- **react-scripts 5.0.1**: Create React App 构建工具链

## 环境准备

直接安装依赖即可：
```bash
npm install
```

注意：`.nvmrc` 文件仍包含 Node.js 14，但项目已升级为支持现代 Node.js 版本。

## 开发和构建命令

### 开发环境启动
需要 MusicKit JS 开发者令牌（developer token）：
```bash
REACT_APP_DEV_TOKEN=<your-token> npm start
```

### 生产构建
```bash
REACT_APP_DEV_TOKEN=<your-token> GENERATE_SOURCEMAP=false npm run build
```

### 其他命令
- `npm test` - 运行测试
- `npm run analyze` - 分析构建包大小（使用 source-map-explorer）

## 代码架构

### 应用入口和初始化
- **index.js**: 应用入口，初始化 MusicKit，检测移动设备并相应处理
  - 配置 MusicKit 实例时使用环境变量 `REACT_APP_DEV_TOKEN`
  - 移动设备会显示应用商店下载链接而不是完整应用

### 核心组件层次

**App.js** (根组件)
- 管理认证状态（AUTH_UNKNOWN/AUTH_LOGGED_OUT/AUTH_LOGGED_IN）
- 监听 MusicKit 事件：`mediaCanPlay`, `authorizationStatusDidChange`, `mediaItemWillChange`
- Last.fm 集成：在播放曲目时进行 scrobbling（5 秒后发送 nowPlaying，播放 75% 或 4 分钟后 scrobble）
- 音频处理：在 Chrome 中创建 AudioContext 用于可视化
- 子组件：Player（播放器控制）和 Panel（内容面板）

**Player.js** (播放器控制)
- 播放状态管理（使用 MusicKit.PlaybackStates: none/loading/playing/paused/stopped 等）
- 播放控制：播放/暂停、上一曲/下一曲、拖动进度
- 重复模式切换（None/One/All）
- 音量控制（仅限 Chrome，因为 Safari 不允许）
- 显示当前播放曲目（使用 Track 组件）

**Panel.js** (内容面板)
- Tab 管理：Browse（浏览）、Playlist（播放列表）、Settings（设置）、Search（搜索结果）
- 搜索功能：250ms 防抖，调用 MusicKit API 搜索
- 集成以下子组件：
  - Browse: 展示 Apple Music 内容分类
  - Playlist: 当前播放队列
  - Settings: 用户设置和账户连接
  - Collection: 专辑/播放列表详情弹窗
  - Results: 搜索结果显示

**Settings.js** (设置和认证)
- 社交登录集成（Google、Twitter、Facebook）
- Apple Music 账户连接（通过 MusicKit.authorize()）
- Last.fm 集成设置
- 使用 Utils 模块处理 Firebase 认证

**Collection.js** (专辑/播放列表详情)
- 以对话框形式显示专辑、播放列表或艺术家详情
- 获取完整曲目列表
- 支持添加到库、播放、随机播放操作
- 显示艺术封面、描述、时长等元数据

### 工具模块

**Utils.js** (假定存在，虽未直接读取)
- Firebase 认证相关函数：`addAuthObserver()`, `login()`, `logout()`, `userRef()`
- Apple Music 连接：`connectApple()`, `disconnectApple()`, `isReallyLoggedIn()`
- Last.fm scrobbling：`scrobble()`
- 辅助函数：`icon()`, `formatDate()`, `durationListFormat()`, `showArtist()`, `showAlbum()`, `isSameTrack()`

### 状态管理

应用主要通过组件 state 和 props 传递状态，没有使用 Redux 等状态管理库：
- **App**: 管理全局认证状态、用户数据、MusicKit 实例
- **Player**: 管理播放状态、进度、音量
- **Panel**: 管理当前标签页、搜索结果、正在播放的曲目

### 本地存储（localStorage）

使用 `window.localStorage` 存储：
- Apple Music 令牌缓存（键格式: `<token>.r`, `<token>.s`, `music.6fl6vvxxeh.u`）
- 同步计数器 `sync-count`（用于检测令牌同步失败）

## 重要注意事项

1. **MusicKit Developer Token**:
   - 所有 MusicKit API 调用都需要有效的开发者令牌
   - `src/index.js` 中已配置有效的 token（有效期至 2026/7/30）
   - Token 使用 `generate-token.js` 脚本生成，需要私钥文件和 Team ID
   - 可通过环境变量 `REACT_APP_DEV_TOKEN` 覆盖默认 token

2. **Firebase 功能已移除**:
   - 已完全移除 Firebase 认证功能，应用无需登录即可使用
   - `src/Utils.js` 保留为占位实现，仅提供基本工具函数
   - Last.fm scrobbling 功能已禁用（可根据需要重新启用并配置）
   - Settings 页面简化为仅显示应用信息

3. **浏览器兼容性**:
   - 音频可视化仅在 Chrome 中启用（使用 AudioContext）
   - Safari 不支持通过 JS 控制音量

4. **认证流程**:
   - 应用已简化为无需登录即可使用
   - 直接使用 MusicKit 的 developer token 进行认证
   - 移除了社交账户登录功能
   - 移除了 Apple Music 账户绑定流程

5. **样式文件**: 每个组件在 `src/s/` 目录下有对应的 CSS 文件，图片资源在 `src/i/` 目录

6. **项目状态**:
   - README 标注这是"work in process"，需谨慎使用
   - 原始仓库缺失部分文件（Utils.js、部分图片），已创建占位实现
   - 已移除 Firebase 依赖，应用可独立运行

## 生成新的 MusicKit Token

如果 token 过期，可以使用 `generate-token.js` 重新生成：

```bash
node generate-token.js
```

需要的文件和信息：
- 私钥文件：`/Users/zhangming/Documents/AppleMusicKey/AuthKey_7L6KPR4TKP.p8`
- Team ID: `7KHS4R8V39`
- Key ID: `7L6KPR4TKP`（从文件名获取）

生成后将新 token 复制到 `src/index.js` 中的 `REACT_APP_DEV_TOKEN` 常量。
