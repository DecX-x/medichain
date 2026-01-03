const express = require('express');
const router = express.Router();
const { verifyHospital } = require('../services/hospitalVerifier');

// Endpoint POST /api/hospital/verify
router.post('/hospital/verify', async (req, res) => {
  try {
    const { name, licenseNumber, wallet } = req.body;
    const result = await verifyHospital(name, licenseNumber, wallet);
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

module.exports = router;