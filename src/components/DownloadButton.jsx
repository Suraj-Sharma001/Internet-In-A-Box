import { useEffect, useState } from 'react'
import { fileExists, saveFileFromUrl } from '../utils/fileSystem'

export default function DownloadButton({ resource, dirHandle }) {
  const [downloaded, setDownloaded] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const check = async () => {
      if (!dirHandle) return
      const exists = await fileExists(dirHandle, resource.filename)
      setDownloaded(exists)
    }
    check()
  }, [dirHandle, resource])

  const handleDownload = async () => {
    if (!dirHandle) {
      alert('Please select a directory first')
      return
    }
    if (downloading || downloaded) return
    
    try {
      setDownloading(true)
      await saveFileFromUrl(dirHandle, resource.url, resource.filename)
      setDownloaded(true)
    } catch (err) {
      console.error('Download failed', err)
      alert('Download failed: ' + err.message)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button 
      className={`btn ${downloaded ? 'secondary' : 'primary'} ${downloading ? 'downloading' : ''}`} 
      onClick={handleDownload}
      disabled={downloading || downloaded}
    >
      {downloading ? (
        <>⏳ Downloading...</>
      ) : downloaded ? (
        <>✅ Downloaded</>
      ) : (
        <>⬇️ Download</>
      )}
    </button>
  )
}
