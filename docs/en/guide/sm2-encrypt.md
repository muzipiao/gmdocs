# SM2 encryption and decryption {#sm2-encrypt-decrypt}

## Generate key pair {#sm2-generate-key}

```objc
// Generate public and private keys, both of which are in HEX-encoded string format
GMSm2Key *keyPair = [GMSm2Utils generateKey];
// SM2 public key "0408E3FFF9505BCFAF9307E665E9229F4E1B3936437A870407EA3D97886BAFBC9C624537215DE9507BC0E2DD276CF74695C99DF42424F28E9004CDE4678F63D698"
NSString *pubKey = keyPair.publicKey;
// SM2 private key "90F3A42B9FE24AB196305FD92EC82E647616C3A3694441FB3422E7838E24DEAE"
NSString *priKey = keyPair.privateKey;
```

## SM2 encryption {#sm2-encrypt}

SM2 encryption passes in the **plaintext** and **public key** to be encrypted. The plaintext can be any **NSData** or **NSString** type.

::: info Note
1. The public key must be in HEX encoded string format and must be an uncompressed public key starting with **04**.

2. If it is a compressed public key starting with **02** or **03**, use `decompressPublicKey:` to decompress it.
3. The encryption result is in ASN1 format, which can be decoded into **C1C3C2** format using `asn1DecodeToC1C3C2Hex:`.
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
```

## SM2 decryption {#sm2-decrypt}

SM2 decryption passes in **ASN1 format ciphertext** and HEX encoding format **private key**.

::: info Note
1. The private key must be in HEX encoding string format. Please convert to other formats first.
2. The ciphertext must be in ASN1 format. Please convert to other formats first.
:::

```objc
// Convert the non-ASN1 format first, if it is ASN1 format, omit this step
NSString *asn1Hex = [GMSm2Utils asn1EncodeWithC1C3C2Hex:c1c3c2Hex hasPrefix:NO];
// Decrypt to get the string plaintext "123456"
NSString *plaintext = [GMSm2Utils decryptHex:asn1Hex privateKey:priKey];

// Convert the non-ASN1 format first, if it is ASN1 format, omit this step
NSData *asn1Data = [GMSm2Utils asn1EncodeWithC1C3C2Data:c1c3c2Data hasPrefix:NO];
// Decrypt to get the data block plaintext "123456"
NSData *plainData = [GMSm2Utils decryptData:asn1Data privateKey:priKey];
```
