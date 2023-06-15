import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Square from "./components/Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const Button = ({ resetGame }) => {
    return <button onClick={() => resetGame()}>New Game</button>;
  };

  const checkforDraw = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const chechForWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const showSquares = (itemId) => {
    if (squares[itemId] || winner) {
      return;
    }
    const newSquare = squares;
    newSquare[itemId] = player;
    setSquares(newSquare);
    setPlayer(player === "X" ? "O" : "X");
    const checkWinner = chechForWinner();
    if (checkWinner) {
      setWinner(checkWinner);
    } else if (checkforDraw()) {
      setWinner("X | O");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="tic-tac-toe">
        <h1>TIC-TAC-TOE</h1>
        <Button resetGame={resetGame} />
        <div className="gameBox">
          {Array.from("012345678").map((itemId) => (
            <Square
              key={itemId}
              itemId={itemId}
              showSquares={showSquares}
              playerTurn={squares[itemId]}
            />
          ))}
        </div>
        <div className={`player ${player === "X" ? "left" : "right"}`}>
          <Square playerTurn="X" />
          <Square playerTurn="O" />
        </div>
        <AnimatePresence>
          {winner && (
            <motion.div
              key={"parent-box"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="winner"
            >
              <motion.div
                key={"child-box"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text"
              >
                <motion.h2
                  initial={{ scale: 0, y: 100 }}
                  animate={{
                    scale: 1,
                    y: 0,
                    transition: {
                      y: { delay: 0.7 },
                      duration: 0.7,
                    },
                  }}
                >
                  {winner === "X | O" ? "No Winner" : "Winner !!"}
                </motion.h2>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      delay: 1.3,
                      duration: 0.2,
                    },
                  }}
                  className="win"
                >
                  {winner === "X | O" ? (
                    <>
                      <Square playerTurn="X" />
                      <Square playerTurn="O" />
                    </>
                  ) : (
                    <>
                      <Square playerTurn={winner} />
                    </>
                  )}
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { delay: 1.5, duration: 0.3 },
                  }}
                >
                  <Button resetGame={resetGame} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
