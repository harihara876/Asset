import mongoose from 'mongoose';
import { subject, currActivitySummary, metaDbConnetion } from "../dbmanager/dbconnection";
import { NO_IN_PROGRESS_CURRICULUM } from "../utils/errormsg";

export const userInprogressCurriculum = async (user_id, dbName, collectionName, learning) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        let categoryId = learning.curr_cat_id;
        let gradeId = learning.curr_grade_id;
        let subjectsArray = [];
        for (let selectedSubject of learning.subjects) {
            const currSummary = await currActivitySummary.findOne({
                user_id,
                cat_id: categoryId,
                grade_id: gradeId,
                sub_id: selectedSubject.id,
                sub_sts: 1
            })
            if (currSummary) {
                let subjectData: any = {
                    categoryId,
                    gradeId
                }
                subjectData.sub_id = selectedSubject.id;
                let subjectInfo = await subject.findOne({
                    _id: new mongoose.Types.ObjectId(subjectData.sub_id)
                })
                subjectData.sub_name = subjectInfo.name;
                subjectsArray.push(subjectData);
            }
        }
        return subjectsArray;
    }
    catch (error) {
        throw Error('findCurriculumSubjects ' + error.message)
    }
}

export const performance = async (user_id: string, dbName: string, collectionName: string, cat_id: string,
    grade_id: string, sub_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currSummary = await currActivitySummary.aggregate([
            {
                '$match': {
                    'user_id': user_id,
                    'cat_id': cat_id,
                    'grade_id': grade_id,
                    'sub_id': sub_id
                }
            },
            {
                '$project': {
                    'tot_s_assig_given': 1,
                    'tot_s_assig_given_score': 1,
                    'tot_s_assig_score': 1,
                    'tot_s_assig_per': 1,
                    'tot_s_prac': 1,
                    'tot_s_ct': 1,
                    'tot_s_ques_corr': 1,
                    'tot_s_ques_attem': 1,
                    'tot_s_test_per': 1,
                    'tot_s_ques_dur': 1,
                    'tot_s_ques_score': 1,

                    'tot_L1_ques_attem_score': '$data.t_data.c_t_data.tot_L1_ques_attem_score',
                    'tot_L1_ques_score': '$data.t_data.c_t_data.tot_L1_ques_score',
                    'tot_L1_ques_corr': '$data.t_data.c_t_data.tot_L1_ques_corr',
                    'tot_L1_ques_attem': '$data.t_data.c_t_data.tot_L1_ques_attem',

                    'tot_L2_ques_attem_score': '$data.t_data.c_t_data.tot_L2_ques_attem_score',
                    'tot_L2_ques_score': '$data.t_data.c_t_data.tot_L2_ques_score',
                    'tot_L2_ques_corr': '$data.t_data.c_t_data.tot_L2_ques_corr',
                    'tot_L2_ques_attem': '$data.t_data.c_t_data.tot_L2_ques_attem',

                    'tot_L3_ques_attem_score': '$data.t_data.c_t_data.tot_L3_ques_attem_score',
                    'tot_L3_ques_score': '$data.t_data.c_t_data.tot_L3_ques_score',
                    'tot_L3_ques_corr': '$data.t_data.c_t_data.tot_L3_ques_corr',
                    'tot_L3_ques_attem': '$data.t_data.c_t_data.tot_L3_ques_attem',

                    'tot_L4_ques_attem_score': '$data.t_data.c_t_data.tot_L4_ques_attem_score',
                    'tot_L4_ques_score': '$data.t_data.c_t_data.tot_L4_ques_score',
                    'tot_L4_ques_corr': '$data.t_data.c_t_data.tot_L4_ques_corr',
                    'tot_L4_ques_attem': '$data.t_data.c_t_data.tot_L4_ques_attem'
                }
            }, {
                '$group': {
                    '_id': null,
                    'tot_s_assig_given': { '$sum': '$tot_s_assig_given' },
                    'tot_s_assig_given_score': { '$sum': '$tot_s_assig_given_score' },
                    'tot_s_assig_score': { '$sum': '$tot_s_assig_score' },
                    'tot_s_assig_per': { '$sum': '$tot_s_assig_per' },
                    'tot_s_prac': { '$sum': '$tot_s_prac' },
                    'tot_s_ct': { '$sum': '$tot_s_ct' },
                    'tot_s_ques_corr': { '$sum': '$tot_s_ques_corr' },
                    'tot_s_ques_attem': { '$sum': '$tot_s_ques_attem' },
                    'tot_s_test_per': { '$sum': '$tot_s_test_per' },
                    'tot_s_ques_dur': { '$sum': '$tot_s_ques_dur' },
                    'tot_s_ques_score': { '$sum': '$tot_s_ques_score' },

                    'tot_L1_ques_attem_score': {
                        '$sum': '$tot_L1_ques_attem_score'
                    },
                    'tot_L1_ques_score': {
                        '$sum': 'tot_L1_ques_score'
                    },
                    'tot_L1_ques_corr': {
                        '$sum': 'tot_L1_ques_corr'
                    },
                    'tot_L1_ques_attem': {
                        '$sum': 'tot_L1_ques_attem'
                    },

                    'tot_L2_ques_attem_score': {
                        '$sum': '$tot_L2_ques_attem_score'
                    },
                    'tot_L2_ques_score': {
                        '$sum': 'tot_L2_ques_score'
                    },
                    'tot_L2_ques_corr': {
                        '$sum': 'tot_L2_ques_corr'
                    },
                    'tot_L2_ques_attem': {
                        '$sum': 'tot_L2_ques_attem'
                    },

                    'tot_L3_ques_attem_score': {
                        '$sum': '$tot_L3_ques_attem_score'
                    },
                    'tot_L3_ques_score': {
                        '$sum': 'tot_L3_ques_score'
                    },
                    'tot_L3_ques_corr': {
                        '$sum': 'tot_L3_ques_corr'
                    },
                    'tot_L3_ques_attem': {
                        '$sum': 'tot_L3_ques_attem'
                    },

                    'tot_L4_ques_attem_score': {
                        '$sum': '$tot_L4_ques_attem_score'
                    },
                    'tot_L4_ques_score': {
                        '$sum': 'tot_L4_ques_score'
                    },
                    'tot_L4_ques_corr': {
                        '$sum': 'tot_L4_ques_corr'
                    },
                    'tot_L4_ques_attem': {
                        '$sum': 'tot_L4_ques_attem'
                    },

                }
            }, {
                '$project': {
                    '_id': 0,
                    'assignment': {
                        'total_submitted': '$tot_s_assig_given',
                        'score': {
                            '$cond': {
                                'if': {
                                    '$eq': [
                                        '$tot_s_assig_score', 0
                                    ]
                                },
                                'then': 0,
                                'else': {
                                    '$divide': [
                                        '$tot_s_assig_given_score', '$tot_s_assig_score'
                                    ]
                                }
                            }
                        },
                        'percentage': '$tot_s_assig_per'
                    },
                    'total_test': {
                        'practice_test': '$tot_s_prac',
                        'class_test': '$tot_s_ct',
                        'challange': '$tot_s_chal'
                    },
                    'correct_wrong': {
                        'correct': '$tot_s_ques_corr',
                        'wrong': {
                            '$cond': {
                                'if': {
                                    '$eq': [
                                        '$tot_s_ques_corr', 0
                                    ]
                                },
                                'then': 0,
                                'else': {
                                    '$divide': [
                                        '$tot_s_ques_attem', '$tot_s_ques_corr'
                                    ]
                                }
                            }
                        }
                    },
                    'efficiency': {
                        'correct': {
                            '$multiply': [
                                {
                                    '$cond': {
                                        'if': {
                                            '$eq': [
                                                '$tot_s_ques_attem', 0
                                            ]
                                        },
                                        'then': 0,
                                        'else': {
                                            '$divide': [
                                                '$tot_s_ques_corr', '$tot_s_ques_attem'
                                            ]
                                        }
                                    }
                                }, 100
                            ]
                        },
                        'score': '$tot_s_test_per'
                    },
                    'time_per_question': {
                        'attempted': {
                            '$cond': {
                                'if': {
                                    '$eq': [
                                        '$tot_s_ques_attem', 0
                                    ]
                                },
                                'then': 0,
                                'else': {
                                    '$divide': [
                                        '$tot_s_ques_dur', '$tot_s_ques_attem'
                                    ]
                                }
                            }
                        },
                        'correct': {
                            '$cond': {
                                'if': {
                                    '$eq': [
                                        '$tot_s_ques_corr', 0
                                    ]
                                },
                                'then': 0,
                                'else': {
                                    '$divide': [
                                        '$tot_s_ques_dur', '$tot_s_ques_corr'
                                    ]
                                }
                            }
                        },
                        'score': {
                            '$cond': {
                                'if': {
                                    '$eq': [
                                        '$tot_s_ques_score', 0
                                    ]
                                },
                                'then': 0,
                                'else': {
                                    '$divide': [
                                        '$tot_s_ques_dur', '$tot_s_ques_score'
                                    ]
                                }
                            }
                        }
                    },
                    'level_wise_bar_chart': {
                        'l1': {
                            'percentage': {
                                '$multiply': [
                                    {
                                        '$cond': {
                                            'if': {
                                                '$eq': [
                                                    '$tot_L1_ques_score', 0
                                                ]
                                            },
                                            'then': 0,
                                            'else': {
                                                '$divide': [
                                                    '$tot_L1_ques_attem_score', '$tot_L1_ques_score'
                                                ]
                                            }
                                        }
                                    }, 100
                                ]
                            },
                            'correct': '$tot_L1_ques_corr',
                            'wrong': {
                                '$subtract': [
                                    '$tot_L1_ques_attem', '$tot_L1_ques_corr'
                                ]
                            }
                        },
                        'l2': {
                            'percentage': {
                                '$multiply': [
                                    {
                                        '$cond': {
                                            'if': {
                                                '$eq': [
                                                    '$tot_L2_ques_score', 0
                                                ]
                                            },
                                            'then': 0,
                                            'else': {
                                                '$divide': [
                                                    '$tot_L2_ques_attem_score', '$tot_L2_ques_score'
                                                ]
                                            }
                                        }
                                    }, 100
                                ]
                            },
                            'correct': '$tot_L2_ques_corr',
                            'wrong': {
                                '$subtract': [
                                    '$tot_L2_ques_attem', '$tot_L2_ques_corr'
                                ]
                            }
                        },
                        'l3': {
                            'percentage': {
                                '$multiply': [
                                    {
                                        '$cond': {
                                            'if': {
                                                '$eq': [
                                                    '$tot_L3_ques_score', 0
                                                ]
                                            },
                                            'then': 0,
                                            'else': {
                                                '$divide': [
                                                    '$tot_L3_ques_attem_score', '$tot_L3_ques_score'
                                                ]
                                            }
                                        }
                                    }, 100
                                ]
                            },
                            'correct': '$tot_L3_ques_corr',
                            'wrong': {
                                '$subtract': [
                                    '$tot_L3_ques_attem', '$tot_L3_ques_corr'
                                ]
                            }
                        },
                        'l4': {
                            'percentage': {
                                '$multiply': [
                                    {
                                        '$cond': {
                                            'if': {
                                                '$eq': [
                                                    '$tot_L4_ques_score', 0
                                                ]
                                            },
                                            'then': 0,
                                            'else': {
                                                '$divide': [
                                                    '$tot_L4_ques_attem_score', '$tot_L4_ques_score'
                                                ]
                                            }
                                        }
                                    }, 100
                                ]
                            },
                            'correct': '$tot_L4_ques_corr',
                            'wrong': {
                                '$subtract': [
                                    '$tot_L4_ques_attem', '$tot_L4_ques_corr'
                                ]
                            }
                        }
                    }
                }
            }
        ])
        if (!currSummary.length) {
            return {
                status: 400,
                message: NO_IN_PROGRESS_CURRICULUM
            }
        }
        return { status: 200, data: currSummary[0] }
    }
    catch (error) {
        console.log(error)
        throw Error('analytics ' + error.message)
    }
}

