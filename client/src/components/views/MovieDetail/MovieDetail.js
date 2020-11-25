
import React, {useEffect , useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../Commons/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../Commons/GridCards'
import Favorite from './Sections/Favorite'
import {Row} from 'antd'
import Axios from 'axios'
import Comments from '../VideoDetailPage/Sections/Comment'
import LikeDislikes from '../VideoDetailPage/Sections/LikeDislikes';


function MovieDetail(props) {

    let movieId= props.match.params.movieId
    const movieVariable = {
        movieId: movieId
    }
  
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [CommentLists, setCommentLists] = useState([])
    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
        .then(response=> response.json())
        .then(response => {
            
            setMovie(response)
        })


        fetch(endpointCrew)
        .then(response=> response.json())
        .then(response => {
            setCasts(response.cast)
        })

        Axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }
    
    return (
        <div style={{ width: '100%' , margin: '0'}}>
            
        {/* Header */}
        {Movie.backdrop_path &&
        <MainImage 
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
        />
        }

        {/* Body */}
        <div style={{ width: '85%', margin: '1rem auto'}}>

            <div style={{ display:'flex', justifyContent: 'flex-end'}}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
            </div>
            {/* Movie Info */}

            <MovieInfo 
                movie={Movie}
            
            />


            <br />
            {/* Actors Grid*/}

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <button onClick={toggleActorView}>출연진</button>

            </div>
            {ActorToggle &&
            <Row gutter={[16,16]}>
                {Casts && Casts.map((cast,index) => (
                    <React.Fragment key={index}>

                    <GridCards
                        image={cast.profile_path?
                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                        CharacterName={cast.name}
                    
                    
                    />
                    </React.Fragment>
                ))}
            </Row>
            }
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} commentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

        </div>



        </div>
    )
}

export default MovieDetail
