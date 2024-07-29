import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Typography, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { addEvent } from '../../api/eventApi';

interface AddPopupProps {
  open: boolean;
  onClose: () => void;
  onItemAdded: (data: any) => void;
}

const AddPopup: React.FC<AddPopupProps> = ({ open, onClose, onItemAdded }) => {
  const { control, handleSubmit, reset } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const onSubmit = async (data: any) => {
    setErrors([]);

    const requiredFields = ['name', 'location', 'startDate', 'endDate'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      setErrors(prevErrors => [...prevErrors, `Missing required fields: ${missingFields.join(', ')}`]);
      return;
    }

    if (!file) {
      setErrors(prevErrors => [...prevErrors, 'No file selected']);
      return;
    }

    try {
      data.startDate = data.startDate.split('T')[0];
      data.endDate = data.endDate.split('T')[0];
      
      const newEvent = await addEvent(data, file);
      reset();
      setFile(null);
      onItemAdded(newEvent);
      onClose();
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error creating event: ' + (error as Error).message]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Event</DialogTitle>
      <DialogContent sx={{ mb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {errors.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {errors.map((error, index) => (
                <Typography key={index} color="error">
                  {error}
                </Typography>
              ))}
            </Box>
          )}
          <Grid sx={{ mt: 0 }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField label="Event Name" fullWidth {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField label="Location" fullWidth {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField type="date" label="Start Date" fullWidth InputLabelProps={{ shrink: true }} {...field} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="endDate"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField type="date" label="End Date" fullWidth InputLabelProps={{ shrink: true }} {...field} />}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: hover ? 'primary.main' : 'grey.500',
                  borderRadius: 2,
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s',
                  position: 'relative',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onDragEnter={() => setHover(true)}
                onDragLeave={() => setHover(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  setFile(droppedFile);
                  setHover(false);
                }}
                onClick={() => document.getElementById('file-upload')?.click()} // Trigger file input click on box click
              >
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: hover ? 'primary.main' : 'text.secondary',
                    transition: 'color 0.3s',
                  }}
                >
                  {file ? `File Selected: ${file.name}` : 'Drag & Drop or Click to Upload File'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Create Event</Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPopup;
