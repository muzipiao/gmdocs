# SM3 摘要 {#sm3-digest-intro}

类似于 MD5、SHA1 等摘要算法，GMSm3Utils 是一个用于实现 SM3 摘要算法和 HMAC 消息认证码的工具类。SM3 摘要算法密钥为任意非空字符，输出摘要长度为 32 字节，转换为十六进制字符串后长度为 64 个字符。

## SM3 摘要计算 {#sm3-digest}

SM3 摘要算法支持对文本字符串和二进制数据进行摘要计算。

```objc
// 字符串输入，返回十六进制格式的摘要字符串
NSString *digest = [GMSm3Utils hashWithText:@"Hello, SM3!"];

// 二进制数据输入，返回字节数组格式的摘要
NSData *data = [@"Binary Data" dataUsingEncoding:NSUTF8StringEncoding];
NSData *digest = [GMSm3Utils hashWithData:data];
```

## HMAC 计算 {#sm3-hmac}

HMAC 支持多种摘要算法，默认使用 SM3。支持的算法类型包括：

- SM3 (默认)
- MD5
- SHA1
- SHA224
- SHA256
- SHA384
- SHA512

### 基础 HMAC 计算（使用默认 SM3 算法）

```objc
// 字符串格式输入，返回十六进制的 HMAC 摘要
NSString *hmac = [GMSm3Utils hmacWithText:@"Message" keyText:@"SecretKey"];

// 二进制数据格式输入，返回字节数组格式的 HMAC 摘要
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
NSData *keyData = [@"SecretKey" dataUsingEncoding:NSUTF8StringEncoding];
NSData *hmac = [GMSm3Utils hmacWithData:plainData keyData:keyData];
```

### 指定算法类型的 HMAC 计算

```objc

// 明文 123456 的 NSData 格式，加密使用的 key 为任意非空
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
NSData *keyData = [@"qwertyuiop1234567890" dataUsingEncoding:NSUTF8StringEncoding];

// 使用不同算法计算 HMAC
NSData *hmacMD5 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_MD5];
NSData *hmacSHA1 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA1];
NSData *hmacSHA224 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA224];
NSData *hmacSHA256 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA256];
NSData *hmacSHA384 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA384];
NSData *hmacSHA512 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA512];

// 字符串格式输入，指定算法类型
NSString *hmacSHA512 = [GMSm3Utils hmacWithText:@"Message" keyText:@"SecretKey" keyType:GMHashType_SHA512];
```
