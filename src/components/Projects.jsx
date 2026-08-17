import { useRef, useState } from 'react';
import { PROJECTS } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import ProjectDetail from './ProjectDetail';
import './Projects.css';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Python', value: 'Python' },
  { label: 'Machine Learning', value: 'Machine Learning' },
  { label: 'Computer Vision', value: 'Computer Vision' },
  { label: 'Data Analytics', value: 'Data Analytics' },
  { label: 'AI', value: 'AI' },
  { label: 'Software Engineering', value: 'Software Engineering' },
];

const STATUS_COLORS = {
  Deployed: '#22c55e',
  Complete: '#60a5fa',
  Prototype: '#f59e0b',
  'In Progress': '#a78bfa',
};

export default function Projects() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(activeFilter));

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="projects__header reveal">
          <span className="section-label">Selected Work</span>
          <h2 className="projects__title">Projects</h2>
          <p className="projects__subtitle text-secondary">
            Systems built across data analytics, machine learning, and backend engineering.
            Each project represents a real problem with a concrete implementation.
          </p>
        </div>

        {/* Filters */}
        <div className="projects__filters reveal reveal-delay-1" role="group" aria-label="Filter projects by technology">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`projects__filter${activeFilter === f.value ? ' projects__filter--active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={activeFilter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {filtered.map((project, index) => (
            <article
              key={project.id}
              className={`project-card reveal reveal-delay-${Math.min(index + 1, 5)}`}
            >
              {/* Card top bar */}
              <div className="project-card__top">
                <div className="project-card__status" style={{ '--status-color': STATUS_COLORS[project.status] || '#6b6560' }}>
                  <span className="project-card__status-dot" aria-hidden="true" />
                  <span>{project.status}</span>
                </div>
                <div className="project-card__links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card__icon-link" aria-label="Live demo">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__icon-link" aria-label="GitHub repository">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="project-card__tags" aria-label="Technologies">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
                {project.tags.length > 4 && (
                  <span className="tag tag--more">+{project.tags.length - 4}</span>
                )}
              </div>

              {/* Title */}
              <h3 className="project-card__title">{project.shortTitle}</h3>
              <p className="project-card__summary">{project.summary}</p>

              {/* CTA */}
              <button
                className="project-card__cta"
                onClick={() => setSelectedProject(project)}
                aria-haspopup="dialog"
                aria-label={`View case study: ${project.title}`}
              >
                Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Project detail modal/panel */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
