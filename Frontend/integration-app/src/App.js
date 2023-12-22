
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [maindata, setmaindata] = useState([]);
  const [edit, setEdit] = useState({});
  const [editingvalue, setEditingValue] = useState({
    name: "",
    descrip: "",
  });
  const [id, setId] = useState("");
  const [deletevalue, setDeletevalue] = useState("");
   const[addData,setAddData]=useState({
    name:"",
    descrip:""
   })

  useEffect(() => {
    fetch("/api/course")
      .then((res) => res.json())
      .then((data) => setmaindata(data))
      .catch((error) => {
        setmaindata([error]);
      });
      // setEdit({})
  }, [edit,deletevalue]);

  useEffect(() => {
    if (deletevalue !== "") {
      fetch(`/api/course/${deletevalue}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => setmaindata(data))
        .catch((error) => {
          setmaindata([error]);
        });
    }
  }, [deletevalue]);

  
  const handlePut = async () => {
    try {
      const response = await fetch(`/api/course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingvalue),
      });

      const data = await response.json();
      console.log('PUT request successful:', data);
      // setEdit({...editingvalue.id=id,})
      
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
  };

 

  const editdata = (data,index,status) => {
    setEdit(data);
    setEditingValue({ name: data.name, descrip: data.descrip });
    setId(data.id);
      
      if(status==='update'){
         setEdit({})
        handlePut()
      }
  };

  const deletedata = (id) => {
    setDeletevalue(parseInt(id));
  };

   const addata= async()=>{
    try{
       const response= await fetch('/api/course/',{method:'POST',  headers: {
        'Content-Type': 'application/json',
      },body:JSON.stringify(addData)})
       const data = await response.json();
        setmaindata(data)
       console.log('POST request successful:', data); 
      
    }
    catch(error){
      console.error('Error making POST request:', error);
    }
    setAddData({name:'',descrip:""}) 
   }


  return (
    <div className="App">
      <h1>Jokes list</h1>
      {/* {edit && (
        <div>
          editingvalue
          <input
            value={editingvalue.name}
            onChange={(e) =>
              setEditingValue({
                name: e.target.value,
                descrip: editingvalue.descrip,
              })
            }
          />
          <input
            value={editingvalue.descrip}
            onChange={(e) =>
              setEditingValue({
                name: editingvalue.name,
                descrip: e.target.value,
              })
            }
          />
          <button
            onClick={() => {
              handlePut();
            }}
          >
            sumbit
          </button>
        </div>
      )} */}
   <div>
        <input value={addData.name}  onChange={(e)=>{setAddData({descrip:addData.descrip,name:e.target.value})}}/>
        <input  value={addData.descrip}onChange={(e)=>{setAddData({name:addData.name,descrip:e.target.value})}}/>
        <button onClick={()=>{addata()}}>add</button>
      </div>
      {maindata.map((data,index) => (
        <div key={data.id}>
          <p>
            {edit?.id===data.id?<>
            <input  value={editingvalue.name} onChange={(e)=>{setEditingValue({descrip:editingvalue.descrip,name:e.target.value})}}/>
            <input   value={editingvalue.descrip} onChange={(e)=>{setEditingValue({descrip:e.target.value,name:editingvalue.name})}} />
            </>:<>   name:{data.name} --- {data.descrip}</>}
              

            <button
              onClick={() => {
                editdata(data,index,(data.name===edit.name&&data.descrip===edit.descrip)?"update":"edit");
              }}
            >
              {(data.name===edit.name&&data.descrip===edit.descrip)?"update":"edit"}
            </button>
            <button
              onClick={() => {
                deletedata(data.id);
              }}
            >
              delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
