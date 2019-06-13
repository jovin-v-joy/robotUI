import * as React from 'react';
import * as RobotService from '../service/RobotService';
import './Home.css';
import reset from './reset.png';
import robo from './robo.png';


interface IProps {
  name?: string;
}

interface IRobotResponse {
  robot: { x: number, y: number, position: string },
  status: { success: boolean, error?: string }
}


interface IState {
  x: number;
  y: number;
  position: string;
  error: string;
}
class Home extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props);
    // Initialise robot position - Default place
    this.state = {
      error: '',
      position: 'NORTH',
      x: 0,
      y: 0,
    };
    this.handlePlace = this.handlePlace.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleY = this.handleY.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleReport = this.handleReport.bind(this);
    
  }

  public async handlePlace() {
    this.setError('')
    const data: IRobotResponse = await RobotService.place(this.state.x, this.state.y, this.state.position);
    if (data.status.success) {
      this.setRobotState(data);
    } else {
      this.setError(data.status.error!)
    }
  }

  public handleX(event: any) {
    this.setState({
      x: event.target.value,
    });
  }
  public handleY(event: any) {
    this.setState({
      y: event.target.value,
    });
  }

  public handlePosition(event: any) {
    this.setState({
      position: event.target.value,
    });
  }

  public async handleMove(event: any) {
    this.setError('')
    const data: IRobotResponse = await RobotService.move();
    if (data.status.success) {
      this.setRobotState(data);
    } else {
      this.setError(data.status.error!)
    }
  }

  public async handleLeft(event: any) {
    const data: IRobotResponse = await RobotService.leftTurn();
    if (data.status.success) {
      this.setRobotState(data);
    } else {
      this.setError(data.status.error!)
    }
  }

  public async handleRight(event: any) {
    const data: IRobotResponse = await RobotService.rightTurn();
    if (data.status.success) {
      this.setRobotState(data);
    } else {
      this.setError(data.status.error!)
    }
  }

  public async handleReport(event: any) {
    const data: IRobotResponse = await RobotService.report();
    if (data.status.success) {
      alert(`Robot positioned at ${data.robot.x} , ${data.robot.y} and facing towards ${data.robot.position} `);
    } else {
      this.setError(data.status.error!)
    }
  }



  public render() {
    return (
      <div className='container'>
        <div className='title' />
        <div className='show-controller'>
          <label>X: </label>
          <input type='text' className='text-control' onChange={this.handleX} />
          <label>Y: </label>
          <input type='text' className='text-control' onChange={this.handleY} />
          <label>Position: </label>
          <select className='text-control' onChange={this.handlePosition}>
            <option>NORTH</option>
            <option>SOUTH</option>
            <option>EAST</option>
            <option>WEST</option>
          </select>
          <button className='button-control' onClick={this.handlePlace} >PLACE</button>
          <button className='button-control' onClick={this.handleMove}>MOVE</button>
          <button className='button-control' onClick={this.handleLeft}>LEFT</button>
          <button className='button-control' onClick={this.handleRight}>RIGHT</button>
          <button className='button-control' onClick={this.handleReport}>REPORT</button>
        </div>

        <div className='robot-holder'>
          <table className='robot-table'>
            <tr className='robot-row'>
              <td id='0x0' className='robot-cell' />
              <td id='0x1' className='robot-cell' />
              <td id='0x2' className='robot-cell'>W</td>
              <td id='0x3' className='robot-cell' />
              <td id='0x4' className='robot-cell' />
            </tr>
            <tr className='robot-row'>
              <td id='1x0' className='robot-cell' />
              <td id='1x1' className='robot-cell' />
              <td id='1x2' className='robot-cell' />
              <td id='1x3' className='robot-cell' />
              <td id='1x4' className='robot-cell' />
            </tr>
            <tr className='robot-row'>
              <td id='2x0' className='robot-cell'>S</td>
              <td id='2x1' className='robot-cell' />
              <td id='2x2' className='robot-cell' />
              <td id='2x3' className='robot-cell' />
              <td id='2x4' className='robot-cell'>N</td>
            </tr>
            <tr className='robot-row'>
              <td id='3x0' className='robot-cell' />
              <td id='3x1' className='robot-cell' />
              <td id='3x2' className='robot-cell' />
              <td id='3x3' className='robot-cell' />
              <td id='3x4' className='robot-cell' />
            </tr>
            <tr className='robot-row'>
              <td id='4x0' className='robot-cell' />
              <td id='4x1' className='robot-cell' />
              <td id='4x2' className='robot-cell'>E</td>
              <td id='4x3' className='robot-cell' />
              <td id='4x4' className='robot-cell' />
            </tr>
          </table>
        </div>
        <div className='utility'>
          <span className='currentPosition'>
            X : {this.state.x}  |  Y : {this.state.y}  |  FACING : {this.state.position}
          </span>
          {
            (this.state.error) &&
            <div className='error'>
              {this.state.error}
            </div>
          }
        </div>
        <footer className="footerContainer"> <div className='footer-content'>  Designed by Jovin </div> </footer>
      </div>
    );
  }

  private setRobotState(data: IRobotResponse) {
    this.setState({
      position: data.robot.position,
      x: data.robot.x,
      y: data.robot.y
    });
    this.placeRobot(this.state.x, this.state.y);
  }

  private setError(error: string) {
    this.setState({ error })
  }

  private placeRobot(x: number, y: number) {
    const cells = document.getElementsByTagName("td");
    Object.keys(cells).forEach((cell) => {
      cells[cell].style.backgroundImage = `url(${reset})`;
    });
    document.getElementById(`${x}x${y}`)!.style.backgroundImage = `url(${robo})`;
  }

}



export default Home;