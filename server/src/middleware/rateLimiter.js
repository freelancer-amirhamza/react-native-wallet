const ratelimit = require("../config/upstash");



const rateLimiter = async(req,res,next)=>{
    try {
        // here we just kept it simple
        // in a real-world-app you'd like to put the userId or ipAddress as your key.
        const {success} = await ratelimit.limit("my-rate-limit");
        if(!success){
            return res.status(429).json({
                success:false,
                error:true,
                message: "Too many requests, please try again later!"
            })
        };
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            error: true,
            message: error.message || "Internal server error!",
        });
        next(error);
    }
};


module.exports = rateLimiter;