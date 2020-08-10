import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
    [x: string]: any;
    // save(user: User): any {
    //   throw new Error("Method not implemented.");
    // }
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
 
    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user).then((userData)=>{
          if(!userData){
            return { status: 404 };
          }
          let payload = `${userData.name}${userData.id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: payload,
             status: 200
          };

        });
    }
    public async findAll(): Promise<any> {
        return await this.userService.find();
    }
    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    }   
    public async create(user: User): Promise<User> {
        console.log(user);
        return await this.userService.create(user);
    } 
    // async update(user: User): Promise<UpdateResult> {
    //     console.log(user);
    //     return await this.userService.update(user);
    // }

    // async delete(id): Promise<DeleteResult> {
    //     return await this.userService.delete(id);
    // }
      
}
