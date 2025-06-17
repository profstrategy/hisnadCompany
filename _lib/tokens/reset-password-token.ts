import jwt from "jsonwebtoken";
const RESET_PASSWORD_TOKEN_SECRET = process.env.RESET_PASSWORD_SECRET!;
const EXPIRY_TIME = "1h";

export const generateResetPasswordToken = (userId:string) => {
return jwt.sign({
    userId,
    type: 'active',
    iat: Math.floor(Date.now() / 1000)
},
RESET_PASSWORD_TOKEN_SECRET,
{ expiresIn:EXPIRY_TIME }
)
}