export const engagement = async (user_id: string, dbName: string, collectionName: string, cat_id: string,
    grade_id: string, sub_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const engagementData = await currActivitySummary.aggregate([
            {
                $match: {
                    user_id: user_id,
                    cat_id: cat_id,
                    grade_id: grade_id,
                    sub_id: sub_id
                }
            },
            {
                $group: {
                    _id: {
                        user_id: "$user_id",
                        cat_id: "$cat_id",
                        grade_id: "$grade_id",
                        sub_id: "&sub_id"
                    },

                    tot_s_vid_watch: { $sum: "$tot_s_vid_watch" },
                    tot_s_e_con_watch: { $sum: "$tot_s_e_con_watch" },
                    tot_s_test_given: { $sum: "$tot_s_test_given" },
                    tot_s_assig_given: { $sum: "$tot_s_assig_given" },
                    tot_s_gs: { $sum: "$tot_s_gs" },
                    tot_s_dbt_ans: { $sum: "$tot_s_dbt_ans" },
                    tot_s_help_given: { $sum: "$tot_s_help_given" },
                    tot_s_chall: { $sum: "$tot_s_chall" },
                    tot_s_note: { $sum: "$tot_s_note" },
                    tot_s_vid_dur: { $sum: "$tot_s_vid_dur" },
                    tot_s_e_con_dur: { $sum: "$tot_s_e_con_dur" },
                    tot_s_ques_dur: { $sum: "$tot_s_ques_dur" }
                }
            },
            {
                $project: {
                    _id: 0,
                    tot_s_vid_watch: 1,
                    tot_s_e_con_watch: 1,
                    tot_s_test_given: 1,
                    tot_s_assig_given: 1,
                    tot_s_gs: 1,
                    tot_s_dbt_ans: 1,
                    tot_s_help_given: 1,
                    tot_s_chall: 1,
                    tot_s_note: 1,
                    tot_s_vid_dur: 1,
                    tot_s_e_con_dur: 1,
                    tot_s_ques_dur: 1
                }
            }

        ])
        if (!engagementData.length) {
            return {
                status: 400,
                message: NO_IN_PROGRESS_CURRICULUM
            }
        }
        return { status: 200, data: engagementData[0] }
    }
    catch (error) {
        console.log(error)
        throw Error('analytics ' + error.message)
    }
}

