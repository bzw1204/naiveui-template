# 👽NaiveUI 后台管理模板

> 本框架仅限CNNS内部使用

### 快速开始

```shell
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产环境代码
npm run build
```

### 功能特点

1. 使用 [NaiveUI](https://www.naiveui.com/zh-CN/os-theme/components) 组件，易于使用的管理模板
2. 使用 [Vite](https://cn.vitejs.dev/) 进行快速开发和热模块替换
3. 使用 TypeScript 编写，提供类型安全性和更好的代码可维护性
4. 支持动态路由，自动生成路由无需繁琐配置
5. 使用 Alova 作为网络组件，内含大量封装，减少不必要的代码逻辑以及自定义封装开箱即用
6. 支持树摇，减少打包体积
7. 组件自动引入，减少繁琐的引入及页面代码量
8. 集成 [UnoCSS](https://alfred-skyblue.github.io/unocss-docs-cn/)，实现无样式 CSS 框架的灵活应用
9. 集成 [unplugin-icons](https://github.com/unplugin/unplugin-icons)，方便引入图标库及自定义图标

### 开发规范
#### 文件夹结构

```
📂 .vscode
📂 public
📦 src
 ┣ 📂 assets
 ┣ 📂 components
 ┃ ┗ 📜 naive-provider.vue
 ┃ ┗ 📜 svg-icon.vue
 ┣ 📂 views
 ┃ ┗ 📜 Page1.vue
 ┃ ┗ 📜 Page2.vue
 ┣ 📂 router
 ┃ ┗ 📜 index.ts
 ┣ 📂 store
 ┃ ┗ 📜 index.ts
 ┣ 📂 utils
 ┃ ┗ 📜 util1.ts
 ┃ ┗ 📜 util2.ts
📜 README.md
```
### 命名规范

1.1 项目命名

> 全部采用小写方式，以中线分隔。

<p style="color:green">正例：bar-chart.vue</p>
<p style="color:red">反例：BarChart.vue</p>

1.2 目录命名
> 全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数。

<p style="color:green">正例：scripts/styles/components/images/utils/layouts/demo-styles/demo-scripts/img/doc</p>
<p style="color:red">反例：script/style/.demo_scripts/.demo5 tyles/gs/docs</p>
【特殊】VUE的项目中的components中的组件目录，使用kebab-case命名。

### 进阶文档
- [Markdown 官方教程](https://markdown.com.cn/intro.html)

### 常用工具库
- [Markdown Emoji👏](https://www.emojiall.com/zh-hans/all-emojis?type=normal)
- [Xicons](https://xicons.org/#/)


