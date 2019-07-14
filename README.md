# mall
## 项目预览
[预览页面](https://sethlee23.github.io/mall/)
* 请使用手机预览，或浏览器手机模式预览
## 项目介绍
mall 是一个手机端电商前端项目，基于 vue 实现，主要包括首页商品展示，商品推荐，商品搜索，商品详情展示，购物车，订单流程，地址管理等模块。

## 接口说明
由于个人精力有限，本项目没有完整的后台系统，所有的接口是直接使用 easy-mock 获取的，另外商品分类页暂时只提供了一个二级菜单接口。

## 使用技术
| 技术                                                               | 说明                         |
|--------------------------------------------------------------------|------------------------------|
| [vue]()                                                            | 前端框架                     |
| [vue-router](https://router.vuejs.org/zh/)                                                         | 路由框架                     |
| [vuex](https://vuex.vuejs.org/zh/)                                                               | 全局状态管理框架             |
| [jquery](https://jquery.com/)                                      | JavaScript 库                |
| [mock.js](http://mockjs.com/)                                      | 生成随机数据，拦截 Ajax 请求 |
| [axios](https://github.com/axios/axios)                            | 基于 Promise 的 http 库      |
| [qs](https://github.com/ljharb/qs)                                 | 处理 url 的库                |
| [swiper](https://www.swiper.com.cn/)                               | 触摸滑动插件                 |
| [vant](https://youzan.github.io/vant/#/zh-CN/intro)                | Vue 组件库                   |
| [velocity-animate](https://www.npmjs.com/package/velocity-animate) |                       动画库    |
| [mint-ui](https://mint-ui.github.io/#!/zh-cn)                      | 基于 Vue.js 的移动端组件库   |
## 组织结构
```
src
|-- components                #公共组件
|   |-- backToTop.vue 
|   |-- footer.vue
|   |-- loading.vue
|   `-- swiper.vue
|-- modules
|   |-- css                   #公共样式
|   |   `-- common.css        
|   `-- js                    #逻辑模块
|       |-- address.json      ##地址
|       |-- addressService.js ##地址 service 层
|       |-- api.js            ##接口地址
|       |-- cartService.js    ##购物车service层
|       |-- entrance.js       ##文件导出口
|       |-- fetch_g.js 
|       `-- fetch_p.js
`-- pages                     #商城页面
    |-- cart                  ##购物车页面
    |   |-- cart.css 
    |   |-- cart.html
    |   |-- cart.js
    |   |-- cart_base.css
    |   |-- cart_trade.css
    |   `-- store
    |       `-- index.js
    |-- category              ##分类页
    |   |-- category.css
    |   |-- category.html
    |   `-- category.js
    |-- goods                 ##商品详情页
    |   |-- goods.css
    |   |-- goods.html
    |   |-- goods.js
    |   |-- goods_base.css
    |   |-- goods_common.css
    |   |-- goods_custom.css
    |   |-- goods_mars.css
    |   |-- goods_sku.css
    |   `-- goods_theme.css
    |-- index                 #首页
    |   |-- assets
    |   |   `-- loading.gif
    |   |-- index.css
    |   |-- index.html
    |   |-- index.js
    |   `-- logo.png
    |-- member               #个人页信息面
    |   |-- address.css
    |   |-- address_base.css
    |   |-- components
    |   |   |-- address.css
    |   |   |-- address.vue  ##地址页面
    |   |   |-- address_base.css
    |   |   |-- all.vue
    |   |   |-- form.js
    |   |   |-- form.vue     ##修改地址页面
    |   |   `-- member.vue
    |   |-- member.css
    |   |-- member.html
    |   |-- member.js
    |   |-- member_base.css
    |   |-- router           ##路由
    |   |   `-- index.js
    |   `-- store 
    |       `-- index.js
    `-- search               #商品搜索页
        |-- search.css
        |-- search.html
        `-- search.js
```
## 项目预览
### 首页
![home.png](https://i.loli.net/2019/07/14/5d2ae9d9c1fc955386.png)

### 分类页
#### 综合分类
![category.png](https://i.loli.net/2019/07/14/5d2ae64e080b151851.png)

#### 二级分类
![category-2.png](https://i.loli.net/2019/07/14/5d2ae64d556f834469.png)

### 商品搜索页
![search.png](https://i.loli.net/2019/07/14/5d2ae64d74ff488282.png)

### 商品详情页
![good.png](https://i.loli.net/2019/07/14/5d2ae64e6f8ee21379.png)

### 购物车页面
![cart.png](https://i.loli.net/2019/07/14/5d2ae64df052a25052.png)

### 地址管理页面
#### 入口页面
![member.png](https://i.loli.net/2019/07/14/5d2ae64d6475f39002.png)

#### 地址列表页
![address.png](https://i.loli.net/2019/07/14/5d2ae64cd14ec15303.png)

#### 地址添加/编辑页面
![add.png](https://i.loli.net/2019/07/14/5d2ae64cb1eea67346.png)

![edit.png](https://i.loli.net/2019/07/14/5d2ae64d0c68c51385.png)

## 项目实现功能
## 首页
- 商品展示
- banner 轮播
- navbar 跳转页面
- 点击商品跳转商品详情页
- 点击按扭跳转到顶部
- 上拉加载功能

## 分类页
- 展示推荐商品
- 点击商品跳转商品详情页
- 点击二级分类页商品跳转到商品搜索页
- 输入搜索关键字跳转到商品搜索页面
- 下拉刷新功能

## 商品详情页
- 轮播展示商品详情
- 切换商品详情和本店成交 tab
- 添加购物车、增减商品、立即购买
- 下拉刷新
- 点击按钮跳转到顶部

## 商品搜索页
- 展示搜索商品列表
- 输入关键字搜索商品
- 下拉刷新
- 上拉加载
- 点击按钮跳转到顶部

## 购物车页面
- 展示购物车页面
- 选中商品、店铺、全选
- 选中商品后自动计算价格
- 点击编辑，删除/增减商品，删除店铺
- 手指左滑删除商品

## 地址管理页面
- 个人信息页面入口(暂时仅开发地址管理)
- 路由跳转到地址列表页
- 编辑地址
- 新增地址
- 设置默认地址
- 地址信息添加表单验证
- 地址级联选择器
## 其他组件
### navbar
- 跳转到主页、分类页、购物车页面以及个人信息页面
### backToTop
- 跳转到页面顶部
### loading
- 页面加载中显示 loading 组件
### swiper
- 轮播组件

