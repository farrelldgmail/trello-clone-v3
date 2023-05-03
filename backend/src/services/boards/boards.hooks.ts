import { fastJoin, ResolverMap } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import { BoardInterface } from '@/shared/types/boards';

const ownerResolver: ResolverMap<any> = {
  joins: {
    owner: () => async (board: BoardInterface, context:HookContext) => {
      // eslint-disable-next-line no-param-reassign
      board.owner = (await context.app.services.users.get(board.postedBy, {
        query: { $select: ['displayname', 'email'] }
      }));
      return board;
    }
  }
};

const query = {
  owner: true,
};

const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => { resolve(context); }, 500); // REM TODO DF 3000
});

const addPostedBy = (context:any) => {
  // eslint-disable-next-line no-underscore-dangle
  context.data.postedBy = context.params.user._id;
};

const limitToCurrentUser = (context:any) => {
  // eslint-disable-next-line no-underscore-dangle
  context.params.query = { postedBy: context.params.user._id.toString() };
};

export default {
  before: {
    all: [wait],
    find: [limitToCurrentUser],
    get: [limitToCurrentUser],
    create: [addPostedBy],
    update: [addPostedBy],
    patch: [addPostedBy],
    remove: []
  },

  after: {
    all: [fastJoin(ownerResolver, query)],
    // all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
