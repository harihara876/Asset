import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
    subjects, lookup, company, designation, areaExpert, certification, university, instituiton
} from "../dbmanager/dbconnection";
import { capitalizeString } from '../utils/capitalizeString';
import {
    ISubjectList, IEducationDetailList, IProfessionalDetail, ISkills,
    IAwardsAndCertificateList, IHobbies, IPassion, IInterest
} from '../models/interfaces';

export async function verifySubjects(profileSection: string, currCatId: string, currGradeId: string, subjectsArray: ISubjectList) {
    try {
        let finalSubjectArray: any = [];
        for (let subject of subjectsArray) {
            let subjectRecord = {}
            subjectRecord = await subjects.findOne({
                curr_cat_id: currCatId,
                curr_grade_id: currGradeId,
                Subject: new RegExp(`^${subject.name}$`, 'i')
            })
            if (!subjectRecord) {
                subjectRecord = await subjects.create({
                    curr_cat_id: currCatId,
                    curr_grade_id: currGradeId,
                    Subject: capitalizeString(subject.name)
                })
            }
            subject['id'] = subjectRecord['_id'];
            subject['name'] = subjectRecord['Subject'];
            if (profileSection === 'learning') {
                subject['start_date'] = new Date().toISOString();
                subject['end_date'] = moment().utc().add({ months: subject.no_of_months }).toISOString();
            }
            finalSubjectArray.push(subject);
        }
        return finalSubjectArray
    } catch (error: any) {
        console.log(error)
        throw Error('get subject ' + error.message)
    }
}

export async function verifyEducationalDetails(eduDetails: IEducationDetailList) {
    try {
        const educationDetails = [];
        for (let detail of eduDetails.data) {
            let eduDetailObj: any = {};
            let instituteRecord: any = {};
            instituteRecord = await instituiton.findOne({
                name: new RegExp(`^${detail.institute_name}$`, 'i')
            });
            if (!instituteRecord) {
                instituteRecord = await instituiton.create({
                    name: capitalizeString(detail.institute_name)
                });
            }
            eduDetailObj = { ...detail };
            eduDetailObj.institute_id = instituteRecord['_id'].toString();
            eduDetailObj.institute_name = instituteRecord['name'];
            educationDetails.push(eduDetailObj);
        }
        return educationDetails;
    } catch (error: any) {
        throw Error('education details' + error.message)
    }
}

export async function verifyProfessionalDetails(profDetails: IProfessionalDetail) {
    try {
        const professionalDetails: any = [];
        for (let detail of profDetails.data) {
            let profDetailObj: any = {};
            let companyRecord: any = {};
            let designationRecord: any = {};
            let areaExpertObj: any = {}
            companyRecord = await company.findOne({
                name: new RegExp(`^${detail.company_name}$`, 'i')
            });
            if (!companyRecord) {
                companyRecord = await company.create({
                    name: capitalizeString(detail.company_name)
                });
            }
            designationRecord = await designation.findOne({
                name: new RegExp(`^${detail.designation}$`, 'i')
            });
            if (!designationRecord) {
                companyRecord = await designation.create({
                    name: capitalizeString(detail.designation)
                });
            }
            areaExpertObj = await areaExpert.findOne({
                name: new RegExp(`^${detail.area_expert}$`, 'i')
            });
            if (!areaExpertObj) {
                areaExpertObj = await areaExpert.create({
                    name: capitalizeString(detail.area_expert)
                });
            }
            profDetailObj = { ...detail };
            profDetailObj.comp_id = companyRecord['_id'].toString();
            profDetailObj.company_name = companyRecord['name'];
            profDetailObj.design_id = designationRecord['_id'].toString();
            profDetailObj.designation = designationRecord['name'];
            profDetailObj.area_exp_id = areaExpertObj['_id'].toString();
            profDetailObj.area_expert = areaExpertObj['name'];
            professionalDetails.push(profDetailObj);
        }
        return professionalDetails;
    }
    catch (error: any) {
        throw Error('verify professional details' + error.message)
    }
}

export async function verifySkills(skills: ISkills) {
    try {
        let skillsData: any = [];
        for (let reqSkill of skills.data) {
            let reqSkillObj: any = { ...reqSkill };
            const existingSkill = await lookup.aggregate([
                {
                    $match: {
                        name: "Skills"
                    }
                },
                {
                    $unwind: {
                        path: "$data"
                    }
                },
                {
                    $match: {
                        "data.val": new RegExp(`^${reqSkill.name}$`, 'i')
                    }
                }
            ]);
            if (existingSkill.length) {
                reqSkillObj['id'] = existingSkill[0]['data']['id'];
                reqSkillObj['name'] = existingSkill[0]['data']['val'];
            } else {
                const uuid = uuidv4();
                const name = capitalizeString(reqSkill.name);
                reqSkillObj['id'] = uuid;
                reqSkillObj['name'] = name;
                await lookup.updateOne(
                    { name: "Skills" },
                    {
                        $push: {
                            "data": {
                                id: uuid,
                                val: name
                            }
                        }
                    })
            }
            skillsData.push(reqSkillObj)
        }
        return skillsData;
    } catch (error: any) {
        throw Error('verify skill details' + error.message);
    }
}

