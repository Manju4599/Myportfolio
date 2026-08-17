import { useEffect, useCallback } from 'react';
import './ProjectDetail.css';

export default function ProjectDetail({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const {
    title, status, github, demo,
    tags, problem, whyItMatters, approach,
    architecture, decisions, outcomes, outcomesNote,
    challenges, techStack,
  } = project;

  return (
    <div
      className="detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${title}`}
      onClick={handleBackdropClick}
    >
      <div className="detail-panel">
        {/* Header */}
        <div className="detail-header">
          <div className="detail-header__top">
            <div className="detail-header__status-row">
              {status && <span className="detail-status">{status}</span>}
              <div className="detail-links">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                    GitHub
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                    Live Demo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <button className="detail-close" onClick={onClose} aria-label="Close case study">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h2 className="detail-title">{title}</h2>

          {/* Tags */}
          <div className="detail-tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="detail-content">

          {/* Problem */}
          <section className="detail-section">
            <h3 className="detail-section-title">
              <span className="detail-section-num font-mono">01</span>
              Problem
            </h3>
            <p className="detail-text">{problem}</p>
          </section>

          {/* Why it matters */}
          {whyItMatters && (
            <section className="detail-section">
              <h3 className="detail-section-title">
                <span className="detail-section-num font-mono">02</span>
                Why it matters
              </h3>
              <p className="detail-text">{whyItMatters}</p>
            </section>
          )}

          {/* Approach */}
          <section className="detail-section">
            <h3 className="detail-section-title">
              <span className="detail-section-num font-mono">03</span>
              Approach
            </h3>
            <p className="detail-text">{approach}</p>
          </section>

          {/* Architecture */}
          {architecture && architecture.length > 0 && (
            <section className="detail-section">
              <h3 className="detail-section-title">
                <span className="detail-section-num font-mono">04</span>
                Architecture
              </h3>
              <div className="arch-flow">
                {architecture.map((item, index) => (
                  <div key={index} className="arch-step">
                    <div className="arch-step__node">
                      <span className="arch-step__label">{item.step}</span>
                    </div>
                    <p className="arch-step__desc">{item.desc}</p>
                    {index < architecture.length - 1 && (
                      <div className="arch-step__arrow" aria-hidden="true">↓</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech stack */}
          {techStack && (
            <section className="detail-section">
              <h3 className="detail-section-title">
                <span className="detail-section-num font-mono">05</span>
                Technologies
              </h3>
              <div className="tech-stack">
                {Object.entries(techStack).map(([layer, items]) => (
                  <div key={layer} className="tech-stack__group">
                    <span className="tech-stack__layer font-mono">{layer}</span>
                    <div className="tech-stack__items">
                      {items.map((item) => (
                        <span key={item} className="tag">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Decisions */}
          {decisions && decisions.length > 0 && (
            <section className="detail-section">
              <h3 className="detail-section-title">
                <span className="detail-section-num font-mono">06</span>
                Engineering Decisions
              </h3>
              <ul className="detail-list">
                {decisions.map((d, i) => (
                  <li key={i} className="detail-list-item">{d}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {outcomes && outcomes.length > 0 && (
            <section className="detail-section">
              <h3 className="detail-section-title">
                <span className="detail-section-num font-mono">07</span>
                Outcomes
              </h3>
              <ul className="detail-list detail-list--outcomes">
                {outcomes.map((o, i) => (
                  <li key={i} className="detail-list-item">{o}</li>
                ))}
              </ul>
              {outcomesNote && (
                <p className="detail-note">{outcomesNote}</p>
              )}
            </section>
          )}

          {/* Challenges */}
          {challenges && challenges.length > 0 && (
            <section className="detail-section">
              <h3 className="detail-section-title">
                <span className="detail-section-num font-mono">08</span>
                Challenges
              </h3>
              <ul className="detail-list">
                {challenges.map((c, i) => (
                  <li key={i} className="detail-list-item">{c}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
