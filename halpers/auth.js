import { randomBytes, pbkdf2 } from "crypto";

// Hash a password using pbkdf2
export const hashPassword = async (password) => {
    try {
        const salt = randomBytes(16).toString("hex"); // Generate a 16-byte salt in hex format
        const derivedKey = await new Promise((resolve, reject) => {
            // pbkdf2 algorithm with 10000 iterations, 64 byte key length, and sha512 hashing
            pbkdf2(password, salt, 10000, 64, "sha512", (err, derivedKey) => {
                if (err) reject(new Error("Error hashing the password: " + err.message));
                resolve(derivedKey);
            });
        });
        // Return the salt and hashed password as a single string
        return `${salt}:${derivedKey.toString("hex")}`;
    } catch (err) {
        throw new Error("Error hashing password: " + err.message);
    }
};

// Compare a password with a hashed password
export const comparePassword = async (password, hashed) => {
    try {
        const [salt, storedKey] = hashed.split(":");
        const derivedKey = await new Promise((resolve, reject) => {
            // pbkdf2 with the same parameters used in the hashPassword function
            pbkdf2(password, salt, 10000, 64, "sha512", (err, derivedKey) => {
                if (err) reject(new Error("Error comparing the password: " + err.message));
                resolve(derivedKey);
            });
        });
        // Check if the derived key matches the stored key
        return storedKey === derivedKey.toString("hex");
    } catch (err) {
        throw new Error("Error comparing password: " + err.message);
    }
};
