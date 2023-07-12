import mongoose, { ConnectOptions } from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CNN,
      // || 'mongodb+srv://kevcollazos:X9660610mnb@app-boreal.b0txes2.mongodb.net/dev'
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD.. ver logs');
  }
};
