export const consoleConfigs = {
  1: {
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
  2: {
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

export function calcLoc(config: Object) {
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
