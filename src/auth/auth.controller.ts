import { Controller, Post, Body, Res, Get, Query, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Param } from  '@nestjs/common';
import { UserService } from './user.service';
import { UseInterceptors, UploadedFile ,UploadedFiles} from  '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';

import { diskStorage } from  'multer';
import { extname } from  'path';
import { imageFileFilter, editFileName } from './../utils/file-uploading.utils';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { Page } from './page.entity';


@Controller('auth')
export class AuthController {
  SERVER_URL:  string  =  "http://localhost:3000/";

    constructor(private readonly authService: AuthService, private userService: UserService) {}
    @Get()
    index(): Promise<any> {
      return this.authService.findAll();
    }
    @Post('login')
    async login(@Body() user: User): Promise<any> {
      return this.authService.login(user);
    }  

    @Post('register')
    async register(@Body() user: User): Promise<any> {
      return this.authService.register(user);
    }  
    @Post('create')
    async create(@Body() user: User): Promise<any> {
      console.log(user);
      return this.authService.create(user);
    }
    @Post(':id/update')
    async update(@Param('id') id, @Body() user: User): Promise<any> {
      console.log(id);
      console.log(user);
        user.id = Number(id);
        console.log('Update #' + user.id)
        console.log(user);
        return this.userService.update(user);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.userService.delete(id);
    } 
    @Post(':userid/avatar')
    @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination:  function (req, file, cb) {
            cb(null, './avatars/');
        }, 
          filename: (req, file, cb) => {
            // console.log(req);
            console.log(file);
            console.log(cb);
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          console.log(randomName,'random name');
          return cb(null ,`${randomName}${extname(file.originalname)}`)
        }
        })
      }
    )
    )
    uploadAvatar(@Param('userid') userId, @UploadedFile() file) {
      this.userService.setAvatar(Number(userId), `${this.SERVER_URL}${'auth/avatars/'}${file.filename}`);
    }
    // @Post(':userid/avatar')
    // @UseInterceptors(FileInterceptor('file',
    //   {
    //     storage: diskStorage({
    //       destination: './avatars', 
    //       filename: (req, file, cb) => {
    //       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
    //       return cb(null, `${randomName}${extname(file.originalname)}`)
    //     }
    //     })
    //   }
    // )
    // )
    // uploadAvatar(@Param('userid') userId, @UploadedFile() file) {
    //   this.userService.setAvatar(Number(userId), `${this.SERVER_URL}${'auth/avatars/'}${file.path}`);
    // }
    @Get('avatars/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
      console.log(fileId);
      res.sendFile(fileId, { root: 'avatars'});
    }
    @Get( '/getAllData' )
    async allData( @Query() user: User ): Promise<any> {
      console.log(user);
      return this.userService.getAllData( user );
    }
    @Get( '/search' )
    async searchableApi( @Query() user: User ): Promise<any> {
      console.log(user);
      return this.userService.search(user);
    }
    @Post('/csvFile')
    async fileStream( @Query()user: User ): Promise<any> {
      return this.userService.csvFile(user);
    }
    @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
  @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
  // @Get()
  // index(
  //     @Query('page') page: number = 10,
  //     @Query('limit') limit: number = 10,
  //     @Query('username') username: string
  // ): Observable<Pagination<Page>> {
  //     limit = limit > 100 ? 100 : limit;

  //     if (username === null || username === undefined) {
  //         return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/auth/user' });
  //     } else {
  //         return this.userService.paginateFilterByUsername(
  //             { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/auth/user' },
  //             { username }
  //         )
  //     }
  // }
}
