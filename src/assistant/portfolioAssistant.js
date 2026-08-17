/**
 * Portfolio Assistant — deterministic knowledge base system.
 * No external LLM calls. Answers from structured portfolio data only.
 */

import { PROJECTS, SKILLS, EXPERIENCE, PROFILE, CERTIFICATIONS, EDUCATION } from '../data/portfolio';

// ── Knowledge base queries ──────────────────────────────────────────────────

const KB = {
  projectsByCategory: (category) =>
    PROJECTS.filter((p) =>
      p.category.some((c) => c.toLowerCase().includes(category.toLowerCase()))
    ),

  projectByTitle: (query) =>
    PROJECTS.find(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase())
    ),

  allProjects: () => PROJECTS,

  topProject: () => PROJECTS.find((p) => p.rank === 1),

  projectsByRole: (role) =>
    PROJECTS.filter((p) =>
      p.relevantRoles?.some((r) => r.toLowerCase().includes(role.toLowerCase()))
    ),
};

// ── Intent classification ────────────────────────────────────────────────────

function classify(input) {
  const q = input.toLowerCase();

  if (q.match(/contact|email|reach|hire|linkedin|get in touch/)) return 'contact';
  if (q.match(/resume|cv|download/)) return 'resume';
  if (q.match(/internship|experience|work|eagle|trainee/)) return 'experience';
  if (q.match(/education|degree|gpa|srm|university|college|b\.?tech/)) return 'education';
  if (q.match(/certif/)) return 'certifications';
  if (q.match(/skill|technolog|stack|language|framework|tool/)) return 'skills';
  if (q.match(/python/)) return 'python_projects';
  if (q.match(/machine learning|ml/)) return 'ml_projects';
  if (q.match(/computer vision|opencv|gesture|mediapipe/)) return 'cv_projects';
  if (q.match(/data.{0,10}(analyst|analytics|analysis|clean)/)) return 'data_projects';
  if (q.match(/hospital|healthcare|medical|bed|alert/)) return 'hospital_project';
  if (q.match(/tour|travel|multilin|assist|language detect/)) return 'tourmind_project';
  if (q.match(/cursor|gesture/)) return 'gesture_project';
  if (q.match(/datapure|data pure|clean.{0,10}(data|tool)|flask/)) return 'datapure_project';
  if (q.match(/job.{0,10}scheduler|enterprise/)) return 'scheduler_project';
  if (q.match(/strongest|best|most impressive|main project|flagship/)) return 'best_project';
  if (q.match(/all project|list.{0,10}project|what.{0,10}(build|built|made)/)) return 'all_projects';
  if (q.match(/github|repo|repositor/)) return 'github';
  if (q.match(/who.{0,10}(is|are)|about|intro|yourself|tell me/)) return 'about';
  if (q.match(/deploy|live|demo|production/)) return 'deployed';
  if (q.match(/ai|artificial intelligence|llm|groq|gemini|gpt/)) return 'ai_projects';
  if (q.match(/hello|hi|hey|good/)) return 'greeting';
  if (q.match(/thank|thanks/)) return 'thanks';

  return 'unknown';
}

// ── Response generators ──────────────────────────────────────────────────────

function formatProjectList(projects) {
  return projects.map((p) => `• **${p.shortTitle}** — ${p.summary.split('.')[0]}.`).join('\n');
}

