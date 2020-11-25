import React,{useEffect, useState} from 'react'

import {Card, Avatar, Col, Typography,Row} from 'antd';
import axios from 'axios';
import moment from 'moment';

import 'moment/locale/ko'
const {Title} = Typography;
const { Meta} = Card;
function LandingPage() {
    

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])
    const renderCards = Videos.map((video,index) =>{
            var minutes = Math.floor(video.duration / 60);
            var seconds = Math.floor((video.duration - (minutes * 60)));
        return  <React.Fragment key={index}><Col lg={6} md={8} xs={24}>
        <a href={` /video/detail/${video._id}`}>
            <div style={{ position: 'relative'}}>
                
                <img style={{ width: '100%'}} src={`http://www.xn--9p4bj5egsb.site:5000/${video.thumbnail}`} alt="" />
                 <div className="duration">
                     <span>{minutes} : {seconds}</span>
                 </div>
            </div>
        </a>
        <br />
        <Meta
            avatar={
                <Avatar src={video.writer.image} />
            }
            title={video.title}
            description=""
        />
        <span>{video.writer.name}</span><br />
        <span style={{ marginLeft: '3rem'}}>조회수 {video.views}회 </span> · <span>{moment(video.createdAt).fromNow()}</span>
    </Col>
    </React.Fragment>
    })
    return (
       <div style={{ width: '85%', margin: '3rem auto'}}>
           <Title level={2} > 전체영상</Title>
           <hr />
           <Row gutter={[32, 16]}>
            {renderCards}
           

           </Row>
       </div>
    )
}

export default LandingPage
