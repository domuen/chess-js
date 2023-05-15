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
      createTile(false, false, ["a", 6]),
      createTile(true,  false, ["b", 6]),
      createTile(false, false, ["c", 6]),
      createTile(true,  false, ["d", 6]),
      createTile(false, false, ["e", 6]),
      createTile(true,  false, ["f", 6]),
      createTile(false, false, ["g", 6]),
      createTile(true,  false, ["h", 6])
    ],
    [
      createTile(true,  false, ["a", 5]),
      createTile(false, false, ["b", 5]),
      createTile(true,  false, ["c", 5]),
      createTile(false, false, ["d", 5]),
      createTile(true,  false, ["e", 5]),
      createTile(false, false, ["f", 5]),
      createTile(true,  false, ["g", 5]),
      createTile(false, false, ["h", 5])
    ],
    [
      createTile(false, false, ["a", 4]),
      createTile(true,  false, ["b", 4]),
      createTile(false, false, ["c", 4]),
      createTile(true,  false, ["d", 4]),
      createTile(false, false, ["e", 4]),
      createTile(true,  false, ["f", 4]),
      createTile(false, false, ["g", 4]),
      createTile(true,  false, ["h", 4])
    ],
    [
      createTile(true,  false, ["a", 3]),
      createTile(false, false, ["b", 3]),
      createTile(true,  false, ["c", 3]),
      createTile(false, false, ["d", 3]),
      createTile(true,  false, ["e", 3]),
      createTile(false, false, ["f", 3]),
      createTile(true,  false, ["g", 3]),
      createTile(false, false, ["h", 3])
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
