import React,{ useEffect, useState, useRef, useContext} from 'react'
import "../../styles/Hotel.css";
import '../../styles/SearchHotel.css';
import dayjs from 'dayjs';
import {Autocomplete, TextField, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Stack} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {STATE_CITIES} from "../../components/data.js";
import {FaCity,FaCheck} from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { MdOutlineMeetingRoom, MdOutlinePeopleAlt, MdExpandMore, MdOutlineSpa, MdLocalBar } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { GrSwim } from "react-icons/gr";
import { LuBaby } from "react-icons/lu";
import { useLocation, useNavigate } from 'react-router-dom';
import {Slider} from "@mui/material";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import checkInImg from '../../images/check-in-key.png';
import { GlobalContext } from '../../context/Contexts.js';
import Login from '../Login.jsx';
import NoHotelsFound from './NoHotelsFound.jsx';
import Footer from '../Footer.jsx';

const SearchHotel = () => {
    const [filterObj, setFilterObj]= useState({});
    const [sortSelectedOption, setSortSelectedOption]= useState({});

    //  carousel responsive object
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        //   slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        //   slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        //   slidesToSlide: 1 // optional, default to 1.
        }
      };

    // date picker 
    const [checkInDate, setCheckInDate]= useState(dayjs(new Date()));

    const nextDate = new Date(); 
    nextDate.setDate(new Date().getDate() + 1);

    const [checkOutDate, setCheckOutDate]= useState(dayjs(nextDate));
     

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


    //price range slider filter
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const updatePriceRange = (e, val)=>{
        setPriceRange(val);
        setFilterObj((pre)=>{
            return {...pre, "avgCostPerNight":{"$lte":val[1],"$gte":val[0]}}
        })
        
    }

    //filter by rating
    const [rating, setRating] = useState({});
      const handleRatingChange = (e)=>{
        const {value, checked}= e.target;
        if(checked){
            setFilterObj((pre)=>{
                return {...pre, "rating":{"$lte":5,"$gte":Number(value)}}
            })
            setRating({value: Number(value)});
        }else{
            const {rating, ...rest}= filterObj;
            setFilterObj(rest);
            setRating({});
        }  
        //   console.log(rating);
      }



    //sorting of bus
    const [sortSelected, setSortSelected]= useState({value:'Popularity', name:'Popularity'});
    const handleSortChange = (value)=>{
        if(sortSelected === value){
            setSortSelected("");
            setSortSelectedOption({});
        }else{
            if(value === "Popularity" || value === "User Rating" ){
                setSortSelectedOption({"rating": -1});
                setSortSelected({value, name:value});
            }else if(value === "highprice"){
                setSortSelectedOption({"avgCostPerNight": -1});
                setSortSelected({value, name:"Price High to Low"});
            }
            else{
                setSortSelectedOption({"avgCostPerNight":1});
                setSortSelected({value, name:"Price Low to High"});
            }
            //  console.log(value);
             
        }
    }




    //conditional based search card content
    const iconStyle = {
        margin: '3px 5px 0px 0px',
        color:'#238C46',
        height:'12px',
        width:'12px'
    }
    const renderContent = (index) => {
        if (index % 3 === 0) {
          return (
            <div>
              <p><span><FaCheck style={iconStyle} /></span>Free Cancellation available</p>
              <p><span><FaCheck style={iconStyle} /></span>Free Wifi</p>
            </div>
          );
        } else if (index % 5 === 0) {
          return (
            <div>
              <p><span><FaCheck style={iconStyle} /></span>Free Wifi</p>
              <p><span><FaCheck style={iconStyle} /></span>Swimming pool at the property</p>
            </div>
          );
        } else if (index % 7 === 0) {
          return (
            <div>
              <p><span><FaCheck style={iconStyle} /></span>Breakfast Included</p>
              <p><span><FaCheck style={iconStyle} /></span>Free Cancellation available</p>
            </div>
          );
        } else {
          return (
            <div>
              <p><span><FaCheck style={iconStyle} /></span>Free Wifi</p>
            </div>
          );
        }
    };
     

    const ammenitiesStyle ={
        height:'20px',
        width:'15px',
        color:'#17181c',
        // margin:'0px 5px 0px 0px',
        // paddingTop:'5px'
        
    }
    const ammenities = (type, index)=>{
       if(type === 'Gym'){
        return (
            <div key={index}>
                <IoIosFitness style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
       }else if(type === 'Spa'){
        return (
            <div key={index}>
                <MdOutlineSpa style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
       }else if(type === 'Bar'){
        return (
            <div key={index}>
                <MdLocalBar style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
       }else if(type === 'Restaurant'){
        return (
            <div key={index}>
                <IoRestaurant style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
       }else if(type === 'Swimming Pool'){
        return (
            <div key={index}>
                <GrSwim style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )  
       }
    }



     //accessing searched value on hotel home page
     const [destination, setDestination]= useState({});
     const location = useLocation();
     const [isNavigated, setIsNavigated]= useState(false);
    //  const [inputIndex, setInputIndex]= useState({to:{},from:{}});
    useEffect(()=>{
        const {destination, checkInDate, checkOutDate, guests} = location.state || {};
        if(destination){
            setDestination(destination);
            
            //changing the date format to date object 
            const checkinDateObject = checkInDate.$d;
            setCheckInDate(dayjs(checkinDateObject));

            const checkoutDateObject = checkOutDate.$d;
            setCheckOutDate(dayjs(checkoutDateObject));

            setGuestAndRooms(guests);

            setIsNavigated(true);
        }
    },[location.state]);


    //feching buses
    const [hotels, setHotels]=useState([]);
    const fetchBuses = (destination,day)=>{
      const filterString = Object.keys(filterObj).length !== 0 
        ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` 
        : "";
    //sortSelectedOption
    const sortString = Object.keys(sortSelectedOption).length !== 0 
          ? `&sort=${encodeURIComponent(JSON.stringify(sortSelectedOption))}` 
          : "";
      const url = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&day=${day}${filterString}${sortString}`
        fetch(url, 
        {
            method: 'get',
            headers:{
                'projectID': '9h69a26iogeq'
            }
        })
        .then((response) => response.json())
        .then((result) =>{
            setHotels(result.data.hotels);
            // console.log(result.data.hotels);
        
        })
        .catch((error) => console.log(error));

  }



 //hadling searches on search page
  const handleSubmition = ()=>{ 
    //   console.log("inside handle submition");
      const day = checkInDate.format('ddd');
      if(Object.keys(destination).length === 0){
        alert("Please enter your destination");
      }else{ 
        //   console.log("handle submition -->", destination.city, day);
          fetchBuses(destination.city, day);  
      }
  }
  useEffect(()=>{
      if(Object.keys(destination).length !== 0 ){
        handleSubmition();
      }
  },[filterObj, sortSelectedOption, isNavigated]);

    // useEffect(()=>{
    //     console.log("filterObj",filterObj);
    //     console.log("sortSelectedOption",sortSelectedOption);
    //     console.log("hotels", hotels)   
    // },[filterObj, sortSelectedOption, hotels])

    // useEffect(()=>{
    //     console.log("destination",destination);
    // },[destination])

    

    //handling accordian outside click
    const accordianRef = useRef();
    const accordianDetailsRef = useRef();
    const [isExpended, setIsExpended]= useState(false);
    const handleOutsideClick = (e) => {
        if(!accordianRef.current.contains(e.target) && !accordianDetailsRef.current.contains(e.target)){
            setIsExpended(false)
        }
    }
  

    useEffect(()=>{
        document.addEventListener('mousedown',handleOutsideClick);
        return () => document.removeEventListener('mousedown',handleOutsideClick);
    },[])





    const navigate = useNavigate();
    const {loginModalOpen, setLoginModalOpen} = useContext(GlobalContext);
    const jwtToken =  localStorage.getItem("token");
    const handleBooking = (hotel)=>{
        if(jwtToken){
            navigate('book', {state: hotel});
        }else{
            setLoginModalOpen(true);
        }
    }

    useEffect(()=>{
        window.scroll(0,0);
    },[])

  return (
    <div className='hotel-search-page'>
        <div className='search-hotel-container'>

              <div className='hotel-search-box'>
                  <Autocomplete
                  freeSolo
                  disableClearable
                  options={STATE_CITIES}

                  value={Object.keys(destination).length !== 0? destination : {city:'', state:''}}

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
                        {/* <Typography sx={{fontSize:'18px', margin:'0px',lineHeight:1.2}} variant='h6' >{option.split(", ")[0]} </Typography>
                        <Typography sx={{fontSize:'14px', margin:'0px',lineHeight:1}} variant='subtitle1' > {option.split(", ")[1]}</Typography> */}
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
                      minDate={checkInDate}
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


                  <button onClick={handleSubmition} className='search-button'>
                    Search
                  </button>
              </div>
        </div>

        <div className='hotel-filter-searchcard'>
                  <div className='hotel-filter'>
                      <h3>Filters</h3>
                      <div className='hotel-filter-range'>
                            <p>Price</p>
                            <div className='hotel-filter-range-box'>
                                 <Slider
                                  sx={{
                                    ".MuiSlider-thumb": {bgcolor: 'white', height: '25px', width:'25px', border:'0.5px solid #0770E4'},
                                    ".MuiSlider-track":{bgcolor: '#0770E4', height:"1px"},
                                    ".MuiSlider-rail":{bgcolor: '#0770E4'},
                                   
                                  }}
                                  value={priceRange}
                                  min={2000}
                                  max={10000}
                                  onChange={updatePriceRange}
                                 />
                                 <div className='price-display'>
                                    <p>₹{priceRange[0]}</p>
                                    <p>₹{priceRange[1]}</p>
                                 </div>
                               
                            </div>
                        </div>
                        <div className='hotel-user-rating'>
                            <p>User Rating</p>
                            <div className='user-rating'>
                               <p>Exceptional: 9+</p>
                               <input value={4.5} checked={rating.value === 4.5} onChange={handleRatingChange} type='radio' />
                            </div>
                            <div className='user-rating'>
                                <p>Excellent: 8+</p>
                                <input value={4} checked={rating.value === 4} onChange={handleRatingChange} type='radio' />
                            </div>
                            <div className='user-rating'>
                                <p>Very Good: 7+</p>
                                <input value={3.5} checked={rating.value === 3.5} onChange={handleRatingChange} type='radio' />
                            </div>
                            <div className='user-rating'>
                                <p>Good: 6+</p>
                                <input value={3} checked={rating.value === 3} onChange={handleRatingChange} type='radio' />
                            </div>
                            <div className='user-rating'>
                                <p>Pleasant: 5+</p>
                                <input value={2.5} checked={rating.value === 2.5} onChange={handleRatingChange} type='radio' />
                            </div>
                            
                        </div>
                  </div>
                  <div className='hotel-searchCard'>
                    <div className='hotel-searchCard-header'>
                        <p>Showing Properties{Object.keys(destination).length !== 0?` in ${destination.city}`:""}</p>
                             <Accordion
                                expanded={isExpended}
                                onChange={()=>setIsExpended(!isExpended)}
                                ref={accordianRef}
                                    sx={{
                                        border:'1px solid rgb(7,112,228)',
                                        height:'50px',
                                        width:'100%',
                                        minWidth:'185px',
                                        maxWidth:'240px',
                                        borderRadius:'15px',
                                      
                                    }}
                                  >
                                        <AccordionSummary
                                        expandIcon={<MdExpandMore style={{width:'20px', height:'20px', color: '#212121'}} />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                            color:'#17181c',
                                            fontWeight:'500', 
                                            fontSize:'16px',
                                        }}
                                        >
                                          {sortSelected.name}
                                        </AccordionSummary>
                                        <AccordionDetails
                                         ref={accordianDetailsRef}
                                          sx={{
                                              width:'100%',
                                              minWidth:'185px',
                                              maxWidth:'240px',
                                              backgroundColor:'white', 
                                              position:'absolute',
                                              top:52,
                                              zIndex:20,
                                              boxShadow:'0 0 10px 0 rgba(0, 0, 0, .1)',
                                              padding:'15px',
                                              borderRadius:'15px',
                                              boxSizing:'border-box'
                                          }}
                                        >
                                        
                                            <Stack
                                             direction={'row'}
                                             spacing={'10px'}
                                             padding={'10px 0px'}
                                             alignItems={'center'}
                                            >
                                                <input type='radio' checked={sortSelected.value === 'Popularity'} onChange={()=> handleSortChange('Popularity')} />
                                                <Box className='sort-name'>
                                                    <p>Popularity</p>
                                                </Box>
                                            </Stack>
                                            <Stack
                                             direction={'row'}
                                             spacing={'10px'}
                                             padding={'10px 0px'}
                                             alignItems={'center'}
                                            >
                                                <input type='radio' checked={sortSelected.value === 'lowprice'} onChange={()=> handleSortChange('lowprice')} />
                                                <Box className='sort-name'>
                                                    <p>Price</p>
                                                    <p>Low to High</p>
                                                </Box>
                                            </Stack>
                                            <Stack
                                             direction={'row'}
                                             spacing={'10px'}
                                             padding={'10px 0px'}
                                             alignItems={'center'}
                                            >
                                                <input type='radio' checked={sortSelected.value === 'highprice'} onChange={()=> handleSortChange('highprice')} />
                                                <Box className='sort-name'>
                                                    <p>Price</p>
                                                    <p>High to Low</p>
                                                </Box>
                                            </Stack>
                                            <Stack
                                             direction={'row'}
                                             spacing={'10px'}
                                             padding={'10px 0px'}
                                             alignItems={'center'}
                                            >
                                                <input type='radio' checked={sortSelected.value === 'User Ratings'} onChange={()=> handleSortChange('User Rating')} />
                                                <Box className='sort-name'>
                                                    <p>User Rating</p>
                                                    <p>Highest First</p>
                                                </Box>
                                            </Stack>
                                        
                                          
                                        </AccordionDetails>
                                </Accordion>

                    </div>
                     <div className='hotel-card-container'>
                        {

                            hotels.length > 0?
                            (hotels.map((hotel, index)=>{
                                const rating = hotel.rating;

                                return(

                                    <div className='hotel-card'>
                                        <div className='card-image-crousel'>
                                            <Carousel
                                            showDots={true}
                                            responsive={responsive} 
                                            >
                                                {
                                                    hotel.images.map((image, index)=>{
                                                        return(

                                                                <div key={index} className='image-box'>
                                                                    <img src={image} alt='hotel-img' />
                                                                </div>
                                                        )
                                                    })
                                                }
                                            </Carousel>
                                        </div>
                                        <div className='card-details'>
                                        <div className='all-details'>
                                            <div className='name-destination'>
                                                <p>{hotel.name}</p>
                                                <p>{hotel.location.split(', ')[0]} &bull; {hotel.location.split(', ')[1]}</p>
                                            </div>
                                            <div className='rating'>
                                                <div><p>{rating * 2}</p></div>
                                                <p>
                                                    {rating <= 5 && rating >= 4.5? "Exceptional" : rating <= 4.5 && rating >= 4? "Excellent" : rating <= 4 && rating >= 3.5? "Very Good" : rating <= 3.5 && rating >= 3? "Good": ""}
                                                </p>
                                            </div>
                                            <div className='check-title'>
                                                {
                                                    renderContent(index)
                                                }
                                            </div>
                                            <div className='ammenities'>
                                                <div>
                                                    <img style={{height:'20px',width:'20px',objectFit:'cover'}} src={checkInImg} alt='check-in'/>
                                                    <p>24*7 Check-in</p>
                                                </div>
                                                {
                                                    hotel.amenities.map((ammenity, index)=>{
                                                       return ammenities(ammenity , index);
                                                    })
                                                }
                                            </div>
                                        </div> 
                                        <div className='price-book'>
                                          {hotel.rooms.length <= 7?
                                           ( <div className='rooms-left'>
                                                <p>{hotel.rooms.length} rooms left</p>
                                            </div>)
                                            : null
                                           }
                                            <div className='price'>
                                                <p>₹{Math.ceil(hotel.avgCostPerNight)}</p>
                                                <p>+₹{Math.ceil(hotel.avgCostPerNight*18/100)} taxes & fees per night, per room</p>
                                            </div>
                                            <button onClick={()=> handleBooking(hotel)}>Book Now</button>
                                        </div> 
                                        </div>
                                    </div>
                                )
                            }))
                             :
                            (
                                <NoHotelsFound/>
                            )
                        }
                     </div>
                  </div>
        </div>
        
        <Footer/>

        {
            loginModalOpen?
            <Login/>:
            null
        }

    </div>
  )
}

export default SearchHotel