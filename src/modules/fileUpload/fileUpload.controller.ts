import {
  Controller,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipThrottle } from '@nestjs/throttler';
import { Role, Roles } from '../../decorators';
import { JwtAccessAuthGuard, RolesGuard } from '../../guards';
import { megabytesToBytes } from './utils/checkFile';
import { FileUploadService } from './fileUpload.service';

const maxFileSize = 15; //mb

@SkipThrottle()
@Roles(Role.Admin)
@UseGuards(JwtAccessAuthGuard, RolesGuard)
@Controller('upload-file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({ maxSize: megabytesToBytes(maxFileSize) })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    // console.log(file);
    await this.fileUploadService.uploadFile(file, id);
  }
}
