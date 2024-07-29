import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Typography, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { editEvent } from '../../api/eventApi'; 

interface EditPopupProps {
  open: boolean;
  onClose: () => void;
  event_id: string | null; 
  onItemUpdated: (data: any) => void;
}

interface FormData {
  name?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}

const EditPopup: React.FC<EditPopupProps> = ({ open, onClose, event_id, onItemUpdated }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [file, setFile] = useState<File | null>(null);
  const [hover, setHover] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!event_id) {
        alert('Event ID is missing');
        return;
      }
      
      if (data.startDate) {
        data.startDate = data.startDate.split('T')[0];
      }
      if (data.endDate) {
        data.endDate = data.endDate.split('T')[0];
      }

      const updatedEvent = await editEvent(event_id, data, file ?? undefined);
      
      reset();
      setFile(null);
      onItemUpdated(updatedEvent);
      onClose();
    } catch (error) {
      alert('Error updating event: ' + (error as Error).message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent sx={{ mb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Grid container spacing={2}>
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
              <Button type="submit" variant="contained" fullWidth>Update Event</Button>
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

export default EditPopup;
