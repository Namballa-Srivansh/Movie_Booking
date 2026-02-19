const mongoose = require("mongoose");
const User = require("../models/user.model");
const { USER_ROLE, USER_STATUS } = require("../utils/constants");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function makeAdmin(email) {
    try {
        console.log("Connecting to database...");
        // Use PROD_DB_URL if available, otherwise DB_URL 
        const dbUrl = process.env.PROD_DB_URL || process.env.DB_URL;

        if (!dbUrl) {
            console.error("No database URL found in .env");
            return;
        }

        await mongoose.connect(dbUrl);
        console.log("Connected.");

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User with email '${email}' not found.`);
            return;
        }

        user.userRole = USER_ROLE.admin;
        user.userStatus = USER_STATUS.approved;
        await user.save();

        console.log(`SUCCESS: User '${email}' has been promoted to ADMIN.`);
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

const email = process.argv[2];
if (!email) {
    console.log("Usage: node scripts/makeAdmin.js <email>");
} else {
    makeAdmin(email);
}
