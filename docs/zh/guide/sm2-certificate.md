# 证书文件 {#certificate-files}

GMSm2Bio 是一个用于处理 SM2 密钥文件的工具类，支持 PEM、DER、CER 和 PKCS#12 等多种格式的公私钥读取和创建，支持带密码保护的证书解析等。

## 生成密钥对文件 {#generate-key-files}

生成的公私钥文件默认保存在 `NSTemporaryDirectory()` 临时文件夹路径下，会被系统自动清理。返回的 `GMSm2KeyFiles` 对象包含生成的公钥和私钥文件路径。

```objc
GMSm2KeyFiles *pemKeyFiles = [GMSm2Bio generatePemKeyFiles];
NSString *pemPubKeyPath = pemKeyFiles.publicKeyPath;  // sm2-pub.pem
NSString *pemPriKeyPath = pemKeyFiles.privateKeyPath; // sm2-pri.pem

GMSm2KeyFiles *derKeyFiles = [GMSm2Bio generateDerKeyFiles];
NSString *derPubKeyPath = derKeyFiles.publicKeyPath;  // sm2-pub.der
NSString *derPriKeyPath = derKeyFiles.privateKeyPath; // sm2-pri.der
```

## 读取 PEM/DER 格式 {#read-pem-der}

::: tip 注意
- 所有返回的公私钥均为 HEX 格式字符串
- 公钥以 `04` 标识开头（未压缩格式），私钥无密文格式标识
- PEM 格式支持密码保护，密码参数为 `NSData` 类型，无密码时传入 `nil`
- DER 格式不支持密码保护
:::

```objc
// 读取 PEM 格式公钥
NSData *pubPemData = [NSData dataWithContentsOfFile:@"public.pem"];
NSString *publicKey = [GMSm2Bio readPublicKeyFromPemData:pemData password:nil];

// 读取带密码的 PEM 格式私钥
NSData *priPemData = [NSData dataWithContentsOfFile:@"private.pem"];
NSData *pwdData = [@"12345678" dataUsingEncoding:NSUTF8StringEncoding];
NSString *privateKey = [GMSm2Bio readPrivateKeyFromPemData:priPemData password:pwdData];

// 读取 DER 格式公私钥
NSData *publicDerData = [NSData dataWithContentsOfFile:@"public.der"];
NSData *privateDerData = [NSData dataWithContentsOfFile:@"private.der"];
NSString *publicFromDer = [GMSm2Bio readPublicKeyFromDerData:publicDerData];
NSString *privateFromDer = [GMSm2Bio readPrivateKeyFromDerData:privateDerData];
```

## 写入 PEM/DER 格式 {#save-pem-der}

支持将 HEX 格式的公私钥写入 PEM 或 DER 格式文件。所有写入方法返回 `BOOL` 类型，表示写入是否成功。

```objc
GMSm2Key *keyPair = [GMSm2Utils generateKey];
NSString *pubKey = keyPair.publicKey; // 04 开头公钥字符串，HEX 编码格式
NSString *priKey = keyPair.privateKey; // 私钥字符串，HEX 编码格式

// 保存公私钥的文件路径
NSString *tmpDir = NSTemporaryDirectory();
NSString *publicPemPath = [tmpDir stringByAppendingPathComponent:@"t-public.pem"];
NSString *publicDerPath = [tmpDir stringByAppendingPathComponent:@"t-public.der"];
NSString *privatePemPath = [tmpDir stringByAppendingPathComponent:@"t-private.pem"];
NSString *privateDerPath = [tmpDir stringByAppendingPathComponent:@"t-private.der"];

// 将公私钥写入 PEM/DER 文件
BOOL success1 = [GMSm2Bio savePublicKey:pubKey toPemFileAtPath:publicPemPath];
BOOL success2 = [GMSm2Bio savePublicKey:pubKey toDerFileAtPath:publicDerPath];
BOOL success3 = [GMSm2Bio savePrivateKey:priKey toPemFileAtPath:privatePemPath];
BOOL success4 = [GMSm2Bio savePrivateKey:priKey toDerFileAtPath:privateDerPath];
```

## 解析 X.509 证书 {#read-x509-cer}

通过 `readX509InfoFromData:password:` 方法可以读取证书信息，返回 `GMSm2X509Info` 对象。需要注意的是，证书中的公私钥可以不是 SM2 格式（可以是 RSA 等其他格式）。

证书信息包含以下内容：

- 版本号（version）和序列号（serialNumber）
- 公钥（publicKey）和私钥（privateKey，仅 PKCS#12 格式可能包含）
- 有效期（effectiveDate）和失效日期（expirationDate），UTC 时间格式：yyyyMMddHHmmss
- 证书指纹：SHA-1（sha1Fingerprint）和 SHA-256（sha256Fingerprint）
- 证书主体信息：
  - 国家代码（country）
  - 通用名称（commonName）
  - 组织名称（organization）
  - 组织单位名称（organizationalUnit）
- 证书颁发者信息：
  - 颁发机构国家代码（issuerCountry）
  - 颁发机构通用名称（issuerCommonName）
  - 颁发机构组织名称（issuerOrganization）
  - 颁发机构组织单位名称（issuerOrganizationalUnit）

```objc
NSData *certData = [NSData dataWithContentsOfFile:@"certificate.cer"];
GMSm2X509Info *certInfo = [GMSm2Bio readX509InfoFromData:certData password:nil];
NSString *publicKey = certInfo.publicKey;
NSString *commonName = certInfo.commonName;
NSString *effectiveDate = certInfo.effectiveDate;
```
