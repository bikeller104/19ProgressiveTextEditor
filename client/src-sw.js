const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
//found info here https://stackoverflow.com/questions/66538667/can-i-have-both-workbox-registerroute-and-service-worker-fetch-event-handler-at
// and 
// https://developer.chrome.com/docs/workbox/caching-resources-during-runtime/#applying-caching-strategies-with-route-matching
registerRoute((request) => { 
  //if the request url matches one in the cache then recache it?
  caches.match(request)
}, pageCache/*use the created object instead of creating a  new one*/);