function respond(intent) {
  switch (intent) {
    case 'greeting':
      return `Hi! I'm a portfolio assistant for Manjunath R. I can answer questions about his projects, skills, experience, and education. What would you like to know?`;

    case 'thanks':
      return `You're welcome! Feel free to ask anything else about Manjunath's work.`;

    case 'about':
      return `**Manjunath R** is a Computer Science engineer specializing in Big Data Analytics at SRM Institute of Science and Technology (GPA: ${EDUCATION[0].gpa}). He works across Python, SQL, machine learning, and backend engineering — building systems that process data and make useful decisions.\n\nHis email: ${PROFILE.email}`;

    case 'contact':
      return `You can reach Manjunath at:\n• **Email:** ${PROFILE.email}\n• **LinkedIn:** ${PROFILE.linkedin}\n• **GitHub:** ${PROFILE.github}`;

    case 'resume':
      return `You can download Manjunath's resume from the **Resume** button in the navigation bar, or from the Contact section. It covers his education (B.Tech CSE, Big Data Analytics, GPA 8.98), internship experience, and all major projects.`;

    case 'experience':
      return `Manjunath completed an internship as an **Analyst Trainee — Data Analytics** at **${EXPERIENCE[0].company}** (${EXPERIENCE[0].period}). He performed EDA, data cleaning and transformation using Pandas/NumPy/Matplotlib, built visualizations, and delivered business insights based on client data.`;

    case 'education':
      return `Manjunath is completing a **${EDUCATION[0].degree}** with specialization in **${EDUCATION[0].specialization}** at **${EDUCATION[0].institution}**.\n\n**GPA:** ${EDUCATION[0].gpa}\n**Period:** ${EDUCATION[0].period}`;

    case 'certifications':
      return `Certifications:\n${CERTIFICATIONS.map((c) => `• ${c.name} — ${c.issuer} (${c.year})`).join('\n')}`;

    case 'skills':
      return `Core skills:\n• **Programming:** Python, SQL, Java, JavaScript\n• **Data & Analytics:** Pandas, NumPy, Matplotlib, Power BI, EDA\n• **ML & AI:** Machine Learning, Deep Learning, Computer Vision, OpenCV, MediaPipe, scikit-learn, LLM Integration\n• **CS Fundamentals:** DSA, OOP, REST API Design\n• **Tools:** FastAPI, Flask, MySQL, Git`;

    case 'all_projects':
      return `Manjunath has built ${PROJECTS.length} documented projects:\n\n${formatProjectList(PROJECTS)}`;

    case 'best_project': {
      const p = KB.topProject();
      return `His flagship project is **${p.title}**.\n\n${p.summary}\n\nBuilt with: ${p.tags.slice(0, 5).join(', ')}. GitHub: ${p.github}`;
    }

    case 'hospital_project': {
      const p = KB.projectByTitle('hospital');
      if (!p) return fallback();
      return `**${p.title}**\n\n${p.summary}\n\n**Approach:** ${p.approach.slice(0, 200)}...\n\n**Stack:** ${p.tags.join(', ')}\nGitHub: ${p.github}`;
    }

    case 'tourmind_project': {
      const p = KB.projectByTitle('tourmind');
      if (!p) return fallback();
      return `**${p.title}**\n\n${p.summary}\n\nIt supports 25+ languages using Naïve Bayes language detection + Groq LLM for multilingual responses and vision for landmark analysis.\n\n**Stack:** ${p.tags.join(', ')}\nGitHub: ${p.github}`;
    }

    case 'gesture_project': {
      const p = KB.projectByTitle('gesture');
      if (!p) return fallback();
      return `**${p.title}**\n\n${p.summary}\n\nUses MediaPipe's 21-point hand landmark model + Random Forest classifier for gesture classification.\n\n**Stack:** ${p.tags.join(', ')}\nGitHub: ${p.github}`;
    }

    case 'datapure_project': {
      const p = KB.projectByTitle('datapure');
      if (!p) return fallback();
      return `**${p.title}**\n\n${p.summary}\n\nThis is a **live deployed** app: ${p.demo}\n\n**Stack:** ${p.tags.join(', ')}\nGitHub: ${p.github}`;
    }

    case 'scheduler_project': {
      const p = KB.projectByTitle('scheduler');
      if (!p) return fallback();
      return `**${p.title}**\n\n${p.summary}\n\n**Stack:** ${p.tags.join(', ')}\nGitHub: ${p.github}`;
    }

    case 'python_projects': {
      const ps = KB.projectsByCategory('Python');
      return `Python-based projects:\n\n${formatProjectList(ps)}`;
    }

    case 'ml_projects': {
      const ps = KB.projectsByCategory('Machine Learning');
      return `Machine learning projects:\n\n${formatProjectList(ps)}`;
    }

    case 'cv_projects': {
      const ps = KB.projectsByCategory('Computer Vision');
      return `Computer vision projects:\n\n${formatProjectList(ps)}`;
    }

    case 'data_projects': {
      const ps = KB.projectsByCategory('Data Analytics');
      return `Data analytics projects:\n\n${formatProjectList(ps)}`;
    }

    case 'ai_projects': {
      const ps = KB.projectsByCategory('AI');
      return `AI-integrated projects:\n\n${formatProjectList(ps)}\n\nAll AI integrations use real APIs (Groq LLaMA, Google Gemini) — not simulated.`;
    }

    case 'deployed':
      return `The only publicly deployed project is **DataPure** at https://data-pure.vercel.app/. Other projects (Hospital Alert, TourMind, Gesture Cursor) are functional prototypes run locally.`;

    case 'github':
      return `GitHub: ${PROFILE.github}\n\nManjunath has ${GITHUB_STATS_COUNT} public repositories covering Python backends, ML systems, computer vision, and data tooling.`;

    default:
      return fallback();
  }
}

const GITHUB_STATS_COUNT = 10;

function fallback() {
  return `I can only answer questions about Manjunath's portfolio. Try asking about:\n• His projects (Hospital Alert, TourMind, Gesture Cursor, DataPure)\n• Skills and technologies\n• Education and experience\n• How to contact him`;
}

// ── Main exported function ───────────────────────────────────────────────────

export function askAssistant(input) {
  if (!input || !input.trim()) {
    return 'Please ask a question about Manjunath\'s portfolio.';
  }
  const intent = classify(input.trim());
  return respond(intent);
}