export const progress = async (user_id: string, dbName: string, collectionName: string, cat_id: string,
    grade_id: string, sub_id: string) => {
    await metaDbConnetion(dbName, collectionName);
    try {
        const currSummary = await currActivitySummary.findOne({
            user_id,
            cat_id,
            grade_id,
            sub_id
        })
        if (!currSummary) {
            return {
                status: 400,
                message: NO_IN_PROGRESS_CURRICULUM
            }
        }
        let total = 0;
        let notStarted = 0;
        let inProgress = 0;
        let completed = 0;
        let t_u_s_lev = 0;
        let t_u_c_lev = 0;
        currSummary.data.forEach(chap => {
            chap.t_data.forEach(tData => {
                if (tData.t_sts === 0) {
                    notStarted++;
                } else if (tData.t_sts === 1) {
                    inProgress++;
                } else {
                    completed++;
                }
                t_u_s_lev = t_u_s_lev + tData.t_u_s_lev;
                t_u_c_lev = t_u_c_lev + tData.t_u_c_lev;
            });
        });
        total = notStarted + inProgress + completed;
        let completedPercentage
        if (total === 0) {
            completedPercentage = 0;
        } else {
            completedPercentage = (completed / total) * 100;
        }
        return {
            status: 200,
            data: {
                total, notStarted, inProgress, completed, completedPercentage: Number(completedPercentage.toFixed(1)),
                totalLevelGainLoss: t_u_s_lev - t_u_c_lev
            }
        }
    }
    catch (error) {
        console.log(error)
        throw Error('analytics ' + error.message)
    }
}