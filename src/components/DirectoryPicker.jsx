import { useState } from 'react'

export default function DirectoryPicker({ onPick, dirHandle }) {
  const [status, setStatus] = useState('')
  const [name, setName] = useState(dirHandle ? dirHandle.name : '')

  const pickDirectory = async () => {
    try {
      // File System Access API
      const handle = await window.showDirectoryPicker()
      onPick(handle)
      setName(handle.name)
      setStatus('Directory selected: ' + handle.name)
    } catch (err) {
      console.error('Directory pick cancelled or not supported', err)
      setStatus('Directory pick cancelled or not supported')
    }
  }

  const clearDirectory = () => {
    onPick(null)
    setStatus('Cleared')
  }

  return (
    <section className="directory-picker card">
      <div className="row between">
        <button className="btn primary" onClick={pickDirectory}>
          {dirHandle ? 'Change directory' : 'Choose directory'}
        </button>
        {dirHandle && (
          <button className="btn" onClick={clearDirectory}>
            Clear
          </button>
        )}
      </div>
      <div className="status muted">{status}</div>
      {name && <div className="muted small">Selected folder: <strong>{name}</strong></div>}
    </section>
  )
}
