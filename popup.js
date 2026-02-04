const games = [
  // Chess
  {
    id: 'chess',
    name: 'Chess',
    url: 'https://vibecodegames.org/chess/',
    category: 'chess'
  },
  
  // Arcade Games
  {
    id: 'dino-game',
    name: 'Dino Game',
    url: 'https://vibecodegames.org/dino-game/',
    category: 'arcade'
  },
  {
    id: 'pac-man',
    name: 'Pac-Man',
    url: 'https://vibecodegames.org/pac-man/',
    category: 'arcade'
  },
  {
    id: 'snake',
    name: 'Snake',
    url: 'https://vibecodegames.org/snake/',
    category: 'arcade'
  },
  {
    id: 'snake-mobile',
    name: 'Snake (mobile)',
    url: 'https://vibecodegames.org/snake-mobile/',
    category: 'arcade'
  },
  {
    id: 'tetris',
    name: 'Tetris',
    url: 'https://vibecodegames.org/tetris/',
    category: 'arcade'
  },
  {
    id: 'volley',
    name: 'Volley',
    url: 'https://vibecodegames.org/volley/',
    category: 'arcade'
  },
  
  // Puzzle Games
  {
    id: 'fusion-chaos-2048',
    name: 'Fusion Chaos 2048',
    url: 'https://vibecodegames.org/fusion-chaos-2048/',
    category: 'puzzle'
  },
  {
    id: 'game-2048',
    name: 'Game 2048',
    url: 'https://vibecodegames.org/2048-2/',
    category: 'puzzle'
  },
  {
    id: 'fifteen',
    name: 'Fifteen',
    url: 'https://vibecodegames.org/fifteen/',
    category: 'puzzle'
  },
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    url: 'https://vibecodegames.org/minesweeper/',
    category: 'puzzle'
  },
  {
    id: 'nonogram',
    name: 'Nonogram',
    url: 'https://vibecodegames.org/nonogram/',
    category: 'puzzle'
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    url: 'https://vibecodegames.org/sudoku/',
    category: 'puzzle'
  },
  {
    id: 'skiff-ladder',
    name: 'Skiff Ladder',
    url: 'https://vibecodegames.org/skiff-ladder/',
    category: 'puzzle'
  },
  {
    id: 'thimbles',
    name: 'Thimbles',
    url: 'https://vibecodegames.org/thimbles/',
    category: 'puzzle'
  },
  
  // Classic Board Games
  {
    id: 'checkers',
    name: 'Checkers',
    url: 'https://vibecodegames.org/checkers/',
    category: 'classic'
  },
  {
    id: 'domino',
    name: 'Domino',
    url: 'https://vibecodegames.org/domino/',
    category: 'classic'
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-tac-toe',
    url: 'https://vibecodegames.org/tic-tac-toe/',
    category: 'classic'
  },
  
  // Logic & Strategy
  {
    id: 'game-21',
    name: 'Game 21',
    url: 'https://vibecodegames.org/21-2/',
    category: 'logic'
  },
  {
    id: 'hangman',
    name: 'Hangman',
    url: 'https://vibecodegames.org/hangman/',
    category: 'logic'
  },
  {
    id: 'roulette',
    name: 'Roulette',
    url: 'https://vibecodegames.org/roulette/',
    category: 'casino'
  },
  
  // Tools
  {
    id: 'calc',
    name: 'Calc',
    url: 'https://vibecodegames.org/calc/',
    category: 'tools'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    url: 'https://vibecodegames.org/calendar/',
    category: 'tools'
  },
  {
    id: 'timer',
    name: 'Timer',
    url: 'https://vibecodegames.org/timer/',
    category: 'tools'
  }
];

const STORAGE_KEY = 'vibecodeGamesStats';
const FAVORITES_KEY = 'vibecodeGamesFavorites';

async function getStats() {
  return new Promise(resolve => {
    chrome.storage.sync.get([STORAGE_KEY], result => {
      resolve(result[STORAGE_KEY] || {});
    });
  });
}

async function setStats(stats) {
  return new Promise(resolve => {
    chrome.storage.sync.set({ [STORAGE_KEY]: stats }, () => resolve());
  });
}

async function getFavorites() {
  return new Promise(resolve => {
    chrome.storage.sync.get([FAVORITES_KEY], result => {
      resolve(result[FAVORITES_KEY] || []);
    });
  });
}

