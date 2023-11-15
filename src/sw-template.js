import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

// EJEMPLO
// registerRoute(
//   new RegExp('http://localhost:4000/api/auth/token'),
//   new NetworkFirst()
// );

const cacheFirstUrls = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
];

const networkFirstPaths = ['/api/auth/token', '/api/events'];

registerRoute(({ url }) => {
  return cacheFirstUrls.includes(url.href);
}, new CacheFirst());

registerRoute(({ url }) => {
  return networkFirstPaths.includes(url.pathname);
}, new NetworkFirst());

// OFFLINE POST

// EJEMPLO
// registerRoute(
//   new RegExp('^https?://[^/]+/api/events(?:/[^/]+)*$'),
//   new NetworkOnly({
//     plugins: [backgroundSyncPlugin],
//   }),
//   'POST'
// );

const backgroundSyncPlugin = new BackgroundSyncPlugin('offline-events-posts', {
  maxRetentionTime: 24 * 60, // 24 hrs (in minutes)
});

const eventsRE = '^https?://[^/]+/api/events(?:/[^/]+)*$';

const networkOnlyRoutes = [
  {
    regex: eventsRE,
    method: 'POST',
    plugins: [backgroundSyncPlugin],
  },
  {
    regex: eventsRE,
    method: 'PUT',
    plugins: [backgroundSyncPlugin],
  },
  {
    regex: eventsRE,
    method: 'DELETE',
    plugins: [backgroundSyncPlugin],
  },
];

networkOnlyRoutes.forEach(({ regex, method, plugins }) => {
  registerRoute(
    new RegExp(regex),
    new NetworkOnly({
      plugins,
    }),
    method
  );
});
