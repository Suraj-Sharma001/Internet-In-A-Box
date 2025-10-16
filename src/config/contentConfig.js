// Content Database Configuration
// Add your offline content items here

export const contentDatabase = [
  // PDFs
  {
    id: 1,
    title: 'Python Programming Guide',
    category: 'pdf',
    type: 'Programming',
    size: '15 MB',
    downloaded: false,
    url: '#',
    description: 'Complete guide to Python programming for beginners to advanced',
    tags: ['python', 'programming', 'coding'],
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    category: 'pdf',
    type: 'Computer Science',
    size: '22 MB',
    downloaded: false,
    url: '#',
    description: 'Essential data structures and algorithms with examples',
    tags: ['algorithms', 'data-structures', 'computer-science'],
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    category: 'pdf',
    type: 'Web Development',
    size: '35 MB',
    downloaded: false,
    url: '#',
    description: 'Full-stack web development from HTML to deployment',
    tags: ['web', 'html', 'css', 'javascript'],
  },
  {
    id: 4,
    title: 'Machine Learning Basics',
    category: 'pdf',
    type: 'AI/ML',
    size: '28 MB',
    downloaded: false,
    url: '#',
    description: 'Introduction to machine learning concepts and applications',
    tags: ['ml', 'ai', 'machine-learning'],
  },

  // Wikipedia Dumps
  {
    id: 5,
    title: 'Computer Science - Wikipedia Dump',
    category: 'wiki',
    type: 'Computer Science',
    size: '450 MB',
    downloaded: false,
    url: '#',
    description: 'Complete Wikipedia articles on computer science topics',
    tags: ['wikipedia', 'computer-science', 'reference'],
  },
  {
    id: 6,
    title: 'Mathematics - Wikipedia Dump',
    category: 'wiki',
    type: 'Mathematics',
    size: '380 MB',
    downloaded: false,
    url: '#',
    description: 'Comprehensive mathematics articles from Wikipedia',
    tags: ['wikipedia', 'mathematics', 'reference'],
  },
  {
    id: 7,
    title: 'Physics - Wikipedia Dump',
    category: 'wiki',
    type: 'Physics',
    size: '520 MB',
    downloaded: false,
    url: '#',
    description: 'Physics articles and scientific content from Wikipedia',
    tags: ['wikipedia', 'physics', 'science'],
  },

  // Documentation
  {
    id: 8,
    title: 'React Documentation (Complete)',
    category: 'docs',
    type: 'Web Development',
    size: '12 MB',
    downloaded: false,
    url: '#',
    description: 'Official React library documentation offline version',
    tags: ['react', 'javascript', 'documentation'],
  },
  {
    id: 9,
    title: 'Python Official Documentation',
    category: 'docs',
    type: 'Programming',
    size: '18 MB',
    downloaded: false,
    url: '#',
    description: 'Python standard library and language reference',
    tags: ['python', 'documentation', 'reference'],
  },
  {
    id: 10,
    title: 'Node.js Documentation',
    category: 'docs',
    type: 'Programming',
    size: '14 MB',
    downloaded: false,
    url: '#',
    description: 'Complete Node.js API documentation and guides',
    tags: ['nodejs', 'javascript', 'documentation'],
  },

  // Educational Courses
  {
    id: 11,
    title: 'MIT OpenCourseWare - CS50',
    category: 'courses',
    type: 'Computer Science',
    size: '1.2 GB',
    downloaded: false,
    url: '#',
    description: "Harvard's CS50 introduction to computer science",
    tags: ['cs50', 'course', 'computer-science'],
  },
  {
    id: 12,
    title: 'Khan Academy - Calculus',
    category: 'courses',
    type: 'Mathematics',
    size: '850 MB',
    downloaded: false,
    url: '#',
    description: 'Complete calculus course with video lectures',
    tags: ['calculus', 'mathematics', 'khan-academy'],
  },

  // Tools
  {
    id: 13,
    title: 'Offline Code Editor',
    category: 'tools',
    type: 'Programming',
    size: '5 MB',
    downloaded: false,
    url: '#',
    description: 'Lightweight code editor that works completely offline',
    tags: ['editor', 'coding', 'tool'],
  },
  {
    id: 14,
    title: 'Scientific Calculator',
    category: 'tools',
    type: 'Mathematics',
    size: '2 MB',
    downloaded: false,
    url: '#',
    description: 'Advanced scientific calculator with graphing',
    tags: ['calculator', 'mathematics', 'tool'],
  },
];

// Category definitions
export const categories = [
  { id: 'all', name: 'All Content', icon: '🌐', color: 'green' },
  { id: 'pdf', name: 'PDFs', icon: '📄', color: 'blue' },
  { id: 'wiki', name: 'Wikipedia', icon: '📚', color: 'purple' },
  { id: 'docs', name: 'Documentation', icon: '📖', color: 'yellow' },
  { id: 'courses', name: 'Courses', icon: '🎓', color: 'red' },
  { id: 'tools', name: 'Tools', icon: '🛠️', color: 'orange' },
];

// Interest options for onboarding
export const interestOptions = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Medicine',
  'History',
  'Literature',
  'Philosophy',
  'Programming',
  'Web Development',
  'Data Science',
  'AI/ML',
  'Cybersecurity',
  'Arts',
  'Music',
  'Languages',
  'Business',
  'Economics',
];

// Purpose options
export const purposeOptions = [
  { value: 'study', label: 'Study & Research' },
  { value: 'teaching', label: 'Teaching' },
  { value: 'personal', label: 'Personal Learning' },
  { value: 'professional', label: 'Professional Development' },
  { value: 'emergency', label: 'Emergency Preparedness' },
  { value: 'other', label: 'Other' },
];

// Utility function to get recommended content based on user interests
export const getRecommendedContent = (userInterests, allContent) => {
  if (!userInterests || userInterests.length === 0) {
    return allContent.slice(0, 6); // Return first 6 items if no interests
  }

  const scored = allContent.map(item => {
    let score = 0;
    userInterests.forEach(interest => {
      // Check if interest matches type
      if (item.type.toLowerCase().includes(interest.toLowerCase())) {
        score += 3;
      }
      // Check if interest matches tags
      if (item.tags?.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))) {
        score += 2;
      }
      // Check if interest matches title
      if (item.title.toLowerCase().includes(interest.toLowerCase())) {
        score += 1;
      }
    });
    return { ...item, score };
  });

  // Sort by score and return top items
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
};

// Utility function to format file sizes
export const formatFileSize = (sizeString) => {
  const size = parseFloat(sizeString);
  if (sizeString.includes('GB')) {
    return `${size.toFixed(2)} GB`;
  } else if (sizeString.includes('MB')) {
    return `${size.toFixed(0)} MB`;
  } else if (sizeString.includes('KB')) {
    return `${size.toFixed(0)} KB`;
  }
  return sizeString;
};

// Utility function to calculate total storage used
export const calculateTotalStorage = (items) => {
  const downloaded = items.filter(item => item.downloaded);
  const totalMB = downloaded.reduce((acc, item) => {
    const size = parseFloat(item.size);
    return acc + (item.size.includes('GB') ? size * 1024 : size);
  }, 0);

  return totalMB >= 1024 
    ? `${(totalMB / 1024).toFixed(2)} GB` 
    : `${totalMB.toFixed(0)} MB`;
};
