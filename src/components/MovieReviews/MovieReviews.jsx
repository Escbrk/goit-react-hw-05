const MovieReviews = ({reviews}) => {
  return (
    <ul>
      {reviews.length > 0 ?
        reviews.map((review) => {
          return (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
              <hr />
            </li>
          );
        }) : <p>Sorry, here's no reviews yet</p>}
    </ul>
  );
};

export default MovieReviews;
