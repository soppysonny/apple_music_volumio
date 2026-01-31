const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// 配置
const teamId = '7KHS4R8V39';
const keyId = '7L6KPR4TKP';
const privateKeyPath = '/Users/zhangming/Documents/AppleMusicKey/AuthKey_7L6KPR4TKP.p8';

// 读取私钥
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// 生成 token（有效期 6 个月）
const now = Math.floor(Date.now() / 1000);
const exp = now + (60 * 60 * 24 * 180); // 180 天

const token = jwt.sign(
  {
    iss: teamId,
    iat: now,
    exp: exp
  },
  privateKey,
  {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: keyId
    }
  }
);

console.log('MusicKit Developer Token 生成成功！');
console.log('');
console.log('Token:');
console.log(token);
console.log('');
console.log('有效期至:', new Date(exp * 1000).toLocaleString('zh-CN'));
console.log('');
console.log('使用方法：');
console.log('1. 复制上面的 token');
console.log('2. 在 src/index.js 中替换 REACT_APP_DEV_TOKEN 的值');
console.log('或者使用环境变量：');
console.log(`REACT_APP_DEV_TOKEN="${token}" npm start`);
