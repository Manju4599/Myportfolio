// Centralized portfolio data — single source of truth
// Edit content here; components consume this data

export const PROFILE = {
  name: 'Manjunath R',
  title: 'Data Analyst · Python Developer',
  tagline: 'Data. Systems. Intelligence.',
  intro:
    'I work across Python, SQL, analytics, and machine learning to build systems that turn raw data into usable decisions. Currently completing my B.Tech in Computer Science with a specialization in Big Data Analytics.',
  email: 'vkmanjunathrv@gmail.com',
  github: 'https://github.com/Manju4599',
  linkedin: 'https://linkedin.com/in/manjunath-r-00702524a',
  location: 'Chennai, India',
  resumeUrl: '/Manjunath_Resume.pdf',
};

export const EDUCATION = [
  {
    degree: 'B.Tech — Computer Science and Engineering',
    specialization: 'Big Data Analytics',
    institution: 'SRM Institute of Science and Technology',
    period: '2022 – 2026',
    gpa: '8.98 / 10',
  },
];

export const EXPERIENCE = [
  {
    role: 'Analyst Trainee — Data Analytics',
    company: 'Eagle-HiTech Softclou Pvt Ltd',
    period: 'Jun 2024 – Aug 2024',
    type: 'Internship',
    responsibilities: [
      'Performed exploratory data analysis (EDA) on client datasets to identify patterns, trends, and anomalies',
      'Cleaned and transformed raw datasets using Python (Pandas, NumPy) to meet client specifications',
      'Built visualizations (Matplotlib) to communicate business insights to non-technical stakeholders',
      'Provided actionable recommendations based on analytical findings',
    ],
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'EDA', 'Data Cleaning', 'Visualization'],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Coursera / DeepLearning.AI',
    year: '2024',
  },
  {
    name: 'Machine Learning Basics',
    issuer: 'Coursera',
    year: '2024',
  },
  {
    name: 'Python for Data Science',
    issuer: 'NPTEL',
    year: '2023',
  },
];

export const SKILLS = {
  programming: [
    { name: 'Python', level: 'primary' },
    { name: 'SQL', level: 'primary' },
    { name: 'Java', level: 'secondary' },
    { name: 'JavaScript', level: 'secondary' },
  ],
  dataAnalytics: [
    { name: 'Pandas', level: 'primary' },
    { name: 'NumPy', level: 'primary' },
    { name: 'Matplotlib', level: 'primary' },
    { name: 'Power BI', level: 'secondary' },
    { name: 'EDA', level: 'primary' },
  ],
  mlAi: [
    { name: 'Machine Learning', level: 'primary' },
    { name: 'Deep Learning', level: 'secondary' },
    { name: 'Computer Vision', level: 'primary' },
    { name: 'OpenCV', level: 'primary' },
    { name: 'MediaPipe', level: 'primary' },
    { name: 'scikit-learn', level: 'primary' },
    { name: 'TensorFlow / Keras', level: 'secondary' },
    { name: 'LLM Integration', level: 'primary' },
  ],
  coreCs: [
    { name: 'Data Structures & Algorithms', level: 'primary' },
    { name: 'Object-Oriented Programming', level: 'primary' },
    { name: 'REST API Design', level: 'primary' },
    { name: 'Database Design', level: 'secondary' },
  ],
  tools: [
    { name: 'FastAPI', level: 'primary' },
    { name: 'Flask', level: 'primary' },
    { name: 'MySQL', level: 'primary' },
    { name: 'PostgreSQL', level: 'secondary' },
    { name: 'Git', level: 'primary' },
    { name: 'Docker', level: 'secondary' },
  ],
};

