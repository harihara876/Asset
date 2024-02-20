import mongoose from 'mongoose';

const validateCampusUserOnBoard = (data) => {
    try {
        data = JSON.parse(data);
        if (!data.stu_status) {
            return { msg: 'Student status is required.', err: false };
        };
        if (!data.roll_no) {
            return { msg: 'Roll number is required.', err: false };
        };
        const response = validateBatchSessionData(data.courseDetails)
        if (!response.err) {
            return response;
        };
        return { err: true };


        function validateBatchSessionData(courseData) {
            for (const course of courseData) {
                if (!course.campus_course_id && !mongoose.Types.ObjectId.isValid(course.campus_course_id)) {
                    return { msg: "Invalid Course Id", err: false };
                };
                const schema = {
                    batch_id: { type: 'string', required: true },
                    session_start_year: { type: 'number', required: true },
                    session_end_year: { type: 'number', required: true },
                    fee_category_id: { type: 'string' },
                    section_id: { type: 'string' },
                    is_current: { type: 'string', required: true },
                };
                const batchSessionData = course.batch_session_data;
                for (const sessionData of batchSessionData) {
                    for (const key of Object.keys(schema)) {
                        if (schema[key].required && !sessionData[key]) {
                            return { msg: `Invalid ${key}`, err: false };
                        };
                        if (sessionData[key] && typeof sessionData[key] !== schema[key].type) {
                            return { msg: `Invalid ${key} should be ${schema[key].type}`, err: false };
                        };
                    }
                };
            }
            return { err: true };
        }
    }
    catch (error) {
        return { msg: error.message, err: false };
    };
};



export {
    validateCampusUserOnBoard
};


