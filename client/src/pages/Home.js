import React, { useContext } from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../helpers/AuthContext';
import { Image } from "cloudinary-react"


function Home() {


  const [listOfPosts, setListOfPosts] = useState([]);
  const [ratedPosts, setRatedPosts] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // have to be logged in to access home page, change later
    if (!localStorage.getItem("accessToken")) { 
      navigate("/login")
    } else {
      axios.get("http://localhost:3001/posts",
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      ).then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setRatedPosts(
          response.data.ratedPosts.map((rate) => {
            return rate.PostId;
          }));
      });
      axios.get('http://localhost:3001/genres').then((response) => {
        setGenres(response.data.genres);
      });
    }
  }, []);

  const getGenreName = (genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.genre : '';
  };

  const rateaPost = (postId) => {
    axios.post("http://localhost:3001/rating",
      { PostId: postId },
      { headers: { accessToken: localStorage.getItem("accessToken") } }

    ).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.ratted) {
            return { ...post, Ratings: [...post.Ratings, 0] }
          } else {
            const ratings = post.Ratings;
            ratings.pop();
            return { ...post, Ratings: ratings }
          }
        } else {
          return post;
        }

      }));
      if (ratedPosts.includes(postId)) {
        setRatedPosts(ratedPosts.filter((id) => {
          return id != postId;
        }))
      } else {
        setRatedPosts([...ratedPosts, postId])
      }

    });

  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const [sortOption, setSortOption] = useState('newest');

  const handleSearch = () => {
    let filteredPosts = listOfPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const genreMatch = selectedGenre ? post.GenreId === Number(selectedGenre) : true;
      return titleMatch && genreMatch;
    });

    if (sortOption === 'newest') {
      filteredPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sortOption === 'oldest') {
      filteredPosts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else if (sortOption === 'most_ratings') {
      filteredPosts.sort((a, b) => b.Ratings.length - a.Ratings.length);
    }

    return filteredPosts;
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div class="p-3 mb-2">
      <div>
        <form class="container mt-4 d-flex">
          <input
            className="form-control me-sm-2"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select class="" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.genre}
              </option>
            ))}
          </select>

          <select class="nav-item dropdown" value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most_ratings">Most Ratings</option>
          </select>
        </form>



 
        {handleSearch().map((value, key) => (

          <div key={key} className="container text-dark mt-4 w-50 p-2" style={{ width: "80%" }}>
            <div className="card mb-3 w-md-50 p-2 mx-auto">
              <h3 className="card-header" onClick={() => navigate(`/post/${value.id}`)}>{value.title}</h3>
              <div className="card-body">
                <h5 className="card-title">{value.author}</h5>
                <h6 className="card-subtitle text-muted">{getGenreName(value.GenreId)}</h6>
              </div>

              <div className="border-top border-dark d-flex">
                <div className="col-md-6 d-flex justify-content-center p-2">
                  <Image cloudName="dezmxsi6t" className="w-100" publicId={value.postphoto} />
                </div>
                <div className="col-md-6 p-4 d-flex align-items-center">
                  <div className="card-text ">
                    <h6 className="card-subtitle">Preview:<br /></h6>
                    {value.description}
                  </div>
                  {/* <div>
                    <h6 className="card-subtitle">Preview:<br /></h6>
                    {value.postText}
                  </div> */}
                </div>
              </div>

              <div className="card-footer text-muted d-flex">
                <div className="d-inline">
                  <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
                </div>
                <div className="d-inline ml-auto">
                  <div>
                    {ratedPosts.includes(value.id) ? (
                      <FavoriteIcon onClick={() => rateaPost(value.id)} />
                    ) : (
                      <FavoriteBorderIcon onClick={() => rateaPost(value.id)} />
                    )}
                    <label>{value.Ratings.length}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;