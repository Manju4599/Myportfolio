import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolio';
import './Hero.css';

const PIPELINE_STEPS = [
  { id: 'raw', label: 'Raw Data', detail: 'CSV · SQL · Logs · APIs' },
  { id: 'clean', label: 'Clean & Structure', detail: 'Pandas · EDA · NumPy' },
  { id: 'model', label: 'Model / Analyze', detail: 'ML · Statistics · SQL' },
  { id: 'system', label: 'Build Systems', detail: 'FastAPI · Flask · Automation' },
  { id: 'insight', label: 'Deliver Insight', detail: 'Dashboards · APIs · Decisions' },
];

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 1800);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStepClick = (index) => {
    clearInterval(intervalRef.current);
    setAnimating(true);
    setActiveStep(index);
    setTimeout(() => setAnimating(false), 300);
    startAutoPlay();
  };

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="container hero__container">
        {/* Left: Text content */}
        <div className="hero__content">
          <div className="hero__eyebrow font-mono">
            <span className="hero__dot" aria-hidden="true" />
            Available for opportunities · 2026
          </div>

          <h1 className="hero__name">
            Manjunath<br />
            <span className="hero__name-accent">R</span>
          </h1>

          <p className="hero__title">
            Data Analyst &amp; Python Developer
          </p>

          <p className="hero__intro">
            I work across Python, SQL, machine learning, and system design
            to build things that process data and make decisions.
            Currently completing my B.Tech in Computer Science
            with a specialization in Big Data Analytics.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary" onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Projects
            </a>
            <a href={PROFILE.github} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
              GitHub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href={PROFILE.resumeUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Resume ↓
            </a>
          </div>

          <div className="hero__meta">
            <span>{PROFILE.location}</span>
            <span className="hero__meta-sep" aria-hidden="true" />
            <a href={`mailto:${PROFILE.email}`} className="hero__email">{PROFILE.email}</a>
          </div>
        </div>

        {/* Right: Interactive pipeline diagram */}
        <div className="hero__visual" aria-label="Work pipeline diagram">
          <div className="pipeline" role="presentation">
            <div className="pipeline__label font-mono">How I work</div>
            <div className="pipeline__steps">
              {PIPELINE_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  className={`pipeline__step${activeStep === index ? ' pipeline__step--active' : ''}${index < activeStep ? ' pipeline__step--done' : ''}`}
                  onClick={() => handleStepClick(index)}
                  aria-pressed={activeStep === index}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                >
                  <div className="pipeline__step-indicator">
                    <span className="pipeline__step-num">{String(index + 1).padStart(2, '0')}</span>
                    {index < PIPELINE_STEPS.length - 1 && (
                      <div className="pipeline__connector" aria-hidden="true">
                        <div className={`pipeline__connector-fill${activeStep > index ? ' pipeline__connector-fill--active' : ''}`} />
                      </div>
                    )}
                  </div>
                  <div className="pipeline__step-content">
                    <span className="pipeline__step-label">{step.label}</span>
                    <span className={`pipeline__step-detail${activeStep === index ? ' pipeline__step-detail--visible' : ''}`}>
                      {step.detail}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Active step callout */}
            <div className={`pipeline__callout${animating ? ' pipeline__callout--animating' : ''}`} aria-live="polite">
              <span className="pipeline__callout-step font-mono">Step {activeStep + 1} / {PIPELINE_STEPS.length}</span>
              <span className="pipeline__callout-name">{PIPELINE_STEPS[activeStep].label}</span>
              <span className="pipeline__callout-detail text-secondary">{PIPELINE_STEPS[activeStep].detail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="font-mono">scroll</span>
      </div>
    </section>
  );
}
