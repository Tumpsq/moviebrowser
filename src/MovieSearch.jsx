import React, { useState } from "react";

const MovieSearch = () => {
  const [searchFor, setSearchFor] = useState("");

  return (
    <form
      id="SearchFor"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <input
        type="text"
        value={searchFor}
        onChange={event => setSearchFor(event.target.value)}
      />
      <input type="button" value="SEARCH" />
    </form>
  );
};

export default MovieSearch;
