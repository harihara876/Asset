import { microservicesurl } from './config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = microservicesurl.JWT_SECRET;
const REFRESH_JWT_SECRET = microservicesurl.REFRESH_JWT_SECRET;
const jwtExpiry = microservicesurl.REF_TOKEN_EXP; // 30days
const jwtMin = microservicesurl.TOKEN_EXP //30 min

export async function generateToken(user) {
    try {
        const token = jwt.sign({
            user_id: user._id,
            act_typ: user.act_typ,
            email: user.email,
            cont_num: user.cont_num,
            disp_name: user.disp_name,
            vdisp_name: user.vdisp_name,
            profileId: user.profileId,
            gender: user.gender,
            dob: user.dob,
        }, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: jwtMin
        });

        const refreshToken = jwt.sign({
            user_id: user._id,
            act_typ: user.act_typ,
            email: user.email,
            cont_num: user.cont_num,
            disp_name: user.disp_name,
            vdisp_name: user.vdisp_name,
            profileId: user.profileId,
            gender: user.gender,
            dob: user.dob,
        }, REFRESH_JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: jwtExpiry
        });
        let expiryMinutes = jwtMin.substring(0, jwtMin.length - 1);
        return { token, refreshToken, expiresIn: parseInt(expiryMinutes) };
    } catch (error) {
        return error
    }
}