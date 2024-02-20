var fs = require("fs");
require('dotenv').config();
var config = fs.readFileSync("./db.json");
let configjson = JSON.parse(config);

export const configData = {
    dbURL: configjson.DBURL,
    vridhee: configjson.vridhee,
    // curriculamDBURL: configjson.vridhee_curriculam,
    vridheeCurriculumAfrikaans: configjson.vridheeCurriculumAfrikaans,
    vridheeCurriculumEnglish: configjson.vridheeCurriculumEnglish,
    vridheeCurriculumFrench: configjson.vridheeCurriculumFrench,
    vridheeCurriculumGerman: configjson.vridheeCurriculumGerman,
    vridheeCurriculumGujarati: configjson.vridheeCurriculumGujarati,
    vridheeCurriculumHindi: configjson.vridheeCurriculumHindi,
    vridheeCurriculumJapanese: configjson.vridheeCurriculumJapanese,
    vridheeCurriculumKannada: configjson.vridheeCurriculumKannada,
    vridheeCurriculumKorean: configjson.vridheeCurriculumKorean,
    vridheeCurriculumLatin: configjson.vridheeCurriculumLatin,
    vridheeCurriculumMalayalam: configjson.vridheeCurriculumMalayalam,
    vridheeCurriculumMarathi: configjson.vridheeCurriculumMarathi,
    vridheeCurriculumNepali: configjson.vridheeCurriculumNepali,
    vridheeCurriculumOdia: configjson.vridheeCurriculumOdia,
    vridheeCurriculumPortuguese: configjson.vridheeCurriculumPortuguese,
    vridheeCurriculumPunjabi: configjson.vridheeCurriculumPunjabi,
    vridheeCurriculumRussian: configjson.vridheeCurriculumRussian,
    vridheeCurriculumSpanish: configjson.vridheeCurriculumSpanish,
    vridheeCurriculumTamil: configjson.vridheeCurriculumTamil,
    vridheeCurriculumTelugu: configjson.vridheeCurriculumTelugu,
    vridheeCurriculumUrdu: configjson.vridheeCurriculumUrdu,
    vridheeCurriculumVietnamese: configjson.vridheeCurriculumVietnamese,
    vridheeCurriculumArabic: configjson.vridheeCurriculumArabic,
    vridheeCurriculumAssamese: configjson.vridheeCurriculumAssamese,
    vridheeCurriculumBengali: configjson.vridheeCurriculumBengali,
    vridheeCurriculumChineseSimplified: configjson.vridheeCurriculumChineseSimplified,
    vridheeCurriculumChineseTraditional: configjson.vridheeCurriculumChineseTraditional,
    vridheeAnalytics: configjson.vridheeAnalytics,
    s3BaseUrl: configjson.s3BaseUrl,
    s3Bucket: configjson.s3Bucket
    
}