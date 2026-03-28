import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const fetchWatches = async (category = '') => {
    try {
        const params = category && category !== 'all' ? { category } : {};
        const response = await axios.get(`${API_URL}/watches`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching watches:', error);
        throw error;
    }
};

export const createWatch = async (watchData) => {
    try {
        const response = await axios.post(`${API_URL}/watches`, watchData);
        return response.data;
    } catch (error) {
        console.error('Error creating watch:', error);
        throw error;
    }
};

export const updateWatch = async (id, watchData) => {
    try {
        const response = await axios.put(`${API_URL}/watches/${id}`, watchData);
        return response.data;
    } catch (error) {
        console.error('Error updating watch:', error);
        throw error;
    }
};

export const deleteWatch = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/watches/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting watch:', error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchEnquiries = async () => {
    try {
        const response = await axios.get(`${API_URL}/enquiries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        throw error;
    }
};

export const updateEnquiry = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/enquiries/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating enquiry:', error);
        throw error;
    }
};

export const deleteEnquiry = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/enquiries/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        throw error;
    }
};

export const fetchStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

export const checkIsAdmin = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/check-admin`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error checking admin:', error);
        throw error;
    }
};
