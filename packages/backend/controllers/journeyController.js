const db = require('../db.js');

exports.getAllJourneys = async (req, res) => {
    console.log("Get all journeys request received:", req.body);
    db.query("SELECT * FROM JOURNEY_PLAN", (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) {
            console.log("No journeys found");
            return res.status(404).json({ error: "No journeys found" });
        }
        console.log("Journeys retrieved successfully:", results);
        return res.status(200).json(results);
    });
}

exports.createJourney = async (req, res) => {
    console.log("Create journey request received:", req.body);
    const { user_id, name, locations, start_date, end_date, activities, description } = req.body;
    db.query(`INSERT INTO JOURNEY_PLAN (user_id, name, locations, start_date, end_date, activities, description) VALUES (${user_id}, '${name}', '${locations}', '${start_date}', '${end_date}', '${activities}', '${description}')`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("Journey created successfully:", results);
        return res.status(201).json(results);
    });
}

exports.getJourney = async (req, res) => {
    console.log("Get journey request received:", req.params);
    const { id } = req.params;
    db.query(`SELECT * FROM JOURNEY_PLAN WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) {
            console.log("Journey not found:", id);
            return res.status(404).json({ error: "Journey not found" });
        }
        console.log("Journey retrieved successfully:", results[0]);
        return res.status(200).json(results[0]);
    });
}

exports.updateJourney = async (req, res) => {
    console.log("Update journey request received:", req.params, req.body);
    const { id } = req.params;
    const { user_id, name, locations, start_date, end_date, activities, description } = req.body;
    db.query(`UPDATE JOURNEY_PLAN SET user_id = ${user_id}, name='${name}', locations='${locations}', start_date='${start_date}', end_date='${end_date}', activities='${activities}', description='${description}' WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.affectedRows === 0) {
            console.log("Journey not found:", id);
            return res.status(404).json({ error: "Journey not found" });
        }
        console.log("Journey updated successfully:", results);
        return res.status(200).json(results);
    });
}

exports.deleteJourney = async (req, res) => {
    console.log("Delete journey request received:", req.params);
    const { id } = req.params;
    db.query(`DELETE FROM JOURNEY_PLAN WHERE id = ${id}`, (err, results) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.affectedRows === 0) {
            console.log("Journey not found:", id);
            return res.status(404).json({ error: "Journey not found" });
        }
        console.log("Journey deleted successfully:", results);
        return res.status(200).json(results);
    });
}
