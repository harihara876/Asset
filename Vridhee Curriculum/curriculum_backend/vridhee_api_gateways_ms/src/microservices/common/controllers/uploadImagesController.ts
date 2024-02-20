import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, ResponseWithDataObject } from '../utils/status';
import { uploadFileIntoS3, deleteFileS3 } from '../utils/s3Config';
import { fileValidation } from '../utils/fileValidation';
import multer from 'multer';
const upload = multer();

router.post('/uploadImages', upload.single('image'), fileValidation, async (req: any, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const { folderName, subfolderName, uniqueId, uniqueName, existingUrl } = req.body;
        // const delExistingUrl = await deleteFileS3(existingUrl);
        const url = await uploadFileIntoS3(folderName, uniqueId, file, uniqueName);
        if (url) {
            return res.send(new ResponseWithDataObject(200, 'File added into S3 bucket', url));
        } else {
            return res.send(new Status(400, 'File not added into S3 bucket'));
        }
    } catch (error) {
        return res.send(new Status(400, error.message));
    }
});

export = router;