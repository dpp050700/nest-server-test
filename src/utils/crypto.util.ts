import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('skhfkehfjegfkjba'); // 16位密钥
const iv = CryptoJS.enc.Utf8.parse('jkfwlegfmkjgkngk'); // 16位向量

export function encryptPassword(password: string, salt: string): string {
  if (!password) return '';

  const saltedPassword = `${password}${salt}`;

  const encrypted = CryptoJS.AES.encrypt(saltedPassword, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

export function decryptPassword(
  encryptedPassword: string,
  salt: string,
): string {
  if (!encryptedPassword) return '';

  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8).replace(salt, '');
}

export function makeSalt(): string {
  const randomSalt = CryptoJS.lib.WordArray.random(16);
  return randomSalt.toString();
}

export function md5(str: string) {
  return CryptoJS.MD5(str).toString();
}
