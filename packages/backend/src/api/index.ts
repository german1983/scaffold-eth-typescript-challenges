import { Router } from 'express';
import tamaconsoles from './routes/tamaconsoles';

export default () => {
    const app = Router();
    tamaconsoles(app);

    return app
}