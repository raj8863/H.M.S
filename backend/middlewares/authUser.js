import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // 1. Check for 'token' 
    const { token } = req.headers; 

    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Attach userId to request
    req.userId = token_decode.id; 
    
    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;