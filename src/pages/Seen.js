import axios from "axios";
import { useEffect, useState } from "react";

export default function Seen(props) {
  let 꺼낸거 = localStorage.getItem("watched");
  꺼낸거 = JSON.parse(꺼낸거);
  console.log(꺼낸거);

  useEffect(() => {
    console.log(props.shoes);
    
    axios.get("https://codingapple1.github.io/shop/data2.json")
      .then((result) => {
        props.setShoes([...props.shoes, ...result.data]) ;
      });

      axios.get("https://codingapple1.github.io/shop/data3.json").then((result) => {
        props.setShoes([...props.shoes, ...result.data]) ;
        console.log(props.shoes);
      });

  }, []);
  return (
    <div>
      {꺼낸거.map((a, i) => {
        return <div key={i}>{props.shoes[a]?.title}</div>;
      })}
    </div>
  );
}
