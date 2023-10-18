import { RowDataPacket } from 'mysql2/promise';


export interface BlogInput {
    title: string;
    content: string;
}

export interface Blog extends RowDataPacket {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
