import React, { useContext } from 'react'
import axios from "axios";
import { useEffect, useState  } from "react";
import { useNavigate , Link} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../helpers/AuthContext';


function Home() {


  const [listOfPosts, setListOfPosts] = useState([]);
  const [ratedPosts, setRatedPosts] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

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
      })
    }
  }, []);



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

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className='post' >
            <div className='title'>{value.title}</div>
            <div className='body' onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
            <div className='footer'>
              <div className='username'>
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="buttons">
                {/* favorite button */}
                <div >
                  {ratedPosts.includes(value.id) ? <FavoriteIcon onClick={() => rateaPost(value.id)}
                  /> : <FavoriteBorderIcon onClick={() => rateaPost(value.id)} />}


                  <label>{value.Ratings.length}</label>
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  )
}

export default Home