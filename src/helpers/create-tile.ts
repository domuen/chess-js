import { ColumnString, PieceID, RowNumber, Tile } from "../types";

const createTile = (
  dark: boolean,
  white: boolean,
  tile: [ColumnString, RowNumber],
  piece?: PieceID
): Tile => ({
  dark, white, tile, piece
});

export default createTile;
