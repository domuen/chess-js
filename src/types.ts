export interface Tile {
  dark: boolean;
  white: boolean;
  tile: [ColumnString, RowNumber];
  piece?: PieceID | undefined;
}

export type PieceID = 0 | 1 | 2 | 3 | 4 | 5;

export type Row = [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile];
export type ChessBoard = [Row, Row, Row, Row, Row, Row, Row, Row];

export type ColumnString = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
export type RowNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SelectedTile = Tile | undefined;
export type MoveTiles = [ColumnString, RowNumber][] | undefined;
