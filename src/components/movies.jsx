import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import { get, mapKeys } from "lodash";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "./common/input";

class Movies extends React.Component {
  state = {
    movies: [],
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    genres: [],
    genreCount: 3,
    currentGenre: null,
    allGenre: true,
    search: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleSearchChange = (e) => {
    this.setState({
      search: e.currentTarget.value,
      currentGenre: null,
      currentPage: 1,
    });
  };
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This move has already been edited");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1, search: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      currentGenre,
      search,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (search)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(search.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === currentGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            currentGenre={this.state.currentGenre}
            allGenre={this.allGenre}
          />
        </div>

        <div className="col">
          {this.props.user && (
            <Link to="/movies/new">
              <button className="btn btn-primary" style={{ marginBottom: 20 }}>
                New Movie
              </button>
            </Link>
          )}
          <p className="mt-2">Showing {totalCount} movies in the database</p>

          <input
            placeholder="Search..."
            className="form-control"
            onChange={(e) => this.handleSearchChange(e)}
            value={this.state.search}
          />

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
