# Xcode 编译错误 {#error-build-intro}

个别情况下会出现编译错误，例如 Xcode 12 模拟器会出现 `Validate Workspace` 编译错误，M 系列新电脑需要在 `Any iOS Simulator SDK` 中添加 arm64 等。

## Xcode 编译错误-Validate {#error-build-validate}

> Building for iOS, but the linked and embedded framework 'GMObjC.framework' was built for iOS + iOS Simulator.

**原因**：

由于 Xcode 12 的 `Validate Workspace` 设置导致。

**解决方案**：

选择工程路径 `Build Settings - Build Options - Validate Workspace` 更改为 YES/NO，无论更改为什么值，更改一次即可。

## Xcode 编译错误-arm64 {#error-build-arm64}

> building for iOS Simulator, but linking in object file built for iOS, for architecture arm64

**原因**：

苹果新增 M 系列电脑的芯片架构为 arm64，在 M 系列电脑上运行虚拟机时可能会报错。

**解决方案**：

选择工程 路径`Build Settings - Architectures - Excluded Architecture` 选择 `Any iOS Simulator SDK` 添加 arm64，参考[stackoverflow 方案](https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios)。
