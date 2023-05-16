import { ChessBoard, Tile, TileCoords } from "../types";
import findTileIndex from "./find-tile-index";
import mL from "./math-letter";

// currently hard coding move checks
// will eventually switch to loops
// also need conditional moves such as 
// pawn takes and preventing king check moves

const getKingMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: TileCoords[] = [];

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  // remove 1 from `boardIndex` to move one row up
  // remove 1 from `rowIndex` to go one column back
  const tileTL = board?.[boardIndex! - 1]?.[rowIndex! - 1];
  const tileT = board?.[boardIndex! - 1]?.[rowIndex!];
  const tileTR = board?.[boardIndex! - 1]?.[rowIndex! + 1];
  const tileR = board?.[boardIndex!]?.[rowIndex! + 1];
  const tileBR = board?.[boardIndex! + 1]?.[rowIndex! + 1];
  const tileB = board?.[boardIndex! + 1]?.[rowIndex!];
  const tileBL = board?.[boardIndex! + 1]?.[rowIndex! - 1];
  const tileL = board?.[boardIndex!]?.[rowIndex! - 1];

  if (!!tileTL && tileTL.white !== tile.white) moveArray.push(tileTL.tile);
  if (!!tileT && tileT.white !== tile.white) moveArray.push(tileT.tile);
  if (!!tileTR && tileTR.white !== tile.white) moveArray.push(tileTR.tile);
  if (!!tileR && tileR.white !== tile.white) moveArray.push(tileR.tile);
  if (!!tileBR && tileBR.white !== tile.white) moveArray.push(tileBR.tile);
  if (!!tileB && tileB.white !== tile.white) moveArray.push(tileB.tile);
  if (!!tileBL && tileBL.white !== tile.white) moveArray.push(tileBL.tile);
  if (!!tileL && tileL.white !== tile.white) moveArray.push(tileL.tile);

  return moveArray.filter(t => (!!t[0] && !!t[1]));
};

const getPawnMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: any[] = [];

  const l = tile.tile[0];
  const n = tile.tile[1];

  if (!tile.white) {
    const [boardIndex, rowIndex] = findTileIndex(board, tile);

    const leftDiagonal = board[boardIndex! + 1]?.[rowIndex! - 1];
    const rightDiagonal = board[boardIndex! + 1]?.[rowIndex! + 1];

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
  const moveArray: TileCoords[] = [];

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  const tileTL1 = board?.[boardIndex! - 1]?.[rowIndex! - 2];
  const tileTL2 = board?.[boardIndex! - 2]?.[rowIndex! - 1];
  const tileTR1 = board?.[boardIndex! - 2]?.[rowIndex! + 1];
  const tileTR2 = board?.[boardIndex! - 1]?.[rowIndex! + 2];
  const tileBR1 = board?.[boardIndex! + 1]?.[rowIndex! + 2];
  const tileBR2 = board?.[boardIndex! + 2]?.[rowIndex! + 1];
  const tileBL1 = board?.[boardIndex! + 2]?.[rowIndex! - 1];
  const tileBL2 = board?.[boardIndex! + 1]?.[rowIndex! - 2];

  if (!!tileTL1 && tileTL1.white !== tile.white) moveArray.push(tileTL1.tile);
  if (!!tileTL2 && tileTL2.white !== tile.white) moveArray.push(tileTL2.tile);
  if (!!tileTR1 && tileTR1.white !== tile.white) moveArray.push(tileTR1.tile);
  if (!!tileTR2 && tileTR2.white !== tile.white) moveArray.push(tileTR2.tile);
  if (!!tileBR1 && tileBR1.white !== tile.white) moveArray.push(tileBR1.tile);
  if (!!tileBR2 && tileBR2.white !== tile.white) moveArray.push(tileBR2.tile);
  if (!!tileBL1 && tileBL1.white !== tile.white) moveArray.push(tileBL1.tile);
  if (!!tileBL2 && tileBL2.white !== tile.white) moveArray.push(tileBL2.tile);

  return moveArray.filter(t => (!!t[0] && !!t[1]));

};

const getBishopMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: any[] = [];

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  // top left diagonal moves
  const tileTL1 = board?.[boardIndex! - 1]?.[rowIndex! - 1];
  const tileTL2 = board?.[boardIndex! - 2]?.[rowIndex! - 2];
  const tileTL3 = board?.[boardIndex! - 3]?.[rowIndex! - 3];
  const tileTL4 = board?.[boardIndex! - 4]?.[rowIndex! - 4];
  const tileTL5 = board?.[boardIndex! - 5]?.[rowIndex! - 5];
  const tileTL6 = board?.[boardIndex! - 6]?.[rowIndex! - 6];
  const tileTL7 = board?.[boardIndex! - 7]?.[rowIndex! - 7];

  // top right diaganoal moves
  const tileTR1 = board?.[boardIndex! - 1]?.[rowIndex! + 1];
  const tileTR2 = board?.[boardIndex! - 2]?.[rowIndex! + 2];
  const tileTR3 = board?.[boardIndex! - 3]?.[rowIndex! + 3];
  const tileTR4 = board?.[boardIndex! - 4]?.[rowIndex! + 4];
  const tileTR5 = board?.[boardIndex! - 5]?.[rowIndex! + 5];
  const tileTR6 = board?.[boardIndex! - 6]?.[rowIndex! + 6];
  const tileTR7 = board?.[boardIndex! - 7]?.[rowIndex! + 7];

  // bottom right diagonal moves
  const tileBR1 = board?.[boardIndex! + 1]?.[rowIndex! + 1];
  const tileBR2 = board?.[boardIndex! + 2]?.[rowIndex! + 2];
  const tileBR3 = board?.[boardIndex! + 3]?.[rowIndex! + 3];
  const tileBR4 = board?.[boardIndex! + 4]?.[rowIndex! + 4];
  const tileBR5 = board?.[boardIndex! + 5]?.[rowIndex! + 5];
  const tileBR6 = board?.[boardIndex! + 6]?.[rowIndex! + 6];
  const tileBR7 = board?.[boardIndex! + 7]?.[rowIndex! + 7];

  // bottom left diagonal moves
  const tileBL1 = board?.[boardIndex! + 1]?.[rowIndex! - 1];
  const tileBL2 = board?.[boardIndex! + 2]?.[rowIndex! - 2];
  const tileBL3 = board?.[boardIndex! + 3]?.[rowIndex! - 3];
  const tileBL4 = board?.[boardIndex! + 4]?.[rowIndex! - 4];
  const tileBL5 = board?.[boardIndex! + 5]?.[rowIndex! - 5];
  const tileBL6 = board?.[boardIndex! + 6]?.[rowIndex! - 6];
  const tileBL7 = board?.[boardIndex! + 7]?.[rowIndex! - 7];

  if (!!tileTL1 && tileTL1.white !== tile.white) moveArray.push(tileTL1.tile);
  if (!!tileTL2 && tileTL2.white !== tile.white) moveArray.push(tileTL2.tile);
  if (!!tileTL3 && tileTL3.white !== tile.white) moveArray.push(tileTL3.tile);
  if (!!tileTL4 && tileTL4.white !== tile.white) moveArray.push(tileTL4.tile);
  if (!!tileTL5 && tileTL5.white !== tile.white) moveArray.push(tileTL5.tile);
  if (!!tileTL6 && tileTL6.white !== tile.white) moveArray.push(tileTL6.tile);
  if (!!tileTL7 && tileTL7.white !== tile.white) moveArray.push(tileTL7.tile);

  if (!!tileTR1 && tileTR1.white !== tile.white) moveArray.push(tileTR1.tile);
  if (!!tileTR2 && tileTR2.white !== tile.white) moveArray.push(tileTR2.tile);
  if (!!tileTR3 && tileTR3.white !== tile.white) moveArray.push(tileTR3.tile);
  if (!!tileTR4 && tileTR4.white !== tile.white) moveArray.push(tileTR4.tile);
  if (!!tileTR5 && tileTR5.white !== tile.white) moveArray.push(tileTR5.tile);
  if (!!tileTR6 && tileTR6.white !== tile.white) moveArray.push(tileTR6.tile);
  if (!!tileTR7 && tileTR7.white !== tile.white) moveArray.push(tileTR7.tile);

  if (!!tileBR1 && tileBR1.white !== tile.white) moveArray.push(tileBR1.tile);
  if (!!tileBR2 && tileBR2.white !== tile.white) moveArray.push(tileBR2.tile);
  if (!!tileBR3 && tileBR3.white !== tile.white) moveArray.push(tileBR3.tile);
  if (!!tileBR4 && tileBR4.white !== tile.white) moveArray.push(tileBR4.tile);
  if (!!tileBR5 && tileBR5.white !== tile.white) moveArray.push(tileBR5.tile);
  if (!!tileBR6 && tileBR6.white !== tile.white) moveArray.push(tileBR6.tile);
  if (!!tileBR7 && tileBR7.white !== tile.white) moveArray.push(tileBR7.tile);

  if (!!tileBL1 && tileBL1.white !== tile.white) moveArray.push(tileBL1.tile);
  if (!!tileBL2 && tileBL2.white !== tile.white) moveArray.push(tileBL2.tile);
  if (!!tileBL3 && tileBL3.white !== tile.white) moveArray.push(tileBL3.tile);
  if (!!tileBL4 && tileBL4.white !== tile.white) moveArray.push(tileBL4.tile);
  if (!!tileBL5 && tileBL5.white !== tile.white) moveArray.push(tileBL5.tile);
  if (!!tileBL6 && tileBL6.white !== tile.white) moveArray.push(tileBL6.tile);
  if (!!tileBL7 && tileBL7.white !== tile.white) moveArray.push(tileBL7.tile);

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
