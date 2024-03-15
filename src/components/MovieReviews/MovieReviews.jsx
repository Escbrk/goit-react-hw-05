const MovieReviews = ({reviews}) => {
  return (
    <ul>
      {reviews &&
        reviews.map((review) => {
          return (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
              <hr />
            </li>
          );
        })}
    </ul>
  );
};

export default MovieReviews;
