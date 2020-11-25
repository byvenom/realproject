import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd'
import Axios from 'axios';
import {useSelector} from 'react-redux';
const {TextArea} = Input;
const { Title} = Typography;

function UploadChartPage(props) {
    const user = useSelector(state => state.user);
    const [ChartTitle, setChartTitle] = useState("")
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
    const onTitleChange = (e) => {
        setChartTitle(e.currentTarget.value)
    }
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
      };
    const onKeypresshandler = e => {
        if(e.key==="Enter"){
            onClick();
        }
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(!ChartTitle || names.length===0){
            return alert('값이 비어있습니다')
        }
        const variables = {
            writer: user.userData._id,
            title: ChartTitle,
            data: names
           


        }
        Axios.post('/api/chart/uploadChart',variables)
        .then(response => {
            if(response.data.success){
                message.success('성공적으로 업로드를 했습니다.')
                setTimeout(() => {
                    props.history.push('/chart')
                }, 3000);
            }else{
                alert('비디오 업로드에 실패 하였습니다.')
            }
        })

    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>차트 업로드</Title>
            </div> 
                <Form onSubmit={onSubmit}>

            <label>제목</label>
            <Input
                onChange={onTitleChange}
                value={ChartTitle}
            />
            <br />
            <br />
            <label>데이터명/데이터값</label>  <br /> <b style={{color:'red'}}>데이터명/데이터값 형식으로 입력해주세요 데이터값은 숫자만 입력가능합니다 ex. 11월25일/180 </b>
            <Input style={{width:"150px"}} value={inputText} onChange={onChange} onKeyPress={onKeypresshandler}/>
            &nbsp;<Button onClick={onClick}>추가</Button>
            <div>{nameList}</div>
            <br />
            <br />
            <Button type="primary" size="large" onClick={onSubmit}>
                올리기
            </Button>
                </Form>
            
            
        </div>
    )
}

export default UploadChartPage
