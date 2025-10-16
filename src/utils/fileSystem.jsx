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
