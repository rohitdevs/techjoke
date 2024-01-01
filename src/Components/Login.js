import axios from "axios";
import React, {useState,useContext,useEffect} from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: ""})
  const {token, setToken} = useContext(UserContext)

  const navigate = useNavigate()

  let {email, password} = userInput


   useEffect(()=>{
         if(token || localStorage.getItem("token")){
             navigate("/dashboard")
         }
   },[])


    function updateInput(e){
        let x = e.target.name
        setUserInput({...userInput,   [x]: e.target.value})
    }


    async function implementSubmit(e){
           e.preventDefault()


       if(!email || !password){
              alert("Please fill all the fields")
              return
       }   

    else{
        
     try{
      const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/login", {email,password}
           )
           console.log(response.data)
           setToken(response.data.data.token)
            // save to local storage 
    localStorage.setItem("token", response.data.data.token)
          
      
      setUserInput({email: "", password: ""})
      alert("User  Signed Successfully")
      navigate("/dashboard")
     }
     
    catch(error){
            console.log(error.response.data.message)
    }

    }
  }
    return(
        <div className="logincontainer">
            <h1>Login</h1>
            <form onSubmit={implementSubmit}>

                
                
                <input type="email" placeholder="email" name="email"
                    onChange={updateInput}
                    value={email}
                />
                <input type="password" placeholder="password" name="password"
                    onChange={updateInput}
                    value={password}
                />
               
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;
