/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : e-auto-market

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 13/04/2021 21:56:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for api_car
-- ----------------------------
DROP TABLE IF EXISTS `api_car`;
CREATE TABLE `api_car`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sub_pictures` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `brand` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year` int NULL DEFAULT NULL,
  `mileage` int NULL DEFAULT NULL,
  `displacement` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `amt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int NULL DEFAULT NULL,
  `status` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `api_car_user_id_d5102c23_fk_api_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `api_car_user_id_d5102c23_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_car
-- ----------------------------
INSERT INTO `api_car` VALUES (2, '2772b084-3f49-4506-a1c3-925f9cfcf078', 'e80361fc-080d-4ca3-8a37-082133ed6f3b,f26a84f3-ca7a-4005-99ab-8bec55b5a937,4b7ed5bd-2db2-4ad5-9c47-f4fffcad3b98,e241bc7a-8282-41f3-9e75-1c098df296f8,fbf1d09c-712d-4a0f-9814-85f5cab8aa0b', 'Hyundai', 'Hyundai 2016 1.8L GLS', 2016, 60000, '1.8L', 'AMT', 13000, 1, 2);
INSERT INTO `api_car` VALUES (3, '9df6d6cf-47e4-400b-a9e6-44062370bab8', 'f08827b5-41eb-4332-bc3a-1fd369efef02', 'Jeep', 'Jeep 2011 2.4L', 2011, 140000, '2.4L', 'AMT', 9000, 0, 2);
INSERT INTO `api_car` VALUES (4, '001217a8-8e7d-46c1-b25a-7b92edd3ad71', 'd58894dc-3c8a-40e0-b023-03e7a1ebc882', 'Cadillac', 'Cadillac GX7 2015 2.0L', 2015, 98000, '2.0L', 'AMT', 5600, 0, 2);
INSERT INTO `api_car` VALUES (5, '36c07d93-36d2-4fb9-b8be-2eb3be7d561a', '06850e52-b7f4-407f-b1ba-bee5360b66d8', 'Volkswagen', 'Volkswagen PASSAT 2011 1.8TSI DSG', 2011, 169000, '1.8T', 'AMT', 11000, 0, 2);

-- ----------------------------
-- Table structure for api_order
-- ----------------------------
DROP TABLE IF EXISTS `api_order`;
CREATE TABLE `api_order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_date` date NULL DEFAULT NULL,
  `car_id` int NOT NULL,
  `user_id` int NOT NULL,
  `seller_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `api_order_car_id_cb808777_fk_api_car_id`(`car_id`) USING BTREE,
  INDEX `api_order_user_id_52781ff0_fk_api_user_id`(`user_id`) USING BTREE,
  INDEX `api_order_seller_id_7367b092_fk_api_user_id`(`seller_id`) USING BTREE,
  CONSTRAINT `api_order_car_id_cb808777_fk_api_car_id` FOREIGN KEY (`car_id`) REFERENCES `api_car` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `api_order_seller_id_7367b092_fk_api_user_id` FOREIGN KEY (`seller_id`) REFERENCES `api_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `api_order_user_id_52781ff0_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_order
-- ----------------------------
INSERT INTO `api_order` VALUES (3, '2021-04-13', 2, 1, 2);

-- ----------------------------
-- Table structure for api_role
-- ----------------------------
DROP TABLE IF EXISTS `api_role`;
CREATE TABLE `api_role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_role
-- ----------------------------
INSERT INTO `api_role` VALUES (1, 'buyer');
INSERT INTO `api_role` VALUES (2, 'seller');

-- ----------------------------
-- Table structure for api_tempuser
-- ----------------------------
DROP TABLE IF EXISTS `api_tempuser`;
CREATE TABLE `api_tempuser`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_tempuser
-- ----------------------------
INSERT INTO `api_tempuser` VALUES (14, '464587444@qq.com', '123456', '865997');

-- ----------------------------
-- Table structure for api_user
-- ----------------------------
DROP TABLE IF EXISTS `api_user`;
CREATE TABLE `api_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NULL DEFAULT NULL,
  `create_date` date NULL DEFAULT NULL,
  `balance` double NULL DEFAULT NULL,
  `roles_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `api_user_roles_id_3b142c09_fk_api_role_id`(`roles_id`) USING BTREE,
  CONSTRAINT `api_user_roles_id_3b142c09_fk_api_role_id` FOREIGN KEY (`roles_id`) REFERENCES `api_role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_user
-- ----------------------------
INSERT INTO `api_user` VALUES (1, '464587444@qq.com', 'pbkdf2_sha256$216000$UKf7DLKb2L7e$9zwG6ybtPVbYZTr+nfbsROcVfVCZaBsuB+3qcB/i1fY=', 1, '2021-04-13', 88000, 1);
INSERT INTO `api_user` VALUES (2, 'whn18810553246@163.com', 'pbkdf2_sha256$216000$UKf7DLKb2L7e$9zwG6ybtPVbYZTr+nfbsROcVfVCZaBsuB+3qcB/i1fY=', 1, '2021-04-08', 10000, 2);

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'api', '0001_initial', '2021-04-12 13:32:47.955021');
INSERT INTO `django_migrations` VALUES (2, 'api', '0002_car', '2021-04-13 01:27:14.250893');
INSERT INTO `django_migrations` VALUES (3, 'api', '0003_car_price', '2021-04-13 03:28:43.635143');
INSERT INTO `django_migrations` VALUES (4, 'api', '0004_auto_20210413_1129', '2021-04-13 03:29:04.639004');
INSERT INTO `django_migrations` VALUES (5, 'api', '0005_auto_20210413_1752', '2021-04-13 09:52:48.666465');
INSERT INTO `django_migrations` VALUES (6, 'api', '0006_car_user', '2021-04-13 13:14:17.321789');
INSERT INTO `django_migrations` VALUES (7, 'api', '0007_order_seller', '2021-04-13 13:50:19.360171');

SET FOREIGN_KEY_CHECKS = 1;
