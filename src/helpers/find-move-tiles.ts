import { ChessBoard, Tile, TileCoords, Extra } from "../types";
import cC from "./compare-coords";
import findTileIndex from "./find-tile-index";

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

  return moveArray;
};

const getPawnMoves = (board: ChessBoard, tile: Tile, extra: Extra) => {
  const moveArray: TileCoords[] = [];

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  // not sure how to fix this
  // @ts-ignore
  const hasLeftPassant = extra.passants.some(c => !!c.l && cC(c.coords, tile.tile));
  // @ts-ignore
  const hasRightPassant = extra.passants.some(c => !!c.r && cC(c.coords, tile.tile));

  if (!tile.white) {
    const tileT1 = board[boardIndex! + 1]?.[rowIndex!];
    const tileT2 = board[boardIndex! + 2]?.[rowIndex!];

    const tileBL = board[boardIndex! + 1]?.[rowIndex! - 1];
    const tileBR = board[boardIndex! + 1]?.[rowIndex! + 1];

    // prevent forward takes
    if (!!tileT2 && !tileT1.piece) moveArray.push(tileT1.tile);
    if (!!tileT2 && !tileT2.piece && !tile.moved) moveArray.push(tileT2.tile);

    // diagonal takes
    if (hasLeftPassant || !!tileBL?.piece && tileBL?.white !== tile.white) moveArray.push(tileBL.tile);
    if (hasRightPassant || !!tileBR?.piece && tileBR?.white !== tile.white) moveArray.push(tileBR.tile);
  } else {
    const tileT1 = board[boardIndex! - 1]?.[rowIndex!];
    const tileT2 = board[boardIndex! - 2]?.[rowIndex!];

    const tileTL = board[boardIndex! - 1]?.[rowIndex! - 1];
    const tileTR = board[boardIndex! - 1]?.[rowIndex! + 1];

    if (!!tileT1 && !tileT1.piece) moveArray.push(tileT1.tile);
    if (!!tileT2 && !tileT2.piece && !tile.moved) moveArray.push(tileT2.tile);

    if (hasLeftPassant || !!tileTL?.piece && tileTL?.white !== tile.white) moveArray.push(tileTL.tile);
    if (hasRightPassant || !!tileTR?.piece && tileTR?.white !== tile.white) moveArray.push(tileTR.tile);

  }

  return moveArray;
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

  return moveArray;
};

const getBishopMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: TileCoords[] = [];

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

  return moveArray;
};

const getRookMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: TileCoords[] = [];

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  // top moves
  const tileT1 = board?.[boardIndex! + 1]?.[rowIndex!];
  const tileT2 = board?.[boardIndex! + 2]?.[rowIndex!];
  const tileT3 = board?.[boardIndex! + 3]?.[rowIndex!];
  const tileT4 = board?.[boardIndex! + 4]?.[rowIndex!];
  const tileT5 = board?.[boardIndex! + 5]?.[rowIndex!];
  const tileT6 = board?.[boardIndex! + 6]?.[rowIndex!];
  const tileT7 = board?.[boardIndex! + 7]?.[rowIndex!];

  // right moves
  const tileR1 = board?.[boardIndex!]?.[rowIndex! + 1];
  const tileR2 = board?.[boardIndex!]?.[rowIndex! + 2];
  const tileR3 = board?.[boardIndex!]?.[rowIndex! + 3];
  const tileR4 = board?.[boardIndex!]?.[rowIndex! + 4];
  const tileR5 = board?.[boardIndex!]?.[rowIndex! + 5];
  const tileR6 = board?.[boardIndex!]?.[rowIndex! + 6];
  const tileR7 = board?.[boardIndex!]?.[rowIndex! + 7];

  // bottom moves
  const tileB1 = board?.[boardIndex! - 1]?.[rowIndex!];
  const tileB2 = board?.[boardIndex! - 2]?.[rowIndex!];
  const tileB3 = board?.[boardIndex! - 3]?.[rowIndex!];
  const tileB4 = board?.[boardIndex! - 4]?.[rowIndex!];
  const tileB5 = board?.[boardIndex! - 5]?.[rowIndex!];
  const tileB6 = board?.[boardIndex! - 6]?.[rowIndex!];
  const tileB7 = board?.[boardIndex! - 7]?.[rowIndex!];

  // left moves
  const tileL1 = board?.[boardIndex!]?.[rowIndex! - 1];
  const tileL2 = board?.[boardIndex!]?.[rowIndex! - 2];
  const tileL3 = board?.[boardIndex!]?.[rowIndex! - 3];
  const tileL4 = board?.[boardIndex!]?.[rowIndex! - 4];
  const tileL5 = board?.[boardIndex!]?.[rowIndex! - 5];
  const tileL6 = board?.[boardIndex!]?.[rowIndex! - 6];
  const tileL7 = board?.[boardIndex!]?.[rowIndex! - 7];

  if (!!tileT1 && tileT1.white !== tile.white) moveArray.push(tileT1.tile);
  if (!!tileT2 && tileT2.white !== tile.white) moveArray.push(tileT2.tile);
  if (!!tileT3 && tileT3.white !== tile.white) moveArray.push(tileT3.tile);
  if (!!tileT4 && tileT4.white !== tile.white) moveArray.push(tileT4.tile);
  if (!!tileT5 && tileT5.white !== tile.white) moveArray.push(tileT5.tile);
  if (!!tileT6 && tileT6.white !== tile.white) moveArray.push(tileT6.tile);
  if (!!tileT7 && tileT7.white !== tile.white) moveArray.push(tileT7.tile);

  if (!!tileR1 && tileR1.white !== tile.white) moveArray.push(tileR1.tile);
  if (!!tileR2 && tileR2.white !== tile.white) moveArray.push(tileR2.tile);
  if (!!tileR3 && tileR3.white !== tile.white) moveArray.push(tileR3.tile);
  if (!!tileR4 && tileR4.white !== tile.white) moveArray.push(tileR4.tile);
  if (!!tileR5 && tileR5.white !== tile.white) moveArray.push(tileR5.tile);
  if (!!tileR6 && tileR6.white !== tile.white) moveArray.push(tileR6.tile);
  if (!!tileR7 && tileR7.white !== tile.white) moveArray.push(tileR7.tile);

  if (!!tileB1 && tileB1.white !== tile.white) moveArray.push(tileB1.tile);
  if (!!tileB2 && tileB2.white !== tile.white) moveArray.push(tileB2.tile);
  if (!!tileB3 && tileB3.white !== tile.white) moveArray.push(tileB3.tile);
  if (!!tileB4 && tileB4.white !== tile.white) moveArray.push(tileB4.tile);
  if (!!tileB5 && tileB5.white !== tile.white) moveArray.push(tileB5.tile);
  if (!!tileB6 && tileB6.white !== tile.white) moveArray.push(tileB6.tile);
  if (!!tileB7 && tileB7.white !== tile.white) moveArray.push(tileB7.tile);

  if (!!tileL1 && tileL1.white !== tile.white) moveArray.push(tileL1.tile);
  if (!!tileL2 && tileL2.white !== tile.white) moveArray.push(tileL2.tile);
  if (!!tileL3 && tileL3.white !== tile.white) moveArray.push(tileL3.tile);
  if (!!tileL4 && tileL4.white !== tile.white) moveArray.push(tileL4.tile);
  if (!!tileL5 && tileL5.white !== tile.white) moveArray.push(tileL5.tile);
  if (!!tileL6 && tileL6.white !== tile.white) moveArray.push(tileL6.tile);
  if (!!tileL7 && tileL7.white !== tile.white) moveArray.push(tileL7.tile);

  return moveArray;
};

