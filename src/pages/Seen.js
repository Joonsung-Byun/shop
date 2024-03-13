import axios from "axios";
import { useEffect, useState } from "react";

export default function Seen(props) {
    let 꺼낸거 = localStorage.getItem('watched');
    꺼낸거 = JSON.parse(꺼낸거);
    console.log(꺼낸거)
    const [newShoes, setNewShoes] = useState([...props.shoes]);

    useEffect(() => {
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
            setNewShoes(prevShoes => [...prevShoes, ...result.data]);
        })

        axios.get('https://codingapple1.github.io/shop/data3.json')
        .then((result)=>{
            setNewShoes(prevShoes => [...prevShoes, ...result.data]);
            console.log(newShoes)
        })
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            {
                꺼낸거.map(function(a, i){
                    return (
                    <div key={i}>
                        {newShoes[a]?.title}
                    </div>
                    )
                })
            }
        </div>
    )
}