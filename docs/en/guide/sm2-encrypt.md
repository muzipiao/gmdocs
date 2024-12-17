# SM2 encryption and decryption {#sm2-encrypt-decrypt}

SM2 is a Chinese asymmetric algorithm standard based on elliptic curve cryptography. It supports encryption, digital signatures, and key exchange. It has high security and computational efficiency and is widely used in electronic authentication and secure communications.

## Generate key pair {#sm2-generate-key}

::: info Description
The sm2p256v1 curve parameters (NID_sm2) recommended by the national cryptography standard are used by default. If you need to use other curves (such as secp256k1, secp256r1), you can set it through `[GMSm2Utils setCurveType:]`.
:::

```objc
// Generate public and private keys, both of which are in HEX-encoded string format
GMSm2Key *keyPair = [GMSm2Utils generateKey];
// SM2 public key "0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698"
NSString *pubKey = keyPair.publicKey;
// SM2 private key "90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE"
NSString *priKey = keyPair.privateKey;

// If there is only a private key, the corresponding public key can be calculated from the private key
NSString *calculatedPubKey = [GMSm2Utils calcPublicKeyFromPrivateKey:priKey];
```

## SM2 Encryption {#sm2-encrypt}

SM2 encryption supports encryption of any plaintext data of **NSData** or **NSString** type. When encrypting, you need to pass in the plaintext to be encrypted and the public key.

::: info Note
1. The public key must be in HEX encoded string format and a non-compressed public key starting with **04**.
2. If the compressed public key starts with **02** or **03**, use `decompressPublicKey:` to decompress it.
3. The encryption result is in ASN1 format, which can be decoded into **C1C3C2** format using `asn1DecodeToC1C3C2Hex:`.
4. If you need to interact with other platforms, pay attention to the conversion of ciphertext format (C1C3C2/C1C2C3) and encoding method (ASN1/non-ASN1).
:::

```objc
// Plain text (string type)
NSString *plaintext = @"123456";
// SM2 encrypted string type, the result is ASN1 format ciphertext, and encoded in HEX format
NSString *asn1Hex = [GMSm2Utils encryptText:plaintext publicKey:pubKey];

// Plain text (data block of any type)
NSData *plainData = [@"123456" dataUsingEncoding:NSUTF8StringEncoding];
// SM2 encrypted data block type, the result is ASN1 format database, as needed
NSData *asn1Data = [GMSm2Utils encryptData:plainData publicKey:pubKey];

// ASN1 decoded to C1C3C2 format (HEX encoding format)
NSString *c1c3c2Hex = [GMSm2Utils asn1DecodeToC1C3C2Hex:asn1Hex hasPrefix:NO];
// ASN1 decoded to C1C3C2 format (data block type)
NSData *c1c3c2Data = [GMSm2Utils asn1DecodeToC1C3C2Data:asn1Data hasPrefix:NO];
// Ciphertext order C1C3C2 and C1C2C3 can be converted to each other
NSString *c1c2c3Hex = [GMSm2Utils convertC1C3C2HexToC1C2C3:c1c3c2Hex hasPrefix:NO];
// Conversion result c1c3c2HexResult is the same as c1c3c2Hex
NSString *c1c3c2HexResult = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];

// Example of using compressed public key
NSString *compressedPubKey = @"02E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9C6";
NSString *uncompressedPubKey = [GMSm2Utils decompressPublicKey:compressedPubKey];
```

## SM2 decryption {#sm2-decrypt}

SM2 decryption passes in **ASN1 format ciphertext** and HEX encoding format **private key**.

::: info Notes
1. The private key must be in HEX encoding string format.
2. The ciphertext must be in ASN1 format. If you receive a ciphertext that is not in ASN1 format, you need to perform [ASN1 conversion](./sm2-asn1):
   - Convert C1C3C2 format to ASN1: use `asn1EncodeWithC1C3C2Hex:`.
   - Convert C1C2C3 format to C1C3C2 first, then to ASN1.
3. Decryption supports returning plaintext in NSString or NSData format.
:::

```objc
// Non-ASN1 format ciphertext processing example, assuming that the received C1C2C3 format ciphertext
NSString *c1c2c3Hex = @"...";
// 1. Convert to C1C3C2 format first
NSString *c1c3c2Hex = [GMSm2Utils convertC1C2C3HexToC1C3C2:c1c2c3Hex hasPrefix:NO];

// 2. Convert to ASN1 format (omit this step if it is ASN1 format)
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:NO];
// 3. Decrypt to get the string plaintext "123456"
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];
```