# SM3 Digest {#sm3-digest-intro}

Similar to MD5, SHA1 and other digest algorithms, GMSm3Utils is a tool class for implementing SM3 digest algorithm and HMAC message authentication code. The SM3 digest algorithm key is any non-null character, the output digest length is 32 bytes, and the length after conversion to hexadecimal string is 64 characters.

## SM3 Digest Calculation {#sm3-digest}

SM3 digest algorithm supports digest calculation of text strings and binary data.

```objc
// String input, return digest string in hexadecimal format
NSString *digest = [GMSm3Utils hashWithText:@"Hello, SM3!"];

// Binary data input, return digest in byte array format
NSData *data = [@"Binary Data" dataUsingEncoding:NSUTF8StringEncoding];
NSData *digest = [GMSm3Utils hashWithData:data];
```

## HMAC calculation {#sm3-hmac}

HMAC supports multiple digest algorithms, and SM3 is used by default. Supported algorithm types include:

- SM3 (default)
- MD5
- SHA1
- SHA224
- SHA256
- SHA384
- SHA512

### Basic HMAC calculation (using the default SM3 algorithm)

```objc
// Input in string format, return the HMAC digest in hexadecimal format
NSString *hmac = [GMSm3Utils hmacWithText:@"Message" keyText:@"SecretKey"];

// Input in binary data format, return the HMAC digest in byte array format
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
NSData *keyData = [@"SecretKey" dataUsingEncoding:NSUTF8StringEncoding];
NSData *hmac = [GMSm3Utils hmacWithData:plainData keyData:keyData];
```

### Calculate HMAC with specified algorithm type

```objc
// NSData format of plain text 123456, the key used for encryption is any non-empty
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
NSData *keyData = [@"qwertyuiop1234567890" dataUsingEncoding:NSUTF8StringEncoding];

// Calculate HMAC using different algorithms
NSData *hmacMD5 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_MD5];
NSData *hmacSHA1 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA1];
NSData *hmacSHA224 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA224]; NSData *hmacSHA256 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA256]; NSData *hmacSHA384 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA384]; NSData *hmacSHA512 = [GMSm3Utils hmacWithData:plainData keyData:keyData keyType:GMHashType_SHA512]; // String format input, specify algorithm type NSString *hmacSHA512 = [GMSm3Utils hmacWithText:@"Message" keyText:@"SecretKey" keyType:GMHashType_SHA512]; 
```