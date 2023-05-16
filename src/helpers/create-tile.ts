import { PieceID, Tile, TileCoords } from "../types";

const createTile = (
  dark: boolean,
  white: boolean | undefined,
  tile: TileCoords,
  piece?: PieceID,
  moved?: boolean
): Tile => ({ dark, white, tile, piece, moved });

export default createTile;
