
import axios from "axios";
import React, {useState,useContext} from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [userInput, setUserInput] = useState({name:"", email: "", password: "", confirmPassword: ""})

  const {setToken} = useContext(UserContext)
  const navigate = useNavigate()

  let {name, email, password, confirmPassword} = userInput


    function updateInput(e){
        let x = e.target.name
        setUserInput({...userInput,   [x]: e.target.value})
    }


    async function implementSubmit(e){
           e.preventDefault()
       if(!name || !email || !password || !confirmPassword){
              alert("Please fill all the fields")
              return
       }   
       else if(password !== confirmPassword){
                alert("Password and Confirm Password should be same")
                return
       }

       else{
        
     try{
      const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {name:name,email,password}
           )
      console.log(response.data)
      setToken(response.data.data.token)
      
      setUserInput({name:"", email: "", password: "", confirmPassword: ""})
      // save to local storage 
    localStorage.setItem("token", response.data.data.token)
      alert("User Registered Successfully")
      navigate("/dashboard")
     }

    catch(error){
            console.log(error.response.data.message)
    }

    }
  }
  
    return(
        <div className="signupcontainer">
            <h1>Signup</h1>
            <div className="underline"></div>
            <form onSubmit={implementSubmit}>

                <input type="text" placeholder="name" name="name" 
                    onChange={updateInput}
                    value={name}
                />
                
                <input type="email" placeholder="email" name="email"
                    onChange={updateInput}
                    value={email}
                />
                <input type="password" placeholder="password" name="password"
                    onChange={updateInput}
                    value={password}
                />
                <input type="password" placeholder="confirm password" name="confirmPassword"
                    onChange={updateInput} 
                    value={confirmPassword}
                />
                
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default Signup;
