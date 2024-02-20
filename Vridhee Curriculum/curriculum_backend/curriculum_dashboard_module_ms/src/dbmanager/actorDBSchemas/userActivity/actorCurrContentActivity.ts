import mongoose from 'mongoose';

export const actorCurrContentActivitySchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	sub_id: { type: String, required: true },
	chap_id: { type: String, required: true },
	t_id: { type: String, required: true },
	cont_id: { type: String, default: "" },
	cont_sts: { type: Number, default: 0 },
	cont_ty: { type: Number, default: 0 },
	cont_lang: { type: String, default: "" },
	st_dts: { type: String, default: new Date().getTime() },
	tot_dur: { type: Number, default: 0 },
	last_watch_time: { type: Number, default: 0 },
	cr_dts: { type: String, default: new Date().getTime() },
	up_dts: { type: String, default: new Date().getTime() }
}) 