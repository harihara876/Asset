import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { Status, APIResponse, ResponseWithDataObject } from '../utils/status';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { configData } from '../utils/config';
import { IS3BucketKey } from '../models/interfaces';

const s3 = new S3Client({
    credentials: {
        accessKeyId: configData.s3Bucket.accessKeyId,
        secretAccessKey: configData.s3Bucket.secretAccessKey
    },
    region: configData.s3Bucket.region
});

const s3Storage = multerS3({
    s3: s3,
    bucket: configData.s3Bucket.bucket,
    acl: "public-read",
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});

const uploadImage = multer({
    storage: s3Storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

router.post('/uploadFilesS3', uploadImage.single("image"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req && req.file) {
            return res.send(new ResponseWithDataObject(200, 'File added into S3 bucket', req.file));
        } else {
            return res.send(new Status(400, 'File not added into S3 bucket'));
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.send(new Status(400, error.message));
        }
    }
})

router.get('/getFilesFromS3', async (req: Request<{}, {}, {}, IS3BucketKey>, res: Response, next: NextFunction) => {
    try {
        const { key } = req.query;
        if (!key) {
            return res.send(new Status(400, 'S3 object key is required'));
        }
        const command = new GetObjectCommand({
            Bucket: configData.s3Bucket.bucket,
            Key: key
        });
        const response = await s3.send(command);
        if (!response) {
            return res.send(new APIResponse(400, 'The specified key does not exist.'));
        }
        const stream: any = response.Body;
        stream.on("data", (chunk: any) => res.write(chunk));
        stream.once("end", () => {
            return res.end();
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.send(new APIResponse(400, error.message));
        }
    }
})

export = router