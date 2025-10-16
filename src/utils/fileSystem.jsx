// Minimal File System Access API helpers (browser-only)
export async function fileExists(dirHandle, name) {
  try {
    await dirHandle.getFileHandle(name, { create: false })
    return true
  } catch (err) {
    return false
  }
}

export async function saveJSON(dirHandle, name, obj) {
  const fileHandle = await dirHandle.getFileHandle(name, { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(JSON.stringify(obj, null, 2))
  await writable.close()
}

export async function readJSON(dirHandle, name) {
  try {
    const fileHandle = await dirHandle.getFileHandle(name, { create: false })
    const file = await fileHandle.getFile()
    const txt = await file.text()
    return JSON.parse(txt)
  } catch (err) {
    console.error('readJSON error', err)
    return null
  }
}

export async function saveFileFromUrl(dirHandle, url, filename) {
  const resp = await fetch(url)
  if (!resp.ok) throw new Error('Network response was not ok')
  const blob = await resp.blob()
  const fileHandle = await dirHandle.getFileHandle(filename, { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(blob)
  await writable.close()
}

// Ensure nested subdirectory path exists and return its DirectoryHandle
export async function ensureSubdirectory(dirHandle, subPath) {
  if (!subPath) return dirHandle
  const parts = subPath.split('/').filter(Boolean)
  let current = dirHandle
  for (const part of parts) {
    current = await current.getDirectoryHandle(part, { create: true })
  }
  return current
}

// Check if a file exists inside a subdirectory path
export async function fileExistsInSubdir(dirHandle, subPath, filename) {
  try {
    const targetDir = await ensureSubdirectory(dirHandle, subPath)
    await targetDir.getFileHandle(filename, { create: false })
    return true
  } catch (err) {
    return false
  }
}

// Save a URL into a specific subdirectory; optionally prevent overwrite
export async function saveFileFromUrlToSubdir(dirHandle, url, subPath, filename, { overwrite = false } = {}) {
  const targetDir = await ensureSubdirectory(dirHandle, subPath)
  if (!overwrite) {
    try {
      await targetDir.getFileHandle(filename, { create: false })
      const e = new Error('exists')
      e.code = 'exists'
      throw e
    } catch (err) {
      if (err?.code === 'exists') throw err
      // else continue to write
    }
  }
  const resp = await fetch(url)
  if (!resp.ok) throw new Error('Network response was not ok')
  const blob = await resp.blob()
  const fileHandle = await targetDir.getFileHandle(filename, { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(blob)
  await writable.close()
}
