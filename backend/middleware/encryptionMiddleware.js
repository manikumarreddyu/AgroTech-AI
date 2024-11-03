const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // Encryption algorithm
const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'utf8'); // Use a secure key in production


// Encrypt payment method details
const encryptField = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
  };
  
  // Function to decrypt data
const decryptField = (encryptedData, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };

module.exports = { encryptField, decryptField};
