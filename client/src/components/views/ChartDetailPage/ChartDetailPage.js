import React, { useState,useEffect } from 'react'
import Axios from 'axios'
import { Typography, Button, Form, message, Input , Popconfirm} from 'antd'

import {Line} from 'react-chartjs-2';

const { Title } = Typography;
function ChartDetailPage(props) {
    const chartId = props.match.params.chartId;
    const variable = { chartId:chartId}
    const [ChartTitle, setChartTitle] = useState("");
   
    const [DataName, setDataName] = useState([]);
    const [Data, setData] = useState([]);
    const [names, setNames] = useState([]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(0);
    
    
      const onChange = e => setInputText(e.target.value);
      const onClick = () => {
        const chk=inputText.split("/")
        if(inputText === null || inputText.match("/")===false ||isNaN(chk[1])!==false){
            return alert('값을 확인해주세요')
        }
        const nextNames = names.concat({
          id: nextId,
          name: chk[0],
          value: chk[1],
        });
        setNextId(nextId + 1);
        setNames(nextNames);
        setInputText('');
        
      };
    
      const nameList = names.map(name => (
        <Input style={{width:"150px"}} key={name.id} value={name.name+"/"+name.value} onDoubleClick={() => onRemove(name.id)}/>
        ));
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
      };
    const onKeypresshandler = e => {
        if(e.key==="Enter"){
            onClick();
        }
    }
    useEffect(() => {
        Axios.post('/api/chart/getChartDetail',variable)
        .then(response=> {
            if(response && response.data){ 
                const data=response.data.chartDetail.data;
                setChartTitle(data.title)
                setDataName(data.map(item => item.name))
                setData(data.map(item=> item.value))
                setNextId(data.length)
            }
            else {
                alert('차트 정보 가져오기 실패')
            }
        })
    }, [])

    const expData = {
        labels: DataName,
                datasets: [
                  {
                    labels: DataName,
                    data: Data,
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    backgroundColor: 
                      "rgba(238, 102, 121, 1)",
                    fill: false,
                    
                  }
                ]
    }
    const removeChart = () => {
        Axios.post('/api/chart/deleteChart',variable)
        .then(response => {
            if(response.data.success){
                message.success('차트 삭제 성공')
                setTimeout(() => {
                    props.history.push('/chart')
                }, 3000);
            }else {
                alert('차트 삭제 실패')
            }
        })
    }
    const renderCards = 
        
      
        
        
            <div style={{ position: 'relative'}}>
                <Line
                options={{
                    legend: {
                      display: false,
                      position: "right"
                    }
                    
                  }}
                  data={expData}
                  height={100}
                
                />
               
            </div>
            const onSubmit = (e) =>{
                e.preventDefault();
               if(names.length===0){
                   return alert('데이터가 비어있습니다.')
               }
                const variables = {
                    chartId:chartId,
                    data: names
                }
                Axios.post('/api/chart/updateChart',variables)
                .then(response => {
                    if(response.data.success){
                        message.success('데이터 추가 성공')
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }else{
                        alert('데이터 추가 실패')
                    }
                })
        
            }     
    
    return (
       
        <div>
        <div style={{ textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>{ChartTitle}</Title>
        </div>
        <div align="right">
        <Popconfirm title="정말로 삭제 하시겠습니까?" okText="Yes" cancelText="No" onConfirm={removeChart}><Button type="danger" >삭제하기</Button> </Popconfirm>
        </div>

    
      
        {renderCards}
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{ textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>데이터 추가</Title>
        </div> 
            <Form onSubmit={onSubmit}>
        <br />
        <br />
        <label>데이터명/데이터값</label>  <br /> <b style={{color:'red'}}>데이터명/데이터값 형식으로 입력해주세요 데이터값은 숫자만 입력가능합니다 ex. 11월25일/180 
        </b>
        <Input style={{width:"150px"}} value={inputText} onChange={onChange} onKeyPress={onKeypresshandler}/>
        &nbsp;<Button onClick={onClick}>추가</Button>
        <div>{nameList}</div>
        { names.length!==0 &&
            <b style={{color:'red'}}>더블 클릭 하여 데이터 제거</b>}
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
            추가하기
        </Button>
            </Form>
        
        
    </div>
        </div>
    )
}

export default ChartDetailPage
