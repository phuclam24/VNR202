// =============================================================
// GAME SERVER — GDP Builder Multiplayer
// Express + WebSocket + SQLite
// =============================================================

import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors({ origin: '*' }));
app.use(express.json());

// =============================================================
// DATABASE
// =============================================================
const DB_PATH = join(__dirname, 'scores.db');
const db = new Database(DB_PATH);

// Auto-create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    correct INTEGER NOT NULL,
    total INTEGER NOT NULL,
    game_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT UNIQUE NOT NULL,
    best_score INTEGER DEFAULT 0,
    best_correct INTEGER DEFAULT 0,
    best_total INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// =============================================================
// GAME STATE
// =============================================================
const GAMES = new Map(); // gameId -> game state

// =============================================================
// GAME QUESTIONS — GDP Builder 5 năm
// =============================================================
const QUESTIONS = [
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
    context: 'Đại hội XI đề ra 3 đột phá: (1) Hoàn thiện thể chế, (2) Phát triển nhân lực, (3) Xây dựng hạ tầng. Cả 3 đều cần — nhưng bạn ưu tiên gì?',
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
// HELPERS
// =============================================================
function broadcast(gameId, message, excludeWs = null) {
  const game = GAMES.get(gameId);
  if (!game) return;
  const data = JSON.stringify(message);
  game.clients.forEach(({ ws, playerId }) => {
    if (ws !== excludeWs && ws.readyState === 1) {
      ws.send(data);
    }
  });
}

function sendTo(ws, message) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(message));
  }
}

function getScores(gameId) {
  const game = GAMES.get(gameId);
  if (!game) return [];
  return Array.from(game.scores.entries())
    .map(([playerId, s]) => ({ playerId, playerName: s.name, score: s.score, correct: s.correct, total: s.total }))
    .sort((a, b) => b.score - a.score);
}

