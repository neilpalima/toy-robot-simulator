import {expect} from 'chai';
import * as sinon from 'sinon';

import * as robot from '../src/robot';
import { FacingType } from '../src/types';

describe('Robot', () => {

  let consoleStub: sinon.SinonStub;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log').returns();
  });

  afterEach(() => {
    consoleStub.restore();
  });

  describe('places its position', () => {
    it('should not be able to place and report when outside table boundaries', () => {
      robot.setPosition(0, -1, 'EAST');
      robot.report();
      robot.setPosition(-1, 0, 'EAST');
      robot.report();
      robot.setPosition(0, 5, 'EAST');
      robot.report();
      robot.setPosition(5, 0, 'EAST');
      robot.report();
      robot.setPosition(-1, -1, 'EAST');
      robot.report();
      robot.setPosition(5, 5, 'EAST');
      robot.report();

      expect(consoleStub.notCalled).to.be.true;

    });

    it('should be able ignore commands when not yet placed on the table', () => {
      robot.move();
      robot.turnLeft();
      robot.turnRight();
      robot.report();

      expect(consoleStub.notCalled).to.be.true;
    });

    it('should be able to place robot on the table', () => {
      robot.setPosition(2, 2, 'EAST');
      robot.report();

      expect(consoleStub.calledWithExactly('Output: 2,2,EAST')).to.be.true;
    });
  });

  describe('makes a turn', () => {
    const leftTurnsExpectation = [
      {
        from: 'NORTH',
        to: 'WEST'
      },
      {
        from: 'WEST',
        to: 'SOUTH'
      },
      {
        from: 'SOUTH',
        to: 'EAST'
      },
      {
        from: 'EAST',
        to: 'NORTH'
      },
    ];
    const rightTurnsExpectation = [
      {
        from: 'NORTH',
        to: 'EAST'
      },
      {
        from: 'EAST',
        to: 'SOUTH'
      },
      {
        from: 'SOUTH',
        to: 'WEST'
      },
      {
        from: 'WEST',
        to: 'NORTH'
      },
    ];

    leftTurnsExpectation.forEach(({ to, from }) => {
      it(`should be able to turn left from ${from} to ${to}`, () => {
        robot.setPosition(0, 0, from as FacingType);
        robot.turnLeft();
        robot.report();

        expect(consoleStub.calledWithExactly(`Output: 0,0,${to}`)).to.be.true;
      });
    });

    rightTurnsExpectation.forEach(({ to, from }) => {
      it(`should be able to turn right from ${from} to ${to}`, () => {
        robot.setPosition(0, 0, from as FacingType);
        robot.turnRight();
        robot.report();

        expect(consoleStub.calledWithExactly(`Output: 0,0,${to}`)).to.be.true;
      });
    });
  });

  describe('makes a move', () => {
    const fallingMovements = [
      {
        x: 0,
        y: 0,
        facing: 'WEST'
      },
      {
        x: 0,
        y: 0,
        facing: 'SOUTH'
      },
      {
        x: 0,
        y: 4,
        facing: 'NORTH'
      },
      {
        x: 4,
        y: 4,
        facing: 'EAST'
      },
    ];

    const validMovements = [
      {
        x: 2,
        y: 1,
        facing: 'WEST'
      },
      {
        x: 1,
        y: 2,
        facing: 'SOUTH',
      },
      {
        x: 1,
        y: 0,
        facing: 'NORTH',
      },
      {
        x: 0,
        y: 1,
        facing: 'EAST',
      }
    ];

    fallingMovements.forEach(({x, y, facing}) => {
      it(`should not be able to make a move when on (${x},${y},${facing})`, () => {
        robot.setPosition(x, y, facing as FacingType);
        robot.move();
        robot.report();

        expect(consoleStub.calledWithExactly(`Output: ${x},${y},${facing}`)).to.be.true;
      });
    });

    validMovements.forEach(({x, y, facing}) => {
      it(`should be able to make a move to (1,1) when on (${x},${y},${facing})`, () => {
        robot.setPosition(x, y, facing as FacingType);
        robot.move();
        robot.report();

        expect(consoleStub.calledWithExactly(`Output: 1,1,${facing}`)).to.be.true;
      });
    });
  });
});