import { useEffect, useState } from 'react'

export default function DownloadButton({ resource }) {
  const [downloaded, setDownloaded] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // Check localStorage if already downloaded
    const isDownloaded = localStorage.getItem(`dl:${resource.id}`) === '1'
    setDownloaded(isDownloaded)
  }, [resource])

  const handleDownload = async () => {
    if (downloading) return
    if (downloaded) {
      alert('Already downloaded ✓')
      return
    }
    
    try {
      setDownloading(true)
      
      // Fetch the file
      const response = await fetch(resource.url)
      if (!response.ok) throw new Error('Network response was not ok')
      
      const blob = await response.blob()
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob)
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = resource.filename
      document.body.appendChild(a)
      a.click()
      
      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      // Mark as downloaded
      setDownloaded(true)
      localStorage.setItem(`dl:${resource.id}`, '1')
    } catch (err) {
      console.error('Download failed', err)
      alert('Download failed: ' + err.message)
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
