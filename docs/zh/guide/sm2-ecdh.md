# ECDH 密钥协商 {#sm2-ecdh}

ECDH（Elliptic Curve Diffie-Hellman）是一种基于椭圆曲线的密钥交换协议，允许两方在不安全的通道上安全地共享一个共同的密钥。其基本过程如下：

1. **公钥生成**：双方各自生成一对椭圆曲线密钥对（私钥、公钥），并交换公钥。
2. **共享密钥计算**：每一方使用对方的公钥和自己的私钥，通过椭圆曲线运算生成相同的共享密钥。
3. **结果**：双方得到相同的共享密钥，可以用于对称加密通信。

ECDH 的安全性依赖于椭圆曲线离散对数问题，OpenSSL 中的 `ECDH_compute_key()`执行椭圆曲线 Diffie-Hellman 密钥协商，可在双方都是明文传输的情况下，协商出一个相同的密钥。

## ECDH 示例 {#sm2-ecdh-sample}

1. 客户端随机生成一对公私钥 clientPublicKey，clientPrivateKey；
2. 服务端随机生成一对公私钥 serverPublicKey，serverPrivateKey；
3. 双方利用网络请求或其他方式交换公钥 clientPublicKey 和 serverPublicKey，私钥自己保存；
4. 客户端计算`clientECDH = [GMSm2Utils computeECDH:serverPubKey privateKey:clientPriKey]`；
5. 服务端计算`serverECDH = [GMSm2Utils computeECDH:clientPubKey privateKey:serverPriKey]`；
6. 双方各自计算出的 clientECDH 和 serverECDH 应该是相等的，这个 key 可以作为对称加密的密钥。

```objc
// 客户端client生成一对公私钥
 GMSm2Key *clientKey = [GMSm2Utils generateKey];
 NSString *clientPubKey = clientKey.publicKey;
 NSString *clientPriKey = clientKey.privateKey;
 
 // 服务端server生成一对公私钥
 GMSm2Key *serverKey = [GMSm2Utils generateKey];
 NSString *serverPubKey = serverKey.publicKey;
 NSString *serverPriKey = serverKey.privateKey;
 
 // 客户端client从服务端server获取公钥serverPubKey，client协商出32字节对称密钥clientECDH，转Hex后为64字节
 NSString *clientECDH = [GMSm2Utils computeECDH:serverPubKey privateKey:clientPriKey];
 // 客户端client将公钥clientPubKey发送给服务端server，server协商出32字节对称密钥serverECDH，转Hex后为64字节
 NSString *serverECDH = [GMSm2Utils computeECDH:clientPubKey privateKey:serverPriKey];

// 在全部明文传输的情况下，client与server协商出相等的对称密钥，clientECDH==serverECDH 成立
if ([clientECDH isEqualToString:serverECDH]) {
    NSLog(@"ECDH 密钥协商成功，协商出的对称密钥为：\n%@", clientECDH);
}else{
    NSLog(@"ECDH 密钥协商失败");
}
```
