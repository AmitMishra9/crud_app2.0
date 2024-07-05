
import { useState, useEffect } from 'react'
import './App.css'
import { EmpData } from './EmpData'
import DeleteModal  from './DeleteModal';

function App() {
  const [data, setData] = useState([])

  const [name,setName]= useState("");
  const[age,setAge]=useState("");
  const [email,setEmail]=useState("");
  const [id,seId]=useState(0);
  const [isUpdate,setisUpdate]= useState(0);
  const [showModel, setShowModal] = useState(false); // State to manage modal visibility
  const [idToDelete, setIdToDelete] = useState(''); // State to manage the input value

  



  useEffect(() => {
    setData(EmpData);
  }, []);


  

const handleEdite=(id)=>{
      // alert("Hello");
      
   const dt= data.filter(item=> item.id===id);
   if(dt.length >0){
    setisUpdate(true);
    seId(id);
    setName(dt[0].Name);
    setAge(dt[0].Age);
    setEmail(dt[0].Email);
   }
}

const handleDelete=(id)=>{

   if(window.confirm("Are you sure to delete this item"));

    if(id>0){
      const dt= data.filter(item=>item.id!== id);
      setData(dt);
    }


}
const handleClaer=()=>{
 
    seId(0);
    setName("");
    setAge("");
    setEmail("");
   setisUpdate(false);
  }


const handleSave=(e)=>{
     // alert("hero")

      let error="";
      if(name ===" "){
        error+="Name is required";
      }
      if(age <= 0){
        error+="age is required";
      }
      
      if(email===" "){
        error+="Email is required";
      }

      if(error ===' ')
    {
     e.preventDefault();
    const dt=[...data];
    const newObj={
      id:data.length+1,
      Name:name,
      Age:age,
      Email:email
    }
    dt.push(newObj);
    setData(dt);
    handleClaer();
    }
    else{
        alert(error);
    }
}

const handleUpadet=()=>{
    const index= data.map((item)=>{
       return item.id
    }).indexOf(id);

    
    const dt= [...data];

    dt[index].Name=name;
    dt[index].Age=age;
    dt[index].Email= email
   
  setData(dt);

  handleClaer();
  
}

 
 const  DeleteAll=()=>{
     //alert("Delete All called")\
     if (window.confirm("Are you sure to delete all the data?")) {
      setData([]);
    }
}


const handleDeleteById = () => {
  const id = parseInt(idToDelete, 10);
  if (id > 0) {
    const dt = data.filter(item => item.id !== id);
    setData(dt);
    setShowModal(false); 
    setIdToDelete(''); 
  }
};




  return (
    <>
      <div className=' '>

      <div style={{display:'flex',justifyContent:'center' , marginTop:'10px' , marginBottom:"10px"}}>
        <div>
            <label>Name</label>
            <input type='text'  value={name}  placeholder=' Enter the name' onChange={(e)=>setName(e.target.value)}  />
            <label>Age</label>
            <input type='number'  value={age}  placeholder=' Enter the age' onChange={(e)=>setAge(e.target.value)}  />
            <label>Email</label>
            <input type='email'   value={email} placeholder=' Enter the email' onChange={(e)=>setEmail(e.target.value)} />
            <br></br>
            <br></br>  
            <div>

            {
              !isUpdate ?
               <button onClick={(e)=> handleSave(e)}>Save</button>
               :
               <button onClick={()=> handleUpadet()}>Update</button>
            }
               &nbsp;
               <button onClick={()=> handleClaer()}>Clear</button>
            
               </div>
            </div> 
      </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      
        <table>
       
          <thead>
            <tr>
              <td>Sr.No</td>
              <td>Id</td>
              <td>Name</td>
              <td>Age</td>
              <td>Email</td>
              <td>Active</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id }</td>
                    <td>{item.Name}</td>
                    <td>{item.Age}</td>
                    <td>{item.Email}</td>
                    <td>
                      <button onClick={()=> handleEdite(item.id)}>Update</button>
                      &nbsp;
                      <button onClick={()=> handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>

                );
              })}
          </tbody>

         
        </table>
        <button onClick={(e)=>DeleteAll()}>Delete All</button> 
         <button onClick={()=>setShowModal(true)}>Delete by Id</button>  
         <button>Update All</button> 
         <button>Update by Id </button>
   
           

          
          <DeleteModal 
          show={showModel}
          handleClose={() => setShowModal(false)}
          handleDelete={handleDeleteById}
          idToDelete={idToDelete}
          setIdToDelete={setIdToDelete}
          />

           
     
        </div>
    </>
  )
}

export default App
