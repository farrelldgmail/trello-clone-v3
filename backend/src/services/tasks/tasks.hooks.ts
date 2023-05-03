const addPostedBy = (context:any) => {
  context.data.postedBy = context.params.user._id;
};

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [addPostedBy],
    update: [addPostedBy],
    patch: [addPostedBy],
    remove: []
  },

  after: {
    all: [],
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
