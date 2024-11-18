# GMDOCS

GMDOCS 是使用 VitePress 为 [GMObjC](https://github.com/muzipiao/GMObjC) 编写的官方文档。**GMObjC** 是一个基于 OpenSSL 的国密（SM2、SM3、SM4）算法的 Objective-C 开源库，适用于 iOS 和 macOS 开发。它封装了中国国家密码管理局发布的多种加密算法。

## 安装

```shell
mkdir gmdocs
# VitePress 可以单独使用，也可以安装到现有项目中
npm add -D vitepress
# VitePress 附带一个命令行设置向导，可以帮助你构建一个基本项目
npx vitepress init
# 开发预览
npm run docs:dev

# 构建文档，默认的生成输出目录 （.vitepress/dist）
npm run docs:build
# 本地预览，该服务以 .vitepress/dist 作为源文件
npm run docs:preview
```

## 启用 math

安装数学工具`npm add -D markdown-it-mathjax3`，并配置`math: true`。

```ts
// .vitepress/config.ts
export default {
  markdown: {
    math: true
  }
}
```
