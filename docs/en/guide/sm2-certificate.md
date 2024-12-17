# Certificate file {#certificate-files}

GMSm2Bio is a tool class for processing SM2 key files. It supports reading and creating public and private keys in multiple formats such as PEM, DER, CER and PKCS#12, and supports password-protected certificate parsing.

## Generate key pair files {#generate-key-files}

The generated public and private key files are saved in the `NSTemporaryDirectory()` temporary folder path by default and will be automatically cleaned up by the system. The returned `GMSm2KeyFiles` object contains the generated public and private key file paths.

```objc
GMSm2KeyFiles *pemKeyFiles = [GMSm2Bio generatePemKeyFiles];
NSString *pemPubKeyPath = pemKeyFiles.publicKeyPath; // sm2-pub.pem
NSString *pemPriKeyPath = pemKeyFiles.privateKeyPath; // sm2-pri.pem

GMSm2KeyFiles *derKeyFiles = [GMSm2Bio generateDerKeyFiles];
NSString *derPubKeyPath = derKeyFiles.publicKeyPath; // sm2-pub.der
NSString *derPriKeyPath = derKeyFiles.privateKeyPath; // sm2-pri.der
```

## Read PEM/DER format {#read-pem-der}

::: tip Note
- All returned public and private keys are HEX format strings
- Public keys start with `04` The private key starts with the identifier (uncompressed format), and the private key has no ciphertext format identifier
- PEM format supports password protection, the password parameter is of type `NSData`, and `nil` is passed in when there is no password
- DER format does not support password protection
:::

```objc
// Read PEM format public key
NSData *pubPemData = [NSData dataWithContentsOfFile:@"public.pem"];
NSString *publicKey = [GMSm2Bio readPublicKeyFromPemData:pemData password:nil];

// Read PEM format private key with password
NSData *priPemData = [NSData dataWithContentsOfFile:@"private.pem"];
NSData *pwdData = [@"12345678" dataUsingEncoding:NSUTF8StringEncoding];
NSString *privateKey = [GMSm2Bio readPrivateKeyFromPemData:priPemData password:pwdData];

// Read DER format public and private keys
NSData *publicDerData = [NSData dataWithContentsOfFile:@"public.der"];
NSData *privateDerData = [NSData dataWithContentsOfFile:@"private.der"];
NSString *publicFromDer = [GMSm2Bio readPublicKeyFromDerData:publicDerData];
NSString *privateFromDer = [GMSm2Bio readPrivateKeyFromDerData:privateDerData];
```

## Write PEM/DER format {#save-pem-der}

Support writing HEX format public and private keys to PEM or DER format files. All write methods return `BOOL` type, indicating whether the write is successful.

```objc
GMSm2Key *keyPair = [GMSm2Utils generateKey];
NSString *pubKey = keyPair.publicKey; // Public key string starting with 04, HEX encoding format
NSString *priKey = keyPair.privateKey; // Private key string, HEX encoding format

// File path to save public and private keys
NSString *tmpDir = NSTemporaryDirectory();
NSString *publicPemPath = [tmpDir stringByAppendingPathComponent:@"t-public.pem"];
NSString *publicDerPath = [tmpDir stringByAppendingPathComponent:@"t-public.der"];
NSString *privatePemPath = [tmpDir stringByAppendingPathComponent:@"t-private.pem"];
NSString *privateDerPath = [tmpDir stringByAppendingPathComponent:@"t-private.der"]; //Write public and private keys to PEM/DER file BOOL success1 = [GMSm2Bio savePublicKey:pubKey toPemFileAtPath:publicPemPath]; BOOL success2 = [GMSm2Bio savePublicKey:pubKey toDerFileAtPath:publicDerPath]; BOOL success3 = [GMSm2Bio savePrivateKey:priKey toPemFileAtPath:privatePemPath]; BOOL success4 = [GMSm2Bio savePrivateKey:priKey toDerFileAtPath:privateDerPath]; 
```

## Parse X.509 certificate {#read-x509-cer}

The certificate information can be read through the `readX509InfoFromData:password:` method, which returns a `GMSm2X509Info` object. It should be noted that the public and private keys in the certificate may not be in SM2 format (they can be other formats such as RSA).

The certificate information includes the following:

- Version number (version) and serial number (serialNumber)
- Public key (publicKey) and private key (privateKey, only PKCS#12 format may include)
- Validity date (effectiveDate) and expiration date (expirationDate), UTC time format: yyyyMMddHHmmss
- Certificate fingerprint: SHA-1 (sha1Fingerprint) and SHA-256 (sha256Fingerprint)
- Certificate subject information:
  - Country code (country)
  - Common name (commonName)
  - Organization name (organization)
  - Organizational unit name (organizationalUnit)
- Certificate issuer information:
  - Issuer country code (issuerCountry)
  - Issuer common name (issuerCommonName)
  - Issuer organization name (issuerOrganization)
  - Issuer organizational unit name (issuerOrganizationalUnit)

```objc
NSData *certData = [NSData dataWithContentsOfFile:@"certificate.cer"];
GMSm2X509Info *certInfo = [GMSm2Bio readX509InfoFromData:certData password:nil];
NSString *publicKey = certInfo.publicKey;
NSString *commonName = certInfo.commonName;
NSString *effectiveDate = certInfo.effectiveDate;
```
