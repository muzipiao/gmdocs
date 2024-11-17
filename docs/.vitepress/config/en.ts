import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  description: "SM2/SM3/SM4/ECDH crypto library based on OpenSSL.",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/reference/": { base: "/reference/", items: sidebarReference() },
    },

    footer: {
      message: "Released under the MIT License",
      copyright: `Copyright © 2019-${new Date().getFullYear()} lifei`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Guide",
      link: "/guide/what-is-gmobjc",
      activeMatch: "/guide/",
    },
    {
      text: "Reference",
      link: "/reference/sm2-curves",
      activeMatch: "/reference/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "What is GMObjC?", link: "what-is-gmobjc" },
        { text: "Getting Started", link: "getting-started" },
      ],
    },
    {
      text: "SM2",
      collapsed: false,
      items: [
        { text: "SM2 Encryption and Decryption", link: "sm2-encrypt" },
        { text: "SM2 Signing and Verification", link: "sm2-signature" },
        { text: "ASN1 Encoding and Decoding", link: "sm2-asn1" },
        { text: "ECDH Key Exchange", link: "sm2-ecdh" },
        { text: "Certificate Reading and Writing", link: "sm2-certificate" },
        { text: "Understanding SM2 Algorithm", link: "sm2-intro" },
      ],
    },
    {
      text: "SM3",
      collapsed: false,
      items: [{ text: "SM3 Digest", link: "sm3-digest" }],
    },
    {
      text: "SM4",
      collapsed: false,
      items: [{ text: "SM4 Encryption and Decryption", link: "sm4-encrypt" }],
    },
    {
      text: "Error",
      collapsed: false,
      items: [
        { text: "OpenSSL Conflict", link: "error-openssl" },
        { text: "Xcode Compilation Errors", link: "error-build" },
        { text: "Binary File Signing", link: "error-sign" },
      ],
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Reference",
      items: [
        { text: "Elliptic Curves", link: "sm2-curves" },
        { text: "SM2 Algorithm", link: "sm2-algorithm" },
        { text: "SM3 Algorithm", link: "sm3-algorithm" },
        { text: "SM4 Algorithm", link: "sm4-algorithm" },
      ],
    },
  ];
}
