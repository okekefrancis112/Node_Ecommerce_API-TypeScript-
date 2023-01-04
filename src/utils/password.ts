import bcrypt from 'bcrypt';
import crypto from 'crypto';



export const isPasswordMatched = async (enteredPassword:string, userPassword:string) => {
    return await bcrypt.compare(enteredPassword, userPassword);
};


export const createPasswordResetToken = async () => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    const passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 mins
    return resetToken;
};