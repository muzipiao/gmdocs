# ECDH 密钥协商 {#sm2-ecdh}

ECDH（Elliptic Curve Diffie-Hellman）是一种基于椭圆曲线的密钥交换协议，允许两方在不安全的通道上安全地共享一个共同的密钥。其基本过程如下：

1. **公钥生成**：双方各自生成一对椭圆曲线密钥对（私钥、公钥），并交换公钥。
2. **共享密钥计算**：每一方使用对方的公钥和自己的私钥，通过椭圆曲线运算生成相同的共享密钥。
3. **结果**：双方得到相同的共享密钥，可以用于对称加密通信。

ECDH 的安全性依赖于椭圆曲线离散对数问题。在 GMObjC 中，`computeECDH:privateKey:`方法实现了基于 SM2 曲线的 ECDH 密钥协商，可在双方都是明文传输的情况下，协商出一个相同的密钥。

## ECDH 示例 {#sm2-ecdh-sample}

1. 客户端随机生成一对公私钥（clientPublicKey，clientPrivateKey）
2. 服务端随机生成一对公私钥（serverPublicKey，serverPrivateKey）
3. 双方通过网络交换各自的公钥，私钥自己保存
4. 双方各自计算共享密钥：
   - 客户端：使用服务端公钥和自己的私钥计算
   - 服务端：使用客户端公钥和自己的私钥计算
5. 双方计算出的共享密钥应该完全相同，可用作后续通信的对称加密密钥

```objc
// 客户端生成密钥对
GMSm2Key *clientKey = [GMSm2Utils generateKey];
NSString *clientPubKey = clientKey.publicKey;   // 04开头的公钥
NSString *clientPriKey = clientKey.privateKey;  // 私钥
 
// 服务端生成密钥对
GMSm2Key *serverKey = [GMSm2Utils generateKey];
NSString *serverPubKey = serverKey.publicKey;   // 04开头的公钥
NSString *serverPriKey = serverKey.privateKey;  // 私钥
 
// 客户端计算共享密钥 (使用服务端公钥和自己的私钥)
NSString *clientECDH = [GMSm2Utils computeECDH:serverPubKey privateKey:clientPriKey];
// 服务端计算共享密钥 (使用客户端公钥和自己的私钥)
NSString *serverECDH = [GMSm2Utils computeECDH:clientPubKey privateKey:serverPriKey];

// 验证双方计算的密钥是否相同
if ([clientECDH isEqualToString:serverECDH]) {
   NSLog(@"ECDH 密钥协商成功，协商出的对称密钥为：\n%@", clientECDH);
} else {
   NSLog(@"ECDH 密钥协商失败");
}
```

::: info 注意事项
- 生成的共享密钥为 32 字节，转 Hex 编码后为 64 字节的字符串
- 默认使用 SM2 推荐曲线（NID_sm2）
- 公钥为 04 开头的未压缩格式
- 所有密钥均采用 16 进制字符串格式
:::