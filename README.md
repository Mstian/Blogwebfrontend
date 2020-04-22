### 我的博客前端项目源码：

##### 前端使用技术栈：

vue + vue-router + elementUI

##### 基本功能：

登录、注册、文章列表、写文章、分享文章、常用工具、学习文档、留言。

##### 优化

2020-04-21

1. 优化`<router-view>`的高度，主内容区高度，当主内容去不满一屏高度时，避免出现滚动条。
2. 添加`<transition>`组件优化`tab`切换时的效果。
3. 添加`<keep-live>`组件避免`tab`切换时出现闪屏再次加载数据问题。