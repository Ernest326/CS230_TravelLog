const db = require('../db.js');

// Get all travels
exports.getAllTravels = async (req, res) => {
    console.log("Get all travels request received:", req.body);
    db.query("SELECT * FROM TRAVEL_LOG", (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) {
            console.log("No travels found");
            return res.status(404).json({ error: "No travels found" });
        }
        console.log("Travels retrieved successfully:", results);
        return res.status(200).json(results);
    });
}

//Create travel
exports.createTravel = async (req, res) => {
    console.log("Create travel request received:", req.body);
    const { user_id, title, description, start_date, end_date, post_date, tags } = req.body;
    db.query(`INSERT INTO TRAVEL_LOG (user_id, title, description, start_date, end_date, post_date, tags) VALUES (${user_id}, '${title}', '${description}', '${start_date}', '${end_date}', '${post_date}', '${tags}')`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("Travel created successfully:", results);
        return res.status(201).json(results);
    });
}

//Get travel
exports.getTravel = async (req, res) => {
    console.log("Get travel request received:", req.params);
    const { id } = req.params;
    db.query(`SELECT * FROM TRAVEL_LOG WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) {
            console.log("Travel not found:", id);
            return res.status(404).json({ error: "Travel not found" });
        }
        console.log("Travel retrieved successfully:", results[0]);
        return res.status(200).json(results[0]);
    });
}

//Update travel
exports.updateTravel = async (req, res) => {
    console.log("Update travel request received:", req.params, req.body);
    const { id } = req.params;
    const { user_id, title, description, start_date, end_date, post_date, tags } = req.body;
    db.query(`UPDATE TRAVEL_LOG SET user_id = ${user_id}, title = '${title}', description = '${description}', start_date = '${start_date}', end_date = '${end_date}', post_date = '${post_date}', tags = '${tags}' WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.affectedRows === 0) {
            console.log("Travel not found:", id);
            return res.status(404).json({ error: "Travel not found" });
        }
        console.log("Travel updated successfully:", results);
        return res.status(200).json(results);
    });
}

//Delete travel
exports.deleteTravel = async (req, res) => {
    console.log("Delete travel request received:", req.params);
    const { id } = req.params;
    db.query(`DELETE FROM TRAVEL_LOG WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.affectedRows === 0) {
            console.log("Travel not found:", id);
            return res.status(404).json({ error: "Travel not found" });
        }
        console.log("Travel deleted successfully:", results);
        return res.status(200).json(results);
    });
}
