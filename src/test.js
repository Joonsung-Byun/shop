export default function Seen(props) {
  axios.get("https://codingapple1.github.io/shop/data2.json").then((result) => {
    newShoes = [...newShoes, ...result.data];
  });
  axios.get("https://codingapple1.github.io/shop/data3.json").then((result) => {
    newShoes = [...newShoes, ...result.data];
    console.log(newShoes);
  });
  let 꺼낸거 = localStorage.getItem("watched");
  꺼낸거 = JSON.parse(꺼낸거);
  console.log(꺼낸거);
  let newShoes = [...props.shoes];
  return (
    
    <div>
      {꺼낸거.map(function (a, i) {
        return (
          <div key={i}>
            {newShoes[a].title}
            {newShoes[a].content} {newShoes[a].price}
          </div>
        );
      })}
    </div>
  );
}
