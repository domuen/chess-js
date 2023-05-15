import { PieceID } from "../types";

const King = "K";
const Pawn = "P";
const Knight = "N";
const Bishop = "B";
const Rook = "R";
const Queen = "Q";

const getTileAsset = (piece?: PieceID) => {
  if (piece === 0) return King;
  if (piece === 1) return Pawn;
  if (piece === 2) return Knight;
  if (piece === 3) return Bishop;
  if (piece === 4) return Rook;
  if (piece === 5) return Queen;
};

export default getTileAsset;