export const PROJECTS = [
  {
    id: 'hospital-alert',
    rank: 1,
    title: 'AI-Based Hospital Resource Alert & Optimization System',
    shortTitle: 'Hospital Resource System',
    category: ['Python', 'Machine Learning', 'Data Analytics', 'AI'],
    relevantRoles: ['Data Analyst', 'ML / AI', 'Python Developer'],
    status: 'Prototype',
    github: 'https://github.com/Manju4599/Hospital-resource-alert-and-management',
    tags: ['FastAPI', 'Python', 'MySQL', 'Groq AI', 'LLaMA 3.3', 'SQLAlchemy'],
    summary:
      'A full-stack decision-support platform built to address reactive hospital management. Integrates predictive threshold alerts with generative AI to automate lab report triage and centralize resource tracking.',
    problem:
      'Hospital resource management in many institutions is handled manually and reactively. Critical bed shortages, medicine stockouts, and complex lab reports all demand immediate attention but lack a unified, proactive system.',
    whyItMatters:
      'Healthcare data silos and reactive management directly contribute to patient delays and staff overload. This system shifts the operational model from reactive firefighting to predictive, data-driven resource allocation.',
    approach:
      'Built a 3-tier FastAPI backend with SQLAlchemy ORM managing patients, beds, medicine inventory, and staff. Integrated Groq\'s LLaMA 3.3 70B model to automatically analyze raw lab reports and generate both clinical summaries for doctors and simplified explanations for patients.',
    architecture: [
      { step: 'Data Ingestion', desc: 'Patient admissions, bed status, medicine levels → MySQL via FastAPI endpoints' },
      { step: 'Threshold Monitor', desc: 'Background task watches bed occupancy (>85%) and medicine stock levels' },
      { step: 'Alert Engine', desc: 'Automated alerts dispatched when thresholds are breached' },
      { step: 'AI Triage', desc: 'Raw lab data → Groq API (LLaMA 3.3) → Clinical insight + patient summary' },
      { step: 'Dashboard', desc: 'Jinja2 real-time dashboard with color-coded severity indicators' },
    ],
    decisions: [
      'Chose async FastAPI with AsyncGroq to prevent AI calls from blocking the web server under load',
      'Implemented data anonymization before dispatching to third-party AI APIs for patient privacy',
      'Used background tasks for alert generation to keep the main request cycle fast',
      'Hot-swapped AI provider from Google Gemini to Groq during development when rate limits were hit',
    ],
    outcomes: [
      'Theoretical 15% reduction in resource wastage through predictive thresholding',
      'Estimated 30% reduction in preliminary physician review time via AI triage',
      'Estimated 25% decrease in patient follow-up inquiries through AI-generated summaries',
    ],
    outcomesNote: 'Outcomes are simulated/theoretical estimates based on project design analysis, not measured production metrics.',
    challenges: [
      'API rate limits required mid-project AI provider swap; resolved by abstracting the AI adapter layer',
      'Async handling of AI responses required careful asyncio configuration to avoid blocking',
    ],
    techStack: {
      backend: ['Python 3.10+', 'FastAPI', 'Uvicorn', 'SQLAlchemy', 'MySQL'],
      ai: ['Groq API', 'LLaMA 3.3 70B'],
      frontend: ['Jinja2 Templates', 'HTML/CSS/JS'],
    },
  },
  {
    id: 'tourmind',
    rank: 2,
    title: 'TourMind AI — Multilingual Tourist Assistant',
    shortTitle: 'TourMind AI',
    category: ['Python', 'AI', 'Machine Learning'],
    relevantRoles: ['ML / AI', 'Python Developer', 'Software Engineering'],
    status: 'Prototype',
    github: 'https://github.com/Manju4599/Tour-Assist',
    tags: ['FastAPI', 'Groq API', 'LLaMA 3.3', 'langdetect', 'Computer Vision', 'Python'],
    summary:
      'A multilingual AI tourist assistant that detects the user\'s language automatically, processes natural language travel queries, analyzes landmark images, and responds entirely in the user\'s native language — supporting 25+ languages.',
    problem:
      'International tourists face significant friction when navigating unfamiliar places — language barriers, inability to identify landmarks, and lack of context-aware local information.',
    whyItMatters:
      'A system that automatically detects language and responds natively removes a major accessibility barrier for non-English speaking travelers.',
    approach:
      'Built a FastAPI backend with three specialized components: language detection (Naïve Bayes with n-gram profiles via langdetect), translation (Groq LLM transformer), and multimodal chat (LLaMA 3.3 vision for image analysis). Maintains per-session conversation history for context-aware responses.',
    architecture: [
      { step: 'User Input', desc: 'Text query or landmark image uploaded via frontend' },
      { step: 'Language Detection', desc: 'langdetect Naïve Bayes classifier identifies language (55+ supported)' },
      { step: 'Model Selection', desc: 'Text-only → LLaMA 3.3 70B | Image input → LLaMA 3.2 Vision 11B' },
      { step: 'Context Assembly', desc: 'Last 20 messages + language metadata assembled for context window' },
      { step: 'AI Response', desc: 'Groq API generates response in detected language with travel context' },
      { step: 'History Store', desc: 'Session history persisted in JSON store for multi-turn conversation' },
    ],
    decisions: [
      'Used langdetect (classical Naïve Bayes) for language detection rather than LLM — faster, cheaper, deterministic',
      'Separated text and vision model selection for cost efficiency — vision models only invoked when images are present',
      'Built local JSON history store to avoid database complexity while preserving multi-turn context',
      'Injected detected language code into system prompt to enforce native-language responses',
    ],
    outcomes: [
      'Supports 25+ languages including Tamil, Hindi, Japanese, Arabic, and Spanish',
      'Handles multimodal inputs: landmark photos, menu images, and sign images analyzed in context',
    ],
    challenges: [
      'Ensuring the LLM maintains language fidelity across multi-turn conversations required careful prompt engineering',
      'Image size limits from the Groq vision API required client-side preprocessing',
    ],
    techStack: {
      backend: ['Python', 'FastAPI', 'Groq SDK', 'langdetect'],
      ai: ['LLaMA 3.3 70B (Groq)', 'LLaMA 3.2 Vision 11B (Groq)'],
      frontend: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    },
  },
  {
    id: 'gesture-cursor',
    rank: 3,
    title: 'Gesture-Based Cursor Control System',
    shortTitle: 'Gesture Cursor',
    category: ['Python', 'Computer Vision', 'Machine Learning'],
    relevantRoles: ['ML / AI', 'Python Developer', 'Software Engineering'],
    status: 'Complete',
    github: 'https://github.com/Manju4599/GESTURE-BASED-CURSOR',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'scikit-learn', 'PyAutoGUI', 'Computer Vision'],
    summary:
      'A touchless human-computer interaction system that maps hand gestures to real-time cursor movements, clicks, scrolling, and drag operations using MediaPipe\'s 21-point hand landmark model and a trained Random Forest classifier.',
    problem:
      'Standard input devices create barriers for accessibility use cases, presentations, and remote control scenarios. Building reliable gesture recognition requires solving real challenges in latency, accuracy, and cursor smoothness.',
    whyItMatters:
      'Computer vision applied to HCI demonstrates practical ML pipeline design: data collection, model training, real-time inference, and hardware integration.',
    approach:
      'Used MediaPipe to extract 21 3D hand landmarks per frame. Mapped normalized coordinates to screen space using numpy interpolation. Applied exponential smoothing for cursor stability. Trained a Random Forest classifier (100 estimators, 63-dimensional feature vector) for gesture classification.',
    architecture: [
      { step: 'Webcam Capture', desc: 'OpenCV reads frames at native refresh rate' },
      { step: 'Hand Detection', desc: 'MediaPipe extracts 21 landmarks (x, y, z) per hand' },
      { step: 'Feature Vector', desc: '63-dimensional vector (21 landmarks × 3 coordinates)' },
      { step: 'Gesture Classifier', desc: 'Random Forest (100 estimators) classifies gesture type' },
      { step: 'Cursor Mapping', desc: 'Hand position → screen coords via numpy.interp()' },
      { step: 'Smoothing', desc: 'Exponential smoothing applied to remove jitter' },
      { step: 'Action Dispatch', desc: 'PyAutoGUI executes click / scroll / drag based on classified gesture' },
    ],
    decisions: [
      'Random Forest chosen for gesture classification — interpretable, fast inference, no GPU required',
      'Exponential smoothing rather than Kalman filter — simpler to tune, adequate for cursor stability',
      'Gesture model saved as .pkl for persistence — no retraining needed on restart',
      'Separate training mode allows collecting custom gesture datasets for new actions',
    ],
    outcomes: [
      'Cursor control with exponential smoothing achieving 55% improvement in movement smoothness',
      'Supports 5 gesture types: cursor move, left click, right click, scroll up/down, drag & drop',
      '63-dimensional feature space covering all 21 MediaPipe hand landmarks',
    ],
    outcomesNote: 'Smoothness improvement is self-reported from prototype testing, not a production benchmark.',
    challenges: [
      'Initial latency between gesture detection and cursor response required frame buffering optimization',
      'Distinguishing visually similar gestures (e.g., open palm vs. pointing) required additional training samples',
    ],
    techStack: {
      backend: ['Python 3.7+', 'OpenCV', 'MediaPipe', 'scikit-learn', 'PyAutoGUI', 'NumPy', 'Pandas'],
      ai: ['Random Forest Classifier (scikit-learn)'],
    },
  },
  {
    id: 'datapure',
    rank: 4,
    title: 'DataPure — Automated Data Cleaning Platform',
    shortTitle: 'DataPure',
    category: ['Python', 'Data Analytics', 'SQL'],
    relevantRoles: ['Data Analyst', 'Python Developer'],
    status: 'Deployed',
    demo: 'https://data-pure.vercel.app/',
    github: 'https://github.com/Manju4599/Data-Pure',
    tags: ['Python', 'Flask', 'Pandas', 'NumPy', 'SciPy', 'Vercel'],
    summary:
      'A deployed web application for automated data cleaning of CSV, Excel, and JSON files. Applies 8+ cleaning modules including missing value handling, outlier removal (IQR/Z-score), type inference, and date standardization — with a visual cleaning report.',
    problem:
      'Data analysts spend a disproportionate amount of time on cleaning tasks. Most cleaning tools are either too manual (Excel) or require scripting knowledge (Pandas). A web-based automated cleaner reduces friction.',
    approach:
      'Built a Flask backend with Pandas/SciPy processing engine. Cleaning operations are modular — each step is configurable and logged independently. Results include a Data Quality Score and a timeline of transformations applied.',
    architecture: [
      { step: 'File Upload', desc: 'CSV / Excel / JSON parsed by file_handler.py' },
      { step: 'Cleaning Pipeline', desc: 'simple_cleaner.py applies selected modules sequentially' },
      { step: 'Quality Score', desc: 'Computed from missing rate, type validity, outlier density' },
      { step: 'Report', desc: 'Timeline of all transformations returned to frontend' },
      { step: 'Download', desc: 'Cleaned file served for download' },
    ],
    outcomes: [
      'Live deployment on Vercel serverless',
      '8 cleaning modules: missing values, duplicates, text normalization, date standardization, type inference, column drop, outlier removal (IQR/Z-score)',
    ],
    techStack: {
      backend: ['Python 3.12', 'Flask 3.x', 'Pandas 2.2', 'NumPy', 'SciPy'],
      frontend: ['HTML5', 'CSS3 (CSS Variables)', 'Vanilla JavaScript'],
      infra: ['Vercel Serverless'],
    },
  },
  {
    id: 'job-scheduler',
    rank: 5,
    title: 'Enterprise Job Scheduler',
    shortTitle: 'Job Scheduler',
    category: ['Python', 'Software Engineering'],
    relevantRoles: ['Software Engineering', 'Python Developer'],
    status: 'Prototype',
    github: 'https://github.com/Manju4599/Enterprise-Job-Scheduler',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Next.js', 'Docker', 'TypeScript'],
    summary:
      'A distributed, multi-tenant background job execution platform enforcing at-least-once delivery, workflow DAG execution, bulkhead isolation between tenants, and circuit breakers to protect downstream services.',
    problem:
      'Enterprise background job systems require reliability patterns that go beyond a simple queue: retry semantics, tenant isolation, circuit breaking, and visual workflow orchestration.',
    approach:
      'Built a FastAPI backend with asyncpg PostgreSQL, a separate worker process handling job execution with circuit breaker state machines, and a Next.js + TypeScript dashboard with a DAG visualizer for workflow inspection.',
    outcomes: [
      'Bulkhead isolation prevents one tenant\'s job volume from starving others',
      'Circuit breaker transitions: Closed → Open → Half-Open on downstream failure detection',
      'DAG visualizer allows workflow inspection and debugging',
    ],
    techStack: {
      backend: ['Python', 'FastAPI', 'asyncpg', 'SQLAlchemy', 'PostgreSQL'],
      frontend: ['Next.js', 'TypeScript', 'React'],
      infra: ['Docker', 'docker-compose'],
    },
  },
  {
    id: 'maze-solver',
    rank: 6,
    title: 'Simple Maze Solver — Image-Based DFS/BFS',
    shortTitle: 'Maze Solver',
    category: ['Python', 'Software Engineering'],
    relevantRoles: ['Software Engineering', 'Python Developer', 'ML / AI'],
    status: 'Complete',
    github: 'https://github.com/Manju4599/SIMPLE-MAZE-SOLVER',
    tags: ['Python', 'OpenCV', 'DFS', 'BFS', 'Graph Algorithms', 'Image Processing'],
    summary:
      'A Python-based maze solver that processes image inputs, constructs a graph representation from pixel data, and finds paths using DFS and BFS algorithms — demonstrating core graph theory applied to a visual problem.',
    problem:
      'Classic DSA problems become more interesting when applied to real inputs. This project demonstrates how graph traversal (DFS/BFS) applies to pixel-level maze images.',
    approach:
      'Images are processed with OpenCV to identify walkable pixels. A graph is constructed from pixel adjacency. DFS explores depth-first; BFS guarantees the shortest path. Both algorithms are compared visually.',
    outcomes: [
      'Correctly solves mazes from image input using both DFS and BFS',
      'Demonstrates understanding of core graph algorithms: stacks (DFS) vs queues (BFS)',
      'Visual output overlays the solution path on the original maze image',
    ],
    techStack: {
      backend: ['Python', 'OpenCV', 'NumPy'],
    },
  },
];

