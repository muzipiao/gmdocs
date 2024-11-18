# What is GMObjC? {#what-is-gmobjc}

**GMObjC** is an Objective-C open source library based on OpenSSL's chinese cryptography (SM2, SM3, SM4) algorithms, suitable for iOS and macOS development. It encapsulates multiple encryption algorithms released by the China National Cryptography Administration, including:

- **SM2**: Supports encryption and decryption based on elliptic curves (ECC), key negotiation (ECDH) and signature algorithms.
- **SM3**: A chinese cryptography hash algorithm similar to the SHA series, including SM3 and HMAC.
- **SM4**: Implements symmetric block encryption algorithms.

**OpenSSL 1.1.1** and above versions have added support for China's **SM2/SM3/SM4** encryption algorithms. This library encapsulates the chinese cryptography part of OpenSSL, making it convenient for developers to directly call the chinese cryptography algorithm in iOS and macOS development.

## Use Cases {#use-cases}

- **Chinese Cryptography Background**

For developers, encryption and decryption are often used in development. Common cryptographic algorithms include MD5, SHA, AES, DES, RSA, etc. These are all foreign encryption algorithms without exception. Based on security and macro-strategic considerations, China has launched cryptographic algorithms such as SM1 (SCB2), SM2, SM3, SM4, SM7, SM9, and ZUC (Zu Chongzhi Cryptographic Algorithm) since 2010. This article mainly discusses the principle of SM2 algorithm, how to use SM2 and SM4 for encryption and decryption, SM2 signature verification, and SM3 to generate summary values ​​on iOS.

- **Chinese Cryptography Family Bucket**

Among the chinese cryptography algorithms, SM1, SM4, SM7, and ZUC are symmetric algorithms; SM2 and SM9 are asymmetric algorithms; and SM3 is a hash algorithm. Among them, SM1 and SM7 block cipher algorithms are not public. SM1 is mainly used in important fields such as encryption chips, such as smart IC cards, encryption machines, etc.; SM7 is mainly used in conventional contactless IC cards, such as access cards, work permits, etc.

| Algorithm | Public | Similar | Main use                                                                           |
| :-------: | :----: | :-----: | ---------------------------------------------------------------------------------- |
|    SM1    |   No   |   AES   | Smart IC cards, encryption cards, encryption machines, etc.                        |
|    SM2    |  Yes   |   RSA   | Encryption and decryption of important information, signatures, such as passwords. |
|    SM3    |  Yes   |   SHA   | Digital signatures and verifications, digests, etc. in cryptographic applications. |
|    SM4    |  Yes   |   AES   | Block algorithms are used in wireless LAN products.                                |
|    SM7    |   No   |   AES   | Campus cards, access cards, work permits, etc.                                     |
|    SM9    |  Yes   |   SSL   | identity-based cipher for authentication.                                          |
|    ZUC    |  Yes   |   AES   | international standard cryptographic algorithm in 4G networks.                     |

## Development Experience {#developer-experience}

GMObjC aims to provide a convenient and fast national cryptographic development experience for iOS and macOS development, and provides multiple integration methods.

<div class="tip custom-block" style="padding-top: 8px">

Just want to try the Demo? Jump to [Getting Started](./getting-started).

</div>

**Optional integration method**:

- **[CocoaPods](./getting-started#install-cocoapods)**: Add `pod 'GMObjC'` to Podfile for quick integration.

- **[Carthage](./getting-started#install-carthage)**: Use Carthage to compile into **GMObjC.xcframework** dynamic library.

- **[Framework](./getting-started#install-framework)**: Open the project **GMObjC.xcodeproj** and manually compile it into a dynamic library or static library.

- **[Swift Package Manager](./getting-started#install-spm)**: Add dependency integration in the project **Package.swift**.

- **[Source Code](./getting-started#install-source)**: Drag the **GMObjC** folder in the project directory directly into the project for use.
