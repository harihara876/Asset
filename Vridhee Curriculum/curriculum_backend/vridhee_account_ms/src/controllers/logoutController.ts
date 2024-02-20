import { Request, Response, NextFunction } from 'express';
import { APIResponse } from "../utils/status";
import { updateUserById, } from "../services/loginService";
import { getUserById } from "../services/userDetailService";
interface IUserId {
    "tokenuserid": string,
}

export async function logout(req: Request<{}, {}, IUserId, {}>, res: Response, next: NextFunction) {
    try {
        const { tokenuserid } = req.body;
        const user = await getUserById(tokenuserid);
        if (!user) {
            return res.status(200).send(new APIResponse(200, "User not found."));
        }
        const userUpdated = await updateUserById(tokenuserid, { isUserLogIn: false })
        if (userUpdated) {
            return res.status(200).send(new APIResponse(200, "User logged out."));
        } else {
            return res.status(400).send(new APIResponse(400, "User not logged out."));
        }
    }
    catch (error) {
        return res.send(new APIResponse(500, error.message))
    }
}