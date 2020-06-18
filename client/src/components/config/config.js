
export const authHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};