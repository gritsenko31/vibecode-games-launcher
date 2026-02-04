🎮 Vibecode Games Launcher

A Chrome extension that provides quick access to 26+ browser-based games from [vibecodegames.org](https://vibecodegames.org).

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-brightgreen)](https://chromewebstore.google.com/detail/vibecode-games-launcher/pkbbmkkbnpkcjdkmphmmnjdlmhafjmdm)
[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/gritsenko31/vibecode-games-launcher)


## ✨ Features

- 🎯 **Quick Launch** - Open any game in a new tab instantly
- ⭐ **Favorites** - Mark your favorite games for quick access
- 🔍 **Smart Search** - Find games by name in real-time
- 📊 **Play Statistics** - Track how many times you've played each game
- 🎨 **Category Filters** - Browse by Arcade, Puzzle, Chess, Classic, and more
- 💾 **Cloud Sync** - Your favorites and stats sync across devices via Chrome Storage API

## 🎲 Game Categories

- **Arcade**: Tetris, Snake, Pac-Man, Dino Game, Volley
- **Puzzle**: 2048, Sudoku, Minesweeper, Nonogram, Fifteen, Skiff Ladder, Thimbles, Fusion Chaos 2048
- **Classic**: Chess, Checkers, Domino, Tic-tac-toe
- **Logic**: Hangman, Game 21
- **Casino**: Roulette
- **Tools**: Calculator, Calendar, Timer

## 🚀 Installation

### From Chrome Web Store (Recommended)

[Install from Chrome Web Store](https://chromewebstore.google.com/detail/vibecode-games-launcher/pkbbmkkbnpkcjdkmphmmnjdlmhafjmdm)

### Manual Installation (for Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/g/vibecode-games-launcher.git
Open Chrome and navigate to chrome://extensions/

Enable "Developer mode" (toggle in top right)

Click "Load unpacked" and select the cloned directory

The extension icon should appear in your toolbar!

🎯 How to Use
Click the extension icon in your Chrome toolbar

Browse games by category or use the search bar

Click ★ to add games to favorites

Click "Play" to launch any game instantly

View your play statistics on each game card

🛠️ Technologies
Manifest V3 - Latest Chrome Extension standard

Chrome Storage API - For syncing favorites and statistics

Vanilla JavaScript - No frameworks, pure performance

CSS Grid - Responsive card layout

All Games View
Browse all 26+ games with category filters

Search Feature
Quick search to find games instantly

Favorites
Mark your favorite games for quick access

🔒 Privacy
This extension does not collect, store, or transmit any personal data.

Game statistics (launch count, last played date) and favorites are stored locally in your browser using Chrome's Storage API

Data syncs across your devices via Chrome Sync (if enabled)

No data is sent to external servers

No tracking or analytics

📝 Development
Project Structure
text
vibecode-games-launcher/
├── icons/           # Extension icons (16x16, 32x32, 48x48, 128x128)
├── manifest.json    # Extension configuration (Manifest V3)
├── popup.html       # Main popup interface
├── popup.css        # Styles for popup
└── popup.js         # Game launcher logic and storage handling
Key Features Implementation
Favorites: Stored in chrome.storage.sync with key vibecodeGamesFavorites

Statistics: Stored in chrome.storage.sync with key vibecodeGamesStats

Search: Real-time filtering using JavaScript .filter() and .includes()

Categories: Hardcoded categories with dynamic filtering

🤝 Contributing
Contributions are welcome! Feel free to:

Fork this repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request


🔗 Links
Chrome Web Store Listing

Vibecode Games Website

Report Issues

👨‍💻 Author
Created with ❤️ for quick gaming breaks

Enjoy gaming! 🎮 If you find this extension useful, please consider leaving a review on the Chrome Web Store.
