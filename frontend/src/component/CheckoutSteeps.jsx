
function CheckoutSteeps(props) {
  return (
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32 justify-between">
      <p className={`${props.step1} ? 'active' : '' font-semibold text-gray-900`}>Sign-In</p>
      <p className={`${props.step2} ? 'active' : '' font-semibold text-gray-900`}>Shipping</p>
      <p className={`${props.step3} ? 'active' : '' font-semibold text-gray-900`}>Payment</p>
      <p className={`${props.step4} ? 'active' : '' font-semibold text-gray-900`}>Place Order</p>
    </div>
  );
}

export default CheckoutSteeps;