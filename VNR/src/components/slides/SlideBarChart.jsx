import React from 'react';

// Dữ liệu Ngoại thương & FDI Việt Nam qua các năm (tỷ USD)
// Nguồn tham khảo: Tổng cục Hải quan, Cục Đầu tư nước ngoài

const EXPORT_IMPORT = [
  { year: '2015', value: 327 },
  { year: '2017', value: 425 },
  { year: '2019', value: 517 },
  { year: '2021', value: 668 },
  { year: '2023', value: 683 },
  { year: '2024', value: 786 },
];

const FDI_REGISTERED = [
  { year: '2015', value: 22.7 },
  { year: '2017', value: 35.9 },
  { year: '2019', value: 38.0 },
  { year: '2021', value: 31.1 },
  { year: '2023', value: 36.6 },
  { year: '2024', value: 38.2 },
];

const BarChart = ({ data, title, sub, unit, max, variant }) => {
  return (
    <div className="bar-chart-card">
      <div className="chart-title">{title}</div>
      <div className="chart-sub">{sub}</div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, gap: 4 }}>
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={i} className="bar-row">
              <div className="bar-label">{d.year}</div>
              <div className="bar-track">
                <div className={`bar-fill ${variant}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="bar-value">{d.value} {unit}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SlideBarChart = () => {
  const maxExport = Math.max(...EXPORT_IMPORT.map(d => d.value));
  const maxFDI = Math.max(...FDI_REGISTERED.map(d => d.value));

  return (
    <>
      <div className="slide-eyebrow">Phần 3 · Năm kỷ lục 2024</div>
      <h2 className="slide-title">Ngoại thương & FDI – bứt phá ngoạn mục</h2>
      <p className="slide-subtitle">Tổng kim ngạch xuất nhập khẩu và vốn FDI đăng ký – đạt đỉnh lịch sử năm 2024</p>
      <div className="slide-body">
        <div className="bar-chart-layout">
          <BarChart
            title="Tổng kim ngạch XNK"
            sub="Xuất nhập khẩu cả năm (tỷ USD)"
            unit="tỷ USD"
            max={maxExport}
            data={EXPORT_IMPORT}
            variant="burgundy"
          />
          <BarChart
            title="Vốn FDI đăng ký"
            sub="Vốn đầu tư trực tiếp nước ngoài đăng ký mới (tỷ USD)"
            unit="tỷ USD"
            max={maxFDI}
            data={FDI_REGISTERED}
            variant="gold"
          />
        </div>

        {/* Bottom takeaway */}
        <div style={{
          marginTop: 14, padding: '14px 22px',
          background: 'linear-gradient(90deg, #541212 0%, #7a1f1f 100%)',
          color: '#FDFBF7', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 18,
          borderLeft: '4px solid #B8860B'
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(184,134,11,0.2)', border: '2px solid #B8860B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Playfair Display', fontWeight: 700, color: '#d4a843', flexShrink: 0
          }}>
            ★
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 15, marginBottom: 2 }}>
              Năm 2024 – Kỷ lục lịch sử
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(253,251,247,0.85)' }}>
              Xuất nhập khẩu vượt <b style={{ color: '#d4a843' }}>786 tỷ USD</b>, FDI đăng ký đạt <b style={{ color: '#d4a843' }}>~38 tỷ USD</b>. Việt Nam nằm trong nhóm 20 nền kinh tế xuất khẩu hàng đầu thế giới.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};