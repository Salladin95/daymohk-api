import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}
const encodePassword = async (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

const prisma = new PrismaClient();
const rootAdminLogin = process.env.ROOT_ADMIN_LOGIN ?? 'admin01';
const rootAdminPassword = process.env.ROOT_ADMIN_PASSWORD ?? 'password-01';

const testUserLogin = process.env.TEST_USER ?? 'testUser';
const testUserPassword = process.env.USER_DEFAULT_PASSWORD ?? 'password-01';

const salt = process.env.SALT ?? '7';

async function main() {
  const hashPass = await encodePassword(rootAdminPassword, +salt);
  await prisma.user.upsert({
    where: { login: rootAdminLogin },
    update: {},
    create: {
      login: rootAdminLogin,
      password: hashPass,
      roles: [Role.Admin, Role.User],
    },
  });

  const testUserHashPass = await encodePassword(testUserPassword, +salt);
  await prisma.user.upsert({
    where: { login: testUserLogin },
    update: {},
    create: {
      login: testUserLogin,
      password: testUserHashPass,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
