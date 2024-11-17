import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  lang: "zh-Hans",
  description: "基于 OpenSSL 封装 SM2/SM3/SM4/ECDH 加密库",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
      "/zh/reference/": { base: "/zh/reference/", items: sidebarReference() },
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2019-${new Date().getFullYear()} lifei`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "指南",
      link: "/zh/guide/what-is-gmobjc",
      activeMatch: "/zh/guide/",
    },
    {
      text: "参考",
      link: "/zh/reference/sm2-curves",
      activeMatch: "/zh/reference/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "简介",
      collapsed: false,
      items: [
        { text: "什么是 GMObjC？", link: "what-is-gmobjc" },
        { text: "快速开始", link: "getting-started" },
      ],
    },
    {
      text: "SM2",
      collapsed: false,
      items: [
        { text: "SM2 加密解密", link: "sm2-encrypt" },
        { text: "SM2 签名验签", link: "sm2-signature" },
        { text: "ASN1 编码解码", link: "sm2-asn1" },
        { text: "ECDH 密钥协商", link: "sm2-ecdh" },
        { text: "CER 证书读写", link: "sm2-certificate" },
        { text: "SM2 算法理解", link: "sm2-intro" },
      ],
    },
    {
      text: "SM3",
      collapsed: false,
      items: [{ text: "SM3 摘要", link: "sm3-digest" }],
    },
    {
      text: "SM4",
      collapsed: false,
      items: [{ text: "SM4 加密解密", link: "sm4-encrypt" }],
    },
    {
      text: "报错",
      collapsed: false,
      items: [
        { text: "OpenSSL 冲突", link: "error-openssl" },
        { text: "Xcode 编译错误", link: "error-build" },
        { text: "二进制文件签名", link: "error-sign" },
      ],
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "参考",
      items: [
        { text: "椭圆曲线", link: "sm2-curves" },
        { text: "SM2 算法", link: "sm2-algorithm" },
        { text: "SM3 算法", link: "sm3-algorithm" },
        { text: "SM4 算法", link: "sm4-algorithm" },
      ],
    },
  ];
}

// minisearch 搜索翻译
export const search: DefaultTheme.LocalSearchOptions["locales"] = {
  zh: {
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        displayDetails: "显示详情",
        resetButtonTitle: "清除查询条件",
        backButtonTitle: "取消",
        noResultsText: "无法找到相关结果",
        footer: {
          selectText: "选择",
          selectKeyAriaLabel: "选择",
          navigateText: "切换",
          navigateUpKeyAriaLabel: "切换",
          closeText: "关闭",
          closeKeyAriaLabel: "关闭",
        },
      },
    },
  },
};
