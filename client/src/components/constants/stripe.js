
const pk_test_MY_PUBLISHABLE_KEY = "pk_test_51GyFlZASd8wCD66zqqvpDkWwzbIpzeuyLZR5dF7yRhxuoPRGzYFGlf0S92QYuQG0vQXCn5nZozklF28BX8JdvGXR00DXTCsaEN";
const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'development'
  ? 'pk_test_MY_PUBLISHABLE_KEY'
  : 'not available';

export default STRIPE_PUBLISHABLE;