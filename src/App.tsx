import { useReducer } from 'react';
import './App.css';

type Player = 'X' | 'O';
type Board = (Player | null)[][];
type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  history: Board[];
};

type Action =
  | { type: 'MAKE_MOVE'; row: number; col: number }
  | { type: 'RESET' }
  | { type: 'JUMP_TO'; step: number };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { row, col } = action;
      if (state.board[row][col] || state.winner) return state;
      const newBoard = state.board.map(r => [...r]);
      newBoard[row][col] = state.currentPlayer;
      const winner = calculateWinner(newBoard);
      const newHistory = [...state.history, newBoard];
      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        history: newHistory,
      };
    }
    case 'RESET':
      return initialState;
    case 'JUMP_TO': {
      const step = action.step;
      const board = step === 0 ? Array(3).fill(null).map(() => Array(3).fill(null)) : state.history[step - 1];
      const currentPlayer = step % 2 === 0 ? 'X' : 'O';
      const winner = calculateWinner(board);
      return {
        ...state,
        board,
        currentPlayer,
        winner,
      };
    }
    default:
      return state;
  }
}

function calculateWinner(board: Board): Player | 'draw' | null {
  const lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  if (board.flat().every(cell => cell !== null)) {
    return 'draw';
  }
  return null;
}

const initialState: GameState = {
  board: Array(3).fill(null).map(() => Array(3).fill(null)),
  currentPlayer: 'X',
  winner: null,
  history: [],
};

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleClick = (row: number, col: number) => {
    dispatch({ type: 'MAKE_MOVE', row, col });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleJumpTo = (step: number) => {
    dispatch({ type: 'JUMP_TO', step });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board board={state.board} onClick={handleClick} />
      </div>
      <div className="game-info">
        <Status winner={state.winner} currentPlayer={state.currentPlayer} />
        <button className="restart" onClick={handleReset}>Restart</button>
        <History history={state.history} onJumpTo={handleJumpTo} />
      </div>
    </div>
  );
}

function Board({ board, onClick }: { board: Board; onClick: (r: number, c: number) => void }) {
  return (
    <div className="board">
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Square key={`${r}-${c}`} value={cell} onClick={() => onClick(r, c)} />
        ))
      )}
    </div>
  );
}

function Square({ value, onClick }: { value: Player | null; onClick: () => void }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Status({ winner, currentPlayer }: { winner: Player | 'draw' | null; currentPlayer: Player }) {
  if (winner === 'draw') return <div className="status">Draw!</div>;
  if (winner) return <div className="status">Winner: {winner}</div>;
  return <div className="status">Next Player: {currentPlayer}</div>;
}

function History({ history, onJumpTo }: { history: Board[]; onJumpTo: (step: number) => void }) {
  return (
    <div className="history">
      <h3>Move History</h3>
      <ol>
        <li>
          <button onClick={() => onJumpTo(0)}>Go to game start</button>
        </li>
        {history.map((_, step) => (
          <li key={step}>
            <button onClick={() => onJumpTo(step + 1)}>Go to move #{step + 1}</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
