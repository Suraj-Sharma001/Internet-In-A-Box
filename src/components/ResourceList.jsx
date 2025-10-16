import ResourceCard from './ResourceCard'
import demoData from '../utils/data'

export default function ResourceList({ dirHandle, onboarding }) {
  const resources = demoData.suggestionsFor(onboarding)

  return (
    <section className="resource-list">
      <h2>Suggested resources</h2>
      <div className="grid">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} dirHandle={dirHandle} />
        ))}
      </div>
    </section>
  )
}
