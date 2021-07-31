import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  bucketName = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file) {
    const { originalname } = file;
    console.log(`bucketName ${this.bucketName}`);
    await this.upload(
      file.buffer,
      this.bucketName,
      originalname,
      file.mimetype,
    );
  }

  async upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    console.log(params);

    try {
      const s3Response = await this.s3.upload(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
}
