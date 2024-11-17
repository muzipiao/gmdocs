# Signature verification {#signature-verify-intro}

Private key signature and public key verification can prevent tampering or verify identity. The specific process is as follows:

- **Signature**: Use the private key to sign the message and generate the signature value (`r` and `s`).

- **Verify**: Use the public key to verify the signature to ensure that the message has not been tampered with and the signature is valid.

## SM2 signature verification {#signature-verify}

**SM2 signature** requires plain text, private key and user ID (default 1234567812345678), **SM2 verification** requires plain text, public key, signature and user ID (must be the same as when signing).

::: info Note
1. User ID can be passed as null value. When passing null value, use `#define SM2_DEFAULT_USERID "1234567812345678"` defined in OpenSSL.
2. The GMObjC signature is in RS string format by default. When interacting with other terminals, the RS concatenation format signature or DER format is used for encoding and decoding as needed.
:::

```objc
GMSm2Key *keyPair = [GMSm2Utils generateKey];
NSString *pubKey = keyPair.publicKey; // Public key starting with 04 for testing (HEX encoding format)
NSString *priKey = keyPair.privateKey; // Private key for testing (HEX encoding format)

NSString *plaintext = @"123456";
// When userID is nil or empty, the default is 1234567812345678; when it is not empty, the signature and verification need the same ID
NSString *userID = @"lifei_zdjl@126.com";
// The signature result is a 128-byte Hex format string concatenated by RS, the first 64 bytes are R, and the last 64 bytes are S
NSString *signRS = [GMSm2Utils signText:plaintext privateKey:priKey userText:userID];
// Verify the signature, return YES if the verification is successful, otherwise the verification fails
BOOL isOK = [GMSm2Utils verifyText:plaintext signRS:signRS publicKey:pubKey userText:userID];
```

## SM2 signature DER encoding and decoding {#signature-der}

In the process of interacting with other terminals, the signature is DER encoded and decoded as needed.

```objc
// The signature result is a 128-byte Hex format string concatenated by RS, the first 64 bytes are R, and the last 64 bytes are S
NSString *signRS = @"86AAD9E78048CB6F6B2A1...7E442E443D4BE49F5A010310B";
// Encode to Der format (HEX encoding format)
NSString *derSign = [GMSm2Utils encodeDerWithSignRS:signRS];
// Decode to RS string format, rsSign is the same as signRS, and remains unchanged before and after encoding and decoding
NSString *rsSign = [GMSm2Utils decodeDerToSignRS:derSign];
```