async function setFavorites(favorites) {
  return new Promise(resolve => {
    chrome.storage.sync.set({ [FAVORITES_KEY]: favorites }, () => resolve());
  });
}

function formatDate(dateString) {
  if (!dateString) return '—';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

async function renderGames(filter = 'all', searchQuery = '') {
  const container = document.getElementById('gamesContainer');
  container.innerHTML = '';

  const stats = await getStats();
  const favorites = await getFavorites();

  let filtered = games;

  // Фильтр по категориям
  if (filter === 'favorites') {
    filtered = filtered.filter(game => favorites.includes(game.id));
  } else if (filter !== 'all') {
    filtered = filtered.filter(game => game.category === filter);
  }

  // Фильтр по поиску
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(game => 
      game.name.toLowerCase().includes(query)
    );
  }

  if (filtered.length === 0) {
    let message = 'No games found';
    if (searchQuery.trim()) {
      message = `No games matching "${searchQuery}"`;
    } else if (filter === 'favorites') {
      message = 'No favorites yet. Click ★ to add games!';
    } else if (filter !== 'all') {
      message = 'No games in this category';
    }
    container.innerHTML = `<div style="padding: 16px; text-align: center; color: #9ca3af;">${message}</div>`;
    return;
  }

  filtered.forEach(game => {
    const gameStats = stats[game.id] || { launches: 0, lastPlayed: null };
    const isFavorite = favorites.includes(game.id);

    const card = document.createElement('div');
    card.className = 'game-card';

    const nameRow = document.createElement('div');
    nameRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;';
    
    const name = document.createElement('div');
    name.className = 'game-name';
    name.textContent = game.name;
    
    const star = document.createElement('span');
    star.style.cssText = `
      cursor: pointer; 
      font-size: 18px; 
      user-select: none;
      color: ${isFavorite ? '#fbbf24' : '#64748b'};
      transition: all 0.2s;
    `;
    star.textContent = isFavorite ? '★' : '☆';
    
    star.addEventListener('mouseenter', () => {
      star.style.color = '#fbbf24';
      star.style.transform = 'scale(1.2)';
    });

    star.addEventListener('mouseleave', () => {
      star.style.color = isFavorite ? '#fbbf24' : '#64748b';
      star.style.transform = 'scale(1)';
    });
    
    star.addEventListener('click', async () => {
      const currentFavorites = await getFavorites();
      if (currentFavorites.includes(game.id)) {
        await setFavorites(currentFavorites.filter(id => id !== game.id));
      } else {
        await setFavorites([...currentFavorites, game.id]);
      }
      const currentFilter = document.getElementById('filter').value;
      const currentSearch = document.getElementById('searchInput').value;
      renderGames(currentFilter, currentSearch);
    });
    
    nameRow.appendChild(name);
    nameRow.appendChild(star);

    const meta = document.createElement('div');
    meta.className = 'game-meta';
    meta.textContent = gameStats.launches > 0 
      ? `Played ${gameStats.launches} time${gameStats.launches > 1 ? 's' : ''}`
      : 'Not played yet';

    const actions = document.createElement('div');
    actions.className = 'game-actions';

    const statsEl = document.createElement('div');
    statsEl.className = 'game-stats';
    statsEl.textContent = gameStats.lastPlayed 
      ? `Last: ${formatDate(gameStats.lastPlayed)}`
      : '';

    const btn = document.createElement('button');
    btn.className = 'game-button';
    btn.textContent = 'Play';

    btn.addEventListener('click', async () => {
       window.open(game.url, '_blank');

      const currentStats = await getStats();
      const prev = currentStats[game.id] || { launches: 0, lastPlayed: null };
      currentStats[game.id] = {
        launches: prev.launches + 1,
        lastPlayed: new Date().toISOString()
      };
      await setStats(currentStats);
      const currentFilter = document.getElementById('filter').value;
      const currentSearch = document.getElementById('searchInput').value;
      renderGames(currentFilter, currentSearch);
    });

    actions.appendChild(statsEl);
    actions.appendChild(btn);

    card.appendChild(nameRow);
    card.appendChild(meta);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const filterSelect = document.getElementById('filter');
  const searchInput = document.getElementById('searchInput');

  filterSelect.addEventListener('change', () => {
    renderGames(filterSelect.value, searchInput.value);
  });

  searchInput.addEventListener('input', () => {
    renderGames(filterSelect.value, searchInput.value);
  });

  renderGames();
});
