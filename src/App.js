import "./App.css";
import {Navbar, Container, Nav} from 'react-bootstrap';
import bg from './img/bg.png';
import { createContext, useEffect, useState } from "react";
import data from './data.js';
import { Link, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from "./pages/detail.js";
import Event from "./pages/event.js";
import axios from "axios";
import Cart from "./pages/Cart.js";
import Seen from "./pages/Seen.js";



//context란 state 보관함

function App() {


  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures?',
      params: {
        next: '50'
      },
      headers: {
        'X-RapidAPI-Key': '67142be9e1msha21067b17d884d6p1f558ejsn8dc79fea8402',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
    
    try {
      const fetchData = async () => {
        const response = await axios.request(options);
        console.log(response.data.response);
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }



  //   let watchedValue = localStorage.getItem('watched');
  //   if (watchedValue !== null && watchedValue !== undefined) {   
  //     // 'watched' 키의 값이 있는 경우 처리할 내용을 여기에 작성합니다.
  //     watchedValue = JSON.parse(watchedValue)
  //     let foundIndex = watchedValue.length;
      
  // } else {
  //     // 'watched' 키의 값이 없는 경우 처리할 내용을 여기에 작성합니다.
  //     localStorage.setItem('watched', JSON.stringify( [] ))

  // }
  },[])

  let [shoes,setShoes] = useState(data);
  // let [stock] = useState([10,11,12]);
  let navigate = useNavigate();
  let [num, setNum] = useState(2);

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/seen') }}>Recently Viewed</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
        <div>
          <div className="main-bg" style={{backgroundImage : 'url(' + bg + ')'}}></div>
          <div className="container">
            <div className="row">
              {
              shoes.map(function(a, i){
                return <Cards shoes={shoes} i={i} key={i} />
                })
              }
            </div>
            <button onClick={()=>{
              console.log('hi');
              let newShoes = [...shoes];
              newShoes.sort(function (a, b){
                return a.title < b.title? -1 : a.title > b.title? 1 : 0;
              })
              console.log(newShoes)
              setShoes(newShoes);
              console.log('bye');
            }}>Sort Shoes</button>

            <button onClick={()=>{
              setNum(num+1);
              if(num>3){
                alert('더이상 상품이 없습니다.');
              } else {
              axios.get(`https://codingapple1.github.io/shop/data${num}.json`)
              .then((result)=>{ 
                let copy = [...shoes, ...result.data]
                setShoes(copy)
                ;})
              }              
            }}>상품더보기</button>
          

          
          </div>
        </div>}/>
        <Route path="/detail" element={ <div>Detail 페이지임~</div> }></Route>
          <Route path="/detail/:id" element={ <Detail shoes={shoes}/> }></Route>
        <Route path="/event" element={ <Event /> }>
            <Route path="one" element={ <div> 첫 주문시 양배추즙 서비스 </div> }/>
            <Route path="two" element={ <div> 생일기념 쿠폰받기 </div> }/>
        </Route>
        <Route path="/cart" element={ <Cart/> }/>
        <Route path="/seen" element={ <Seen shoes={shoes} setShoes={setShoes}/> }/>
        <Route path="*" element={ <div> 404페이지임~~ </div> }/>
      </Routes>

      
    </div>
  );
}
export default App;

function Cards(props){
  let navigate = useNavigate();
  return(
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" onClick={()=>{
        navigate(`/detail/${props.shoes[props.i].id}`);
      }}
      style={{cursor:'pointer'}}/>
      <p>{props.shoes[props.i].title}</p>
      <p>{props.shoes[props.i].price}</p>
    </div>
  )
}
