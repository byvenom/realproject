import React,{useState,useEffect} from 'react'
import {Card, Avatar, Col, Typography,Row} from 'antd';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import {useSelector} from 'react-redux';
const {Title} = Typography;
const { Meta} = Card;
function ChartPage() {
    const user = useSelector(state => state.user);
    const [Charts, setCharts] = useState([]) 
    useEffect(() => {
    
    const variables = {writer:localStorage.getItem('userId')}
       axios.post('/api/chart/getMyCharts',variables)
       .then(response => {
           setCharts(response.data.charts);
          
       })
    }, [])
    const renderCards = Charts.map((chart,index) =>{
        
      
    return  <React.Fragment key={index}><Col lg={6} md={8} xs={24}>
    <a href={` /chart/detail/${chart._id}`}>
        <div style={{ position: 'relative'}}>
            <Line
            options={{
                legend: {
                  display: false,
                  position: "right"
                },
                scales: {
                    xAxes: [{
                      display: false
                    }],
                    yAxes: [{
                      display: false
                    }],
                  }
              }}
              data={{
                labels: chart.data.map(item =>item.name),
                datasets: [
                  {
                    labels: chart.data.map(item =>item.name),
                    data:  chart.data.map(item =>item.value),
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    backgroundColor: 
                      "rgba(238, 102, 121, 1)",
                    fill: true
                  }
                ]
              }}
              height={120}
            
            />
           
        </div>
    </a>
    <br />
    <Meta
        avatar={
            <Avatar src={chart.writer.image} />
        }
        title={chart.title}
        description=""
    />
    <span>{chart.writer.name}</span><br />
</Col>
</React.Fragment>
})

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
           <Title level={2} > 내 차트</Title>
           <hr />
           <Row gutter={[32, 16]}>
            {renderCards}
           

           </Row>
       </div>
    )
}

export default ChartPage
