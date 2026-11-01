import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubUserSite = repoName?.endsWith('.github.io')

export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/; local and user sites use /.
  base: process.env.GITHUB_ACTIONS && repoName && !isGitHubUserSite ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
