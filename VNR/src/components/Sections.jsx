import React from 'react';
import { PARTS } from '../data/presentation.js';
import { SmartImage } from './SmartImage.jsx';
import { IMAGES } from '../data/images.js';

// Mapping ảnh mới - chọn ảnh đẹp, hợp nội dung từng phần
const PART_IMAGES = {
  1: IMAGES.ben_nha_rong,    // Bối cảnh - Bến Nhà Rồng
  2: IMAGES.wto_geneva,      // Hội nhập - Trụ sở WTO
  3: IMAGES.sapa_terraces,   // Nội lực - Ruộng bậc thang Sa Pa
  4: IMAGES.saigon_skyline,  // Vị thế - Saigon skyline đêm
  5: IMAGES.vietnam_flag,    // Bài học - Cờ đỏ sao vàng
};

// ============================
// PHẦN 1 - BỐI CẢNH
// ============================
export const PartSection1 = () => {
  const data = PARTS[1];
  return (
    <section id={data.anchor} className="section">
      <div className="section-eyebrow">
        Phần {data.number} · {data.label}
      </div>
      <h2 className="section-title">{data.title}</h2>
      <p className="section-lead">{data.lead}</p>

      <div className="section-body">
        <div className="section-image-side">
          <div className="col-img">
            <SmartImage image={PART_IMAGES[1]} alt="Bến Nhà Rồng" />
          </div>
          <div>
            {data.blocks.filter(b => b.kind === 'text').map((b, i) => (
              <div key={i} className="text-block" style={{ gridTemplateColumns: '1fr' }}>
                <h3>{b.heading}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="callout">
          <div className="callout-icon">⏳</div>
          <div className="callout-content">
            <div className="callout-label">{data.highlight.label}</div>
            <div className="callout-text">{data.highlight.text}</div>
          </div>
        </div>

        {data.blocks.filter(b => b.kind === 'quote').map((q, i) => (
          <blockquote key={i} className="quote-block">
            <p>{q.text}</p>
            <span className="quote-source">— {q.source}</span>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

// ============================
// PHẦN 2 - HỘI NHẬP
// ============================
export const PartSection2 = () => {
  const data = PARTS[2];
  return (
    <section id={data.anchor} className="section">
      <div className="section-eyebrow">
        Phần {data.number} · {data.label}
      </div>
      <h2 className="section-title">{data.title}</h2>
      <p className="section-lead">{data.lead}</p>

      <div className="section-body">
        <div className="section-image-side" style={{ marginBottom: 36 }}>
          <div>
            <div className="callout" style={{ marginTop: 0, marginBottom: 24 }}>
              <div className="callout-icon">🛤</div>
              <div className="callout-content">
                <div className="callout-label">{data.highlight.label}</div>
                <div className="callout-text">{data.highlight.text}</div>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
              Hành trình này thể hiện sự bài bản, kiên trì của Đảng — đi từ thấp đến cao, từ khu vực ra toàn cầu,
              từ song phương đến đa phương. Đặc biệt từ Đại hội IX (2001), hội nhập trở thành đường lối chiến lược
              chứ không chỉ là giải pháp tình thế.
            </p>
          </div>
          <div className="col-img">
            <SmartImage image={PART_IMAGES[2]} alt="Trụ sở WTO Geneva" />
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--burgundy)', marginBottom: 8, marginTop: 32 }}>
          Cột mốc chi tiết
        </h3>
        <div className="timeline">
          {data.timeline.map((t, i) => (
            <div key={i} className="tl-item">
              <div>
                <span className="tl-tag">{t.tag}</span>
                <span className="tl-year">{t.year}</span>
              </div>
              <div className="tl-heading">{t.heading}</div>
              <div className="tl-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================
// PHẦN 3 - NỘI LỰC
// ============================
export const PartSection3 = () => {
  const data = PARTS[3];
  return (
    <section id={data.anchor} className="section">
      <div className="section-eyebrow">
        Phần {data.number} · {data.label}
      </div>
      <h2 className="section-title">{data.title}</h2>
      <p className="section-lead">{data.lead}</p>

      <div className="section-body">
        <div className="metric-grid">
          {data.metric.map((m, i) => (
            <div key={i} className="metric-card">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-detail">{m.detail}</div>
            </div>
          ))}
        </div>

        <div className="section-image-side" style={{ marginTop: 24 }}>
          <div>
            <div className="callout" style={{ marginTop: 0, marginBottom: 16 }}>
              <div className="callout-icon">📊</div>
              <div className="callout-content">
                <div className="callout-label">Dữ liệu ngoài giáo trình</div>
                <div className="callout-text">
                  Để trả lời câu hỏi <em>"đến nay"</em>, ta phải nhìn những con số thực tế năm 2024 cho thấy quy mô và sức bật của nền kinh tế.
                </div>
              </div>
            </div>
          </div>
          <div className="col-img">
            <SmartImage image={PART_IMAGES[3]} alt="Ruộng bậc thang Sa Pa" />
          </div>
        </div>

        <div className="data-strip">
          <h4>{data.updated.heading}</h4>
          <div className="data-strip-grid">
            {data.updated.items.map((it, i) => (
              <div key={i} className="data-item">
                <div className="data-label">{it.label}</div>
                <div className="data-value">{it.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--burgundy)', marginBottom: 8, marginTop: 48 }}>
          {data.doi_pha.heading}
        </h3>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 24, lineHeight: 1.65 }}>
          Đây là 3 trụ cột chiến lược để phát triển nội lực bền vững — nền tảng giúp Việt Nam không lệ thuộc vào bên ngoài.
        </p>

        <div className="breakthroughs">
          {data.doi_pha.items.map((it, i) => (
            <div key={i} className="bt-card">
              <div className="bt-num">{it.num}</div>
              <div className="bt-title">{it.title}</div>
              <div className="bt-desc">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================
// PHẦN 4 - VỊ THẾ
// ============================
export const PartSection4 = () => {
  const data = PARTS[4];
  return (
    <section id={data.anchor} className="section">
      <div className="section-eyebrow">
        Phần {data.number} · {data.label}
      </div>
      <h2 className="section-title">{data.title}</h2>
      <p className="section-lead">{data.lead}</p>

      <div className="section-body">
        <div className="section-image-side" style={{ marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 16 }}>
              Đường lối đối ngoại của Đảng nhất quán theo nguyên tắc <strong style={{ color: 'var(--burgundy)' }}>độc lập, tự chủ</strong>,
              <strong style={{ color: 'var(--burgundy)' }}> đa phương hóa, đa dạng hóa</strong> — không lệ thuộc vào một cường quốc nào,
              trở thành đối tác tin cậy của tất cả các nước vì hòa bình và phát triển.
            </p>
          </div>
          <div className="col-img">
            <SmartImage image={PART_IMAGES[4]} alt="Saigon skyline đêm" />
          </div>
        </div>

        <div className="metric-grid">
          {data.metric.map((m, i) => (
            <div key={i} className="metric-card">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-detail">{m.detail}</div>
            </div>
          ))}
        </div>

        <div className="evolution">
          <h4>{data.evolution.heading}</h4>
          <ul>
            {data.evolution.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// ============================
// PHẦN 5 - BÀI HỌC + TỔNG KẾT
// ============================
export const PartSection5 = () => {
  const data = PARTS[5];
  return (
    <section id={data.anchor} className="section">
      <div className="section-eyebrow">
        Phần {data.number} · {data.label}
      </div>
      <h2 className="section-title">{data.title}</h2>
      <p className="section-lead">{data.lead}</p>

      <div className="section-body">
        <div className="section-image-side" style={{ marginBottom: 32 }}>
          <div className="col-img">
            <SmartImage image={PART_IMAGES[5]} alt="Quốc kỳ Việt Nam" />
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 16 }}>
              Dù hội nhập sâu rộng đến đâu, Việt Nam vẫn giữ vững <strong style={{ color: 'var(--burgundy)' }}>độc lập, chủ quyền, toàn vẹn lãnh thổ</strong> và
              <strong style={{ color: 'var(--burgundy)' }}> định hướng xã hội chủ nghĩa</strong>. Bản sắc dân tộc là nền tảng, là sức mạnh nội sinh quyết định.
            </p>
          </div>
        </div>

        <div className="lessons-list">
          {data.lessons.map((l, i) => (
            <div key={i} className="lesson-card">
              <div className="lesson-card-head">
                <div className="lesson-icon">
                  {l.icon === 'balance' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18M5 7l7 4 7-4M3 12h4M17 12h4M5 21l2-7M19 21l-2-7" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  )}
                </div>
                <h3>{l.title}</h3>
              </div>
              <div className="desc">{l.desc}</div>
              <div className="detail">{l.detail}</div>
            </div>
          ))}
        </div>

        <div className="closing">
          <div className="closing-icon">★</div>
          <h3>{data.closing.heading}</h3>
          <p className="closing-body">{data.closing.body}</p>
          <div className="closing-thanks">{data.closing.thanks}</div>
        </div>
      </div>
    </section>
  );
};