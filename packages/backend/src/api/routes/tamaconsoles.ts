import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import config from '@/config'
import { IConsole } from '../interfaces/IConsole'

export default (app: Router) => {

    // const agendaInstance = Container.get('agendaInstance')

    app.post('/consoles',
        async (req: Request, res: Response, next: NextFunction) => {
            console.log('Calling Sign-Up endpoint with body: %o', req.body);
            try {
                const consoleBody = req.body as IConsole;
                console.log('Calling Sign-Up endpoint with body: %o', consoleBody);
                // const authServiceInstance = Container.get(AuthService);
                // const { user, token } = await authServiceInstance.SignUp(req.body as IConsole);
                return res.status(201).json({});
            } catch (e) {
                console.log('🔥 error: %o', e);
                return next(e);
            }
        },
    )
}