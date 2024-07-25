import React,{useState, useContext, useEffect} from 'react'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import "../styles/Login.css";
import loginBanner from '../images/login-banner.png';
import {GlobalContext} from '../context/Contexts';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const {loginModalOpen, setLoginModalOpen, user, setUser} = useContext(GlobalContext);
  const handleClose = () => setLoginModalOpen(false);

 const [activeTab, setActiveTab]= useState("signup");
 const handleSwitchTabs = (tab)=>{
  setActiveTab(tab);
 }

 //login signup logic
 const [login, setLogin] = useState({email:'', password:'', appType: 'bookingportals'});
 const [signup, setSignup] = useState({name:'', email:'', password:'', confirmpassword:''});

 function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
 }


  const navigate = useNavigate();
  const location = useLocation();
  
 
  const navigateUser = (data)=>{
    if(data.status === "success"){
      localStorage.setItem('token',data.token);
      localStorage.setItem('userName',data.data.user.name);
      
      setUser(data.data.user.name);
      handleClose();
      if(location.pathname === '/login-signup'){
        navigate("/flights");
      }

    }else{
      alert(data.message);
      
    }
  }

 const createUser = (name, email, password)=>{
   const userData = {
       name,
       email,
       password,
       appType: 'bookingportals' 
   }
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/signup`
    fetch(url, 
    {
        method: 'post',
        headers:{
            'projectID': '9h69a26iogeq',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response=>response.json())
    .then(result=>{
      // console.log(result);
      navigateUser(result);
    })
    .catch((error) => console.log("error", error));
 }


 const handleSignup = ()=>{
   const nameLength = signup.name.length;
   const passwordLength = signup.password.length;
   if(signup.name && signup.email && signup.password && signup.confirmpassword){
       if(nameLength < 3 || nameLength > 20){
        alert("Name must be between 3 and 20 characters long");
       }else if(!isValidEmail(signup.email)){
         alert('Please enter a valid email');
       }else if(passwordLength < 6){
        alert("Password must be at least 6 characters long");
       }else if(signup.password !== signup.confirmpassword){
        alert("Passwords do not match, please confirm your password again");
       }else{
        // console.log(" data -->", signup);
        createUser(signup.name, signup.email, signup.password);
       }
   }else{
      alert("Please fill all the fields");
   }
 }


  const loginUser = ()=>{
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/login`
    fetch(url, 
    {
        method: 'post',
        headers:{
            'projectID': '9h69a26iogeq',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then(response=>response.json())
    .then(result=>{
      // console.log(result);
      navigateUser(result);
    })
    .catch((error) =>{
      //  console.log("error", error);
       navigateUser({status:'fail', message:"User doesn't exist, please try to signup "})
      });
  }

 const handleLogin = ()=>{
    const passwordLength = login.password.length;
    if(!isValidEmail(login.email)){
      alert('Please enter a valid email');
    }else if(passwordLength < 6){
      alert("Password must be at least 6 characters long");
    }else{
      // console.log("data", login);
      loginUser();
    }
 }
  


 useEffect(()=>{
  if(location.pathname === '/login-signup'){
    setLoginModalOpen(true);
  }

 },[location.pathname])

  return (
    <Modal
        open={loginModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='login-signup-modal'>
          <div className='login-signup-poster'>
            <img src={loginBanner} alt='login-signup-banner' />
          </div>
          <div className='login-signup-container'>
            <div >
                <div className='login-signup-switch'>
                    <div onClick={()=>handleSwitchTabs('login')}>
                      <p className={activeTab === "login"?'active-switch': ''}>LOGIN</p>
                    </div>
                    <div onClick={()=>handleSwitchTabs('signup')} >
                       <p className={activeTab === "signup"?'active-switch': ''}>SIGNUP</p>
                    </div>
                </div>
                
                {
                  activeTab === "login" ? 
                  (
                    <div className='login-box'>
                      <h2>Log in to ixigo</h2>
                      <div className='login-feilds'>
                          <TextField
                            id="standard-basic" 
                            label="Enter Email" 
                            type='email' 
                            InputLabelProps={{shrink:true,color:'error'}} 
                            variant="standard" 
                            sx={{width:'100%'}}
                            value={login.email}
                            onChange={(e)=>setLogin({...login, email:e.target.value})}
                          />
                          <TextField 
                            id="standard-basic" 
                            label="Enter Password" 
                            type='password'
                            variant="standard" 
                            InputLabelProps={{shrink:true,color:'error'}}
                            sx={{width:'100%'}}  
                            value={login.password}
                            onChange={(e)=>setLogin({...login, password:e.target.value})}
                          />
                          <button onClick={handleLogin} >LOGIN</button>
                      </div>
                      
                    </div>
                  ):
                  (
                    <div className='signup-box'>
                        <h2>Sign up to ixigo</h2>
                        <div className='signup-feilds'>
                          <TextField
                            id="standard-basic" 
                            label="Enter Name" 
                            type='text' 
                            InputLabelProps={{shrink:true,color:'error'}} 
                            variant="standard" 
                            sx={{width:'100%'}}
                            value={signup.name}
                            onChange={(e)=>setSignup({...signup, name:e.target.value})}
                          />
                          <TextField
                            id="standard-basic" 
                            label="Enter Email" 
                            type='email' 
                            InputLabelProps={{shrink:true,color:'error'}} 
                            variant="standard" 
                            sx={{width:'100%'}}
                            value={signup.email}
                            onChange={(e)=>setSignup({...signup, email:e.target.value})}
                          />
                          <TextField
                            id="standard-basic" 
                            label="Enter Password" 
                            type='password' 
                            InputLabelProps={{shrink:true,color:'error'}} 
                            variant="standard" 
                            sx={{width:'100%'}}
                            value={signup.password}
                            onChange={(e)=>setSignup({...signup, password:e.target.value})}
                          />
                          <TextField
                            id="standard-basic" 
                            label="Confirm Password" 
                            type='password' 
                            InputLabelProps={{shrink:true,color:'error'}} 
                            variant="standard" 
                            sx={{width:'100%'}}
                            value={signup.confirmpassword}
                            onChange={(e)=>setSignup({...signup, confirmpassword:e.target.value})}
                          />
                            <button onClick={handleSignup} >SIGNUP</button>
                        </div>
                    </div>
                  )
                }

                <div className='terms'>
                   <p>By signing up, I understand & agree to ixigo terms of use and privacy policy</p>
                   <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                </div>
            </div>

          </div>
        </div>
      </Modal>
  )
}

export default Login

