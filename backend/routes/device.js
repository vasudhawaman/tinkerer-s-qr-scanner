const express = require("express");
const mongoose = require("mongoose");
const Device = require("../model/device");
const router = express.Router();


router.get("/:deviceId/in-use", async (req, res) => {
    const { deviceId } = req.params;

    try {

        const device = await Device.findOne({ deviceId });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        const inUseStatus = device.inUse.toLowerCase() === "true";

        res.status(200).json({ deviceId, inUse: inUseStatus });
    } catch (error) {
        console.error("Error checking device in-use status:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
router.get('/all', async (req, res) => {
    try {
        // Fetch all devices from the database
        const devices = await Device.find({});
        
        // Send the devices as a response
        res.status(200).json({
            success: true,
            data: devices,
        });
    } catch (error) {
        console.error('Error fetching devices:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching devices',
            error: error.message,
        });
    }
});
router.post("/:deviceId/change-status", async (req, res) => {
    const { deviceId } = req.params;

    try {
        // Find the device by its deviceId
        const device = await Device.findOne({ deviceId });

        // If the device is not found, return an error
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        // Check if the device is already in use
        if (device.inUse.toLowerCase() === "true") {
            return res.status(400).json({ message: "Device is already in use" });
        }

        // Update the device's status to 'in use'
        device.inUse = "true"; // Set the status to 'in use'
        await device.save(); // Save the changes to the database

        res.status(200).json({ message: "Device status updated to 'in use'" });
    } catch (error) {
        console.error("Error changing device status:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = router;
