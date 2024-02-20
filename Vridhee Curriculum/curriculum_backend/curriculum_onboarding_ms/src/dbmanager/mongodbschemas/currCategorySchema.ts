import mongoose from 'mongoose';

export const currCategorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	seq: { type: Number, required: true },
	grades: [
		{
			id: { type: String, required: true },
			seq: { type: Number, required: true },
			val: { type: String, required: true },
			sub_data: [
				{
					sub_id: { type: String, default: "" },
					desc: { type: String, default: "" },
					will_learn: ["", ""],
					crs_incl: ["", ""],
					t_header: {
						rating: { type: Number, default: 0 },
						ttl_user_rating: { type: Number, default: 0 },
						ttl_learner: { type: Number, default: 0 },
						ttl_mentor: { type: Number, default: 0 },
						ttl_hour: { type: Number, default: 0 },
						ttl_topic: { type: Number, default: 0 },
						ttl_vcoin: { type: Number, default: 0 }
					},
					t_content: {
						ttl_video: { type: Number, default: 0 },
						ttl_e_content: { type: Number, default: 0 },
						ttl_imp_notes: { type: Number, default: 0 },
						ttl_question: { type: Number, default: 0 },
						ttl_assignment: { type: Number, default: 0 },
						ttl_doubt: { type: Number, default: 0 },
						ttl_revision: { type: Number, default: 0 },
						ttl_example: { type: Number, default: 0 }
					}
				}
			]
		}
	]
})