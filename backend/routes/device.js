const express = require("express");
const mongoose = require("mongoose");
const Device = require("../model/device");
const Usage = require("../model/usage");
const User = require("../model/user");
const router = express.Router();
const { checkForAuthenticationHeader } = require("../middlewares/auth"); 

router.get("/:deviceId/in-use",checkForAuthenticationHeader(), async (req, res) => {
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
router.get('/all', checkForAuthenticationHeader(),async (req, res) => {
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
router.get("/:deviceId/change-status", checkForAuthenticationHeader(),async (req, res) => {
    const { deviceId } = req.params;

    try {
        // Find the device by its deviceId
        const device = await Device.findOne({ deviceId });
        console.log("change-status",req.user);
        const user = await User.findOne({email : req.user.user.email});
        console.log("does user",user);
        // If the device is not found, return an error
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        // Check if the device is already in use
        if (device.inUse.toLowerCase() === "true") {
            return res.status(400).json({ message: "Device is already in use" });
        }

        // Update the device's status to 'in use'
        device.inUse = "true"; 
        device.lastUsed = user._id;
        device.userName = user.name;// Set the status to 'in use'
        await device.save(); // Save the changes to the database
         const newUsage = new Usage({
            deviceId : device.deviceId,
            lastUsed : new Date(),
            name : user.name
         });
        await newUsage.save();
        res.status(200).json({ message: "Device status updated to 'in use'" });
    } catch (error) {
        console.error("Error changing device status:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
router.get("/:deviceId/out-of-use",checkForAuthenticationHeader(),async (req, res) => {
    const { deviceId } = req.params;

    try {
        // Find the device by its deviceId
        const device = await Device.findOne({ deviceId });
        const user = await User.findOne({email : req.user.email});
        // If the device is not found, return an error
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        // Check if the device is already in use
        if (device.inUse.toLowerCase() === "false") {
            return res.status(400).json({ message: "Device is already not in use" });
        }

        // Update the device's status to 'in use'
        device.inUse = "false";
        device.lastUsed ="";
        device.userName =""; // Set the status to 'in use'
        await device.save(); // Save the changes to the database
         const newUsage = new Usage({
            deviceId : device.deviceId,
            lastUsed : new Date(),
            name : user.name
         });
        await newUsage.save();
        res.status(200).json({ message: "Device status updated to 'out of use use'" });
    } catch (error) {
        console.error("Error changing device status:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
router.get("/:deviceId/info",checkForAuthenticationHeader(),async (req, res) => {
    const { deviceId } = req.params;

    try {
        // Find the device by its deviceId
        const device = await Device.findOne({ deviceId });
        
        // If the device is not found, return an error
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }


        res.status(200).json({success:true,device : device});
    } catch (error) {
        console.error("Error changing device status:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
module.exports = router;
