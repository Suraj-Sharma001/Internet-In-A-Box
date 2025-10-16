const demoResources = [
  // PDFs
  {
    id: 'pdf_python_guide',
    category: 'pdf',
    title: 'Python Programming Guide',
    type: 'Programming',
    size: '15 MB',
    description: 'Comprehensive Python notes and references (demo).',
    preview: '/resources/pdf/python-programming-guide.pdf',
    url: '/resources/pdf/python-programming-guide.pdf',
    filename: 'python-programming-guide.pdf',
  },
  {
    id: 'pdf_dsa',
    category: 'pdf',
    title: 'Data Structures & Algorithms',
    type: 'Computer Science',
    size: '22 MB',
    description: 'Foundational DSA topics (demo).',
    preview: '/resources/pdf/data-structures-and-algorithms.pdf',
    url: '/resources/pdf/data-structures-and-algorithms.pdf',
    filename: 'data-structures-and-algorithms.pdf',
  },

  // Docs
  {
    id: 'docs_react_complete',
    category: 'docs',
    title: 'React Documentation (Complete)',
    type: 'Web Development',
    size: '12 MB',
    description: 'Offline React docs bundle (demo).',
    preview: '/resources/docs/react-docs.zip',
    url: '/resources/docs/react-docs.zip',
    filename: 'react-docs.zip',
  },
  {
    id: 'docs_python_official',
    category: 'docs',
    title: 'Python Official Documentation',
    type: 'Programming',
    size: '18 MB',
    description: 'Offline Python docs bundle (demo).',
    preview: '/resources/docs/python-docs.zip',
    url: '/resources/docs/python-docs.zip',
    filename: 'python-docs.zip',
  },

  // Wiki dumps (demo small zips)
  {
    id: 'wiki_cs_dump',
    category: 'wiki',
    title: 'Computer Science - Wikipedia Dump',
    type: 'Computer Science',
    size: '450 MB',
    description: 'Sample wiki dump (demo).',
    preview: '/resources/wiki/wiki-cs-demo.zip',
    url: '/resources/wiki/wiki-cs-demo.zip',
    filename: 'wiki-cs-demo.zip',
  },
  {
    id: 'wiki_math_dump',
    category: 'wiki',
    title: 'Mathematics - Wikipedia Dump',
    type: 'Mathematics',
    size: '380 MB',
    description: 'Sample wiki dump (demo).',
    preview: '/resources/wiki/wiki-math-demo.zip',
    url: '/resources/wiki/wiki-math-demo.zip',
    filename: 'wiki-math-demo.zip',
  },
]

export default {
  suggestionsFor: (onboarding) => {
    return demoResources
  },
}
