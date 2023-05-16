import { Tile } from "../types";

type Color = "black" | "white";

const King = (color: Color) => require(`../assets/king-${color}.png`);
const Pawn = (color: Color) => require(`../assets/pawn-${color}.png`);
const Knight = (color: Color) => require(`../assets/knight-${color}.png`);
const Bishop = (color: Color) => require(`../assets/bishop-${color}.png`);
const Rook = (color: Color) => require(`../assets/rook-${color}.png`);
const Queen = (color: Color) => require(`../assets/queen-${color}.png`);

const getTileAsset = (tile: Tile) => {
  if (tile.piece === 0) return King(tile.white ? "white" : "black");
  if (tile.piece === 1) return Pawn(tile.white ? "white" : "black");
  if (tile.piece === 2) return Knight(tile.white ? "white" : "black");
  if (tile.piece === 3) return Bishop(tile.white ? "white" : "black");
  if (tile.piece === 4) return Rook(tile.white ? "white" : "black");
  if (tile.piece === 5) return Queen(tile.white ? "white" : "black");
};

export default getTileAsset;
