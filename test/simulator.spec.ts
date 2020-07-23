import { expect } from 'chai';
import * as sinon from 'sinon';
import * as fs from 'fs';

import * as robot from '../src/robot';
import simulator from '../src/simulator';

describe('Simulator', () => {
  let sandbox: sinon.SinonSandbox;
  let readFileStub: sinon.SinonStub;
  let robotPlaceStub: sinon.SinonStub;
  let robotMoveStub: sinon.SinonStub;
  let robotTurnLeftStub: sinon.SinonStub;
  let robotTurnRightStub: sinon.SinonStub;
  let robotReportStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    readFileStub = sandbox.stub(fs.promises, 'readFile');
    robotPlaceStub = sandbox.stub(robot, 'setPosition').returns();
    robotMoveStub = sandbox.stub(robot, 'move').returns();
    robotTurnLeftStub = sandbox.stub(robot, 'turnLeft').returns();
    robotTurnRightStub = sandbox.stub(robot, 'turnRight').returns();
    robotReportStub = sandbox.stub(robot, 'report').returns();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('robot command calls', () => {
    it('should be able to call robot commands', async () => {
      readFileStub.resolves('PLACE 0,0,NORTH\r\nMOVE\r\nREPORT\r\nMOVE\r\nREPORT\r\nMOVE\r\nREPORT\r\nMOVE\r\nREPORT\r\nMOVE\r\nREPORT\r\nLEFT\r\nREPORT\r\nRIGHT\r\nREPORT\r\nLEFT\r\nREPORT\r\nRIGHT\r\nREPORT');

      await simulator();

      expect(robotPlaceStub.calledOnceWithExactly(0, 0, 'NORTH')).to.be.true;
      expect(robotMoveStub.callCount).to.be.equal(5);
      expect(robotTurnLeftStub.calledTwice).to.be.true;
      expect(robotTurnRightStub.calledTwice).to.be.true;
      expect(robotReportStub.callCount).to.be.equal(9);
    });

    it('should not call robot place command', async () => {
      readFileStub.resolves('PLACE 0,0,NORTH EXTRATEXT');

      await simulator();

      expect(robotPlaceStub.notCalled).to.be.true;
    });
  });
});
