import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

function Detail(props) {
  let { id } = useParams();
  let [count, setCount] = useState(0);
  let [state, setState] = useState(true)
  let [search, setSearch] = useState('');
  let [tab, setTab] = useState(2)

  useEffect(()=>{
    let a = setTimeout(()=>{ setState(false)}, 2000)
    console.log(2)
    return () => {
      console.log(1)
      clearTimeout(a)
    }
  })

  useEffect(()=>{
    if(isNaN(search)){
      alert('ㄴㄴ')
    }
  },[search])


  if (!isNaN(id) && (id < props.shoes.length )) {
    return (
      <> 
      <div className="container">
        {state === true ? <div className="alert-warning" >
          2초이내 구매시 할인
        </div> : null}
        {/* <button onClick={()=>{ setCount(count+1) }}>버튼</button>
        {count} */}
        
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${ parseInt(id) + 1 }.jpg`} width="100%"/>
          </div>
          <div className="col-md-6">


            {/* <input onChange={(e)=>{setSearch(e.target.value)}}/> */}



            <h4 className="pt-5">{props.shoes[id].title}</h4>
            <p>{props.shoes[id].content}</p>
            <p>{props.shoes[id].price}원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
         <Nav.Item>
        <Nav.Link eventKey="link0" onClick={()=>{
          setTab(0)
        }}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1" onClick={()=>{
          setTab(1)
        }}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2" onClick={()=>{
          setTab(2)
        }}>버튼2</Nav.Link>
      </Nav.Item>
    </Nav>
    <TabContent tab = {tab}></TabContent>





      </div>
      </>

    );
  } else {
    return <div>그런 신발은 없어유</div>;
  }
}

function TabContent (props){
  if (props.tab == 0){
    return(<div>내용0</div>)
  } else if (props.tab == 1){
    return (<div>내용1</div>)
  } else if (props.tab == 2){
    return(<div>내용2</div>)
  }
}

export default Detail;
