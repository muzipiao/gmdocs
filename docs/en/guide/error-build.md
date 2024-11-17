# Xcode compilation error {#error-build-intro}

In some cases, compilation errors may occur, such as the Xcode 12 simulator will have a `Validate Workspace` compilation error, and the new M series computer needs to add arm64 in `Any iOS Simulator SDK`.

## Xcode compilation error-Validate {#error-build-validate}

> Building for iOS, but the linked and embedded framework 'GMObjC.framework' was built for iOS + iOS Simulator.

**Reason**:

Due to the `Validate Workspace` setting of Xcode 12.

**Solution**:

Select the project path `Build Settings - Build Options - Validate Workspace` and change it to YES/NO. No matter what value you change it to, you only need to change it once.

## Xcode compile error - arm64 {#error-build-arm64}

> building for iOS Simulator, but linking in object file built for iOS, for architecture arm64

**Reason**:

Apple's new M-series computer chip architecture is arm64, and an error may occur when running a virtual machine on an M-series computer.

**Solution**:

Select the project path `Build Settings - Architectures - Excluded Architecture` and select `Any iOS Simulator SDK` to add arm64. Refer to [stackoverflow solution](https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios).
