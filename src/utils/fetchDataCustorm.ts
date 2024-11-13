import Cookies from 'js-cookie';
import axios from 'axios';

export const fetchDataCustorm = async (endpoint: string) => {
    try {
        const token: string = Cookies.get('accessToken') || '';
        const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const url = `${baseUrl}${endpoint}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.data.data) {
            return response.data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra');
        throw error;
    }
};
