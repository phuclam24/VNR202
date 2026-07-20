import React from 'react';
import { META } from '../data/presentation.js';
import { SmartImage } from './SmartImage.jsx';
import { IMAGES } from '../data/images.js';

export const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero-img-wrap">
      <SmartImage image={IMAGES.hero} alt="Tháp Rùa - Hồ Hoàn Kiếm Hà Nội" />
    </div>
    <div className="hero-content">
      <div className="hero-badge">Lịch sử Đảng Cộng sản Việt Nam</div>
      <h1>{META.title}</h1>
      <p className="hero-sub">{META.subtitle}</p>
      <p className="hero-meta">{META.course}</p>
    </div>
  </section>
);