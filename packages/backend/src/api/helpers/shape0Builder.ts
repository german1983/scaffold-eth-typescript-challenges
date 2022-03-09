import { IConsole } from "../interfaces/IConsole";
import { brigthenColor } from "./utils";

export default function Build(props: IConsole): string {
    return `<svg id="tamagotchi" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.19 136.48">
    <title>title</title>
    <g id="struttura">
      <g id="guscio">
        <path
          d="M49,2C13.44,3.63-6,57.45,4.22,95c15.63,59,98.6,47.27,105.12,0C117.22,51.12,89.74-4.08,49,2Z"
          fill="#` + props.backColor + `"
          stroke="#` + props.lineColor + `"
          stroke-miterlimit="10"
          stroke-width="2"
        />
        <path
          d="M47.06,10.06C16.47,11.5-.25,57.75,8.54,90,22,140.72,93.29,130.66,98.89,90,105.66,52.31,82,4.87,47.06,10.06Z"
          fill="#` + props.middleColor + `
        />
        <line
          x1="2.46"
          y1="65.44"
          x2="109.18"
          y2="65.44"
          fill="#` + props.lineColor + `
          stroke="#"` + props.lineColor + `
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </g>
      <g id="bottoni">
        <circle cx="35.91" cy="109.69" r="7" fill="#` + brigthenColor(props.buttonColor, 0.4) + ` />
        <circle cx="55.99" cy="111.89" r="7" fill="#` + brigthenColor(props.buttonColor, 0.4) + ` />
        <circle cx="77.31" cy="110.29" r="7" fill="#` + brigthenColor(props.buttonColor, 0.4) + ` />
        <circle cx="34.93" cy="109.07" r="7" fill="#` + props.buttonColor + ` />
        <circle cx="55.08" cy="111.38" r="7" fill="#` + props.buttonColor + ` />
        <circle cx="76.32" cy="109.62" r="7" fill="#` + props.buttonColor + ` />
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
      fill="#` + props.frontColor + `
      stroke="#` + props.lineColor + `
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width="2"
    />
  </svg>`
}