# ASN1 编码解码 {#asn1-encode-decode}

**ASN.1**（Abstract Syntax Notation One）是一种用于描述和表示数据结构的标准格式。主要作用是为了跨平台、标准化数据表示和编码方式，使得不同系统可以正确理解和处理复杂的数据结构，尤其在安全和加密应用中非常常见。

## SM2 中的 ASN1 编码解码 {#sm2-asn1}

OpenSSL 对 SM2 加密结果进行了 **ASN1** 编码，解密时也要求密文编码格式为 **ASN1** 格式，密文可解码得到 **C1C3C2** 顺序拼接的原始密文。

```objc
// 公钥
NSString *pubKey = @"0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9"
                    "C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698";
// 私钥
NSString *prikey = @"90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE";

// 明文（字符串类型）
NSString *plaintext = @"123456";

// SM2 加密字符串类型，结果为 ASN1 格式的密文，并编码为 HEX 格式
NSString *asn1Hex = [GMSm2Utils encryptText:plaintext publicKey:pubKey];

// ASN1 解码为 C1C3C2 格式（HEX 编码格式）
NSString *c1c3c2Hex = [GMSm2Utils asn1DecodeToC1C3C2Hex:asn1Hex hasPrefix:NO];
```

## 密文顺序 {#ciphertext-order}

**ASN1** 密文解码得到的原始密文顺序默认为 **C1C3C2**，其他平台可能需要顺序为 **C1C2C3** 的密文，可根据需要转换。密文通常不包含 **04** 标识开头，参数 `hasPrefix` 传入 `NO` 即可。

```objc
// 密文顺序 C1C3C2 可转换为 C1C2C3（HEX 编码格式）
NSString *c1c2c3Hex = [GMSm2Utils convertC1C3C2HexToC1C2C3:c1c3c2Hex hasPrefix:NO];

// 密文顺序 C1C2C3 也可转换为 C1C3C2（HEX 编码格式）
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];

// 将 C1C3C2 密文编码为 ASN1 格式（HEX 编码格式），解码再编码，加密结果不变
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex2 hasPrefix:NO];
```

**跨平台转换示例**

例如 Java 端使用 BouncyCastle 进行 SM2 加密，得到密文可能是 **04** 标识开头，按照 **C1C2C3** 排列的密文。

则客户端使用 OpenSSL 解密顺序为：

1. 将密文排列顺序由 **C1C2C3** 转换为 **C1C3C2**；
2. 将 **C1C3C2** 密文编码为 **ASN1** 格式密文；
3. 使用`decryptHex:`解密 **ASN1** 格式密文，得到明文。

```objc
// 假设 c1c2c3Hex 是 Java 端加密结果（HEX 编码格式）
NSString *c1c2c3Hex = @"04FCB4D9E7230B45C20D07F0...F52BD65AB31D4B15BDA1C65";
BOOL hasPrefix = YES // 有 04 标识，hasPrefix 参数设置为 YES。是否有标识，可通过观察或与其他平台确认

// 先将密文顺序 C1C2C3 转换为 C1C3C2（HEX 编码格式）
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:hasPrefix];

// 将 C1C3C2 密文编码为 ASN1 格式（HEX 编码格式）
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex2 hasPrefix:hasPrefix];

// 使用私钥解密得到字符串明文 "123456"
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];
```

## 知识补充 {#knowledge-supplement}

::: info C1C3C2 含义
- **C1**：椭圆曲线点，包含 x 和 y 坐标（x 和 y 分别是 32 字节，共 64 字节，Hex 格式则为 128 字节）
- **C3**：消息认证码，即摘要值（SM3 摘要值 32 字节，HEX 编码格式则为 64 字节）
- **C2**：加密数据，即明文加密后的数据（与原始数据长度相同）
:::

**密文组合方式**：

ASN1 解码密文后，得到的密文排列顺序为 C1C3C2（HEX 编码格式），已知 C1 长度固定为 128 字节，C3 长度固定为 64 字节，那数据 `C2 长度 = 密文字符串总长度 - C1 长度 128 字节 - C3 长度 64 字节`，这样就分别得到了 C1、C2、C3 字符串，自由拼接。

**密文格式标识**

OpenSSL 中加解密，公钥包含 **04** 标识，私钥和密文一般不包含 **密文格式标识**：

::: info 常见标识
- **02 或 03**：压缩表示形式
- **04**：未压缩表示形式
- **06 或 07**：混合表示形式
:::
