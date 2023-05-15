import { ChessBoard, Tile } from "../types";

const findTileIndex = (board: ChessBoard, tile: Tile) => {
  let boardIndex: number | undefined;
  let rowIndex: number | undefined;

  board.some((r, i) => {
    const result = r.some((t, i2) => {
      if ((t.tile[0] === tile.tile[0]) && (t.tile[1] === tile.tile[1])) {
        rowIndex = i2; // capture index and break
        return true;
      }
    });

    if (result) {
      boardIndex = i;  // capture index and break
      return;
    }
  });

  return [boardIndex, rowIndex];
};

export default findTileIndex;
