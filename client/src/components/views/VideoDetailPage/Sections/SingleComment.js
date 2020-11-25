import React, { useState } from 'react'
import { Comment, Avatar} from 'antd'
import { useSelector} from 'react-redux'
import LikeDislikes from './LikeDislikes'
import Axios from 'axios';


function SingleComment(props) {
    const user = useSelector(state =>state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onclickReplyOpen = ()=>{
        setOpenReply(!OpenReply)
    }
    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onclickReplyOpen} key="comment-basic-reply-to"> 답글</span>
    ]
    const onHandleChange = (event) =>{
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        const variables = {
            content: CommentValue,
            writer: user.userData._id, //리덕스에서 정보 가져오기.
            postId: props.postId,
            responseTo: props.comment._id
        }
        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                
                props.refreshFunction(response.data.result)
                setCommentValue("")
                setOpenReply(false)
            }else {
                alert('comment not save')
            }
        })
    }
    return (
       
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer? props.comment.writer.name:""}
                avatar={<Avatar src={props.comment.writer?props.comment.writer.image:""} alt="" />}
                content={ <p> {props.comment.content}</p>}
            />
            {OpenReply &&
            <form style={{ display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%' , borderRadius:'5px' , resize:'none'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder=" 답글을 작성해 주세요."

                
                />
                <br /><br />
                <button style={{ width:'20%' ,height:'52px'} } onClick={onSubmit}>작성</button>

            </form>
            }
        </div>
    )
}

export default SingleComment
