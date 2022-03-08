import { FC, useEffect, useRef, useState } from 'react';
import './resultsBox.less';
import sampleImage from '../tama-logo.png';
import { Redirect } from 'react-router-dom';

export interface ResultBoxObject {
  id: number;
  price?: number;
  title: string;
  description: string;
  url?: string;
}

export interface IResultsBox {
  resultList: Array<ResultBoxObject>;
}
export const ResultsBox: FC<IResultsBox> = (props) => {
  const { resultList } = props;
  const [reRender, setReRender] = useState(0);
  const [beginIndex, setBeginIndex] = useState(0);
  const render = useRef<number>(0);
  render.current = reRender;

  useEffect(() => {
    setBeginIndex(0);
    setReRender(render.current + 1);
  }, [resultList]);

  useEffect(() => {
    setReRender(render.current + 1);
  }, [beginIndex]);
  // console.log(resultList)

  const buyItem = (index: any) => {
    console.log('PERFOMRING TX FOR THE CURRENT ITEM', resultList[index]);
  };

  return (
    <div key={reRender}>
      <div className="container--top-menu">
        <div className="container--card-spot size-1">
          {resultList[beginIndex + 1] && (
            <div className="container--card border" onClick={async () => buyItem(beginIndex + 1)}>
              <img className="item--card-image" src={resultList[beginIndex + 1].url}></img>
              <div className="container--card--text">
                {/* <div className="item--notification">2</div> */}
                <div className="item--icon">
                  <i className="fa fa-check-circle-o">{resultList[beginIndex + 1].price}</i>
                </div>
                <div className="item--card-title text">{resultList[beginIndex + 1].title}</div>
                <div className="item--card-sub text">{resultList[beginIndex + 1].description}</div>
              </div>
            </div>
          )}
        </div>
        <div className="container--card-spot size-2">
          {resultList[beginIndex] && (
            <div className="container--card border" onClick={async () => buyItem(beginIndex)}>
              <img className="item--card-image" src={resultList[beginIndex].url}></img>
              <div className="container--card--text dark">
                <div className="item--icon">
                  <i className="fa fa-check-circle-o">{resultList[beginIndex].price}</i>
                </div>
                <div className="item--card-title dark text">{resultList[beginIndex].title}</div>
                <div className="item--card-sub dark text">{resultList[beginIndex].description}</div>
              </div>
            </div>
          )}
        </div>
        <div className="container--card-spot size-1">
          {resultList[beginIndex + 2] && (
            <div className="container--card border" onClick={async () => buyItem(beginIndex + 2)}>
              <img className="item--card-image" src={resultList[beginIndex + 2].url}></img>
              <div className="container--card--text">
                <div className="item--icon">
                  <i className="fa fa-check-circle-o">{resultList[beginIndex + 2].price}</i>
                </div>
                <div className="item--card-title text">{resultList[beginIndex + 2].title}</div>
                <div className="item--card-sub text">{resultList[beginIndex + 2].description}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container--bottom-menu">
        <div className="container--card-spot size-1">
          {resultList[beginIndex + 3] && (
            <div className="container--card" onClick={async () => buyItem(beginIndex + 3)}>
              <img className="secondaryCard" src={resultList[beginIndex + 3].url}></img>
              <div className="container--card--text">
                <div className="item--icon">
                  <i className="fa fa-check-circle-o">{resultList[beginIndex + 3].price}</i>
                </div>
                <div className="item--card-title text">{resultList[beginIndex + 3].title}</div>
                <div className="item--card-sub text">{resultList[beginIndex + 3].description}</div>
              </div>
            </div>
          )}
        </div>
        <div className="container--card-spot size-2">
          {resultList[beginIndex + 4] && (
            <div className="container--card border" onClick={async () => buyItem(beginIndex + 4)}>
              <img className="secondaryCard" src={resultList[beginIndex + 4].url}></img>
              <div className="container--card--text dark">
                <div className="item--icon">
                  <i className="fa fa-check-circle-o">{resultList[beginIndex + 4].price}</i>
                </div>
                <div className="item--card-title dark text">{resultList[beginIndex + 4].title}</div>
                <div className="item--card-sub dark text">{resultList[beginIndex + 4].description}</div>
              </div>
            </div>
          )}
        </div>
        <div className="container--card-spot size-1">
          {resultList[beginIndex + 5] && (
            <div className="container--card size-1" onClick={async () => buyItem(beginIndex + 5)}>
              <img className="secondaryCard" src={resultList[beginIndex + 5].url}></img>
              <div className="container--card--text">
                <div className="item--icon">
                  <i className="fa fa-check-circle-o">{resultList[beginIndex + 5].price}</i>
                </div>
                <div className="item--card-title text">{resultList[beginIndex + 5].title}</div>
                <div className="item--card-sub text">{resultList[beginIndex + 5].description}</div>
              </div>
            </div>
          )}
        </div>
        <div className="container--card-spot size-1">
          {beginIndex < resultList.length - 6 && (
            <div
              className="container--card-mini"
              onClick={() => {
                setBeginIndex(beginIndex + 6);
              }}>
              <div className="container--card-mini--content">
                <div className="container--card-mini--text">
                  <div className="item--card-sub text">NEXT</div>
                </div>
              </div>
            </div>
          )}
          {beginIndex >= 6 && (
            <div
              className="container--card-mini"
              onClick={() => {
                setBeginIndex(beginIndex - 6);
              }}>
              <div className="container--card-mini--content">
                <div className="container--card-mini--text">
                  <div className="item--card-sub text">PREVIOUS</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
