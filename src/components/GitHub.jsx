import { useRef, useEffect, useState } from 'react';
import { GITHUB_STATS } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './GitHub.css';

const GITHUB_API_BASE = 'https://api.github.com';

export default function GitHub() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  const [repos, setRepos] = useState(GITHUB_STATS.pinnedRepos);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch public repos from GitHub API
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(`${GITHUB_API_BASE}/users/${GITHUB_STATS.username}/repos?sort=updated&per_page=6&type=public`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const mapped = data
            .filter((r) => !r.fork)
            .slice(0, 6)
            .map((r) => ({
              name: r.name,
              description: r.description || '',
              lang: r.language || 'Unknown',
              stars: r.stargazers_count,
              forks: r.forks_count,
              url: r.html_url,
              updatedAt: r.pushed_at,
            }));
          if (mapped.length > 0) {
            setRepos(mapped);
            setApiLoaded(true);
          }
        }
      })
      .catch(() => {
        // Silently fall back to static data
      })
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="section github-section" id="github" ref={sectionRef}>
      <div className="container">
        <div className="github__header reveal">
          <div className="github__header-content">
            <span className="section-label">Open Source</span>
            <h2 className="github__title">GitHub</h2>
            <p className="github__subtitle text-secondary">
              Public repositories showing active work across Python, ML, data tooling, and backend engineering.
            </p>
          </div>
          <a
            href={GITHUB_STATS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline github__profile-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            @{GITHUB_STATS.username}
          </a>
        </div>

        {/* Language distribution */}
        <div className="github__langs reveal reveal-delay-1">
          <span className="github__langs-label font-mono">Language distribution</span>
          <div className="lang-bar" role="img" aria-label="Language distribution bar">
            {GITHUB_STATS.languages.map((lang) => (
              <div
                key={lang.name}
                className="lang-bar__segment"
                style={{ width: `${lang.percentage}%`, '--lang-name': `"${lang.name}"` }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>
          <div className="lang-legend">
            {GITHUB_STATS.languages.map((lang, i) => {
              const LANG_COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280'];
              return (
                <div key={lang.name} className="lang-legend__item">
                  <span className="lang-legend__dot" style={{ background: LANG_COLORS[i] }} aria-hidden="true" />
                  <span>{lang.name}</span>
                  <span className="text-secondary font-mono" style={{ fontSize: '0.72rem' }}>{lang.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Repos grid */}
        <div className="github__repos reveal reveal-delay-2">
          {loading && (
            <div className="github__loading">
              <div className="github__loading-dots" aria-label="Loading repositories">
                <span /><span /><span />
              </div>
            </div>
          )}
          {!loading && repos.map((repo, index) => (
            <a
              key={repo.name || index}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-card__top">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="repo-card__icon" aria-hidden="true">
                  <path d="M3 3h6l2 3H21v13a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" />
                </svg>
                <h3 className="repo-card__name">{repo.name}</h3>
              </div>
              {repo.description && (
                <p className="repo-card__desc">{repo.description.slice(0, 80)}{repo.description.length > 80 ? '...' : ''}</p>
              )}
              <div className="repo-card__meta">
                {repo.lang && repo.lang !== 'Unknown' && (
                  <span className="repo-card__lang">
                    <span className="repo-card__lang-dot" aria-hidden="true" />
                    {repo.lang}
                  </span>
                )}
                {typeof repo.stars === 'number' && (
                  <span className="repo-card__stat" aria-label={`${repo.stars} stars`}>
                    ★ {repo.stars}
                  </span>
                )}
                {repo.updatedAt && (
                  <span className="repo-card__updated text-secondary font-mono">
                    {formatDate(repo.updatedAt)}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        {!apiLoaded && !loading && (
          <p className="github__fallback-note font-mono text-secondary">
            Showing curated repository list · Live data available on <a href={GITHUB_STATS.profileUrl} target="_blank" rel="noopener noreferrer" className="text-accent">GitHub</a>
          </p>
        )}
      </div>
    </section>
  );
}
