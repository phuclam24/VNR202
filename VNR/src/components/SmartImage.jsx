import React, { useState } from 'react';

// SmartImage: <SmartImage image={IMAGES.xxx} />
// - Cố gắng load image.src
// - Nếu fail: hiển thị placeholder gradient + tên ảnh
// - KHÔNG hiển thị caption nguồn (theo yêu cầu user)
export const SmartImage = ({ image, alt = '', className = '', style }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`smart-img-wrap ${className}`} style={style}>
      {!error && (
        <img
          src={image.src}
          alt={alt || image.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
      {(!loaded || error) && (
        <div className="smart-img-placeholder" aria-hidden="true">
          <div className="ph-icon">🖼️</div>
          <div className="ph-text">{image.title}</div>
          <div className="ph-sub">Đang tải ảnh…</div>
        </div>
      )}
    </figure>
  );
};