import React,{useRef,useEffect, useContext, useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/NavbarMobile.css';
import { GlobalContext } from '../context/Contexts';

let timeOut;
const NavbarMobile = () => {

    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};


    const handleClickOutside = (event)=>{
        if( navRef.current.classList.contains("responsive_nav")){
          timeOut = setTimeout(()=>{
            navRef.current.classList.remove("responsive_nav");
          },1000)
        }
       
    }
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
            clearTimeout(timeOut);
        }
        
    },[]);

    //based on path setting sticky property of header
    const location = useLocation();
    const currentPath = location.pathname;

    // user
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
    <header className={(currentPath ==='/flights/search'? 'header-mobile': 'header-mobile header-mobile-sticky')}>
            <NavLink to='/flights'><img className='ixigo-logo' alt='ixigo.com' src='https://edge.ixigo.com/st/vimaan/_next/static/media/logo.44edf9f1.svg'/></NavLink>
			       <nav ref={navRef}>
               <NavLink to='/flights' className='nav-link-mobile'>
                   <div>
                     <img alt='ixigo flights' src='https://edge.ixigo.com/st/vimaan/_next/static/media/flight.f515b25a.svg'/>
                   </div>
                   <p>Flights</p>
                </NavLink>

			      	<NavLink to='/hotels' className='nav-link-mobile'>
                   <div>
                     <img alt='ixigo hotels' src='https://edge.ixigo.com/st/vimaan/_next/static/media/hotel.4b63222d.svg'/>
                   </div>
                   <p>Hotels</p>
                </NavLink>

			       	 <NavLink to='/trains' className='nav-link-mobile'>
                   <div>
                     <img alt='ixigo trains' src='https://edge.ixigo.com/st/vimaan/_next/static/media/train.d3e3d1e5.svg'/>
                   </div>
                   <p>Trains</p>
                </NavLink>

			        	<NavLink to='/buses' className='nav-link-mobile'>
                   <div>
                     <img alt='ixigo buses' src='https://edge.ixigo.com/st/vimaan/_next/static/media/bus.1942c5dd.svg'/>
                   </div>
                   <p>Buses</p>
                </NavLink>

                <NavLink to='/offers' className='nav-link-mobile' >
                    <img alt='offerIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVR4nN2VP0oDQRTGf0EL7bQ2XsD0nkA9gR5AS/9AjqCFXkLxClsYorXBxkYrwcZoo7WQxiYjD76FcZjJzm6QiB98sLx9+3vLmzcz8N/VAq6AV+AIWJTt+Q24UU5j7QDO84fsx7abwueApwAW8zMwnwvtAOfAPTDKgJce6ZsLMZK6rAF1CRsjqdMguQesAG2gH7z7TBQ4m1RgN0huA3fAAFj14oXW6DFSwBhJHUcKDIBbr8ALsASsA1+RAsaIah8YB8l9FTH4tYAGXlahWIvGYv3QVgQec1cbq6jIM9Zm3QKF4N2MHzHWRk6LnDxUW8q+T5ouYxzkLrIL+j6smC7zSZ0xdcCDRrKomK7Se3U2mktsqnC6sjfarx8VHR1Y0xx2a8zyuK66cN5lP2Y5jdXSItqVeQgsyPZsMVvsqa7Mv69vANL/0z8xToMAAAAASUVORK5CYII="/>
                    <p>Offers</p>
                </NavLink>

                <NavLink to='/customercare' className='nav-link-mobile'>
                    <img alt='icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO2ZS2sUQRSFv4Q4igYlBkUl4PgbFFz4IGShohJcCupGXKpZulRcZOIyYjau9CcIkux84ztGdKfgAzOj7jSokERtueEMNGMPPZPurn4wBwqmuqvOPbd6qm7VLeggEJuBE8B14BHwDvipYr8fAteA42qbKXQBh4A7gNdmuQ0cFEeq2A289gmbA24AZ4CdQBlYrVLWs7NqM+fr9wrYlYYDK4ALwG8JeQ+cA9a1wdELjAAfxPEHGAdWJqj7PwG3ZHwRGANKEfh6NAjz4rwPrCVh9APPZPAjsD1G7h3AJ3E/AfpICDZyD2ToDbA1ARtl4K1s3JPN2HFJBmaBTSSHLUBNtkbjJh8C/gILjlaXvZp/tgAMxkVqa/xTjdB53OGibD6Oi/CICO1zr8EdeoEvsn04DsK7IrMg5xojsm3LfSRsVNCzubEe9+hTfDENG6IQndKITJIepqThZBSSHo3EAOlhQBoSiSm5QUkB0Faqagz7qdR0jAWcHSrJ6U1ORy2AwJ65Rm05Ouz4WUezE51reCE6/JqXMKi9TasEruCF6FjUvmwJ3cB0Q4O8OOIBL+UDB5o0yIsjHrDPKhMFcOSyVWYK4MgLq3wtgCOf8WUv8uzIPL7DS54dqRVljkxb5UoBHBm3yv6ixJFu4HmOHZmpR3a0X1log8AVvBAdpnlPY6djbRC4gheiw685ENWAzpYqdY1qVB2VAILY87AudJREUtUIjKZ4Zq9kQEcHjdnOfl335RqTmhunyTGG5cS3NHLP/qRaUAxoNdE2DPxQH7vSzkRSzWsh0bYK2AYc9f2drFwlJQQFsWZfpn6hE/T+u+5HurLuyGyDI790PX1Tl0pp3MeERmMvIzuFZUfjZl+iE6ELj39a7dESp7S2JgAAAABJRU5ErkJggg=="/>
                    <p>Customer Service</p>
                </NavLink>

                  { 
                    !user?
                    <NavLink onClick={()=> setLoginModalOpen(true)} to='login-signup' style={{textDecoration: 'none'}}>
                      <div className='header-signin-mobile'>
                          <div><img alt='user' src='https://edge.ixigo.com/st/vimaan/_next/static/media/userFilled.12154510.svg'/></div>
                          <button type='submit' style={{textOverflow:'ellipsis'}} className='loginButton'>Log in/Sign up</button>
                      </div>
                   </NavLink>
                        :
                    <div  onClick={toggleLogout} className='header-signin-mobile'>
                        <div><img alt='user' src='https://edge.ixigo.com/st/vimaan/_next/static/media/userFilled.12154510.svg'/></div>
                          <div  className="logoutButton">
                            {logout?
                             <button onClick={handleLogout} >Logout</button>
                             :
                             <p>hey, { user}</p>
                             }
                          </div>
                    </div>

                   }

				<button
					className="nav-btn nav-close-btn"
					>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
    </header>
  )
}

export default NavbarMobile