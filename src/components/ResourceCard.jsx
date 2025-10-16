import DownloadButton from './DownloadButton'

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
  return (
    <article className="resource-card card">
      <div className="resource-header">
        <span className="resource-type-icon">{getTypeIcon(resource.type)}</span>
        <span className="resource-meta">{resource.type}</span>
      </div>
      <h3>{resource.title}</h3>
      <p className="resource-size muted small">{resource.size}</p>
      <p className="resource-desc">{resource.description}</p>
      <div className="resource-actions row">
        <a className="btn ghost" href={resource.preview} target="_blank" rel="noreferrer">
          👁️ Preview
        </a>
        <DownloadButton resource={resource} dirHandle={dirHandle} />
      </div>
    </article>
  )
}
