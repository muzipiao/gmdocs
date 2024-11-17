---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: GMObjC
titleTemplate: Based on OpenSSL

hero:
  name: "GMObjC"
  text: "Cryptography Library Based on OpenSSL"
  tagline: "Simplifying the use of SM2/SM3/SM4/ECDH for iOS/Mac Development"
  actions:
    - theme: brand
      text: What is GMObjC?
      link: /guide/what-is-gmobjc
    - theme: alt
      text: Getting Started
      link: /guide/getting-started
    - theme: alt
      text: Github
      link: https://github.com/muzipiao/GMObjC
  image:
      src: /img/gmobjc-logo-rect.svg
      alt: GMObjC

# 特性标签介绍
features:
  - icon: 🔐
    title: Built on OpenSSL
    details: Developed atop the reliable OpenSSL library, offering high security and stability.
  - icon: 🇨🇳
    title: Supports Chinese Cryptography Standards
    details: Implements algorithms such as SM2, SM3, SM4, ECDH, and HMAC, with support for signing, verification, and ASN.1/DER encoding/decoding.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icon" viewBox="0 0 1024 1024"><path fill="#6BCAEB" d="M836.608 675.84q41.984 59.392 96.256 76.8-23.552 72.704-74.752 151.552-78.848 118.784-155.648 118.784-28.672 0-84.992-19.456-52.224-19.456-91.136-19.456t-86.016 20.48Q391.168 1024 359.424 1024q-92.16 0-181.248-156.672Q89.088 712.704 89.088 563.2q0-138.24 67.584-226.304 69.632-88.064 172.032-88.064 22.528 0 50.176 5.632t57.344 20.992q31.744 17.408 52.224 24.064t31.744 6.656q13.312 0 40.96-6.144t55.296-22.528q29.696-16.384 51.2-24.576t44.032-8.192q71.68 0 129.024 38.912 30.72 20.48 62.464 60.416-47.104 40.96-68.608 71.68-39.936 57.344-39.936 124.928 0 74.752 41.984 135.168zM630.784 197.632q-35.84 33.792-65.536 44.032-10.24 3.072-26.112 5.632t-36.352 4.608q1.024-90.112 47.104-155.648T701.44 6.144q2.048 10.24 3.072 14.336v11.264q0 36.864-17.408 82.944-18.432 45.056-56.32 82.944z"/></svg>
    title: Cross-Platform Compatibility
    details: Fully supports iOS and macOS systems, offering flexible integration options to meet diverse needs.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="icon" viewBox="0 0 1024 1024"><path fill="#1D92FF" d="m915.188 856.235-79.393-147.348c8.229-18.347 12.916-38.59 12.996-59.896.33-82.354-66.473-149.41-149.324-149.656-82.603-.574-150.064 66.065-150.313 148.421 0 21.144 4.443 41.961 13.165 61.211l-80.875 145.461c-3.7 6.5-1.398 14.727 5.182 18.426 2.964 1.648 6.419 2.143 9.795 1.398l68.449-15.467 23.199 65.08c1.812 5.018 6.42 8.473 11.682 9.051h1.073c5.018 0 9.625-2.715 12.011-7.078l70.672-129.825c4.938.494 9.79 1.562 14.808 1.562 4.692 0 9.051-.902 13.659-1.396l71.164 130.318c2.307 4.443 6.914 7.16 11.932 7.16.33.08.659 0 1.068 0 5.348-.41 9.955-3.869 11.848-8.803l23.613-64.834 68.285 15.795c5.186 1.318 10.697-.654 13.908-4.932 3.453-4.279 3.947-10.038 1.396-14.648zM600.33 838.219l-8.477-23.942c-1.149-3.291-4.608-5.183-8.063-4.36l-25.421 5.678 36.034-64.337c13.249 13.33 24.023 19.086 38.751 27.234l-32.824 59.727zm98.149-95.109c-52.734-.329-95.518-43.193-95.27-95.684.33-52.737 43.358-95.188 96.012-94.857 52.654.08 95.354 42.863 95.273 95.518-.329 52.738-43.276 95.188-96.015 95.023zm117.323 77.256c-3.947-.904-7.981 1.232-9.379 5.102l-10.119 28.302-38.586-70.592c17.442-9.544 30.193-16.455 45.824-32.085l42.289 75.938-30.029-6.665zm-550.69-450.55h422.762c15.66 0 28.652-20.989 28.652-36.645 0-15.656-12.992-36.644-28.652-36.644H265.112c-15.656 0-28.648 20.988-28.648 36.644 0 15.656 12.992 36.645 28.648 36.645zm0 310.492c-15.656 0-28.648 20.988-28.648 36.648 0 15.658 12.992 36.645 28.648 36.645h159.945c15.657 0 28.649-20.986 28.649-36.645 0-15.66-12.992-36.648-28.649-36.648H265.112zm270.746-149.25c0-15.656-12.66-36.645-28.648-36.645H265.112c-15.656 0-28.648 20.989-28.648 36.645 0 15.66 12.992 36.648 28.648 36.648H507.21c15.988 0 28.648-20.988 28.648-36.648z"/><path fill="#FF9E12" d="M842.12 336.829V166.597c-.719-42.09-34.859-75.934-76.957-76.289H196.819c-47.191 4.637-84.629 41.797-89.617 88.949v641.305c5.137 47.027 42.535 84.01 89.617 88.617h179.418c3.965 0 5.84-.015 9.376-.015h35.296c21.533 0 35.988-17.446 35.988-38.969s-14.456-38.969-35.988-38.969h-39.885c-.041 0-.083-.005-.124-.005H218.472c-22.321 0-33.313-9.992-33.313-33.313V198.245c0-19.652 7.996-27.648 27.648-27.648h520.708c19.988 0 28.316 7.66 28.316 27.648v220.488c0 .296.022.59.038.885v7.336c0 22.184 17.983 37.167 40.167 37.167 22.183 0 40.166-14.983 40.166-37.167v-87.667c0-.826-.033-1.644-.082-2.458z"/></svg>
    title: Certificate File Support
    details: Effortlessly handles certificates in PEM, DER, CER, and PKCS#12 formats, enabling reading, creation, conversion, and password protection.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #c7c23d 50%, #bd34fe 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>