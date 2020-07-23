import { FacingType } from './types';

let posX: number;
let posY: number;
let facing: FacingType;
let isSet = false;

export const setPosition = (x: number, y: number, f: FacingType) => {
  const isInvalidFacing = () => !['NORTH', 'SOUTH', 'WEST', 'EAST'].some(direction => direction === f);
  const isInvalidPosition = () => [x, y].some(pos => pos < 0 || pos > 4);

  if (isInvalidPosition() || isInvalidFacing()) {
    return;
  }

  posX = x;
  posY = y;
  facing = f;
  isSet = true;
};

export const report = () => {

  if (!isSet) {
    return;
  }

  console.log(`Output: ${posX},${posY},${facing}`);
};

export const move = () => {
  if (!isSet) {
    return;
  }

  const moveFuncMap = {
    NORTH () {
      if (posY !== 4) posY++;
    },
    SOUTH () {
      if (posY !== 0) posY--;
    },
    EAST () {
      if (posX !== 4) posX++;
    },
    WEST () {
      if (posX !== 0) posX--;
    }
  };

  moveFuncMap[facing]();
};

export const turnLeft = () => {
  if (!isSet) {
    return;
  }

  const newFacingMap = {
    NORTH: 'WEST',
    WEST: 'SOUTH',
    SOUTH: 'EAST',
    EAST: 'NORTH'
  };

  facing = newFacingMap[facing] as FacingType;
};

export const turnRight = () => {
  if (!isSet) {
    return;
  }

  const newFacingMap = {
    NORTH: 'EAST',
    EAST: 'SOUTH',
    SOUTH: 'WEST',
    WEST: 'NORTH'
  };

  facing = newFacingMap[facing] as FacingType;
};