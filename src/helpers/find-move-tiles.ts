import { PieceID, ColumnString, RowNumber, ChessBoard, Tile } from "../types";
import findTileIndex from "./find-tile-index";
import mL from "./math-letter";

// currently hard coding move checks
// will eventually switch to loops
// also need conditional moves such as 
// pawn takes and preventing king check moves

const numArrIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];

const checkAndPush = () => { };

const getKingMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  moveArray.push([mL(l, "-"), n + 1]);
  moveArray.push([l, n + 1]);
  moveArray.push([mL(l, "+"), n + 1]);
  moveArray.push([mL(l, "-"), n]);
  moveArray.push([mL(l, "+"), n]);
  moveArray.push([mL(l, "-"), n - 1]);
  moveArray.push([l, n - 1]);
  moveArray.push([mL(l, "+"), n - 1]);

  return moveArray.filter(t => (!!t[0] && !!t[1]));
};

const getPawnMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  if (!tile.white) {
    const [boardIndex, rowIndex] = findTileIndex(board, tile);

    const leftDiagonal = board[boardIndex! + 1]?.[rowIndex! - 1];
    const rightDiagonal = board[boardIndex! + 1]?.[rowIndex! + 1];

    console.log(leftDiagonal, rightDiagonal);

    if (!!leftDiagonal?.piece && leftDiagonal?.white !== tile.white) moveArray.push([mL(l, "-"), n - 1]);
    if (!!rightDiagonal?.piece && rightDiagonal?.white !== tile.white) moveArray.push([mL(l, "+"), n - 1]);

    moveArray.push([l, n - 1]);
    moveArray.push([l, n - 2]);
  } else {
    const [boardIndex, rowIndex] = findTileIndex(board, tile);

    const leftDiagonal = board[boardIndex! - 1]?.[rowIndex! - 1];
    const rightDiagonal = board[boardIndex! - 1]?.[rowIndex! + 1];

    if (!!leftDiagonal?.piece && leftDiagonal?.white !== tile.white) moveArray.push([mL(l, "-"), n + 1]);
    if (!!rightDiagonal?.piece && rightDiagonal?.white !== tile.white) moveArray.push([mL(l, "+"), n + 1]);

    moveArray.push([l, n + 1]);
    moveArray.push([l, n + 2]);
  }

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  const leftDiagonal = board[boardIndex! - 1]?.[rowIndex! - 1];
  const rightDiagonal = board[boardIndex! - 1]?.[rowIndex! + 1];

  if (!!leftDiagonal?.piece && leftDiagonal?.white !== tile.white) moveArray.push([mL(l, "-"), n + 1]);
  if (!!rightDiagonal?.piece && rightDiagonal?.white !== tile.white) moveArray.push([mL(l, "+"), n + 1]);

  return moveArray.filter(t => (!!t[0] && !!t[1]));
};

const getKnightMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: any[] = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  moveArray.push([mL(l, "-"), n + 2]);
  moveArray.push([mL(l, "+"), n + 2]);
  moveArray.push([mL(l, "+", 2), n + 1]);
  moveArray.push([mL(l, "+", 2), n - 1]);
  moveArray.push([mL(l, "+"), n - 2]);
  moveArray.push([mL(l, "-"), n - 2]);
  moveArray.push([mL(l, "-", 2), n - 1]);
  moveArray.push([mL(l, "-", 2), n + 1]);

  return moveArray.filter(t => (!!t[0] && !!t[1]));

};

const getBishopMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: any[] = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  moveArray.push([mL(l, "+"), n + 1]);
  moveArray.push([mL(l, "+", 2), n + 2]);
  moveArray.push([mL(l, "+", 3), n + 3]);
  moveArray.push([mL(l, "+", 4), n + 4]);
  moveArray.push([mL(l, "+", 5), n + 5]);
  moveArray.push([mL(l, "+", 6), n + 6]);
  moveArray.push([mL(l, "+", 7), n + 7]);

  moveArray.push([mL(l, "+"), n - 1]);
  moveArray.push([mL(l, "+", 2), n - 2]);
  moveArray.push([mL(l, "+", 3), n - 3]);
  moveArray.push([mL(l, "+", 4), n - 4]);
  moveArray.push([mL(l, "+", 5), n - 5]);
  moveArray.push([mL(l, "+", 6), n - 6]);
  moveArray.push([mL(l, "+", 7), n - 7]);

  moveArray.push([mL(l, "-"), n - 1]);
  moveArray.push([mL(l, "-", 2), n - 2]);
  moveArray.push([mL(l, "-", 3), n - 3]);
  moveArray.push([mL(l, "-", 4), n - 4]);
  moveArray.push([mL(l, "-", 5), n - 5]);
  moveArray.push([mL(l, "-", 6), n - 6]);
  moveArray.push([mL(l, "-", 7), n - 7]);

  moveArray.push([mL(l, "-"), n + 1]);
  moveArray.push([mL(l, "-", 2), n + 2]);
  moveArray.push([mL(l, "-", 3), n + 3]);
  moveArray.push([mL(l, "-", 4), n + 4]);
  moveArray.push([mL(l, "-", 5), n + 5]);
  moveArray.push([mL(l, "-", 6), n + 6]);
  moveArray.push([mL(l, "-", 7), n + 7]);

  return moveArray.filter(t => (!!t[0] && !!t[1]));

};

const getRookMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: any[] = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  moveArray.push([l, n + 1]);
  moveArray.push([l, n + 2]);
  moveArray.push([l, n + 3]);
  moveArray.push([l, n + 4]);
  moveArray.push([l, n + 5]);
  moveArray.push([l, n + 6]);
  moveArray.push([l, n + 7]);

  moveArray.push([mL(l, "+"), n]);
  moveArray.push([mL(l, "+", 2), n]);
  moveArray.push([mL(l, "+", 3), n]);
  moveArray.push([mL(l, "+", 4), n]);
  moveArray.push([mL(l, "+", 5), n]);
  moveArray.push([mL(l, "+", 6), n]);
  moveArray.push([mL(l, "+", 7), n]);

  moveArray.push([l, n - 1]);
  moveArray.push([l, n - 2]);
  moveArray.push([l, n - 3]);
  moveArray.push([l, n - 4]);
  moveArray.push([l, n - 5]);
  moveArray.push([l, n - 6]);
  moveArray.push([l, n - 7]);

  moveArray.push([mL(l, "-"), n]);
  moveArray.push([mL(l, "-", 2), n]);
  moveArray.push([mL(l, "-", 3), n]);
  moveArray.push([mL(l, "-", 4), n]);
  moveArray.push([mL(l, "-", 5), n]);
  moveArray.push([mL(l, "-", 6), n]);
  moveArray.push([mL(l, "-", 7), n]);

  return moveArray.filter(t => (!!t[0] && !!t[1]));

};

const getQueenMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: any[] = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  // top
  moveArray.push([l, n + 1]);
  moveArray.push([l, n + 2]);
  moveArray.push([l, n + 3]);
  moveArray.push([l, n + 4]);
  moveArray.push([l, n + 5]);
  moveArray.push([l, n + 6]);
  moveArray.push([l, n + 7]);

  // top right diagonal
  moveArray.push([mL(l, "+"), n + 1]);
  moveArray.push([mL(l, "+", 2), n + 2]);
  moveArray.push([mL(l, "+", 3), n + 3]);
  moveArray.push([mL(l, "+", 4), n + 4]);
  moveArray.push([mL(l, "+", 5), n + 5]);
  moveArray.push([mL(l, "+", 6), n + 6]);
  moveArray.push([mL(l, "+", 7), n + 7]);

  // right
  moveArray.push([mL(l, "+"), n]);
  moveArray.push([mL(l, "+", 2), n]);
  moveArray.push([mL(l, "+", 3), n]);
  moveArray.push([mL(l, "+", 4), n]);
  moveArray.push([mL(l, "+", 5), n]);
  moveArray.push([mL(l, "+", 6), n]);
  moveArray.push([mL(l, "+", 7), n]);

  // bottom right diagonal
  moveArray.push([mL(l, "+"), n - 1]);
  moveArray.push([mL(l, "+", 2), n - 2]);
  moveArray.push([mL(l, "+", 3), n - 3]);
  moveArray.push([mL(l, "+", 4), n - 4]);
  moveArray.push([mL(l, "+", 5), n - 5]);
  moveArray.push([mL(l, "+", 6), n - 6]);
  moveArray.push([mL(l, "+", 7), n - 7]);

  // bottom
  moveArray.push([l, n - 1]);
  moveArray.push([l, n - 2]);
  moveArray.push([l, n - 3]);
  moveArray.push([l, n - 4]);
  moveArray.push([l, n - 5]);
  moveArray.push([l, n - 6]);
  moveArray.push([l, n - 7]);

  // bottom left diagonal
  moveArray.push([mL(l, "-"), n - 1]);
  moveArray.push([mL(l, "-", 2), n - 2]);
  moveArray.push([mL(l, "-", 3), n - 3]);
  moveArray.push([mL(l, "-", 4), n - 4]);
  moveArray.push([mL(l, "-", 5), n - 5]);
  moveArray.push([mL(l, "-", 6), n - 6]);
  moveArray.push([mL(l, "-", 7), n - 7]);

  // left
  moveArray.push([mL(l, "-"), n]);
  moveArray.push([mL(l, "-", 2), n]);
  moveArray.push([mL(l, "-", 3), n]);
  moveArray.push([mL(l, "-", 4), n]);
  moveArray.push([mL(l, "-", 5), n]);
  moveArray.push([mL(l, "-", 6), n]);
  moveArray.push([mL(l, "-", 7), n]);

  // top left diagonal
  moveArray.push([mL(l, "-"), n + 1]);
  moveArray.push([mL(l, "-", 2), n + 2]);
  moveArray.push([mL(l, "-", 3), n + 3]);
  moveArray.push([mL(l, "-", 4), n + 4]);
  moveArray.push([mL(l, "-", 5), n + 5]);
  moveArray.push([mL(l, "-", 6), n + 6]);
  moveArray.push([mL(l, "-", 7), n + 7]);

  return moveArray.filter(t => (!!t[0] && !!t[1]));

};

const findMoveTiles = (board: ChessBoard, tile: Tile) => {
  if (tile.piece === 0) return getKingMoves(board, tile);
  if (tile.piece === 1) return getPawnMoves(board, tile);
  if (tile.piece === 2) return getKnightMoves(board, tile);
  if (tile.piece === 3) return getBishopMoves(board, tile);
  if (tile.piece === 4) return getRookMoves(board, tile);
  if (tile.piece === 5) return getQueenMoves(board, tile);
}

export default findMoveTiles;
