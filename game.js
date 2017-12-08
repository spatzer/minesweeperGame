import { Board } from './board';
class Game
{
  constructor(numberOfRows, numberOfColumns, numberOfBombs)
  {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex)
  {
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex, columnIndex] === 'B')
    {
      console.log("Game over!");
      this._board.printBoard();
    }
    else if(!this._board.hasSafeTiles())
    {
      console.log("You have won!!!");
    }
    else
    {
      console.log("Current Board:");
      this._board.printBoard();
    }
  }
};


const g = new Game(3,3,3);
g.playMove(0,0);
