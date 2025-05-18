if (!self.define) {
  let e,
    s = {};
  const c = (c, n) => (
    (c = new URL(c + ".js", n).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, a) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let t = {};
    const r = (e) => c(e, i),
      o = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (a(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "51c92e2e096e63160547fb0088dfd8d4",
        },
        {
          url: "/_next/static/3T_s_M-4-c98cTDryVk42/_buildManifest.js",
          revision: "546699442b6ba15c42681ab0d120f12e",
        },
        {
          url: "/_next/static/3T_s_M-4-c98cTDryVk42/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0-066455dff1e3059d.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/145-afd036ad3a63247c.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/18-276193f6bae28acf.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/2f0b94e8-734829800d3eb38b.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/346-2a52ec1cce46114b.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/381-9be3ac1a97e80a4a.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/473f56c0-0933f1e2ac7ad0b5.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/4bd1b696-1860e80ae3f7cfe8.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/558-e65505cb071384f5.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/658-4f2d2a650db92a75.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/668-a71611dbd22c5e8c.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/684-d719098c2bfdb0ff.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/70646a03-d8bbffbaf77fafd0.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/850-b482ef5006e8447d.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/874-7bd2624f003501b1.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/94-9683b6906122a203.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/972.e3d456ce658179cb.js",
          revision: "e3d456ce658179cb",
        },
        {
          url: "/_next/static/chunks/app/(dashboard)/dashboard/admin/page-c452b00f4181d157.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/(dashboard)/dashboard/admin/profile/page-56af820ba88307a7.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/(dashboard)/dashboard/admin/property/new/page-4e117096b0e1e322.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/(dashboard)/dashboard/page-bc297afdd1de3ab6.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/(dashboard)/layout-cca69a6d042fdc38.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/(main)/layout-e7242309853cb9a9.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/(main)/main/page-f80ed3d78d18eef1.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-2ed445a70127c181.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/api/price/%5Bsymbol%5D/route-361d1ff31c40dee5.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/api/price/route-3cb120ff6b051ad3.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/configure/page-6b3943f31b142381.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/debug/page-0f9b274f7675379d.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/layout-7c74cda2308875fe.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/app/page-27bdb8d6453e628e.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/e6909d18-d7c7e73117910c02.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/framework-859199dea06580b0.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/main-a106802aa546c841.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/main-app-95bc47aff3a3b68f.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/pages/_app-da15c11dea942c36.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/pages/_error-cc3f077a18ea1793.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-587fcb78f3721d88.js",
          revision: "3T_s_M-4-c98cTDryVk42",
        },
        {
          url: "/_next/static/css/0774e111089ca399.css",
          revision: "0774e111089ca399",
        },
        {
          url: "/_next/static/css/1564cf31e389c23e.css",
          revision: "1564cf31e389c23e",
        },
        {
          url: "/blast-icon-color.svg",
          revision: "f455c22475a343be9fcd764de7e7147e",
        },
        {
          url: "/debug-icon.svg",
          revision: "25aadc709736507034d14ca7aabcd29d",
        },
        {
          url: "/debug-image.png",
          revision: "5c29a85b45750da988f977c6c79415d6",
        },
        {
          url: "/explorer-icon.svg",
          revision: "84507da0e8989bb5b7616a3f66d31f48",
        },
        {
          url: "/gradient-s.svg",
          revision: "c003f595a6d30b1b476115f64476e2cf",
        },
        { url: "/logo.ico", revision: "0359e607e29a3d3b08095d84a9d25c39" },
        { url: "/logo.svg", revision: "962a8546ade641ef7ad4e1b669f0548c" },
        {
          url: "/logo_alchemy.png",
          revision: "5832500376797147ce396d14cdc97e45",
        },
        { url: "/manifest.json", revision: "781788f3e2bc4b2b176b5d8c425d7475" },
        {
          url: "/rpc-version.png",
          revision: "cf97fd668cfa1221bec0210824978027",
        },
        {
          url: "/scaffold-config.png",
          revision: "1ebfc244c31732dc4273fe292bd07596",
        },
        {
          url: "/sn-symbol-gradient.png",
          revision: "908b60a4f6b92155b8ea38a009fa7081",
        },
        {
          url: "/starkcompass-icon.svg",
          revision: "eccc2ece017ee9e73e512996b74e49ac",
        },
        {
          url: "/tokasa/logoTK.jpg",
          revision: "bc87be8e6855e8f1eff08da88b38ea02",
        },
        {
          url: "/voyager-icon.svg",
          revision: "06663dd5ba2c49423225a8e3893b45fe",
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: c,
              state: n,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
