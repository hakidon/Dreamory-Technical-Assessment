import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEventById, Event } from '../api/eventApi';
import { CircularProgress, Container, Card, CardMedia, CardContent, Typography, Alert, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

const baseURL = 'http://localhost:5000/'; 

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 

  const { data: event, error, isLoading } = useQuery<Event, Error>({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id as string)
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Failed to fetch event: {error.message}</Alert>;
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Card sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={`${baseURL}${event?.thumbnail}`} 
          alt={event?.name}
        />
        <CardContent sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" gutterBottom>
              {event?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(event?.startDate)} - {formatDate(event?.endDate)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Location: {event?.location}
            </Typography>
          </Box>
          <Box sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <IconButton
              color="primary"
              onClick={() => navigate(-1)}
              sx={{
                mr: 1,
                borderRadius: '50%', 
                width: 60,
                height: 60, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#aacef7", 
                boxShadow: 1 
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetailsPage;
