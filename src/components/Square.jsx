import { motion } from "framer-motion";
import "./Square.css";

const Square = ({ itemId, showSquares, playerTurn }) => {
  const handleClick = () => {
    showSquares(itemId);
  };
  return (
    <div className="square" onClick={handleClick}>
      {playerTurn}
    </div>
  );
};

export default Square;
