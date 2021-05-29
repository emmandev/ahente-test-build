import * as mongoose from 'mongoose';

export const start = async (url?: string) => {
  await mongoose.connect(
    `${url || 'mongodb://localhost'}/ahente?retryWrites=true&w=majority`,
    {
      poolSize: 5,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export const stop = async () => {
  await mongoose.disconnect();
};
