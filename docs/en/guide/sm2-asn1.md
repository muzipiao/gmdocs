# ASN1 encoding and decoding {#asn1-encode-decode}

**ASN.1** (Abstract Syntax Notation One) is a standard format for describing and representing data structures. Its main function is to standardize data representation and encoding across platforms so that different systems can correctly understand and process complex data structures, which is especially common in security and encryption applications.

## ASN1 encoding and decoding in SM2 {#sm2-asn1}

OpenSSL encodes the SM2 encryption result in **ASN1** format, and the ciphertext encoding format is also required to be **ASN1** format when decrypting. GMObjC provides a complete ASN1 encoding and decoding API, supporting ciphertext format conversion.

```objc
// Public key
NSString *pubKey = @"0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9"
                    "C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698";
// Private key
NSString *prikey = @"90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE";

// Encryption: Plain text -> ASN1 format ciphertext (HEX encoding format)
NSString *plaintext = @"123456";
NSString *asn1Hex = [GMSm2Utils encryptText:plaintext publicKey:pubKey];

// Decode: ASN1 -> C1C3C2 format (HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils asn1DecodeToC1C3C2Hex:asn1Hex hasPrefix:NO];

// Encode: C1C3C2 -> ASN1 format
NSString *asn1HexNew = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:NO];
```

## Ciphertext order conversion {#ciphertext-order}

GMObjC supports conversion between **C1C3C2** and **C1C2C3** ciphertext formats. Ciphertext usually does not contain the **04** identifier at the beginning, so `NO` can be passed to the parameter `hasPrefix`.

```objc
// Convert C1C3C2 to C1C2C3 (HEX encoding format)
NSString *c1c2c3Hex = [GMSm2Utils convertC1C3C2HexToC1C2C3:c1c3c2Hex hasPrefix:NO];

// Convert C1C2C3 to C1C3C2 (HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];
```

### Cross-platform scenario example

When connecting to other platforms (such as Java's BouncyCastle), you may need to handle different ciphertext formats.

```objc
// Assume that the encryption result received from the Java side (C1C2C3 format, with 04 prefix, HEX encoding format)
NSString *c1c2c3Hex = @"04FCB4D9E7230B45C20D07F0...F52BD65AB31D4B15BDA1C65";

// 1. Convert to C1C3C2 format (keep 04 prefix, HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:YES];

// 2. Encode to ASN1 format (HEX encoding format)
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:YES];

// 3. Decrypt to get plaintext
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];
```

## Knowledge supplement {#knowledge-supplement}

::: info C1C3C2 meaning
- **C1**: Elliptic curve point, including x and y coordinates (x and y are 32 bytes respectively, a total of 64 bytes, and the Hex format is 128 bytes)
- **C3**: Message authentication code, that is, the summary value (SM3 summary value 32 bytes, HEX encoding format is 64 bytes)
- **C2**: Encrypted data, that is, the encrypted plaintext data (same length as the original data)
:::

::: info Ciphertext format identifier
- **02 or 03**: Compressed representation
- **04**: Uncompressed representation
- **06 or 07**: Mixed representation
:::

::: tip hasPrefix parameter description
When calling ASN1 encoding and decoding and ciphertext conversion related APIs, you need to pay attention to the `hasPrefix` parameter:
- When the ciphertext has a **04** prefix, set it to `YES`
- When the ciphertext does not have a prefix, set it to `NO`
- You can confirm whether it has a prefix by observing the ciphertext or with other platforms
:::