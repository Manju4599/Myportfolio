import { useRef } from 'react';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Experience.css';

export default function Experience() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section className="section experience" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <span className="section-label">Professional Background</span>
          <h2 className="experience__title">Experience &amp; Education</h2>
        </div>

        <div className="experience__layout">
          {/* Left: Work experience */}
          <div className="experience__col reveal reveal-delay-1">
            <h3 className="experience__col-title font-mono">Work</h3>

            {EXPERIENCE.map((exp, index) => (
              <article key={index} className="exp-item">
                <div className="exp-item__timeline">
                  <div className="exp-item__dot" aria-hidden="true" />
                  {index < EXPERIENCE.length - 1 && (
                    <div className="exp-item__line" aria-hidden="true" />
                  )}
                </div>
                <div className="exp-item__content">
                  <div className="exp-item__header">
                    <div>
                      <h4 className="exp-item__role">{exp.role}</h4>
                      <p className="exp-item__company">{exp.company}</p>
                    </div>
                    <div className="exp-item__meta">
                      <span className="exp-item__type tag">{exp.type}</span>
                      <time className="exp-item__period font-mono">{exp.period}</time>
                    </div>
                  </div>

                  <ul className="exp-item__responsibilities">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>

                  <div className="exp-item__skills">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right: Education + Certifications */}
          <div className="experience__right reveal reveal-delay-2">
            <h3 className="experience__col-title font-mono">Education</h3>

            {EDUCATION.map((edu, index) => (
              <div key={index} className="edu-item">
                <div className="edu-item__institution">{edu.institution}</div>
                <div className="edu-item__degree">{edu.degree}</div>
                <div className="edu-item__spec">{edu.specialization}</div>
                <div className="edu-item__footer">
                  <time className="font-mono edu-item__period">{edu.period}</time>
                  <div className="edu-item__gpa">
                    <span className="edu-item__gpa-label font-mono">GPA</span>
                    <span className="edu-item__gpa-value">{edu.gpa}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div className="certs">
              <h3 className="experience__col-title font-mono" style={{ marginTop: 'var(--space-10)' }}>
                Certifications
              </h3>
              <div className="certs__list">
                {CERTIFICATIONS.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <div className="cert-item__icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="cert-item__content">
                      <span className="cert-item__name">{cert.name}</span>
                      <span className="cert-item__issuer text-secondary">{cert.issuer} · {cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
