import React, { useEffect, useState , useContext} from 'react'
import "../styles/Header.css";
import {NavLink, useLocation} from 'react-router-dom';
import Navbar from './Navbar';
import { GlobalContext } from '../context/Contexts';

export const Header = () => {
  const [isScroll, setIsScroll] = useState(false);  
 const location = useLocation();
useEffect(()=>{
  const handleScroll = ()=>{
    // const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
        if(window.scrollY >  170){  
          // console.log("yes");

         if(header) header.classList.add("fixed");
          setIsScroll(true);
        }else{
          // console.log("no");
        if(header)  header.classList.remove("fixed");
          setIsScroll(false);
        }
  }

  if(location.pathname === '/flights/search'){
    setIsScroll(true);
    const header = document.querySelector('.header');
    if(header.classList.contains("fixed")){
      header.classList.remove("fixed");
    }  
  }else{
    window.addEventListener("scroll", handleScroll);
    setIsScroll(false);
  }

  return ()=>{
    window.removeEventListener("scroll", handleScroll);
  }

},[location]);



  // login-logout
  const user =localStorage.getItem("userName");
  const {setLoginModalOpen} = useContext(GlobalContext);

  const [, setState] = useState();
  const handleLogout =()=>{
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setState({}); //forcing a state update to refresh page
  }


  //toggle user and logout
  const [logout, setLogout]= useState(false);
  const toggleLogout =()=>{
    setLogout(!logout);
  }

  return (
    <div className='header'  > 
     <div className='header-main'>
        <div className='header-logo'>
            <NavLink to='/flights'><img className='ixigo-logo' alt='ixigo.com' src='https://edge.ixigo.com/st/vimaan/_next/static/media/logo.44edf9f1.svg'/></NavLink>
            <div>
          {
            isScroll && <Navbar/>
          }
            </div>
        </div>
        <div className="header-content"> 
              <div className="header-content-div">
                <NavLink to='/offers' >
                    <img alt='offerIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nN2VP0oDQRTGf0EL7bQ2XsD0nkA9gR5AS/9AjqCFXkLxClsYorXBxkYrwcZoo7WQxiYjD76FcZjJzm6QiB98sLx9+3vLmzcz8N/VAq6AV+AIWJTt+Q24UU5j7QDO84fsx7abwueApwAW8zMwnwvtAOfAPTDKgJce6ZsLMZK6rAF1CRsjqdMguQesAG2gH7z7TBQ4m1RgN0huA3fAAFj14oXW6DFSwBhJHUcKDIBbr8ALsASsA1+RAsaIah8YB8l9FTH4tYAGXlahWIvGYv3QVgQec1cbq6jIM9Zm3QKF4N2MHzHWRk6LnDxUW8q+T5ouYxzkLrIL+j6smC7zSZ0xdcCDRrKomK7Se3U2mktsqnC6sjfarx8VHR1Y0xx2a8zyuK66cN5lP2Y5jdXSItqVeQgsyPZsMVvsqa7Mv69vANL/0z8xToMAAAAASUVORK5CYII="/>
                    <p>Offers</p>
                </NavLink>
                <NavLink to='/customercare' >
                    <img alt='icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO2ZS2sUQRSFv4Q4igYlBkUl4PgbFFz4IGShohJcCupGXKpZulRcZOIyYjau9CcIkux84ztGdKfgAzOj7jSokERtueEMNGMPPZPurn4wBwqmuqvOPbd6qm7VLeggEJuBE8B14BHwDvipYr8fAteA42qbKXQBh4A7gNdmuQ0cFEeq2A289gmbA24AZ4CdQBlYrVLWs7NqM+fr9wrYlYYDK4ALwG8JeQ+cA9a1wdELjAAfxPEHGAdWJqj7PwG3ZHwRGANKEfh6NAjz4rwPrCVh9APPZPAjsD1G7h3AJ3E/AfpICDZyD2ToDbA1ARtl4K1s3JPN2HFJBmaBTSSHLUBNtkbjJh8C/gILjlaXvZp/tgAMxkVqa/xTjdB53OGibD6Oi/CICO1zr8EdeoEvsn04DsK7IrMg5xojsm3LfSRsVNCzubEe9+hTfDENG6IQndKITJIepqThZBSSHo3EAOlhQBoSiSm5QUkB0Faqagz7qdR0jAWcHSrJ6U1ORy2AwJ65Rm05Ouz4WUezE51reCE6/JqXMKi9TasEruCF6FjUvmwJ3cB0Q4O8OOIBL+UDB5o0yIsjHrDPKhMFcOSyVWYK4MgLq3wtgCOf8WUv8uzIPL7DS54dqRVljkxb5UoBHBm3yv6ixJFu4HmOHZmpR3a0X1log8AVvBAdpnlPY6djbRC4gheiw685ENWAzpYqdY1qVB2VAILY87AudJREUtUIjKZ4Zq9kQEcHjdnOfl335RqTmhunyTGG5cS3NHLP/qRaUAxoNdE2DPxQH7vSzkRSzWsh0bYK2AYc9f2drFwlJQQFsWZfpn6hE/T+u+5HurLuyGyDI790PX1Tl0pp3MeERmMvIzuFZUfjZl+iE6ELj39a7dESp7S2JgAAAABJRU5ErkJggg=="/>
                    <p>Customer Service</p>
                </NavLink>
              </div>

              {
                user ?
                <div onClick={toggleLogout} style={{padding:'8px 0px'}} className='header-signin'>
                         <div><img alt='user' src='https://edge.ixigo.com/st/vimaan/_next/static/media/userFilled.12154510.svg'/></div>
                          <div className="logoutButton">
                            {logout?
                              <button onClick={handleLogout} >Logout</button>
                              :
                              <p>hey, { user}</p>
                             }
                          </div>
                </div>
                    :
                <div className='header-signin'>
                    <div><img alt='user' src='https://edge.ixigo.com/st/vimaan/_next/static/media/userFilled.12154510.svg'/></div>
                  <NavLink onClick={()=> setLoginModalOpen(true)} to='login-signup' >
                    <button type='submit' className='loginButton'>Log in/Sign up</button>
                  </NavLink>
                </div>
              }
        </div>
     </div>
    </div>
  )
}
