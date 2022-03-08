import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import config from '@/config'
import { IConsole } from '../interfaces/IConsole'
import { Logger } from 'winston'

export default (app: Router) => {

    const agendaInstance = Container.get('agendaInstance')

    app.post('/consoles',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
            try {
                const consoleBody = req.body as IConsole;
                // const authServiceInstance = Container.get(AuthService);
                // const { user, token } = await authServiceInstance.SignUp(req.body as IConsole);
                return res.status(201).json({});
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    )
}