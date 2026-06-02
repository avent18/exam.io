import jwt from 'jsonwebtoken'


export const isAuthenticated = async(req, res, next)=>{
 try {
  let {token} = req.cookies;
  if(!token){
    return res.status(400).json({message:"token not found or user not authorized"})
  }
  let verifiedToken =  jwt.verify(token, process.env.SECRET_JWT);
  req.userId = verifiedToken.userId || verifiedToken._id || verifiedToken.id;
  next();
 } catch (error) {
  return res.status(400).json({message:"UnAuthorization Error"})
 }
}