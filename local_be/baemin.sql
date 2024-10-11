-- -------------------------------------------------------------
-- TablePlus 6.1.8(574)
--
-- https://tableplus.com/
--
-- Database: baemin
-- Generation Time: 2024-10-11 21:54:23.0070
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Cart_id_seq";

-- Table Definition
CREATE TABLE "public"."Cart" (
    "id" int8 NOT NULL DEFAULT nextval('"Cart_id_seq"'::regclass),
    "userId" int8 NOT NULL,
    "productId" int8 NOT NULL,
    "quantity" int4 NOT NULL DEFAULT 1,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Category_id_seq";

-- Table Definition
CREATE TABLE "public"."Category" (
    "id" int8 NOT NULL DEFAULT nextval('"Category_id_seq"'::regclass),
    "code" text NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    "image" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Order_id_seq";
DROP TYPE IF EXISTS "public"."OrderStatus";
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPING', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'REFUNDED');

-- Table Definition
CREATE TABLE "public"."Order" (
    "id" int8 NOT NULL DEFAULT nextval('"Order_id_seq"'::regclass),
    "userId" int8 NOT NULL,
    "total" float8 NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING'::"OrderStatus",
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "OrderItem_id_seq";

-- Table Definition
CREATE TABLE "public"."OrderItem" (
    "id" int8 NOT NULL DEFAULT nextval('"OrderItem_id_seq"'::regclass),
    "orderId" int8 NOT NULL,
    "productId" int8 NOT NULL,
    "quantity" int4 NOT NULL,
    "price" float8 NOT NULL,
    "specialPrice" float8,
    "total" float8 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Product_id_seq";
DROP TYPE IF EXISTS "public"."ProductStatus";
CREATE TYPE "public"."ProductStatus" AS ENUM ('PUBLISHED', 'DRAFT', 'ARCHIVED');

-- Table Definition
CREATE TABLE "public"."Product" (
    "id" int8 NOT NULL DEFAULT nextval('"Product_id_seq"'::regclass),
    "name" text NOT NULL,
    "description" text NOT NULL,
    "price" float8 NOT NULL,
    "specialPrice" float8,
    "stock" int4 NOT NULL,
    "status" "public"."ProductStatus" NOT NULL DEFAULT 'DRAFT'::"ProductStatus",
    "storeId" int8 NOT NULL,
    "categoryId" int8 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    "images" _text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Role_id_seq";

-- Table Definition
CREATE TABLE "public"."Role" (
    "id" int8 NOT NULL DEFAULT nextval('"Role_id_seq"'::regclass),
    "name" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Store_id_seq";

-- Table Definition
CREATE TABLE "public"."Store" (
    "id" int8 NOT NULL DEFAULT nextval('"Store_id_seq"'::regclass),
    "name" text NOT NULL,
    "address" text NOT NULL,
    "phone" text NOT NULL,
    "email" text NOT NULL,
    "website" text,
    "openTime" timestamp(3) NOT NULL,
    "closeTime" timestamp(3) NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    "images" _text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "User_id_seq";

-- Table Definition
CREATE TABLE "public"."User" (
    "id" int8 NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
    "email" text NOT NULL,
    "password" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "UserRole_id_seq";

-- Table Definition
CREATE TABLE "public"."UserRole" (
    "id" int8 NOT NULL DEFAULT nextval('"UserRole_id_seq"'::regclass),
    "userId" int8 NOT NULL,
    "roleId" int8 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('153e4488-cddf-426e-b2f5-0117077d3e75', '29dbe01dec3f8085414abc0feea37194cb67a5eea2cfa20839b61dd5f2e75c9f', '2024-09-25 17:47:25.692251+00', '20240925174722_update_cart_unique_table', NULL, NULL, '2024-09-25 17:47:25.687745+00', 1),
('27939a58-fa08-4e1d-8b99-82d50af97e8a', 'dd9384cd4e16426ac5d335c7305cbced7e64a8a02a0f756317796599b7c43754', '2024-09-25 16:34:17.39997+00', '20240925163408_add_cart_table', NULL, NULL, '2024-09-25 16:34:17.388607+00', 1),
('a36beb12-1750-48a6-9169-8ae56fd333e6', '1907b2bb49ffe37c674c42bfb76fd4f83b6ba497532a0ad4b32022c5adbf1447', '2024-09-07 03:56:21.434025+00', '20240907035459_init_table', NULL, NULL, '2024-09-07 03:56:21.382349+00', 1),
('ac93ab05-066f-4daa-987b-ad92479bbc3c', '9d77928b0f42685e48ec3a5ebcce7bb3f6c715e50934f7b67f8b8c5d726a4ab9', '2024-09-07 08:50:45.174396+00', '20240907085032_update_image_table', NULL, NULL, '2024-09-07 08:50:45.16185+00', 1),
('b118281c-fc31-4782-aa6a-34943953b219', '1fa72ba721597ebd9e89e379fc502c5de3fe541061514ed54d1dbd76dc542086', '2024-09-25 17:37:31.022286+00', '20240925173659_update_cart_table', NULL, NULL, '2024-09-25 17:37:31.019619+00', 1);

INSERT INTO "public"."Category" ("id", "code", "name", "description", "createdAt", "updatedAt", "image") VALUES
(13, 'C001', 'Đồ Ăn', 'Đồ Ăn', '2024-09-07 09:05:30.799', '2024-09-07 09:05:30.799', 'https://picsum.photos/id/30/30/30'),
(14, 'C002', 'Đồ Uống', 'Đồ Uống', '2024-09-07 09:05:30.807', '2024-09-07 09:05:30.807', 'https://picsum.photos/id/48/30/30'),
(15, 'C003', 'Đồ Chay', 'Đồ Chay', '2024-09-07 09:05:30.809', '2024-09-07 09:05:30.809', 'https://picsum.photos/id/49/30/30'),
(16, 'C004', 'Lẩu', 'Lẩu', '2024-09-07 09:05:30.811', '2024-09-07 09:05:30.811', 'https://picsum.photos/id/50/30/30');

INSERT INTO "public"."Order" ("id", "userId", "total", "status", "createdAt", "updatedAt") VALUES
(1, 8, 2589000, 'PENDING', '2024-10-09 17:39:22.118', '2024-10-09 17:39:22.118'),
(2, 8, 2589000, 'PENDING', '2024-10-10 16:16:46.724', '2024-10-10 16:16:46.724'),
(3, 8, 550000, 'PENDING', '2024-10-11 07:01:23.714', '2024-10-11 07:01:23.714'),
(4, 8, 266000, 'PENDING', '2024-10-11 07:19:04.185', '2024-10-11 07:19:04.185');

INSERT INTO "public"."OrderItem" ("id", "orderId", "productId", "quantity", "price", "specialPrice", "total", "createdAt", "updatedAt") VALUES
(1, 1, 23, 2, 120000, NULL, 240000, '2024-10-09 17:39:22.118', '2024-10-09 17:39:22.118'),
(2, 1, 34, 1, 199000, NULL, 199000, '2024-10-09 17:39:22.118', '2024-10-09 17:39:22.118'),
(3, 1, 36, 7, 249000, NULL, 1743000, '2024-10-09 17:39:22.118', '2024-10-09 17:39:22.118'),
(4, 1, 35, 2, 129000, NULL, 258000, '2024-10-09 17:39:22.118', '2024-10-09 17:39:22.118'),
(5, 1, 33, 1, 149000, NULL, 149000, '2024-10-09 17:39:22.118', '2024-10-09 17:39:22.118'),
(6, 2, 23, 2, 120000, NULL, 240000, '2024-10-10 16:16:46.724', '2024-10-10 16:16:46.724'),
(7, 2, 34, 1, 199000, NULL, 199000, '2024-10-10 16:16:46.724', '2024-10-10 16:16:46.724'),
(8, 2, 36, 7, 249000, NULL, 1743000, '2024-10-10 16:16:46.724', '2024-10-10 16:16:46.724'),
(9, 2, 35, 2, 129000, NULL, 258000, '2024-10-10 16:16:46.724', '2024-10-10 16:16:46.724'),
(10, 2, 33, 1, 149000, NULL, 149000, '2024-10-10 16:16:46.724', '2024-10-10 16:16:46.724'),
(11, 3, 24, 1, 67000, NULL, 67000, '2024-10-11 07:01:23.714', '2024-10-11 07:01:23.714'),
(12, 3, 21, 1, 105000, NULL, 105000, '2024-10-11 07:01:23.714', '2024-10-11 07:01:23.714'),
(13, 3, 35, 1, 129000, NULL, 129000, '2024-10-11 07:01:23.714', '2024-10-11 07:01:23.714'),
(14, 3, 36, 1, 249000, NULL, 249000, '2024-10-11 07:01:23.714', '2024-10-11 07:01:23.714'),
(15, 4, 36, 1, 249000, NULL, 249000, '2024-10-11 07:19:04.185', '2024-10-11 07:19:04.185'),
(16, 4, 29, 1, 5000, NULL, 5000, '2024-10-11 07:19:04.185', '2024-10-11 07:19:04.185'),
(17, 4, 32, 1, 12000, NULL, 12000, '2024-10-11 07:19:04.185', '2024-10-11 07:19:04.185');

INSERT INTO "public"."Product" ("id", "name", "description", "price", "specialPrice", "stock", "status", "storeId", "categoryId", "createdAt", "updatedAt", "images") VALUES
(21, 'Chả bì ớt xiêm xanh 500gr', 'Bì+ chả+ ớt xiêm+ tiêu Chả dẻo chắc, gia vị đậm đà, thơm cay mùi ớt xiêm đặc trưng. Giá trên là cho nửa kg ạ ‼️Quy cách đóng gói 2 cây 250gr Hoặc 1 cây 500gr Bảo quản lạnh và dùng khi lạnh Do bì có colagen nên sẽ có lớp như thạch bao quanh là bt ạ', 105000, NULL, 99000, 'PUBLISHED', 6, 13, '2024-09-07 09:05:30.815', '2024-09-07 09:05:30.815', '{https://picsum.photos/id/53/320/320,https://picsum.photos/id/54/200/300}'),
(22, 'Chả chiên', 'Hay còn gọi là chả mỡ . Dầu chiên mới nên đảm bảo k có chuyện bị gắt dầu đâu ạ. Mùi thơm chả dai ăn kèm bánh mì bánh cuốn đều ngon ạ 500gr', 94000, 89000, 100, 'PUBLISHED', 6, 13, '2024-09-07 09:05:30.815', '2024-09-07 09:05:30.815', '{https://picsum.photos/id/55/320/320,https://picsum.photos/id/56/200/300}'),
(23, 'Chả lụa', 'Chả lụa là một loại thực phẩm được làm từ thịt bò và một số loại gia vị. Chả lụa có màu trắng và có độ ngọt nhẹ. Chả lụa thường được dùng để làm đồ ăn truyền thống của người Việt Nam, và thường được ăn kèm với bánh mì hoặc bánh cuốn.', 120000, 110000, 100, 'PUBLISHED', 6, 13, '2024-09-07 09:05:30.815', '2024-09-07 09:05:30.815', '{https://picsum.photos/id/57/320/320,https://picsum.photos/id/58/200/300}'),
(24, '2 túi Giò sống/ Mọc tươi', 'Gọi là mọc tươi vì hàng làm bán trong ngày nhé khách ơi, đảm bảo k hàn the Đóng gói dạng túi bắt kem: 2 túi, 200gr/túi => 400gr. Nấu ăn tiện lợi phần chưa dùng tới bảo quản ngăn đông ạ.', 67000, 60000, 100, 'PUBLISHED', 6, 13, '2024-09-07 09:05:30.815', '2024-09-07 09:05:30.815', '{https://picsum.photos/id/59/320/320,https://picsum.photos/id/60/200/300}'),
(25, 'Cà phê sữa', '', 25000, NULL, 100, 'PUBLISHED', 7, 14, '2024-09-07 09:05:30.825', '2024-09-07 09:05:30.825', '{https://picsum.photos/id/63/320/320,https://picsum.photos/id/64/200/300}'),
(26, 'Sữa Tươi Trân Châu Đường Đen', '', 37000, NULL, 100, 'PUBLISHED', 7, 14, '2024-09-07 09:05:30.825', '2024-09-07 09:05:30.825', '{https://picsum.photos/id/65/320/320,https://picsum.photos/id/66/200/300}'),
(27, 'Cacao sữa', '', 32000, NULL, 100, 'PUBLISHED', 7, 14, '2024-09-07 09:05:30.825', '2024-09-07 09:05:30.825', '{https://picsum.photos/id/67/320/320,https://picsum.photos/id/68/200/300}'),
(28, 'Yaourt việt quất', '', 45000, 39000, 100, 'PUBLISHED', 7, 14, '2024-09-07 09:05:30.825', '2024-09-07 09:05:30.825', '{https://picsum.photos/id/69/320/320,https://picsum.photos/id/70/200/300}'),
(29, 'Đậu hũ chiên', '', 5000, NULL, 100, 'PUBLISHED', 8, 15, '2024-09-07 09:05:30.83', '2024-09-07 09:05:30.83', '{https://picsum.photos/id/73/320/320,https://picsum.photos/id/74/200/300}'),
(30, 'Đậu hũ trắng nóng', '', 7000, NULL, 100, 'PUBLISHED', 8, 15, '2024-09-07 09:05:30.83', '2024-09-07 09:05:30.83', '{https://picsum.photos/id/75/320/320,https://picsum.photos/id/76/200/300}'),
(31, 'Dưa cải chua muối 500gram', '', 25000, NULL, 100, 'PUBLISHED', 8, 15, '2024-09-07 09:05:30.83', '2024-09-07 09:05:30.83', '{https://picsum.photos/id/77/320/320,https://picsum.photos/id/78/200/300}'),
(32, 'Chả chén chay', '', 12000, NULL, 100, 'PUBLISHED', 8, 15, '2024-09-07 09:05:30.83', '2024-09-07 09:05:30.83', '{https://picsum.photos/id/79/320/320,https://picsum.photos/id/80/200/300}'),
(33, 'Lẩu thái', '', 149000, 139000, 100, 'PUBLISHED', 9, 16, '2024-09-07 09:05:30.835', '2024-09-07 09:05:30.835', '{https://picsum.photos/id/83/320/320,https://picsum.photos/id/84/200/300}'),
(34, 'Lẩu Bò', '', 199000, 179000, 100, 'PUBLISHED', 9, 16, '2024-09-07 09:05:30.835', '2024-09-07 09:05:30.835', '{https://picsum.photos/id/85/320/320,https://picsum.photos/id/86/200/300}'),
(35, 'Lẩu Cá', '', 129000, 119000, 100, 'PUBLISHED', 9, 16, '2024-09-07 09:05:30.835', '2024-09-07 09:05:30.835', '{https://picsum.photos/id/87/320/320,https://picsum.photos/id/88/200/300}'),
(36, 'Lẩu Tomyum', '', 249000, 229000, 100, 'PUBLISHED', 9, 16, '2024-09-07 09:05:30.835', '2024-09-07 09:05:30.835', '{https://picsum.photos/id/89/320/320,https://picsum.photos/id/90/200/300}');

INSERT INTO "public"."Role" ("id", "name", "createdAt", "updatedAt") VALUES
(7, 'admin', '2024-09-07 09:05:30.608', '2024-09-07 09:05:30.608'),
(8, 'user', '2024-09-07 09:05:30.632', '2024-09-07 09:05:30.632');

INSERT INTO "public"."Store" ("id", "name", "address", "phone", "email", "website", "openTime", "closeTime", "createdAt", "updatedAt", "images") VALUES
(6, 'Giò Chả Má Nguyên - Chả Bì Ớt Xiêm Xanh, Chả Lụa', '38 Đặng Nghiêm, P. Long Thạnh Mỹ, Thành Phố Thủ Đức, TP. HCM', '01629871626', 'store1@example.com', NULL, '2024-09-07 09:05:30.813', '2024-09-07 09:05:30.813', '2024-09-07 09:05:30.815', '2024-09-07 09:05:30.815', '{https://picsum.photos/id/51/200/300,https://picsum.photos/id/52/200/300}'),
(7, 'Tiệm Cà Phê Và Trà Thông - 7A Trường Chinh', '6A Trường Chinh, P. Tân Thới Nhất, Quận 12, TP. HCM', '01629871626', 'store2@example.com', NULL, '2024-09-07 09:05:30.824', '2024-09-07 09:05:30.824', '2024-09-07 09:05:30.825', '2024-09-07 09:05:30.825', '{https://picsum.photos/id/61/200/300,https://picsum.photos/id/62/200/300}'),
(8, 'Đậu Hũ Nóng Hà Nội - 14 Lê Thị Hồng', '14 Lê Thị Hồng, P. 17, Gò Vấp, TP. HCM', '01629871626', 'store3@example.com', NULL, '2024-09-07 09:05:30.829', '2024-09-07 09:05:30.829', '2024-09-07 09:05:30.83', '2024-09-07 09:05:30.83', '{https://picsum.photos/id/71/200/300,https://picsum.photos/id/72/200/300}'),
(9, 'Lẩu & Bún Thái WinDy - Đông Thạnh 4', '79/6 Đông Thạnh 4, X. Đông Thạnh, Hóc Môn, TP. HCM', '01629871626', 'store4@example.com', NULL, '2024-09-07 09:05:30.834', '2024-09-07 09:05:30.834', '2024-09-07 09:05:30.835', '2024-09-07 09:05:30.835', '{https://picsum.photos/id/81/200/300,https://picsum.photos/id/82/200/300}');

INSERT INTO "public"."User" ("id", "email", "password", "createdAt", "updatedAt") VALUES
(7, 'admin@example.com', '$2b$10$Rltq1EJRJB8a.eEhWS3mduKEMSTAOYBbmRnhcuq2.SgmCREID5lxW', '2024-09-07 09:05:30.694', '2024-09-07 09:05:30.694'),
(8, 'user@example.com', '$2b$10$EwOoeP7BA/nwlO5UhrD.Fu.zJHmOJgi36ikHS0PIz0M8i7Udt55E2', '2024-09-07 09:05:30.78', '2024-09-07 09:05:30.78');

INSERT INTO "public"."UserRole" ("id", "userId", "roleId", "createdAt", "updatedAt") VALUES
(7, 7, 7, '2024-09-07 09:05:30.694', '2024-09-07 09:05:30.694'),
(8, 8, 8, '2024-09-07 09:05:30.78', '2024-09-07 09:05:30.78');

ALTER TABLE "public"."Cart" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Cart" ADD FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Indices
CREATE UNIQUE INDEX "Cart_userId_productId_key" ON public."Cart" USING btree ("userId", "productId");


-- Indices
CREATE UNIQUE INDEX "Category_code_key" ON public."Category" USING btree (code);
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."OrderItem" ADD FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."OrderItem" ADD FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Product" ADD FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Product" ADD FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Indices
CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


-- Indices
CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
ALTER TABLE "public"."UserRole" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."UserRole" ADD FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
