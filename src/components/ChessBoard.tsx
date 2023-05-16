import React from "react";
import cC from "../helpers/compare-coords";
import initializeBoard from "../helpers/initialize-board";
import { ChessBoard, Extra, Tile as T, TileCoords } from "../types";
import Tile from "./Tile";
import "../css/ChessBoard.css";

interface Props { }

export type SelectedTile = T | undefined;

export default (props: Props) => {

  const [board, setBoard] = React.useState<ChessBoard>(initializeBoard);
  const [selectedTile, setSelectedTile] = React.useState<SelectedTile>(undefined);
  const [moveTiles, setMoveTiles] = React.useState<TileCoords[] | undefined>(undefined);
  const [whiteMove, setWhiteMove] = React.useState(true);
  const [extra, setExtra] = React.useState<Extra>({ passants: [] });

  const renderTile = (t: T) => {
    const isTarget = !!moveTiles && moveTiles.some(tile => cC(tile, t.tile));

    return <React.Fragment key={t.tile.join(",")}>
      <Tile tile={t}
        board={board}
        setBoard={setBoard}
        selectedTile={selectedTile}
        setSelectedTile={setSelectedTile}
        setMoveTiles={setMoveTiles}
        extra={extra}
        setExtra={setExtra}
        isTarget={isTarget}
        whiteMove={whiteMove}
        setWhiteMove={setWhiteMove}
      />
    </React.Fragment>
  }

  return <React.Fragment>
    <div className="container">
      {board.map((c, i) => (<div key={i} className="row">{c.map(renderTile)}</div>))}
    </div>
  </React.Fragment>;
};
