import React from "react";
import initializeBoard from "../helpers/initialize-board";
import { ChessBoard, MoveTiles, SelectedTile } from "../types";
import Tile from "../components/Tile";

import "../css/ChessBoard.css";

interface Props { }

export default (props: Props) => {

  const [boardArray, setBoardArray] = React.useState<ChessBoard>(initializeBoard);

  const [selectedTile, setSelectedTile] = React.useState<SelectedTile>(undefined);
  const [moveTiles, setMoveTiles] = React.useState<MoveTiles>(undefined);

  const renderTile = (t: any) => {
    const isMoveable = (() => {
      if (!moveTiles) return false;
      return moveTiles.some(tile => (tile[0] === t.tile[0]) && (tile[1] === t.tile[1]));
    })();

    return <React.Fragment key={t.tile.join(",")}>
      <Tile tile={t}
        selectedTile={selectedTile}
        isMoveable={isMoveable}
        board={boardArray}
        setBoard={setBoardArray}

        setSelectedTile={setSelectedTile}
        setMoveTiles={setMoveTiles}
      />
    </React.Fragment>
  }

  return <React.Fragment>
    <div className="container">
      {boardArray.map((c, i) => (
        <div key={i} className="row">
          {c.map(renderTile)}
        </div>
      ))}
    </div>
  </React.Fragment>;
};
