import { React } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KMeolJ6F2vX2Pzlv0YFxpxbmhPgWE2g9KSOWwcntQX70yzmxd4LaaHa1rXUwcL4RJVaVWNyo2seNFOt2n4r8fK800gV3hgDAC';;
  const onToken = token => {
    console.log(token);
    alert('Payment Succesful')
  };
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='http://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;
