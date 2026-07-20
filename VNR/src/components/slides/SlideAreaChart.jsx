import React, { useMemo } from 'react';

// Dữ liệu GDP Việt Nam 2010-2024 (tỷ USD, nominal)
// Nguồn tham khảo: World Bank, Tổng cục Thống kê Việt Nam
const GDP_DATA = [
  { year: 2010, value: 101.6 },
  { year: 2011, value: 115.9 },
  { year: 2012, value: 127.4 },
  { year: 2013, value: 137.2 },
  { year: 2014, value: 149.0 },
  { year: 2015, value: 156.6 },
  { year: 2016, value: 168.9 },
  { year: 2017, value: 187.8 },
  { year: 2018, value: 205.3 },
  { year: 2019, value: 222.2 },
  { year: 2020, value: 231.4 },
  { year: 2021, value: 269.3 },
  { year: 2022, value: 318.7 },
  { year: 2023, value: 408.5 },
  { year: 2024, value: 476.0 },
];

export const SlideAreaChart = () => {
  const W = 1000;
  const H = 360;
  const padding = { top: 40, right: 40, bottom: 50, left: 70 };
  const innerW = W - padding.left - padding.right;
  const innerH = H - padding.top - padding.bottom;

  const { points, areaPath, linePath, yTicks, maxY } = useMemo(() => {
    const maxVal = Math.max(...GDP_DATA.map(d => d.value));
    const maxY = Math.ceil(maxVal / 100) * 100 + 50;
    const xStep = innerW / (GDP_DATA.length - 1);

    const points = GDP_DATA.map((d, i) => {
      const x = padding.left + i * xStep;
      const y = padding.top + innerH - (d.value / maxY) * innerH;
      return { x, y, ...d };
    });

    // Path cho area (dưới đường line)
    const areaPath = `M ${points[0].x} ${padding.top + innerH} ` +
      points.map(p => `L ${p.x} ${p.y}`).join(' ') +
      ` L ${points[points.length - 1].x} ${padding.top + innerH} Z`;

    // Path cho line
    const linePath = points.map((p, i) =>
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ');

    // Y-axis ticks
    const yTicks = [];
    for (let i = 0; i <= 5; i++) {
      const val = (maxY / 5) * i;
      const y = padding.top + innerH - (val / maxY) * innerH;
      yTicks.push({ val: Math.round(val), y });
    }

    return { points, areaPath, linePath, yTicks, maxY };
  }, [innerW, innerH]);

  const burgundy = '#541212';
  const burgundySoft = '#7a1f1f';
  const gold = '#B8860B';
  const goldLight = '#d4a843';

  return (
    <>
      <div className="slide-eyebrow">Phần 3 · Thành tựu phát triển kinh tế</div>
      <h2 className="slide-title">GDP tăng gần 5 lần trong 14 năm</h2>
      <p className="slide-subtitle">Tổng sản phẩm quốc nội (GDP) Việt Nam giai đoạn 2010 – 2024 (đơn vị: tỷ USD)</p>
      <div className="slide-body">
        <div className="area-chart-layout">
          <div className="chart-wrap">
            <div className="chart-title-row">
              <div className="chart-title">GDP Việt Nam 2010 – 2024</div>
              <div className="chart-legend">
                <div className="chart-legend-item"><span className="swatch" /> GDP nominal</div>
              </div>
            </div>
            <div className="chart-svg-wrap">
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={burgundy} stopOpacity="0.55" />
                    <stop offset="100%" stopColor={burgundy} stopOpacity="0.04" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={burgundy} />
                    <stop offset="100%" stopColor={burgundySoft} />
                  </linearGradient>
                </defs>

                {/* Y-axis grid + labels */}
                {yTicks.map((t, i) => (
                  <g key={i}>
                    <line
                      x1={padding.left} y1={t.y}
                      x2={W - padding.right} y2={t.y}
                      stroke="rgba(84, 18, 18, 0.08)"
                      strokeWidth="1"
                      strokeDasharray={i === 0 ? '0' : '3 3'}
                    />
                    <text
                      x={padding.left - 10} y={t.y + 4}
                      fill="#8a7a7a"
                      fontSize="11"
                      fontFamily="Be Vietnam Pro"
                      textAnchor="end"
                    >
                      {t.val}
                    </text>
                  </g>
                ))}

                {/* X-axis */}
                <line
                  x1={padding.left} y1={padding.top + innerH}
                  x2={W - padding.right} y2={padding.top + innerH}
                  stroke="rgba(84, 18, 18, 0.25)" strokeWidth="1"
                />

                {/* Area */}
                <path d={areaPath} fill="url(#areaGrad)" />

                {/* Line */}
                <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Data points */}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke={burgundy} strokeWidth="2" />
                  </g>
                ))}

                {/* X-axis labels */}
                {points.map((p, i) => (
                  <text
                    key={i}
                    x={p.x} y={padding.top + innerH + 22}
                    fill="#5a4a4a"
                    fontSize="11"
                    fontFamily="Be Vietnam Pro"
                    fontWeight={i === 0 || i === points.length - 1 ? 700 : 400}
                    textAnchor="middle"
                  >
                    {p.year}
                  </text>
                ))}

                {/* Highlight 2024 */}
                {points.length > 0 && (() => {
                  const last = points[points.length - 1];
                  return (
                    <g>
                      <line x1={last.x} y1={last.y - 6} x2={last.x} y2={padding.top} stroke={gold} strokeWidth="1" strokeDasharray="3 3" />
                      <rect x={last.x - 50} y={last.y - 38} width="100" height="24" rx="3" fill={gold} />
                      <text x={last.x} y={last.y - 22} fill="#fff" fontSize="12" fontWeight="700" fontFamily="Be Vietnam Pro" textAnchor="middle">
                        476 tỷ USD
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Bottom stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 4 }}>
            <div style={{ background: '#fff', border: '1px solid rgba(84,18,18,0.12)', borderLeft: '4px solid #541212', padding: '12px 16px', borderRadius: 4 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: '#541212' }}>101,6 tỷ USD</div>
              <div style={{ fontSize: 12, color: '#5a4a4a' }}>GDP năm 2010 (điểm khởi đầu)</div>
            </div>
            <div style={{ background: '#fff', border: '1px solid rgba(184,134,11,0.35)', borderLeft: '4px solid #B8860B', padding: '12px 16px', borderRadius: 4 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: '#541212' }}>~4,7 lần</div>
              <div style={{ fontSize: 12, color: '#5a4a4a' }}>Mức tăng GDP sau 14 năm</div>
            </div>
            <div style={{ background: '#fff', border: '1px solid rgba(84,18,18,0.12)', borderLeft: '4px solid #541212', padding: '12px 16px', borderRadius: 4 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: '#541212' }}>476 tỷ USD</div>
              <div style={{ fontSize: 12, color: '#5a4a4a' }}>GDP năm 2024 (kỷ lục lịch sử)</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};