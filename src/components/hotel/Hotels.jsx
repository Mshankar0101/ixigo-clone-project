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
        fetchOffers(); 
        // console.log(offer);
    },[]);




     //logic for next prev btn offer section
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
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/dde2dd1fcb479de427de8d2ea142b589-jhisq.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>New Delhi</h3>
                  <p>DELHI</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/b90de6368f4aa8ec7bc8ed017c8854ab-agxmk.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Mumbai</h3>
                  <p>MAHARASHTRA</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/6fd6c6f732fa41d2628befc44dae6dc9-fizcu.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Goa</h3>
                  <p>GOA</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/f12d03b22a387022e80991101a0ad94e-bttxc.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Chennai</h3>
                  <p>TAMIL NADU</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/12197f92305a7f21f93410c53833e4f8-nfboj.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Kolkata</h3>
                  <p>WEST BENGAL</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/051595de7e3d11e09c0d50e9cee88475-qobtm.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Hyderabad</h3>
                  <p>TELANGANA</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/node_image/f_auto/entityId/503b2a95e4b032e338f14729.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Bengaluru</h3>
                  <p>Karnataka</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/e83be5f1f4fca3ae14f04c8b639fd124-tinbn.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Jaipur</h3>
                  <p>Rajasthan</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-locations/4e084232898bd6e91579f6ced30d11ba-xygmo.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Varanasi</h3>
                  <p>UTTAR PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/34ba35441a8c517def8a16d52df689d0-igvob.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Pune</h3>
                  <p>MAHARASHTRA</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-locations/81a78e561f5987b0f1052c8f27b071fd-gmryb.webp' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Ayodhya</h3>
                  <p>UTTAR PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/9cdb603b2097211fe72e2f2fd7414e67-nlmvf.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Puri</h3>
                  <p>ODISHA</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/ee2523a0e1e4a5ee7c03b7b11998245c-toqvb.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>LUCKNOW</h3>
                  <p>UTTAR PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/30f2db54ab34c2ec091fb73e30ea1cf0-jqkwp.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Amritsar</h3>
                  <p>PUNJAB</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/48c019b8ed21737ee44f0d3b365ea08a-qqigu.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Guwahati</h3>
                  <p>ASSAM</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/46b6bb554bd8c8010de05c8c0f1fe085-opeqr.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Agra</h3>
                  <p>UTTAR PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-locations/63a279e425dc79593c0f8259e3f31ca4-eahjx.jpeg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Shirdi</h3>
                  <p>MAHARASHTRA</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-locations/716110e6077ddc56ab3c290feaf44226-ytpot.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Ahmedabad</h3>
                  <p>GUJARAT</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/e20807bcfc19e6d9507aa8b3b422121e-eoquz.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Tirupati</h3>
                  <p>ANDHRA PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/e81c33aaece67c1c960b5584d00d32fc-fsfoh.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Manali</h3>
                  <p>HIMACHAL PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/839b81b08e16b9f4f09e2ec976fbc9ea-bfhyz.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Shimla</h3>
                  <p>HIMACHAL PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-locations/394b5710a383cc1650cc32516f18cbda-qktyq.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Visakhapatnam</h3>
                  <p>ANDHRA PRADESH</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-locations/37a1f5e05ed77effa2bc6eb1a48e516c-bdghy.jpeg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Katra</h3>
                  <p>JAMMU AND KASHMIR</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/c52f879cf26f55cca204a77da56059a5-kkfox.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Patna</h3>
                  <p>BIHAR</p>
                </div>
              </div>
              <div >
                <img src='https://images.ixigo.com/image/upload/f_auto/accommodations/popular-location-v2/f7ea20d19978a5d8ea749da19935a551-trnqx.jpg' alt='new delhi' />
                <div className='absolute-popular-destination'>
                  <h3>Ooty</h3>
                  <p>TAMIL NADU</p>
                </div>
              </div>

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