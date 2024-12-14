/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QVR7IP8rAMdMjQDcQyauExyIykPG8J3AUeG4Dh7UObM6fKx30brCQRWTukbXQxYaXz9Yv9cTgWJHxYMylJvfkrm00Tq04qmRE',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from the API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    // const session = await axios
    //   .get(`http://127.0.0.1:3000/api/bookings/checkout-session/${tourId}`)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error occurred while booking the tour:', error);
    //     if (error.response) {
    //       // Server responded with a status other than 2xx
    //       console.error('Response error:', error.response.data);
    //     } else if (error.request) {
    //       // No response from the server
    //       console.error('Request error:', error.request);
    //     } else {
    //       // Error in setting up the request
    //       console.error('General error:', error.message);
    //     }
    //   });

    console.log(session);

    //Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
    console.error(err);
  }
};
