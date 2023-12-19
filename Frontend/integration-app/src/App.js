import logo from './logo.svg';
import './App.css';
 import axios from'axios'
 import{useEffect, useState} from 'react'
function App() {
  const[jokes,setJokes]=useState([])
   useEffect(()=>{
    axios.get('/api/jokes').then((res)=>setJokes(res.data)).catch((err)=>alert(err))
   },[])
  return (
    <div className="App">
      <h1>Jokes list</h1>
      {jokes.length>0?jokes.map((data)=><div>{data.title}</div>):'length:0'}
    </div>
  );
}

export default App;
