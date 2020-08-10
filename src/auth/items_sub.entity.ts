import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class Items_sub {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    items_id : number;

    @Column()
    name : string;

    @Column()
    short_desc: string;

    @Column()
    cat_desc: string;

    @Column()
    price: string;

    @Column()
    qty: string;

    @Column()
    upd_status: string;

    @Column()
    created: string;

    @Column()
    updated: string;

}