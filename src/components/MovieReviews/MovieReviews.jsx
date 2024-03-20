import { lazy, useEffect, useState } from "react";
import { getReviewsById } from "../../../movie-api";
import { useParams } from "react-router-dom";
const Error = lazy(() => import("../../components/Error/Error"));
const Loader = lazy(() => import("../../components/Loader/Loader"));

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async (id) => {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await getReviewsById(id);
        setReviews(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews(movieId);
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error />}
      <br />
      <ul>
        {!isLoading &&
          reviews &&
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
    </>
  );
};

export default MovieReviews;
