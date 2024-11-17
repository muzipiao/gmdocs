---
outline: deep
---

# 快速开始 {#getting-started}

## 体验 Demo {#try-demo}

在终端运行以下命令:

```ruby
git clone https://github.com/muzipiao/GMObjC.git

cd GMObjC

pod install

open GMObjC.xcworkspace
```

## 环境需求 {#requirement}

依赖 **OpenSSL 1.1.1l** 以上版本，已打包为 xcframework 静态库，并上传 cocoapods。

* iOS 9.0 以上系统
* [GMOpenSSL](https://github.com/muzipiao/GMOpenSSL)(OpenSSL.xcframework)
* Security.framework（可选）

## 集成方式 {#installation}

在项目中使用 GMObjC 的方法如下：

- 使用 CocoaPods
- 使用 Carthage
- 使用 Swift Package Manager
- 手动编译为 Framework/XCFramework
- 拖入项目源码直接使用

### CocoaPods {#install-cocoapods}

CocoaPods 是最简单方便的集成方法，编辑 Podfile 文件，添加：

```ruby
pod 'GMObjC'
```

然后执行 `pod install` 即可，项目会自动集成 **GMObjC** 和 **GMOpenSSL** 开源库。

::: warning 注意
1. GMObjC 依赖 **OpenSSL 1.1.1l** 以上版本，CocoaPods 不支持依赖同一静态库库的不同版本。
2. 遇到与三方库的 OpenSSL 冲突，例如百度地图（BaiduMapKit）依赖了低版本的 OpenSSL 静态库，会产生依赖冲突。
3. 如果遇到 OpenSSL 冲突的情况，参考[冲突解决办法](./error-openssl)，编译 GMObjC 为动态库即可解决。
:::

### Carthage {#install-carthage}

Carthage 可以自动将第三方框架编译为动态库（Dynamic framework），未安装的先执行 `brew update` 和 `brew install carthage` 安装，然后创建一个名称为 Cartfile 的文件（类似 Podfile），编辑添加想要编译的三方库名称如 `github "muzipiao/GMObjC"`，然后执行 `carthage update --use-xcframeworks` 即可。

```ruby
# 安装 carthage
brew update && brew install carthage
# 创建 Cartfile 文件，并写入文件 github "muzipiao/GMObjC"
touch Cartfile && echo 'github "muzipiao/GMObjC"' >> Cartfile
# 拉取编译为动态库，在当前执行命令目录下 Carthage/Build/ 可找到 GMObjC.xcframework
carthage update --use-xcframeworks
```

编译成功后，打开 Carthage 查看生成的文件目录，`Carthage/Build/GMObjC.xcframework` 既是编译成功的动态库，将动态库拖入工程即可。

::: tip 注意
1. GMObjC.xcframework 为动态库，需要选择 `Embed & Sign` 模式，且不需要再单独导入 OpenSSL.xcframework 库。
2. 若 Carthage 编译失败，下载项目源码，先执行`cd GMObjC-master`切换源码目录，再执行 `carthage build --no-skip-current --use-xcframeworks` 手动编译即可。
:::

### Swift Package Manager {#install-spm}

GMObjC 从 3.3.0 开始支持 SPM，在工程中使用，点击 `File` -> `Swift Packages` -> `Add Package Dependency`，输入 [GMObjC 分支 URL](https://github.com/muzipiao/GMObjC.git)，或者在 Xcode 中添加 GitHub 账号，搜索 `GMObjC` 即可。

如果在组件库中使用，更新 `Package.swift` 文件：

```swift
dependencies: [
    .package(url: "https://github.com/muzipiao/GMObjC.git", from: "4.0.0")
],
```

### 手动编译为 Framework {#install-framework}

可以从 GitHub 下载源码，打开项目 **GMObjC.xcodeproj** 手动编译为动态库`GMObjC.framework`。

默认编译为**动态库**，如果需要编译为**静态库**，设置`Build Settings - Linking-General - Mach-O Type`为`Static Library`。

**可合并为 XCFramework**

通过`xcodebuild -create-xcframework`命令来合并为 XCFramework，通过合并 GMObjC 库的模拟器和真机版本来演示。

```shell 
# 创建合并包 GMObjC.xcframework
xcodebuild -create-xcframework -framework Release-iphoneos/GMObjC.framework -framework Release-iphonesimulator/GMObjC.framework -output GMObjC.xcframework
# 或者换行展示更清晰
xcodebuild -create-xcframework \
          -framework Release-iphoneos/GMObjC.framework \
          -framework Release-iphonesimulator/GMObjC.framework \
          -output GMObjC.xcframework
```

### 直接集成 {#install-source}

1. 从 Git 下载最新代码，找到和 README 同级的 GMObjC 文件夹，将 **GMObjC** 文件夹拖入项目；
2. 找到和 README 同级的 Frameworks 文件夹，将项目 **Frameworks/OpenSSL.xcframework** 拖入项目；
3. 在需要使用的地方导入头文件 `GMObjC.h` 即可使用 SM2、SM4 加解密，签名验签，计算 SM3 摘要等。

::: tip 注意事项
1. GMObjC 依赖 OpenSSL，可直接拖入 **Frameworks/OpenSSL.xcframework** 或通过`pod GMOpenSSL`安装 OpenSSL。
2. 如果项目中已集成 **OpenSSL 1.1.1l** 以上版本，可共用同一个 OpenSSL；否则需要使用 Carthage 将 GMObjC 编译为动态库。
:::
