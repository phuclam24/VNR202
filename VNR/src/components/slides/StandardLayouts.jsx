import React from 'react';
import { IconByName } from '../Icons';

export const SlideThreeTiles = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="tiles-grid">
        {slide.tiles.map((t, i) => (
          <div key={i} className="tile">
            <div className="tile-icon"><IconByName name={t.icon} size={26} /></div>
            <div className="tile-num">0{i + 1}</div>
            <div className="tile-title">{t.title}</div>
            <div className="tile-desc">{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export const SlideTwoColumn = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="two-col">
        {[slide.left, slide.right].map((col, i) => (
          <div key={i} className="col-card">
            <span className="col-tag">{i === 0 ? 'Cột 1' : 'Cột 2'}</span>
            <div className="col-heading">{col.heading}</div>
            {col.sub && <div className="col-sub">{col.sub}</div>}
            <ul className="col-list">
              {col.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </>
);

export const SlideCompare = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="compare-grid">
        {slide.columns.map((c, i) => (
          <React.Fragment key={i}>
            <div className={`compare-card ${c.color === 'accent' ? 'accent' : ''}`}>
              <span className="col-tag">{c.tag}</span>
              <div className="col-heading">{c.heading}</div>
              <ul className="col-list">
                {c.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
            {i === 0 && <div className="compare-arrow">→</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </>
);

export const SlideTimeline = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="timeline">
        {slide.milestones.map((m, i) => (
          <div key={i} className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">{m.year}</div>
            <div className="tl-title">{m.title}</div>
            <div className="tl-desc">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export const SlideRoundedImage = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="rounded-image-layout">
        <div>
          <div className="ri-image">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21V8l9-5 9 5v13" />
              <path d="M9 21V12h6v9" />
              <path d="M3 21h18" />
              <circle cx="12" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <div className="ri-badge">{slide.badge}</div>
          </div>
        </div>
        <div className="ri-points">
          {slide.points.map((p, i) => (
            <div key={i} className="ri-point">
              <div className="ri-point-num">{i + 1}</div>
              <div className="ri-point-content">
                <div className="ri-point-heading">{p.heading}</div>
                <div className="ri-point-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export const SlideHighlightNumber = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="highlight-layout">
        <div className="hl-left">
          <div className="hl-number">{slide.bigNumber}</div>
          <div className="hl-label">{slide.bigLabel}</div>
          <div className="hl-context">{slide.context}</div>
        </div>
        <div className="hl-stats">
          {slide.stats.map((s, i) => (
            <div key={i} className="hl-stat">
              <div className="hl-stat-value">{s.value}</div>
              <div className="hl-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export const SlideSummaryList = ({ slide }) => (
  <>
    <div className="slide-eyebrow">{slide.eyebrow}</div>
    <h2 className="slide-title">{slide.title}</h2>
    <p className="slide-subtitle">{slide.subtitle}</p>
    <div className="slide-body">
      <div className="summary-layout">
        <div className="lessons-list">
          {slide.lessons.map((l, i) => (
            <div key={i} className="lesson-card">
              <div className="lesson-icon"><IconByName name={l.icon} size={26} /></div>
              <div>
                <div className="lesson-num">BÀI HỌC 0{i + 1}</div>
                <div className="lesson-title">{l.title}</div>
                <div className="lesson-desc">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="closing-card">
          <div className="closing-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.5 5 5.5.8-4 3.8 1 5.4-5-2.6-5 2.6 1-5.4-4-3.8 5.5-.8L12 2z" />
            </svg>
          </div>
          <div className="closing-text">{slide.closing}</div>
          <div className="closing-meta">Đảng Cộng sản Việt Nam · 2001 – nay</div>
        </div>
      </div>
    </div>
  </>
);