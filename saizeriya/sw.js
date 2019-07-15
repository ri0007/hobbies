//キャッシュ名
const CACHE_NAME = 'cache-v2'

//キャッシュに入れるリソースのパス
const urlsToCache = [
  '/hobbies/saizeriya/',
  'manifest.json',
  'main.css',
  'icon.png'
]

//インストール状態のイベント処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    //キャッシュの中に必要なリソースを格納する
    caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache)
    })
  )
})

//有効化状態のイベント処理
self.addEventListener('activate', (event) => {
  event.waitUntil(
    //現在のキャッシュをすべて取得する
    caches.keys().then((cache) => {
      //新しいキャッシュ以外は削除する
      cache.map((name) => {
        if(CACHE_NAME !== name) caches.delete(name)
      })
    })
  )
})

//リクエスト取得状態のイベント処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    //リクエストに応じたリソースがキャッシュにあればそれを使う
    caches.match(event.request).then((res) => {
        if(res) return res
        return fetch(event.request)
    })
  )
})