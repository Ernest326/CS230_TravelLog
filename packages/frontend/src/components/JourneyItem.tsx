import React from "react";
import { Paper, Typography, Button, Grid } from "@mui/material";

interface JourneyItemProps {
    title: string,
    description: string,
    locations: string[],
    activities: string[],
    startDate: string,
    endDate: string,
    onEdit: () => void
}

const JourneyItem : React.FC<JourneyItemProps> = ({title, description, locations, activities, startDate, endDate, onEdit}) =>{

    return (
        <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 300 }}>
            <Typography variant="h6" component="h2" align="center">
            {title}
            </Typography>
            <Typography 
            variant="body1" 
            align="center" 
            sx={{ mb: 2, whiteSpace: "normal", wordWrap: "break-word", maxWidth: "100%", textAlign: "center", overflowWrap: "break-word" }}
            >
            {description}
            </Typography>
            <Typography variant="body2" align="center">
            Locations: {locations.join(", ")}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Activities: {activities.join(", ")}
            </Typography>
            <Typography variant="body2" align="center">
            Start Date: {startDate.replace(/T.*$/, "")}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            End Date: {endDate.replace(/T.*$/, "")}
            </Typography>
            <Button variant="contained" color="primary" onClick={onEdit}>
            Edit Journey
            </Button>
        </Paper>
        </Grid>
    )
}

export default JourneyItem;