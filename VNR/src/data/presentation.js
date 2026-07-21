// =============================================================
// NỘI DUNG BÀI THUYẾT TRÌNH - LỊCH SỬ ĐẢNG CSVN
// Đảng lãnh đạo Việt Nam hội nhập và phát triển (2001 – nay)
// =============================================================

export const META = {
  title: 'Đảng lãnh đạo Việt Nam hội nhập và phát triển từ 2001 đến nay',
  subtitle: 'Chương 3 – Đảng lãnh đạo công cuộc đổi mới và hội nhập quốc tế',
  group: 'Bài thuyết trình môn Lịch sử Đảng Cộng sản Việt Nam',
  course: 'Giai đoạn 2001 – nay · Lãnh đạo công cuộc đổi mới, đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế',
};

// =============================================================
// PHẦN 1 - BỐI CẢNH XUẤT PHÁT ĐIỂM
// =============================================================
export const PART_1 = {
  id: 1,
  number: '01',
  anchor: 'phan-1',
  label: 'Bối cảnh xuất phát điểm',
  title: 'Từ quốc gia thấp kém, bị bao vây cấm vận',
  lead: 'Để hiểu được ý nghĩa của những thành tựu hội nhập sau năm 2001, cần phải nhìn lại xuất phát điểm của nước ta.',
  blocks: [
    {
      kind: 'text',
      heading: 'Trước Đổi mới (1986)',
      body: 'Việt Nam xây dựng đất nước từ một nền kinh tế nghèo nàn, lạc hậu, sản xuất nhỏ là phổ biến, lại gánh chịu hậu quả nặng nề của chiến tranh và bị bao vây, cấm vận trong nhiều năm.',
    },
    {
      kind: 'text',
      heading: 'Khi bước vào hội nhập kinh tế quốc tế',
      body: 'Nước ta vẫn đứng trước những thách thức lớn về chênh lệch trình độ phát triển so với khu vực và thế giới, chịu sức ép cạnh tranh gay gắt.',
    },
    {
      kind: 'quote',
      text: 'Hiểu bối cảnh đó, ta mới thấy hết giá trị của mỗi bước đi hội nhập mà Đảng và nhân dân ta đã lựa chọn suốt hơn 40 năm qua.',
      source: 'Tinh thần dẫn dắt của phần trình bày',
    },
  ],
  highlight: {
    label: 'Tổng quan',
    text: 'Xuất phát điểm: Nghèo · Lạc hậu · Bị bao vây, cấm vận · Chênh lệch trình độ khu vực',
  },
};

// =============================================================
// PHẦN 2 - QUÁ TRÌNH HỘI NHẬP QUỐC TẾ
// =============================================================
export const PART_2 = {
  id: 2,
  number: '02',
  anchor: 'phan-2',
  label: 'Quá trình hội nhập quốc tế',
  title: 'Từ bình thường hóa đến các FTA thế hệ mới',
  lead: 'Đảng ta đã lãnh đạo quá trình hội nhập theo một lộ trình bài bản, đi từ thấp đến cao, từ khu vực ra toàn cầu.',
  timeline: [
    {
      tag: 'Giai đoạn mở cửa',
      year: 'Trước 2001',
      heading: 'Phá thế bao vây – "thêm bạn, bớt thù"',
      desc: 'Đảng chủ trương "thêm bạn, bớt thù", phá thế bao vây cấm vận. Mốc son là việc gia nhập ASEAN (tháng 7/1995).',
    },
    {
      tag: 'Bước ngoặt',
      year: '2001',
      heading: 'Đại hội IX – Chủ động hội nhập',
      desc: 'Đại hội IX đánh dấu bước ngoặt khi chính thức đề ra chủ trương chủ động hội nhập kinh tế quốc tế.',
    },
    {
      tag: 'Toàn cầu hóa',
      year: '2001 – 2006',
      heading: 'Chuẩn bị thể chế, sửa đổi luật pháp',
      desc: 'Đảng ráo riết chuẩn bị thể chế, sửa đổi luật pháp để tương thích với luật chơi chung — nền tảng đàm phán WTO suốt hơn 10 năm.',
    },
    {
      tag: 'Thành viên thứ 150',
      year: '11/2006',
      heading: 'Gia nhập WTO',
      desc: 'Sau hơn 10 năm đàm phán, Việt Nam chính thức được kết nạp làm thành viên thứ 150 của WTO — đòn bẩy buộc nền kinh tế vận hành minh bạch, tuân thủ chuẩn mực quốc tế.',
    },
    {
      tag: 'FTA thế hệ mới',
      year: '2019 – 2020',
      heading: 'CPTPP & EVFTA',
      desc: 'Tiếp tục tham gia FTA thế hệ mới với tiêu chuẩn rất cao: CPTPP (2019) và EVFTA (2020). Không chỉ giảm thuế quan mà còn cam kết sâu rộng về lao động, môi trường và cải cách doanh nghiệp nhà nước.',
    },
  ],
  highlight: {
    label: 'Lộ trình',
    text: 'ASEAN (1995) → Đại hội IX (2001) → WTO (2006) → CPTPP (2019) → EVFTA (2020)',
  },
};

