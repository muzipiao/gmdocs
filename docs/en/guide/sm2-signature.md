# Signature Verification {#signature-verify-intro}

Private key signature, public key verification, can prevent tampering or verify identity. SM2 signature verification uses the sm2p256v1 recommended curve by default.

## SM2 signature verification {#signature-verify}

### Basic process

1. **Signature**: Sign the message with the private key and generate the signature value (the concatenation of `r` and `s`)

2. **Verify**: Use the public key to verify the signature to ensure that the message has not been tampered with and the signature is valid

```objc
// 1. Generate key pair
GMSm2Key *keyPair = [GMSm2Utils generateKey];
NSString *pubKey = keyPair.publicKey; // Public key starting with 04 (HEX format)
NSString *priKey = keyPair.privateKey; // Private key (HEX format)

// 2. Information to be signed and user identity
NSString *plaintext = @"123456";
NSString *userID = @"lifei_zdjl@126.com"; // Optional user identity

// 3. Signature: Return RS 128-byte concatenated Hex string (the first 64 bytes are R, the last 64 bytes are S)
NSString *signRS = [GMSm2Utils signText:plaintext privateKey:priKey userText:userID];

// 4. Verify: Return YES if verification succeeds, NO if it fails
BOOL isOK = [GMSm2Utils verifyText:plaintext signRS:signRS publicKey:pubKey userText:userID];
```

::: info Important Notes
1. **User ID (userID)**
   - You can pass nil or empty value, in which case `1234567812345678` is used by default
   - The same user ID must be used for signing and verifying
   - The user ID can be used to identify the signer

2. **Signature format**
   - Default output RS concatenation format (128-byte Hex string)
   - R and S each occupy 64 bytes
   - If you need to interact with other platforms, you can convert to DER format as needed
:::

## SM2 signature DER encoding and decoding {#signature-der}

When interacting with other platforms, you may need to convert between RS format and DER format.

```objc
// RS format signature (128-byte Hex string)
NSString *signRS = @"86AAD9E78048CB6F6B2A1...7E442E443D4BE49F5A010310B";

// RS to DER format
NSString *derSign = [GMSm2Utils encodeDerWithSignRS:signRS];

// DER back to RS format
NSString *rsSign = [GMSm2Utils decodeDerToSignRS:derSign];
```

::: tip
DER format is a universal encoding format, more suitable for cross-platform transmission. When interacting with other platforms such as Java and JavaScript, pay attention to the conversion of signature format.
:::