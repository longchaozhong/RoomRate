USE room_rate;

DROP TABLE IF exists `room`;	
CREATE TABLE `room_rate`.`room` (
    `id` VARCHAR(200) NOT NULL,
    `title` VARCHAR(100)  NULL COMMENT '房源名称',
    `sub_title` VARCHAR(100)  NULL COMMENT '房源简介',
    `house_type` VARCHAR(45)  NULL COMMENT '房型：“三室一厅”、“一室一厅”……',
    `floor` VARCHAR(45) NULL COMMENT '所在楼层',
    `building_area` VARCHAR(45) NULL COMMENT '建筑面积',
    `room_area` VARCHAR(45) NULL COMMENT '套内面积',
    `room_structure` VARCHAR(45) NULL COMMENT '户型结构，平层、复式、跃式',
    `building_type` VARCHAR(45) NULL COMMENT '建筑类型，板塔结合...',
    `room_direction` VARCHAR(45) NULL COMMENT '房屋朝向',
    `building_structure` VARCHAR(45) NULL COMMENT '建筑结构,钢混结构',
    `decoration` VARCHAR(45) NULL COMMENT '装修情况,钢混结构',
    `elevator_rate` VARCHAR(45) NULL COMMENT '梯户比例',
    `elevator` VARCHAR(45) NULL COMMENT '配备电梯',
    `serviceable_life` VARCHAR(45) NULL COMMENT '产权年限',
    `publish_time` VARCHAR(45) NULL COMMENT '发布时间',
    `transact_type` VARCHAR(45) NULL COMMENT '交易权属',
    `last_transact_time` VARCHAR(45) NULL COMMENT '上次交易时间',
    `house_use_way` VARCHAR(45) NULL COMMENT '房屋用途',
    `hold_duration` VARCHAR(45) NULL COMMENT '房屋年限',
    `owner` VARCHAR(45) NULL COMMENT '产权所属',
    `mortgage` VARCHAR(45) NULL COMMENT '抵押信息',
    `code` VARCHAR(45) NULL COMMENT '链家系统编码',

    `five_years` INT(2)  NULL DEFAULT 0 COMMENT '是否满五年',
    `two_years` INT(2)  NULL DEFAULT 0 COMMENT '是否满两年',
    `near_subway` INT(2)  NULL DEFAULT 0 COMMENT '是否近地铁',
    `see_free` INT(2) NOT NULL DEFAULT 0 COMMENT '是否随时看房',

    `selling_point` VARCHAR(400) NULL  COMMENT '核心卖点',
    `transportation` VARCHAR(400) NULL  COMMENT '交通出行',

    `address_area` VARCHAR(100)  NULL COMMENT '房源地址-所在区',
    `address_street` VARCHAR(100)  NULL COMMENT '房源地址-所在街道',
    `community` VARCHAR(45)  NULL COMMENT '房源所在小区ID',
    `url` VARCHAR(200) NOT NULL COMMENT '网页地址',

    `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

/**
 动态数据，每次爬取数据都新增
*/
DROP TABLE IF exists `dynamic_data`;	
CREATE TABLE `room_rate`.`dynamic_data` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `follow_count` INT COMMENT '关注人数',
    `cart_count` INT COMMENT '总带看人数',
    `price_total` VARCHAR(45)  NULL COMMENT '总价',
    `price_unit` VARCHAR(45)  NULL COMMENT '单价',
    `room_id` VARCHAR(200) NULL COMMENT '对应的房产',
    `recently_visit` VARCHAR(5) NULL COMMENT '最近七天看房次数',

    `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

DROP TABLE IF exists `community`;
CREATE TABLE `room_rate`.`community` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(200)  NULL COMMENT '小区名称',
    `address` VARCHAR(200)  NULL COMMENT '地址',
    `decade` VARCHAR(45) NULL COMMENT '建筑年代',
    `type` VARCHAR(45) NULL COMMENT '建筑类型',
    `condo_fee` VARCHAR(45) NULL COMMENT '物业费用',
    `condo_company` VARCHAR(45) NULL COMMENT '物业公司',
    `develop_company` VARCHAR(45) NULL COMMENT '开发商',
    `building_count` VARCHAR(45) NULL COMMENT '楼栋总数',
    `house_count` VARCHAR(45) NULL COMMENT '房屋总数',
    `url` VARCHAR(200) NOT NULL COMMENT '网页地址',

    `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);


DROP TABLE IF exists `detail_urls`;
CREATE TABLE `room_rate`.`detail_urls` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `href` VARCHAR(200) NOT NULL COMMENT '网页地址',
    `page` VARCHAR(10) NOT NULL COMMENT '网页地址',
	`index` VARCHAR(10) NOT NULL COMMENT '网页地址',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);