import React from 'react';
import { Container, Typography, Stack, Grid, Paper, Button, TextField} from '@mui/material';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router';
import JourneyItem from '../../components/JourneyItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Journey = () => {

    const { loggedIn, id } = useUser();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [locations, setLocations] = React.useState<string[]>([]);
    const [activities, setActivities] = React.useState<string[]>([]);
    const [startDate, setStartDate] = React.useState(new Date().toISOString().replace(/T.*$/, ""));
    const [endDate, setEndDate] = React.useState(new Date().toISOString().replace(/T.*$/, ""));
    const [journeys, setJourneys] = React.useState([]);
    const [updatingJourney, setUpdatingJourney] = React.useState(false);
    const [journeyForm, setJourneyForm] = React.useState(false);
    const [journeyId, setJourneyId] = React.useState(0);

    const [user, setUser] = useState({username: '', password: '', email: '', address: '', travels: [], journeys: []});

    const cancelForm = () => {
        setJourneyForm(false);
        setUpdatingJourney(false);
        setTitle('');
        setDescription('');
        setLocations([]);
        setActivities([]);
        setStartDate(new Date().toISOString().replace(/T.*$/, ""));
        setEndDate(new Date().toISOString().replace(/T.*$/, ""));
    }

    const fetchUserInfo = (id : number) => {
        axios.get(`http://localhost:3000/user/${id}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                setJourneys(response.data.journeys);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        if(loggedIn) {
            fetchUserInfo(id);
        }
    }, [loggedIn, id]);

    const deleteJourney = () => {
        axios.delete(`http://localhost:3000/journey/${journeyId}`)
            .then((response) => {
                console.log(response.data);
                cancelForm();
                fetchUserInfo(id);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const journeySubmit = () => {
        if(updatingJourney) {
            axios.put(`http://localhost:3000/journey/${journeyId}`, {
                user_id: id,
                name: title,
                description: description,
                locations: locations.join(','),
                activities: activities.join(','),
                start_date: startDate.replace('T', ' ').replace('Z', ''),
                end_date: endDate.replace('T', ' ').replace('Z', '')
            }).then((response) => {
                cancelForm();
                fetchUserInfo(id);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            axios.post(`http://localhost:3000/journey`, {
                user_id: id,
                name: title,
                description: description,
                locations: locations.join(','),
                activities: activities.join(','),
                start_date: startDate.replace('T', ' ').replace('Z', ''),
                end_date: endDate.replace('T', ' ').replace('Z', '')
            }).then((response) => {
                cancelForm();
                fetchUserInfo(id);
            }).catch((error) => {
                console.error(error);
            });
        }
        
    }

    return (
        <>
        {loggedIn ? (
        
            <>
            {journeyForm ? (
                <>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Stack spacing={2} alignItems="center">
                        <TextField
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={title}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            defaultValue={description}
                            fullWidth
                        />
                        <TextField
                            label="Locations (comma separated)"
                            variant="outlined"
                            value={locations.join(',')}
                            onChange={(e) => setLocations(e.target.value.split(','))}
                            defaultValue={locations.join(',')}
                            fullWidth
                        />
                        <TextField
                            label="Activities (comma separated)"
                            variant="outlined"
                            value={activities.join(',')}
                            onChange={(e) => setActivities(e.target.value.split(','))}
                            defaultValue={activities.join(',')}
                            fullWidth
                        />
                        <TextField
                            label="Start Date"
                            type="date"
                            variant="outlined"
                            value={startDate.replace(/T.*$/, "")}
                            onChange={(e) => setStartDate(e.target.value)}
                            defaultValue={startDate}
                            fullWidth
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            variant="outlined"
                            value={endDate.replace(/T.*$/, "")}
                            onChange={(e) => setEndDate(e.target.value)}
                            defaultValue={endDate}
                            fullWidth
                        />
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 4 }}>
                        <Button variant="contained" color="secondary" onClick={() => {
                            cancelForm();
                        }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => journeySubmit()}>
                            {updatingJourney ? 'Update Journey' : 'Create Journey'}
                        </Button>
                        {updatingJourney &&
                            <Button variant="contained" color="primary" onClick={() => deleteJourney()}>
                                Delete
                            </Button>
                        }
                        </Stack>
                    </Stack>
                </Container>
                </>
            ):(
                <>
                <Container maxWidth="md" sx={{ mt: 1, mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" component={Link} to="/">
                        Go Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={()=>setJourneyForm(true)}>
                        Create Journey
                    </Button>
                </Stack>
                </Container>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h6" component="h2" align="center">
                            Journeys:
                        </Typography>
                        <Grid container spacing={2}>
                            {journeys.map((journey: any) => (
                                <JourneyItem
                                    key={journey.id}
                                    title={journey.name}
                                    description={journey.description}
                                    locations={journey.locations.split(',')}
                                    activities={journey.activities.split(',')}
                                    startDate={journey.start_date}
                                    endDate={journey.end_date}
                                    onEdit={() => {
                                        setTitle(journey.name);
                                        setDescription(journey.description);
                                        setLocations(journey.locations.split(','));
                                        setActivities(journey.activities.split(','));
                                        setStartDate(journey.start_date);
                                        setEndDate(journey.end_date);
                                        setJourneyId(journey.id);
                                        setUpdatingJourney(true);
                                        setJourneyForm(true);
                                    }}
                                />
                            ))}
                        </Grid>
                    </Stack>
                </Container>
                </>)
            }
        
        </>
        ) : (
            <>
            <Typography variant="h5" component="h2" align="center">
                You are not logged in
            </Typography>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="body1" component="p" align="center">
                    Please login to view your journeys.
                </Typography>
            </Stack>
            </Container>
            </>
        )}
        </>
         
    );
}

export default Journey;