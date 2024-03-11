import "./App.css";
import { Routes, Route } from "react-router-dom";
import Detail from "./pages/detail.js";
import Navigation from "./nav.js";
import Event from "./pages/event";
import data from "./data";
import { useState } from "react";
import Page404 from "./pages/Page404";
import bg from "./img/bg.png";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
// import { useEffect } from "react";

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(1);
  console.log(count)
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
      <Navigation></Navigation>
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

          <Route path="event" element={<Event />}>
            <Route path="one" element={<p>첫 주문시 양배추집 서비스</p>}></Route>
            <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
          </Route>

          <Route path="*" element={<Page404 error={"404인디 ㅅㄱㅋㅋ"} />} />
      </Routes>
    </div>
  );
}

export default App;
