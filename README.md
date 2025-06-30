# wx-nsteasymusic
网易云音乐微信小程序客户端（可用于微信小程序开发学习）
♬ 原生小程序云开发 ---- 仿网易云音乐 ♪

0️⃣ 运行部署到自己电脑中运行体验
需后端支持 下载启动[node服务端]()即可
1️⃣ 微信小程序开发文档
云开发文档
PS: 云开发开始计费，后续更换...
2️⃣ 设计思路与项目进度
2️⃣ . 1️⃣ 音乐模块开发
🍎 cloudfunciton
1.实现定时触发器云函数的定时周期爬数据（网易云音乐）歌单及其歌曲数据

2.使用 tcb-router 管理项目路由跳转部分

3.突破小程序读取条数限制 + 配合云数据库完成数据的增删改查

🍏 miniprogram
1.【完成小程序音乐模块中的轮播图，歌单的获取及展示，歌单内部歌曲的获取及展示】

1.1 swiper 轮播图原生组件

1.2 组件定义开发 playlist （歌单列表）、musiclist（音乐列表）

1.3 对接网易云歌单接口进行请求展示，格式化播放量

1.4 增加歌单首页【全局搜索歌曲 → 直接搜索自己喜欢的歌曲】（后续上新）

1.5 增加歌单列表【歌曲排名、音质标识、VIP 标识】（后续上新）

![image](https://github.com/zhisibi/wx-nsteasymusic/blob/main/image/music-list.jpg)

2.【完成音乐面板布局 + 歌曲播放以及歌词联动等细节（音乐模块完成）】

2.1 配合 H5 动画还原网易云音乐播放动画

2.2 组件化开发 progress-bar（播放进度条） 、lyric（歌词界面）

2.3 用 getBackgroundAudioManager 完成播放音乐功能

2.4 配合 movable-area、movable-view、progress 完成歌词播放进度条联动



![image](https://github.com/zhisibi/wx-nsteasymusic/blob/main/image/music-player.jpg)
