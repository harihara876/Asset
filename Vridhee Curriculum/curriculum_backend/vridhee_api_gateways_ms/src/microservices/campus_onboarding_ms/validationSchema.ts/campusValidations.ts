import { NextFunction } from 'express';
import mongoose from 'mongoose';
import { Status, ResponseWithObject } from '../utils/status';
import { APIResponse } from '../utils/status';

const validateCreateCampusCourse = (req: any, res: any, next: NextFunction) => {
    try {
        const { data } = req.body;
        const image = req.file;
        // console.log("Substring around position 659:", data.slice(659 - 10, 659 + 10));
        const bodyData = JSON.parse(data);
        const requiredFields = [
            { name: 'campus_group_id', type: 'string' },
            { name: 'course_name', type: 'string' },
            { name: 'course_order', type: 'number' },
            { name: 'no_of_month', type: 'number' },
            { name: 'course_status', type: 'string' },
            { name: 'course_type', type: 'string' },
            { name: 'grade_default', type: 'object' },
        ];

        const validationErrors = requiredFields.reduce((errors, { name, type }) => {
            if (name === 'grade_default' && typeof bodyData[name] === 'object') {
                const gradeDefaultFields = ['curr_cat_id', 'curr_cat_name', 'default_grade_id', 'grade_name', 'sub_default'];
                gradeDefaultFields.forEach(gradeField => {
                    // console.log(gradeField, "gradeField");
                    if (gradeField === "curr_cat_id") {
                        if (!mongoose.Types.ObjectId.isValid(bodyData[name][gradeField])) {
                            errors.push('Invalid Curriculum Category Id');
                        };
                    }
                    if (gradeField === 'sub_default') {
                        if (!Array.isArray(bodyData[name][gradeField])) {
                            errors.push(`Field '${gradeField}' should be an array in 'grade_default'`);
                        } else {
                            const subjects = bodyData[name][gradeField];
                            // console.log(subjects,"subjects");
                            for (const sub of subjects) {
                                // console.log(sub,"sub");
                                if (!sub.subject_id || !sub.subject_name) {
                                    errors.push(`In field '${gradeField}', both 'subject_id' and 'subject_name' should be present in each element`);
                                }
                            }
                        }
                    } else if (!bodyData[name][gradeField]) {
                        errors.push(`Field '${gradeField}' is required in 'grade_default'`);
                    }
                });
            }
            if (!bodyData || typeof bodyData[name] === 'undefined') {
                errors.push(`Field '${name}' is required`);
            } else if (bodyData[name] && typeof bodyData[name] !== type) {
                errors.push(`Field '${name}' should be of type ${type}`);
            }
            return errors;
        }, []);

        if (!mongoose.Types.ObjectId.isValid(bodyData.campus_group_id)) {
            validationErrors.push('Invalid Campus Group Id');
        };
        if (validationErrors.length > 0) {
            return res.send(new Status(400, "Validation error", validationErrors));
        };
        if (!image) {
            return res.send(new Status(400, 'Course Image is Mandatory'));
        };
        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};

const validateCampus = (req: any, res: any, next: NextFunction) => {
    try {
        const { data } = req.body;
        const image = req.file;
        if (!image) {
            return res.send(new Status(400, 'Campus Image is Mandatory'));
        };
        const requiredFields = [
            { name: 'campus_group_id', type: 'string' },
            { name: 'campus_type', type: 'string' },
            { name: 'campus_name', type: 'string' },
            { name: 'campus_gender_type', type: 'string' },
            { name: 'country', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'district', type: 'string' },
            { name: 'user_id', type: 'string' },
        ];

        const bodyData = JSON.parse(data);
        const validationErrors = requiredFields.reduce((errors, { name, type }) => {
            if (!bodyData || typeof bodyData[name] === 'undefined') {
                errors.push(`Field '${name}' is required`);
            } else if (bodyData[name] && typeof bodyData[name] !== type) {
                errors.push(`Field '${name}' should be of type ${type}`);
            }
            return errors;
        }, []);

        if (!mongoose.Types.ObjectId.isValid(bodyData.campus_group_id)) {
            validationErrors.push('Invalid Campus Group Id');
        };
        if (!mongoose.Types.ObjectId.isValid(bodyData.user_id)) {
            validationErrors.push('Invalid User Id');
        };
        if (validationErrors.length > 0) {
            return res.send(new Status(400, "Validation error", validationErrors));
        };

        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};

const validateCampusContactDetails = (req: any, res: any, next: NextFunction) => {
    try {
        const { data } = req.body;
        const bodyData = JSON.parse(data);
        const image = req.file;
        if (image) {
            if (!bodyData.campus_logo_url) {
                return res.send(new APIResponse(400, 'campus_logo_url is mandatory in body.'));
            };
        };

        if (bodyData.section === "contact") {
            const campusContactDetails = bodyData.campus_contact_details;
            if (campusContactDetails.length === 0) {
                return next();
            };
            for (const contact of campusContactDetails) {
                if (!contact.contact_purpose) {
                    return res.send(new APIResponse(400, 'contact_purpose is mandatory in each object'));
                }
                if (!contact.contact_email_id && !contact.contact_number) {
                    return res.send(new APIResponse(400, 'At least one of contact_email or contact_number is mandatory in each object'));
                }
                if (contact.contact_email && !isValidEmail(contact.contact_email_id)) {
                    return res.send(new APIResponse(400, 'Invalid email format'));
                }
                if (contact.contact_number && !isValidMobileNumber(contact.contact_number)) {
                    return res.send(new APIResponse(400, 'Invalid mobile number format'));
                }
            }
        };
        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function isValidMobileNumber(number) {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
};

const validateCampusUserOnBoard = (data) => {
    try {
        if (data.user_type === "Student") {
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
        };

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

const validateHolidays = (req: any, res: any, next: NextFunction) => {
    const { campus_group_id, campus_ids, h_name, dates, isAlways } = req.body;

    if (!campus_group_id) {
        return res.send(new ResponseWithObject(400, "Validation error", "campus_group_id is required."));
    };

    if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
        return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
    };

    if (isAlways && isAlways === 1) {
        if (campus_ids && campus_ids.length > 0) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Campus_id is not required.'));
        };
    };

    if (campus_ids && campus_ids.length > 0) {
        if (!campus_ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Invalid ObjectId in campus_id.'));
        }
    };

    if (!h_name) {
        return res.send(new ResponseWithObject(400, "Validation error", 'h_name is required.'));
    };

    if (!dates || !Array.isArray(dates) || dates.length < 1) {
        return res.send(new ResponseWithObject(400, "Validation error", 'dates array is required with at least one date'));
    };

    const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
    if (!dates.every(date => dateRegExp.test(date.date))) {
        return res.status(400).send({ message: 'Invalid date format in dates array' });
    };

    next();
};

const validateAnnouncements = (req: any, res: any, next: NextFunction) => {
    try {
        const { data } = req.body;
        const bodyData = JSON.parse(data);
        const { campus_group_id, campus_ids, title, msg, ann_date, isnew } = bodyData;

        if (!req.files || req.files.length < 1) {
            return res.send(new ResponseWithObject(400, "Validation error", "Image is mandatory."));
        };

        if (!campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", "campus_group_id is required."));
        };

        if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
        };

        if (campus_ids && campus_ids.length > 0) {
            if (!campus_ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid ObjectId in campus_id.'));
            }
        };

        if (!title) {
            return res.send(new ResponseWithObject(400, "Validation error", 'title is required.'));
        };

        if (!ann_date) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Announcement Date is required.'));
        };

        if (isnew !== 1 && isnew !== 0) {
            return res.send(new ResponseWithObject(400, "Validation error", 'isnew should be either 1 or 0.'));
        };

        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};

const validateNews = (req: any, res: any, next: NextFunction) => {
    try {
        const { data } = req.body;
        const bodyData = JSON.parse(data);
        const { campus_group_id, campus_id, title, descr, ann_date, status } = bodyData;

        if (!req.files || req.files.length < 1) {
            return res.send(new ResponseWithObject(400, "Validation error", "Image is mandatory."));
        };

        if (!campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", "campus_group_id is required."));
        };

        if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
        };

        if (!campus_id) {
            return res.send(new ResponseWithObject(400, "Validation error", "campus_id is required."));
        };

        if (!mongoose.Types.ObjectId.isValid(campus_id)) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_id.'));
        };

        if (!title) {
            return res.send(new ResponseWithObject(400, "Validation error", 'title is required.'));
        };

        if (!descr) {
            return res.send(new ResponseWithObject(400, "Validation error", 'descr is required.'));
        };

        if (status !== 1 && status !== 0) {
            return res.send(new ResponseWithObject(400, "Validation error", 'status should be either 1 or 0.'));
        };

        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};

const validateNoticetemplate = (req: any, res: any, next: NextFunction) => {
    try {
        const { campus_group_id, campus_ids, template_name } = req.body;

        if (!campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", "campus_group_id is required."));
        };

        if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
        };

        if (campus_ids && campus_ids.length > 0) {
            if (!campus_ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid ObjectId in campus_id.'));
            }
        };

        if (!template_name) {
            return res.send(new ResponseWithObject(400, "Validation error", 'template_name is required.'));
        };

        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};

const validateNotice = (req: any, res: any, next: NextFunction) => {
    try {
        const { data } = req.body;
        const bodyData = JSON.parse(data);
        const { campus_group_id, campus_ids, subject } = bodyData;

        if (!campus_group_id) {
            return res.send(new ResponseWithObject(400, "Validation error", "campus_group_id is required."));
        };

        if (!mongoose.Types.ObjectId.isValid(campus_group_id)) {
            return res.send(new ResponseWithObject(400, "Validation error", 'Invalid campus_group_id.'));
        };

        if (campus_ids && campus_ids.length > 0) {
            if (!campus_ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
                return res.send(new ResponseWithObject(400, "Validation error", 'Invalid ObjectId in campus_id.'));
            }
        };

        if (!subject) {
            return res.send(new ResponseWithObject(400, "Validation error", 'template_name is required.'));
        };

        next();
    }
    catch (error) {
        return res.send(new Status(400, error.message));
    }
};


export {
    validateCreateCampusCourse, validateCampus, validateCampusContactDetails, validateCampusUserOnBoard,
    validateHolidays, validateAnnouncements, validateNews, validateNoticetemplate, validateNotice
};