// =============================================================
// PHẦN 3 - PHÁT TRIỂN NỘI LỰC
// =============================================================
export const PART_3 = {
  id: 3,
  number: '03',
  anchor: 'phan-3',
  label: 'Phát triển nội lực',
  title: 'Thoát nghèo, tăng trưởng GDP và thu hút FDI',
  lead: 'Đảng luôn xác định hội nhập phải đi liền với việc gia tăng sức mạnh nội tại của dân tộc.',
  metric: [
    { value: '2008', label: 'Năm thoát nghèo', detail: 'Việt Nam ra khỏi tình trạng nước nghèo, chính thức bước vào nhóm các quốc gia có thu nhập trung bình.' },
    { value: '101,6 tỷ', label: 'GDP năm 2010 (USD)', detail: 'Quy mô GDP năm 2010 đạt 101,6 tỷ USD — nền tảng cho giai đoạn bứt phá tiếp theo.' },
    { value: '~7%/năm', label: 'Tăng trưởng GDP 2005–2010', detail: 'Tốc độ tăng GDP giai đoạn 2005–2010 đạt khoảng 7%/năm — mức ổn định và bền vững.' },
  ],
  updated: {
    heading: 'Dữ liệu cập nhật (ngoài giáo trình)',
    items: [
      { label: 'GDP năm 2024', value: '~476 tỷ USD' },
      { label: 'Xuất nhập khẩu 2024', value: '~786 tỷ USD' },
      { label: 'Vốn FDI thực hiện 2024', value: '> 25 tỷ USD' },
    ],
  },
  doi_pha: {
    heading: 'Ba đột phá chiến lược (Đại hội XI, 2011)',
    items: [
      {
        num: '01',
        title: 'Hoàn thiện thể chế kinh tế thị trường định hướng XHCN',
        desc: 'Tạo hành lang pháp lý ổn định, minh bạch, thu hút đầu tư trong và ngoài nước.',
      },
      {
        num: '02',
        title: 'Phát triển nhanh nguồn nhân lực',
        desc: 'Đặc biệt chú trọng nhân lực chất lượng cao — yếu tố cốt lõi quyết định năng lực cạnh tranh quốc gia.',
      },
      {
        num: '03',
        title: 'Xây dựng hệ thống kết cấu hạ tầng đồng bộ',
        desc: 'Giao thông, điện, nước, số… làm nền tảng cho phát triển bền vững và kết nối quốc tế.',
      },
    ],
  },
};

