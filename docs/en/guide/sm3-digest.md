# SM3 Digest {#sm3-digest-intro}

Similar to MD5, SHA1 and other digest algorithms, GMSm3Utils is a tool class for implementing SM3 digest algorithm and HMAC message authentication code.

## SM3 Digest Calculation {#sm3-digest}

SM3 digest algorithm can perform digest calculation on text and files. SM3 digest length is 64 bytes HEX encoding format string.

```objc
// String input, return hexadecimal digest
NSString *digest = [GMSm3Utils hashWithText:@"Hello, SM3!"];

// Binary data input, return byte array
NSData *data = [@"Binary Data" dataUsingEncoding:NSUTF8StringEncoding];
NSData *digest = [GMSm3Utils hashWithData:data];
```

## HMAC calculation {#sm3-hmac}

By default, **SM3** algorithm is used to calculate HMAC, and other algorithms such as MD5, SHA1, SHA224/256/384/512 are supported.

```objc
// Calculate HMAC digest using SM3 by default
NSString *hmac = [GMSm3Utils hmacWithText:@"Message" keyText:@"SecretKey"];

// NSData format of plain text 123456
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// Key used for encryption
NSData *keyData = [@"qwertyuiop1234567890" dataUsingEncoding:NSUTF8StringEncoding];
// Calculate HMAC digest using MD5
NSData *hmacMD5 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_MD5];
// Calculate HMAC digest using SHA1
NSData *hmacSHA1 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA1]; 
// Calculate HMAC digest using SHA224 
NSData *hmacSHA224 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA224]; 
// Calculate HMAC digest using SHA256 
NSData *hmacSHA256 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA256]; 
// Calculate HMAC digest using SHA384 
NSData *hmacSHA384 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA384]; 
// Calculate HMAC digest using SHA512 
NSData *hmacSHA512 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA512]; 
```
