# Possible OpenSSL errors {#error-openssl}

GMObjC depends on **OpenSSL 1.1.1l** or above. When OpenSSL has been integrated into the project (for example, Baidu Maps BaiduMapKit depends on a lower version of OpenSSL static library), dependency conflicts may occur.

## Simplest solution {#error-simplest}

Use Carthage to compile GMObjC into a dynamic library **GMObjC.xcframework**. At this time, GMObjC will use the OpenSSL inside the dynamic library, while the project still uses the original OpenSSL, without affecting each other.

1. **Solution 1**: According to the instructions in [Getting Started](./getting-started#install-carthage), compile GMObjC.xcframework and drag it to the project for integration.

2. **Solution 2**: Download the compiled [GMObjC.xcframework.zip
](https://github.com/muzipiao/GMObjC/releases) directly, unzip it and drag it to the project for integration.

::: warning Note
GMObjC.xcframework is a dynamic library, you need to select the `Embed & Sign` mode, and you do not need to import the OpenSSL.xcframework library separately.
:::

## Other solutions {#error-others}

If you need to share an OpenSSL, you can upgrade the project OpenSSL to `1.1.1l` or above, and use the [source code method to integrate GMObjC](./getting-started#install-source).
