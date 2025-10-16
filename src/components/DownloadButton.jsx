import { useEffect, useState } from 'react'
import { fileExistsInSubdir, saveFileFromUrlToSubdir } from '../utils/fileSystem'

export default function DownloadButton({ resource, dirHandle }) {
  const [downloaded, setDownloaded] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const check = async () => {
      if (!dirHandle) return
      const subdir = resource.category ? `${resource.category}` : ''
      const exists = await fileExistsInSubdir(dirHandle, subdir, resource.filename)
      setDownloaded(exists || localStorage.getItem(`dl:${resource.id}`) === '1')
    }
    check()
  }, [dirHandle, resource])

  const handleDownload = async () => {
    if (!dirHandle) {
      alert('Please select a directory first')
      return
    }
    if (downloading) return
    if (downloaded) {
      alert('Already on your device ✓')
      return
    }
    
    try {
      setDownloading(true)
      const subdir = resource.category ? `${resource.category}` : ''
      await saveFileFromUrlToSubdir(dirHandle, resource.url, subdir, resource.filename)
      setDownloaded(true)
      localStorage.setItem(`dl:${resource.id}`, '1')
    } catch (err) {
      console.error('Download failed', err)
      if (err?.code === 'exists') {
        alert('Already on your device ✓')
        setDownloaded(true)
        localStorage.setItem(`dl:${resource.id}`, '1')
      } else {
        alert('Download failed: ' + err.message)
      }
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button 
      className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 text-base ${downloading ? 'downloading' : ''} ${
        downloaded
          ? 'bg-gray-800 border-2 border-green-500/50 text-green-400 hover:bg-green-900/30 hover:border-green-500'
          : 'bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:from-green-600 hover:to-cyan-600 shadow-lg hover:shadow-xl hover:scale-105 transform'
      }`}
      onClick={handleDownload}
      disabled={downloading}
    >
      {downloading ? (
        <>⏳ Downloading...</>
      ) : downloaded ? (
        <>✅ On Device</>
      ) : (
        <>⬇️ Download</>
      )}
    </button>
  )
}
