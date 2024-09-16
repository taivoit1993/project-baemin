import { PrismaClient, ProductStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const roleAmin = await prisma.role.create({
    data: {
      name: 'admin',
    },
  });

  const roleUser = await prisma.role.create({
    data: {
      name: 'user',
    },
  });
  // Create an admin user
  const adminPassword = await bcrypt.hash('admin123', saltRounds);
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
      userRoles: {
        create: {
          roleId: roleAmin.id,
        },
      },
    },
  });

  // Create a regular user
  const userPassword = await bcrypt.hash('user123', saltRounds);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      userRoles: {
        create: {
          roleId: roleUser.id,
        },
      },
    },
  });

  // Create a category
  const category1 = await prisma.category.create({
    data: {
      name: 'Đồ Ăn',
      code: 'C001',
      description: 'Đồ Ăn',
      image: 'https://picsum.photos/id/30/200/300',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Đồ Uống',
      code: 'C002',
      description: 'Đồ Uống',
      image: 'https://picsum.photos/id/48/200/300',
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Đồ Chay',
      code: 'C003',
      description: 'Đồ Chay',
      image: 'https://picsum.photos/id/49/200/300',
    },
  });
  
  const category4 = await prisma.category.create({
    data: {
      name: 'Lẩu',
      code: 'C004',
      description: 'Lẩu',
      image: 'https://picsum.photos/id/50/200/300',
    },
  });

  // Create a store
  await prisma.store.create({
    data: {
      name: 'Giò Chả Má Nguyên - Chả Bì Ớt Xiêm Xanh, Chả Lụa',
      address: '38 Đặng Nghiêm, P. Long Thạnh Mỹ, Thành Phố Thủ Đức, TP. HCM',
      phone: '01629871626',
      email: 'store1@example.com',
      openTime: new Date(),
      closeTime: new Date(),
      images: ['https://picsum.photos/id/51/200/300', 'https://picsum.photos/id/52/200/300'],
      Product: {
        create: [
          {
            name: 'Chả bì ớt xiêm xanh 500gr',
            description:
              'Bì+ chả+ ớt xiêm+ tiêu Chả dẻo chắc, gia vị đậm đà, thơm cay mùi ớt xiêm đặc trưng. Giá trên là cho nửa kg ạ ‼️Quy cách đóng gói 2 cây 250gr Hoặc 1 cây 500gr Bảo quản lạnh và dùng khi lạnh Do bì có colagen nên sẽ có lớp như thạch bao quanh là bt ạ',
            price: 105000,
            stock: 99000,
            categoryId: category1.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/53/200/300', 'https://picsum.photos/id/54/200/300'],
          },
          {
            name: 'Chả chiên',
            description:
              'Hay còn gọi là chả mỡ . Dầu chiên mới nên đảm bảo k có chuyện bị gắt dầu đâu ạ. Mùi thơm chả dai ăn kèm bánh mì bánh cuốn đều ngon ạ 500gr',
            price: 94000,
            specialPrice: 89000,
            stock: 100,
            categoryId: category1.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/55/200/300', 'https://picsum.photos/56/200/300'],
          },
          {
            name: 'Chả lụa',
            description:
              'Chả lụa là một loại thực phẩm được làm từ thịt bò và một số loại gia vị. Chả lụa có màu trắng và có độ ngọt nhẹ. Chả lụa thường được dùng để làm đồ ăn truyền thống của người Việt Nam, và thường được ăn kèm với bánh mì hoặc bánh cuốn.',
            price: 120000,
            specialPrice: 110000,
            stock: 100,
            categoryId: category1.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/57/200/300', 'https://picsum.photos/id/58/200/300'],
          },
          {
            name: '2 túi Giò sống/ Mọc tươi',
            description:
              'Gọi là mọc tươi vì hàng làm bán trong ngày nhé khách ơi, đảm bảo k hàn the Đóng gói dạng túi bắt kem: 2 túi, 200gr/túi => 400gr. Nấu ăn tiện lợi phần chưa dùng tới bảo quản ngăn đông ạ.',
            price: 67000,
            specialPrice: 60000,
            stock: 100,
            categoryId: category1.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/59/200/300', 'https://picsum.photos/id/60/200/300'],
          },
        ],
      },
    },
  });

  await prisma.store.create({
    data: {
      name: 'Tiệm Cà Phê Và Trà Thông - 7A Trường Chinh',
      address: '6A Trường Chinh, P. Tân Thới Nhất, Quận 12, TP. HCM',
      phone: '01629871626',
      email: 'store2@example.com',
      openTime: new Date(),
      closeTime: new Date(),
      images: ['https://picsum.photos/id/61/200/300', 'https://picsum.photos/id/62/200/300'],
      Product: {
        create: [
          {
            name: 'Cà phê sữa',
            description: '',
            price: 25000,
            stock: 100,
            categoryId: category2.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/63/200/300', 'https://picsum.photos/id/64/200/300'],
          },
          {
            name: 'Sữa Tươi Trân Châu Đường Đen',
            description: '',
            price: 37000,
            stock: 100,
            categoryId: category2.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/65/200/300', 'https://picsum.photos/id/66/200/300'],
          },
          {
            name: 'Cacao sữa',
            description: '',
            price: 32000,
            stock: 100,
            categoryId: category2.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/67/200/300', 'https://picsum.photos/id/68/200/300'],
          },
          {
            name: 'Yaourt việt quất',
            description: '',
            price: 45000,
            specialPrice: 39000,
            stock: 100,
            categoryId: category2.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/69/200/300', 'https://picsum.photos/70/200/300'],
          },
        ],
      },
    },
  });

  await prisma.store.create({
    data: {
      name: 'Đậu Hũ Nóng Hà Nội - 14 Lê Thị Hồng',
      address: '14 Lê Thị Hồng, P. 17, Gò Vấp, TP. HCM',
      phone: '01629871626',
      email: 'store3@example.com',
      openTime: new Date(),
      closeTime: new Date(),
      images: ['https://picsum.photos/id/71/200/300', 'https://picsum.photos/id/72/200/300'],
      Product: {
        create: [
          {
            name: 'Đậu hũ chiên',
            description: '',
            price: 5000,
            stock: 100,
            categoryId: category3.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/73/200/300', 'https://picsum.photos/id/74/200/300'],
          },
          {
            name: 'Đậu hũ trắng nóng',
            description: '',
            price: 7000,
            stock: 100,
            categoryId: category3.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/75/200/300', 'https://picsum.photos/id/76/200/300'],
          },
          {
            name: 'Dưa cải chua muối 500gram',
            description: '',
            price: 25000,
            stock: 100,
            categoryId: category3.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/77/200/300', 'https://picsum.photos/id/78/200/300'],
          },
          {
            name: 'Chả chén chay',
            description: '',
            price: 12000,
            stock: 100,
            categoryId: category3.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/79/200/300', 'https://picsum.photos/id/80/200/300'],
          },
        ],
      },
    },
  });

  await prisma.store.create({
    data: {
      name: 'Lẩu & Bún Thái WinDy - Đông Thạnh 4',
      address: '79/6 Đông Thạnh 4, X. Đông Thạnh, Hóc Môn, TP. HCM',
      phone: '01629871626',
      email: 'store4@example.com',
      openTime: new Date(),
      closeTime: new Date(),
      images: ['https://picsum.photos/id/81/200/300', 'https://picsum.photos/id/82/200/300'],
      Product: {
        create: [
          {
            name: 'Lẩu thái',
            description: '',
            price: 149000,
            specialPrice: 139000,
            stock: 100,
            categoryId: category4.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/83/200/300', 'https://picsum.photos/id/84/200/300'],
          },
          {
            name: 'Lẩu Bò',
            description: '',
            price: 199000,
            specialPrice: 179000,
            stock: 100,
            categoryId: category4.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/85/200/300', 'https://picsum.photos/id/86/200/300'],
          },
          {
            name: 'Lẩu Cá',
            description: '',
            price: 129000,
            specialPrice: 119000,
            stock: 100,
            categoryId: category4.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/87/200/300', 'https://picsum.photos/88/200/300'],
          },
          {
            name: 'Lẩu Tomyum',
            description: '',
            price: 249000,
            specialPrice: 229000,
            stock: 100,
            categoryId: category4.id,
            status: ProductStatus.PUBLISHED,
            images: ['https://picsum.photos/id/89/200/300', 'https://picsum.photos/id/90/200/300'],
          },
        ],
      },
    },
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
