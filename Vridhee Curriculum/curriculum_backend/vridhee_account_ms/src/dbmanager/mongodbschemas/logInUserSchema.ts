import mongoose from 'mongoose';

export const logInUserSchema = new mongoose.Schema({
    userId: { type: String },
    sid: { type: String },
    google: { id: { type: String, default: "" }, accessToken: { type: String, default: "" } },
    jwtToken: {
        jwtAccessToken: { type: String, default: "" },
        jwtRefreshToken: { type: String, default: "" },
        expiresin: { type: Number, default: "" }
    },
    createddate: { type: Date, default: Date.now() },
    location: { type: String, default: "" }
});