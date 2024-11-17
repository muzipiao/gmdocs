# ECDH key negotiation {#sm2-ecdh}

ECDH (Elliptic Curve Diffie-Hellman) is a key exchange protocol based on elliptic curves that allows two parties to securely share a common key over an insecure channel. The basic process is as follows:

1. **Public key generation**: Both parties generate a pair of elliptic curve key pairs (private key, public key) and exchange public keys.

2. **Shared key calculation**: Each party uses the other party's public key and its own private key to generate the same shared key through elliptic curve operations.

3. **Result**: Both parties obtain the same shared key, which can be used for symmetric encryption communication.

The security of ECDH depends on the elliptic curve discrete logarithm problem. `ECDH_compute_key()` in OpenSSL performs elliptic curve Diffie-Hellman key negotiation, which can negotiate an identical key when both parties are transmitting in plain text.

## ECDH example {#sm2-ecdh-sample}

1. The client randomly generates a pair of public and private keys clientPublicKey, clientPrivateKey;
2. The server randomly generates a pair of public and private keys serverPublicKey, serverPrivateKey;
3. Both parties use network requests or other methods to exchange public keys clientPublicKey and serverPublicKey, and keep the private key by themselves;
4. The client calculates `clientECDH = [GMSm2Utils computeECDH:serverPubKey privateKey:clientPriKey]`;
5. The server calculates `serverECDH = [GMSm2Utils computeECDH:clientPubKey privateKey:serverPriKey]`;
6. The clientECDH and serverECDH calculated by both parties should be equal, and this key can be used as the key for symmetric encryption.

```objc
// The client generates a pair of public and private keys
GMSm2Key *clientKey = [GMSm2Utils generateKey];
NSString *clientPubKey = clientKey.publicKey;
NSString *clientPriKey = clientKey.privateKey;

// The server generates a pair of public and private keys
GMSm2Key *serverKey = [GMSm2Utils generateKey];
NSString *serverPubKey = serverKey.publicKey;
NSString *serverPriKey = serverKey.privateKey;

// The client obtains the public key serverPubKey from the server, and the client negotiates a 32-byte symmetric key clientECDH, which is 64 bytes after conversion to Hex
NSString *clientECDH = [GMSm2Utils computeECDH:serverPubKey privateKey:clientPriKey];
// The client sends the public key clientPubKey to the server, and the server negotiates a 32-byte symmetric key serverECDH, which is 64 bytes after conversion to Hex
NSString *serverECDH = [GMSm2Utils computeECDH:clientPubKey privateKey:serverPriKey];

// In the case of all plaintext transmission, the client and server negotiated equal symmetric keys, and clientECDH==serverECDH holds
if ([clientECDH isEqualToString:serverECDH]) {
NSLog(@"ECDH key negotiation succeeded, the negotiated symmetric key is:\n%@", clientECDH);
}else{
NSLog(@"ECDH key negotiation failed");
}
```
