const demoResources = [
  {
    id: 'r1',
    title: 'React Quickstart (Demo)',
    type: 'webpage',
    size: '15 KB',
    description: 'A tiny demo HTML guide to React features.',
    preview: '/demo/demo1.html',
    url: '/demo/demo1.html',
    filename: 'react-quickstart.html',
  },
  {
    id: 'r2',
    title: 'Sample PDF: Offline Guide',
    type: 'pdf',
    size: '45 KB',
    description: 'A sample PDF file to demonstrate offline downloads.',
    preview: '/demo/sample.pdf',
    url: '/demo/sample.pdf',
    filename: 'offline-guide.pdf',
  },
  {
    id: 'r3',
    title: 'Earth Science Primer',
    type: 'webpage',
    size: '22 KB',
    description: 'Short primer on Earth science topics (demo).',
    preview: '/demo/demo2.html',
    url: '/demo/demo2.html',
    filename: 'earth-primer.html',
  },
]

export default {
  suggestionsFor: (onboarding) => {
    // naive personalization: if onboarding has branch include that in title
    if (!onboarding) return demoResources
    const interests = (onboarding.interests || '').toLowerCase()
    if (interests.includes('react') || (onboarding.branch || '').toLowerCase().includes('computer')) {
      return demoResources
    }
    return demoResources
  },
}
