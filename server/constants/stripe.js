const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = "sk_test_51GyFlZASd8wCD66zQnZ6lVzneK62YhprG2iBtZdVmN4lknDDp5idlD5BA0vW0SCHtULgyabjPghW4lLlLpyFhQGp00yQmrYy3G"

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;