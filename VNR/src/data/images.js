// Danh sách ảnh dùng trong bài thuyết trình
// Ảnh đặt tại /public/images/ và được tham chiếu qua đường dẫn tương đối (/images/...)
// -> an toàn khi deploy lên Vercel, không phụ thuộc mạng hay CDN bên ngoài.

export const IMAGES = {
  hero: {
    id: 'hero',
    src: '/images/hero.jpg',
    title: 'Tháp Rùa, Hồ Hoàn Kiếm, Hà Nội',
  },

  // PHẦN 1 - Bối cảnh: Bến Nhà Rồng - nơi Bác Hồ ra đi tìm đường cứu nước
  ben_nha_rong: {
    id: 'ben_nha_rong',
    src: '/images/ben-nha-rong.jpg',
    title: 'Bến Nhà Rồng, TP. Hồ Chí Minh',
  },

  // PHẦN 2 - Hội nhập quốc tế: Trụ sở WTO Geneva - biểu tượng đa phương
  wto_geneva: {
    id: 'wto_geneva',
    src: '/images/wto-geneva.jpg',
    title: 'Trụ sở WTO tại Geneva, Thụy Sĩ',
  },

  // PHẦN 3 - Nội lực: Khu công nghệ cao Hòa Lạc - Công nghiệp hóa, hiện đại hóa
  sapa_terraces: {
    id: 'sapa_terraces',
    src: '/images/hoa-lac-hitech.jpg',
    title: 'Khu công nghệ cao Hòa Lạc, Hà Nội',
  },

  // PHẦN 4 - Vị thế: Saigon skyline đêm - thành phố hiện đại
  saigon_skyline: {
    id: 'saigon_skyline',
    src: '/images/saigon-skyline.jpg',
    title: 'Skyline TP. Hồ Chí Minh về đêm',
  },

  // PHẦN 5 - Bài học: Cờ đỏ sao vàng - giữ vững bản sắc
  vietnam_flag: {
    id: 'vietnam_flag',
    src: '/images/vietnam-flag.jpg',
    title: 'Quốc kỳ Việt Nam',
  },
};
