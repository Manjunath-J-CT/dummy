const { default: mongoose } = require("mongoose");

const connection: { isConnected?: number } = {};

export const connectToDB = async (): Promise<void> => {
  try {
    //checks connection is already present
    if (connection.isConnected) {
      return; //if already connected
    }

    const db = await mongoose.connect(process.env.MONGO);

    //if not connected update new connection
    connection.isConnected = db.connections[0].readyState;
    console.log("connection successfull");
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};
