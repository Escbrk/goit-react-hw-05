const MovieCredits = ({ credits }) => {
  return (
    <ul>
      {credits &&
        credits.map(({id, profile_path, name, character}) => {
          return (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt=""
              />
              <h3>{name}</h3>
              <p>{character}</p>
              <hr />
            </li>
          );
        })}
    </ul>
  );
};

export default MovieCredits;
