// File type detection and categorization
const getFileCategory = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx', 'txt', 'zip', 'pptx', 'html', 'htm'].includes(ext)) {
    // If it's an HTML file under wiki, consider it wiki; otherwise docs
    if (ext === 'html' || ext === 'htm') {
      if (filename.toLowerCase().includes('wikipedia') || filename.toLowerCase().includes('wiki')) {
        return 'wiki';
      }
    }
    return filename.toLowerCase().includes('wiki') ? 'wiki' : 'docs';
  }
  return 'docs';
};

const getFileType = (filename) => {
  const name = filename.toLowerCase();
  if (name.includes('python') || name.includes('programming')) return 'Programming';
  if (name.includes('sql') || name.includes('database') || name.includes('dbms')) return 'Database';
  if (name.includes('javascript') || name.includes('react') || name.includes('web')) return 'Web Development';
  if (name.includes('math') || name.includes('calculus') || name.includes('algebra')) return 'Mathematics';
  if (name.includes('cs') || name.includes('computer') || name.includes('algorithm') || name.includes('data-structure')) return 'Computer Science';
  if (name.includes('economics') || name.includes('financial')) return 'Economics';
  if (name.includes('electro') || name.includes('engineering')) return 'Engineering';
  if (name.includes('os') || name.includes('operating')) return 'Operating Systems';
  if (name.includes('placement') || name.includes('university')) return 'Academic';
  return 'General';
};

const estimateFileSize = (filename) => {
  const name = filename.toLowerCase();
  if (name.includes('10kb') || name.includes('dummy')) return '10 KB';
  if (name.includes('100kb')) return '100 KB';
  if (name.includes('500kb')) return '500 KB';
  if (name.includes('1mb') || name.includes('1-mb')) return '1 MB';
  if (name.includes('wiki')) return name.includes('cs') ? '450 MB' : '380 MB';
  // Estimate based on file type
  const ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return Math.floor(Math.random() * 20 + 5) + ' MB';
  if (ext === 'zip') return Math.floor(Math.random() * 15 + 8) + ' MB';
  if (['doc', 'docx'].includes(ext)) return Math.floor(Math.random() * 5 + 1) + ' MB';
  if (ext === 'txt') return Math.floor(Math.random() * 500 + 50) + ' KB';
  if (ext === 'pptx') return Math.floor(Math.random() * 10 + 3) + ' MB';
  if (ext === 'html' || ext === 'htm') return Math.floor(Math.random() * 800 + 100) + ' KB';
  return '1 MB';
};

const generateTitle = (filename) => {
  // Remove file extension
  let title = filename.replace(/\.[^/.]+$/, '');
  
  // Handle special cases
  if (title === 'OS Programs') return 'Operating Systems Programs';
  if (title.includes('python-programming-guide')) return 'Python Programming Guide';
  if (title.includes('data-structures-and-algorithms')) return 'Data Structures & Algorithms';
  if (title.includes('react-docs')) return 'React Documentation (Complete)';
  if (title.includes('python-docs')) return 'Python Official Documentation';
  if (title.includes('wiki-cs-demo')) return 'Computer Science - Wikipedia Dump';
  if (title.includes('wiki-math-demo')) return 'Mathematics - Wikipedia Dump';
  
  // Clean up common patterns
  title = title
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize words
  title = title.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
  
  return title;
};

// Load resources from generated manifest
async function loadManifest() {
  const resp = await fetch('/resources/_manifest.json', { cache: 'no-cache' })
  if (!resp.ok) throw new Error('Failed to load resources manifest')
  return resp.json()
}

function sizeFromBytes(bytes, ext) {
  if (!bytes || isNaN(bytes)) return estimateFileSize(ext ? `x.${ext}` : 'file')
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.max(1, Math.round(kb))} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(1)} MB`
  const gb = mb / 1024
  return `${gb.toFixed(2)} GB`
}

function mapManifestToResources(manifest) {
  return manifest.files.map((f, index) => {
    const filename = f.filename
    const category = f.category || getFileCategory(filename)
    const url = f.url
    const folder = f.folder
    const lower = filename.toLowerCase()
    const isPdf = lower.endsWith('.pdf')
    const categoryPath = folder || (category === 'wiki' ? 'wiki' : isPdf ? 'pdf' : 'docs')
    return {
      id: `${category}_${index}_${filename.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
      category,
      title: generateTitle(filename),
      type: getFileType(filename),
      size: f.bytes ? sizeFromBytes(f.bytes, f.ext) : estimateFileSize(filename),
      description: `${generateTitle(filename)} - Available for offline access.`,
      preview: url,
      url: url,
      filename,
      folder: categoryPath,
      ext: f.ext,
    }
  })
}

export default {
  // Returns Promise<array>
  suggestionsFor: async (onboarding) => {
    const manifest = await loadManifest()
    const allResources = mapManifestToResources(manifest)
    if (!onboarding || !onboarding.interests) return allResources
    const interests = onboarding.interests.map(i => i.toLowerCase())
    const filtered = allResources.filter(resource => {
      const resourceText = `${resource.title} ${resource.type} ${resource.description}`.toLowerCase()
      return interests.some(interest => resourceText.includes(interest))
    })
    if (filtered.length < 6) {
      const general = allResources.filter(r => !filtered.find(f => f.id === r.id)).slice(0, 10 - filtered.length)
      return [...filtered, ...general]
    }
    return filtered
  },
  getAllResources: async () => {
    const manifest = await loadManifest()
    return mapManifestToResources(manifest)
  },
  getResourcesByCategory: async (category) => {
    const manifest = await loadManifest()
    const allResources = mapManifestToResources(manifest)
    if (category === 'all') return allResources
    return allResources.filter(r => r.category === category)
  },
  searchResources: async (query) => {
    const manifest = await loadManifest()
    const allResources = mapManifestToResources(manifest)
    const searchTerm = query.toLowerCase()
    return allResources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.type.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.filename.toLowerCase().includes(searchTerm)
    )
  }
}
