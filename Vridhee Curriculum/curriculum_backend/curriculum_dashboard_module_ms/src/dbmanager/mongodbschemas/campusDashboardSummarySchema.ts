import mongoose from 'mongoose';

export const campusDashboardSummarySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    curr_cat_id: { type: String, required: true },
    curr_grade_id: { type: String, required: true },
    sub_id: { type: String, required: true },
    curr_body: {
        chapter_id: { type: String, required: true },
        curr_t_id: { type: String, required: true },
        last_mentor_msg: { type: String, required: true },
        last_help_asked: { type: String, required: true }
    },
    ttl_buddy_cnt: {
        completed: { type: Number, required: true },
        inprogress: { type: Number, required: true },
        doubt: { type: Number, required: true },
        activity: { type: Number, required: true },
        collabration: { type: Number, required: true }
    },
    hrs_sts: {
        sts: { type: String, required: true },
        nxt_std_hr: { type: String, required: true },
        prgs_percentage: { type: String, required: true },
        hrs_completed: { type: Number, required: true },
        hrs_left: { type: Number, required: true },
        ttl_topic_completed: { type: Number, required: true },
        ttl_vcoin: { type: Number, required: true }
    },
    studyplan: {},
	activities: {},
	collaboration: {},
	header: {
        rating: { type: Number, required: true },
        ttl_students: { type: Number, required: true },
        ttl_mentors: { type: Number, required: true },
        ttl_hour_completed: { type: Number, required: true },
        ttl_topic_completed: { type: Number, required: true },
        ttl_buddies_completed: { type: Number, required: true },
        ttl_buddies_inprogress: { type: Number, required: true },
        ttl_vcoin: { type: Number, required: true }
	},
    body: {
        ttl_video_completed: { type: Number, required: true },
        ttl_e_content_completed: { type: Number, required: true },
        ttl_imp_note_completed: { type: Number, required: true },
		ttl_question_completed: { type: Number, required: true },
		ttl_assignment_completed: { type: Number, required: true },
		ttl_doubt: { type: Number, required: true },
		ttl_revision_completed: { type: Number, required: true },
        ttl_example_completed: { type: Number, required: true }
    }
})