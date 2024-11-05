import mongoose from "mongoose";

const getConnection = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then((connection)=>{
            console.log("DB is connected...")
        })
        .catch((error)=>{
            console.log("failed to connect to DB");
        })
    } catch (error) {
        console.log(error.message);
    }
};

export default getConnection;