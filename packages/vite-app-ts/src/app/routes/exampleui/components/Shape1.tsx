import { FC } from 'react';
import { brigthenColor } from '../utils';
export interface IShape {
  backColor: any;
  middleColor: any;
  frontColor: any;
  buttonColor: any;
  lineColor: any;
}
export const Shape1: FC<IShape> = (props) => {
  return (
    <svg id="tamagotchi" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.19 136.48">
      <title>title</title>
      <g id="struttura">
        <g id="guscio">
          <path
            d="M49,2C13.44,3.63-6,57.45,4.22,95c15.63,59,98.6,47.27,105.12,0C117.22,51.12,89.74-4.08,49,2Z"
            fill={'#' + props.backColor}
            stroke={'#' + props.lineColor}
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <path
            d="M47.06,10.06C16.47,11.5-.25,57.75,8.54,90,22,140.72,93.29,130.66,98.89,90,105.66,52.31,82,4.87,47.06,10.06Z"
            fill={'#' + props.middleColor}
          />
          <line
            x1="2.46"
            y1="65.44"
            x2="109.18"
            y2="65.44"
            fill={'#' + props.lineColor}
            stroke={'#' + props.lineColor} //color here
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
        </g>
        <g id="bottoni">
          <circle cx="35.91" cy="109.69" r="7" fill={'#' + brigthenColor(props.buttonColor, 0.4)} />
          <circle cx="55.99" cy="111.89" r="7" fill={'#' + brigthenColor(props.buttonColor, 0.4)} />
          <circle cx="77.31" cy="110.29" r="7" fill={'#' + brigthenColor(props.buttonColor, 0.4)} />
          <circle cx="34.93" cy="109.07" r="7" fill={'#' + props.buttonColor} />
          <circle cx="55.08" cy="111.38" r="7" fill={'#' + props.buttonColor} />
          <circle cx="76.32" cy="109.62" r="7" fill={'#' + props.buttonColor} />
        </g>
        <g id="lucine">
          <path
            d="M36.12,25.77l-3-.61a.88.88,0,0,0-.79.23l-2.19,2.1A.88.88,0,0,1,28.68,27l-.34-3a.91.91,0,0,0-.46-.69l-2.67-1.42a.89.89,0,0,1,.05-1.6L28,19a.88.88,0,0,0,.5-.65l.54-3a.89.89,0,0,1,1.53-.44l2,2.24a.88.88,0,0,0,.77.28l3-.42a.89.89,0,0,1,.9,1.32L35.8,21a.93.93,0,0,0,0,.83l1.32,2.72A.89.89,0,0,1,36.12,25.77Z"
            fill="none"
          />
          <path
            d="M56.07,22.83l-2.7-1.37a.9.9,0,0,0-.83,0l-2.66,1.45a.89.89,0,0,1-1.3-.92l.47-3a.85.85,0,0,0-.27-.78l-2.19-2.09a.89.89,0,0,1,.47-1.52l3-.47a.89.89,0,0,0,.66-.5L52,10.92a.89.89,0,0,1,1.59,0L55,13.59a.9.9,0,0,0,.68.48l3,.39A.89.89,0,0,1,59.17,16L57,18.11a.89.89,0,0,0-.24.79l.55,3A.88.88,0,0,1,56.07,22.83Z"
            fill="none"
          />
          <path
            d="M76.44,27.34l-2.25-2a.94.94,0,0,0-.81-.2l-2.94.72a.89.89,0,0,1-1-1.22l1.22-2.77a.85.85,0,0,0-.06-.82L69,18.45a.89.89,0,0,1,.85-1.35l3,.3a.9.9,0,0,0,.77-.3l1.95-2.31a.89.89,0,0,1,1.55.38l.64,3a.9.9,0,0,0,.53.64l2.8,1.14a.89.89,0,0,1,.11,1.59L78.59,23a.86.86,0,0,0-.44.7l-.23,3A.89.89,0,0,1,76.44,27.34Z"
            fill="none"
          />
        </g>
      </g>
      <rect
        id="schermo"
        x="18"
        y="29"
        width="68"
        height="69"
        rx="6.41"
        fill={'#' + props.frontColor}
        stroke={'#' + props.lineColor}
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      {/* <path
          id="schermo-riflesso"
          d="M56.76,35.18l23.6-.13a3.39,3.39,0,0,1,3.4,3.41L83.63,61.3a1.39,1.39,0,0,1-2.55.77A90,90,0,0,0,56,37.65,1.34,1.34,0,0,1,56.76,35.18Z"
          fill="#fff"
        /> */}
      {/* <g id="azioni">
          <rect
            x="25.27"
            y="37.2"
            width="9.9"
            height="23.36"
            rx="4.95"
            fill="#fff"
            stroke="#d3d0d1"
            stroke-miterlimit="10"
          />
          <path
            d="M34.08,43.05a2.13,2.13,0,0,1-.68,1.44l0,0-3.09,2.79L27.2,44.52l0,0a2.07,2.07,0,0,1,1.49-3.6,2.14,2.14,0,0,1,1.29.53l.32.3.34-.31a2.09,2.09,0,0,1,2.93.15A2,2,0,0,1,34.08,43.05Z"
            fill="#e897be"
            stroke="#d3d0d1"
            stroke-miterlimit="10"
            stroke-width="0.75"
          />
          <path
            d="M33.05,53.76a3.74,3.74,0,0,1-3.73,3.76,3.59,3.59,0,0,1-1.9-.53h0a3.06,3.06,0,0,0,2.74-3.32,3.14,3.14,0,0,0-2.48-3.3A3.63,3.63,0,0,1,29.32,50,3.75,3.75,0,0,1,33.05,53.76Z"
            fill="#ffeb00"
            stroke="#d3d0d1"
            stroke-miterlimit="10"
            stroke-width="0.75"
          />
        </g> */}
      {/* <ellipse id="base" cx="54.26" cy="91.24" rx="28.02" ry="4.19" fill="#fff" />
        <g id="stelline">
          <path
            d="M52.29,68.08l-1.07-1a.43.43,0,0,0-.38-.1l-1.38.34A.42.42,0,0,1,49,66.8l.58-1.31a.39.39,0,0,0,0-.39l-.75-1.22a.42.42,0,0,1,.4-.63l1.42.14a.41.41,0,0,0,.36-.15l.93-1.09a.42.42,0,0,1,.73.19l.3,1.39a.4.4,0,0,0,.25.3l1.32.54a.42.42,0,0,1,.05.75L53.3,66a.43.43,0,0,0-.21.33L53,67.8A.42.42,0,0,1,52.29,68.08Z"
            fill="#fff"
          />
          <path
            d="M61,63.34l-1.07-1a.39.39,0,0,0-.37-.09l-1.39.33a.42.42,0,0,1-.49-.57l.58-1.31a.39.39,0,0,0,0-.39l-.75-1.21a.42.42,0,0,1,.4-.64l1.42.14a.4.4,0,0,0,.36-.14l.93-1.09a.42.42,0,0,1,.73.18l.3,1.4a.41.41,0,0,0,.25.29l1.32.55a.42.42,0,0,1,.06.75L62,61.31a.42.42,0,0,0-.21.33l-.1,1.42A.42.42,0,0,1,61,63.34Z"
            fill="#fff"
          />
          <path
            d="M53.46,56l-1.33-1.2a.5.5,0,0,0-.47-.11l-1.74.43a.53.53,0,0,1-.6-.73l.73-1.65a.53.53,0,0,0,0-.49l-.94-1.53a.53.53,0,0,1,.5-.8l1.78.17a.51.51,0,0,0,.45-.18L53,48.55a.51.51,0,0,1,.9.23l.38,1.76a.49.49,0,0,0,.31.37l1.65.68a.54.54,0,0,1,.06.95l-1.54.91a.52.52,0,0,0-.26.42l-.14,1.79A.52.52,0,0,1,53.46,56Z"
            fill="#fff"
          />
          <path
            d="M58.33,71.45l-.5-.46a.2.2,0,0,0-.18,0l-.66.17a.2.2,0,0,1-.22-.28l.28-.63A.21.21,0,0,0,57,70l-.35-.59a.21.21,0,0,1,.2-.31l.67.06a.19.19,0,0,0,.17-.07l.44-.53a.19.19,0,0,1,.34.08l.14.68a.17.17,0,0,0,.12.14l.62.26a.21.21,0,0,1,0,.37l-.58.35a.2.2,0,0,0-.1.16l-.06.7A.2.2,0,0,1,58.33,71.45Z"
            fill="#fff"
          />
          <path
            d="M61.82,53l-.66-.6a.24.24,0,0,0-.23-.06l-.86.23a.26.26,0,0,1-.29-.37l.36-.83a.28.28,0,0,0,0-.25l-.45-.77a.27.27,0,0,1,.24-.41l.88.09A.26.26,0,0,0,61,50l.57-.69a.25.25,0,0,1,.45.11l.18.88a.26.26,0,0,0,.16.19l.81.34a.27.27,0,0,1,0,.48l-.77.46a.32.32,0,0,0-.13.21l-.07.91A.26.26,0,0,1,61.82,53Z"
            fill="#fff"
          />
        </g> */}
      {/* <g id="mirtillo">
          <path
            d="M79.78,84.65c-.78,5.94-6.62,8.78-13.09,7.65-6-1-10.94-4.93-10.49-10.75s6.7-10.06,13.21-9.2S80.56,78.71,79.78,84.65Z"
            fill="#2472b4"
            stroke="#2e3180"
            stroke-miterlimit="10"
          />
          <path
            d="M65,73.76,64.8,70.4a.2.2,0,0,1,.35-.13L67.31,73a.2.2,0,0,0,.29,0l2.65-2.75a.2.2,0,0,1,.33.1l.65,3.31a.19.19,0,0,0,.29.13L75,71.56a.2.2,0,0,1,.3.19l-.56,3.51"
            fill="#2472b4"
            stroke="#2e3180"
            stroke-miterlimit="10"
          />
          <ellipse
            cx="73.3"
            cy="83.36"
            rx="6.42"
            ry="5.03"
            transform="translate(-18.91 145.17) rotate(-82.51)"
            fill="#368cc6"
          />
          <path
            d="M58.78,80.6l.4.14-.12,0a3.14,3.14,0,0,1,.75.44l-.1-.08.14.11a.48.48,0,0,0,.7,0,.47.47,0,0,0,.15-.35.49.49,0,0,0-.15-.35,3.93,3.93,0,0,0-1.5-.82.5.5,0,0,0-.62.35.51.51,0,0,0,.35.61Z"
            fill="#2e3180"
          />
          <path
            d="M64.14,83.33a2.24,2.24,0,0,1,.39.14l-.11,0a3.35,3.35,0,0,1,.75.44l-.1-.08.14.11a.48.48,0,0,0,.7,0,.47.47,0,0,0,.15-.35.53.53,0,0,0-.15-.36,4.22,4.22,0,0,0-1.5-.82.5.5,0,1,0-.27,1Z"
            fill="#2e3180"
          />
          <path
            d="M59.85,84.78a2,2,0,0,0,.81,1,1.93,1.93,0,0,0,1.17.29.56.56,0,0,0,.35-.15.49.49,0,0,0,.15-.35.49.49,0,0,0-.15-.36.46.46,0,0,0-.35-.14,1.3,1.3,0,0,1-.34,0l.14,0a1.56,1.56,0,0,1-.37-.1l.12,0a1.77,1.77,0,0,1-.33-.19l.1.07a1.33,1.33,0,0,1-.27-.26l.08.1a1.69,1.69,0,0,1-.17-.29l.05.12,0-.08a.5.5,0,0,0-.23-.3.46.46,0,0,0-.38,0,.49.49,0,0,0-.35.61Z"
            fill="#2e3180"
          />
        </g> */}
    </svg>
  );
};