const getQueenMoves = (board: ChessBoard, tile: Tile) => {
  const moveArray: TileCoords[] = [];

  const [boardIndex, rowIndex] = findTileIndex(board, tile);

  // top left diagonal moves
  const tileTL1 = board?.[boardIndex! - 1]?.[rowIndex! - 1];
  const tileTL2 = board?.[boardIndex! - 2]?.[rowIndex! - 2];
  const tileTL3 = board?.[boardIndex! - 3]?.[rowIndex! - 3];
  const tileTL4 = board?.[boardIndex! - 4]?.[rowIndex! - 4];
  const tileTL5 = board?.[boardIndex! - 5]?.[rowIndex! - 5];
  const tileTL6 = board?.[boardIndex! - 6]?.[rowIndex! - 6];
  const tileTL7 = board?.[boardIndex! - 7]?.[rowIndex! - 7];

  // top moves
  const tileT1 = board?.[boardIndex! + 1]?.[rowIndex!];
  const tileT2 = board?.[boardIndex! + 2]?.[rowIndex!];
  const tileT3 = board?.[boardIndex! + 3]?.[rowIndex!];
  const tileT4 = board?.[boardIndex! + 4]?.[rowIndex!];
  const tileT5 = board?.[boardIndex! + 5]?.[rowIndex!];
  const tileT6 = board?.[boardIndex! + 6]?.[rowIndex!];
  const tileT7 = board?.[boardIndex! + 7]?.[rowIndex!];

  // top right diaganoal moves
  const tileTR1 = board?.[boardIndex! - 1]?.[rowIndex! + 1];
  const tileTR2 = board?.[boardIndex! - 2]?.[rowIndex! + 2];
  const tileTR3 = board?.[boardIndex! - 3]?.[rowIndex! + 3];
  const tileTR4 = board?.[boardIndex! - 4]?.[rowIndex! + 4];
  const tileTR5 = board?.[boardIndex! - 5]?.[rowIndex! + 5];
  const tileTR6 = board?.[boardIndex! - 6]?.[rowIndex! + 6];
  const tileTR7 = board?.[boardIndex! - 7]?.[rowIndex! + 7];

  // right moves
  const tileR1 = board?.[boardIndex!]?.[rowIndex! + 1];
  const tileR2 = board?.[boardIndex!]?.[rowIndex! + 2];
  const tileR3 = board?.[boardIndex!]?.[rowIndex! + 3];
  const tileR4 = board?.[boardIndex!]?.[rowIndex! + 4];
  const tileR5 = board?.[boardIndex!]?.[rowIndex! + 5];
  const tileR6 = board?.[boardIndex!]?.[rowIndex! + 6];
  const tileR7 = board?.[boardIndex!]?.[rowIndex! + 7];

  // bottom right diagonal moves
  const tileBR1 = board?.[boardIndex! + 1]?.[rowIndex! + 1];
  const tileBR2 = board?.[boardIndex! + 2]?.[rowIndex! + 2];
  const tileBR3 = board?.[boardIndex! + 3]?.[rowIndex! + 3];
  const tileBR4 = board?.[boardIndex! + 4]?.[rowIndex! + 4];
  const tileBR5 = board?.[boardIndex! + 5]?.[rowIndex! + 5];
  const tileBR6 = board?.[boardIndex! + 6]?.[rowIndex! + 6];
  const tileBR7 = board?.[boardIndex! + 7]?.[rowIndex! + 7];

  // bottom moves
  const tileB1 = board?.[boardIndex! - 1]?.[rowIndex!];
  const tileB2 = board?.[boardIndex! - 2]?.[rowIndex!];
  const tileB3 = board?.[boardIndex! - 3]?.[rowIndex!];
  const tileB4 = board?.[boardIndex! - 4]?.[rowIndex!];
  const tileB5 = board?.[boardIndex! - 5]?.[rowIndex!];
  const tileB6 = board?.[boardIndex! - 6]?.[rowIndex!];
  const tileB7 = board?.[boardIndex! - 7]?.[rowIndex!];

  // bottom left diagonal moves
  const tileBL1 = board?.[boardIndex! + 1]?.[rowIndex! - 1];
  const tileBL2 = board?.[boardIndex! + 2]?.[rowIndex! - 2];
  const tileBL3 = board?.[boardIndex! + 3]?.[rowIndex! - 3];
  const tileBL4 = board?.[boardIndex! + 4]?.[rowIndex! - 4];
  const tileBL5 = board?.[boardIndex! + 5]?.[rowIndex! - 5];
  const tileBL6 = board?.[boardIndex! + 6]?.[rowIndex! - 6];
  const tileBL7 = board?.[boardIndex! + 7]?.[rowIndex! - 7];

  // left moves
  const tileL1 = board?.[boardIndex!]?.[rowIndex! - 1];
  const tileL2 = board?.[boardIndex!]?.[rowIndex! - 2];
  const tileL3 = board?.[boardIndex!]?.[rowIndex! - 3];
  const tileL4 = board?.[boardIndex!]?.[rowIndex! - 4];
  const tileL5 = board?.[boardIndex!]?.[rowIndex! - 5];
  const tileL6 = board?.[boardIndex!]?.[rowIndex! - 6];
  const tileL7 = board?.[boardIndex!]?.[rowIndex! - 7];

  if (!!tileTL1 && tileTL1.white !== tile.white) moveArray.push(tileTL1.tile);
  if (!!tileTL2 && tileTL2.white !== tile.white) moveArray.push(tileTL2.tile);
  if (!!tileTL3 && tileTL3.white !== tile.white) moveArray.push(tileTL3.tile);
  if (!!tileTL4 && tileTL4.white !== tile.white) moveArray.push(tileTL4.tile);
  if (!!tileTL5 && tileTL5.white !== tile.white) moveArray.push(tileTL5.tile);
  if (!!tileTL6 && tileTL6.white !== tile.white) moveArray.push(tileTL6.tile);
  if (!!tileTL7 && tileTL7.white !== tile.white) moveArray.push(tileTL7.tile);

  if (!!tileT1 && tileT1.white !== tile.white) moveArray.push(tileT1.tile);
  if (!!tileT2 && tileT2.white !== tile.white) moveArray.push(tileT2.tile);
  if (!!tileT3 && tileT3.white !== tile.white) moveArray.push(tileT3.tile);
  if (!!tileT4 && tileT4.white !== tile.white) moveArray.push(tileT4.tile);
  if (!!tileT5 && tileT5.white !== tile.white) moveArray.push(tileT5.tile);
  if (!!tileT6 && tileT6.white !== tile.white) moveArray.push(tileT6.tile);
  if (!!tileT7 && tileT7.white !== tile.white) moveArray.push(tileT7.tile);

  if (!!tileTR1 && tileTR1.white !== tile.white) moveArray.push(tileTR1.tile);
  if (!!tileTR2 && tileTR2.white !== tile.white) moveArray.push(tileTR2.tile);
  if (!!tileTR3 && tileTR3.white !== tile.white) moveArray.push(tileTR3.tile);
  if (!!tileTR4 && tileTR4.white !== tile.white) moveArray.push(tileTR4.tile);
  if (!!tileTR5 && tileTR5.white !== tile.white) moveArray.push(tileTR5.tile);
  if (!!tileTR6 && tileTR6.white !== tile.white) moveArray.push(tileTR6.tile);
  if (!!tileTR7 && tileTR7.white !== tile.white) moveArray.push(tileTR7.tile);

  if (!!tileR1 && tileR1.white !== tile.white) moveArray.push(tileR1.tile);
  if (!!tileR2 && tileR2.white !== tile.white) moveArray.push(tileR2.tile);
  if (!!tileR3 && tileR3.white !== tile.white) moveArray.push(tileR3.tile);
  if (!!tileR4 && tileR4.white !== tile.white) moveArray.push(tileR4.tile);
  if (!!tileR5 && tileR5.white !== tile.white) moveArray.push(tileR5.tile);
  if (!!tileR6 && tileR6.white !== tile.white) moveArray.push(tileR6.tile);
  if (!!tileR7 && tileR7.white !== tile.white) moveArray.push(tileR7.tile);

  if (!!tileBR1 && tileBR1.white !== tile.white) moveArray.push(tileBR1.tile);
  if (!!tileBR2 && tileBR2.white !== tile.white) moveArray.push(tileBR2.tile);
  if (!!tileBR3 && tileBR3.white !== tile.white) moveArray.push(tileBR3.tile);
  if (!!tileBR4 && tileBR4.white !== tile.white) moveArray.push(tileBR4.tile);
  if (!!tileBR5 && tileBR5.white !== tile.white) moveArray.push(tileBR5.tile);
  if (!!tileBR6 && tileBR6.white !== tile.white) moveArray.push(tileBR6.tile);
  if (!!tileBR7 && tileBR7.white !== tile.white) moveArray.push(tileBR7.tile);

  if (!!tileB1 && tileB1.white !== tile.white) moveArray.push(tileB1.tile);
  if (!!tileB2 && tileB2.white !== tile.white) moveArray.push(tileB2.tile);
  if (!!tileB3 && tileB3.white !== tile.white) moveArray.push(tileB3.tile);
  if (!!tileB4 && tileB4.white !== tile.white) moveArray.push(tileB4.tile);
  if (!!tileB5 && tileB5.white !== tile.white) moveArray.push(tileB5.tile);
  if (!!tileB6 && tileB6.white !== tile.white) moveArray.push(tileB6.tile);
  if (!!tileB7 && tileB7.white !== tile.white) moveArray.push(tileB7.tile);

  if (!!tileBL1 && tileBL1.white !== tile.white) moveArray.push(tileBL1.tile);
  if (!!tileBL2 && tileBL2.white !== tile.white) moveArray.push(tileBL2.tile);
  if (!!tileBL3 && tileBL3.white !== tile.white) moveArray.push(tileBL3.tile);
  if (!!tileBL4 && tileBL4.white !== tile.white) moveArray.push(tileBL4.tile);
  if (!!tileBL5 && tileBL5.white !== tile.white) moveArray.push(tileBL5.tile);
  if (!!tileBL6 && tileBL6.white !== tile.white) moveArray.push(tileBL6.tile);
  if (!!tileBL7 && tileBL7.white !== tile.white) moveArray.push(tileBL7.tile);

  if (!!tileL1 && tileL1.white !== tile.white) moveArray.push(tileL1.tile);
  if (!!tileL2 && tileL2.white !== tile.white) moveArray.push(tileL2.tile);
  if (!!tileL3 && tileL3.white !== tile.white) moveArray.push(tileL3.tile);
  if (!!tileL4 && tileL4.white !== tile.white) moveArray.push(tileL4.tile);
  if (!!tileL5 && tileL5.white !== tile.white) moveArray.push(tileL5.tile);
  if (!!tileL6 && tileL6.white !== tile.white) moveArray.push(tileL6.tile);
  if (!!tileL7 && tileL7.white !== tile.white) moveArray.push(tileL7.tile);

  return moveArray;
};

const findMoveTiles = (board: ChessBoard, tile: Tile, extra: Extra) => {
  if (tile.piece === 0) return getKingMoves(board, tile);
  if (tile.piece === 1) return getPawnMoves(board, tile, extra);
  if (tile.piece === 2) return getKnightMoves(board, tile);
  if (tile.piece === 3) return getBishopMoves(board, tile);
  if (tile.piece === 4) return getRookMoves(board, tile);
  if (tile.piece === 5) return getQueenMoves(board, tile);
}

export default findMoveTiles;
