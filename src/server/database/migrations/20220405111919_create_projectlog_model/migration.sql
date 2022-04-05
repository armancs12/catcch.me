-- CreateTable
CREATE TABLE `projectlogs` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('Info', 'Warning', 'Error') NOT NULL,
    `message` TEXT NOT NULL,
    `stack` TEXT NULL,
    `additional_info` TEXT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projectlogs` ADD CONSTRAINT `projectlogs_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
