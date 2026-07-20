import React from 'react';

// Sidebar cố định bên trái với anchor menu cho 5 phần + trang nguồn ảnh
import { META, PARTS } from '../data/presentation.js';
import { IconGlobe, IconCompass, IconChart, IconStar, IconShield, IconPeople } from './Icons.jsx';

const ICONS_BY_PART = {
  1: IconCompass,
  2: IconGlobe,
  3: IconChart,
  4: IconStar,
  5: IconShield,
};

export const Sidebar = () => {
  const partIds = Object.keys(PARTS).map(Number).sort();
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-emblem">★</div>
        <div className="brand-title">Đảng lãnh đạo Việt Nam<br />hội nhập và phát triển</div>
        <div className="brand-sub">{META.course}</div>
      </div>

      <div className="nav-section">Nội dung</div>
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#hero"><span className="nav-item-num">★</span><span className="nav-item-meta">Mở đầu</span></a>
        </li>
        {partIds.map((id) => {
          const p = PARTS[id];
          return (
            <li key={id} className="nav-item">
              <a href={`#${p.anchor}`}>
                <span className="nav-item-num">{p.number}</span>
                <span className="nav-item-meta">
                  <span>{p.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-foot">
        <strong>Bài thuyết trình</strong><br />
        Môn Lịch sử Đảng CSVN · Chương 3, II (3–5)
      </div>
    </aside>
  );
};