export interface Tile {
  dark: boolean;
  white: boolean | undefined;
  tile: TileCoords;
  piece?: PieceID | undefined;
  moved?: boolean;
}

export type TileCoords = [ColumnString, RowNumber];
export type PieceID = 0 | 1 | 2 | 3 | 4 | 5;

export type Row = [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile];
export type ChessBoard = [Row, Row, Row, Row, Row, Row, Row, Row];

export type ColumnString = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type RowNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// overrides cause why not
interface BasePassant { coords: TileCoords; }
export interface LeftPassant extends BasePassant { l: true; }
interface RightPassant extends BasePassant { r: true; }

type Passants = LeftPassant | RightPassant;

export interface Extra {
  passants: Passants[];
}
