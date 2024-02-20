var CryptoJS = require("crypto-js");

let cryptoJsSecretKey = "123456$#@$^@1ERF";


//The get method is use for decrypt the password value.
export async function getDecryptString(value) {
    var key = CryptoJS.enc.Utf8.parse(cryptoJsSecretKey);
    var iv = CryptoJS.enc.Utf8.parse(cryptoJsSecretKey);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}



//The set method is use for encrypt the password value.
export async function setEncryptString(value) {
    var key = CryptoJS.enc.Utf8.parse(cryptoJsSecretKey);
    var iv = CryptoJS.enc.Utf8.parse(cryptoJsSecretKey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}
