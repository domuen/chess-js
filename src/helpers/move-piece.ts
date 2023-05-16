import { ChessBoard, Extra, Tile } from "../types";
import createTile from "./create-tile";
import findTileIndex from "./find-tile-index";

/* 
this starts with creating a empty tile at the previous position of the moved `tile`
it then creates a `newTile` at the appropriate coords

since its always true that when a peace leaves, it will leave a blank square
and when a piece lands, it will override that square,
there is no need to have a bunch of conditionals for extra movements such as "en passant"
*/

const movePiece = (board: ChessBoard, tile: Tile, newTile: Tile): [ChessBoard, Extra] => {
  const spreadBoard: ChessBoard = [...board];
  const extra: Extra = {
    passants: []
  };

  const [oldBoardIndex, oldRowIndex] = findTileIndex(spreadBoard, tile);

  // remove piece from old location
  const oldRow = [...spreadBoard[oldBoardIndex!]];
  const replacementTile = createTile(tile.dark, undefined, tile.tile);
  oldRow.splice(oldRowIndex!, 1, replacementTile);

  // @ts-ignore
  spreadBoard.splice(oldBoardIndex!, 1, oldRow);

  // add piece to new location
  const [newBoardIndex, newRowIndex] = findTileIndex(spreadBoard, newTile);

  const newRow = [...spreadBoard[newBoardIndex!]];
  const newTile2 = createTile(newTile.dark, tile.white, newTile.tile, tile.piece!, true);
  newRow.splice(newRowIndex!, 1, newTile2);

  // maybe fix this type stuff later
  // @ts-ignore
  spreadBoard.splice(newBoardIndex!, 1, newRow);

  /* move this extra code to separate functions */

  // en passant
  if (tile.piece === 1) {
    // check double move
    if ((!tile.white ? oldBoardIndex! + 2 : oldBoardIndex! - 2) === newBoardIndex) {
      const tileL = spreadBoard[newBoardIndex!]?.[newRowIndex! - 1];
      const tileR = spreadBoard[newBoardIndex!]?.[newRowIndex! + 1];

      if (!!tileL.piece && tileL.piece === 1) {
        extra.passants.push({ r: true, coords: tileL.tile });
      }

      if (!!tileR.piece && tileR.piece === 1) {
        extra.passants.push({ l: true, coords: tileR.tile });
      }
    } else {
      const aboveIndex = !tile.white ? newBoardIndex! - 1 : newBoardIndex! + 1;
      const aboveTile = spreadBoard[aboveIndex]?.[newRowIndex!];

      if (!newTile.piece && aboveTile.piece === 1) {
        const priorRow = spreadBoard[aboveIndex];
        const replacementTile2 = createTile(aboveTile.dark, undefined, aboveTile.tile);

        priorRow.splice(newRowIndex!, 1, replacementTile2);
        spreadBoard.splice(aboveIndex, 1, priorRow);
      }
    }
  }

  // @ts-ignore
  return [spreadBoard, extra];
};

export default movePiece;
