# Board Game Score Tracker

A real-time live scoreboard for board game nights. Scores update instantly for everyone watching — no app install, no backend, just open the link.

Hosted at: **https://navs7.github.io/board-game-score/**

---

## Pages

| Page | URL | Who uses it |
|---|---|---|
| Live Scoreboard | `index.html` | Everyone — open on a TV or phone to watch scores live |
| Stats & History | `stats.html` | Anyone — view past games, player records, leaderboard |
| Admin Panel | `admin.html` | Host only — manage games, add players, submit scores |

---

## Features

### Live Scoreboard (`index.html`)
- Animated waiting screen with orbiting dice when no game is active
- Scoreboard appears instantly when the admin starts a game
- Player rows slide in with a staggered animation on game start
- Score pill flashes yellow when a score is updated
- Row flashes green when a player moves up in rank, red when they drop
- Floating background icons keep the screen lively while waiting
- Pulsing green **Live** badge confirms the page is connected
- Share button copies the scoreboard URL to clipboard

### Stats & History (`stats.html`)
- **Leaderboard tab** — sort all-time players by Wins, Win Rate, or Avg Score
- **History tab** — full list of past games with expandable score breakdowns
- **Players tab** — individual player records with search
- Supports both highest-score-wins and lowest-score-wins game modes
- Delete games and players (restricted to the owner account)
- Custom confirmation modal before any delete — no accidental wipes

### Admin Panel (`admin.html`)
- Firebase email/password authentication
- Create a new game with a custom name and scoring mode (highest or lowest wins)
- Add players to the active game
- Submit scores per round — auto-focuses the next player's input
- Reset scores mid-game
- **Abandon Game** — clears the current game without saving to history
- End Game — saves final results to history and player records

---

## Tech Stack

- **Pure static HTML/CSS/JS** — no build step, no framework
- **Firebase Realtime Database** — live sync across all connected clients
- **Firebase Authentication** — email/password, protects the admin panel
- All Firebase SDK loaded from CDN (v10.8.0)

---

## Firebase Data Structure

```
/currentGame
  gameName        string
  gameStatus      "active" | "ended"
  rankingOrder    "highest" | "lowest"
  players/
    <playerKey>/
      name        string
      totalScore  number

/gameHistory
  <pushId>/
    gameName      string
    endedAt       timestamp
    rankingOrder  string
    winnerLabel   string
    players[]     array of { name, totalScore }

/playerRecords
  <playerKey>/
    name          string
    gamesPlayed   number
    wins          number
    totalScore    number
    lastPlayed    timestamp
```

---

## Access & Permissions

| Action | Who |
|---|---|
| View scoreboard | Anyone |
| View stats & history | Anyone |
| Manage games (admin panel) | Any authenticated user |
| Delete games / players | `****et@gmail.com` only |

The stats page shows the **Admin mode** badge and delete buttons only when:
1. Signed in as `*****et@gmail.com`, **and**
2. Navigated from the admin panel (via the Stats button there)

---

## Local Development

No build tools needed. Serve the files with any static server:

```bash
python3 -m http.server 5000
```

Then open `http://localhost:5000`.

---

## Deployment

The project is hosted on **GitHub Pages** from the `main` branch of `navs7/board-game-score`. Push changes to `main` and they go live automatically.

---

## Self-hosting for a Different Community

Each community gets their own completely isolated copy — separate players, games, and scores. Nothing is shared with the original project.

### Step 1 — Fork the repo
Fork `navs7/board-game-score` on GitHub into your own account.

### Step 2 — Create a Firebase project
1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project
2. Enable **Realtime Database** → create database → start in test mode
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Under Authentication → Users, add your admin email and password

### Step 3 — Update `firebase-config.js`
Replace the config object with your own project's values (found under Firebase Console → Project Settings → Your apps → SDK setup):

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
};
```

### Step 4 — Set your admin email in `stats.html`
Find this line and replace with your admin email:

```js
const DELETE_ADMIN = 'your-admin@example.com';
```

### Step 5 — Enable GitHub Pages
In your forked repo → **Settings** → **Pages** → Source: deploy from `main` branch → Save.

Your scoreboard will be live at `https://<your-github-username>.github.io/board-game-score/`

### Step 6 — Lock down Firebase Database Rules (recommended)
In Firebase Console → Realtime Database → Rules, replace the default open rules with:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

This allows anyone to read (view the scoreboard/stats) but only authenticated admins to write.
