import React,{ useEffect , useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

import "./vd.css";




function VideoDetailPage(props) {
    const videoId = props.match.params.videoId;
   
    const variable = { videoId:videoId }
   
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    const [Hits, setHits] = useState(0)
    useEffect(() => {
        Axios.post('/api/video/hit',variable)
        .then(response => {
            if(response.data.success){
                setHits(response.data.hits)
            }else{
                alert('조회수 를 올리지 못하였습니다.')
            }
        })
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if(response.data.success){
                setVideoDetail(response.data.videoDetail)
            }else{
                alert('비디오 정보를 가져오길 실패했습니다.')
            }

        })

        Axios.post('/api/comment/getComments',variable)
        .then(response => {
            if(response.data.success){
                setComments(response.data.comments)
            }else{
                alert('댓글 정보를 가져오길 실패했습니다.')
            }
        })
    }, [])
    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }
    if(VideoDetail.writer){

        const subscribeButton = VideoDetail.writer._id !==localStorage.getItem('userId') &&<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%' , padding:'3rem 4rem'}}>
                        <video className="video" style={{width: '100%' , height:'730px' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls autoPlay="autoplay"/>
                        <p style={{fontSize:'28px',color:'000000A6', paddingTop:'1rem'}}>{VideoDetail.title}</p>
                        <List.Item
                            actions={[ <LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId}/>, subscribeButton ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                                />
                            
                        </List.Item>
                        <List.Item>
                        <div style={{ paddingLeft:'76rem'}}>
                        <List.Item.Meta
                                title={"조회수 "+Hits+"회"}
                                
                            />
                        </div>
                        </List.Item>
                        
                        {/* Comments */}
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
    
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
                
            </Row>
        )
    }
    else{
        return (
            <div>.... loading</div>
        )
    }
   
}

export default VideoDetailPage