// =============================================================
// WEBSOCKET HANDLER
// =============================================================
wss.on('connection', (ws) => {
  let playerId = null;
  let currentGameId = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {
      // ── HOST: Create game ──────────────────────────────────
      case 'CREATE_GAME': {
        const gameId = uuidv4().slice(0, 8);
        const hostWs = ws;
        GAMES.set(gameId, {
          id: gameId,
          phase: 'LOBBY',      // LOBBY | QUESTION | RESULT | FINISHED
          currentQuestion: -1,
          questionStartTime: null,
          timeLimit: 15000,    // 15s mỗi câu
          clients: new Map(),  // playerId -> { ws, name, score, correct, total }
          scores: new Map(),
          questionResults: null,
        });
        currentGameId = gameId;
        sendTo(ws, { type: 'GAME_CREATED', gameId });
        break;
      }

      // ── PLAYER: Join game ─────────────────────────────────
      case 'JOIN_GAME': {
        const { gameId, playerName } = msg;
        const game = GAMES.get(gameId);
        if (!game) {
          sendTo(ws, { type: 'ERROR', message: 'Phòng không tồn tại hoặc đã kết thúc.' });
          return;
        }
        if (game.phase === 'FINISHED') {
          sendTo(ws, { type: 'ERROR', message: 'Game đã kết thúc. Vui lòng chờ game mới.' });
          return;
        }
        playerId = uuidv4().slice(0, 8);
        currentGameId = gameId;
        game.clients.set(playerId, { ws, name: playerName, score: 0, correct: 0, total: 0 });
        game.scores.set(playerId, { name: playerName, score: 0, correct: 0, total: 0 });

        // Gửi trạng thái hiện tại cho người chơi mới
        sendTo(ws, {
          type: 'JOINED',
          playerId,
          gameId,
          phase: game.phase,
          playersCount: game.clients.size,
          currentQuestion: game.currentQuestion,
        });

        // Thông báo cho host + mọi người
        broadcast(gameId, {
          type: 'PLAYER_JOINED',
          playerName,
          playersCount: game.clients.size,
          scores: getScores(gameId),
        }, ws);
        break;
      }

      // ── HOST: Start game ──────────────────────────────────
      case 'START_GAME': {
        const game = GAMES.get(msg.gameId);
        if (!game) return;
        game.phase = 'QUESTION';
        game.currentQuestion = 0;
        game.questionResults = null;

        broadcast(gameId, { type: 'GAME_START' });

        // Bắt đầu timer 15s cho câu 1
        startQuestionTimer(game.id);
        break;
      }

      // ── HOST: Next question ────────────────────────────────
      case 'NEXT_QUESTION': {
        const game = GAMES.get(msg.gameId);
        if (!game) return;

        game.currentQuestion++;
        if (game.currentQuestion >= QUESTIONS.length) {
          // Game over
          game.phase = 'FINISHED';
          const finalScores = saveAndGetFinalScores(game);
          broadcast(gameId, {
            type: 'GAME_OVER',
            scores: finalScores,
          });
          GAMES.delete(game.id);
        } else {
          game.questionResults = null;
          broadcast(gameId, {
            type: 'SHOW_QUESTION',
            questionIndex: game.currentQuestion,
            question: QUESTIONS[game.currentQuestion],
          });
          startQuestionTimer(game.id);
        }
        break;
      }

      // ── HOST: Show result ─────────────────────────────────
      case 'SHOW_RESULT': {
        const game = GAMES.get(gameId);
        if (!game) return;
        broadcast(gameId, {
          type: 'SHOW_QUESTION_RESULT',
          questionIndex: game.currentQuestion,
          question: QUESTIONS[game.currentQuestion],
          scores: getScores(gameId),
        });
        break;
      }

      // ── PLAYER: Answer ────────────────────────────────────
      case 'ANSWER': {
        const game = GAMES.get(currentGameId);
        if (!game || !playerId) return;

        const client = game.clients.get(playerId);
        if (!client) return;
        if (msg.questionIndex !== game.currentQuestion) return; // Đã trả lời rồi hoặc sai câu

        const question = QUESTIONS[msg.questionIndex];
        const chosen = question.options.find(o => o.key === msg.answer);
        const isCorrect = chosen ? chosen.correct : false;

        if (isCorrect) {
          client.score += 20;
          client.correct += 1;
        }
        client.total += 1;

        // Cập nhật scores map
        game.scores.set(playerId, {
          name: client.name,
          score: client.score,
          correct: client.correct,
          total: client.total,
        });

        sendTo(ws, {
          type: 'ANSWER_RECEIVED',
          correct: isCorrect,
          explanation: chosen ? chosen.result : null,
          fact: chosen ? chosen.fact : null,
          yourScore: client.score,
        });

        // Thông báo cho host biết ai trả lời
        broadcast(gameId, {
          type: 'ANSWER_LOG',
          playerName: client.name,
          correct: isCorrect,
          scores: getScores(currentGameId),
        }, ws);
        break;
      }

      // ── HOST: Show leaderboard ─────────────────────────────
      case 'GET_LEADERBOARD': {
        const top = db.prepare(
          'SELECT player_name, best_score, best_correct, best_total, games_played FROM leaderboard ORDER BY best_score DESC LIMIT 10'
        ).all();
        sendTo(ws, { type: 'LEADERBOARD', top });
        break;
      }

      // ── HOST: End game manually ────────────────────────────
      case 'END_GAME': {
        const game = GAMES.get(msg.gameId);
        if (!game) return;
        game.phase = 'FINISHED';
        const finalScores = saveAndGetFinalScores(game);
        broadcast(gameId, {
          type: 'GAME_OVER',
          scores: finalScores,
        });
        break;
      }
    }
  });

  ws.on('close', () => {
    if (currentGameId && playerId) {
      const game = GAMES.get(currentGameId);
      if (game) {
        const name = game.clients.get(playerId)?.name;
        game.clients.delete(playerId);
        game.scores.delete(playerId);
        broadcast(currentGameId, {
          type: 'PLAYER_LEFT',
          playerName: name,
          playersCount: game.clients.size,
          scores: getScores(currentGameId),
        });
      }
    }
  });
});

