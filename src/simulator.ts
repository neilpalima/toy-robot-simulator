import * as fs from 'fs';

import * as robot from './robot';
import { FacingType } from './types';

export default async () => {
  const commands = await fs.promises.readFile('commands.txt');
  const commandsByLine = commands.toString().split('\r\n');

  commandsByLine.forEach(command => {
    if (command.startsWith('PLACE')) {
      const splittedCommand = command.split(' ');

      if (splittedCommand.length !== 2) {
        return;
      }

      const args = splittedCommand[1].split(',');
      const posX = parseInt(args[0]);
      const posY = parseInt(args[1]);
      const facing = args[2] as FacingType;
      return robot.setPosition(posX, posY, facing);
    }

    if (command === 'MOVE') {
      return robot.move();
    }

    if (command === 'REPORT') {
      return robot.report();
    }

    if (command === 'LEFT') {
      return robot.turnLeft();
    }

    if (command === 'RIGHT') {
      return robot.turnRight();
    }
  });
};