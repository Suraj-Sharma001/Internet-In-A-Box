// File type detection and categorization
const getFileCategory = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx', 'txt', 'zip', 'pptx'].includes(ext)) return 'docs';
  if (filename.includes('wiki')) return 'wiki';
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

// Actual files from the resources directory
const actualResources = [
  // PDF files
  '1. Principles of Electromechanical Energy Conversion Author Universidad Tsinghua.pdf',
  '3rd year IPS_2025_26_Odd.pdf',
  'data-structures-and-algorithms.pdf',
  'DBMS Assignment 1.pdf',
  'DBMS ASSIGNMENT 2.pdf',
  'DBMS ASSIGNMENT 3.pdf',
  'dev-example.pdf',
  'dummy-10KB.pdf',
  'Dummy-PDF-2Pages.pdf',
  'Dummy-PDF.pdf',
  'engineering-economics-and-financial-management-chan-duong-nguyen.pdf',
  'protected.pdf',
  'python-programming-guide.pdf',
  'python-programming-guide.pdf.txt',
  'sample-10-page-pdf-a4-size.pdf',
  'sample-2.pdf',
  'sample-5-page-pdf-a4-size.pdf',
  'sample-pdf-a4-size.pdf',
  'sample-pdf-legal-size.pdf',
  'sample-pdf-letter-size.pdf',
  'sample-report.pdf',
  'sample-text-only-pdf-a4-size.pdf',
  'SamplePDF-19kb-Text-Formatting-1Page.pdf',
  'SamplePDF-28kb-Text-Formatting-3Pages.pdf',
  
  // Doc files
  '1-MB-DOC.doc',
  'Free_Test_Data_100KB_DOC.doc',
  'Free_Test_Data_500KB_DOC.doc',
  'JavaScript_Tutorial_Beginners.docx',
  'Mid Term Theory Exam 5th sem.docx',
  'OS Programs.txt',
  'python-docs.zip',
  'react-docs.zip',
  'SQL_CheatSheet.docx',
  'University_Placement_Portal_Presentation.pptx',
  'WebNova.pptx',
  '📘 SQL Queries.docx',
  
  // Wiki files
  'wiki-cs-demo.zip',
  'wiki-math-demo.zip',
];

const generateResourceData = () => {
  return actualResources.map((filename, index) => {
    const category = getFileCategory(filename);
    const categoryPath = category === 'wiki' ? 'wiki' : 
                        filename.endsWith('.pdf') ? 'pdf' : 'docs';
    
    return {
      id: `${category}_${index}_${filename.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`,
      category: category,
      title: generateTitle(filename),
      type: getFileType(filename),
      size: estimateFileSize(filename),
      description: `${generateTitle(filename)} - Available for offline access.`,
      preview: `/resources/${categoryPath}/${filename}`,
      url: `/resources/${categoryPath}/${filename}`,
      filename: filename,
    };
  });
};

export default {
  suggestionsFor: (onboarding) => {
    const allResources = generateResourceData();
    
    // If no onboarding data, return all resources
    if (!onboarding || !onboarding.interests) {
      return allResources;
    }
    
    // Filter based on user interests
    const interests = onboarding.interests.map(i => i.toLowerCase());
    const filtered = allResources.filter(resource => {
      const resourceText = `${resource.title} ${resource.type} ${resource.description}`.toLowerCase();
      return interests.some(interest => resourceText.includes(interest));
    });
    
    // If filtered results are too few, include some general resources
    if (filtered.length < 6) {
      const general = allResources.filter(r => !filtered.find(f => f.id === r.id)).slice(0, 10 - filtered.length);
      return [...filtered, ...general];
    }
    
    return filtered;
  },
  
  // Get all resources without filtering
  getAllResources: () => {
    return generateResourceData();
  },
  
  // Get resources by category
  getResourcesByCategory: (category) => {
    const allResources = generateResourceData();
    if (category === 'all') return allResources;
    return allResources.filter(resource => resource.category === category);
  },
  
  // Search resources
  searchResources: (query) => {
    const allResources = generateResourceData();
    const searchTerm = query.toLowerCase();
    return allResources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.type.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.filename.toLowerCase().includes(searchTerm)
    );
  }
};
