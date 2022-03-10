import React, { useState, FC, useContext, useEffect } from 'react';
import './TamaConsole.less';
import friend1 from '../assets/sample_characters/type1.png';
import friend2 from '../assets/sample_characters/type2.png';
import expHolder from './expholder.png';
import sampleTravel from './travel.jpeg';
import happyEmoji from '../assets/emojis/happy.png';
import sadEmoji from '../assets/emojis/sad.png';
import normalEmoji from '../assets/emojis/normal.png';
import { calcLoc } from '../utils';

const move = ['none', 'move1', 'move2'];

export interface ITamaConsole {
  consoleConfig: Object;
}
export const TamaConsole: FC<ITamaConsole> = (props) => {
  const consoleConfig = props.consoleConfig;
  const [currMove, setCurrMove] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const n = Math.floor(Math.random() * 3);
      setCurrMove(n);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //   setInterval(()=>{generateRandom()},15000);
  console.log('PRINTING IN CONSOLE COMPONENT', consoleConfig);
  const [new_screenx,
    new_screeny,
    new_screenw,
    new_screenh,
    new_button1x,
    new_button1y,
    new_button1w,
    new_button2x,
    new_button2y,
    new_button2w,
    new_button3x,
    new_button3y,
    new_button3w,] = calcLoc(consoleConfig);

  return (
    <div className="ConsoleMain">
      <div
        className="consoleScreen"
        style={{ width: `${new_screenw}px`, height: `${new_screenh}px`, transform: `translate(${new_screenx}px,${new_screeny}px` }}>
        {/* <div className="layer1" style={{ backgroundImage: `url(${sampleTravel})`, backgroundSize: 'cover' }}></div> */}
        <div className="layer2"></div>
        <div
          className="layer3"
          style={{
            width: '30%',
            height: '30%',
            animation: `${move[currMove]} 3s forwards`,
          }}>
          <img className="tamaFriend" src={friend2}></img>
          <img className = "textCloud" src = {expHolder}></img>
          <img className = "emoji" src = {normalEmoji}></img>
          {/* <div className='emoji expText'>ZZZ</div> */}
        </div>
      </div>
      <div className='consoleButton' style ={{'width':`${new_button1w}px`,'height':`${new_button1w}px`,'transform' : `translate(${new_button1x}px,${new_button1y}px`}}>
        </div>
        <div className='consoleButton' style ={{'width':`${new_button2w}px`,'height':`${new_button2w}px`,'transform' : `translate(${new_button2x}px,${new_button2y}px`}}>
        </div>
        <div className='consoleButton' style ={{'width':`${new_button3w}px`,'height':`${new_button3w}px`,'transform' : `translate(${new_button3x}px,${new_button3y}px`}}>
        </div>
    </div>
  );
};
