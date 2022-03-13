import React, { useState, FC, useContext, useEffect, useRef } from 'react';
import './TamaConsole.less';
import friend1 from '../assets/sample_characters/type1.png';
import friend2 from '../assets/sample_characters/type2.png';
import expHolder from './expholder.png';
import sampleTravel from './travel.jpeg';
import happyEmoji from '../assets/emojis/happy.png';
import sadEmoji from '../assets/emojis/sad.png';
import normalEmoji from '../assets/emojis/normal.png';
import defaultBackground from '../assets/sample_backgrounds/default.jpg';
import { calcLoc, MOVE_UPDATE_INTERVAL, MOVE_DURATION, sampleBackgrounds } from '../utils';
const move = ['none', 'move1', 'move2'];


export interface ITamaConsole {
  consoleConfig: Object;
  tamaCharacter: any;
  onWalletChooseType: Function;
  listenItemUsed: any | undefined;
  consoleBackground: string | undefined;
}
export const TamaConsole: FC<ITamaConsole> = (props) => {
  const onWalletChooseType = props.onWalletChooseType;
  const consoleConfig = props.consoleConfig;
  const tamaCharacter = props.tamaCharacter;
  const listenItemUsed = props.listenItemUsed;
  const [currMove, setCurrMove] = useState(undefined || Object);
  const [itemsConsumed, setItemsConsumed] = useState(0);

  const countRef = useRef<any>();
  countRef.current = itemsConsumed;

  useEffect(() => {
    const interval = setInterval(() => {
      const path = Math.floor(Math.random() * 3);
      const time = Math.floor(Math.random() * 10 + 5);
      const rotate_speed = Math.floor(Math.random() * 5 + 2);

      const newOptions = {
        path: move[path],
        time: `${time}s`,
        rotate_speed: `0.${rotate_speed}s`,
      }
      console.log('current moment', newOptions);
      setCurrMove(newOptions);
    }, MOVE_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setItemsConsumed(countRef.current + 1);
    console.log('consuming in console', listenItemUsed);
  }, [listenItemUsed])

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

  const onClickEat = () => {
    onWalletChooseType('food');
  }
  const onClickTravel = () => {
    onWalletChooseType('travel');
  }
  const onClickPlay = () => {
    // onWalletChooseType('Travel');
  }
  return (
    <div className="ConsoleMain">
      <div
        className="consoleScreen"
        style={{ width: `${new_screenw}px`, height: `${new_screenh}px`, transform: `translate(${new_screenx}px,${new_screeny}px` }}>
        <div className="layer1" style={{ backgroundImage: `url(${props.consoleBackground || sampleBackgrounds[tamaCharacter.status] || defaultBackground})`, backgroundSize: 'cover' }}></div>
        <div className='statusLayer'>STATUS<h2 className='statusText'>{tamaCharacter.status}</h2></div>
        <div className="layer2"></div>
        <div
          className="layer3"
          style={{
            width: '30%',
            height: '30%',
            animation: `${currMove.path} ${currMove.time}`,
          }}>
          <img className="tamaFriend" src={tamaCharacter.image} style={{
            animation: `rotate ${currMove.rotate_speed} infinite`
          }}></img>
          {listenItemUsed && <img key={itemsConsumed} className="popupImage" src={listenItemUsed.uri}></img>}
          {/* <img className="textCloud" src={expHolder}></img>
          <img className="emoji" src={normalEmoji}></img> */}
          {/* <div className='emoji expText'>ZZZ</div> */}
        </div>
      </div>
      <div className='consoleButton' style={{ 'width': `${new_button1w}px`, 'height': `${new_button1w}px`, 'transform': `translate(${new_button1x}px,${new_button1y}px` }} onClick={() => { onClickEat() }}>
      </div>
      <div className='consoleButton' style={{ 'width': `${new_button2w}px`, 'height': `${new_button2w}px`, 'transform': `translate(${new_button2x}px,${new_button2y}px` }} onClick={() => { onClickPlay() }}>
      </div>
      <div className='consoleButton' style={{ 'width': `${new_button3w}px`, 'height': `${new_button3w}px`, 'transform': `translate(${new_button3x}px,${new_button3y}px` }} onClick={() => { onClickTravel() }}>
      </div>
    </div>
  );
};
