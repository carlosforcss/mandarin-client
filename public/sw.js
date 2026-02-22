const CACHE_NAME = 'pinyin-audio-v1'

// Cache-first strategy for all pinyin MP3 files
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/pinyin/') && url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone())
            return response
          })
        })
      )
    )
  }
})
