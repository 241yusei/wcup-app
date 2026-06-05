// 100倍Wカップ サービスワーカー（PWAインストール＋オフライン時のフォールバック）
// 方針：ネットワーク優先。常に最新を取りに行き、取得できた時だけキャッシュを更新する。
// オフライン時のみキャッシュ（無ければオフラインページ）にフォールバック。
// ※キャッシュ優先にすると更新したJSが反映されず古い画面が出るため、必ずネットワーク優先にする。
const CACHE = "wcup-v3";
const APP_SHELL = ["/", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 外部は触らない

  // すべてネットワーク優先：取得できたら最新を返しキャッシュ更新。失敗時のみキャッシュ。
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((r) => {
          if (r) return r;
          if (req.mode === "navigate") return caches.match("/offline");
          return Response.error();
        })
      )
  );
});
