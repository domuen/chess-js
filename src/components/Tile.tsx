import React from "react";
import { Tile, SelectedTile, ChessBoard } from "../types";
import cn from "classnames";
import getTileAsset from "../helpers/get-tile-assets";
import findMoveTiles from "../helpers/find-move-tiles";
import movePiece from "../helpers/move-piece";

interface Props {
  tile: Tile;
  selectedTile: SelectedTile;
  isMoveable: boolean;
  board: ChessBoard;
  setBoard: any;

  setSelectedTile: any;
  setMoveTiles: any;
}

export default React.memo<Props>((props) => {

  const tile = props.tile;

  const tileAsset = getTileAsset(tile.piece);

  const moveable = props.isMoveable;
  const selectable = !isNaN(tile.piece!);
  const selected = props.selectedTile?.tile === tile.tile;
  const dark = (!selected && !moveable && tile.dark);

  const handleClick = () => {
    console.log(tile);
    if (!selectable && !props.selectedTile) return;

    if (moveable && !!props.selectedTile) {
      const newBoard = movePiece(
        props.board, props.selectedTile, tile
      );

      props.setBoard(newBoard);

      props.setSelectedTile(undefined);
      return props.setMoveTiles(undefined);
    }

    const moveTiles = findMoveTiles(props.board, tile);

    props.setSelectedTile(tile);
    props.setMoveTiles(moveTiles);
  }

  return <React.Fragment>
    <div className={cn("tile", { dark }, { selected }, { selectable }, { moveable })} onClick={handleClick}>
      <p>{tileAsset}</p>
    </div>
  </React.Fragment>;
});
