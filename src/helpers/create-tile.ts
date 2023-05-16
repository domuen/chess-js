import { PieceID, Tile, TileCoords } from "../types";

const createTile = (
  dark: boolean,
  white: boolean,
  tile: TileCoords,
  piece?: PieceID
): Tile => ({ dark, white, tile, piece });

export default createTile;
