import jwt from "jsonwebtoken";

export async function TokenValidationMiddleware(req, res, next){

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    const secretKey = process.env.JWT_SECRET;
    const { id } = jwt.verify(token, secretKey);

    try{
        if(!token || !id){ return res.sendStatus(401)};
    }
    catch{
        res.sendStatus(500);
    }

    res.locals.id = id;
    console.log(res.locals.id);
    next();
}
