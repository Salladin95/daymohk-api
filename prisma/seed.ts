import { PrismaClient } from '@prisma/client';
import { encodePassword } from '../src/utils/bcrypt';

const prisma = new PrismaClient();
const rootAdminLogin = process.env.ROOT_ADMIN_LOGIN ?? 'admin01';
const rootAdminPassword = process.env.ROOT_ADMIN_PASSWORD ?? 'password-01';
const salt = +process.env.SALT ?? 99;

async function main() {
  const hashPass = await encodePassword(rootAdminPassword, salt);
  await prisma.user.upsert({
    where: { login: rootAdminLogin },
    update: {},
    create: { login: rootAdminLogin, password: hashPass, role: 'ADMIN' },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('here');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
