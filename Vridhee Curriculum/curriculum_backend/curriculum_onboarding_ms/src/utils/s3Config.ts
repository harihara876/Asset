import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { configData } from '../utils/config';

const s3 = new S3Client({
    credentials: {
        accessKeyId: configData.s3Bucket.accessKeyId,
        secretAccessKey: configData.s3Bucket.secretAccessKey
    },
    region: configData.s3Bucket.region
});


export const uploadFileIntoS3 = async (profileId, image) => {
    let buf: Buffer
    if (image.buffer.type) {
        buf = Buffer.from(image.buffer);
    } else {
        buf = image.buffer
    }
    const extension = image.originalname.split('.').at(-1);
    const key = `curriculum_onboarding_ms/awards_certificates/${profileId}.${extension}`;
    const command = new PutObjectCommand({
        ACL: 'public-read',
        Key: key,
        ContentType: image.mimetype,
        Bucket: configData.s3Bucket.bucket,
        Body: buf,
    });
    const response = await s3.send(command);
    if (response && response['$metadata']['httpStatusCode'] === 200) {
        return { status: 200, url: `/${key}` }
        // const getCommand = new GetObjectCommand({
        //     Bucket: configData.s3Bucket.bucket,
        //     Key: `account/${profileId}-${image.originalname}`
        // });
        // const url = await getSignedUrl(s3, getCommand);
        // const splittedUrl = url.split('?')[0];
        // return { status: 200, url: splittedUrl }
    } else {
        return { status: 400, url: '' }
    }
}
