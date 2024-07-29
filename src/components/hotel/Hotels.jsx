import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/Hotel.css";
import dayjs from 'dayjs';
import {Autocomplete, TextField, Box, Typography} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {STATE_CITIES} from "../../components/data.js";
import {FaCity} from "react-icons/fa";
import Crousel from '../common/Crousel.jsx';
import { MdOutlineMeetingRoom, MdOutlinePeopleAlt } from "react-icons/md";
import { LuBaby } from "react-icons/lu";
import img1 from '../../images/img1.webp';
import img2 from '../../images/img2.webp';
import img3 from '../../images/img3.webp';
import img4 from '../../images/img4.webp';
import img5 from '../../images/img5.webp';
import Footer from '../Footer.jsx';
import {POPULAR_DESTINATIONS} from '../../components/data.js'

const Hotels = () => {
  // date picker 
  const [checkInDate, setCheckInDate]= useState(dayjs(new Date()));
    
  const nextDate = new Date(); 
  nextDate.setDate(new Date().getDate() + 1);

  const [checkOutDate, setCheckOutDate]= useState(dayjs(nextDate));

  // useEffect(()=>{
  //   console.log("checkInDate",checkInDate);
  //   console.log("checkOutDate",checkOutDate);
  // },[checkOutDate,checkInDate])

  

  //fething api for offers
 const [offer, setOffers] = useState([]);
 const fetchOffers = ()=>{
    fetch("https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={\"type\":\"HOTELS\"}&&limit=30",{
        method: 'get',
        headers:{
            'projectID': '9h69a26iogeq'
        }
    })
    .then((res)=> res.json())
    .then((result)=> result.data)
    .then((data)=>setOffers(data.offers))
    .catch((err)=> console.log(err));
 }
    useEffect(()=>{  
      window.scroll(0,0);
        fetchOffers(); 
        // console.log(offer);
    },[]);




     //logic for next prev btn popular destination
  const [button, setButton]= useState({prev:false,next:true});
  const popularRef= useRef();
  useEffect(() => {
    const container = popularRef.current;
    const handleScroll = () => {

      if(container.scrollLeft === 0){
        setButton({prev:false,next:true});
      }
      if(container.scrollLeft>0){
        setButton((prev)=>{
          return {...prev, prev:true}
        })
      }
      if(container.scrollLeft + container.clientWidth >= container.scrollWidth){
        setButton({prev:true,next:false});
      }
      if(container.scrollLeft + container.clientWidth < container.scrollWidth){
        setButton((prev)=>{
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
  
  const showPreviousDestination = ()=>{
    const container = popularRef.current;
     let width = container.clientWidth;
     container.scrollLeft = container.scrollLeft - (width*2/3);
    // console.log(width);
  }
  const showNextDestination = ()=>{
    const container = popularRef.current;
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft + (width*2/3);
  }




  //dropdown for input feild guest and rooms 
  const [guestAndRooms, setGuestAndRooms]= useState({adult: 2, room: 1, children: 0});
  const [showGuestsdropdown, setShowGuestsDropdown]= useState(false);
  const guestsDropdownRef = useRef();
  const guestsInputRef = useRef();
  const handleTravellersOutsideClik = (event)=>{
      if(guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target) && guestsInputRef?.current && !guestsInputRef?.current.contains(event.target) ){
        setShowGuestsDropdown(false);
      }
  }
  useEffect(()=>{
      document.addEventListener("mousedown", handleTravellersOutsideClik);
      return ()=>{
          document.removeEventListener("mousedown", handleTravellersOutsideClik);
      }
      
  },[]);


  // handling guests and rooms count
  const handleGuestRoomCountIncrement = (type)=>{
    // console.log("type", type);
    // console.log(guestAndRooms[type]);
    setGuestAndRooms((prev)=>{
        return {...prev, [type]: prev[type] + 1 }
    })
  }

  const handleGuestRoomCountDecrement = (type)=>{
      if(guestAndRooms[type] > 0){
        setGuestAndRooms((prev)=>{
          return {...prev, [type]: prev[type] - 1 }
        })
      }
  }
   

   //handle search submition
  const navigate = useNavigate();
  const [destination, setDestination]= useState({});
  
  const handleSearchSubmission = ()=>{
      if(Object.keys(destination) === 0){
        alert("Please select your destination");
      }else{
        const data = {
          destination,
          checkInDate,
          checkOutDate,
          guests: guestAndRooms
        }
        navigate('search',{state:data});
      }
   }


  //  handle popular destination click
  const [isDestinationUpdated, setIsDestinationUpdated]= useState(false);
  const handlePopularDestinationClick = (destination)=>{
   if(destination.city === 'New Delhi'){
      setDestination({city:"Delhi", state:'Delhi'});
    }else if(destination.city === "Patna"){
      setDestination({city:"Patna, Bihar", state:'Bihar'});
    }else{
      setDestination(destination);
    }
    setIsDestinationUpdated(true);
  }

  useEffect(()=>{
    if(isDestinationUpdated){
      setIsDestinationUpdated(false);
      handleSearchSubmission()
    }
  },[isDestinationUpdated])

    // useEffect(()=>{
    //   console.log("destination",destination);
    //   console.log("chech in date", checkInDate)
    //   console.log("chech out date", checkOutDate)
     
    // },[destination])


  return (
    <div className='hotel-home-page'>
       <div className='hotel-poster'>
           <div className='hotel-poster-heading'>
               <p>Book Hotels</p>
           </div>
           <div className='hotel-search-container'> 
              <div className='hotel-search-box'>
                  <Autocomplete
                  freeSolo
                  disableClearable
                  options={STATE_CITIES}
                  value={ Object.keys(destination).length !== 0 ? destination : {city:'', state:''}} 
                  onChange={(event, newValue) => {
                    setDestination(newValue);
                  }}

                  getOptionLabel={(option) =>  option.city}
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
                      label="Destination"
                      // placeholder='From Station'
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                     
                      
                    />
                   )}
                 />
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{backgroundColor:"#f2f2f2", height:'64px', width:'100%'}}
                      label="Check-in"
                      value={checkInDate}
                      onChange={(newValue) => setCheckInDate(newValue)}
                      format={'ddd, DD MMM'}
                      minDate={dayjs(new Date())}
                    />
                 </LocalizationProvider>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{backgroundColor:"#f2f2f2", height:'64px', width:'100%'}}
                      label="Check-out"
                      value={checkOutDate}
                      onChange={(newValue) => setCheckOutDate(newValue)}
                      format={'ddd, DD MMM'}
                      minDate={dayjs(new Date())}
                    />
                 </LocalizationProvider>
                
                 <div style={{width:'100%',height:'64px',position:'relative'}}>
                 <TextField
                  sx={{backgroundColor:"#f2f2f2", height:'64px', width:'100%'}}
                  id="outlined-basic"
                  label="Rooms & Guests"
                  onFocus={()=>setShowGuestsDropdown(true)}
                  ref={guestsInputRef}
                  value={`${guestAndRooms.room} Rooms, ${guestAndRooms.adult + guestAndRooms.children} Guest`}
                  />
                  {showGuestsdropdown && 
                      <div className='hotel-guest-and-rooms' ref={guestsDropdownRef}>
                          <div className='guest-rooms'>
                             <div>
                                <MdOutlineMeetingRoom className='dropdown-icons' /> 
                                <div>
                                    <p>Rooms</p>
                                    <p>Minimum 1</p>
                                 </div>
                             </div>
                             <div>
                                 <button style={{color:(guestAndRooms.room === 1 ? 'rgb(173, 175, 184)': 'rgb(252,121,13)')}} onClick={()=> handleGuestRoomCountDecrement("room") } disabled={guestAndRooms.room === 1}>-</button>
                                 <p>{guestAndRooms.room}</p>
                                 <button onClick={()=> handleGuestRoomCountIncrement("room") }>+</button>
                             </div>
                          </div>
                          <div className='guest-rooms'>
                              <div>
                                 <MdOutlinePeopleAlt className='dropdown-icons' />
                                 <div>
                                    <p>Adults</p>
                                    <p>13 Years & above</p>
                                 </div>
                              </div>
                              <div>
                                 <button style={{color:(guestAndRooms.adult === 1 ? 'rgb(173, 175, 184)': 'rgb(252,121,13)')}} onClick={()=> handleGuestRoomCountDecrement("adult") } disabled={guestAndRooms.adult === 1}>-</button>
                                 <p>{guestAndRooms.adult}</p>
                                 <button onClick={()=> handleGuestRoomCountIncrement("adult") }>+</button>
                              </div>
                          </div>
                          <div className='guest-rooms' style={{borderBottom:'none',padding:'10px 0px 0px'}} >
                              <div>
                                 <LuBaby className='dropdown-icons' />
                                 <div>
                                    <p>Children</p>
                                    <p>0-12 Years</p>
                                 </div>
                              </div>
                              <div>
                                 <button style={{color:(guestAndRooms.children === 0 ? 'rgb(173, 175, 184)': 'rgb(252,121,13)')}} onClick={()=> handleGuestRoomCountDecrement("children") } disabled={guestAndRooms.children === 0}>-</button>
                                 <p>{guestAndRooms.children}</p>
                                 <button onClick={()=> handleGuestRoomCountIncrement("children") }>+</button>
                              </div>
                          </div>
                      </div>
                  }
                  </div>


                  <button className='search-button' onClick={handleSearchSubmission}>
                    Search
                  </button>
              </div>
           </div>
       </div>
       <div className='hotel-offers'>
           <h2>Offers For You </h2> 
            <Crousel offer={offer} />
       </div>
       <div className='why-ixigo-hotels'>
           <h2>Why Book Hotels With ixigo?</h2>
           <div className='all-img-container'>
              <div>
                <img src={img2} alt="img1" />
              </div>
              <div>
                <img src={img1} alt="img2" />
              </div>
              <div>
                <img src={img3} alt="img3" />
              </div>
              <div>
                <img src={img4} alt="img4" />
              </div>
              <div>
                <img src={img5} alt="img5" />
              </div>
           </div>
       </div>
       <div  className='hotel-popular-destination'>
           <h2>Popular Destinations</h2>
           <div className='img-container'  ref={popularRef}>
             {
                POPULAR_DESTINATIONS.map((destination, index) => {
                  return (

                <div key={index} >
                  <img onClick={()=>handlePopularDestinationClick({"city": destination.city, "state": destination.state})} src={destination.img} alt={destination.city} />
                  <div className='absolute-popular-destination'>
                    <h3>{destination.city}</h3>
                    <p>{destination.state}</p>
                  </div>
                </div>
                  )
                })
              }
              
              
              <div className='popular-destination-next-prev'>
                <div onClick={showPreviousDestination} style={{visibility:(button.prev?'visible':'hidden')}} >
                <img alt='previous-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2ZOw7CQAxEHYr4qEhQ2DkBf0jLR1DA7exzsHRApCSIanckP8n9zHi1Hy9REATB/6SqVjuz+pzwSFUtdmH1xGpPMBPv5NOnDMXEd/LdqsVuVL54P/WL9zst0oTKJVWsfgQVT8TqbYjPAYsfkJPfh/gcsPgOOHnbhvgcsNoGN3mxdYjPAautkJNfwoofNaD2gDAwuoSgTMjADhQmSjnIoDqhA/egMFHKdRqrE97/GgsTpTzqwTrRhomiR4sKs5xGhrsKZQJ2vP7jg6PxGcF+MTVQ4juduLLYNLeSIAgoLy+9z15ZP/8kOAAAAABJRU5ErkJggg=="/>
                </div>

                <div onClick={showNextDestination} style={{visibility:(button.next?'visible':'hidden')}}>
                <img alt='next-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nO2ZSQoCMRBFvy46B1VwZ9UNdOvswgH1diYeQ0oUFBHtdf0yD3r/XkLoDEClUvlvkp77jZYjRtYFo3ySfE1arJFyoopIb/LP7zETsA4YaCTv3+VfEZI3JBHWuct+jyiHGuFhJpKUNf1MJC0rcGDBI6QswYEFj9C8AP9M5Dk4sPARMwRYE1NwED1C8gQBIsYgCdiSBlib/AS08up+EUeVF/c/slZ571uJqPLqfjttLSPv/kBjQeXV/aHegsqL+4st+ylPcD9qzPLgv15Pw0uP+oHjM4LuielJkjxoNO+oRr5SqcANNxV6UqzcpPJzAAAAAElFTkSuQmCC"/>
                </div>
              </div>

           </div>
       </div>
       <Footer/>
    </div>
  )
}

export default Hotels