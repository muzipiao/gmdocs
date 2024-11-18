---
outline: deep
---

# Get started quickly {#getting-started}

## Try Demo {#try-demo}

Run the following command in the terminal:

```ruby
git clone https://github.com/muzipiao/GMObjC.git

cd GMObjC

pod install

open GMObjC.xcworkspace
```

## Environment requirements {#requirement}

Depends on **OpenSSL 1.1.1l** or above, packaged as xcframework static library, and uploaded to cocoapods.

* iOS 9.0 and above
* [GMOpenSSL](https://github.com/muzipiao/GMOpenSSL)(OpenSSL.xcframework)
* Security.framework (optional)

## Integration method {#installation}

The following are the methods to use GMObjC in your project:

- Use CocoaPods
- Use Carthage
- Use Swift Package Manager
- Manually compile to Framework/XCFramework
- Drag in the project source code and use directly

### CocoaPods {#install-cocoapods}

CocoaPods is the simplest and most convenient integration method. Edit the Podfile file and add:

```ruby
pod 'GMObjC'
```

Then execute `pod install`, and the project will automatically integrate the **GMObjC** and **GMOpenSSL** open source libraries.

::: warning Note
1. GMObjC depends on **OpenSSL 1.1.1l** or above. CocoaPods does not support different versions of the same static library.
2. If there is a conflict with OpenSSL in a third-party library, such as Baidu MapKit, which depends on a lower version of OpenSSL static library, dependency conflicts will occur.
3. If you encounter an OpenSSL conflict, refer to [Conflict Solution](./error-openssl) and compile GMObjC into a dynamic library to resolve it.
:::

### Carthage {#install-carthage}

Carthage can automatically compile third-party frameworks into dynamic libraries. If they are not installed, run `brew update` and `brew install carthage` to install them. Then create a file named Cartfile (similar to Podfile), edit and add the name of the third-party library you want to compile, such as `github "muzipiao/GMObjC"`, and then run `carthage update --use-xcframeworks`.

```ruby
# Install carthage
brew update && brew install carthage
# Create Cartfile and write github "muzipiao/GMObjC"
touch Cartfile && echo 'github "muzipiao/GMObjC"' >> Cartfile
# Pull and compile to a dynamic library. GMObjC.xcframework can be found in Carthage/Build/ in the current command execution directory
carthage update --use-xcframeworks
```

After successful compilation, open Carthage to view the generated file directory. `Carthage/Build/GMObjC.xcframework` is the successfully compiled dynamic library. Drag the dynamic library into the project.

::: tip Note
1. GMObjC.xcframework is a dynamic library. You need to select the `Embed & Sign` mode, and you do not need to import the OpenSSL.xcframework library separately.
2. If Carthage compilation fails, download the project source code, execute `cd GMObjC-master` to switch to the source code directory, and then execute `carthage build --no-skip-current --use-xcframeworks` to compile manually.
:::

### Swift Package Manager {#install-spm}

GMObjC supports SPM since 3.3.0. To use it in a project, click `File` -> `Swift Packages` -> `Add Package Dependency`, URL  `https://github.com/muzipiao/GMObjC.git`, or add a GitHub account in Xcode and search for `GMObjC`.

If used in a component library, update the `Package.swift` file:

```swift
dependencies: [
    .package(url: "https://github.com/muzipiao/GMObjC.git", from: "4.0.0")
],
```

### Manually compile to Framework {#install-framework}

You can download the source code from GitHub, open the project **GMObjC.xcodeproj** and manually compile it to a dynamic library `GMObjC.framework`.

Compile to **dynamic library** by default. If you need to compile to **static library**, set `Build Settings - Linking-General - Mach-O Type` to `Static Library`.

**Can be merged into XCFramework**

Use the `xcodebuild -create-xcframework` command to merge into XCFramework, and demonstrate by merging the simulator and real machine versions of the GMObjC library.

```shell
# Create a merged package GMObjC.xcframework
xcodebuild -create-xcframework -framework Release-iphoneos/GMObjC.framework -framework Release-iphonesimulator/GMObjC.framework -output GMObjC.xcframework
# Or wrap to display more clearly
xcodebuild -create-xcframework \
           -framework Release-iphoneos/GMObjC.framework \
           -framework Release-iphonesimulator/GMObjC.framework \
           -output GMObjC.xcframework
```

### Direct integration {#install-source}

1. Download the latest code from Git, find the GMObjC folder at the same level as README, and drag the **GMObjC** folder into the project;
2. Find the Frameworks folder at the same level as README, and drag the project **Frameworks/OpenSSL.xcframework** Drag it into the project;
3. Import the header file `GMObjC.h` where you need to use it to use SM2, SM4 encryption and decryption, signature verification, calculation of SM3 summary, etc.

::: tip Notes
1. GMObjC depends on OpenSSL, you can directly drag it into **Frameworks/OpenSSL.xcframework** or install OpenSSL through `pod GMOpenSSL`.
2. If **OpenSSL 1.1.1l** or above is integrated in the project, you can share the same OpenSSL; otherwise, you need to use Carthage to compile GMObjC into a dynamic library.
:::
