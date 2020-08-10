import { Injectable, Param } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult ,Like} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { Page } from './page.entity';

const mysql = require("mysql");

@Injectable()
export class UserService {
    [x: string]: any;
    
    find(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    save(user: User): User | PromiseLike<User> {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email,
            }
        });
    }
    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id: id,
            }
        });
    }
    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id,user);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
    public async setAvatar(userId: number, avatarUrl: string){
        console.log(userId);
        console.log(avatarUrl);
        return await this.userRepository.update(userId, {avatar: avatarUrl});
    }
    async serveAvatar({ fileId, root }: { fileId: number; root: string; }) {
        console.log(fileId);
        console.log(root);
        return await this.userRepository.update(fileId, {avatar: root});
    }
    public async getAllData( user: User ): Promise<any> {
        const qb = this.userRepository.createQueryBuilder();
        console.log(qb);
        return qb.getMany();
    }
    async search(user: User): Promise<User[]> {
        console.log(user);
        const users = await this.userRepository
        .createQueryBuilder("user")
        .where("user.id like :id OR user.name like :name OR user.avatar like :avatar OR user.email like :email OR user.password like :password " , { id: '%' + user.id + '%', name: '%' + user.name + '%', avatar: '%' + user.avatar + '%', email: '%' + user.email + '%', password: '%' + user.password + '%' })
        .getMany();
        return users;
    }
    async csvFile(user: User): Promise<any> {
        const fs = require("fs");
        const Pool = require("pg").Pool;
        const fastcsv = require("fast-csv");
        // let stream = fs.createReadStream("D:/udemy_tutorials/get-update-delete-record/uploads/items_sub_csvfile.csv");
        // console.log(stream);
        // D:\udemy_tutorials\get-update-delete-record\uploads
        let stream = fs.createReadStream("D:/udemy_tutorials/get-update-delete-record/uploads/category1.csv");

        let csvData = [];
        console.log()
        let csvStream = fastcsv
        .parse(stream, {
            // first row is cols header
            headers: false,
            // delimiter
            delimiter: '\t',
            // character to use to escape values that contain a delimiter. If you set to null then all quoting will be ignored
            quote: "'",
            // The character to use when escaping a value that is quoted and contains a quote character
            escape: '"',
            // ignore empty rows
            ignoreEmpty: true,
            // discard columns that do not map to a header.
            discardUnmappedColumns: true,
            // consider empty lines with too few fields as error
            strictColumnHandling: false,
        })
        .on("data", function(data) {
            // console.log(data);
            csvData.push(data);
        })
        .on("end", function() {
            // remove the first line: header
            csvData.shift();
             // create a new connection to the database
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Ranjitha@11",
        database: "nest_database"
      });
  
      // open the connection
      connection.connect(error => {
        if (error) {
          console.error(error);
        } else {
          let query = 
            "INSERT INTO category (id,name,hotel_id,cat_id,cat_desc,items,hotel,status,created,updated) VALUES ?";
            // "INSERT INTO `category` (`id`, `name`, `hotel_id`, `cat_id`, `cat_desc`, `items`, `hotel`, `status`, `created`, `updated`) VALUES ?";
            // "INSERT INTO items_sub (id,items_id,name,short_desc,price,qty,status,upd_status,created,updated) VALUES ?";
        const row = [],
            csv = [];
            connection.query(query, [csvData], (error, response) => {
            console.log(error || response);
            console.log(query);
            // console.log([csvData]);
            csv.push(row.join(','));

          });
        }
      });
    });
    stream.pipe(csvStream);
    // console.log(stream);
    }
    // paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    //     return from(paginate<User>(this.userRepository, options)).pipe(
    //         map((usersPageable: Pagination<User>) => {
    //             usersPageable.items.forEach(function (v) {delete v.password});
    //             return usersPageable;
    //         })
    //     )
    // }

    
    // paginateFilterByUsername(options: IPaginationOptions, page: Page): Observable<Pagination<User>>{
    //     console.log(options);
    //     return from(this.userRepository.findAndCount({
    //         skip: options.page * options.limit || 0,
    //         take: options.limit || 10,
    //         order: {id: "ASC"},
    //         select: ['id', 'name', 'username', 'email', 'role'],
    //         where: [
    //             { username: Like(`%${page.username}%`)}
    //         ]
    //     })).pipe(
    //         map(([users, totalUsers]) => {
    //             const usersPageable: Pagination<User> = {
    //                 items: users,
    //                 links: {
    //                     first: options.route + `?limit=${options.limit}`,
    //                     previous: options.route + ``,
    //                     next: options.route + `?limit=${options.limit}&page=${options.page +1}`,
    //                     last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUsers / options.limit)}`
    //                 },
    //                 meta: {
    //                     currentPage: options.page,
    //                     itemCount: users.length,
    //                     itemsPerPage: options.limit,
    //                     totalItems: totalUsers,
    //                     totalPages: Math.ceil(totalUsers / options.limit)
    //                 }
    //             };   
    //             console.log(usersPageable);           
    //             return usersPageable;
    //         })
    //     )
    // }
}