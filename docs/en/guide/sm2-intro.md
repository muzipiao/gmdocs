# SM2 Algorithm Principle {#sm2-intro}

SM2 algorithm is a national secret standard asymmetric algorithm, designed based on elliptic curve cryptography (ECC). Unlike RSA, which is based on the difficulty of factoring large integers, the security of SM2 is based on the elliptic curve discrete logarithm problem. If you need to understand RSA, you can refer to ([RSA Algorithm Understanding](https://muzipiao.github.io/2016/12/iOS-%E7%AB%AF-RSA-%E5%8A%A0%E5%AF%86/)).

## SM2 Elliptic Curve {#sm2-curves-graph}

The elliptic curve equation used by SM2 is:

$$y^2 = x^3 + ax + b \quad (4a^3 + 27b^2 ≠ 0)$$

What does the elliptic curve look like? Seeing is believing, and pictures can give you a direct feeling.

![Elliptic Curve](/img/gmobjc-sm2-intro1.png)

Why does $4a^3 + 27b^2 ≠ 0$ need to be satisfied? Because when this formula is equal to 0, it is not an elliptic curve.

![ab value conditions](/img/gmobjc-sm2-intro2.png)

## SM2 public and private keys {#sm2-generate-keys}

SM2 key pair generation is based on point operations on elliptic curves. The main steps are as follows:

1. Select the elliptic curve parameters (a, b) and the base point G
2. Randomly generate a private key d (a large integer)
3. Calculate the public key Q = dG (d times G)

::: tip
The private key is a large integer, and the public key is a point on the curve (including x and y coordinates)
:::

Combined with the following picture, let's understand the geometric meaning of SM2 and what **point doubling operation** is.

![Point doubling operation](/img/gmobjc-sm2-intro3.png)

1. First choose an elliptic curve, that is, the values ​​of a and b in the fixed formula $y^2 = x^3 + ax + b$, assuming that the curve shown in the figure above is selected.
2. Randomly select a point P as the base point, make a tangent to the curve, pass through point Q, and tangent point R1.
3. Based on the x-axis, make R the symmetric point of R1, then SM2 defines addition as P + Q = R, which is elliptic curve addition.
4. Find the 2-fold point. When P = Q, that is, P + P = R = 2P, then R is the 2-fold point of P.
5. Find the 3-fold point. 3P = P + 2P = P + R. Make a straight line through P and R, intersecting at the elliptic curve point M1. The symmetric point M based on the x-axis is the 3-fold point, and so on.
6. Find the d-fold point. Assume that we have the same number of times d and the operation of the fold point is Q.
7. d is the private key and Q is the public key. So the private key is a large integer and the public key is a point coordinate.

The above geometric reasoning is for easy understanding. The actual values ​​are all on the prime finite field. After reasoning and calculation, cryptography experts have selected the optimal elliptic curve on the prime finite field for us. Unless there is a special need, there is no need to customize the curve.

## SM2 recommended curves {#sm2-recommend-curves}

![Recommended curves](/img/gmobjc-sm2-intro4.png)

- p: the set of points of the elliptic curve on the finite field Fp of prime number p;

- a: the value of the elliptic curve parameter a;

- b: the value of the elliptic curve parameter b;

- n: the value range, the value range of the random integer d $[1,n-2]$;

- Gx: the x coordinate value of the base point, similar to the x coordinate value of point P;

- Gy: the y coordinate value of the base point, similar to the y coordinate value of point P.

## SM2 encryption {#sm2-encrypt-steps}

The length of the SM2 encryption result is predictable: for a plaintext of length n bytes, the encrypted ciphertext length is $(96 + n)$ bytes.

**Encryption process**:

![sm2 encryption](/img/gmobjc-sm2-intro5.png)

Let the elliptic curve be the recommended curve, the public key Q, the original text bit string M, and klen be the bit length of M;

1. Calculate the random elliptic curve point $C1 = [k]G=(x1, y1)$, k is a random number, G is the base point, and the calculated multiple point C1 is 64 bytes;
2. Verify the public key Q, calculate the elliptic curve point $S=[h]Q$, h is the cofactor, if S is an infinite point, exit;
3. Calculate the elliptic curve point $[k]PB=(x2, y2)$, and obtain x2, y2;
4. Calculate $t = KDF(x2||y2, klen)$, if t is a full 0 bit string, return to step 1, KDF is the key derivation function of SM2;
5. Calculate $C2= M⊕t$, encrypt the plaintext, C2 is the real ciphertext, the length is the same as the original text;
6. Calculate $C3= Hash (x2||M||y2)$, generate a hash value, used to verify the data, the length is 32 bytes;
7. Output the ciphertext $C=C1||C3||C2$, C is the ciphertext result.

::: info Note
- The implementation of OpenSSL uses ASN.1 encoding, so the ciphertext length may not be fixed
- Due to the use of random numbers, the encryption results are different each time
:::

## SM2 decryption {#sm2-decrypt-steps}

![sm2 decryption](/img/gmobjc-sm2-intro6.png)

SM2 decryption is to go through the reverse process. Note that OpenSSL decryption requires the incoming ciphertext to be ASN1 encoded.

Suppose the elliptic curve is the recommended curve, the private key is d, the ciphertext is C ($C=C1||C3||C2$), and klen is the bit length of C2 in the ciphertext.

1. Take the bit string C1 (the first 64 bytes of the ciphertext C) from C, convert the data type of C1 to a point on the elliptic curve, and verify whether C1 satisfies the elliptic curve equation. If not, report an error and exit;
2. Calculate the elliptic curve point $S= [h]C1$. If S is a point at infinity, report an error and exit;
3. Calculate $[d]C1=(x2, y2)$, and convert the data types of coordinates x2 and y2 to bit strings;
4. Calculate $t = KDF(x2||y2, klen)$. If t is a bit string of all 0s, report an error and exit;
5. Take the bit string C2 from C, and calculate $M'=C2⊕t$;
6. Calculate $u = Hash (x2||M'||y2)$, and take the bit string C3 (the last 32 bytes of the ciphertext C) from C. If $u≠C3$, then report an error and exit;
7. Output the plaintext M', M' is the decrypted plaintext.
