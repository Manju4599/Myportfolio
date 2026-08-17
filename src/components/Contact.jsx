import { useRef } from 'react';
import { PROFILE } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__inner reveal">
          <div className="contact__header">
            <span className="section-label">Let's Talk</span>
            <h2 className="contact__title">
              Have a problem<br />
              worth solving?
            </h2>
            <p className="contact__subtitle text-secondary">
              I'm actively looking for roles in data analytics, Python development,
              and ML engineering. If you're working on something that involves data,
              systems, or applied intelligence — let's have a conversation.
            </p>
          </div>

          <div className="contact__channels">
            {/* Email */}
            <a href={`mailto:${PROFILE.email}`} className="contact-channel">
              <div className="contact-channel__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="contact-channel__content">
                <span className="contact-channel__label font-mono">Email</span>
                <span className="contact-channel__value">{PROFILE.email}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-channel__arrow" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="contact-channel">
              <div className="contact-channel__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="contact-channel__content">
                <span className="contact-channel__label font-mono">LinkedIn</span>
                <span className="contact-channel__value">Manjunath R</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-channel__arrow" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            {/* GitHub */}
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="contact-channel">
              <div className="contact-channel__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <div className="contact-channel__content">
                <span className="contact-channel__label font-mono">GitHub</span>
                <span className="contact-channel__value">@Manju4599</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-channel__arrow" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          {/* Resume download CTA */}
          <div className="contact__resume">
            <div className="contact__resume-text">
              <h3 className="contact__resume-title">Download Resume</h3>
              <p className="contact__resume-subtitle text-secondary">
                One-page overview of education, experience, skills, and projects.
              </p>
            </div>
            <a
              href={PROFILE.resumeUrl}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              Resume PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
