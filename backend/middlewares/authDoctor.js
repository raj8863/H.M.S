import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    
    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // --- FIX STARTS HERE ---
    // 1. Initialize req.body if it doesn't exist (common in GET requests)
    if (!req.body) {
      req.body = {}; 
    }

    // 2. Now it is safe to set the property
    req.body.docId = token_decode.id; 
 

    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;