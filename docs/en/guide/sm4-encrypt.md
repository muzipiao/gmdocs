# SM4 encryption and decryption {#sm4-encrypt-intro}

SM4 is a national symmetric encryption algorithm. GMSm4Utils provides its Objective-C implementation. It supports two encryption modes, ECB and CBC, and can be used to encrypt binary data or strings.

::: info Feature introduction
- **Block size**: 16 bytes
- **Key length**: 16 bytes (32 characters when HEX encoded)
- **Padding method**: PKCS7Padding (automatically fill to multiples of 16 bytes)
- **Encryption mode**:
  - ECB (Electronic Codebook Mode): Split the plaintext into fixed block sizes (16 bytes) (fill if insufficient), and encrypt each block one by one.
  - CBC (Ciphertext Block Chaining Mode): Each plaintext block is first XORed with the previous ciphertext block before encryption, requiring a 16-byte initial vector (IV), which is more secure.
:::

## Key generation {#sm4-generate-key}

```objc
// Generate a 32-character HEX format key. Output example: CCDEE6FB253E1CBCD40B12D5E230D0F4
NSString *key = [GMSm4Utils generateKey];
```

## ECB mode {#sm4-ecb}

::: warning Note
Key format requirements:
- String mode: 32-character HEX string
- Binary mode: 16-byte NSData
:::

### Binary data processing

```objc
// 1. String encryption (using HEX format key)
NSString *sm4KeyHex = @"CCDEE6FB253E1CBCD40B12D5E230D0F4";
NSString *plaintext = @"Hello, SM4!";
// Encryption. The ciphertext is in HEX encoding format
NSString *cipherHex = [GMSm4Utils encryptTextWithECB:plaintext keyHex:sm4KeyHex];
// Decryption. The decrypted result is "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithECB:cipherHex keyHex:sm4KeyHex];

// 2. Binary data encryption
// Convert the HEX format key to NSData
NSData *sm4KeyData = [GMSmUtils dataFromHexString:sm4KeyHex];
// Or directly use a 16-byte string to NSData
// NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];

NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// Encryption
NSData *cipherData = [GMSm4Utils encryptDataWithECB:plainData keyData:sm4KeyData];
// Decryption
NSData *decrypted = [GMSm4Utils decryptDataWithECB:cipherData keyData:sm4KeyData];
```

## CBC mode {#sm4-cbc}

::: tip
- Both the key and IV must be 16 bytes long (the HEX-encoded key/IV length is 32 bytes).
- The same IV must be used for encryption and decryption. The IV vector can be regarded as a random number of fixed length.
- CBC mode is more secure than ECB and is recommended for sensitive data encryption.
:::

```objc
// 1. String encryption (using HEX format key and IV)
NSString *sm4KeyHex = @"CCDEE6FB253E1CBCD40B12D5E230D0F4";
NSString *ivecHex = @"CCDEE6FB253E1CBCD40B12D5E230D0F4";
NSString *plaintext = @"Hello, SM4!";
// Encryption. Output HEX format ciphertext
NSString *ciphertext = [GMSm4Utils encryptTextWithCBC:plaintext keyHex:sm4KeyHex ivecHex:ivecHex];
// Decryption. The decrypted result is "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithCBC:ciphertext keyHex:sm4KeyHex ivecHex:ivecHex];

// 2. Binary data encryption
// Convert HEX format key and IV to NSData
NSData *sm4KeyData = [GMSmUtils dataFromHexString:sm4KeyHex];
NSData *ivecData = [GMSmUtils dataFromHexString:ivecHex];
// Or directly use 16-byte string to NSData
// NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
// NSData *ivecData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];

NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// Encrypt 
NSData *cipherData = [GMSm4Utils encryptDataWithCBC:plainData keyData:sm4KeyData ivecData:ivecData];
// Decrypt 
NSData *decrypted = [GMSm4Utils decryptDataWithCBC:cipherData keyData:sm4KeyData ivecData:ivecData];
```