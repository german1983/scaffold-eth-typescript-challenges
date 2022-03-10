import { Router, Request, Response, NextFunction } from 'express'
import { IConsole } from '../interfaces/IConsole'
import { NFTStorage, Blob } from 'nft.storage';
import shapeBuilder from '../helpers/shapeBuilder';
import GetShapeTitle from '../helpers/shapeEnumMapper';

export default (app: Router) => {

    const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY;
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

    async function storeExampleNFT(options: IConsole) {
        const imageToMint = shapeBuilder(options);
        const toMint = buildMetadata(imageToMint, options);
        const image = toMint.image;
        console.log("Image being minted (base64): ", image);
        const myNFT = JSON.stringify(toMint);
        const someData = new Blob([myNFT]);
        const cid = await client.storeBlob(someData)
        return cid;
    }

    function buildMetadata(shapeSVG: string, options: IConsole) {
        console.log('PERFORMING TRANSACTION WITH CUSTOMIZABLE');
        const cleanSVG = shapeSVG.replace(/[\r\n]+/gm, '')
        console.log(cleanSVG);
        var decoded = unescape(encodeURIComponent(cleanSVG));
        const shapeType = GetShapeTitle(options.shape);
        return {
            description: "Customized " + shapeType + " Console",
            image: 'data:image/svg+xml;base64,' + btoa(decoded), // Buffer.from(decoded, 'base64'),
            name: 'Tama Console ' + shapeType,
            attributes: [
                {
                    trait_type: 'backColor',
                    value: options.backColor,
                },
                {
                    trait_type: 'middleColor',
                    value: options.middleColor,
                },
                {
                    trait_type: 'frontColor',
                    value: options.frontColor,
                },
                {
                    trait_type: 'buttonColor',
                    value: options.buttonColor,
                },
                {
                    trait_type: 'lineColor',
                    value: options.lineColor,
                },
                {
                    trait_type: 'shape',
                    value: shapeType,
                }
            ],
        }
    };

    app.post('/consoles',
        async (req: Request, res: Response, next: NextFunction) => {
            console.log('Calling Sign-Up endpoint with body: %o', req.body);
            try {
                const consoleBody = req.body as IConsole;
                console.log('Calling Sign-Up endpoint with body: %o', consoleBody);

                const ipfsCidAssigned = await storeExampleNFT(consoleBody); // TODO replace with real options selected by the user
                console.log('Uploaded Hash: ', ipfsCidAssigned);
                // const authServiceInstance = Container.get(AuthService);
                // const { user, token } = await authServiceInstance.SignUp(req.body as IConsole);
                return res.status(201).json({ ipfsCid: ipfsCidAssigned });
            } catch (e) {
                console.log('🔥 error: %o', e);
                return next(e);
            }
        },
    )
}