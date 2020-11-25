import Axios from 'axios'
import React ,{useEffect,useState} from 'react'
import {Popover} from 'antd'
import './favorite.css'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {
    const [Favorites, setFavorites] = useState([])
    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie',{userFrom: localStorage.getItem('userId') })
        .then(response => {
            if(response.data.success){
              
                setFavorites(response.data.favorites)
            }else{
                alert('영화 정보를 가져오는데 실패하였습니다.')
            }
        })
    }
    const removeFavorite = (movieId,userFrom) =>{
        const variables = {
            movieId,
            userFrom
        }
        Axios.post('/api/favorite/removefavorite',variables)
        .then(response=> {
            if(response.data.success){
                fetchFavoredMovie()
            }else{
                alert('삭제에 실패하였습니다.')
            }
        })
    }

    const renderCards = Favorites.map((favorite, index)=> {

        const content = (
            <div>
                {favorite.moviePost ? 
                
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt=""/> : "no image"
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
            <td><a href={`/movie/detail/${favorite.movieId}`}>{favorite.movieTitle}</a></td>
            </Popover>
            <td>{favorite.movieRunTime} 분</td>
            <td><button onClick={() => removeFavorite(favorite.movieId, favorite.userFrom)}>삭제</button></td>
        </tr>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>담긴 영화</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>영화 제목</th>
                        <th>상영 시간</th>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {Favorites&&
                    renderCards}
                </tbody>
            </table>

        </div>
    )
}

export default FavoritePage
