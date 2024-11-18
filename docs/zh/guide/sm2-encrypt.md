# SM2 加解密 {#sm2-encrypt-decrypt}

SM2 是中国基于椭圆曲线密码学的非对称算法标准，支持加密、数字签名和密钥交换，具有高安全性和计算效率，广泛应用于电子认证和安全通信领域。

## 生成密钥对 {#sm2-generate-key}

```objc
// 生成公私钥，公私钥都为 HEX 编码的字符串格式
GMSm2Key *keyPair = [GMSm2Utils generateKey];
// SM2 公钥 "0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698"
NSString *pubKey = keyPair.publicKey;
// SM2 私钥 "90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE"
NSString *priKey = keyPair.privateKey;
```

## SM2 加密 {#sm2-encrypt}

SM2 加密传入待加密 **明文** 和 **公钥** ，明文可为任意 **NSData** 或 **NSString** 类型。

::: info 注意
1. 公钥必须为 HEX 编码字符串格式，且以 **04** 开头的非压缩公钥。
2. 如果是以 **02** 或 **03** 开头的压缩公钥，使用 `decompressPublicKey:` 解压缩。
3. 加密结果为 ASN1 格式，可使用 `asn1DecodeToC1C3C2Hex:` 解码为 **C1C3C2** 格式。
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
```

## SM2 解密 {#sm2-decrypt}

SM2 解密传入 **ASN1 格式密文** 和 HEX 编码格式 **私钥**。

::: info 注意
1. 私钥必须为 HEX 编码字符串格式，其他格式请先转换。
2. 密文必须为 ASN1 格式，其他格式先进行 **[ASN1 解码编码](./sm2-asn1)** 转换。
:::

```objc
// 非 ASN1 格式先转换，如果是 ASN1 格式则省略此步骤
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:NO];
// 解密得到字符串明文 "123456"
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];

// 非 ASN1 格式先转换，如果是 ASN1 格式则省略此步骤
NSData *asn1Data = [GMSm2Utils asn1EncodeWithC1C3C2Data:c1c3c2Data hasPrefix:NO];
// 解密得到数据块明文 "123456"
NSData *plainData = [GMSm2Utils decryptData:asn1Data privateKey:priKey];
```
