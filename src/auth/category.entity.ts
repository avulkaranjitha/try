import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @Column()
    hotel_id : number;

    @Column()
    cat_id: number;

    @Column()
    cat_desc: string;

    @Column()
    items: string;

    @Column()
    hotel: string;

    @Column()
    status: string;

    @Column()
    created: string;

    @Column()
    updated: string;

}
