// algorithm: 'aes-256-cbc'

const crypto = require('crypto');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports = {

    encrypt: function (text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + encrypted.toString('hex')
    },

    decrypt: function (text) {
        let iv = text.substring(0, 32)
        const data = text.substring(32)

        iv = Buffer.from(iv, 'hex');
        let encryptedText = Buffer.from(data, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
