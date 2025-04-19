const db = require('../db.js');
const bcrypt = require('bcrypt');

//Login user
exports.loginUser = async (req, res) => {
    console.log("Login request received:", req.body);
    const { username, password } = req.body;
    db.query(`SELECT * FROM USER WHERE username = '${username}'`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) {
            console.log("User not found:", username);
            return res.status(401).json({ error: "Invalid username" });
        }
        
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if(err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({ error: "Bcrypt error" });
            }
            if(!isMatch) {
                console.log("Password mismatch for user:", username);
                return res.status(401).json({ error: "Invalid password" });
            }
            
            console.log("User logged in successfully:", username);
            return res.status(200).json({ message: "Login successful", id: results[0].id });
        });
    });
}

//Register user
exports.registerUser = async (req, res) => {
    console.log("Register request received:", req.body);
    const { username, password, email, address } = req.body;

    if(password.length < 8) {
        console.log("Password too short:", password.length);
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    db.query(`SELECT * FROM USER WHERE username = '${username}'`, (err, results) => {
        if(err) {
            console.error("Database error - retrieve user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length > 0) {
            console.log("Username already exists:", username);
            return res.status(409).json({ error: "Username already exists" });
        }
        
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({ error: "Bcrypt error" });
            }
            
            db.query(`INSERT INTO USER (username, password, email, address) VALUES ('${username}', '${hash}', '${email}', '${address}')`, (err, results) => {
                if(err) {
                    console.error("Database error - create user:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                
                console.log("User registered successfully:", username);
                return res.status(201).json({ message: "User registered successfully" });
            });
        });
    });
}

//Get user
exports.getUser = async (req, res) => {
    console.log("Get user request received:", req.params);
    const { id } = req.params;

    try {
        const userResults = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM USER WHERE id = ${id}`, (err, results) => {
                if (err) {
                    console.error("Database error:", err);
                    return reject(err);
                }
                if (results.length === 0) {
                    console.log("User not found:", id);
                    return reject(new Error("User not found"));
                }
                resolve(results[0]);
            });
        });

        const travels = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM TRAVEL_LOG WHERE user_id = ${id}`, (err, results) => {
                if (err) {
                    console.error("Database error:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });

        const journeys = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM JOURNEY_PLAN WHERE user_id = ${id}`, (err, results) => {
                if (err) {
                    console.error("Database error:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });

        const user_info = {
            id: userResults.id,
            username: userResults.username,
            email: userResults.email,
            address: userResults.address,
            travels: travels,
            journeys: journeys,
        };

        console.log("User retrieved successfully:", user_info);
        return res.status(200).json(user_info);
    } catch (error) {
        console.error("Error retrieving user:", error.message);
        if (error.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

//Update user
exports.updateUser = async (req, res) => {
    console.log("Update user request received:", req.params, req.body);
    const { id } = req.params;
    const { username, password, email, address } = req.body;

    db.query(`SELECT * FROM USER WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error - retrieve user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) {
            console.log("User not found:", id);
            return res.status(404).json({ error: "User not found" });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({ error: "Bcrypt error" });
            }

            db.query(`UPDATE USER SET username = '${username}', password = '${hash}', email = '${email}', address = '${address}' WHERE id = ${id}`, (err, results) => {
                if(err) {
                    console.error("Database error - update user:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                console.log("User updated successfully:", id);
                return res.status(200).json({ message: "User updated successfully" });
            });
        });
    });
}

//Delete user
exports.deleteUser = async (req, res) => {
    console.log("Delete user request received:", req.params);
    const { id } = req.params;
    db.query(`DELETE FROM USER WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.affectedRows === 0) {
            console.log("User not found:", id);
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User deleted successfully:", id);
        return res.status(200).json({ message: "User deleted successfully" });
    });
}