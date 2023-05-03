// Initializes the `boards` service on path `/boards`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '@/declarations';
import { Boards } from './boards.class';
import createModel from '../../models/boards.model';
import hooks from './boards.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'boards': Boards & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/boards', new Boards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('boards');

  service.hooks(hooks);
}
