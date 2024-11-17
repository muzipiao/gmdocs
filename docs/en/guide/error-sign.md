# Possible Signature Errors {#error-sign}

Due to changes in Apple's policies, your app may be rejected due to signature issues when it is put on the shelves. For details, please refer to [Apple's official third-party SDK privacy policy requirements](https://developer.apple.com/support/third-party-SDK-requirements/).

::: warning SDK signature (Apple's official website describes it as follows)
Now with SDK signature, when you use a new version of a third-party SDK in your app, Xcode will verify whether it is signed by the same developer, thereby improving the integrity of the software supply chain.
:::

## Binary file rejected due to signature review {#error-sign-detail}

> ITMS-91065: Missing signature - Your app includes "Frameworks/OpenSSL.framework/OpenSSL", which includes BoringSSL / openssl_grpc, an SDK that was identified in the documentation as a privacy-impacting third-party SDK. If a new app includes a privacy-impacting SDK, or an app update adds a new privacy-impacting SDK, the SDK must include a signature file. Please contact the provider of the SDK that includes this file to get an updated SDK version with a signature.

### Solution

You can manually sign the specified binary file. Taking OpenSSL.xcframework as an example, please refer to [issues 92](https://github.com/muzipiao/GMObjC/issues/92).

```shell
# Check the signature, if there is no signature, it will show code object is not signed at all
codesign -dv --verbose=4 OpenSSL.xcframework
# Copy the certificate name in the keychain, and execute this command to sign.
xcrun codesign --timestamp -s "full name of certificate" OpenSSL.xcframework
# Verify the signature
xcrun codesign --verify --verbose OpenSSL.xcframework

# The release certificate starts with "Apple Distribution", and execute this command to sign.
xcrun codesign --timestamp -s "Apple Distribution" OpenSSL.xcframework
# The release certificate starts with "iPhone Distribution", and execute this command to sign.
xcrun codesign --timestamp -s "iPhone Distribution" OpenSSL.xcframework
# For a signed framework, you can use the -f parameter to force re-signing
xcrun codesign --timestamp -f -s "full name of certificate" OpenSSL.xcframework
```
