import {MigrationInterface, QueryRunner} from "typeorm";
import {UUIDs, BaseSeed} from './base';

export class SeedUsers1595023156348 extends BaseSeed implements MigrationInterface {
    table = 'users';
    data = [
        {
            id: UUIDs.users[0],
            username: "user1",
            email: "user1@email.com",
            password: "$2b$10$nH31Ut9nh6KlvWQRMcyfD.Ox5vMab5QvrzigeZRLkG6uAyevEKM/e",
            account_mode: "student",
            verified: true,
        },
        {
            id: UUIDs.users[1],
            username: "user2",
            email: "user2@email.com",
            password: "$2b$10$nH31Ut9nh6KlvWQRMcyfD.Ox5vMab5QvrzigeZRLkG6uAyevEKM/e",
            account_mode: "student",
            verified: true,
       }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
       await this.seedDevevelopmentData(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
