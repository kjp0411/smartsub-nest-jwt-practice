import * as bcrypt from 'bcrypt';

async function run() {
  const plainPassword = '1234'; // 평문 비밀번호 예시
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log('Hashed password:', hashed);
}

run();