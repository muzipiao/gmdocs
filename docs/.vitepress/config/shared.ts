import { defineConfig } from "vitepress";
import { search as zhSearch } from "./zh";

export const shared = defineConfig({
  title: "GMObjC",

  rewrites: {
    "en/:rest*": ":rest*",
  },

  markdown: {
    math: true,
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  // 指定站点地图中所有链接的基础域名，并确保 url 属性的值不包含字符串 migration
  sitemap: {
    hostname: "https://muzipiao.github.io/gmdocs",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/img/gmobjc-logo-square.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/img/gmobjc-logo-square.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'GMObjC | GMObjC documentation.' }],
    ['meta', { property: 'og:site_name', content: 'GMObjC' }],
    ['meta', { property: 'og:image', content: 'https://muzipiao.github.io/gmdocs/img/gmobjc-logo-rect.svg' }],
    ['meta', { property: 'og:url', content: 'https://github.com/muzipiao/GMObjC' }]
  ],

  themeConfig: {
    logo: { src: "/img/gmobjc-logo-square.svg", width: 24, height: 24 },

    // 分享链接
    socialLinks: [
      { icon: "github", link: "https://github.com/muzipiao/GMObjC" },
    ],

    // minisearch 浏览器内索引进行模糊全文搜索
    search: {
      provider: "local",
      options: {
        locales: {
          ...zhSearch,
        },
      },
    },
  },
});
