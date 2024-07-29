import Cookies from 'js-cookie';

export interface Event {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  thumbnail: string;
}

const BASE_URL = "http://localhost:5000";

const getToken = (): string | undefined => {
  return Cookies.get('jwtToken');
};

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${BASE_URL}/api/events`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const response = await fetch(`${BASE_URL}/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteEventById = async (id: string): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/api/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
};

export const uploadThumbnail = async (file: File): Promise<string> => {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json();
  return result.filePath;
};

export const addEvent = async (event: Partial<Event>, file: File): Promise<Event> => {
  const token = getToken();
  const thumbnail = await uploadThumbnail(file);
  const formData = {
    name: event.name || '',
    location: event.location || '',
    startDate: event.startDate || '',
    endDate: event.endDate || '',
    thumbnail: thumbnail
  };

  const response = await fetch(`${BASE_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const editEvent = async (eventId: string, data: any, file?: File): Promise<Event> => {
  const token = getToken();
  let thumbnail;
  if (file) {
    thumbnail = await uploadThumbnail(file);
  }
  const formData = {
    name: data.name || '',
    location: data.location || '',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    thumbnail: thumbnail || ''
  };

  const response = await fetch(`${BASE_URL}/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};