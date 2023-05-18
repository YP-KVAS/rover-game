const CACHE_NAME = 'roverCache-v1'

const STATIC_ASSETS = [
  '/error.html',
  '/vite.svg',
  '/images/background/grass-2.png',
  '/images/background/grass.png',
  '/images/background/ground.png',
  '/images/background/sidewalk-2.png',
  '/images/background/sidewalk.jpg',
  '/images/buildings/cafe.png',
  '/images/buildings/fast-food.png',
  '/images/buildings/hospital.png',
  '/images/buildings/house-1.png',
  '/images/buildings/house-2.png',
  '/images/buildings/market.png',
  '/images/buildings/police-office.png',
  '/images/buildings/post-office.png',
  '/images/buildings/school.png',
  '/images/buildings/shop.png',
  '/images/buildings/warehouse.png',
  '/images/buildings/zoo.png',
  '/images/cars/car-blue.png',
  '/images/cars/car-green.png',
  '/images/cars/car-red.png',
  '/images/cars/car-yellow.png',
  '/images/plants/flower.png',
  '/images/plants/tree.png',
  '/images/road/road-corner.png',
  '/images/road/road-cross.png',
  '/images/road/road-crosswalk.png',
  '/images/road/road-straight.png',
  '/images/road/road-t-cross.png',
  '/images/rover/rover-down.png',
  '/images/rover/rover-left.png',
  '/images/rover/rover-open-left.png',
  '/images/rover/rover-open-right.png',
  '/images/rover/rover-right.png',
  '/images/rover/rover-up.png',
  '/images/triggers/cargo-load.png',
  '/images/triggers/cargo-unload.png',
  '/images/user/empty-avatar.webp',
  '/images/hp.png',
  '/images/icons-sprite.svg',
]

const addResourcesToCache = async resources => {
  const cache = await caches.open(CACHE_NAME)
  await cache.addAll(resources)
}

const removeOldCache = async () => {
  const cacheKeys = await caches.keys()

  await Promise.all(
    cacheKeys
      .filter(cacheKey => cacheKey !== CACHE_NAME)
      .map(key => {
        caches.delete(key)
      })
  )
}

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME)
  await cache.put(request, response)
}

const cacheFirst = async ({ request, fallbackUrl }) => {
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  try {
    const responseFromNetwork = await fetch(request)

    putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl)

    if (fallbackResponse) {
      return fallbackResponse
    }

    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

this.addEventListener('install', event => {
  event.waitUntil(addResourcesToCache(STATIC_ASSETS))
})

this.addEventListener('activate', event => {
  event.waitUntil(removeOldCache())
})

this.addEventListener('fetch', async event => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: './error.html',
    })
  )
})
