# 签名验签 {#signature-verify-intro}

私钥签名，公钥验签，可防篡改或验证身份，具体流程如下：

- **签名**：使用私钥对消息进行签名，生成签名值（`r`和`s`）。
- **验签**：使用公钥验证签名，确保消息未被篡改且签名有效。

## SM2 签名验签 {#signature-verify}

**SM2 签名** 需要传入明文、私钥和用户 ID（默认 1234567812345678），**SM2 验签** 需要传入明文、公钥，签名和用户 ID（必须与签名时相同）。

::: info 注意
1. 用户 ID 可传空值，当传空值时使用 OpenSSL 中定义的`#define SM2_DEFAULT_USERID "1234567812345678"`。
2. GMObjC 签名默认为 RS 字符串格式，与其他端交互的过程中，根据需要 RS 拼接格式签名，还是 DER 格式，进行编码解码。
:::

```objc
GMSm2Key *keyPair = [GMSm2Utils generateKey];
NSString *pubKey = keyPair.publicKey; // 测试用 04 开头公钥（HEX 编码格式）
NSString *priKey = keyPair.privateKey; // 测试用私钥（HEX 编码格式）

NSString *plaintext = @"123456";
// userID 传入 nil 或空时默认 1234567812345678；不为空时，签名和验签需要相同 ID
NSString *userID = @"lifei_zdjl@126.com";
// 签名结果是 RS 拼接的 128 字节 Hex 格式字符串，前 64 字节是 R，后 64 字节是 S
NSString *signRS = [GMSm2Utils signText:plaintext privateKey:priKey userText:userID];
// 验证签名，返回 YES 验签成功，否则验签失败
BOOL isOK = [GMSm2Utils verifyText:plaintext signRS:signRS publicKey:pubKey userText:userID];
```

## SM2 签名 DER 编码解码 {#signature-der}

与其他端交互的过程中，根据需要将签名进行 DER 编码解码。

```objc
// 签名结果是 RS 拼接的 128 字节 Hex 格式字符串，前 64 字节是 R，后 64 字节是 S
NSString *signRS = @"86AAD9E78048CB6F6B2A1...7E442E443D4BE49F5A010310B";
// 编码为 Der 格式（HEX 编码格式）
NSString *derSign = [GMSm2Utils encodeDerWithSignRS:signRS];
// 解码为 RS 字符串格式，rsSign 与 signRS 相同，编码解码前后不变
NSString *rsSign = [GMSm2Utils decodeDerToSignRS:derSign];
```
