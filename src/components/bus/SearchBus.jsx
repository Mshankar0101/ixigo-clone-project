import React,{useEffect, useState, useContext} from 'react';
import {Autocomplete, TextField, Box, Typography, InputAdornment,Slider, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import { MdLocationPin } from "react-icons/md";
import { FaBus, FaCity, FaWifi, FaInbox, FaStar} from "react-icons/fa";
import {STATE_CITIES} from "../../components/data.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/BusSearch.css';
import { TbAirConditioning } from "react-icons/tb";
import { TbAirConditioningDisabled } from "react-icons/tb";
import sunrise from '../../images/sunrise.png';
import cloudy from '../../images/cloudy.png';
import sun from '../../images/sun.png';
import cloudynight from '../../images/cloudy-night.png';
import { FaBottleWater, FaChargingStation } from "react-icons/fa6";
import { BiSolidBlanket } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";
import { useLocation } from 'react-router-dom';
import NoBusesFound from './NoBusesFound.jsx';
import Footer from '../Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/Contexts.js';
import Login from '../Login.jsx';

const SearchBus = () => {
    const [filterObj, setFilterObj]= useState({});
    

    //search feild values
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fromValue, setFromValue] = useState({});
    const [toValue, setToValue] = useState({});


    //sorting of bus
    const [sortSelectedOption, setSortSelectedOption]= useState({});
    const [sortSelected, setSortSelected]= useState("");
    const handleSortChange = (value)=>{
        if(sortSelected === value){
            setSortSelected("");
            setSortSelectedOption({});
        }else{
            if(value === "seats" || value === "ratings"){
                setSortSelectedOption({[value]: -1});
            }else{
                setSortSelectedOption({[value]:1});
            }
            //  console.log(value);
             setSortSelected(value);
        }
    }


    // price filter
    const [priceRange, setPriceRange] = useState([500, 3000]);
    const updatePriceRange = (e, val)=>{
        setPriceRange(val);
        setFilterObj((pre)=>{
            return {...pre, "fare":{"$lte":val[1],"$gte":val[0]}}
        })
       
    }


    //departure time filter 
    const [isTime, setIsTime]=useState({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false});
    // const [departureTime, setDepartureTime]=useState({});
    const earlymorningFlights = ()=>{
        if(isTime.isEarlymorningFlights){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"06:00","$gte":"01:00"}}
            })
            // setDepartureTime({"$lte":"06:00","$gte":"01:00"});
            setIsTime({isEarlymorningFlights:true,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
        }
    }
    const morningFlights = ()=>{
        if(isTime.isMorningFlights){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"12:00","$gte":"06:00"}}
            })
            // setDepartureTime({"$lte":"12:00","$gte":"06:00"});
            setIsTime({isEarlymorningFlights:false,isMorningFlights:true,isMiddayFlights:false,isNightFligh:false})
        }
    }
    const middayFlights = ()=>{
        if(isTime.isMiddayFlights){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"18:00","$gte":"12:00"}}
            })
            // setDepartureTime({"$lte":"18:00","$gte":"12:00"});
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:true,isNightFligh:false})
        }
       
    }
    const nightFlights = ()=>{
        if(isTime.isNightFligh){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false});
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"23:59","$gte":"18:00"}}
            })
            // setDepartureTime({"$lte":"23:59","$gte":"18:00"});
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:true});
        }
        
    }


    // bus type filter
    const [type, setType]= useState({ac:false, nonAc:false});
    const handleBusTypeFilter = (busType)=>{
          if(busType === "ac" &&  type.ac === false){
            setFilterObj((pre)=>{
               return {...pre , "type": "AC"} 
            })
            setType({ac:true, nonAc:false});
          }
          else if(busType === "nonAc" &&  type.nonAc === false){
            setFilterObj((pre)=>{
                return {...pre , "type": "Non-AC"} 
             })
             setType({ac:false, nonAc:true});
          }
          else{
            const {type, ...rest}= filterObj;
            setFilterObj(rest);
            setType({ac:false, nonAc:false});
          }
    }



    //formatted date for search card
    const formattedDate = (date)=>{
      const dateObj = new Date(date);
      const options = { weekday: 'short', day: '2-digit', month: 'short' };
      // const formattedDate = dateObj.toLocaleDateString('en-US', options);  
      return dateObj.toLocaleDateString('en-US', options);  

    }

  //duration
  function calculateDuration(departureTime, arrivalTime) {
      

    // Parse the departure and arrival times
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
  
    // Create Date objects for both times on the same day
    const depDate = new Date();
    depDate.setHours(depHours, depMinutes, 0, 0);
  
    const arrDate = new Date();
    arrDate.setHours(arrHours, arrMinutes, 0, 0);
  
    // If the arrival time is before the departure time, add one day to the arrival time
    let isNextDate = false;
    if (arrDate < depDate) {
      arrDate.setDate(arrDate.getDate() + 1);
      isNextDate = true;
    }
  
    // Calculate the difference in milliseconds
    const durationMs = arrDate - depDate;
  
    // Convert the difference to hours and minutes
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return {time: `${durationHours} hour${durationHours !== 1 ? 's' : ''} ${durationMinutes} minute${durationMinutes !== 1 ? 's' : ''}`, isNextDate};
  }   



  // logic to update selected seat and total price

  const allSeats = Array.from({length : 18});
  // const initialArray = Array.from({ length: 30 }, () => Array(18).fill(false));
  const [upperSeatsArr, setUpperSeatsArr]= useState(Array.from({ length: 30 }, () => Array(18).fill(false)));
  const [seatsCount, setSeatsCount]=useState(Array(30).fill(0))
  const handleUpperSeatsClick = (indexOfHotelCard, indexOfSeat)=>{
    // console.log("inside upper click")
     if(upperSeatsArr[indexOfHotelCard][indexOfSeat] === false){
          setSeatsCount((prevArr)=>{
             const newArr = [...prevArr];
             newArr[indexOfHotelCard]++;
            //  console.log(newArr);
             return newArr;
          })
     }else{
          setSeatsCount((prevArr)=>{
            const newArr = [...prevArr];
            if(newArr[indexOfHotelCard] > 0){
              newArr[indexOfHotelCard]--;
            }
            return newArr;
        })
     } 

     setUpperSeatsArr((prevArr)=>{
      // console.log(" upper click updating")
          const newArr = [...prevArr];
          if(newArr[indexOfHotelCard][indexOfSeat]=== false){
            newArr[indexOfHotelCard][indexOfSeat] = true;
          }else{
            newArr[indexOfHotelCard][indexOfSeat] = false;
          }
          
          return newArr;
     })

  }

  const [lowerSeatsArr, setLowerSeatsArr]= useState(Array.from({ length:30}, () => Array(18).fill(false)));
  const handleLowerSeatsClick = (indexOfHotelCard, indexOfSeat)=>{
    // console.log("inside lower click", indexOfHotelCard, indexOfSeat);
     if(lowerSeatsArr[indexOfHotelCard][indexOfSeat] === false){
          setSeatsCount((prevArr)=>{
             const newArr = [...prevArr];
             newArr[indexOfHotelCard]++;
             return newArr; 
          })
     }else{
          setSeatsCount((prevArr)=>{
            const newArr = [...prevArr];
            if(newArr[indexOfHotelCard] > 0){
              newArr[indexOfHotelCard]--;
            }
            return newArr;
        })
     } 

     setLowerSeatsArr((prevArr)=>{
      // console.log(" lower click updating")
          const newArr = [...prevArr];
          if(newArr[indexOfHotelCard][indexOfSeat]=== false){
            newArr[indexOfHotelCard][indexOfSeat] = true;
          }else{
            newArr[indexOfHotelCard][indexOfSeat] = false;
          }
        return newArr;
          
     })

  }

  // useEffect(()=>{
  //   console.log("seatsCount",seatsCount)
  //   console.log("lowerSeatsArr",lowerSeatsArr)
  //   console.log("upperSeatsArr",upperSeatsArr)
  // },[seatsCount])
  



   //accessing searched value on train home page
   const location = useLocation();
   const [isNavigated, setIsNavigated]= useState(false);
   useEffect(()=>{
    const {fromValue,toValue,currentDate} = location.state || {};
    if(fromValue && toValue){
      setFromValue(fromValue);
      setToValue(toValue);
      setCurrentDate(currentDate);
      setIsNavigated(true);
      // console.log("accessing feild values");
    }
   },[location.state]);


  
   //feching buses
   const [buses,setBuses]=useState([]);
      const fetchBuses = (source,destination,day)=>{
        const filterString = Object.keys(filterObj).length !== 0 
          ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` 
          : "";
      //sortSelectedOption
      const sortString = Object.keys(sortSelectedOption).length !== 0 
            ? `&sort=${encodeURIComponent(JSON.stringify(sortSelectedOption))}` 
            : "";
          // `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}${Object.keys(filterObj).length !== 0 ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` : "" }`
        const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${source}","destination":"${destination}"}&day=${day}${filterString}${sortString}`
          fetch(url, 
          {
              method: 'get',
              headers:{
                  'projectID': '9h69a26iogeq'
              }
          })
          .then((response) => response.json())
          .then((result) =>{
            setBuses(result.data.buses);
              // console.log(result.data.buses);
          
          })
          .catch((error) => console.error(error));

    }



   //hadling searches on search page
    const handleSubmition = ()=>{ 
        // console.log("inside handle submition");
        var daysArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var day = daysArr[currentDate.getDay()];
        if(Object.keys(fromValue).length === 0){
          alert("Please enter From Location");
        }else if(Object.keys(toValue).length === 0){
          alert("Please enter To Location");
        }else{ 
            // console.log("handle submition -->", fromValue.city,toValue, day);
            fetchBuses(fromValue.city, toValue.city, day);  
        }
    }
    useEffect(()=>{
        // console.log("useeffect");
        if(Object.keys(fromValue).length !== 0 && Object.keys(toValue).length !== 0){
          handleSubmition();
        }
    },[filterObj, sortSelectedOption, isNavigated]);


    //  handling book show avaibility and book click
  const [isOpen, setIsOpen]= useState(Array(buses.length).fill(false));
  
  const handleShowSeatsClick = (index)=>{
    setIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    
  }
    

  const navigate = useNavigate();
    const {loginModalOpen, setLoginModalOpen} = useContext(GlobalContext);
    const jwtToken =  localStorage.getItem("token");
    const handlePayment = (seats, fare)=>{
      let data;
        if(jwtToken){
            if(seats > 0){
              let price = seats*fare;
              data = {
                total: price
              }
            }else{
              data = {
                total: fare
              }
            }
            navigate("payment", {state: data})
        }else{
            setLoginModalOpen(true);
        }
    }

    
  

     useEffect(()=>{
      window.scroll(0,0);
    },[])

  //  useEffect(()=>{
  //    console.log("filterObj", filterObj);
  //    console.log("sortSelectedOption", sortSelectedOption);
  //    console.log("fromValue",fromValue);
  //    console.log("toValue",toValue);
  //  },[filterObj, sortSelectedOption, fromValue, toValue])

  return (
    <div className='bus-search-page'>
          <div className='bus-search-container' style={{position:'relative',top:'0px'}}>
            <div className='bus-search-box'>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  
                 
                  value={Object.keys(fromValue).length !== 0? fromValue : {city:'',state:''}}
                  onChange={(event, newValue) => {
                    setFromValue(newValue);
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
                    setToValue(newValue.city);
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
                  monthsShown={2}
                  minDate={new Date()}
                  onKeyDown={(e) => {
                        e.preventDefault();
                  }}
                />
                <button className='search-button' onClick={handleSubmition}>Search</button>
            </div>
          </div>
          <div className='bus-sort'>
                <div>Sort By:</div>
                <div><p className={sortSelected=== "fare"?'second-clicked':"second"} onClick={()=>handleSortChange('fare')}>Price</p></div>
                <div><p className={sortSelected=== "seats"?'third-clicked':"third"}onClick={()=>handleSortChange('seats')}>Seats</p></div>
                <div><p className={sortSelected=== "ratings"?'fourth-clicked':"fourth"} onClick={()=>handleSortChange('ratings')}>Rating</p></div>
                <div><p className={sortSelected=== "arrivalTime"?'fifth-clicked':"fifth"}onClick={()=>handleSortChange('arrivalTime')}>Arrival Time</p></div>
                <div><p className={sortSelected=== "departureTime"?'sixth-clicked':"sixth"} onClick={()=>handleSortChange('departureTime')}>Departure Time</p></div>
         </div>
         <div className='bus-filter-searchCard-main'>
            <div className='bus-filter-searchCard'>
                <div className='bus-filter'>
                    <h3>Filters</h3>
                    <div className='bus-type'>
                        <p>Bus Type</p>
                        <div className='bus-type-list'>
                            <div style={{border: (type.ac? '1px solid #DC6437': 'none')}} className='ac' onClick={()=>handleBusTypeFilter("ac")}>
                                <TbAirConditioning className={type.ac? 'acIcon-clicked': 'acIcon'}/>
                                <p style={{color: (type.ac? '#DC6437': 'rgb(94,97,110)')}}>AC</p>
                            </div>
                            <div style={{border: (type.nonAc? '1px solid #DC6437': 'none')}} className='non-ac'onClick={()=>handleBusTypeFilter("nonAc")}>
                                <TbAirConditioningDisabled className={type.nonAc? 'non-ac-icon-clicked': 'non-ac-icon'}/>
                                <p style={{color: (type.nonAc? '#DC6437': 'rgb(94,97,110)')}}>Non AC</p>
                            </div>
                        </div>
                    </div>
                    <div className='bus-price-range'>
                                <p>Price Range</p>
                                <div className='bus-filter-range-box'>
                                    <Slider
                                      sx={{
                                        ".MuiSlider-thumb": {bgcolor: '#DC6437', height: '25px', width:'25px', border:'0.5px solid orange'},
                                        ".MuiSlider-track":{bgcolor: '#DC6437', height:"1px"},
                                        ".MuiSlider-rail":{bgcolor: '#DC6437'},
                                      
                                      }}
                                      value={priceRange}
                                      min={500}
                                      max={3000}
                                      onChange={updatePriceRange}
                                    />
                                    <div className='price-display'>
                                        <p>{priceRange[0]}</p>
                                        <p>{priceRange[1]}</p>
                                    </div>
                                  
                                </div>        
                    </div>
                    <div className='bus-filter-main'>
                              <div className='filter-time'>
                                    <p className='departure'>Departure Time</p>
                                <div className='bus-filter-time'> 
                                    <div className='morning-day-night'>
                                        <div className={(isTime.isEarlymorningFlights?'icon-div-border': 'icon-div')} onClick={earlymorningFlights}>
                                            <img alt='sunrise' src={sunrise}/>
                                            <p>Early Morning</p>
                                            <p>Before 6AM</p>
                                        </div>
                                        <div className={(isTime.isMorningFlights?'icon-div-border': 'icon-div')} onClick={morningFlights}>
                                            <img alt='morning' src={sun} />
                                            <p>Morning</p>
                                            <p>6AM-12PM</p>
                                        </div>
                                    </div>
                                    <div  className='morning-day-night'>
                                            <div className={(isTime.isMiddayFlights?'icon-div-border': 'icon-div')}  onClick={middayFlights}>
                                                <img alt='midday' src={cloudy} />
                                                <p>Mid Day</p>
                                                <p>12PM-6PM</p>
                                            </div>
                                            <div className={(isTime.isNightFligh?'icon-div-border': 'icon-div')} onClick={nightFlights}>
                                                <img alt='cloudynight' src={cloudynight} />
                                                <p>Night</p>
                                                <p>After 6pm</p>
                                            </div>
                                    </div>
                                  </div>
                            </div>        
                    </div>
                    
                </div>
                <div style={{ width:'100%'}} className='search-cards'>
                { 
                  buses.length > 0?
                    ( buses.map((bus, i)=>{
                        const duration = calculateDuration(bus.departureTime, bus.arrivalTime);
                        const departureDate = formattedDate(currentDate);
                        const nextDate = new Date(currentDate); // create a copy of the current date
                              nextDate.setDate(currentDate.getDate() + 1);
                        const arrivalDate = formattedDate(nextDate)
                        return (<div key={i} className='bus-searchCard-seats'>
                          <div className='bus-searchCard'>
                            <div className='name-rating-amenities'>
                                <div className='name-type'>
                                    <h2>{bus.name}</h2>
                                    {
                                      bus.type === 'AC' ?
                                      <div> <TbAirConditioning style={{height:'20px', width:'20px', color:'#DC6437'}} /> <span>AC</span></div>
                                      :
                                      <div> <TbAirConditioningDisabled style={{height:'20px', width:'20px', color:'#DC6437'}} /> <span>Non-AC</span></div>
                                    }
                                </div>
                                <div className='rating-amenities'>
                                    <div >
                                      <FaStar style={{color:'white'}} />
                                      <span> {Math.floor(Math.random() * 5) + 1}</span>
                                    </div>
                                    <div className='amenities'>
                                      <Accordion
                                        sx={{
                                            border:'1px solid #DC6437',
                                            height:'45px',
                                            width:'110px'
                                          
                                        }}
                                      >
                                            <AccordionSummary
                                            expandIcon={<MdExpandMore style={{width:'20px', height:'20px', color: '#212121'}} />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            sx={{
                                                color:'#212121',
                                                fontWeight:'400', 
                                            }}
                                            >
                                              Amenities
                                            </AccordionSummary>
                                            <AccordionDetails
                                              sx={{
                                                  backgroundColor:'white', 
                                                  position:'absolute',
                                                  zIndex:20,
                                                  boxShadow:'0 0 10px 0 rgba(0, 0, 0, .1)'
                                              }}
                                            >
                                              {
                                                bus.amenities.map((amenity, index)=>{
                                                  if(amenity ==="Wifi"){
                                                      return (<div key={index}  className='amenties-border'>
                                                      <FaWifi className='amenities-icon' />
                                                      <span> Wifi</span>
                                                    </div >)
                                                  }
                                                  else if(amenity ==="Charging Point") {
                                                    return(  <div key={index} className='amenties-border'>
                                                      <FaChargingStation className='amenities-icon' />
                                                      <span> Charging Point</span>
                                                    </div>)
                                                  }
                                                  else if (amenity ==="Water Bottle"){
                                                      return(<div key={index} className='amenties-border'> 
                                                      <FaBottleWater className='amenities-icon'/> 
                                                      <span> Water Bottle</span>
                                                    </div>)
                                                  }
                                                  else if(amenity ==="Blanket"){
                                                    return(<div key={index} className='amenties-border'>
                                                      <BiSolidBlanket className='amenities-icon' />
                                                      <span> Blanket</span>
                                                    </div>)
                                                  }
                                                  else if(amenity ==="Snack Box"){
                                                    return ( <div key={index} className='amenties-border'>
                                                    <FaInbox className='amenities-icon' /> 
                                                    <span> Snack Box</span>
                                                  </div>)
                                                  }
                                                  else{
                                                    return null;
                                                  }
                                                })
                                              }
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                            <div  className='bus-source-destination-book'>
                                <div className='source-duration-destination'>
                                    <div className='source'>
                                        <p>{bus.source}</p>
                                        <p>{bus.departureTime}</p>
                                        <p>{departureDate}</p>
                                    </div>
                                    <div className='duration'>
                                        <p>{duration.time}</p>
                                        <img alt='duration' src='https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg'/>
                                    </div>
                                    <div className='destination'>
                                        <p>{bus.destination}</p>
                                        <p>{bus.arrivalTime}</p>
                                        <p>{duration.isNextDate? arrivalDate: departureDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bus-card-price-book'>
                              <div>
                                  <p>Starting at</p>
                                  <h2>{`₹ ${bus.fare}`}</h2>
                              </div>
                                <div>
                                  <button onClick={()=> handleShowSeatsClick(i)} >{isOpen[i]? "Hide Seats": "Show Seats"}</button>
                                  <p>{`${bus.seats} Seats Available`}</p>
                                </div>
                            </div>
                        </div>
          
                          <div className='bus-available-seats' style={{display:(isOpen[i]?  "block":"none")}} >
                                <p>{`${bus.seats} Seats Available`}</p>
                                <p>Click on seat to select/deselect</p>
                                <div className='select-seats'>
                                      <div className='available-seats-upper'>
                                          <div className="upper">
                                              <p>Upper</p>
                                          </div>
                                          <div className='seats'>
                                            <div className='two-rows'>
                                              { allSeats.map((_, index)=>{
                                                if(index < 12){
                                                  return(
                                                    <svg key={index} onClick={()=> handleUpperSeatsClick(i,index)} width="50" height="30" viewBox="0 0 60 30" cursor='pointer' xmlns="http://www.w3.org/2000/svg">
                                                      <rect  width="50" height="29" x="0.5" y="0.5" rx="3.5" fill={upperSeatsArr[i][index]? 'rgb(222, 222, 222)':"white"} stroke="#BDBDBD" ></rect>
                                                      <rect width="3" height="19" x="47.5" y="5.5" rx="1.5" fill="white" stroke="#BDBDBD" ></rect> 
                                                    </svg>)
                                                }
                                                return null;
                                                })}
                                            </div>
                                            <div className='single-row'>
                                              { allSeats.map((_, index)=>{
                                                if(index > 11 ){
                                                  return(
                                                    <svg key={index} onClick={()=> handleUpperSeatsClick(i, index)} width="50" height="30" viewBox="0 0 60 30" cursor='pointer' xmlns="http://www.w3.org/2000/svg">
                                                      <rect width="50" height="29" x="0.5" y="0.5" rx="3.5" fill={upperSeatsArr[i][index]? 'rgb(222, 222, 222)':"white"} stroke="#BDBDBD" ></rect>
                                                      <rect width="3" height="19" x="47.5" y="5.5" rx="1.5" fill="white" stroke="#BDBDBD" ></rect> 
                                                    </svg>)
                                                }
                                                return null;
                                                })}
                                            </div>
                                          </div>
                                      </div>
                                      <div className='available-seats-lower'>
                                          <div className="lower">
                                            <PiSteeringWheelFill className='steeringIcon' />
                                              <p>Lower</p>
                                          </div>
                                          <div className='seats'>
                                              <div className='two-rows'>
                                                  { allSeats.map((_, index)=>{
                                                    if(index < 12){
                                                      return(
                                                        <svg key={index} onClick={()=> handleLowerSeatsClick(i, index)} width="50" height="30" viewBox="0 0 60 30" cursor='pointer' xmlns="http://www.w3.org/2000/svg">
                                                          <rect width="50" height="29" x="0.5" y="0.5" rx="3.5" fill={lowerSeatsArr[i][index]? 'rgb(222, 222, 222)':"white"} stroke="#BDBDBD" ></rect>
                                                          <rect width="3" height="19" x="47.5" y="5.5" rx="1.5" fill="white" stroke="#BDBDBD" ></rect> 
                                                        </svg>)
                                                    }
                                                    return null;
                                                    })}
                                                </div>
                                                <div className='single-row'>
                                                  { allSeats.map((_, index)=>{
                                                    if(index > 11 ){
                                                      return(
                                                        <svg key={index} onClick={()=> handleLowerSeatsClick(i, index)} width="50" height="30" viewBox="0 0 60 30" cursor='pointer' xmlns="http://www.w3.org/2000/svg">
                                                          <rect width="50" height="29" x="0.5" y="0.5" rx="3.5" fill={lowerSeatsArr[i][index]? 'rgb(222, 222, 222)':"white"} stroke="#BDBDBD" ></rect>
                                                          <rect width="3" height="19" x="47.5" y="5.5" rx="1.5" fill="white" stroke="#BDBDBD" ></rect> 
                                                        </svg>)
                                                    }
                                                    return null;
                                                    })}
                                                </div> 
                                          </div>
                                      </div>
                                </div>
                                <div className='price-payment'>
                                  <p>Total Fare: <span>{seatsCount[i]>1 && isOpen[i]? seatsCount[i]*bus.fare : bus.fare}</span></p>

                                  <button onClick={()=>handlePayment(seatsCount[i], bus.fare)}>Proceed to Payment</button>
                                </div>
                          </div>
                        
                      </div>)
                      }))
                      :
                      (
                        <NoBusesFound/>
                      )
                  }  
                
                </div>

            </div>
          </div>
          {
            loginModalOpen?
              <Login/>
              :null
          }
        <Footer/>
    </div>
  )
}

export default SearchBus