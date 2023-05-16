import { PieceID, Tile, TileCoords } from "../types";

const createTile = (
  dark: boolean,
  white: boolean | undefined,
  tile: TileCoords,
  piece?: PieceID
): Tile => ({ dark, white, tile, piece });

export default createTile;
