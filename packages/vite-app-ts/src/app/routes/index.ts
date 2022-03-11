import { lazier } from 'eth-hooks/helpers';

// the components and pages are lazy loaded for performance and bundle size reasons
// code is in the component file

export const YourCollectibles = lazier(() => import('./your-collectibles/YourCollectibles'), 'YourCollectibles');
export const TamaDEX = lazier(() => import('./tama-dex/TamaDex'), 'TamaDex');
export const TamaConsole = lazier(() => import('./tamaconsole/TamaConsole'), 'TamaConsole');
export const TamaMarket = lazier(() => import('./tamamarket/TamaMarket'), 'TamaMarket');
export const TamaPlayground = lazier(() => import('./tamaplayground/TamaPlayground'), 'TamaPlayground');
export const TamaMichael = lazier(() => import('./TamaMichael/TamaMichael'), 'TamaMichael');
export const Checkout = lazier(() => import('./checkout/Checkout'), 'Checkout');
