import jwt, { Secret } from "jsonwebtoken";
import { Response, Request, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authMidd = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response<any> | void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as jwt.JwtPayload;
    console.log(decoded);
    

    
    
    
    // Ensure the token contains userID
    if (!decoded.userId) {
      
      
      return res.status(401).json({ msg: "Token is not valid" });
    }
    
    req.userId = decoded.userId;
    

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMidd;
