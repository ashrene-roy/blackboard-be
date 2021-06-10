const crypto = require('crypto');
const fs = require('fs');

class Crypto {
    
    constructor(key, iv) {
        this.key = key.toString();
        this.iv = iv.toString();
    }

    encryptAES(filePath) {
        let cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let input = fs.createReadStream(filePath);
        return input.pipe(cipher);
    }

    decryptAES(ciphertext) {
        let decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
        let dec = Buffer.concat([decipher.update(ciphertext) , decipher.final()]);
        return dec;
    }
}

module.exports = { Crypto }