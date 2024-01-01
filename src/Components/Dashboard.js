import React,{useEffect, useState,useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [joke, setJoke] = useState("")
    const [name, setName] = useState("")
    const {token, setToken} = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(()=>{
        if(token==""){
          let token_from_local_storage = localStorage.getItem("token")
            if(token_from_local_storage){
                setToken(token_from_local_storage)
            }
            else{
                navigate("/login")
            }
        }
    },[])

    useEffect(() => {
        getZuku()
    },[token])

    function getZuku(){
          axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
              headers:{
                  Authorization: `Bearer ${token}`
              }
          })
          .then(response => {
            setJoke(response.data.data.message)
            setName(response.data.data.user.name)
        })
        .catch(error => console.log(error.response.data.message))
    }

    async function logout(){
       try{
        const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
         setJoke("")
         setName("")
         setToken("")
        alert("User Logged Out Successfully")
        // delete token from local storage
        localStorage.removeItem("token")
        navigate("/login")
       }
         catch(error){
              console.log(error.response.data.message)
         }
    }



    return(
        <div className="dashboard">
              <h1> Welcome {name} </h1>
              {
                joke && <p>{joke}</p>
              }
              
              <button onClick={logout}> Logout </button>

        </div>
    )
}

export default Dashboard;