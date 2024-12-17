# SM2 加解密 {#sm2-encrypt-decrypt}

SM2 是中国基于椭圆曲线密码学的非对称算法标准，支持加密、数字签名和密钥交换，具有高安全性和计算效率，广泛应用于电子认证和安全通信领域。

## 生成密钥对 {#sm2-generate-key}

::: info 说明
默认使用国密标准推荐的 sm2p256v1 曲线参数(NID_sm2)。如需使用其他曲线(如 secp256k1、secp256r1)，可通过 `[GMSm2Utils setCurveType:]` 设置。
:::

```objc
// 生成公私钥，公私钥都为 HEX 编码的字符串格式
GMSm2Key *keyPair = [GMSm2Utils generateKey];
// SM2 公钥 "0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698"
NSString *pubKey = keyPair.publicKey;
// SM2 私钥 "90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE"
NSString *priKey = keyPair.privateKey;

// 如果只有私钥，可以通过私钥计算出对应的公钥
NSString *calculatedPubKey = [GMSm2Utils calcPublicKeyFromPrivateKey:priKey];
```

## SM2 加密 {#sm2-encrypt}

SM2 加密支持加密任意 **NSData** 或 **NSString** 类型的明文数据。加密时需要传入待加密明文和公钥。

::: info 注意
1. 公钥必须为 HEX 编码字符串格式，且以 **04** 开头的非压缩公钥。
2. 如果是以 **02** 或 **03** 开头的压缩公钥，使用 `decompressPublicKey:` 解压缩。
3. 加密结果为 ASN1 格式，可使用 `asn1DecodeToC1C3C2Hex:` 解码为 **C1C3C2** 格式。
4. 如需与其他平台交互，注意密文格式(C1C3C2/C1C2C3)和编码方式(ASN1/非ASN1)的转换。
:::

```objc
// 明文（字符串类型）
NSString *plaintext = @"123456";
// SM2 加密字符串类型，结果为 ASN1 格式的密文，并编码为 HEX 格式
NSString *asn1Hex = [GMSm2Utils encryptText:plaintext publicKey:pubKey];

// 明文（数据块任意类型）
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// SM2 加密数据块类型，结果为 ASN1 格式的数据库，根据需要
NSData *asn1Data = [GMSm2Utils encryptData:plainData publicKey:pubKey];

// ASN1 解码为 C1C3C2 格式（HEX 编码格式）
NSString *c1c3c2Hex = [GMSm2Utils asn1DecodeToC1C3C2Hex:asn1Hex hasPrefix:NO];
// ASN1 解码为 C1C3C2 格式（数据块类型）
NSData *c1c3c2Data = [GMSm2Utils asn1DecodeToC1C3C2Data:asn1Data hasPrefix:NO];

// 密文顺序 C1C3C2 和 C1C2C3 可相互转换
NSString *c1c2c3Hex = [GMSm2Utils convertC1C3C2HexToC1C2C3:c1c3c2Hex hasPrefix:NO];
// 转换结果 c1c3c2HexResult 与 c1c3c2Hex 相同
NSString *c1c3c2HexResult = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];

// 压缩公钥使用示例
NSString *compressedPubKey = @"02E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9C6";
NSString *uncompressedPubKey = [GMSm2Utils decompressPublicKey:compressedPubKey];
```

## SM2 解密 {#sm2-decrypt}

SM2 解密传入 **ASN1 格式密文** 和 HEX 编码格式 **私钥**。

::: info 注意事项
1. 私钥必须为 HEX 编码字符串格式。
2. 密文必须为 ASN1 格式，如果收到非 ASN1 格式的密文，需要先进行 [ASN1转换](./sm2-asn1)：
   - C1C3C2 格式转 ASN1：使用 `asn1EncodeWithC1C3C2Hex:`。
   - C1C2C3 格式需要先转为 C1C3C2，再转 ASN1。
3. 解密支持返回 NSString 或 NSData 格式的明文。
:::

```objc
// 非 ASN1 格式密文处理示例，假设收到 C1C2C3 格式密文
NSString *c1c2c3Hex = @"...";
// 1. 先转换为 C1C3C2 格式
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];

// 2. 再转换为 ASN1 格式（如果是 ASN1 格式则省略此步骤）
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:NO];
// 3. 解密得到字符串明文 "123456"
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];
```
