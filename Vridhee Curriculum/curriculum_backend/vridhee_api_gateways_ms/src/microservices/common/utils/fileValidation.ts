import path from 'path';
import {
    validImageExtAccept, validDocumentExtAccept, validBulkUploadExtAccept,
    validAudioExtAccept, validApexDocExtAccept, arrayJoin
} from './fileExtensions';
import { Status } from './status';

export const fileValidation = async (req, res, next) => {
    try {
        let file = req.file;
        let { folderName,subfolderName, uniqueId, uniqueName, existingUrl, fileType, fileSize } = req.body;
        if (file === '' || file === undefined) {
            return res.send(new Status(400, 'Image is required'));
        }
        if (!folderName) {
            return res.send(new Status(400, 'Folder names is required.'));
        }
        // if (!subfolderName) {
        //     return res.send(new Status(400, 'SubFolder names is required.'));
        // }
        if (!uniqueId) {
            return res.send(new Status(400, 'Unique id is required'));
        }
        if (uniqueName && uniqueName.length > 15) {
            return res.send(new Status(400, 'Unique Name Should be lessthan or equalto 15 Character'));
        }
        // if (!existingUrl) {
        //     return res.send(new Status(400, 'Previous Uploaded Image is required'));
        // }
        if (fileSize === undefined || fileSize === '') {
            fileSize = 2;
        }
        let fileExtension = path.extname(file.originalname);
        let inputFileSize = Buffer.from(req.file.buffer).length;
        let sizeNum = 1024 * 1024 * parseInt(fileSize);
        if (fileType === 'BulkUpload') {
            let ext = validBulkUploadExtAccept.includes(fileExtension);
            if (ext) {
                if (sizeNum > inputFileSize) {
                    return next()
                } else {
                    return res.send(new Status(400, `Allow images only below ${fileSize} MB file !`));
                }
            } else {
                return res.send(new Status(400, `Allow images only of extensions ${arrayJoin(validBulkUploadExtAccept)} !`));
            }
        } else if (fileType === 'Document') {
            let ext = validDocumentExtAccept.includes(fileExtension);
            if (ext) {
                if (sizeNum > inputFileSize) {
                    return next()
                } else {
                    return res.send(new Status(400, `Allow images only below ${fileSize} MB file !`));
                }
            } else {
                return res.send(new Status(400, `Allow images only of extensions ${arrayJoin(validDocumentExtAccept)} !`));
            }
        } else if (fileType === 'Audio') {
            let ext = validAudioExtAccept.includes(fileExtension);
            if (ext) {
                if (sizeNum > inputFileSize) {
                    return next()
                } else {
                    return res.send(new Status(400, `Allow images only below ${fileSize} MB file !`));
                }
            } else {
                return res.send(new Status(400, `Allow images only of extensions ${arrayJoin(validAudioExtAccept)} !`));
            }
        } else if (fileType === 'Apex') {
            let ext = validApexDocExtAccept.includes(fileExtension);
            if (ext) {
                if (sizeNum > inputFileSize) {
                    return next()
                } else {
                    return res.send(new Status(400, `Allow images only below ${fileSize} MB file !`));
                }
            } else {
                return res.send(new Status(400, `Allow images only of extensions ${arrayJoin(validApexDocExtAccept)} !`));
            }
        } else {
            let ext = validImageExtAccept.includes(fileExtension);
            if (ext) {
                if (sizeNum > inputFileSize) {
                    return next()
                } else {
                    return res.send(new Status(400, `Allow images only below ${fileSize} MB file !`));
                }
            } else {
                return res.send(new Status(400, `Allow images only of extensions ${arrayJoin(validImageExtAccept)} !`));
            }
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
}