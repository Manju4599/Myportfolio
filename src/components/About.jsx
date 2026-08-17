import { useRef } from 'react';
import { PROFILE, THINKING_PROCESS } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__layout">
          {/* Left: Text */}
          <div className="about__content reveal">
            <span className="section-label">About</span>
            <h2 className="about__title">
              Building systems at the<br />
              intersection of data<br />
              <span className="about__title-accent">and intelligence.</span>
            </h2>

            <div className="about__body">
              <p>
                I'm a Computer Science engineer specializing in Big Data Analytics at
                SRM Institute of Science and Technology (GPA 8.98/10). My work sits at
                the intersection of data engineering, analytical systems, and applied ML.
              </p>
              <p>
                I've built production-grade Python backends (FastAPI, Flask), integrated
                large language model APIs into real applications, applied computer vision
                to human-computer interaction, and shipped a deployed data cleaning tool
                to Vercel. My internship as a Data Analytics Trainee gave me practical
                exposure to EDA, cleaning pipelines, and translating data insights into
                business recommendations.
              </p>
              <p>
                I'm drawn to problems where data is messy, the requirements are ambiguous,
                and the solution requires both analytical thinking and engineering discipline.
                I build things. I measure what I build. Then I improve them.
              </p>
            </div>

            <div className="about__cta-row">
              <a href={PROFILE.resumeUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
              <a href={PROFILE.github} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Right: Thinking process */}
          <div className="about__thinking reveal reveal-delay-2">
            <h3 className="about__thinking-title font-mono">How I approach problems</h3>
            <div className="thinking-steps">
              {THINKING_PROCESS.map((item, index) => (
                <div key={item.step} className="thinking-step">
                  <div className="thinking-step__num font-mono">{item.step}</div>
                  <div className="thinking-step__content">
                    <span className="thinking-step__label">{item.label}</span>
                    <p className="thinking-step__desc">{item.desc}</p>
                  </div>
                  {index < THINKING_PROCESS.length - 1 && (
                    <div className="thinking-step__connector" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
