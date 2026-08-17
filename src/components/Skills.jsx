import { useRef } from 'react';
import { SKILLS } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Skills.css';

const SKILL_GROUPS = [
  {
    id: 'programming',
    title: 'Programming',
    icon: '{ }',
    description: 'Core languages I build in',
    skills: SKILLS.programming,
  },
  {
    id: 'dataAnalytics',
    title: 'Data & Analytics',
    icon: '∑',
    description: 'Turning raw data into usable structure',
    skills: SKILLS.dataAnalytics,
  },
  {
    id: 'mlAi',
    title: 'ML & AI',
    icon: '⊗',
    description: 'Building models and integrating intelligence',
    skills: SKILLS.mlAi,
  },
  {
    id: 'coreCs',
    title: 'Core CS',
    icon: '◻',
    description: 'Foundations that transfer across every layer',
    skills: SKILLS.coreCs,
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    icon: '⌬',
    description: 'Frameworks and environment',
    skills: SKILLS.tools,
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section className="section skills" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <span className="section-label">Technical Profile</span>
          <h2 className="skills__title">Skills &amp; Capabilities</h2>
          <p className="skills__subtitle text-secondary">
            Organized by domain — not just a flat list of technology names.
          </p>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <div
              key={group.id}
              className={`skill-group reveal reveal-delay-${Math.min(groupIndex + 1, 5)}`}
            >
              <div className="skill-group__header">
                <span className="skill-group__icon font-mono" aria-hidden="true">{group.icon}</span>
                <div>
                  <h3 className="skill-group__title">{group.title}</h3>
                  <p className="skill-group__desc">{group.description}</p>
                </div>
              </div>
              <div className="skill-group__items">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`skill-item${skill.level === 'primary' ? ' skill-item--primary' : ''}`}
                  >
                    <span className="skill-item__name">{skill.name}</span>
                    <span className="skill-item__level" aria-label={skill.level}>
                      {skill.level === 'primary' ? 'Core' : 'Applied'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How I think */}
        <div className="skills__note reveal">
          <div className="skills__note-inner">
            <span className="font-mono text-secondary" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              A note on depth
            </span>
            <p className="skills__note-text">
              The distinction between <em>Core</em> and <em>Applied</em> matters.
              Core skills are used daily and across multiple projects.
              Applied skills are functional — used when the problem calls for them.
              No skill on this list is there for decoration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
