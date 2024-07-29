// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { fetchEvents, Event } from '../api/eventApi';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, IconButton, CircularProgress, Alert, Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { verifyToken } from '../api/authApi';
import AddIcon from '@mui/icons-material/Add';
import DeletePopup from '../components/Admin/DeletePopup';
import AddPopup from '../components/Admin/AddPopup';
import EditPopup from '../components/Admin/EditPopup';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState<boolean>(false); // Add state for EditPopup

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [user_id, setUser_id] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('jwtToken');
      if (token) {
        try {
          const response = await verifyToken(token);
          if (response.valid === true) {
            const decodedToken: any = jwtDecode(token);
            setUser_id(decodedToken.id);  
          } else {
            Cookies.remove('jwtToken');
            navigate('/auth');
          }
        } catch (error) {
          console.error('Token verification failed', error);
        }
      } else {
        navigate('/auth');
      }
    };
  
    checkToken();
  }, [navigate]);

  const { data: events, error, isLoading } = useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const handleDelete = (event_id: string) => {
    setEventToDelete(event_id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleConfirmDelete = (user_id: string, password: string, event_id: string) => {
    console.log('Password:', password);
    console.log('user id:', user_id);
    console.log('event id:', event_id);  
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleOpenEditPopup = (event: Event) => {
    setSelectedEvent(event);
    setEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedEvent(null);
  };

  const handleItemAdded = (data: any) => {
    alert("Event created!")
    window.location.reload();
  };

  const handleItemUpdated = (data: any) => {
    setEditPopupOpen(false);
    alert("Event updated!")
    window.location.reload();
  };

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    window.location.reload();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Failed to fetch events: {error.message}</Alert>;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ display: 'inline-block', marginRight: 2 }}>
        Events List
      </Typography>

      <Box sx={{ display: 'inline-block' }}>
        <IconButton 
          color="primary" 
          onClick={() => handleOpenAddPopup()} 
          sx={{ 
            backgroundColor: 'primary.main', 
            color: 'white', 
            width: 30, 
            height: 30, 
            '&:hover': {
              backgroundColor: 'lightblue', 
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(event.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditPopup(event)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => handleDelete(event._id)}
                    color="secondary"
                    data-event-id={event._id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeletePopup
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={(user_id, password) => handleConfirmDelete(user_id, password, eventToDelete!)}
        user_id={user_id!}
        event_id={eventToDelete!}
      />

      <AddPopup
        open={isAddPopupOpen}
        onClose={handleCloseAddPopup}
        onItemAdded={handleItemAdded}
      />

      <EditPopup
        open={editPopupOpen}
        onClose={handleCloseEditPopup}
        event_id={selectedEvent?._id || null}
        onItemUpdated={handleItemUpdated}
      />
    </Container>
  );
};

export default AdminDashboard;
