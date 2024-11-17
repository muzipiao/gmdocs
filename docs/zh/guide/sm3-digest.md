# SM3 摘要 {#sm3-digest-intro}

类似于 MD5、SHA1 等摘要算法，GMSm3Utils 是一个用于实现 SM3 摘要算法和 HMAC 消息认证码的工具类。

## SM3 摘要计算 {#sm3-digest}

SM3 摘要算法可对文本和文件进行摘要计算，SM3 摘要长度为 64 字节的 HEX 编码格式字符串。

```objc
// 字符串输入，返回十六进制摘要
NSString *digest = [GMSm3Utils hashWithText:@"Hello, SM3!"];

// 二进制数据输入，返回字节数组
NSData *data = [@"Binary Data" dataUsingEncoding:NSUTF8StringEncoding];
NSData *digest = [GMSm3Utils hashWithData:data];
```

## HMAC 计算 {#sm3-hmac}

默认使用 **SM3** 算法计算 HMAC，同时支持 MD5、SHA1、SHA224/256/384/512 等其他算法。

```objc
// 默认使用 SM3 计算 HMAC 摘要
NSString *hmac = [GMSm3Utils hmacWithText:@"Message" keyText:@"SecretKey"];

// 明文 123456 的 NSData 格式
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// 加密使用的 key
NSData *keyData = [@"qwertyuiop1234567890" dataUsingEncoding:NSUTF8StringEncoding];
// 使用 MD5 计算 HMAC 摘要
NSData *hmacMD5 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_MD5];
// 使用 SHA1 计算 HMAC 摘要
NSData *hmacSHA1 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA1];
// 使用 SHA224 计算 HMAC 摘要
NSData *hmacSHA224 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA224];
// 使用 SHA256 计算 HMAC 摘要
NSData *hmacSHA256 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA256];
// 使用 SHA384 计算 HMAC 摘要
NSData *hmacSHA384 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA384];
// 使用 SHA512 计算 HMAC 摘要
NSData *hmacSHA512 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA512];
```
