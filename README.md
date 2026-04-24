# TicTacToe React App

A clean and tutorial-worthy TicTacToe game built with React and TypeScript using Vite.

## Features

- 3x3 TicTacToe board
- Alternating X and O players
- Win and draw detection
- Restart button
- Move history with time travel
- Responsive design
- Clean UI with hover effects

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Play

- Click on an empty square to make a move.
- Players alternate between X and O.
- First to get three in a row (horizontally, vertically, or diagonally) wins.
- If all squares are filled without a winner, it's a draw.
- Use the Restart button to start a new game.
- Use the Move History to jump back to any previous state.

## State Management

This app uses `useReducer` for clean state management, handling:
- Board state
- Current player
- Winner/draw status
- Move history

## Build

To build for production:
```bash
npm run build
```
