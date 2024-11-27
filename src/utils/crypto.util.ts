// import CryptoJS from 'crypto-js';

// const key = CryptoJS.enc.Utf8.parse('skhfkehfjegfkjba');
// const iv = CryptoJS.enc.Utf8.parse('jkfwlegfmkjgkngk');

// export function encryptPassword(password: string): string {
//   if (!password) return '';

//   const encrypted = CryptoJS.AES.encrypt(password, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   return encrypted.toString();
// }

// export function decryptPassword(encryptedPassword: string): string {
//   if (!encryptedPassword) return '';

//   const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
import CryptoJS from 'crypto-js';

// 加密密钥和向量
const key = CryptoJS.enc.Utf8.parse('skhfkehfjegfkjba'); // 16位密钥
const iv = CryptoJS.enc.Utf8.parse('jkfwlegfmkjgkngk'); // 16位向量
const salt = CryptoJS.enc.Utf8.parse('hf8YH36Kl9'); // 加盐

/**
 * AES加密密码
 * @param password 原始密码
 * @returns 加密后的密码
 */
export function encryptPassword(password: string): string {
  if (!password) return '';

  // 将密码与盐值组合
  const saltedPassword = password + salt;

  const encrypted = CryptoJS.AES.encrypt(saltedPassword, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

/**
 * AES解密密码
 * @param encryptedPassword 加密后的密码
 * @returns 解密后的原始密码
 */
export function decryptPassword(encryptedPassword: string): string {
  if (!encryptedPassword) return '';

  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

  // 移除盐值
  return decryptedStr.replace(salt.toString(), '');
}

export function md5(str: string) {
  return CryptoJS.MD5(str).toString();
}
