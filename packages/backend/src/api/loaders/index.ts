import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
    Logger.info('✌️ DB loaded and connected!');

    // It returns the agenda instance because it's needed in the subsequent loaders
    // const { agenda } = await dependencyInjectorLoader({
    //     mongoConnection,
    //     models: [
    //         userModel,
    //         // salaryModel,
    //         // whateverModel
    //     ],
    // });
    Logger.info('✌️ Dependency Injector loaded');

    // await jobsLoader({ agenda });
    // Logger.info('✌️ Jobs loaded');

    expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};