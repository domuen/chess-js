import React from "react";
import { Tile, ChessBoard, TileCoords, Extra } from "../types";
import cn from "classnames";
import getTileAsset from "../helpers/get-tile-assets";
import findMoveTiles from "../helpers/find-move-tiles";
import movePiece from "../helpers/move-piece";

interface Props {
  tile: Tile;
  board: ChessBoard;
  setBoard: React.Dispatch<React.SetStateAction<ChessBoard>>;
  selectedTile: Tile | undefined;
  setSelectedTile: React.Dispatch<React.SetStateAction<Tile | undefined>>;
  setMoveTiles: React.Dispatch<React.SetStateAction<TileCoords[] | undefined>>;
  extra: Extra;
  setExtra: React.Dispatch<React.SetStateAction<Extra>>;
  isTarget: boolean | undefined;
  whiteMove: boolean;
  setWhiteMove: React.Dispatch<React.SetStateAction<boolean>>;
}

export default React.memo<Props>((props) => {

  const tile = props.tile;

  const tileAsset = getTileAsset(tile);

  // not better name, but this is whether or not
  // a player can move a piece to this tile
  const target = props.isTarget;
  const hasPiece = !isNaN(tile.piece!);
  const isTileTurn = (() => {
    if (!tile.white) {
      if (props.whiteMove) return false;
      return true;
    }
    return props.whiteMove;
  })();

  const background = (() => {
    if (props.selectedTile?.tile === tile.tile) return "selected";
    if (!target && tile.dark) return "dark";
  })();

  const clearState = () => {
    props.setSelectedTile(undefined);
    props.setMoveTiles(undefined);
  }

  const handleClick = () => {
    // console.log(JSON.stringify(tile));
    // if (!isTileTurn) return;
    if (!!props.selectedTile && !target) return clearState();
    if (!hasPiece && !target) return;

    if (target) {
      const [newBoard, extra] = movePiece(
        props.board, props.selectedTile!, tile
      );

      props.setWhiteMove(prev => !prev);
      props.setExtra(prev => ({ ...prev, passants: extra.passants }));
      props.setBoard(newBoard);

      return clearState();
    }

    const moveTiles = findMoveTiles(props.board, tile, { passants: props.extra.passants });

    props.setSelectedTile(tile);
    props.setMoveTiles(moveTiles);
  }

  return <React.Fragment>
    <div className={cn("tile", background, { selectable: hasPiece }, { moveable: target })} onClick={handleClick}>
      {hasPiece && <img src={tileAsset} alt="" />}
    </div>
  </React.Fragment>;
});
