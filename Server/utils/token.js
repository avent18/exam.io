import jwt from 'jsonwebtoken'

const generateToken = async(userId)=>{
try {
  const token =  jwt.sign({id:userId}, process.env.SECRET_JWT, {expiresIn:"1d"});
  return token;
} catch (error) {
  console.error(`generate token error ${error}`);
  throw new Error("Token generation failed");
}
}
export default generateToken;