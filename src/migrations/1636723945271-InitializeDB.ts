import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeDB1636723945271 implements MigrationInterface {
    name = 'InitializeDB1636723945271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `cards_category` (`cd_id` int NOT NULL AUTO_INCREMENT, `cd_userid` int NOT NULL, `cd_name` varchar(255) NOT NULL, `cd_link` varchar(255) NOT NULL, `cd_resume` varchar(255) NOT NULL, PRIMARY KEY (`cd_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cards_family` (`cf_id` int NOT NULL AUTO_INCREMENT, `cf_category` int NOT NULL, `cf_number` int NOT NULL, `cf_name` varchar(255) NOT NULL, `cf_color` varchar(255) NOT NULL, PRIMARY KEY (`cf_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cards_game` (`cg_id` int NOT NULL AUTO_INCREMENT, `cg_category` int NULL, `cg_family` int NULL, `cg_number` int NULL, `cg_question` varchar(255) NULL, `cg_reponse` varchar(255) NULL, PRIMARY KEY (`cg_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cards_image` (`img_id` int NOT NULL AUTO_INCREMENT, `img_name` varchar(255) NOT NULL, `img_tag1` int NOT NULL, `img_tag2` int NOT NULL, PRIMARY KEY (`img_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cards_tags` (`tag_id` int NOT NULL AUTO_INCREMENT, `tag_name` varchar(255) NOT NULL, PRIMARY KEY (`tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `cards_tags`");
        await queryRunner.query("DROP TABLE `cards_image`");
        await queryRunner.query("DROP TABLE `cards_game`");
        await queryRunner.query("DROP TABLE `cards_family`");
        await queryRunner.query("DROP TABLE `cards_category`");
    }

}
