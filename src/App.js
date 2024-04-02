import "./App.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail.js";
import Event from "./pages/event";
import data from "./data";
import { useState } from "react";
import Page404 from "./pages/Page404";
import bg from "./img/bg.png";
 import {  Row, Col } from "react-bootstrap";
import axios from "axios";
// import { useEffect } from "react";

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(1);
  let navigate = useNavigate(); // useNavigate()를 사용하면 페이지 이동이 가능합니다. onClick에 navigate('/')를 넣으면 '/'로 이동합니다.
  
  
  
  // let [more, setMore] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("https://codingapple1.github.io/shop/data2.json")
  //     .then((response) => {
  //       let newShoes = response.data;
  //       shoes.push.apply(shoes, newShoes);
  //     });
  // }, [more]);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
            <>
              <div className="main-bg" style={{ backgroundImage: "url(" + bg + ")" }}></div>
              <div>
                <Container>
                
                  <Row>
                    {shoes.map(function (a, i) {
                      const imageUrl = `https://codingapple1.github.io/shop/shoes${ i + 1 }.jpg`;
                      return (
                        <Col sm key={i}>
                          <img src={imageUrl} width="80%" />
                          <h4>{shoes[i].title}</h4>
                          <p>{shoes[i].price}</p>
                        </Col>);})}
                  </Row>
                  <button onClick={() => { 
                    axios.get(`https://codingapple1.github.io/shop/data${count + 1}.json`)
                    .then(response => { 
                      let copy = [...shoes, ...response.data]
                      console.log(copy)
                      setShoes(copy);
                    })
                    .then(()=>{
                      setCount(count+1)
                      console.log(count)
                    })
                    .catch(error => {
                      alert('신발이 더이상 없습니다.'); // URL을 불러오지 못했을 때 오류 메시지를 표시할 수 있습니다.
                    });
                   }}> 더보기 </button>
                </Container>
              </div>
            </>}>
          </Route> 
          <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />

          <Route path="*" element={<>404임</>}  />
      </Routes>
    </div>
  );
}
export default App;

