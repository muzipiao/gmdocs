# 签名验签 {#signature-verify-intro}

私钥签名，公钥验签，可防篡改或验证身份。SM2 签名验签默认使用 sm2p256v1 推荐曲线。

## SM2 签名验签 {#signature-verify}

### 基本流程

1. **签名**：使用私钥对消息进行签名，生成签名值（`r`和`s`的拼接）
2. **验签**：使用公钥验证签名，确保消息未被篡改且签名有效

```objc
// 1. 生成密钥对
GMSm2Key *keyPair = [GMSm2Utils generateKey];
NSString *pubKey = keyPair.publicKey;  // 04 开头的公钥(HEX 格式)
NSString *priKey = keyPair.privateKey; // 私钥(HEX 格式)

// 2. 要签名的信息和用户身份标识
NSString *plaintext = @"123456";
NSString *userID = @"lifei_zdjl@126.com"; // 可选的用户身份标识

// 3. 签名：返回 RS 拼接的 128 字节 Hex 字符串(前 64 字节是 R，后 64 字节是 S)
NSString *signRS = [GMSm2Utils signText:plaintext privateKey:priKey userText:userID];

// 4. 验签：返回 YES 表示验签成功，NO 表示失败
BOOL isOK = [GMSm2Utils verifyText:plaintext signRS:signRS publicKey:pubKey userText:userID];
```

::: info 重要说明
1. **用户 ID (userID)**
   - 可传入 nil 或空值，此时默认使用 `1234567812345678`
   - 签名和验签必须使用相同的用户 ID
   - 用户 ID 可用于标识签名者身份

2. **签名格式**
   - 默认输出 RS 拼接格式（128 字节 Hex 字符串）
   - R、S 各占 64 字节
   - 如需与其他平台交互，可按需转换为 DER 格式
:::

## SM2 签名 DER 编码解码 {#signature-der}

在与其他平台交互时，可能需要在 RS 格式和 DER 格式之间转换。

```objc
// RS 格式签名(128 字节 Hex 字符串)
NSString *signRS = @"86AAD9E78048CB6F6B2A1...7E442E443D4BE49F5A010310B";

// RS 转 DER 格式
NSString *derSign = [GMSm2Utils encodeDerWithSignRS:signRS];

// DER 转回 RS 格式
NSString *rsSign = [GMSm2Utils decodeDerToSignRS:derSign];
```

::: tip 提示
DER 格式是一种通用的编码格式，更适合跨平台传输。在与 Java、JavaScript 等其他平台交互时，注意签名格式的转换。
:::