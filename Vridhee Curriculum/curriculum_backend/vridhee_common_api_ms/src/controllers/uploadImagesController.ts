import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, ResponseWithDataObject, errStatus } from '../utils/status';
import { uploadFileIntoS3 } from '../utils/s3Config'
import multer from 'multer';
const upload = multer();

router.post('/uploadImages', upload.single("image"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const { folderName, uniqueId, uniqueName } = req.body;

        if (req.file == '' || req.file == undefined) {
            return res.send(new errStatus(400, 'Image is required'));
        }
        if (!folderName) {
            return res.send(new Status(400, 'Folder names is required.'));
        } if (!uniqueId) {
            return res.send(new Status(400, 'Unique id is required'));
        } if (uniqueName && uniqueName.length > 15) {
            return res.send(new errStatus(400, 'Unique Name Should be lessthan or equalto 15 Character'));
        }
        const url = await uploadFileIntoS3(folderName, uniqueId, file, uniqueName);
        if (url) {
            return res.send(new ResponseWithDataObject(200, 'File added into S3 bucket', url));
        } else {
            return res.send(new Status(400, 'File not added into S3 bucket'));
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.send(new Status(400, error.message));
        }
    }
})

export = router