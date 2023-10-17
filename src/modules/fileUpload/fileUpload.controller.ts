import {
  Controller,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role, Roles } from '../../decorators';
import { JwtAccessAuthGuard, RolesGuard } from '../../guards';
import { megabytesToBytes } from './utils/checkFile';
import { FileUploadService } from './fileUpload.service';

const maxFileSize = 15; //mb

@Roles(Role.Admin)
@UseGuards(JwtAccessAuthGuard, RolesGuard)
@Controller('upload-file')
export class FileUploadController {
  constructor(private readonly uploadService: FileUploadService) {}

  @Post('news/:id')
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
    return this.uploadService.uploadNewsFile(file, id);
  }

  @Patch('news/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
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
    return this.uploadService.updateNewsFile(file, id);
  }
}