// =============================================================
// PHẦN 4 - NÂNG TẦM VỊ THẾ ĐỐI NGOẠI
// =============================================================
export const PART_4 = {
  id: 4,
  number: '04',
  anchor: 'phan-4',
  label: 'Nâng tầm vị thế đối ngoại',
  title: 'Đa phương hóa, đa dạng hóa quan hệ',
  lead: 'Đường lối của Đảng là thực hiện nhất quán chính sách đối ngoại độc lập, tự chủ, đa phương hóa, đa dạng hóa.',
  metric: [
    { value: '230', label: 'Quan hệ thương mại – đầu tư (2010)', detail: 'Đến năm 2010, Việt Nam đã có quan hệ thương mại, đầu tư với 230 nước và vùng lãnh thổ.' },
    { value: '15 + 10', label: 'Đối tác chiến lược & toàn diện (2015)', detail: 'Đến 2015: 15 đối tác chiến lược, 10 đối tác toàn diện — bao gồm tất cả nước lớn là Ủy viên thường trực HĐBA LHQ.' },
    { value: '× 2', label: 'UV HĐBA LHQ', detail: 'Việt Nam 2 lần được bầu làm Ủy viên không thường trực HĐBA LHQ: nhiệm kỳ 2008–2009 và 2020–2021 — minh chứng rõ nét cho vị thế quốc tế ngày càng cao.' },
  ],
  evolution: {
    heading: 'Quá trình nâng tầm quan hệ',
    items: [
      'Từ đối ngoại đơn thuần sang thiết lập khuôn khổ đối tác chiến lược và toàn diện.',
      'Từ "xin – cho" sang đàm phán bình đẳng, cùng có lợi với các đối tác lớn.',
      'Từ bị cô lập trở thành thành viên có trách nhiệm của nhiều cơ chế đa phương.',
    ],
  },
};

// =============================================================
// PHẦN 5 - BÀI HỌC RÚT RA & TỔNG KẾT
// =============================================================
export const PART_5 = {
  id: 5,
  number: '05',
  anchor: 'phan-5',
  label: 'Bài học rút ra',
  title: 'Kết hợp nội – ngoại lực và giữ vững độc lập tự chủ',
  lead: 'Hai bài học cốt lõi mà Đảng ta đã đúc rút từ 24 năm hội nhập và phát triển.',
  lessons: [
    {
      icon: 'balance',
      title: 'Nội lực là quyết định, ngoại lực là quan trọng',
      desc: 'Đảng khẳng định phải gắn khai thác tốt các nguồn lực bên ngoài với việc phát huy tối đa nội lực.',
      detail: 'Nếu không có nội lực (thể chế tốt, nguồn nhân lực giỏi, doanh nghiệp mạnh), hội nhập sẽ dẫn đến nguy cơ lệ thuộc, trở thành "thị trường tiêu thụ" và "gia công" cho nước ngoài.',
    },
    {
      icon: 'shield',
      title: 'Giữ vững độc lập, chủ quyền khi ra biển lớn',
      desc: 'Bài học sống còn được Trung ương Đảng nhấn mạnh: "vào WTO phải giữ vững độc lập, chủ quyền, toàn vẹn lãnh thổ và định hướng xã hội chủ nghĩa".',
      detail: 'Hội nhập kinh tế nhưng không đánh mất bản sắc chính trị, văn hóa và an ninh quốc gia.',
    },
  ],
  closing: {
    heading: 'Lời kết',
    body: 'Từ một quốc gia xuất phát điểm thấp sau chiến tranh, với sự lãnh đạo đúng đắn của Đảng, Việt Nam đã trở thành đối tác quan trọng trên trường quốc tế — vừa phát triển bền vững, vừa giữ vững độc lập tự chủ, định hướng xã hội chủ nghĩa.',
    thanks: 'Cảm ơn thầy cô và các bạn đã lắng nghe. Nhóm rất mong nhận được ý kiến đóng góp.',
  },
};

// =============================================================
// HÀM HỖ TRỢ - lấy phần theo ID
// =============================================================
export const PARTS = {
  1: PART_1,
  2: PART_2,
  3: PART_3,
  4: PART_4,
  5: PART_5,
};

export const getPartById = (id) => PARTS[id];
export const getPartIds = () => Object.keys(PARTS).map(Number).sort((a, b) => a - b);
