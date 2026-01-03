const { ethers } = require('ethers');
require('dotenv').config();

const PRIVATE_KEY = process.env.BACKEND_PRIVATE_KEY;
const backendWallet = new ethers.Wallet(PRIVATE_KEY);

// Dummy validasi ke "API pemerintah"
function validateHospital(licenseNumber) {
  const validLicenses = ['RS123', 'RS456', 'RS789'];
  return validLicenses.includes(licenseNumber);
}

async function verifyHospital(name, licenseNumber, wallet) {
  const isValid = validateHospital(licenseNumber);

  if (!isValid) {
    return { success: false, message: 'Rumah sakit tidak terdaftar di sistem pemerintah.' };
  }

  const messageHash = ethers.utils.solidityKeccak256(['address', 'string'], [wallet, licenseNumber]);
  const signature = await backendWallet.signMessage(ethers.utils.arrayify(messageHash));

  return {
    success: true,
    signature,
    message: 'Validasi berhasil. Signature siap digunakan untuk registrasi di smart contract.'
  };
}

module.exports = { verifyHospital };