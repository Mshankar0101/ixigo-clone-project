import React,{useState, useRef, useEffect} from 'react';
import "../../styles/Bus.css";
import {Autocomplete, TextField, Box, Typography, InputAdornment} from "@mui/material";
import {STATE_CITIES, BUS_OFFERS} from "../../components/data.js";
import { FaBus, FaCity, FaRoute, FaBusAlt} from "react-icons/fa";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { RiCustomerServiceFill, RiRefund2Line } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Footer.jsx";
import { useNavigate } from 'react-router-dom';


const Buses = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  //logic for next prev btn offer section
  const [offerBtn, setOfferBtn]= useState({prev:false,next:true});
  const offerRef= useRef();
  useEffect(() => {
    window.scroll(0,0);
    const container = offerRef.current;
    const handleScroll = () => {
   
      if(container.scrollLeft === 0){
        setOfferBtn({prev:false,next:true});
      }
      if(container.scrollLeft>0){
        setOfferBtn((prev)=>{
          return {...prev, prev:true}
        })
      }
      if(container.scrollLeft + container.clientWidth >= container.scrollWidth){
        setOfferBtn({prev:true,next:false});
      }
      if(container.scrollLeft + container.clientWidth < container.scrollWidth){
        setOfferBtn((prev)=>{
          return {...prev, next:true}
        })
      }
    };
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  const showPreviousOffers = ()=>{
    const container = offerRef.current;
     let width = container.clientWidth;
     container.scrollLeft = container.scrollLeft - (width*2/3);
    
  }
  const showNextOffers = ()=>{
    const container = offerRef.current;
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft + (width*2/3);
   
  }


  //handle search submition
  const navigate = useNavigate();
  const [fromValue, setFromValue]= useState({});
  const [toValue, setToValue]= useState({});
 
  const handleSearchSubmission = ()=>{
      if(Object.keys(fromValue).length === 0){
        alert("Please select from station");
      }else if(Object.keys(toValue).length === 0){
        alert("Please select to station");
      }else{
        const data = {
          fromValue,
          toValue,
          currentDate,
        }
        navigate('search',{state:data});
      }
  }

  // useEffect(()=>{
  //   console.log("fromValue",fromValue);
  //   console.log("toValue",toValue);
  // },[fromValue,toValue])

  return (
    <div className='bus-home-page'>
       <div className='bus-poster'>
          <div className='bus-poster-heading'>
             <p>Book Bus Tickets</p>
          </div>
          <div className='bus-search-container'>
            <div className='bus-search-box'>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                   value={Object.keys(fromValue).length !== 0? fromValue : {city:'',state:''}}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setFromValue(newValue);
                      
                    } else {
                      setFromValue({});
                    }

                  }}

                  options={STATE_CITIES}
                  getOptionLabel={(option) => option.city}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{
                      display:'flex',
                      gap:'10px'
                      }} 
                    {...props}
                    >
                      <Box sx={{padding:'10px'}}>
                        <FaCity className='bus-city-icon' />
                      </Box>
                      <Box 
                      >
                        <Typography sx={{fontSize:'18px', margin:'0px',lineHeight:1.2}} variant='h6' >{option.city} </Typography>
                        <Typography sx={{fontSize:'14px', margin:'0px',lineHeight:1}} variant='subtitle1' > {option.state}</Typography>
                      </Box>
                    </Box>
                  )}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="From Station"
                      placeholder='From Station'
                     
                      InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      startAdornment: (
                          <InputAdornment position="start">
                            <FaBus className='bus-icon' />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      multiline
                    />
                   )}
                />
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={Object.keys(toValue).length !== 0? toValue : {city:'',state:''}}
                  onChange={(event, newValue) => {
                    setToValue(newValue);
                    // const index = STATE_CITIES.findIndex((city) => city.city === newValue.city);
                    // setInputValues((pre)=>{
                    //   return {...pre,to:index}
                    // })
                  }}
                 
                  options={STATE_CITIES}
                  getOptionLabel={(option) => option.city}

                  renderOption={(props, option) => (
                    <Box component="li" sx={{
                      display:'flex',
                      gap:'10px'
                      }} 
                    {...props}
                    >
                      <Box sx={{padding:'10px'}}>
                        <FaCity className='bus-city-icon' />
                      </Box>
                      <Box 
                      >
                        <Typography sx={{fontSize:'18px', margin:'0px',lineHeight:1.2}} variant='h6' >{option.city} </Typography>
                        <Typography sx={{fontSize:'14px', margin:'0px',lineHeight:1.2}} variant='subtitle1' > {option.state}</Typography>
                      </Box>
                    </Box>
                  )}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="From Station"
                      placeholder='To Station'
                      InputProps={{
                        ...params.InputProps, 
                        type: 'search',
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdLocationPin className='location-icon' />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      multiline
                   />
                  )}
               />
                <DatePicker
                  selected={currentDate}
                  onChange={(date) => setCurrentDate(date)}
                  dateFormat={'EEE, dd MMM'}
                  monthsShown={1}
                  minDate={new Date()}
                  onKeyDown={(e) => {
                        e.preventDefault();
                  }}
                />
                <button className='search-button' onClick={handleSearchSubmission}>Search</button>
            </div>
          </div>
       </div>
       <div className='crousel-bus'>
         <h2>Bus Booking Discount Offers </h2> 
           <div className='flight-offers-container' ref={offerRef} >
                  {BUS_OFFERS.map((item,index)=>{
                      if(item){
                      return <div className='flight-offer-img-container' key={index} >
                              <img alt={"offers"} src={item}/>
                          </div>
                      }else{
                          return null;
                      }
                  })}

              <div className='flight-offers-next-prev'>
                  <div onClick={showPreviousOffers} style={{visibility:(offerBtn.prev?'visible':'hidden')}} >
                  <img alt='previous-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2ZOw7CQAxEHYr4qEhQ2DkBf0jLR1DA7exzsHRApCSIanckP8n9zHi1Hy9REATB/6SqVjuz+pzwSFUtdmH1xGpPMBPv5NOnDMXEd/LdqsVuVL54P/WL9zst0oTKJVWsfgQVT8TqbYjPAYsfkJPfh/gcsPgOOHnbhvgcsNoGN3mxdYjPAautkJNfwoofNaD2gDAwuoSgTMjADhQmSjnIoDqhA/egMFHKdRqrE97/GgsTpTzqwTrRhomiR4sKs5xGhrsKZQJ2vP7jg6PxGcF+MTVQ4juduLLYNLeSIAgoLy+9z15ZP/8kOAAAAABJRU5ErkJggg=="/>
                  </div>

                  <div onClick={showNextOffers} style={{visibility:(offerBtn.next?'visible':'hidden')}}>
                  <img alt='next-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nO2ZSQoCMRBFvy46B1VwZ9UNdOvswgH1diYeQ0oUFBHtdf0yD3r/XkLoDEClUvlvkp77jZYjRtYFo3ySfE1arJFyoopIb/LP7zETsA4YaCTv3+VfEZI3JBHWuct+jyiHGuFhJpKUNf1MJC0rcGDBI6QswYEFj9C8AP9M5Dk4sPARMwRYE1NwED1C8gQBIsYgCdiSBlib/AS08up+EUeVF/c/slZ571uJqPLqfjttLSPv/kBjQeXV/aHegsqL+4st+ylPcD9qzPLgv15Pw0uP+oHjM4LuielJkjxoNO+oRr5SqcANNxV6UqzcpPJzAAAAAElFTkSuQmCC"/>
                  </div>
              </div>
          </div>
        </div>
        <div className='why-ixigo-bus'>
           <div className='ixigo-for-bus'>
              <div className='why-description'>
                 <h2>Why Choose ixigo for Bus Ticket Booking?</h2>
                 <p>ixigo Bus Booking is powered by AbhiBus which is India’s fastest growing online ticket booking platform. AbhiBus is the official ticketing partner of several State Road Transport Corporation (SRTC) operators and over 3500+ private bus partners covering more than 100,000 bus routes</p>
              </div>
              <div className='icons-declaration'>
                 <div className='flex-icon-declaration'>
                    <FaRoute className='route icons' />
                    <div>
                      <p>1,00,000+ Bus Routes</p>
                      <p>offering unparalleled choices for your travel needs</p>
                    </div>
                 </div>
                 <div className='flex-icon-declaration'>
                    <FaBusAlt className='bus icons' />
                    <div>
                      <p>3500+ Bus Partners</p>
                      <p>ranging from State RTCs to private partners</p>
                    </div>
                 </div>
                 <div className='flex-icon-declaration'>
                    <BsFillTicketPerforatedFill className='ticket icons' />
                    <div>
                      <p>Fastest Bus Booking</p>
                      <p>swift and seamless bus ticket booking experience</p>
                    </div>
                 </div>
                 <div className='flex-icon-declaration'>
                    <RiCustomerServiceFill className='customer icons'/>
                    <div>
                      <p>24/7 Customer Support</p>
                      <p>available for all your bus booking needs</p>
                    </div>
                 </div>
                 <div className='flex-icon-declaration'>
                     <RiRefund2Line className='refund icons'/>
                    <div>
                      <p>Instant Refunds</p>
                      <p>with free cancellation when changing or cancelling your booking</p>
                    </div>
                 </div>
                 <div className='flex-icon-declaration'>
                    <RiRefund2Line className='refund icons'/>
                    <div>
                      <p>Best Deals & Discounts</p>
                      <p>Unlock best value with premium deals & exclusive discounts</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Buses