import { Router } from 'express';
import tamaconsoles from './routes/tamaconsoles';

export default () => {
    const app = Router();
    tamaconsoles(app);
    app.get("*", function (req, res) {
        res.render("This is the Tamaverse API");
    });
    return app
}