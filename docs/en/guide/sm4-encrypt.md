# SM4 encryption and decryption {#sm4-encrypt-intro}

SM4 symmetric encryption is relatively simple. For encryption, pass in **plaintext** and **key**, and for decryption, pass in **ciphertext** and **key**. GMSm4Utils is an Objective-C implementation of the SM4 block cipher algorithm, supporting both ECB and CBC encryption modes.

::: info Features
- ECB electronic codebook mode, ciphertext is divided into blocks of equal length (filled if insufficient), and encrypted block by block.
- CBC ciphertext block chaining mode, the ciphertext of the previous block and the plaintext of the current block are XORed and then encrypted.
- Padding method: SM4 encryption requires 16-bit alignment, using PKCS7Padding for padding.
- Key length: 16 bytes (32 bytes in HEX format)
- CBC mode requires a 16-byte (32-byte HEX format) initialization vector (IV)
:::

## Key generation {#sm4-generate-key}

```objc
// Returns a 32-character HEX string, e.g. CCDEE6FB253E1CBCD40B12D5E230D0F4
NSString *key = [GMSm4Utils generateKey];
```

## ECB mode {#sm4-ecb}

::: warning
Key length, 16 bytes in string format, 32 bytes in HEX format.
:::

### Binary data processing

```objc
// Binary data encryption and decryption, the key is a 16-byte string
NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// Encryption. The ciphertext is an NSData data block
NSData *cipherData = [GMSm4Utils encryptDataWithECB:plainData keyData:sm4KeyData];
// Decryption. The result is a data block format of 123456 (313233343536)
NSData *decrypted = [GMSm4Utils decryptDataWithECB:cipherData keyData:sm4KeyData];
```

### String encryption

```objc
// String encryption and decryption, HEX encoding format key length is 32 bytes
NSString *sm4KeyHex = @"0123456789abcdef0123456789abcdef";
NSString *plaintext = @"Hello, SM4!";
// Encryption. The ciphertext is in HEX encoding format
NSString *ciphertext = [GMSm4Utils encryptTextWithECB:plaintext keyHex:sm4KeyHex];
// Decryption. The decrypted result is "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithECB:ciphertext keyHex:sm4KeyHex];
```

## CBC mode {#sm4-cbc}

::: tip Note
- The key and IV must be 16 bytes long (the HEX-encoded key/IV length is 32 characters)
- The same IV must be used for encryption and decryption in CBC mode
:::

### Binary data processing

```objc
// Binary data encryption and decryption, the key is a 16-byte string
NSData *sm4KeyData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
NSData *ivecData = [@"0123456789abcdef" dataUsingEncoding:NSUTF8StringEncoding];
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// Encryption. The ciphertext is an NSData data block
NSData *cipherData = [GMSm4Utils encryptDataWithCBC:plainData keyData:sm4KeyData ivecData:ivecData];
// Decryption. The result is a data block format of 123456 (313233343536)
NSData *decrypted = [GMSm4Utils decryptDataWithCBC:cipherData keyData:sm4KeyData ivecData:ivecData];
```

### String encryption

```objc
NSString *keyHex = @"0123456789abcdef0123456789abcdef";
NSString *ivecHex = @"0123456789abcdef0123456789abcdef";
NSString *plaintext = @"Hello, SM4!";

// Encryption. The ciphertext is in HEX encoding format
NSString *ciphertext = [GMSm4Utils encryptTextWithCBC:plaintext keyHex:keyHex ivecHex:ivecHex];
// Decryption. The decrypted result is "Hello, SM4!"
NSString *decrypted = [GMSm4Utils decryptTextWithCBC:ciphertext keyHex:keyHex ivecHex:ivecHex];
```
