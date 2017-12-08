export class Board
{
  constructor(numberOfRows, numberOfColumns, numberOfBombs)
  {
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {return this._playerBoard;}
  flipTile(rowIndex, columnIndex)
  {
    if(this._playerBoard[rowIndex][columnIndex] !== ' ')
    {
      console.log("This tile has already been flipped!");
      return;
    }
    else if(this._bombBoard[rowIndex][columnIndex] === 'B')
    {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else
    {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }
  getNumberOfNeighborBombs(rowIndex, columnIndex)
  {
    const neighborTiles =
      [[-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numBombs = 0;
    neighborTiles.forEach(offset =>
      {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if(neighborRowIndex >= 0 && neighborRowIndex !== numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex !== numberOfColumns)
        {
          if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B')
          {
            numBombs++;
          }
        }

      });
      return numBombs;
  }
  hasSafeTiles()
  {
    return this._numberOfTiles !== this.numberOfBombs;
  }
  printBoard()
  {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  static generatePlayerBoard(numRows, numColumns)
  {
    let board = [];
    for(let rows = 0; rows < numRows; rows++)
    {
      let row = [];
      for(let cols = 0; cols < numColumns; cols++)
      {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numRows, numColumns, numBombs)
  {
    let board = [];
    for(let rows = 0; rows < numRows; rows++)
    {
      let row = [];
      for(let cols = 0; cols < numColumns; cols++)
      {
        row.push(null);
      }
      board.push(row);
    }
    let numBombsPlaced = 0;
    while (numBombsPlaced < numBombs)
    {
      //what about bombs on bombs?
      let randomRowIndex = Math.floor(Math.random()*numRows);
      let randomColIndex = Math.floor(Math.random()*numColumns);
      if(board[randomRowIndex][randomColIndex] !== 'B')
      {
        board[randomRowIndex][randomColIndex] = 'B';
        numBombsPlaced ++;
      }

    }
    return board;
  }

}
