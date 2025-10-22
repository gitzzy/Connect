// in utils/otp.js
const otpStore = {}; // { userId: otp }

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
}

function storeOtp(userId, otp) {
    otpStore[userId] = otp;
    // optional: setTimeout to auto-delete OTP after 5 mins
}

function verifyOtp(userId, otp) {
    return otpStore[userId] && otpStore[userId] == otp;
}

module.exports = { generateOtp, storeOtp, verifyOtp };