export const GITHUB_STATS = {
  username: 'Manju4599',
  profileUrl: 'https://github.com/Manju4599',
  repoCount: 10,
  // Static fallback data — displayed if API is unavailable
  pinnedRepos: [
    { name: 'GESTURE-BASED-CURSOR', lang: 'Python', stars: 0, url: 'https://github.com/Manju4599/GESTURE-BASED-CURSOR' },
    { name: 'Hospital-resource-alert-and-management', lang: 'Python', stars: 0, url: 'https://github.com/Manju4599/Hospital-resource-alert-and-management' },
    { name: 'Data-Pure', lang: 'Python', stars: 0, url: 'https://github.com/Manju4599/Data-Pure' },
    { name: 'Enterprise-Job-Scheduler', lang: 'Python', stars: 0, url: 'https://github.com/Manju4599/Enterprise-Job-Scheduler' },
    { name: 'Tour-Assist', lang: 'JavaScript', stars: 0, url: 'https://github.com/Manju4599/Tour-Assist' },
    { name: 'SIMPLE-MAZE-SOLVER', lang: 'Python', stars: 0, url: 'https://github.com/Manju4599/SIMPLE-MAZE-SOLVER' },
  ],
  languages: [
    { name: 'Python', percentage: 72 },
    { name: 'JavaScript', percentage: 16 },
    { name: 'TypeScript', percentage: 7 },
    { name: 'Java', percentage: 3 },
    { name: 'Other', percentage: 2 },
  ],
};

export const THINKING_PROCESS = [
  { step: '01', label: 'Define the problem', desc: 'Understand constraints before touching code. What\'s the actual question?' },
  { step: '02', label: 'Inspect the data', desc: 'EDA, schema review, quality assessment. Bad assumptions create bad systems.' },
  { step: '03', label: 'Build a baseline', desc: 'Simple solution first. Measure what you have before optimizing.' },
  { step: '04', label: 'Test edge cases', desc: 'Real data is messy. Rate limits, nulls, and unexpected inputs break systems.' },
  { step: '05', label: 'Measure outcomes', desc: 'Quantify improvement. Intuition is a starting point, not validation.' },
  { step: '06', label: 'Integrate & document', desc: 'Code that can\'t be maintained isn\'t finished. Build for the next engineer.' },
];

export const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
