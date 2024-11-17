# GMObjC 是什么？ {#what-is-gmobjc}

**GMObjC** 是一个基于 OpenSSL 的国密（SM2、SM3、SM4）算法的 Objective-C 开源库，适用于 iOS 和 macOS 开发。它封装了中国国家密码管理局发布的多种加密算法，包括：

- **SM2**：支持基于椭圆曲线（ECC）的加解密，密钥协商（ECDH）和签名算法。
- **SM3**：类似 SHA 系列的国密哈希算法，包含 SM3 和 HMAC 等。
- **SM4**：实现对称分组加密算法。

**OpenSSL 1.1.1** 以上版本增加了对中国 **SM2/SM3/SM4** 加密算法的支持，该库通过对 OpenSSL 国密部分的封装，方便开发者在 iOS 和 macOS 开发中直接调用国密算法。

## 使用场景 {#use-cases}

- **国密背景**

  对于开发人员，开发中加解密是经常用到的，常见的密码算法 MD5、SHA、AES、DES，RSA 等等，这些无一例外都是国外的加密算法。基于安全和宏观战略考虑，中国从 2010 年先后推出了 SM1（SCB2）、SM2、SM3、SM4、SM7、SM9、ZUC（祖冲之密码算法）等密码算法，本文主要讨论 SM2 算法原理，iOS 端如何使用 SM2、SM4 加解密、SM2 签名验签及使用 SM3 生成摘要值。

- **国密全家桶**

  国密算法中，SM1、SM4、SM7、ZUC 是对称算法；SM2、SM9是非对称算法；SM3是哈希算法。其中 SM1 和 SM7 分组密码算法不公开，SM1 主要用于加密芯片等重要领域，例如 智能 IC 卡，加密机等；SM7 主要用于常规非接触式 IC 卡，例如门禁卡，工作证等。

  | 算法  | 公开  | 类似  | 主要用途                             |
  | :---: | :---: | :---: | ------------------------------------ |
  |  SM1  |  否   |  AES  | 智能IC卡、加密卡，加密机等。         |
  |  SM2  |  是   |  RSA  | 重要信息的加解密，签名，如密码。     |
  |  SM3  |  是   |  SHA  | 密码应用中的数字签名和验证，摘要等。 |
  |  SM4  |  是   |  AES  | 分组算法用于无线局域网产品。         |
  |  SM7  |  否   |  AES  | 校园一卡通，门禁卡，工作证等。       |
  |  SM9  |  是   |  SSL  | 基于身份的密码，用于验证身份。       |
  |  ZUC  |  是   |  AES  | 4G 网络中的国际标准密码算法。        |

## 开发体验 {#developer-experience}

GMObjC 旨在为 iOS 和 macOS 开发提供方便快捷的国密开发体验，并提供了多种集成方式。

<div class="tip custom-block" style="padding-top: 8px">

只是想尝试一下 Demo？跳到[快速开始](./getting-started)。

</div>

**可选集成方式**：

- **[CocoaPods](./getting-started#install-cocoapods)**：在 Podfile 中添加`pod 'GMObjC'`快速集成。

- **[Carthage](./getting-started#install-carthage)**：使用 Carthage 编译为 **GMObjC.xcframework** 动态库。

- **[Framework](./getting-started#install-framework)**：打开项目 **GMObjC.xcodeproj** 手动编译为动态库或静态库。

- **[Swift Package Manager](./getting-started#install-spm)**：在项目 **Package.swift** 中添加依赖集成。

- **[源码直接集成](./getting-started#install-source)**：将项目目录下的 **GMObjC** 文件夹直接拖入项目使用。
