import Axios from 'axios'

import React,{useEffect,useState} from 'react'


function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.original_title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime : movieRunTime
    }
    useEffect(() => {
        
        
        Axios.post('/api/favorite/favoriteNumber',variables)
        .then(response => {
            if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
            }else{
                alert('Favorite 수를 불러오는데 실패 하였습니다')
            }
        })

        Axios.post('/api/favorite/favorited',variables)
        .then(response => {
           if(response.data.success){
                setFavorited(response.data.favorited)
           }else{
               alert('정보를 가져오는데 실패 하였습니다.')
           }
        })


    }, [])

    const FavoriteClick = () => {
        
        if(Favorited){
            Axios.post('/api/favorite/removefavorite',variables)
            .then(response => {
           if(response.data.success){
                setFavoriteNumber(FavoriteNumber-1)
                setFavorited(!Favorited)
           }else{
               alert('favorite cancel fail')
           }
        })
        }
        else{
            Axios.post('/api/favorite/addfavorite',variables)
            .then(response => {
           if(response.data.success){
                setFavoriteNumber(FavoriteNumber+1)
                setFavorited(!Favorited)
           }else{
               alert('favorite add fail')
           }
        })
        }
    }
    return (
        
        <div>
            <button onClick={FavoriteClick}>{Favorited?"제거" : "담기"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
