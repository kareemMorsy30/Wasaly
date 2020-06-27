const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'not available';

export default PAYMENT_SERVER_URL;