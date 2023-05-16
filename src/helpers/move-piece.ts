import { ChessBoard, ColumnString, RowNumber, Tile } from "../types";
import createTile from "./create-tile";
import findTileIndex from "./find-tile-index";

const movePiece = (board: ChessBoard, tile: Tile, newTile: Tile): ChessBoard => {
  const spreadBoard = [...board];

  const [boardIndex, tileIndex] = findTileIndex(board, tile);

  // remove piece from old location
  const capturedRow = [...spreadBoard[boardIndex!]];
  capturedRow.splice(tileIndex!, 1, createTile(tile.dark, undefined, tile.tile));

  // @ts-ignore
  spreadBoard.splice(boardIndex!, 1, capturedRow);

  // add piece to new location
  const [boardIndex2, tileIndex2] = findTileIndex(board, newTile);

  const capturedRow2 = [...spreadBoard[boardIndex2!]];
  capturedRow2.splice(tileIndex2!, 1, createTile(newTile.dark, tile.white, newTile.tile, tile.piece!, true));

  // @ts-ignore
  spreadBoard.splice(boardIndex2!, 1, capturedRow2);

  // @ts-ignore
  return spreadBoard;
};

export default movePiece;
