import mongoose from 'mongoose';

export const curriculamTopicSummarySchema = new mongoose.Schema({
    t_id: { type: String, required: true },
    t_header: {
        rating: { type: Number, default: 0 },
        ttl_user_rating: { type: Number, default: 0 },
        ttl_learner: { type: Number, default: 0 },
        ttl_mentor: { type: Number, default: 0 },
        ttl_hour: { type: Number, default: 0 },
        ttl_topic_attempted: { type: Number, default: 0 },
        ttl_topic: { type: Number, default: 0 },
        ttl_buddies_completed: { type: Number, default: 0 },
        ttl_buddies_inprogress: { type: Number, default: 0 },
        ttl_vcoin: { type: Number, default: 2 }
    },
    t_content: {
        ttl_video: { type: Number, default: 0 },
        ttl_e_content: { type: Number, default: 0 },
        ttl_imp_notes: { type: Number, default: 0 },
        ttl_question: { type: Number, default: 0 },
        ttl_assignment: { type: Number, default: 0 },
        ttl_doubt: { type: Number, default: 0 },
        ttl_revision: { type: Number, default: 0 },
        ttl_discussion: { type: Number, default: 0 },
        ttl_vcoin: { type: Number, default: 2 }
    },
    t_body: {
        will_learn: { type: Array },
        mentors_list: [
            {
                userid: { type: String, required: true },
                rating: { type: Number, default: 0 },
                ttl_course: { type: Number, default: 0 },
                message: { type: String, required: true }
            }
        ]
    },
    t_includes: [
        {
            desc: { type: String, required: true }
        }
    ]
})