import { useState, useEffect, useRef } from 'react';
import {
  supabase,
  QUESTIONS,
  createGame,
  joinGame,
  startGame,
  nextQuestion,
  endGame,
  answerQuestion,
  getPlayers,
  getLeaderboard,
  subscribeToGame,
  getGame,
} from './supabase.js';

// =============================================================
// UTILS
// =============================================================
function getMedal(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

// =============================================================
// HOME
// =============================================================
function Home() {
  const handleAdmin = () => { window.location.href = '/admin'; };
  const handleRankings = () => { window.location.href = '/rankings'; };

  return (
    <div className="page game-bg">
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 8 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="18" fill="url(#hg)"/>
            <text x="32" y="46" textAnchor="middle" fontSize="32" fontWeight="900" fill="#c8102e">₫</text>
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#ffcd00"/>
                <stop offset="100%" stopColor="#f0a800"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="title-gold">GDP BUILDER</h1>
        <p className="subtitle">Game Hội Nhập Việt Nam 2001–2024</p>
        <div className="divider"/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn-secondary" onClick={handleAdmin}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            QUẢN TRÒ — Dashboard
          </button>
          <button className="btn btn-secondary" onClick={handleRankings}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 21V11M16 21V3M12 21V7"/>
            </svg>
            BẢNG XẾP HẠNG
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// ADMIN LOGIN
// =============================================================
function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'gdpbuilder2024';

  const handleLogin = () => {
    if (!password.trim()) { setError('Nhập mật khẩu.'); return; }
    if (password !== ADMIN_PASS) { setError('Sai mật khẩu.'); return; }
    sessionStorage.setItem('gdp_admin_logged_in', '1');
    window.location.href = '/admin';
  };

  return (
    <div className="page game-bg">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffcd00" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <h2 className="title-gold" style={{ fontSize: '1.8rem', marginTop: 12 }}>Quản trò viên</h2>
          <p className="subtitle">Nhập mật khẩu để truy cập</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input className="input" type="password" placeholder="Mật khẩu..." value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()}/>
        </div>
        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#ef4444', fontSize: '0.9rem' }}>{error}</div>}
        <button className="btn btn-primary" onClick={handleLogin}>Đăng nhập</button>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <a href="/" style={{ color: 'rgba(255,205,0,0.4)', fontSize: '0.8rem' }}>← Quay về</a>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// ADMIN DASHBOARD
// =============================================================
function AdminDashboard() {
  const [gameId, setGameId] = useState(null);
  const [gameCode, setGameCode] = useState(null);
  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState('LOBBY');
  const [currentQ, setCurrentQ] = useState(-1);
  const [leaderboard, setLeaderboard] = useState([]);
  const [copied, setCopied] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const unsubscribeRef = useRef(null);

  // Tạo phòng mới
  const initGame = async () => {
    setLoading(true);
    try {
      const game = await createGame();
      setGameId(game.id);
      setGameCode(game.game_code);
      setPhase('LOBBY');
      setCurrentQ(-1);
      setPlayers([]);
      setError('');

      // Subscribe realtime
      if (unsubscribeRef.current) unsubscribeRef.current();
      unsubscribeRef.current = subscribeToGame(game.id, {
        onGameUpdate: (g) => {
          setPhase(g.phase);
          setCurrentQ(g.current_question);
          if (g.phase === 'FINISHED') loadFinalResults();
        },
        onPlayersUpdate: () => loadPlayers(),
      });

      loadPlayers();
      loadLeaderboard();
    } catch (e) {
      setError('Lỗi tạo phòng: ' + e.message);
    }
    setLoading(false);
  };

  const loadPlayers = async () => {
    if (!gameId) return;
    const p = await getPlayers(gameId);
    setPlayers(p);
  };

  const loadLeaderboard = async () => {
    const lb = await getLeaderboard();
    setLeaderboard(lb);
  };

  const loadFinalResults = async () => {
    if (!gameId) return;
    const p = await getPlayers(gameId);
    setPlayers(p.sort((a, b) => b.score - a.score));
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('gdp_admin_logged_in') === '1';
    if (!isLoggedIn) { window.location.href = '/admin'; return; }
    initGame();
    return () => { if (unsubscribeRef.current) unsubscribeRef.current(); };
  }, []);

  const handleStart = async () => {
    if (!gameId) return;
    try {
      await startGame(gameId);
      await loadPlayers();
    } catch (e) { setError(e.message); }
  };

  const handleNext = async () => {
    if (!gameId) return;
    try {
      const r = await nextQuestion(gameId);
      if (r.finished) {
        // End game
        await endGame(gameId);
        await loadFinalResults();
        await loadLeaderboard();
      } else {
        await loadPlayers();
      }
    } catch (e) { setError(e.message); }
  };

  const handleEnd = async () => {
    if (!gameId) return;
    try {
      await endGame(gameId);
      await loadFinalResults();
      await loadLeaderboard();
    } catch (e) { setError(e.message); }
  };

  const handleNewGame = () => {
    if (unsubscribeRef.current) unsubscribeRef.current();
    initGame();
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gdp_admin_logged_in');
    window.location.href = '/';
  };

  const baseUrl = window.location.origin;
  const link = `${baseUrl}/?join=${gameCode}`;

  return (
    <div className="page game-bg">
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2" style={{ marginBottom: 16 }}>
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 16px' }} onClick={handleLogout}>← Đăng xuất</button>
          <div className="flex items-center gap-2">
            <span className={`phase-badge ${phase === 'LOBBY' ? 'lobby' : phase === 'PLAYING' ? 'playing' : 'finished'}`}>
              {phase === 'LOBBY' ? '🟡 Chờ người chơi' : phase === 'PLAYING' ? '🟢 Đang chơi' : '🔴 Kết thúc'}
            </span>
            {gameCode && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Phòng: <strong style={{ color: 'var(--gold)' }}>{gameCode}</strong></span>}
          </div>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#ef4444', fontSize: '0.9rem' }}>{error}</div>}

        {phase !== 'FINISHED' ? (
          <div className="card card-host">
            <div className="host-layout">
              {/* LEFT: Room info + Controls */}
              <div className="host-section">
                <div className="host-section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Chia sẻ phòng
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label className="label">Link cho người chơi</label>
                  <div className="copy-box">
                    <input className="copy-input" readOnly value={link || 'Đang tạo phòng...'} />
                    <button className="copy-btn" onClick={() => copyToClipboard(link, 'link')}>{copied === 'link' ? '✓ Đã copy!' : 'Copy'}</button>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="label">Mã phòng</label>
                  <div className="copy-box">
                    <input className="copy-input" readOnly value={gameCode || '...'} style={{ fontFamily: 'monospace', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '4px' }}/>
                    <button className="copy-btn" onClick={() => copyToClipboard(gameCode, 'code')}>{copied === 'code' ? '✓' : 'Copy'}</button>
                  </div>
                </div>

                <div className="divider"/>

                <div className="host-section-title" style={{ marginTop: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Điều khiển
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {phase === 'LOBBY' && (
                    <button className="btn btn-primary" disabled={players.length === 0 || loading} onClick={handleStart}>
                      ▶ BẮT ĐẦU GAME ({players.length} người)
                    </button>
                  )}
                  {phase === 'PLAYING' && currentQ >= 0 && (
                    <>
                      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>Câu {currentQ + 1}/5</span>
                        <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: 4 }}>Đang chờ người chơi...</p>
                      </div>
                      <button className="btn btn-primary" onClick={handleNext}>→ Câu tiếp theo</button>
                    </>
                  )}
                  {phase === 'PLAYING' && (
                    <button className="btn btn-danger" onClick={handleEnd} style={{ marginTop: 4 }}>⏹ Kết thúc game</button>
                  )}
                  {phase === 'LOBBY' && (
                    <button className="btn btn-secondary" disabled={loading} onClick={initGame}>🔄 Tạo phòng mới</button>
                  )}
                </div>
              </div>

              {/* RIGHT: Live scores + Leaderboard */}
              <div className="host-section">
                <div className="host-section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Người chơi ({players.length})
                </div>

                {players.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <p className="text-muted">Chưa có ai. Chia sẻ link phía trên!</p>
                  </div>
                ) : (
                  <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                    <table className="scores-table">
                      <thead><tr><th>#</th><th>Tên</th><th>Điểm</th><th>Đúng</th></tr></thead>
                      <tbody>
                        {players.map((p, i) => (
                          <tr key={p.id}>
                            <td>{getMedal(i + 1)}</td>
                            <td>{p.player_name}</td>
                            <td style={{ color: 'var(--gold)', fontWeight: 700 }}>{p.score}</td>
                            <td>{p.correct_count}/{p.total_count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="divider"/>

                <div className="host-section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 21V11M16 21V3M12 21V7"/></svg>
                  Top all-time
                </div>
                {leaderboard.length === 0 ? (
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>Chưa có dữ liệu</p>
                ) : (
                  <div>
                    {leaderboard.slice(0, 5).map((p, i) => (
                      <div key={p.player_name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: i === 0 ? 'var(--gold)' : 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{getMedal(i + 1)} {p.player_name}</span>
                        <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>{p.best_score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* GAME OVER */
          <div className="card card-host">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: '3rem' }}>🏆</div>
              <h2 className="title-gold" style={{ fontSize: '2rem' }}>KẾT QUẢ GAME</h2>
              <p className="subtitle">{players.length} người chơi</p>
            </div>

            {players.length > 0 && (
              <div className="winner-card">
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{getMedal(1)}</div>
                <div className="winner-name">{players[0].player_name}</div>
                <div className="winner-score">{players[0].score} điểm</div>
                <div className="text-muted">{players[0].correct_count}/{players[0].total_count} câu đúng</div>
              </div>
            )}

            <table className="scores-table">
              <thead><tr><th>Hạng</th><th>Tên</th><th>Điểm</th><th>Đúng</th></tr></thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={p.id}>
                    <td>{getMedal(i + 1)}</td>
                    <td>{p.player_name}</td>
                    <td style={{ color: 'var(--gold)', fontWeight: 700 }}>{p.score}</td>
                    <td>{p.correct_count}/{p.total_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-2" style={{ marginTop: 24 }}>
              <button className="btn btn-primary" onClick={handleNewGame}>🎮 Game mới</button>
              <button className="btn btn-secondary" onClick={handleLogout}>← Đăng xuất</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================
// PLAYER JOIN
// =============================================================
function PlayerJoin() {
  const [name, setName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const urlJoin = new URLSearchParams(window.location.search).get('join');
    if (urlJoin) setGameCode(urlJoin);
  }, []);

  const handleJoin = async () => {
    const code = gameCode.trim() || new URLSearchParams(window.location.search).get('join');
    if (!code) { setError('Nhập mã phòng.'); return; }
    if (!name.trim()) { setError('Nhập tên của bạn.'); return; }
    setJoining(true);
    setError('');

    try {
      const { game, player } = await joinGame(code, name.trim());
      // Lưu vào sessionStorage
      sessionStorage.setItem('gdp_player_id', player.id);
      sessionStorage.setItem('gdp_game_id', game.id);
      sessionStorage.setItem('gdp_player_name', player.player_name);
      // Redirect đến trang chơi
      window.location.href = `/play?game=${code}`;
    } catch (e) {
      setError(e.message || 'Lỗi kết nối');
      setJoining(false);
    }
  };

  return (
    <div className="page game-bg">
      <div className="card">
        <h2 className="title-gold" style={{ fontSize: '1.8rem', marginBottom: 8 }}>Vào phòng chơi</h2>
        <p className="subtitle" style={{ marginBottom: 24 }}>Nhập mã phòng và tên để tham gia</p>

        <div style={{ marginBottom: 16 }}>
          <label className="label">Mã phòng</label>
          <input className="input" placeholder="Ví dụ: abc12345" value={gameCode} onChange={e => setGameCode(e.target.value)} maxLength={20} style={{ fontFamily: 'monospace', letterSpacing: '2px', textAlign: 'center' }}/>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label className="label">Tên của bạn</label>
          <input className="input" placeholder="Ví dụ: Minh, Lan..." value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleJoin()} maxLength={20}/>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#ef4444', fontSize: '0.9rem' }}>{error}</div>}

        <button className="btn btn-primary" onClick={handleJoin} disabled={joining || !name.trim() || !gameCode.trim()}>
          {joining ? 'Đang kết nối...' : 'Tham gia ngay'}
        </button>
      </div>
    </div>
  );
}

// =============================================================
// PLAYER GAME VIEW
// =============================================================
function PlayerGame() {
  const [phase, setPhase] = useState('WAITING');
  const [currentQ, setCurrentQ] = useState(-1);
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [myAnswer, setMyAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [myScore, setMyScore] = useState(0);
  const [tick, setTick] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [playersCount, setPlayersCount] = useState(0);
  const [scores, setScores] = useState([]);
  const [playerId, setPlayerId] = useState(null);
  const [error, setError] = useState('');

  const playerName = sessionStorage.getItem('gdp_player_name');
  const gameId = sessionStorage.getItem('gdp_game_id');
  const playerId2 = sessionStorage.getItem('gdp_player_id');

  // Poll game state
  const loadGameState = async () => {
    const code = new URLSearchParams(window.location.search).get('game');
    if (!code) { setError('Thiếu mã phòng'); return; }

    try {
      const game = await getGame(code);
      if (!game) { setError('Phòng không tồn tại'); return; }

      setPhase(game.phase);
      setCurrentQ(game.current_question);
      setPlayersCount(game.players?.length || 0);

      if (game.phase === 'PLAYING' && game.current_question >= 0) {
        setQuestion(QUESTIONS[game.current_question]);
        setAnswered(false);
        setResult(null);
        setTick(15);
      }

      if (game.phase === 'FINISHED') {
        setGameOver(true);
      }
    } catch (e) {
      // Ignore poll errors
    }
  };

  // Load player score
  const loadMyScore = async () => {
    const pid = sessionStorage.getItem('gdp_player_id');
    if (!pid) return;
    const { data } = await supabase.from('players').select('score, correct_count, total_count').eq('id', pid).single();
    if (data) setMyScore(data.score);
  };

  // Load all scores
  const loadScores = async () => {
    const code = new URLSearchParams(window.location.search).get('game');
    if (!code) return;
    const game = await getGame(code);
    if (!game) return;
    const p = await getPlayers(game.id);
    setScores(p.sort((a, b) => b.score - a.score));
  };

  useEffect(() => {
    const pid = sessionStorage.getItem('gdp_player_id');
    if (!pid) {
      setError('Không tìm thấy phiên. Vui lòng vào lại từ link của quản trò.');
      return;
    }
    setPlayerId(pid);

    // Initial load
    loadGameState();
    loadScores();
    loadMyScore();

    // Subscribe realtime
    const code = new URLSearchParams(window.location.search).get('game');
    if (code) {
      getGame(code).then(game => {
        if (!game) return;
        const unsub = subscribeToGame(game.id, {
          onGameUpdate: (g) => {
            setPhase(g.phase);
            setCurrentQ(g.current_question);
            if (g.phase === 'PLAYING' && g.current_question >= 0) {
              setQuestion(QUESTIONS[g.current_question]);
              setAnswered(false);
              setResult(null);
              setMyAnswer(null);
              setTick(15);
            }
            if (g.phase === 'FINISHED') {
              setGameOver(true);
              loadScores();
            }
          },
          onPlayersUpdate: () => {
            loadScores();
            loadMyScore();
          },
        });
        return unsub;
      });
    }

    // Timer countdown
    const timer = setInterval(() => {
      setTick(t => {
        if (t <= 1) {
          setAnswered(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = async (key) => {
    if (answered || !playerId) return;
    const startTime = Date.now();
    setAnswered(true);

    try {
      const code = new URLSearchParams(window.location.search).get('game');
      const game = await getGame(code);
      const r = await answerQuestion(playerId, game.id, currentQ, key, Date.now() - startTime);
      setMyAnswer(r.correct);
      setResult(r);
      setMyScore(prev => prev + (r.correct ? 20 : 0));
    } catch (e) {
      // Ignore answer errors
    }
  };

  // Error
  if (error) {
    return (
      <div className="page game-bg">
        <div className="card text-center">
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>❌</div>
          <h2 className="title-red" style={{ fontSize: '1.5rem' }}>{error}</h2>
          <div style={{ marginTop: 24 }}><a href="/" className="btn btn-secondary" style={{ width: 'auto', display: 'inline-flex' }}>← Về trang chủ</a></div>
        </div>
      </div>
    );
  }

  // Game over
  if (gameOver) {
    const myResult = scores.find(s => s.id === playerId);
    const rank = scores.findIndex(s => s.id === playerId) + 1;
    return (
      <div className="page game-bg">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: '3.5rem' }}>{getMedal(rank)}</div>
            <h2 className="title-gold" style={{ fontSize: '2rem' }}>KẾT THÚC!</h2>
            <p className="subtitle">{rank > 0 ? `Hạng ${rank}/${scores.length}` : ''}</p>
          </div>

          <div className="winner-card">
            <div className="winner-name">{playerName}</div>
            <div className="winner-score">{myScore} điểm</div>
            <div className="text-muted">{myResult ? `${myResult.correct_count}/${myResult.total_count} câu đúng` : ''}</div>
          </div>

          <table className="scores-table">
            <thead><tr><th>Hạng</th><th>Tên</th><th>Điểm</th><th>Đúng</th></tr></thead>
            <tbody>
              {scores.slice(0, 5).map((s, i) => (
                <tr key={s.id} style={s.id === playerId ? { background: 'rgba(255,205,0,0.08)' } : {}}>
                  <td>{getMedal(i + 1)}</td>
                  <td>{s.player_name}{s.id === playerId ? ' (bạn)' : ''}</td>
                  <td style={{ color: 'var(--gold)', fontWeight: 700 }}>{s.score}</td>
                  <td>{s.correct_count}/{s.total_count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 20 }}><a href="/" className="btn btn-secondary">Chơi lại</a></div>
        </div>
      </div>
    );
  }

  // Waiting
  if (!question || phase === 'WAITING' || phase === 'LOBBY') {
    return (
      <div className="page game-bg">
        <div className="card text-center">
          <div className="spinner" style={{ margin: '0 auto 20px' }}/>
          <h2 className="title-gold" style={{ fontSize: '1.8rem' }}>Xin chào, {playerName}!</h2>
          <p className="subtitle">Đang chờ quản trò bắt đầu...</p>
          <p className="text-muted" style={{ marginTop: 12 }}>Đang chuẩn bị câu hỏi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page game-bg">
      <div className="card">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>Câu</span>
            <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.2rem' }}> {currentQ + 1}/5</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>Điểm:</span>
            <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1.2rem' }}>{myScore}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center mb-2">
          <div className={`timer-ring ${tick <= 5 ? 'timer-urgent' : ''}`}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke={tick <= 5 ? 'var(--red)' : 'var(--gold)'} strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - tick / 15)}`}
                strokeLinecap="round"/>
            </svg>
            <div className="timer-text">{tick}</div>
          </div>
        </div>

        {/* Question */}
        <div className="question-card">
          <div className="question-year">{question.year}</div>
          <div className="question-title">{question.title}</div>
          <div className="question-situation">{question.situation}</div>
          <div className="question-context">{question.context}</div>

          {question.options.map(opt => {
            let cls = 'option-btn';
            if (answered) {
              if (opt.correct) cls += ' option-correct';
              else if (myAnswer !== null) cls += ' option-wrong';
            }
            return (
              <button key={opt.key} className={cls} onClick={() => handleAnswer(opt.key)} disabled={answered}>
                <span className="option-key">{opt.key}</span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Result */}
        {result && (
          <div className={`result-box ${result.correct ? 'result-correct' : 'result-wrong'}`}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
              {result.correct ? '✓ Chính xác! +20 điểm' : '✗ Chưa đúng rồi'}
            </div>
            <div style={{ fontSize: '0.9rem', marginBottom: 8 }}>{result.result}</div>
            {result.fact && <div className="result-fact">{result.fact}</div>}
          </div>
        )}

        {!result && answered && tick <= 0 && (
          <div className="result-box result-wrong">Hết giờ!</div>
        )}
      </div>
    </div>
  );
}

// =============================================================
// RANKINGS
// =============================================================
function Rankings() {
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(data => { setTop(data); setLoading(false); });
  }, []);

  return (
    <div className="page game-bg">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🏆</div>
          <h2 className="title-gold" style={{ fontSize: '2rem' }}>Bảng Xếp Hạng</h2>
          <p className="subtitle">Top người chơi GDP Builder</p>
        </div>

        {loading ? (
          <div className="flex justify-between items-center" style={{ padding: '40px 0' }}>
            <div className="spinner" style={{ margin: '0 auto' }}/>
          </div>
        ) : top.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p className="text-muted">Chưa có ai chơi. Hãy là người đầu tiên!</p>
          </div>
        ) : (
          <div>
            {top.length >= 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
                {[1, 0, 2].map(i => (
                  <div key={i} style={{ textAlign: 'center', padding: '16px 8px', borderRadius: 14, background: i === 0 ? 'rgba(255,205,0,0.1)' : 'rgba(255,255,255,0.03)', border: i === 0 ? '1px solid rgba(255,205,0,0.3)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 4 }}>{getMedal(i + 1)}</div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{top[i]?.player_name}</div>
                    <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1.3rem' }}>{top[i]?.best_score}</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>điểm</div>
                  </div>
                ))}
              </div>
            )}

            {top.slice(3).map((p, idx) => (
              <div key={p.player_name} className="top-item" style={{ marginBottom: 8 }}>
                <div className="top-rank normal">{idx + 4}</div>
                <div className="top-info">
                  <div className="top-name">{p.player_name}</div>
                  <div className="top-games">{p.games_played} trận · {p.best_correct}/{p.best_total} đúng</div>
                </div>
                <div className="top-score-box">
                  <div className="top-score">{p.best_score}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <a href="/" className="btn btn-secondary" style={{ width: 'auto', display: 'inline-flex' }}>← Trang chủ</a>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// APP — Router
// =============================================================
export default function App() {
  const [route, setRoute] = useState('');
  const path = window.location.pathname;

  useEffect(() => {
    if (path === '/admin') {
      const isLoggedIn = sessionStorage.getItem('gdp_admin_logged_in') === '1';
      setRoute(isLoggedIn ? 'dashboard' : 'admin-login');
    } else if (path === '/rankings') {
      setRoute('rankings');
    } else if (path === '/play') {
      setRoute('play');
    } else {
      // Check if ?join= param
      const joinId = new URLSearchParams(window.location.search).get('join');
      setRoute(joinId ? 'join' : 'home');
    }
  }, [path]);

  switch (route) {
    case 'admin-login': return <AdminLogin />;
    case 'dashboard': return <AdminDashboard />;
    case 'rankings': return <Rankings />;
    case 'join': return <PlayerJoin />;
    case 'play': return <PlayerGame />;
    default: return <Home />;
  }
}
