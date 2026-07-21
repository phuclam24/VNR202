import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =============================================================
// QUESTIONS DATA (phía client — không cần API call)
// =============================================================
export const QUESTIONS = [
  {
    id: 1,
    year: 2001,
    title: 'ĐẠI HỘI IX — Hướng đi lịch sử',
    situation: `Việt Nam sau 15 năm Đổi mới vẫn đứng sau Thái Lan, Malaysia. Một số đại biểu muốn đóng cửa bảo vệ DN trong nước. Số khác muốn mở cửa triệt để.`,
    context: 'Đại hội IX là bước ngoặt — lần đầu Đảng chính thức đề ra chủ trương "chủ động hội nhập kinh tế quốc tế".',
    options: [
      {
        key: 'A',
        text: 'CHỦ ĐỘNG HỘI NHẬP — Mở cửa, ký FTA, thu hút FDI',
        correct: true,
        result: '✓ Chính xác! Đảng đã chọn hội nhập. 11 năm sau, Việt Nam ký 6 FTA, GDP đầu người tăng 4 lần.',
        fact: 'GDP năm 2001: ~32 tỷ USD → GDP 2010: ~115 tỷ USD'
      },
      {
        key: 'B',
        text: 'BẢO HỘ NỘI ĐỊA — Hạn chế DN nước ngoài, ưu tiên trong nước',
        correct: false,
        result: '✗ Không đúng. Thực tế, Đảng đã chọn hội nhập — đây là quyết định cứu cánh cho kinh tế Việt Nam.',
        fact: 'Nếu chọn B, Việt Nam sẽ tụt hậu như Myanmar/Bắc Triều Tiên thập 2000.'
      }
    ]
  },
  {
    id: 2,
    year: 2006,
    title: 'GIA NHẬP WTO — Chuẩn mực quốc tế',
    situation: `Sau hơn 10 năm đàm phán, WTO yêu cầu Việt Nam sửa đổi hàng trăm luật, mở cửa thị trường, giảm thuế quan. Một số người lo ngại mất quyền kiểm soát kinh tế.`,
    context: 'WTO là "bàn tay vô hình" buộc nền kinh tế vận hành minh bạch, chuẩn mực quốc tế.',
    options: [
      {
        key: 'A',
        text: 'CHẤP NHẬN WTO — Sửa luật, mở cửa, tuân thủ chuẩn mực quốc tế',
        correct: true,
        result: '✓ Chính xác! Gia nhập WTO tháng 11/2006 — Việt Nam là thành viên thứ 150. Thuế quan giảm, FDI tăng vọt.',
        fact: 'WTO giúp Việt Nam xuất khẩu tăng 300% trong 10 năm sau đó.'
      },
      {
        key: 'B',
        text: 'TỪ CHỐI WTO — Giữ nguyên hệ thống, không nhượng bộ',
        correct: false,
        result: '✗ Không đúng. Thực tế, Việt Nam đã gia nhập WTO và hưởng lợi rất lớn từ thị trường toàn cầu.',
        fact: 'WTO là "vé thông hành" giúp hàng Việt Nam vào 164 thị trường.'
      }
    ]
  },
  {
    id: 3,
    year: 2011,
    title: 'ĐẠI HỘI XI — Ba đột phá chiến lược',
    situation: `Đảng xác định 3 trụ cột phát triển bền vững. Nguồn lực có hạn — bạn phải ưu tiên 1 trong 3 để đầu tư trọng điểm.`,
    context: 'Đại hội XI đề ra 3 đột phá: (1) Hoàn thiện thể chế, (2) Phát triển nhân lực, (3) Xây dựng hạ tầng.',
    options: [
      {
        key: 'A',
        text: 'HOÀN THIỆN THỂ CHẾ — Luật pháp, cơ chế, môi trường kinh doanh',
        correct: true,
        result: '✓ Đúng! Thể chế là nền tảng — luật doanh nghiệp 2005, luật đầu tư... tạo hành lang cho mọi thứ khác.',
        fact: 'Doing Business Index: Việt Nam tăng từ hạng 104 (2008) lên hạng 70 (2019).'
      },
      {
        key: 'B',
        text: 'HẠ TẦNG TRƯỚC — Giao thông, điện, cầu, đường cao tốc',
        correct: true,
        result: '✓ Đúng! Hạ tầng là xương sống — cao tốc TP.HCM – Cần Thơ, cầu Cần Thơ, sân bay... kết nối kinh tế.',
        fact: 'Hạ tầng giúp giảm chi phí logistics từ 25% xuống 17% GDP.'
      }
    ]
  },
  {
    id: 4,
    year: 2019,
    title: 'CPTPP — FTA thế hệ mới',
    situation: `CPTPP là hiệp định thế hệ mới với tiêu chuẩn rất cao: lao động, môi trường, nhà nước doanh nghiệp. Một số lo ngại Việt Nam khó đáp ứng.`,
    context: 'CPTPP bao gồm 11 nước: Nhật, Canada, Australia, Mexico... GDP chiếm 13% toàn cầu.',
    options: [
      {
        key: 'A',
        text: 'THAM GIA CPTPP — Chấp nhận tiêu chuẩn cao, cạnh tranh bình đẳng',
        correct: true,
        result: '✓ Chính xác! CPTPP giúp hàng Việt Nam vào thị trường 500 triệu dân với thuế 0%. Xuất khẩu sang Canada, Mexico tăng 40%.',
        fact: 'CPTPP giúp Việt Nam đa dạng hóa chuỗi cung ứng, giảm phụ thuộc Trung Quốc.'
      },
      {
        key: 'B',
        text: 'TỪ CHỐI CPTPP — Bảo vệ doanh nghiệp nhà nước, tránh rủi ro',
        correct: false,
        result: '✗ Không đúng. Thực tế, Việt Nam tham gia CPTPP và hưởng lợi rõ rệt từ xuất khẩu.',
        fact: 'CPTPP mở cánh cửa vào thị trường Nhật, Canada, Australia — những thị trường giá trị cao.'
      }
    ]
  },
  {
    id: 5,
    year: 2024,
    title: 'ĐỘC LẬP TỰ CHỦ — Hội nhập mà không mất bản sắc',
    situation: `Việt Nam hội nhập sâu nhưng vẫn giữ định hướng XHCN. Một số nước lớn muốn Việt Nam chọn phe. Việt Nam cần ứng xử thế nào?`,
    context: 'Đảng khẳng định: "Đa phương hóa, đa dạng hóa" — không lệ thuộc một cường quốc nào.',
    options: [
      {
        key: 'A',
        text: 'GIỮ VỮNG ĐỘC LẬP — Đa phương hóa, đối tác với tất cả, không chọn phe',
        correct: true,
        result: '✓ Chính xác! Việt Nam có 15 đối tác chiến lược, 10 đối tác toàn diện — từ Mỹ, Nga, Trung Quốc, Nhật, EU. Không phe phái.',
        fact: 'Việt Nam 2 lần UV HĐBA LHQ (2008-2009, 2020-2021) — minh chứng vị thế quốc tế.'
      },
      {
        key: 'B',
        text: 'NGHIÊNG VỀ MỘT CƯỜNG QUỐC — An toàn hơn khi có đồng minh mạnh',
        correct: false,
        result: '✗ Không đúng. Thực tế, Việt Nam giữ đường lối độc lập — đa phương hóa, đa dạng hóa. Đây là sức mạnh chiến lược.',
        fact: 'Lệ thuộc một cường quốc → mất quyền tự quyết. Việt Nam không bao giờ chọn phe.'
      }
    ]
  }
];

