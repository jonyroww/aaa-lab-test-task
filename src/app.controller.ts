import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/send-file')
  async sendFileToS3(@UploadedFile() file): Promise<void> {
    return await this.appService.sendFileToS3(file);
  }
}
