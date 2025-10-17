import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { promises as fs } from 'fs'

function resourcesManifestPlugin() {
  const resourcesSubdir = 'resources'
  let publicDir

  const scanResources = async (baseDir) => {
    const targetDir = path.join(baseDir, resourcesSubdir)
    const files = []

    async function walk(dir) {
      let entries
      try {
        entries = await fs.readdir(dir, { withFileTypes: true })
      } catch {
        return
      }
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          await walk(fullPath)
        } else {
          // Exclude manifest itself
          if (entry.name === '_manifest.json') continue
          const relFromResources = path.relative(targetDir, fullPath)
          const relUnix = relFromResources.split(path.sep).join('/')
          const url = `/${resourcesSubdir}/${encodeURIComponent(relUnix).replace(/%2F/g, '/')}`
          const ext = entry.name.split('.').pop().toLowerCase()
          const folder = relUnix.split('/')[0] || ''
          const stat = await fs.stat(fullPath).catch(() => null)
          let category = 'docs'
          if (ext === 'pdf') category = 'pdf'
          else if (folder === 'wiki' || entry.name.toLowerCase().includes('wiki') || ['html','htm'].includes(ext)) category = folder === 'wiki' ? 'wiki' : category
          files.push({
            relPath: `${resourcesSubdir}/${relUnix}`,
            url,
            filename: entry.name,
            folder,
            ext,
            bytes: stat ? stat.size : undefined,
            category,
          })
        }
      }
    }

    await walk(targetDir)
    return { updatedAt: new Date().toISOString(), files }
  }

  const writeManifest = async (baseDir) => {
    const manifest = await scanResources(baseDir)
    const outPath = path.join(baseDir, resourcesSubdir, '_manifest.json')
    await fs.writeFile(outPath, JSON.stringify(manifest, null, 2), 'utf-8')
  }

  return {
    name: 'resources-manifest',
    apply: 'serve',
    configResolved(config) {
      publicDir = config.publicDir || path.join(config.root, 'public')
    },
    async configureServer(server) {
      await writeManifest(publicDir)
      const watchPath = path.join(publicDir, resourcesSubdir)
      server.watcher.add(watchPath)
      const regenerate = async () => {
        await writeManifest(publicDir)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', regenerate)
      server.watcher.on('unlink', regenerate)
      server.watcher.on('change', regenerate)
    },
  }
}

function resourcesManifestBuildPlugin() {
  // Run during build as well
  let publicDir
  return {
    name: 'resources-manifest-build',
    apply: 'build',
    configResolved(config) {
      publicDir = config.publicDir || path.join(config.root, 'public')
    },
    async buildStart() {
      const resourcesSubdir = 'resources'
      const targetDir = path.join(publicDir, resourcesSubdir)
      // Reuse simple scan and write here to avoid duplication
      const files = []
      async function walk(dir) {
        let entries
        try { entries = await fs.readdir(dir, { withFileTypes: true }) } catch { return }
        for (const entry of entries) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) { await walk(full); continue }
          if (entry.name === '_manifest.json') continue
          const rel = path.relative(targetDir, full).split(path.sep).join('/')
          const url = `/resources/${encodeURIComponent(rel).replace(/%2F/g, '/')}`
          const ext = entry.name.split('.').pop().toLowerCase()
          const folder = rel.split('/')[0] || ''
          const stat = await fs.stat(full).catch(() => null)
          let category = 'docs'
          if (ext === 'pdf') category = 'pdf'
          else if (folder === 'wiki' || entry.name.toLowerCase().includes('wiki') || ['html','htm'].includes(ext)) category = folder === 'wiki' ? 'wiki' : category
          files.push({ relPath: `resources/${rel}`, url, filename: entry.name, folder, ext, bytes: stat ? stat.size : undefined, category })
        }
      }
      await walk(targetDir)
      const outPath = path.join(targetDir, '_manifest.json')
      const manifest = { updatedAt: new Date().toISOString(), files }
      await fs.writeFile(outPath, JSON.stringify(manifest, null, 2), 'utf-8')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), resourcesManifestPlugin(), resourcesManifestBuildPlugin()],
  server: {
    port: 5173,
    // Proxy API calls during development to avoid browser CORS issues
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        // Remove the `/api` prefix when forwarding to FastAPI
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