// =============================================================
// GAME ACTIONS — Tất cả thao tác qua Supabase
// =============================================================

// Tạo phòng mới
export async function createGame() {
  const { data, error } = await supabase
    .from('games')
    .insert([{}])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Tham gia phòng
export async function joinGame(gameCode, playerName) {
  // Tìm game theo code
  const { data: game, error: gameErr } = await supabase
    .from('games')
    .select('*')
    .eq('game_code', gameCode)
    .single();

  if (gameErr || !game) throw new Error('Phòng không tồn tại');
  if (game.phase === 'FINISHED') throw new Error('Game đã kết thúc');

  // Tạo player
  const { data: player, error: playerErr } = await supabase
    .from('players')
    .insert([{ game_id: game.id, player_name: playerName }])
    .select()
    .single();

  if (playerErr) {
    if (playerErr.code === '23505') throw new Error('Tên đã được sử dụng trong phòng này');
    throw playerErr;
  }

  return { game, player };
}

// Host: Bắt đầu game
export async function startGame(gameId) {
  const { error } = await supabase
    .from('games')
    .update({ phase: 'PLAYING', current_question: 0 })
    .eq('id', gameId);
  if (error) throw error;
}

// Host: Next question
export async function nextQuestion(gameId) {
  // Lấy game hiện tại
  const { data: game, error: gErr } = await supabase
    .from('games')
    .select('current_question')
    .eq('id', gameId)
    .single();

  if (gErr || !game) throw new Error('Không tìm thấy game');

  const nextQ = game.current_question + 1;
  if (nextQ >= QUESTIONS.length) {
    // Kết thúc
    await supabase.from('games').update({ phase: 'FINISHED', ended_at: new Date().toISOString() }).eq('id', gameId);
    return { finished: true };
  }

  const { error } = await supabase
    .from('games')
    .update({ current_question: nextQ })
    .eq('id', gameId);
  if (error) throw error;
  return { finished: false, questionIndex: nextQ };
}

// Host: Kết thúc game
export async function endGame(gameId) {
  const { data: players } = await supabase
    .from('players')
    .select('player_name, score, correct_count, total_count')
    .eq('game_id', gameId);

  // Cập nhật leaderboard
  for (const p of (players || [])) {
    await supabase.rpc('update_leaderboard', {
      p_name: p.player_name,
      p_score: p.score,
      p_correct: p.correct_count,
      p_total: p.total_count,
    });
  }

  await supabase.from('games').update({ phase: 'FINISHED', ended_at: new Date().toISOString() }).eq('id', gameId);
}

// Player: Trả lời câu hỏi
export async function answerQuestion(playerId, gameId, questionIndex, chosenKey, timeMs) {
  const question = QUESTIONS[questionIndex];
  const option = question?.options.find(o => o.key === chosenKey);
  const isCorrect = option?.correct ?? false;

  // Lưu answer
  await supabase.from('answers').insert([{
    game_id: gameId,
    player_id: playerId,
    question_index: questionIndex,
    chosen_key: chosenKey,
    is_correct: isCorrect,
    time_ms: timeMs,
  }]);

  // Cập nhật score player
  const { data: player } = await supabase.from('players').select('score, correct_count, total_count').eq('id', playerId).single();
  if (player) {
    await supabase.from('players').update({
      score: player.score + (isCorrect ? 20 : 0),
      correct_count: player.correct_count + (isCorrect ? 1 : 0),
      total_count: player.total_count + 1,
      last_seen: new Date().toISOString(),
    }).eq('id', playerId);
  }

  return { correct: isCorrect, result: option?.result, fact: option?.fact };
}

// Lấy danh sách players trong phòng
export async function getPlayers(gameId) {
  const { data } = await supabase
    .from('players')
    .select('id, player_name, player_code, score, correct_count, total_count, is_online')
    .eq('game_id', gameId)
    .order('score', { ascending: false });
  return data || [];
}

// Lấy top leaderboard
export async function getLeaderboard() {
  const { data } = await supabase
    .from('leaderboard')
    .select('*')
    .order('best_score', { ascending: false })
    .limit(10);
  return data || [];
}

// Subscribe realtime
export function subscribeToGame(gameId, callbacks) {
  const channel = supabase
    .channel(`game-${gameId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'games',
      filter: `id=eq.${gameId}`,
    }, (payload) => {
      callbacks.onGameUpdate?.(payload.new);
    })
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'players',
      filter: `game_id=eq.${gameId}`,
    }, (payload) => {
      callbacks.onPlayersUpdate?.(payload.new);
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}

// Lấy thông tin game
export async function getGame(gameCode) {
  const { data } = await supabase
    .from('games')
    .select('*')
    .eq('game_code', gameCode)
    .single();
  return data;
}
