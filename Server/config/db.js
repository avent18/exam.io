import mongoose from 'mongoose'


const connnectDB = async()=>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongoose connected ${conn.connection.host}`)
  }catch(error){
    console.log(`mongoose connection error ${error}`)
  }
}
export default connnectDB;