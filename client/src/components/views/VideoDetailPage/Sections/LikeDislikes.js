import React , {useEffect,useState} from 'react'
import { Tooltip} from 'antd'
import Axios from 'axios'
import { Icon } from '@ant-design/compatible';



function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable = { }
    if(props.video){
        variable = { videoId:props.videoId , userId:props.userId }
    }else{
        variable = { commentId:props.commentId , userId:props.userId }
    }
    useEffect(() => {
        
        Axios.post('/api/like/getLikes',variable)
        .then(response => {
            if(response.data.success){
                // 얼마나 많은 좋아요를 받았는지 
                setLikes(response.data.likes.length)
                // 내가 이미 그 좋아요를 눌렀는지
                response.data.likes.map(like=> {
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert('like and unlike info fail')
            }
        })
        Axios.post('/api/like/getDisLikes',variable)
        .then(response => {
            if(response.data.success){
                // 얼마나 많은 싫어요를 받았는지 
                setDislikes(response.data.dislikes.length)
                // 내가 이미 그 싫어요를 눌렀는지
                response.data.dislikes.map(dislike=> {
                    if(dislike.userId === props.userId){
                        setDisLikeAction('disliked')
                    }
                })
            }else{
                alert('like and unlike info fail')
            }
        })
    }, [])

        const onLike = ( ) => {

            if(LikeAction === null){
                Axios.post('/api/like/upLike',variable)
                .then(response => {
                    if(response.data.success){
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if(DisLikeAction !== null){
                            setDisLikeAction(null)
                            setDislikes(Dislikes -1)
                        }

                    }else{
                        alert('DONT LIKE')
                    }
                })
            }else{
                Axios.post('/api/like/unLike',variable)
                .then(response => {
                    if(response.data.success){
                        setLikes(Likes -1)
                        setLikeAction(null)

                    }else{
                        alert('DONT UNLIKE')
                    }
                }) 
            }
        }
        const onDislike = () => {
            if(DisLikeAction !== null) {
                Axios.post('/api/like/unDisLike',variable)
                .then(response => {
                    if(response.data.success){
                        
                        setDislikes(Dislikes -1)
                        setDisLikeAction(null)
                    }else{
                        alert('dislike을 지우지 못함.')
                    }
                })
            }
            else{
                Axios.post('/api/like/upDisLike',variable)
                .then(response => {
                    if(response.data.success){
                    
                       setDislikes(Dislikes +1)
                       setDisLikeAction('disliked')

                       if(LikeAction !==null){
                           setLikeAction(null)
                           setLikes(Likes-1)
                           
                       }
                    }else{
                        alert('dislike을 지우지 못함.')
                    }
                })
            }
        }
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction ==='liked'? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }} > {Likes}</span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction ==='disliked'? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }} > {Dislikes}</span>
            </span>&nbsp;&nbsp;
           
        </div>
    )
}

export default LikeDislikes
