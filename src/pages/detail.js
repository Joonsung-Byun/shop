import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {styled} from "styled-components";


export default function Detail(props) {
// Detail 컴포넌트가 렌더링, 업데이트 될 때마다 실행되는 useEffect
//useEffect는 html이 랜더링 된 후에 실행되는 함수, 복잡한 연산을 할 때 사용! html 렌더링이 더 중요하기 때문에

 
let [display, setDisplay] = useState(0);
let [input, setInput] = useState('');

  useEffect(()=>{
    let a = setTimeout(() => { setDisplay(1)}, 2000)
    if (isNaN (input)==true) {
      alert('그러지마세요;;')
    }

    //useEffect안에서 return문을 사용하면, 재랜더링시 이전에 실행중이던 함수들을 종료시킬 수 있다. eg) setTimeout, data fetch
    //신기한건 cleanup Function은 최초 mount시에는 실행이 안되고, unmount시 실행된다.

  }, [input])

  

  let {id} = useParams();
  const foundShoes = props.shoes.find(e => e.id === parseInt(id));
  return (
    <div className="container">
      { display == 0? <div className="alert alert-warning">2초이내 구매시 20% 할인</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{foundShoes.title}</h4>
          <p>{foundShoes.content}</p>
          <p>{foundShoes.price}</p>
          <button className="btn btn-danger">주문하기</button>
          <input type="text" onChange={(e)=>{
            setInput(e.target.value)
          }}/>
        </div>

      </div>
    </div>
  );
}

