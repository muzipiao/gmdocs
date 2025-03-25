# 可能遇到的 OpenSSL 错误 {#error-openssl}

GMObjC 依赖 **OpenSSL 1.1.1l** 以上版本，当项目中已经集成 OpenSSL（例如百度地图 BaiduMapKit 依赖了低版本的 OpenSSL 静态库），此时可能会出现依赖冲突。

## 最简单方案 {#error-simplest}

使用 Carthage 将 GMObjC 编译为动态库 **GMObjC.xcframework**，此时 GMObjC 会使用动态库内部的 OpenSSL，而项目依旧使用原有 OpenSSL，互不影响。

1. **方案1**：根据 [快速开始](./getting-started#install-carthage) 说明，编译得到 GMObjC.xcframework，拖至项目集成。

2. **方案2**：直接下载已编译完成的 [GMObjC.xcframework.zip](https://github.com/muzipiao/GMObjC/releases)，解压后拖至项目集成。

3. **方案3**：如果项目使用 cocoapods 集成，则使用 `pod 'GMDynamic'` 安装 GMObjC 动态库版本。

::: warning 注意
GMObjC.xcframework 为动态库，需要选择 `Embed & Sign` 模式，且不需要再单独导入 OpenSSL.xcframework 库。
:::

## 其他方案 {#error-others}

如果需要共用一个 OpenSSL，可升级项目 OpenSSL 至 `1.1.1l` 以上版本，并采用[源码方式集成 GMObjC](./getting-started#install-source)。
