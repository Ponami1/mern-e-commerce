
function Rating({rating,numReviews }) {
  return (
    <div>
      <span>
        <p className={
          rating >= 1 ?
            ' bg-slate-600' :
            rating >= 0.5
              ? 'bg-black'
              : 'bg-slate-900'}
        ></p>
      </span>

      <span>
        <p className={
          rating >= 2 ?
            ' bg-yellow-600' :
            rating >= 1.5
              ? 'bg-black'
              : 'bg-yellow-900'}
        ></p>
      </span>

      <span>
        <p className={
          rating >= 3 ?
            ' bg-red-600' :
            rating >= 2.5
              ? 'bg-black'
              : 'bg-red-900'}
        ></p>
      </span>

      <span>
        <p className={
          rating >= 4 ?
            ' bg-green-600' :
            rating >= 3.5
              ? 'bg-black'
              : 'bg-green-900'}
        ></p>
      </span>
      <span>
        <p className={
          rating >= 5 ?
            ' bg-blue-600' :
            rating >= 4.5
              ? 'bg-black'
              : 'bg-blue-900'}
        ></p>
      </span>
      <span className=" text-2xl text-yellow-300 font-medium">{ numReviews} reviews</span>
    </div>
  );
}

export default Rating;