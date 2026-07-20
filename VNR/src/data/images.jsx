// =============================================================
// DANH SÁCH ẢNH SỬ DỤNG - NGUỒN GỐC RÕ RÀNG
// Tất cả ảnh đều từ Wikimedia Commons (CC BY / CC BY-SA)
// hoặc Unsplash (miễn phí thương mại - không yêu cầu attribution
// nhưng ta vẫn ghi credit để minh bạch)
// Mỗi ảnh có id để dùng làm key, url, attribution, license
// =============================================================

export const IMAGES = {
  hero: {
    id: 'hero',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Thap_Rua_%28Tottoise%29_Tower%2C_Hoan_Kiem_Lake%2C_Hanoi_%281%29_%2838442367376%29.jpg/1600px-Thap_Rua_%28Tottoise%29_Tower%2C_Hoan_Kiem_Lake%2C_Hanoi_%281%29_%2838442367376%29.jpg',
    fallback: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80&auto=format&fit=crop',
    title: 'Tháp Rùa, Hồ Hoàn Kiếm, Hà Nội',
    credit: 'Ảnh: Prof_richard — Flickr / Wikimedia Commons',
    license: 'CC BY 2.0',
    url: 'https://commons.wikimedia.org/wiki/File:Thap_Rua_(Tottoise)_Tower,_Hoan_Kiem_Lake,_Hanoi_(1)_(38442367376).jpg',
  },

  ben_nha_rong: {
    id: 'ben_nha_rong',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ben_Nha_Rong_3.JPG/1280px-Ben_Nha_Rong_3.JPG',
    fallback: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80&auto=format&fit=crop',
    title: 'Bến Nhà Rồng, TP. Hồ Chí Minh',
    credit: 'Ảnh: Eternal Dragon — Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Ben_Nha_Rong_3.JPG',
  },

  hanoi_skyline: {
    id: 'hanoi_skyline',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hanoi_skyline_at_night.jpg/1280px-Hanoi_skyline_at_night.jpg',
    fallback: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&q=80&auto=format&fit=crop',
    title: 'Hà Nội skyline về đêm',
    credit: 'Ảnh: Ntml4507 — Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Hanoi_skyline_at_night.jpg',
  },

  ha_long_bay: {
    id: 'ha_long_bay',
    src: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80&auto=format&fit=crop',
    title: 'Vịnh Hạ Long — biểu tượng Việt Nam',
    credit: 'Ảnh minh họa: Unsplash (miễn phí thương mại)',
    license: 'Unsplash License',
    url: 'https://unsplash.com/s/photos/halong-bay',
  },

  vietnam_flag: {
    id: 'vietnam_flag',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png',
    title: 'Quốc kỳ Việt Nam',
    credit: 'Ảnh: Wikimedia Commons (Public domain)',
    license: 'Public Domain',
    url: 'https://commons.wikimedia.org/wiki/File:Flag_of_Vietnam.svg',
  },

  meeting_hall: {
    id: 'meeting_hall',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80&auto=format&fit=crop',
    title: 'Hội nghị quốc tế',
    credit: 'Ảnh minh họa: Unsplash (miễn phí thương mại)',
    license: 'Unsplash License',
    url: 'https://unsplash.com',
  },

  port_trade: {
    id: 'port_trade',
    src: 'https://images.unsplash.com/photo-1577042906081-7d7e0e64fe2e?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1577042906081-7d7e0e64fe2e?w=1600&q=80&auto=format&fit=crop',
    title: 'Cảng biển / thương mại quốc tế',
    credit: 'Ảnh minh họa: Unsplash (miễn phí thương mại)',
    license: 'Unsplash License',
    url: 'https://unsplash.com',
  },

  un_headquarters: {
    id: 'un_headquarters',
    src: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=80&auto=format&fit=crop',
    title: 'Trụ sở Liên Hợp Quốc',
    credit: 'Ảnh minh họa: Unsplash (miễn phí thương mại)',
    license: 'Unsplash License',
    url: 'https://unsplash.com',
  },

  rice_field: {
    id: 'rice_field',
    src: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=1600&q=80&auto=format&fit=crop',
    title: 'Nông nghiệp Việt Nam',
    credit: 'Ảnh minh họa: Unsplash (miễn phí thương mại)',
    license: 'Unsplash License',
    url: 'https://unsplash.com',
  },

  construction: {
    id: 'construction',
    src: 'https://images.unsplash.com/photo-1590069261209-f19e833707cd?w=1600&q=80&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1590069261209-f19e833707cd?w=1600&q=80&auto=format&fit=crop',
    title: 'Hạ tầng — một trong 3 đột phá chiến lược',
    credit: 'Ảnh minh họa: Unsplash (miễn phí thương mại)',
    license: 'Unsplash License',
    url: 'https://unsplash.com',
  },
};

// Component <SmartImage>: thử load src, nếu fail thì dùng fallback
// SỬ DỤNG: <SmartImage image={IMAGES.ben_nha_rong} alt="..." />
import React, { useState } from 'react';

export const SmartImage = ({ image, alt = '', className = '', style }) => {
  const [error, setError] = useState(false);
  const src = error ? image.fallback : image.src;

  return (
    <figure className={`smart-img-wrap ${className}`} style={style}>
      <img
        src={src}
        alt={alt || image.title}
        loading="lazy"
        onError={() => setError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {(image.credit || image.license) && (
        <figcaption className="smart-img-caption">
          {image.credit}
          {image.license && <span className="license-tag"> · {image.license}</span>}
        </figcaption>
      )}
    </figure>
  );
};