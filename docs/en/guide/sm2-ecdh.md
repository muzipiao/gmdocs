# ECDH Key Agreement {#sm2-ecdh}

ECDH (Elliptic Curve Diffie-Hellman) is a key exchange protocol based on elliptic curves that allows two parties to securely share a common key over an insecure channel. The basic process is as follows:

1. **Public key generation**: Both parties generate a pair of elliptic curve key pairs (private key, public key) and exchange public keys.
2. **Shared key calculation**: Each party uses the other party's public key and its own private key to generate the same shared key through elliptic curve operations.
3. **Result**: Both parties obtain the same shared key, which can be used for symmetric encryption communication.

The security of ECDH depends on the elliptic curve discrete logarithm problem. In GMObjC, the `computeECDH:privateKey:` method implements ECDH key agreement based on the SM2 curve, which can negotiate an identical key when both parties are transmitting in plain text.

## ECDH Example {#sm2-ecdh-sample}

1. The client randomly generates a pair of public and private keys (clientPublicKey, clientPrivateKey)
2. The server randomly generates a pair of public and private keys (serverPublicKey, serverPrivateKey)
3. Both parties exchange their public keys through the network, and keep their private keys
4. Both parties calculate the shared key:
   - Client: Calculate using the server public key and its own private key
   - Server: Calculate using the client public key and its own private key
5. The shared keys calculated by both parties should be exactly the same and can be used as symmetric encryption keys for subsequent communications

```objc
// Client generates a key pair
GMSm2Key *clientKey = [GMSm2Utils generateKey];
NSString *clientPubKey = clientKey.publicKey; // Public key starting with 04
NSString *clientPriKey = clientKey.privateKey; // Private key

// Server generates a key pair
GMSm2Key *serverKey = [GMSm2Utils generateKey];
NSString *serverPubKey = serverKey.publicKey; // Public key starting with 04
NSString *serverPriKey = serverKey.privateKey; // Private key

// Client calculates shared key (using server public key and its own private key)
NSString *clientECDH = [GMSm2Utils computeECDH:serverPubKey privateKey:clientPriKey];
// Server calculates shared key (using client public key and its own private key)
NSString *serverECDH = [GMSm2Utils computeECDH:clientPubKey privateKey:serverPriKey];

// Verify that the keys calculated by both parties are the same
if ([clientECDH isEqualToString:serverECDH]) {
   NSLog(@"ECDH key negotiation succeeded, the negotiated symmetric key is:\n%@", clientECDH);
} else {
   NSLog(@"ECDH key negotiation failed");
}
```

::: info Notes
- The generated shared key is 32 bytes, which is converted to a 64-byte string after Hex encoding
- The SM2 recommended curve (NID_sm2) is used by default
- The public key is in uncompressed format starting with 04
- All keys are in hexadecimal string format
:::