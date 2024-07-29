import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, Event } from '../api/eventApi';
import { CircularProgress, Container, Grid, Card, CardActionArea, CardMedia, Typography, Alert, Box, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';

const baseURL = 'http://localhost:5000/';

const StyledButton = styled(IconButton)({
  position: 'fixed',
  bottom: 16,
  right: 16,
  backgroundColor: '#1976d2', 
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0', 
  },
  zIndex: 1000, 
});

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: events, error, isLoading } = useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Failed to fetch events: {error.message}</Alert>;
  }

  return (
    <Container>
  <Typography variant="h4" sx={{ mb: 5 }} gutterBottom>
    Event Gallery
      </Typography>
      <Grid container spacing={4}>
        {events?.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea
                onClick={() => navigate(`/event-details/${event._id}`)}
                sx={{
                  position: 'relative',
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${baseURL}${event.thumbnail}`}
                  alt={event.name}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    p: 1,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Typography variant="h6">{event.name}</Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <StyledButton onClick={() => navigate('/auth')}>
        <PersonIcon />
      </StyledButton>
    </Container>
  );
};

export default EventPage;
