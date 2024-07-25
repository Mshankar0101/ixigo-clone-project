import React,{useState,useEffect, useRef, useContext} from 'react'
import '../../styles/Train.css';
import '../../styles/SearchTrain.css';
import Datepicker from '../common/Datepicker';
import { AiOutlineSwap } from "react-icons/ai";
import { MdOutlineLocationCity } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import {GlobalContext} from '../../context/Contexts';
import Login from '../Login';
import NoTrainsFound from './NoTrainsFound';
import Footer from '../Footer';

const SearchTrain = () => {
  const location = useLocation();
  const [filterObj, setFilterObj]= useState({});
  const [sortObj, setSortObj]=useState({});
 

  //date picker
  const [currentDate, setCurrentDate] = useState(new Date());
   
  //formatted date for search card
  const dateObj = new Date(currentDate);
  const options = { weekday: 'short', day: '2-digit', month: 'short' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
   

  //dropdown container for search feilds
  const [showSuggetion, setShowSuggetions]= useState(false);
  const [fromSuggession, setFromSuggesion] = useState(false);
  const [toSuggession, setToSuggesion] = useState(false);
  const [inputChange, setInputChange]=useState(false);
  const [inputValue, setInptValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const inputFromRef = useRef();
  const inputToRef = useRef();
  const autocompleteRef = useRef();


   //handling outside click for to and from dropdown
   const handleClickOutside = (event)=>{
    // console.log("input from", inputFromRef?.current.contains(event.target))
    // console.log("input to", inputToRef?.current.contains(event.target))
    if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputFromRef?.current && !inputFromRef?.current.contains(event.target) && !inputToRef?.current.contains(event.target) ){
      setShowSuggetions(false);
    
    }
    else if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputToRef?.current && !inputToRef?.current.contains(event.target) && !inputFromRef?.current.contains(event.target)){
      setShowSuggetions(false);
    }
   }
  useEffect(()=>{
      document.addEventListener("mousedown", handleClickOutside);
      return ()=>{
          document.removeEventListener("mousedown", handleClickOutside);
      }
      
  },[]);


  //input change and station rendering
  const stationsArr= [
    {id:1, name:"Agra Cantonment"},
    {id:2, name:"Ahmedabad Junction"},
    {id:3, name:"Ambala Cantonment"},
    {id:4, name:"Amritsar Junction"},
    {id:5, name:"Anand Junction"},
    {id:6, name:"Barddhaman Junction"},
    {id:7, name:"Bengaluru City Junction"},
    {id:8, name:"Chandigarh"},
    {id:9, name:"Chennai Central"},
    {id:10, name:"Coimbatore Junction"},
    {id:11, name:"Delhi Junction"},
    {id:12, name:"Dhanbad Junction"},
    {id:13, name:"Gorakhpur Junction"},
    {id:14, name:"Guwahati"},
    {id:15, name:"Hazrat Nizamuddin"},
    {id:16, name:"Howrah Junction"},
    {id:17, name:"Hubli Junction"},
    {id:18, name:"Indore Junction"},
    {id:19, name:"Kalyan Junction"},
    {id:20, name:"Kanpur Central"},
    {id:21, name:"Katpadi Junction"},
    {id:22, name:"Kharagpur Junction"},
    {id:23, name:"Kollam Junction"},
    {id:24, name:"Lucknow Charbhagh"},
    {id:25, name:"Ludhiana Junction"},
    {id:26, name:"Manmad Junction"},
    {id:27, name:"Moradabad Junction"},
    {id:28, name:"Mughal Sarai Junction"},
    {id:29, name:"Mysuru Junction"},
    {id:30, name:"Nadiad Junction"},
    {id:31, name:"Nagpur Junction"},
    {id:32, name:"Patna Junction"},
    {id:33, name:"Pune Junction"},
    {id:34, name:"Raipur Junction"},
    {id:35, name:"Salem Junction"},
    {id:36, name:"Secunderabad Junction"},
    {id:37, name:"Surat"},
    {id:38, name:"Thiruvananthapuram Central"},
    {id:39, name:"Thrissur"},
    {id:40, name:"Udaipur City"},
    {id:41, name:"Vadodara Junction"},
    {id:42, name:"Varanasi Junction"},
    {id:43, name:"Vellore Katpadi"},
    {id:44, name:"Vijayawada Junction"},
    {id:45, name:"Visakhapatnam Junction"},
    {id:46, name:"Warangal"}
  ] 

   //handling input of from feild
   const handleFromInputChange = (e)=>{
    setFromValue(e.target.value);
    setInptValue(e.target.value);
    if(e.target.value !== ""){
        setInputChange(true);
    }else{
        setInputChange(false);
    }
  }

  //handling input of to feild
  const handleToInputChange = (e)=>{
    setToValue(e.target.value);
    setInptValue(e.target.value);
      if(e.target.value !== ""){
          setInputChange(true);
      }else{
          setInputChange(false);
      }
    
  }

  // handling station click
  const handelSuggetionClick = (name)=>{
    // console.log("from suggetion",fromSuggession );
    // console.log("toSuggession",toSuggession );
    // console.log("value", name);
     if(fromSuggession){
      setFromValue(name);

     }
     if(toSuggession){
      setToValue(name);
     }
     setShowSuggetions(false);
     setInptValue("");
     setInputChange(false);
  }
  


  //filter logic

  //filter for class change
  const [coach, setCoach]=useState([]);
  const [isCoach, setIsCoach]= useState({SL:false, SAC:false, TE:false,TAC:false,FAC:false,G:false});
  const handleClassChange = (e)=>{
    const {value, checked,name}= e.target;
    if(checked){
      coach.push(value);
      setFilterObj((pre)=>{
        return {...pre, "coaches.coachType":coach}
      })
      setIsCoach((prev)=>{
        return {...prev, [name]:true}
      })
      
    }else{
       let filteredrr = coach.filter((val)=> val !== value);
       setCoach(filteredrr);
      //  console.log(filteredrr);
       setFilterObj((pre)=>{
         return {...pre, "coaches.coachType":filteredrr} 
       })
     
       setIsCoach((prev)=>{
        return {...prev, [name]:false}
      })
      // console.log("filteredrr.length",filteredrr.length);
      // console.log("coach.length",coach.length); 
    }
   
  }

  //filter for quota change
  const [isQuota, setIsQuota]= useState({general:true});
  let updtedQuota = {general:false,tatkal:false,lower:false,ladies:false}
  const handleQuotaChange = (e)=>{
      const {value}= e.target;
       setIsQuota(updtedQuota);
       setIsQuota((pre)=>{
          return {...pre, [value]: true};
       })
  }


  //filter for arrival and departure change
  const [departureTime, setDepartureTime]= useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [sortingOption, setSortingOption]= useState("");
  
  const handleArrivalTime = (value)=>{
    const timeArr = value.split(" - ");
    // console.log(timeArr);
    setArrivalTime(value);
    setFilterObj((pre)=>{
      return {...pre, "arrivalTime":{"$gte":timeArr[0],"$lte":timeArr[1]}}
    })
    // console.log("value",value);
   
  }
  const handleDepartureTime = (value)=>{
    const timeArr = value.split(" - ");
    setDepartureTime(value);
    setFilterObj((pre)=>{
      return {...pre, "departureTime":{"$gte":timeArr[0],"$lte":timeArr[1]}}
    })
    // console.log(value);

  }

  //clear filters
  const handleClearFilter = ()=>{
    setFilterObj({});
    setCoach([]);
    setIsCoach({SL:false, SAC:false, TE:false,TAC:false,FAC:false,G:false});
    setIsQuota({general:true,tatkal:false,lower:false,ladies:false});
    setArrivalTime("");
    setDepartureTime("");
  }

//  useEffect(()=>{
//   console.log("filterObj",filterObj);
//   console.log("sortObj",sortObj)
//  },[filterObj,sortObj])


  //sorting
  const handleSorting = (value)=>{
    setSortingOption(value);
    setSortObj({[value]: 1})
    // console.log("sorting",value);
  }



  //accessing searched value on train home page
  const [isNavigated, setIsNavigated]= useState(false);
 useEffect(()=>{
  const {fromValue,toValue,currentDate} = location.state || {};
  if(fromValue && toValue){
    setFromValue(fromValue);
    setToValue(toValue);
    setCurrentDate(currentDate);
    setIsNavigated(true);
  }
},[location.state]);



  //feching trains
  const [trains,setTrains]=useState([]);
  const fetchTrains = (source,destination,day)=>{
    const filterString = Object.keys(filterObj).length !== 0 
       ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` 
       : "";
   //sortSelectedOption
   const sortString = Object.keys(sortObj).length !== 0 
         ? `&sort=${encodeURIComponent(JSON.stringify(sortObj))}` 
         : "";
      // `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}${Object.keys(filterObj).length !== 0 ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` : "" }`
    const url = `https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${source}","destination":"${destination}"}&day=${day}${filterString}${sortString}`
      fetch(url, 
       {
          method: 'get',
          headers:{
              'projectID': '9h69a26iogeq'
          }
      })
      .then((response) => response.json())
      .then((result) =>{
          setTrains(result.data.trains);
          // console.log(result.data.trains);
      
      })
      .catch((error) => console.error(error));

 }

  //hadling searches on search page
  const handleSubmition = ()=>{ 
    // console.log("inside handle submition");
    var daysArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var day = daysArr[currentDate.getDay()];
     if(fromValue && toValue && currentDate){ 
        //  console.log("handle submition -->", fromValue,toValue, day);
         fetchTrains(fromValue, toValue, day);  
     }
 }
 useEffect(()=>{
    //  console.log("useeffect");
     handleSubmition();
 },[filterObj, sortObj, isNavigated]);



//  handling book show avaibility and book click
const [isOpen, setIsOpen]= useState(Array(trains.length).fill(false));

const handleShowAvailabilityClick = (index)=>{
  setIsOpen((prevState) => {
    const newState = [...prevState];
    newState[index] = !newState[index];
    return newState;
  });
  // console.log("isOpen",isOpen)
}

const {loginModalOpen, setLoginModalOpen} = useContext(GlobalContext);
const jwtToken =  localStorage.getItem("token");
const navigate = useNavigate();
const handleBookClick = (fare)=>{
  if(jwtToken){
    const data = {
     ticketPrice: fare
    }
    navigate('book',{state:data})
  }else{
    setLoginModalOpen(true);
  }
}

const swipeSourceAndDestination = ()=>{
  if(fromValue !== "" && toValue !== ""){
       setFromValue(toValue);
       setToValue(fromValue);
  }
}

useEffect(()=>{
  window.scroll(0,0);
},[])

  return (
    <>
  <div className='train-search-page'>
        <div className='train-search-box-searchPage'>
            <div className='search-input-feilds'>
               
                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain leftRoundBorder" ref={inputFromRef} onFocus={()=> {
                    setShowSuggetions(true);
                    setFromSuggesion(true);
                    setToSuggesion(false);
                  }}
                  onChange={handleFromInputChange}
                  value={fromValue}
                  required/>
                  <span className="floating-label-train">From</span>
                  {(fromSuggession && showSuggetion && inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                      <ul>
                            {
                              stationsArr.map((station)=>{
                                if(station.name.toLowerCase().includes(inputValue?.toLowerCase())){
                                  return(
                                    <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                                      <div className="cityIcon">
                                        <MdOutlineLocationCity/>
                                      </div>
                                      <div className="name">
                                        <p>{station.name}</p>
                                      </div>
                                    </li>
                             
                                  )
                                }
                                return null;
                              })
                            }       
                        </ul>
                    </div>
                    : 
                    (fromSuggession && showSuggetion && !inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                        <div className='popular-airports'>
                             <p>Popular Airports</p>
                        </div>
                        <ul>
                          { stationsArr.map((station)=>{
                            return(
                             <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                              <div className="cityIcon">
                                <MdOutlineLocationCity/>
                              </div>
                              <div className="name">
                                <p>{station.name}</p>
                              </div>
                             </li>
                            )
                          })
                            
                          }
                        </ul>
                    </div>
                    :
                    null
                    }
                </div>

                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain" ref={inputToRef} onFocus={()=>{
                    setToSuggesion(true);
                    setShowSuggetions(true);
                    setFromSuggesion(false);
                  }}
                  onChange={handleToInputChange}
                  value={toValue}
                  required/>
                  <span className="floating-label-train">To</span>
                  <div onClick={swipeSourceAndDestination} className='swap-icon-div'>
                   <AiOutlineSwap className='swap-icon'/>
                  </div>
                  {(toSuggession && showSuggetion && inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                       <ul>
                            {
                              stationsArr.map((station)=>{
                                if(station.name.toLowerCase().includes(inputValue?.toLowerCase())){
                                  return(
                                    <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                                      <div className="cityIcon">
                                      <MdOutlineLocationCity/>
                                      </div>
                                      <div className="name">
                                        <p>{station.name}</p>
                                      </div>
                                    </li>
                             
                                  )
                                }
                                return null;
                              })
                            }       
                        </ul>
                    </div>
                    : 
                    (toSuggession && showSuggetion && !inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                        <div className='popular-stations'>
                          <p>Popular Stations</p>
                        </div>
                        <ul>
                          { stationsArr.map((station)=>{
                            return(
                              <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                              <div className="cityIcon">
                                <MdOutlineLocationCity/>
                              </div>
                              <div className="name">
                                <p>{station.name}</p>
                              </div>
                             </li>
                            )
                          })
                            
                          }
                        </ul>
                    </div>
                    :
                    null
                    }
                </div>
               

                <div className='train-search-feild-container'>
                 <Datepicker  currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

                <div className='train-search-feild-container'>
                  <button className='search-button' onClick={handleSubmition}>Search</button>
                </div>
            </div> 
           </div>
           <div className='train-filters-container'>
              <p onClick={handleClearFilter} style={{display: (Object.keys(filterObj).length !== 0? 'block': 'none'),margin: "2px 5px 0px 0px",color: "#EC5B24",width:'100%',textAlign:'right',fontWeight:'600',cursor:'pointer'}}>Clear Filters</p>

              <div className='train-filters'>
               <div className="train-class">
                 <p>Class</p>
                 <div className="checkbox-list">
                  
                    <div>
                        <div>
                            <input type='checkbox' name='SL' value="SL" onChange={handleClassChange} checked={isCoach.SL} />
                            <label>SL</label>
                        </div>
                        <div>
                            <input type='checkbox' name='SAC' value="2A" onChange={handleClassChange} checked={isCoach.SAC} />
                            <label>2A</label>
                        </div>
                        <div>
                            <input type='checkbox' name='TE' value="3E" onChange={handleClassChange} checked={isCoach.TE} />
                            <label>3E</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type='checkbox' name='TAC' value="3A" onChange={handleClassChange} checked={isCoach.TAC} />
                            <label>3A</label>
                        </div>
                        <div>
                            <input type='checkbox' name='FAC' value="1A" onChange={handleClassChange} checked={isCoach.FAC}/>
                            <label>1A</label>
                        </div>
                        <div>
                            <input type='checkbox' name='G' value="2S" onChange={handleClassChange} checked={isCoach.G}/>
                            <label>2S</label>
                        </div>
                    </div>
                 </div>
               </div>
                <div className="train-quota">
                   <p>Quota</p>
                   <div className='quota-list'>
                        <div>
                            <div>
                                <input type='radio' value='general' checked={isQuota.general === true} onChange={handleQuotaChange}/>
                                <label>General</label>
                            </div>
                            <div>
                                <input type='radio' value='lower' checked={isQuota.lower === true} onChange={handleQuotaChange}/>
                                <label>Lower Berth</label>
                            </div>
                        </div>  
                        <div>
                            <div>
                                <input type='radio' value='tatkal' checked={isQuota.tatkal === true} onChange={handleQuotaChange}/>
                                <label>Tatkal</label>
                            </div>
                            <div>
                                <input type='radio' value='ladies' checked={isQuota.ladies === true} onChange={handleQuotaChange}/>
                                <label>Ladies</label>
                            </div>
                        </div>  
                   </div>
                </div>
                <div className="train-time">
                    <div>
                        <p>Departure From</p>
                        <div className='time-list'>
                            <div>
                                <div className={departureTime === "00:00 - 06:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("00:00 - 06:00")}>00:00 - 06:00</p></div>
                                <p>Early Morning</p>
                            </div>
                            <div>
                                <div className={departureTime === "06:00 - 12:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("06:00 - 12:00")}>06:00 - 12:00</p></div>
                                <p>Morning</p>
                            </div>
                            <div>
                                <div className={departureTime === "12:00 - 18:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("12:00 - 18:00")}>12:00 - 18:00</p></div>
                                <p>Mid Day</p>
                            </div>
                            <div>
                                <div className={departureTime === "18:00 - 23:59"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("18:00 - 23:59")}>18:00 - 24:00</p></div>
                                <p>Night</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Arrival at</p>
                        <div className='time-list'>
                            <div>
                                <div  className={arrivalTime === "00:00 - 06:00"? "arrivalStyle": ""} ><p onClick={()=> handleArrivalTime("00:00 - 06:00")} >00:00 - 06:00</p></div>
                                <p>Early Morning</p>
                            </div>
                            <div>
                                <div className={arrivalTime === "06:00 - 12:00"? "arrivalStyle": ""}><p onClick={()=> handleArrivalTime("06:00 - 12:00")}>06:00 - 12:00</p></div>
                                <p>Morning</p>
                            </div>
                            <div>
                                <div className={arrivalTime === "12:00 - 18:00"? "arrivalStyle": ""}><p onClick={()=> handleArrivalTime("12:00 - 18:00")}>12:00 - 18:00</p></div>
                                <p>Mid Day</p>
                            </div>
                            <div>
                                <div className={arrivalTime === "18:00 - 23:59"? "arrivalStyle": ""}><p onClick={()=> handleArrivalTime("18:00 - 23:59")}>18:00 - 24:00</p></div>
                                <p>Night</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
           </div>
           
           <div className="train-sort-container">
                <div style={{maxWidth:'80px', color:'#00000061',minWidth:'55px'}} >Sort by:</div>
                <div className={sortingOption === "departureTime"? "sort-selected sorting-option": "sorting-option"} onClick={()=>handleSorting("departureTime")}><p>DEPARTURE TIME</p></div>
                <div className={sortingOption === "arrivalTime"? "sort-selected sorting-option": "sorting-option"} onClick={()=>handleSorting("arrivalTime")}><p>ARRIVAL TIME</p></div>
                <div className={sortingOption === "fare"? "sort-selected sorting-option": "sorting-option"} onClick={()=>handleSorting("fare")}><p>FARE</p></div>
                <div style={{border:'none'}} className={sortingOption === "trainName"? "sort-selected sorting-option": "sorting-option"} onClick={()=>handleSorting("trainName")}><p>NAME</p></div>
           </div>

            {trains.length > 0?
            
              trains.map((item,i)=>{
                  let fare = item.fare + 500;
                  // console.log(item.fare);
                return(
                  <div key={item._id} className='train-search-card'>
                    <div className='train-source-destination-book'>
                      <div className='train'>
                          <p>{item.trainNumber} {item.trainName}</p>
                          <div className='flex-runsOn'>
                            <p>Runs on : </p>
                            {item.daysOfOperation.map((days,index)=>{
                                return <p key={index} >{days}</p>
                            })}
                          </div>
                          <div className='train-type'>
                              <span> &bull; {item.trainType}</span>
                              <span>{" "}({item.trainNumber} Running Status)</span>
                          </div>
                      </div>
                      <div className='source-duration-destination'>
                          <div className='source'>
                              <p>{item.source}</p>
                              <p>{item.departureTime}</p>
                              <p>{formattedDate}</p>
                          </div>
                          <div className='duration'>
                              <p>{item.travelDuration}</p>
                              <img alt='duration' src='https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg'/>
                          </div>
                          <div className='destination'>
                              <p>{item.destination}</p>
                              <p>{item.arrivalTime}</p>
                              <p>{formattedDate}</p>
                          </div>
                      </div>
                      <div className='book'>
                          <button onClick={()=> handleShowAvailabilityClick(i)}>{isOpen[i]? "Hide Availability": "Show Availability" }</button>
                      </div>
                    </div>
                    <div className='seats-classes' style={{display:(isOpen[i]?  "flex":"none")}}>

                      {
                        item.coaches.map((coach,index)=>{
                          let updatedFare;
                        if(coach.coachType === '1A'){
                          updatedFare = fare;
                        }
                        else if(coach.coachType === '2A'){
                          updatedFare = fare*9/10;
                        }
                        else if(coach.coachType === '3A'){
                          updatedFare = fare*8/10;
                        }
                        else if(coach.coachType === 'SL'){
                          updatedFare = fare*7/10;
                        }
                        else if(coach.coachType === 'EA'){
                          updatedFare = fare*6/10;
                        }
                        else if(coach.coachType === 'CC'){
                          updatedFare = fare*4/10;
                        }
                        else if(coach.coachType === '2S'){
                          updatedFare = fare*2/10;
                        }else{
                          updatedFare = fare*3/10;
                        }
                          return <div key={index}>
                                  <div className='coach-fare'>
                                    <p>{coach.coachType}  &bull; ₹{Math.floor(updatedFare)}</p>
                                    <p>AVL {coach.numberOfSeats}</p>
                                  </div>
                                  <button onClick={()=>handleBookClick(Math.floor(updatedFare))}>Book</button>
                            </div>
                        })
                      }
                    </div>
                </div>)
              })
               :
              <NoTrainsFound/>
            
            }

          <Footer/>

          {
            loginModalOpen?
            <Login/>:
            null
          }

      </div>
    </>
  )
}

export default SearchTrain