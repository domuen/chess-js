import createTile from "./create-tile";
import { ChessBoard } from "../types";

/* Piece Index */

// 0 King
// 1 Pawn
// 2 Knight
// 3 Bishop
// 4 Rook
// 5 Queen

const initializeBoard = (): ChessBoard => {
  return [
    [
      createTile(false, false, ["a", 8], 4),
      createTile(true,  false, ["b", 8], 2),
      createTile(false, false, ["c", 8], 3),
      createTile(true,  false, ["d", 8], 5),
      createTile(false, false, ["e", 8], 0),
      createTile(true,  false, ["f", 8], 3),
      createTile(false, false, ["g", 8], 2),
      createTile(true,  false, ["h", 8], 4)
    ],
    [
      createTile(true,  false, ["a", 7], 1),
      createTile(false, false, ["b", 7], 1),
      createTile(true,  false, ["c", 7], 1),
      createTile(false, false, ["d", 7], 1),
      createTile(true,  false, ["e", 7], 1),
      createTile(false, false, ["f", 7], 1),
      createTile(true,  false, ["g", 7], 1),
      createTile(false, false, ["h", 7], 1)
    ],
    [
      createTile(false, undefined, ["a", 6]),
      createTile(true,  undefined, ["b", 6]),
      createTile(false, undefined, ["c", 6]),
      createTile(true,  undefined, ["d", 6]),
      createTile(false, undefined, ["e", 6]),
      createTile(true,  undefined, ["f", 6]),
      createTile(false, undefined, ["g", 6]),
      createTile(true,  undefined, ["h", 6])
    ],
    [
      createTile(true,  undefined, ["a", 5]),
      createTile(false, undefined, ["b", 5]),
      createTile(true,  undefined, ["c", 5]),
      createTile(false, undefined, ["d", 5]),
      createTile(true,  undefined, ["e", 5]),
      createTile(false, undefined, ["f", 5]),
      createTile(true,  undefined, ["g", 5]),
      createTile(false, undefined, ["h", 5])
    ],
    [
      createTile(false, undefined, ["a", 4]),
      createTile(true,  undefined, ["b", 4]),
      createTile(false, undefined, ["c", 4]),
      createTile(true,  undefined, ["d", 4]),
      createTile(false, undefined, ["e", 4]),
      createTile(true,  undefined, ["f", 4]),
      createTile(false, undefined, ["g", 4]),
      createTile(true,  undefined, ["h", 4])
    ],
    [
      createTile(true,  undefined, ["a", 3]),
      createTile(false, undefined, ["b", 3]),
      createTile(true,  undefined, ["c", 3]),
      createTile(false, undefined, ["d", 3]),
      createTile(true,  undefined, ["e", 3]),
      createTile(false, undefined, ["f", 3]),
      createTile(true,  undefined, ["g", 3]),
      createTile(false, undefined, ["h", 3])
    ],
    [
      createTile(false, true, ["a", 2], 1),
      createTile(true,  true, ["b", 2], 1),
      createTile(false, true, ["c", 2], 1),
      createTile(true,  true, ["d", 2], 1),
      createTile(false, true, ["e", 2], 1),
      createTile(true,  true, ["f", 2], 1),
      createTile(false, true, ["g", 2], 1),
      createTile(true,  true, ["h", 2], 1)
    ],
    [
      createTile(true,  true, ["a", 1], 4),
      createTile(false, true, ["b", 1], 2),
      createTile(true,  true, ["c", 1], 3),
      createTile(false, true, ["d", 1], 5),
      createTile(true,  true, ["e", 1], 0),
      createTile(false, true, ["f", 1], 3),
      createTile(true,  true, ["g", 1], 2),
      createTile(false, true, ["h", 1], 4)
    ]
  ]
};

export default initializeBoard;
