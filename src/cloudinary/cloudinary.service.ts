import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2} from 'cloudinary';
import { format } from 'date-fns';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const split = file.originalname.split('.');
    const extention = split.pop();
    const s3Key = format(new Date(), 'yyy-MM-dd-hh-mm-ss');
    const fileName = `file${s3Key}.${extention}`;
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: 'Carashop',
          public_id: fileName
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      console.log(upload)
      toStream(file.buffer).pipe(upload);
    });
  }
}
