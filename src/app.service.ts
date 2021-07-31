import { Injectable } from '@nestjs/common';
import { S3Service } from './services/s3.service';

@Injectable()
export class AppService {
  constructor(private readonly S3Service: S3Service) {}

  async sendFileToS3(file): Promise<void> {
    console.log(file);
    await this.S3Service.uploadFile(file);
  }
}
