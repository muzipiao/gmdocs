# SM4 加解密 {#sm4-encrypt-intro}

SM4 对称加密较简单，加密传入 **明文** 和 **密钥**，解密传入 **密文** 和 **密钥** 即可。GMSm4Utils 是一个 SM4 分组密码算法的 Objective-C 实现，支持 ECB 和 CBC 两种加密模式。

::: info 特性介绍
- ECB 电子密码本模式，密文分割成长度相等的块（不足补齐），逐个块加密。
- CBC 密文分组链接模式，前一个分组的密文和当前分组的明文异或或操作后再加密。
- 填充方式：SM4 加密需要 16 位对齐，使用 PKCS7Padding 填充。
- 密钥长度：16 字节（HEX 编码格式为 32 字节）
- CBC 模式需要 16 字节（HEX 编码格式为 32 字节）初始化向量(IV)
:::

## 密钥生成 {#sm4-generate-key}

```objc
// 返回 32 字符的 HEX 字符串，例如 CCDEE6FB253E1CBCD40B12D5E230D0F4
NSString *key = [GMSm4Utils generateKey];
```

## ECB 模式 {#sm4-ecb}

::: warning 注意
密钥长度，字符串格式 16 字节，HEX 编码格式 32 字节。
:::

### 二进制数据处理

```objc
// 二进制数据加解密，密钥为 16 字节字符串
NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// 加密。密文为 NSData 数据块
NSData *cipherData = [GMSm4Utils encryptDataWithECB:plainData keyData:sm4KeyData];
// 解密。结果为 123456 的数据块格式 (313233343536)
NSData *decrypted = [GMSm4Utils decryptDataWithECB:cipherData keyData:sm4KeyData];
```

### 字符串加密

```objc
// 字符串加解密，HEX 编码格式密钥长度为 32 字节
NSString *sm4KeyHex = @"0123456789abcdef0123456789abcdef";
NSString *plaintext = @"Hello, SM4!";
// 加密。密文为 HEX 编码格式
NSString *ciphertext = [GMSm4Utils encryptTextWithECB:plaintext keyHex:sm4KeyHex];
// 解密。解密结果为 "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithECB:ciphertext keyHex:sm4KeyHex];
```

## CBC 模式 {#sm4-cbc}

::: tip 注意
- 密钥和 IV 必须是 16 字节长度（HEX 编码的密钥/IV 长度为 32 字符）
- CBC 模式下加解密须使用相同的 IV
:::

### 二进制数据处理

```objc
// 二进制数据加解密，密钥为 16 字节字符串
NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
NSData *ivecData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// 加密。密文为 NSData 数据块
NSData *cipherData = [GMSm4Utils encryptDataWithCBC:plainData keyData:sm4KeyData ivecData:ivecData];
// 解密。结果为 123456 的数据块格式 (313233343536)
NSData *decrypted = [GMSm4Utils decryptDataWithCBC:cipherData keyData:sm4KeyData ivecData:ivecData];
```

### 字符串加密

```objc
NSString *keyHex = @"0123456789abcdef0123456789abcdef";
NSString *ivecHex = @"0123456789abcdef0123456789abcdef";
NSString *plaintext = @"Hello, SM4!";

// 加密。密文为 HEX 编码格式
NSString *ciphertext = [GMSm4Utils encryptTextWithCBC:plaintext keyHex:keyHex ivecHex:ivecHex];
// 解密。解密结果为 "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithCBC:ciphertext keyHex:keyHex ivecHex:ivecHex];
```
