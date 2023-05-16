import React from "react";
import initializeBoard from "../helpers/initialize-board";
import { ChessBoard, Tile as T, TileCoords } from "../types";
import Tile from "./Tile"; // bruh
import "../css/ChessBoard.css";

interface Props { }

export type SelectedTile = T | undefined;

export default (props: Props) => {

  const [board, setBoard] = React.useState<ChessBoard>(initializeBoard);
  const [selectedTile, setSelectedTile] = React.useState<SelectedTile>(undefined);
  const [moveTiles, setMoveTiles] = React.useState<TileCoords[] | undefined>(undefined);

  const renderTile = (t: any) => {
    const isTarget = !!moveTiles && moveTiles.some(tile => (tile[0] === t.tile[0]) && (tile[1] === t.tile[1]));

    return <React.Fragment key={t.tile.join(",")}>
      <Tile tile={t}
        board={board}
        setBoard={setBoard}
        selectedTile={selectedTile}
        setSelectedTile={setSelectedTile}
        setMoveTiles={setMoveTiles}
        isTarget={isTarget}
      />
    </React.Fragment>
  }

  return <React.Fragment>
    <div className="container">
      {board.map((c, i) => (<div key={i} className="row">{c.map(renderTile)}</div>))}
    </div>
  </React.Fragment>;
};
