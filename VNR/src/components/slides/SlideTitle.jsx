import React from 'react';
import { PRESENTATION } from '../../data/presentation.js';

export const SlideTitle = () => (
  <div className="slide title active">
    <div className="title-decor" />
    <div className="title-frame" />
    <div className="title-content">
      <div className="title-emblem">★</div>
      <div className="title-badge">Lịch sử Đảng Cộng sản Việt Nam</div>
      <h1 className="title-main">{PRESENTATION.title}</h1>
      <div className="title-divider">
        <span className="line" />
        <span className="dot" />
        <span className="line" />
      </div>
      <p className="title-sub">{PRESENTATION.group}</p>
      <p className="title-meta">{PRESENTATION.slides[0].meta}</p>

      <div className="title-members">
        {PRESENTATION.members.map((m) => (
          <div key={m.id} className="member-chip">
            <div className="name">{m.name}</div>
            <div className="role">{m.role}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);