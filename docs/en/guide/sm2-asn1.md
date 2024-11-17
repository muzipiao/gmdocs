# ASN1 encoding and decoding {#asn1-encode-decode}

**ASN.1** (Abstract Syntax Notation One) is a standard format for describing and representing data structures. Its main function is to standardize data representation and encoding across platforms, so that different systems can correctly understand and process complex data structures, especially in security and encryption applications.

## ASN1 encoding and decoding in SM2 {#sm2-asn1}

OpenSSL encodes the SM2 encryption result in **ASN1** format, and the ciphertext encoding format is also required to be **ASN1** format when decrypting. The ciphertext can be decoded to obtain the original ciphertext of **C1C3C2** sequential splicing.

```objc
// Public key
NSString *pubKey = @"0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9"
                    "C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698";
// Private key
NSString *prikey = @"90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE";

// Plain text (string type)
NSString *plaintext = @"123456";

// SM2 encrypted string type, the result is ASN1 format ciphertext, and encoded in HEX format
NSString *asn1Hex = [GMSm2Utils encryptText:plaintext publicKey:pubKey];

// ASN1 decoded to C1C3C2 format (HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils asn1DecodeToC1C3C2Hex:asn1Hex hasPrefix:NO];
```

## Ciphertext order {#ciphertext-order}

**ASN1** ciphertext decoded original ciphertext order defaults to **C1C3C2**, other platforms may require **C1C2C3** ciphertext order, can be converted as needed. Ciphertext usually does not contain **04** identifier at the beginning, parameter `hasPrefix` passes `NO`.

```objc
// Ciphertext sequence C1C3C2 can be converted to C1C2C3 (HEX encoding format)
NSString *c1c2c3Hex = [GMSm2Utils convertC1C3C2HexToC1C2C3:c1c3c2Hex hasPrefix:NO];

// Ciphertext sequence C1C2C3 can also be converted to C1C3C2 (HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];

// Encode C1C3C2 ciphertext to ASN1 format (HEX encoding format), decode and re-encode, the encryption result remains unchanged
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex2 hasPrefix:NO];
```

**Cross-platform conversion example**

For example, the Java end uses BouncyCastle for SM2 encryption, and the ciphertext obtained may be a ciphertext starting with the **04** identifier and arranged in **C1C2C3**.

Then the client uses OpenSSL to decrypt the order as follows:

1. Convert the ciphertext arrangement order from **C1C2C3** to **C1C3C2**;

2. Encode the **C1C3C2** ciphertext into **ASN1** format ciphertext;

3. Use `decryptHex:` to decrypt the **ASN1** format ciphertext and obtain the plaintext.

```objc
// Assume c1c2c3Hex is the encryption result on the Java side (HEX encoding format)
NSString *c1c2c3Hex = @"04FCB4D9E7230B45C20D07F0...F52BD65AB31D4B15BDA1C65";
BOOL hasPrefix = YES // There is a 04 flag, and the hasPrefix parameter is set to YES. Whether there is an identification can be confirmed by observation or with other platforms

// First convert the ciphertext sequence C1C2C3 to C1C3C2 (HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:hasPrefix];

// Encode the C1C3C2 ciphertext to ASN1 format (HEX encoding format)
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex2 hasPrefix:hasPrefix];

// Use the private key to decrypt and get the string plaintext "123456"
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];
```

## Knowledge Supplement {#knowledge-supplement}

::: info C1C3C2 Meaning
- **C1**: Elliptic curve point, including x and y coordinates (x and y are 32 bytes respectively, a total of 64 bytes, and the Hex format is 128 bytes)
- **C3**: Message authentication code, that is, the digest value (SM3 digest value is 32 bytes, and the HEX encoding format is 64 bytes)
- **C2**: Encrypted data, that is, the encrypted plaintext data (the same length as the original data)
:::

**Ciphertext combination method**:

After ASN1 decodes the ciphertext, the ciphertext arrangement order is C1C3C2 (HEX encoding format). It is known that the length of C1 is fixed to 128 bytes and the length of C3 is fixed to 64 bytes. Then the data `C2 length = the total length of the ciphertext string - C1 length 128 bytes - C3 length 64 Bytes`, so we get C1, C2, C3 strings respectively, which can be freely spliced.

**Ciphertext format identifier**

In OpenSSL encryption and decryption, the public key contains the **04** identifier, while the private key and ciphertext generally do not contain the **Ciphertext format identifier**:

::: info Common identifiers
- **02 or 03**: compressed representation
- **04**: uncompressed representation
- **06 or 07**: mixed representation
:::
