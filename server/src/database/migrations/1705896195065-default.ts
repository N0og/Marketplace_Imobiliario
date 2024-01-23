import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705896195065 implements MigrationInterface {
    name = 'Default1705896195065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_images\` DROP FOREIGN KEY \`FK_c8e7f7b4e7be1c4bbd0bfa34a12\``);
        await queryRunner.query(`ALTER TABLE \`tb_posts\` DROP FOREIGN KEY \`FK_45d509ab0f909a31e0b94ad7e85\``);
        await queryRunner.query(`ALTER TABLE \`tb_images\` CHANGE \`postId\` \`post_id\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`tb_posts\` CHANGE \`userId\` \`user_id\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`tb_images\` ADD CONSTRAINT \`FK_40f4b172f41b2592a437c14eb2d\` FOREIGN KEY (\`post_id\`) REFERENCES \`tb_posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_posts\` ADD CONSTRAINT \`FK_b3685cf47b340cb0af589fb3245\` FOREIGN KEY (\`user_id\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_posts\` DROP FOREIGN KEY \`FK_b3685cf47b340cb0af589fb3245\``);
        await queryRunner.query(`ALTER TABLE \`tb_images\` DROP FOREIGN KEY \`FK_40f4b172f41b2592a437c14eb2d\``);
        await queryRunner.query(`ALTER TABLE \`tb_posts\` CHANGE \`user_id\` \`userId\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`tb_images\` CHANGE \`post_id\` \`postId\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`tb_posts\` ADD CONSTRAINT \`FK_45d509ab0f909a31e0b94ad7e85\` FOREIGN KEY (\`userId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_images\` ADD CONSTRAINT \`FK_c8e7f7b4e7be1c4bbd0bfa34a12\` FOREIGN KEY (\`postId\`) REFERENCES \`tb_posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
