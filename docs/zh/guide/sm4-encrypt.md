# SM4 加解密 {#sm4-encrypt-intro}

SM4 是国密对称加密算法，GMSm4Utils 提供了其 Objective-C 实现。支持 ECB 和 CBC 两种加密模式，可用于加密二进制数据或字符串。

::: info 特性介绍
- **分组大小**: 16 字节
- **密钥长度**: 16 字节（HEX 编码时为 32 字符）
- **填充方式**: PKCS7Padding（自动补齐到 16 字节的倍数）
- **加密模式**: 
  - ECB (电子密码本模式): 将明文按照固定的块大小（16 字节）进行分割（不足补齐），逐个块加密。
  - CBC (密文分组链接模式): 每个明文块先与前一个密文块进行异或操作再加密，需要 16 字节的初始向量(IV)，安全性更高。
:::

## 密钥生成 {#sm4-generate-key}

```objc
// 生成 32 字符的 HEX 格式密钥。输出示例: CCDEE6FB253E1CBCD40B12D5E230D0F4
NSString *key = [GMSm4Utils generateKey];
```

## ECB 模式 {#sm4-ecb}

::: warning 注意
密钥格式要求：
- 字符串模式：32 字符的 HEX 字符串
- 二进制模式：16 字节的 NSData
:::

### 二进制数据处理

```objc
// 1. 字符串加密（使用 HEX 格式的密钥）
NSString *sm4KeyHex = @"CCDEE6FB253E1CBCD40B12D5E230D0F4";
NSString *plaintext = @"Hello, SM4!";
// 加密。密文为 HEX 编码格式
NSString *cipherHex = [GMSm4Utils encryptTextWithECB:plaintext keyHex:sm4KeyHex];
// 解密。解密结果为 "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithECB:cipherHex keyHex:sm4KeyHex];

// 2. 二进制数据加密
// 将 HEX 格式密钥转换为 NSData
NSData *sm4KeyData = [GMSmUtils dataFromHexString:sm4KeyHex];
// 或直接使用 16 字节字符串转 NSData
// NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];

NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// 加密
NSData *cipherData = [GMSm4Utils encryptDataWithECB:plainData keyData:sm4KeyData];
// 解密
NSData *decrypted = [GMSm4Utils decryptDataWithECB:cipherData keyData:sm4KeyData];
```

## CBC 模式 {#sm4-cbc}

::: tip 注意事项
- 密钥和 IV 都必须是 16 字节长度（HEX 编码的密钥/IV 长度为 32 字节）。
- 加解密必须使用相同的 IV，IV 向量可以看做一个固定长度的随机数。
- CBC 模式比 ECB 更安全，推荐用于敏感数据加密。
:::

```objc
// 1. 字符串加密（使用 HEX 格式的密钥和 IV）
NSString *sm4KeyHex = @"CCDEE6FB253E1CBCD40B12D5E230D0F4";
NSString *ivecHex = @"CCDEE6FB253E1CBCD40B12D5E230D0F4";
NSString *plaintext = @"Hello, SM4!";
// 加密。输出 HEX 格式密文
NSString *ciphertext = [GMSm4Utils encryptTextWithCBC:plaintext keyHex:sm4KeyHex ivecHex:ivecHex];
// 解密。解密结果为 "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithCBC:ciphertext keyHex:sm4KeyHex ivecHex:ivecHex];

// 2. 二进制数据加密
// 将 HEX 格式密钥和 IV 转换为 NSData
NSData *sm4KeyData = [GMSmUtils dataFromHexString:sm4KeyHex];
NSData *ivecData = [GMSmUtils dataFromHexString:ivecHex];
// 或直接使用 16 字节字符串转 NSData
// NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
// NSData *ivecData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];

NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// 加密
NSData *cipherData = [GMSm4Utils encryptDataWithCBC:plainData keyData:sm4KeyData ivecData:ivecData];
// 解密
NSData *decrypted = [GMSm4Utils decryptDataWithCBC:cipherData keyData:sm4KeyData ivecData:ivecData];
```
