import { TileCoords } from "../types";

const compareCoords = (cords1: TileCoords, cords2: TileCoords) =>
  (cords1[0] === cords2[0] && cords1[1] === cords2[1]);


export default compareCoords;
