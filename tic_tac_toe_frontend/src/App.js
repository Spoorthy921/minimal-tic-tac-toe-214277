import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * Returns the winner ("X" or "O") for the provided board, or null if no winner.
 * Board is an array of 9 items, each: "X" | "O" | null.
 */
function calculateWinner(board) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  /** This is the main Tic-Tac-Toe game view. */
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(() => !winner && board.every((c) => c !== null), [board, winner]);
  const isGameOver = Boolean(winner) || isDraw;

  const statusText = useMemo(() => {
    if (winner) return `${winner} wins!`;
    if (isDraw) return "It's a draw.";
    return `${currentPlayer}'s turn`;
  }, [winner, isDraw, currentPlayer]);

  const statusVariant = useMemo(() => {
    if (winner) return "is-win";
    if (isDraw) return "is-draw";
    return "";
  }, [winner, isDraw]);

  // PUBLIC_INTERFACE
  function handleSquareClick(index) {
    /** Handles user clicks on a square; ignores clicks when invalid or game ended. */
    if (isGameOver) return;
    if (board[index] !== null) return;

    setBoard((prev) => {
      const next = prev.slice();
      next[index] = currentPlayer;
      return next;
    });
    setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    /** Resets board state and sets the current player back to "X". */
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }

  return (
    <div className="App">
      <main className="game-shell">
        <header className="game-header">
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <p className="game-subtitle">A simple, minimal Tic-Tac-Toe.</p>
        </header>

        <section className="game-panel" aria-label="Tic-Tac-Toe game">
          <div className="status-row" role="status" aria-live="polite" aria-atomic="true">
            <span
              className={`status-pill ${statusVariant}`}
              data-testid="game-status"
              id="game-status"
            >
              {statusText}
            </span>
          </div>

          <div
            className="board"
            role="grid"
            aria-label="3 by 3 board"
            aria-describedby="game-status"
            data-testid="board"
          >
            {board.map((value, idx) => {
              const isDisabled = isGameOver || value !== null;
              const row = Math.floor(idx / 3) + 1;
              const col = (idx % 3) + 1;

              // For screen readers: keep the label stable and informative.
              const cellValueText = value ? `, ${value}` : ", empty";
              const isPlayableText = isDisabled ? ", not playable" : ", playable";

              return (
                <button
                  key={idx}
                  type="button"
                  className={`square ${value ? "is-filled" : ""} ${
                    value === "X" ? "is-x" : value === "O" ? "is-o" : ""
                  }`}
                  onClick={() => handleSquareClick(idx)}
                  disabled={isDisabled}
                  aria-label={`Row ${row}, column ${col}${cellValueText}${isPlayableText}`}
                  aria-disabled={isDisabled}
                  role="gridcell"
                  data-testid={`square-${idx}`}
                >
                  <span className="square-mark" aria-hidden="true">
                    {value ?? ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="controls">
            <button type="button" className="btn-reset" onClick={resetGame}>
              Reset
            </button>
          </div>
        </section>

        <footer className="game-footer">
          <small className="hint">
            Tip: Use Tab to focus a square, then press Enter/Space to play. Game ends on win or
            draw.
          </small>
        </footer>
      </main>
    </div>
  );
}

export default App;
