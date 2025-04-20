import React from 'react';
import { Container, Typography, Stack, Grid, Paper, Button, TextField} from '@mui/material';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router';
import TravelItem from '../../components/TravelItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Travel = () => {

    const { loggedIn, id } = useUser();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date().toISOString().replace(/T.*$/, ""));
    const [endDate, setEndDate] = React.useState(new Date().toISOString().replace(/T.*$/, ""));
    const [postDate, setPostDate] = React.useState(new Date().toISOString().replace(/T.*$/, ""));
    const [tags, setTags] = React.useState<string[]>([]);
    const [travels, setTravels] = React.useState([]);
    const [updatingTravel, setUpdatingTravel] = React.useState(false);
    const [travelForm, setTravelForm] = React.useState(false);
    const [travelId, setTravelId] = React.useState(0);

    const [user, setUser] = useState({username: '', password: '', email: '', address: '', travels: [], journeys: []});

    const cancelForm = () => {
        setTravelForm(false);
        setUpdatingTravel(false);
        setTitle('');
        setDescription('');
        setTags([]);
        setStartDate(Date.now().toLocaleString().replace(/T.*$/, ""));
        setStartDate(new Date().toISOString().replace(/T.*$/, ""));
        setEndDate(new Date().toISOString().replace(/T.*$/, ""));
    }

    const fetchUserInfo = (id : number) => {
        axios.get(`http://localhost:3000/user/${id}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                setTravels(response.data.travels);
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

    const deleteTravel = () => {
        axios.delete(`http://localhost:3000/travel/${travelId}`)
            .then((response) => {
                console.log(response.data);
                cancelForm();
                fetchUserInfo(id);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const travelSubmit = () => {
        if(updatingTravel) {
            axios.put(`http://localhost:3000/travel/${travelId}`, {
                user_id: id,
                title: title,
                description: description,
                tags: tags.join(','),
                start_date: startDate.replace('T', ' ').replace('Z', ''),
                end_date: endDate.replace('T', ' ').replace('Z', ''),
                post_date: postDate.replace('T', ' ').replace('Z', '')
            }).then((response) => {
                cancelForm();
                fetchUserInfo(id);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            const postDate = new Date().toISOString().replace(/T.*$/, "");
            axios.post(`http://localhost:3000/travel`, {
                user_id: id,
                title: title,
                description: description,
                tags: tags.join(','),
                start_date: startDate.replace('T', ' ').replace('Z', ''),
                end_date: endDate.replace('T', ' ').replace('Z', ''),
                post_date: postDate
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
            {travelForm ? (
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
                        <TextField
                            label="Tags (comma separated)"
                            type="text"
                            variant="outlined"
                            value={tags.join(',')}
                            onChange={(e) => setTags(e.target.value.split(','))}
                            defaultValue={tags.join(',')}
                            fullWidth
                        />
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 4 }}>
                        <Button variant="contained" color="secondary" onClick={() => {
                            cancelForm();
                        }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => travelSubmit()}>
                            {updatingTravel ? 'Update Travel Log' : 'Create Travel Log'}
                        </Button>
                        {updatingTravel &&
                            <Button variant="contained" color="primary" onClick={() => deleteTravel()}>
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
                    <Button variant="contained" color="primary" onClick={()=>setTravelForm(true)}>
                        Create Travel Log
                    </Button>
                </Stack>
                </Container>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h6" component="h2" align="center">
                            Travel Logs:
                        </Typography>
                        <Grid container spacing={2}>
                            {travels.map((travel: any) => (
                                <TravelItem
                                    key={travel.id}
                                    title={travel.title}
                                    description={travel.description}
                                    startDate={travel.start_date}
                                    endDate={travel.end_date}
                                    postDate={travel.post_date}
                                    tags={travel.tags.split(',')}
                                    onEdit={() => {
                                        setTitle(travel.title);
                                        setDescription(travel.description);
                                        setStartDate(travel.start_date);
                                        setEndDate(travel.end_date);
                                        setPostDate(travel.post_date);
                                        setTags(travel.tags.split(','));
                                        setTravelId(travel.id);
                                        setUpdatingTravel(true);
                                        setTravelForm(true);
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
                    Please login to view your travels.
                </Typography>
            </Stack>
            </Container>
            </>
        )}
        </>
         
    );
}

export default Travel;