// =============================================================
// QUESTION TIMER
// =============================================================
const timers = new Map();

function startQuestionTimer(gameId) {
  if (timers.has(gameId)) clearTimeout(timers.get(gameId));
  const game = GAMES.get(gameId);
  if (!game) return;

  const question = QUESTIONS[game.currentQuestion];
  const startTime = Date.now();
  game.questionStartTime = startTime;

  // Broadcast countdown mỗi giây
  let remaining = 15;
  const countdown = setInterval(() => {
    const g = GAMES.get(gameId);
    if (!g || g.currentQuestion !== game.currentQuestion || g.phase !== 'QUESTION') {
      clearInterval(countdown);
      return;
    }
    remaining = 15 - Math.floor((Date.now() - startTime) / 1000);
    if (remaining <= 0) {
      clearInterval(countdown);
      broadcast(gameId, { type: 'TIME_UP', questionIndex: game.currentQuestion });
    } else {
      broadcast(gameId, { type: 'TICK', remaining, questionIndex: game.currentQuestion });
    }
  }, 1000);

  timers.set(gameId, countdown);

  // Broadcast câu hỏi
  broadcast(gameId, {
    type: 'SHOW_QUESTION',
    questionIndex: game.currentQuestion,
    question,
    timeLimit: 15,
  });
}

// =============================================================
// SAVE SCORES TO DATABASE
// =============================================================
function saveAndGetFinalScores(game) {
  const finalScores = [];
  for (const [playerId, s] of game.scores.entries()) {
    finalScores.push({
      playerId,
      playerName: s.name,
      score: s.score,
      correct: s.correct,
      total: s.total,
    });

    // Upsert vào leaderboard
    const existing = db.prepare('SELECT best_score FROM leaderboard WHERE player_name = ?').get(s.name);
    if (existing) {
      if (s.score > existing.best_score) {
        db.prepare(
          'UPDATE leaderboard SET best_score = ?, best_correct = ?, best_total = ?, games_played = games_played + 1, updated_at = CURRENT_TIMESTAMP WHERE player_name = ?'
        ).run(s.score, s.correct, s.total, s.name);
      } else {
        db.prepare('UPDATE leaderboard SET games_played = games_played + 1 WHERE player_name = ?').run(s.name);
      }
    } else {
      db.prepare(
        'INSERT INTO leaderboard (player_name, best_score, best_correct, best_total) VALUES (?, ?, ?, ?)'
      ).run(s.name, s.score, s.correct, s.total);
    }

    // Lưu vào bảng scores (lịch sử game)
    db.prepare(
      'INSERT INTO scores (player_name, score, correct, total, game_id) VALUES (?, ?, ?, ?, ?)'
    ).run(s.name, s.score, s.correct, s.total, game.id);
  }
  return finalScores.sort((a, b) => b.score - a.score);
}

// =============================================================
// REST API
// =============================================================

// Get top 10 all time
app.get('/api/leaderboard', (req, res) => {
  const top = db.prepare(
    'SELECT player_name, best_score, best_correct, best_total, games_played, updated_at FROM leaderboard ORDER BY best_score DESC LIMIT 10'
  ).all();
  res.json(top);
});

// Get all scores for a player
app.get('/api/scores/:playerName', (req, res) => {
  const scores = db.prepare(
    'SELECT * FROM scores WHERE player_name = ? ORDER BY created_at DESC LIMIT 20'
  ).all(req.params.playerName);
  res.json(scores);
});

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, games: GAMES.size }));

// Serve static files in production
const distPath = join(__dirname, 'public');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(join(distPath, 'index.html')));
}

// =============================================================
// START
// =============================================================
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🎮 GDP Builder Game Server running on http://localhost:${PORT}`);
  console.log(`📊 WebSocket ready`);
  console.log(`🗃  Database: ${DB_PATH}`);
});
