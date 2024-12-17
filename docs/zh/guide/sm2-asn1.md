# ASN1 编码解码 {#asn1-encode-decode}

**ASN.1**（Abstract Syntax Notation One）是一种用于描述和表示数据结构的标准格式。主要作用是为了跨平台、标准化数据表示和编码方式，使得不同系统可以正确理解和处理复杂的数据结构，尤其在安全和加密应用中非常常见。

## SM2 中的 ASN1 编码解码 {#sm2-asn1}

OpenSSL 对 SM2 加密结果进行了 **ASN1** 编码，解密时也要求密文编码格式为 **ASN1** 格式。GMObjC 提供了完整的 ASN1 编解码 API，支持密文格式转换。

```objc
// 公钥
NSString *pubKey = @"0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9"
                    "C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698";
// 私钥
NSString *prikey = @"90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE";

// 加密：明文 -> ASN1 格式密文（HEX 编码格式）
NSString *plaintext = @"123456";
NSString *asn1Hex = [GMSm2Utils encryptText:plaintext publicKey:pubKey];

// 解码：ASN1 -> C1C3C2 格式（HEX 编码格式）
NSString *c1c3c2Hex = [GMSm2Utils asn1DecodeToC1C3C2Hex:asn1Hex hasPrefix:NO];

// 编码：C1C3C2 -> ASN1 格式
NSString *asn1HexNew = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:NO];
```

## 密文顺序转换 {#ciphertext-order}

GMObjC 支持 **C1C3C2** 和 **C1C2C3** 两种密文格式的相互转换。密文通常不包含 **04** 标识开头，参数 `hasPrefix` 传入 `NO` 即可。

```objc
// C1C3C2 转换为 C1C2C3（HEX 编码格式）
NSString *c1c2c3Hex = [GMSm2Utils convertC1C3C2HexToC1C2C3:c1c3c2Hex hasPrefix:NO];

// C1C2C3 转换为 C1C3C2 （HEX 编码格式）
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];
```

### 跨平台场景示例

当与其他平台对接时(如 Java 的 BouncyCastle)，可能需要处理不同的密文格式。

```objc
// 假设收到 Java 端的加密结果(C1C2C3 格式，带 04 前缀，HEX 编码格式)
NSString *c1c2c3Hex = @"04FCB4D9E7230B45C20D07F0...F52BD65AB31D4B15BDA1C65";

// 1. 转换为 C1C3C2 格式(保留 04 前缀，HEX 编码格式)
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:YES];

// 2. 编码为 ASN1 格式（HEX 编码格式）
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:YES];

// 3. 解密得到明文
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];
```

## 知识补充 {#knowledge-supplement}

::: info C1C3C2 含义
- **C1**：椭圆曲线点，包含 x 和 y 坐标（x 和 y 分别是 32 字节，共 64 字节，Hex 格式则为 128 字节）
- **C3**：消息认证码，即摘要值（SM3 摘要值 32 字节，HEX 编码格式则为 64 字节）
- **C2**：加密数据，即明文加密后的数据（与原始数据长度相同）
:::

::: info 密文格式标识
- **02 或 03**：压缩表示形式
- **04**：未压缩表示形式
- **06 或 07**：混合表示形式
:::

::: tip hasPrefix 参数说明
在调用 ASN1 编解码和密文转换相关 API 时，需要注意 `hasPrefix` 参数：
- 当密文带有 **04** 前缀时，设置为 `YES`
- 当密文不带前缀时，设置为 `NO`
- 可以通过观察密文或与其他平台确认是否带有前缀
:::
