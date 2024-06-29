import api from '@/api/api';

export const fetchUser = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.name;
  } catch (error) {
    console.error('Error fetching user:', error);
    return 'Unknown User';
  }
};
