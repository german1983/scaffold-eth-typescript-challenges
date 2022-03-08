import { NFTStorage, Blob } from 'nft.storage';

const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM4MjYwYTczQzI1ODZEODMxODlmMEQ2M0Q5NUZlYUVDNWY1NDU0ZmQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NjU5ODE3OTUwMywibmFtZSI6IlRhbWF2ZXJzZSJ9.na-vsUo7qamdGSrvOCqGbKSE0m4h2MdT-n6_BSQx15I';
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

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

export async function storeExampleNFT(options : any | undefined) {
  const toMint = mintTemplate(options);
  const image = toMint.image;
  console.log("Image being minted (base64): ", image);
  const myNFT = JSON.stringify(toMint);
  const someData = new Blob([myNFT]);
  const cid = await client.storeBlob(someData)
  return cid;
}
export function mintTemplate(options : any) {
  console.log('PERFORMING TRANSACTION WITH CUSTOMIZABLE');
  console.log(options);
  var decoded = unescape(encodeURIComponent(options));
  return {
    description: "This is a great Tama Container __TEMPLATE__",
    image: 'data:image/svg+xml;base64,' + btoa(decoded), // Buffer.from(decoded, 'base64'),
    name: 'Tama Container __TEMPLATE__',
    // TODO: The attributes should have a 1:1 with the Template Properties... I'm not updating them because I'm not sure how far we'll go in terms of customization, but we should make sure each attribute is reflected
    attributes: [
      {
        trait_type: 'guscioFill',
        value: 1,
      },
      {
        trait_type: 'Eyes',
        value: 'googly',
      },
      {
        trait_type: 'Stamina',
        value: 42,
      },
    ],
  }
};