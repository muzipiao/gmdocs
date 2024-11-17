# 可能遇到的签名错误 {#error-sign}

由于苹果政策的变化，上架时可能因为签名问题被拒，详见[苹果官方三方SDK隐私政策要求](https://developer.apple.com/support/third-party-SDK-requirements/)。

::: warning SDK 签名（苹果官网描述如下）
现在有了 SDK 签名，当您在应用程序中采用第三方 SDK 的新版本时，Xcode 将验证它是否由同一个开发人员签名，从而提高软件供应链的完整性。
:::

## 二进制文件因签名审核被拒 {#error-sign-detail}

> ITMS-91065: Missing signature - Your app includes “Frameworks/OpenSSL.framework/OpenSSL”, which includes BoringSSL / openssl_grpc, an SDK that was identified in the documentation as a privacy-impacting third-party SDK. If a new app includes a privacy-impacting SDK, or an app update adds a new privacy-impacting SDK, the SDK must include a signature file. Please contact the provider of the SDK that includes this file to get an updated SDK version with a signature.

### 解决办法

对指定二进制文件手动签名即可，以 OpenSSL.xcframework 为例，可参考[issues 92](https://github.com/muzipiao/GMObjC/issues/92)。

```shell
# 查看签名，无签名显示 code object is not signed at all
codesign -dv --verbose=4 OpenSSL.xcframework
# 钥匙串复制证书名称，执行此命令即可签名。
xcrun codesign --timestamp -s "证书全称" OpenSSL.xcframework
# 验证签名
xcrun codesign --verify --verbose OpenSSL.xcframework

# 发布证书以"Apple Distribution"开头，执行此命令即可签名。
xcrun codesign --timestamp -s "Apple Distribution" OpenSSL.xcframework
# 发布证书以"iPhone Distribution"开头，执行此命令即可签名。
xcrun codesign --timestamp -s "iPhone Distribution" OpenSSL.xcframework
# 已经签名的framework，可以使用-f参数强制重新签名
xcrun codesign --timestamp -f -s "证书全称" OpenSSL.xcframework
```
