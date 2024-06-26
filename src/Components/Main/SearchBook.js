import axios from 'axios';
import { BASE_URL, MAX_RESULTS, apiKey } from '../../Constants/Api';

export const searchBook = async (search, category, sortBy, startIndex, reset) => {
    let apiUrl = `${BASE_URL}?q=${search}`;

    if (category !== 'all') {
        apiUrl += `+subject:${category}`;
    }

    apiUrl += `&key=${apiKey}&maxResults=${MAX_RESULTS}&startIndex=${reset ? 0 : startIndex}&orderBy=${sortBy}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching book data:', error);
        throw error;
    }
};
