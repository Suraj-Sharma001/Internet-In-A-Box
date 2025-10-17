import DownloadButton from './DownloadButton'
import { useState } from 'react'
import HtmlPreviewModal from './HtmlPreviewModal'

const getTypeIcon = (type) => {
  const icons = {
    'webpage': '🌐',
    'pdf': '📄',
    'video': '🎥',
    'book': '📚',
    'document': '📝'
  }
  return icons[type] || '📦'
}

export default function ResourceCard({ resource, dirHandle }) {
  const [showHtmlPreview, setShowHtmlPreview] = useState(false)

  const isHtml = resource.filename && resource.filename.toLowerCase().endsWith('.html')

  return (
    <>
      <article className="resource-card card">
        <div className="resource-header">
          <span className="resource-type-icon">{getTypeIcon(resource.type)}</span>
          <span className="resource-meta">{resource.type}</span>
        </div>
        <h3>{resource.title}</h3>
        <p className="resource-size muted small">{resource.size}</p>
        <p className="resource-desc">{resource.description}</p>
        <div className="resource-actions row">
          {isHtml ? (
            <button className="btn ghost" onClick={() => setShowHtmlPreview(true)}>
              👁️ Preview
            </button>
          ) : (
            <a className="btn ghost" href={resource.preview} target="_blank" rel="noreferrer">
              👁️ Preview
            </a>
          )}
          <DownloadButton resource={resource} dirHandle={dirHandle} onPreview={() => setShowHtmlPreview(true)} />
        </div>
      </article>

      {showHtmlPreview && (
        <HtmlPreviewModal url={resource.preview} title={resource.title} onClose={() => setShowHtmlPreview(false)} />
      )}
    </>
  )
}
