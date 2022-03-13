import boredIMG from './assets/sample_backgrounds/bored.jpg';
import hungryIMG from './assets/sample_backgrounds/hungry.jpg';
import poopIMG from './assets/sample_backgrounds/poop.jpg';
import sleepyIMG from './assets/sample_backgrounds/sleepy.jpg';

export const MOVE_UPDATE_INTERVAL = 20000;
export const MOVE_DURATION = '15s';
export const FOOD = 'food';
export const TRAVEL = 'travel';

export const consoleConfigs: { [key: string]: Object } = {
  'Tama Console Oval': {
    consolex: 112.19,
    consoley: 136.48,
    screenx: 18,
    screeny: 29,
    screenw: 68,
    screenh: 69,
    button1x: 27.93,
    button1y: 102.07,
    button1w: 14,
    button2x: 48.08,
    button2y: 104.38,
    button2w: 14,
    button3x: 69.32,
    button3y: 102.62,
    button3w: 14,
  },
  'Tama Console Whatever': {
    consolex: 112.19,
    consoley: 136.48,
    screenx: 18,
    screeny: 22,
    screenw: 75,
    screenh: 69,
    button1x: 21.43,
    button1y: 100.57,
    button1w: 17,
    button2x: 46.58,
    button2y: 92.88,
    button2w: 17,
    button3x: 72.82,
    button3y: 101.12,
    button3w: 17,
  },
};

export function brigthenColor(color: string, brigtness: any) {
  var result: any = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  var r_delta = Math.floor(r * brigtness);
  var g_delta = Math.floor(g * brigtness);
  var b_delta = Math.floor(b * brigtness);

  if (r + r_delta > 255) r_delta = 255 - r;
  if (g + g_delta > 255) g_delta = 255 - g;
  if (b + b_delta > 255) b_delta = 255 - b;

  r = r + r_delta;
  g = g + g_delta;
  b = b + b_delta;

  console.log(r, g, b);

  console.log('' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));

  return '' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function calcLoc(config: any) {
  let mult = 520 / config.consolex;
  let new_screenw = config.screenw * mult;
  let new_screenh = config.screenh * mult;
  let new_screeny = mult * config.screeny - config.consoley * mult;
  let new_screenx = mult * config.screenx;
  // let new_screenh = config.screenh * mult;
  let new_button1y = mult * config.button1y - config.consoley * mult;
  let new_button1x = mult * config.button1x;
  let new_button1w = config.button1w * mult;

  let new_button2y = mult * config.button2y - config.consoley * mult;
  let new_button2x = mult * config.button2x;
  let new_button2w = config.button2w * mult;

  let new_button3y = mult * config.button3y - config.consoley * mult;
  let new_button3x = mult * config.button3x;
  let new_button3w = config.button3w * mult;

  return [
    new_screenx,
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
    new_button3w,
  ];
}

export const sampleWallet = [
  {
    name: 'banana',
    type: 'food',
    value: '3',
    id: '1',
    uri: 'https://e7.pngegg.com/pngimages/796/636/png-clipart-banana-banana.png', // we can store this somewhere not in contract
  },
  {
    name: 'banana',
    type: 'food',
    value: '3',
    id: '2',
    uri: 'https://e7.pngegg.com/pngimages/796/636/png-clipart-banana-banana.png',
  },
  {
    name: 'apple',
    type: 'food',
    value: '2',
    id: '3',
    uri: 'https://image.similarpng.com/very-thumbnail/2020/07/Red-Apple-vector-PNG.png',
  },
  {
    name: 'banana',
    type: 'food',
    value: '3',
    id: '4',
    uri: 'https://e7.pngegg.com/pngimages/796/636/png-clipart-banana-banana.png',
  },
  {
    name: 'pinaple',
    type: 'food',
    value: '1',
    id: '5',
    uri: 'https://toppng.com/uploads/preview/pineapple-png-vector-11546986733j32wkgzdml.png',
  },

  {
    name: 'New York',
    type: 'travel',
    value: '100',
    id: '6',
    uri: 'https://www.pngmart.com/files/16/New-York-Cityscape-Transparent-PNG.png',
  },
];

export const sampleBackgrounds = {
  'im hungry': hungryIMG,
  'i need to shower': poopIMG,
  'im bored': boredIMG,
  '*yawn* im sleepy': sleepyIMG,
};