export async function verifyAwardsAndCertificates(awardsAndCertificates: IAwardsAndCertificateList) {
    try {
        const certificateDetails: any = [];
        for (let certificate of awardsAndCertificates.data) {
            let certificateObj: any = {};
            let certificateRecord: any = {};
            let universityRecord: any = {};
            certificateRecord = await certification.findOne({
                name: new RegExp(`^${certificate.cert_name}$`, 'i')
            });
            if (!certificateRecord) {
                certificateRecord = await certification.create({
                    name: capitalizeString(certificate.cert_name)
                });
            }
            universityRecord = await university.findOne({
                name: new RegExp(`^${certificate.univ_name}$`, 'i')
            });
            if (!universityRecord) {
                universityRecord = await university.create({
                    name: capitalizeString(certificate.univ_name)
                });
            }
            certificateObj = { ...certificate };
            certificateObj.cert_id = certificateRecord['_id'].toString();
            certificateObj.cert_name = certificateRecord['name'];
            certificateObj.univ_id = universityRecord['_id'].toString();
            certificateObj.univ_name = universityRecord['name'];
            certificateDetails.push(certificateObj);
        }
        return certificateDetails;
    } catch (error: any) {
        throw Error('verify awards & certificate details' + error.message)
    }
}

export async function verifyHobbies(hobbies: IHobbies) {
    try {
        let hobbiesData: any = [];
        for (let reqHobby of hobbies.data) {
            let reqHobbyObj: any = { ...reqHobby };
            const existingHobby = await lookup.aggregate([
                {
                    $match: {
                        name: "Hobbies"
                    }
                },
                {
                    $unwind: {
                        path: "$data"
                    }
                },
                {
                    $match: {
                        "data.val": new RegExp(`^${reqHobby.name}$`, 'i')
                    }
                }
            ]);
            if (existingHobby.length) {
                reqHobbyObj['id'] = existingHobby[0]['data']['id'];
                reqHobbyObj['name'] = existingHobby[0]['data']['val'];
            } else {
                const uuid = uuidv4();
                const name = capitalizeString(reqHobby.name);
                reqHobbyObj['id'] = uuid;
                reqHobbyObj['name'] = name;
                await lookup.updateOne(
                    { name: "Hobbies" },
                    {
                        $push: {
                            "data": {
                                id: uuid,
                                val: name
                            }
                        }
                    })
            }
            hobbiesData.push(reqHobbyObj)
        }
        return hobbiesData;
    } catch (error: any) {
        throw Error('verify hobby details' + error.message)
    }
}

export async function verifyPassion(passion: IPassion) {
    try {
        let passionData: any = [];
        for (let reqPassion of passion.data) {
            let reqPassionObj: any = { ...reqPassion };
            const existingPassion = await lookup.aggregate([
                {
                    $match: {
                        name: "Passion"
                    }
                },
                {
                    $unwind: {
                        path: "$data"
                    }
                },
                {
                    $match: {
                        "data.val": new RegExp(`^${reqPassion.name}$`, 'i')
                    }
                }
            ]);
            if (existingPassion.length) {
                reqPassionObj['id'] = existingPassion[0]['data']['id'];
                reqPassionObj['name'] = existingPassion[0]['data']['val'];
            } else {
                const uuid = uuidv4();
                const name = capitalizeString(reqPassion.name);
                reqPassionObj['id'] = uuid;
                reqPassionObj['name'] = name;
                await lookup.updateOne(
                    { name: "Passion" },
                    {
                        $push: {
                            "data": {
                                id: uuid,
                                val: name
                            }
                        }
                    })
            }
            passionData.push(reqPassionObj)
        }
        return passionData;
    } catch (error: any) {
        throw Error('verify passion details' + error.message)
    }
}

export async function verifyInterest(interest: IInterest) {
    try {
        let interestData: any = [];
        for (let reqInterest of interest.data) {
            let reqInterestObj: any = { ...reqInterest };
            const existingInterest = await lookup.aggregate([
                {
                    $match: {
                        name: "Interest"
                    }
                },
                {
                    $unwind: {
                        path: "$data"
                    }
                },
                {
                    $match: {
                        "data.val": new RegExp(`^${reqInterest.name}$`, 'i')
                    }
                }
            ]);
            if (existingInterest.length) {
                reqInterestObj['id'] = existingInterest[0]['data']['id'];
                reqInterestObj['name'] = existingInterest[0]['data']['val'];
            } else {
                const uuid = uuidv4();
                const name = capitalizeString(reqInterest.name);
                reqInterestObj['id'] = uuid;
                reqInterestObj['name'] = name;
                await lookup.updateOne(
                    { name: "Interest" },
                    {
                        $push: {
                            "data": {
                                id: uuid,
                                val: name
                            }
                        }
                    })
            }
            interestData.push(reqInterestObj)
        }
        return interestData;
    } catch (error: any) {
        throw Error('verify interest details' + error.message);
    }
}