import path from 'node:path'
import { createHash } from 'node:crypto'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function offlineApp(): Plugin {
  return {
    name: 'heritage-arabic-offline-app',
    apply: 'build',
    generateBundle(_options, bundle) {
      const staticFiles = [
        './',
        './index.html',
        './manifest.webmanifest',
        './favicon.png',
        './favicon.svg',
        './icons/icon-192.png',
        './icons/icon-512.png',
        ...Object.keys(bundle)
          .filter((file) => file.startsWith('assets/'))
          .map((file) => `./${file}`),
      ]
      const buildId = createHash('sha256').update(staticFiles.join('\n')).digest('hex').slice(0, 12)
      const source = `
const CACHE_NAME = 'heritage-arabic-${buildId}'
const PRECACHE_URLS = ${JSON.stringify(staticFiles)}
const APP_SCOPE = new URL('./', self.registration.scope)

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('heritage-arabic-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== APP_SCOPE.origin || !url.pathname.startsWith(APP_SCOPE.pathname)) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) await caches.open(CACHE_NAME).then((cache) => cache.put(new URL('./index.html', APP_SCOPE), response.clone()))
          return response
        })
        .catch(async () => (await caches.match(request)) || caches.match(new URL('./index.html', APP_SCOPE)),
      ),
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then(async (response) => {
      if (response.ok) await caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()))
      return response
    })),
  )
})
`
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubUserSite = repoName?.endsWith('.github.io')

export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/; local and user sites use /.
  base: process.env.GITHUB_ACTIONS && repoName && !isGitHubUserSite ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss(), offlineApp()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
