import React, { useEffect, useState } from 'react'
import { Box, Stack, TextField, Alert, styled, Button, Typography} from '@mui/material';
import '../../styles/FlightBooking.css';
import {useLocation, useNavigate} from 'react-router-dom';

const BookingPage = () => {
   useEffect(()=>{
       window.scroll(0,0);
   },[])

    
    //button
    const CustomButton = styled(Button)(({ theme }) => ({
        textTransform:'none',
        borderRadius:'10px',
        backgroundColor: 'rgb(252,121,13)',
        '&:hover': {
        backgroundColor: '#e36802',
        },
    }));


    // add traveller
    const [travellers,setTravellers]= useState([]);
    const [traveller,setTraveller]= useState({FirstName:"",LastName:"",Age: null,Nationality:""});
    const handleAddTraveller = ()=>{
        if(!traveller.FirstName || !traveller.LastName || !traveller.Age ||  !traveller.Nationality){
            alert("Please fill all the fields");
        }else{
            setTravellers((pre)=>{
                return [...pre,traveller];
            })
        }
    }

    const handleInputChange = (e)=>{
        const {value,name}= e.target;
        setTraveller((prev)=>{
              return{...prev,[name]:value}
        })
    }

    const removeTraveller = (index)=>{
        setTravellers(travellers.filter((_,i) => i !== index));
    }


     //fare summary
     const [selectedOption,setSelectedOption]= useState(150);
     const selectedOfferChange = (e)=>{
         const {value}= e.target;
         setSelectedOption(Number(value));
     }
     



    //  accessing value 
    const [taxes, setTaxes]=useState(0);
    const [totalAmount, setTotalAmount]=useState(0);
    const [totalTravlers, setTotalTravellers]=useState(null);
    const [ticketPrice, setTicketPrice]= useState(0);
    


    const location = useLocation();
    useEffect(()=>{
        const {ticketPrice,totalTravlers} = location.state || {};
        // console.log(totalTravlers, ticketPrice);
        setTaxes(Math.floor(ticketPrice*1/20));
        setTotalAmount(ticketPrice+taxes-selectedOption);
        setTotalTravellers(totalTravlers);
        setTicketPrice(ticketPrice);
    },[location.state])


    
      
     useEffect(()=>{
       const {ticketPrice,totalTravlers} = location.state || {};
       let length = travellers.length;
       let newTax = Math.floor(ticketPrice*1/20)*length;
    //    console.log(length);
       if(length > 0){
           setTotalAmount(ticketPrice*length + newTax - selectedOption);
           setTaxes(newTax);
        }else{ 
            let tax = Math.floor(ticketPrice*1/20);
            setTaxes(tax);
            setTotalAmount(ticketPrice + tax - selectedOption);
        }
        
     },[travellers,selectedOption])
     


     //contact and addres details
     const [contactDetails, setContactDetails]= useState({countrycode:undefined, number: undefined, email: ''});
     const handleContactDetailsChange = (e)=>{
        const {name,value}= e.target;
        setContactDetails((prev)=>{
            return {...prev, [name]:value}
        })
      }

     const [addressDetails, setAddressDetails]= useState({pincode:'', address: '', city: '', state:''});
     const handleAdressDetailsChange = (e)=>{
        const {name,value}= e.target;
        setAddressDetails((prev)=>{
            return {...prev, [name]:value}
        })
      }


     const navigate = useNavigate();
     const handlePayment = ()=>{
        if(contactDetails.countrycode && contactDetails.number && contactDetails.email){
            if(addressDetails.pincode && addressDetails.address && addressDetails.city && addressDetails.state){
                let data = {
                    total: totalAmount
                }
                navigate("payment", {state: data})
            }else{
                alert("Please fill all the address details")
            }
        }else{
            alert("Please fill your Contact details")
        }
     }

  return (
    <>
      <Stack 
       direction={{ xs: 'column', sm: 'column', md:'row', lg:'row' }}
       spacing={{sm:2,md:2}}
       sx={{backgroundColor:'rgba(239,239,240,1)'}}
      >
        <Stack 
         sx={{
            
            minWidth:'350px',
            maxWidth:'550px'
         }}
        >
            <Box
            sx={{
                marginTop:'20px',
                backgroundColor:'white',
                padding:'20px',
                borderRadius: '20px',
                boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                overflow:'hidden'
            }}
            >
                <div className='offer-on-booking-flight-heading' >
                    <h3>Offers For You</h3>
                        <p>All Offers &gt;</p>
                </div>
               <div className='offer-on-booking-flight'>
                    <div className='input-div-offer'>
                        <input
                            type='radio'
                            value={150}
                            checked={selectedOption === 150}
                            onChange={selectedOfferChange}
                        /> 
                        <div className='coupen-price'>
                            <p>INSTANT</p>
                            <p>₹150 Off</p>
                        </div>
                    </div>
                    <div className='offer-description' style={{marginLeft:'25px'}}>
                        <p>Coupon applied. You will get an instant discount of ₹150</p>
                        <a href='/' >Know More</a>
                    </div>
               </div>
               <div className='offer-on-booking-flight'>
                    <div className='input-div-offer'>
                        <input
                            type='radio'
                            value={300}
                            checked={selectedOption === 300}
                            onChange={selectedOfferChange}
                        /> 
                        <div className='coupen-price'>
                            <p>IXIAUEMID</p>
                            <p>₹300 Off</p>
                        </div>
                    </div>
                    <div className='offer-description' style={{marginLeft:'25px'}}>
                        <p>Get an instant discount of ₹300 with AU Bank Credit Card EMI Payments.</p>
                        <a href='/' >Know More</a>
                    </div>
               </div>
               <div className='offer-on-booking-flight'>
                    <div className='input-div-offer'>
                        <input
                            type='radio'
                            value={250}
                            checked={selectedOption === 250}
                            onChange={selectedOfferChange}
                        /> 
                        <div className='coupen-price'>
                            <p>IXIONEEMI</p>
                            <p>₹250 Off</p>
                        </div>
                    </div>
                    <div className='offer-description' style={{marginLeft:'25px'}}>
                        <p>Get an instant discount of ₹250 with OneCard Credit Card EMI</p>
                        <a href='/' >Know More</a>
                    </div>
               </div>
            </Box>
            <Box 
             className='fare-summary-flight'
             sx={{
                marginTop:'20px',
                backgroundColor:'white',
                padding:'20px',
                borderRadius: '20px',
                boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                overflow:'hidden',
                color:'#17181C'
            }}
            >
                <div className="flex-fare">
                  <h3>Fare Summary</h3>
                  <p style={{color:'#5E616E',fontSize:'14px'}}>{totalTravlers?`${totalTravlers} travellers`: ""}</p> 
                </div>
                <div className="flex-fare">
                    <p>Fare Type</p>
                    <p style={{color:'#238C46'}}>Partially Refundable</p>
                </div>
                <div className="flex-fare">
                    <p>Base Fare</p>
                    <p>{`₹${ticketPrice}`}</p>
                </div>
                <div className="flex-fare">
                    <p>Taxes & Fees</p>
                    {/* <p>{`₹${ticketPrice*(1/20)}`}</p> */}
                    <p>{travellers.length===0?"": `₹${Math.floor(ticketPrice*(1/20))} × ${travellers.length} = ` } ₹{ taxes }</p>
                </div>
                <div style={{borderBottom:'1px solid rgba(239,239,240)',marginTop:'10px'}}></div>
                <div className="flex-fare">
                    <p>Instant Off</p>
                    <p style={{color:'#238C46'}} >{`-₹${selectedOption}`}</p>
                </div>
                <div style={{borderBottom:'1px solid rgba(239,239,240)',marginTop:'10px'}}></div>
                <div className="flex-fare">
                    <h3>Total Amount</h3>
                    {/* <h3>{`₹${ticketPrice+(ticketPrice*(1/20))-selectedOption}`}</h3> */}
                    <h3>₹{totalAmount}</h3>
                </div>
            </Box>
            <Box
             className='rules-privacy-policy'

             >
                <p>By clicking on continue, I confirm that I have read, understood, and agree with the <a href='/'>Fare Rules</a>, <a href='/'>Privacy Policy</a> and <a href='/'>Terms of Use</a>.</p>
                <p style={{color:'#848794'}}><strong >100%</strong> Safe Payment Process</p>
            </Box>
        </Stack>

        <Stack
          sx={{
            minWidth:'350px'
          }}
        >
            <Box 
             sx={{
                marginTop:'20px',
                backgroundColor:'white',
                padding:'20px',
                borderRadius: '20px',
                boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                overflow:'hidden',
             }}
            >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                   <h3 style={{margin:'0px',fontSize:'20px', fontWeight:'700',lineHeight:'1.2'}}>Traveller Details</h3>
                   <p style={{margin:'0px',color:'#5E616E',fontSize:'14px', fontWeight:'500',lineHeight:'1.4'}}>{totalTravlers?`${totalTravlers} travellers`: ""}</p>
                </div>
                <Alert severity="warning"  
                  sx={{
                    //  marginBottom:'15px',
                     fontSize:'small',
                     borderRadius:'15px',
                     ".MuiAlert-message":{
                        padding:'0px',
                        marginTop:'8px'
                     }
                   }}
                >
                  Please ensure that your name matches your govt. ID such as Aadhaar, Passport or Driver's License
                </Alert>
                
                <Stack
                   direction={{ xs: 'column', sm: 'column', md:'column', lg:'row' }}
                   spacing={{sm:2.5,md:2.5}}
                  sx={{
                    display:'flex',
                    alignItems:"flex-start",
                    justifyContent:'space-between',
                    padding:'20px',
                    gap:'10px'
                  }}
                >
                    <TextField
                     size='small'
                     onChange={handleInputChange}
                     name='FirstName'
                     type='text'
                     required
                     label="First & Middle Name"
                    />
                    <TextField
                      size='small'
                      onChange={handleInputChange}
                      name='LastName'
                      label="Last Name"
                      type='text'
                      required
                    />
                    <TextField
                      size='small'
                      onChange={handleInputChange}
                      name='Age'
                      label="Age"
                      type='number'
                      required
                    />
                    <TextField
                      size='small'
                      onChange={handleInputChange}
                      name='Nationality'
                      label="Nationality"
                      type='text'
                      required
                    />
                    <CustomButton
                    size='large' 
                    variant="contained"
                    disableElevation
                    disableRipple 
                    onClick={handleAddTraveller} 
                     >
                     Add Traveller
                    </CustomButton>
                </Stack>

                {
                    travellers.map((traveller,index)=>{
                        return(
                            <div style={{margin:'10px 0px',padding:'10px',border:".5px solid rgba(0,0,0,0.2)",minWidth:'350px',maxWidth:'550px'}}>
                                <div style={{display:'flex',justifyContent:'space-between',margin:'6px 0px'}}>
                                    <p style={{margin:'0px',fontSize:'16px',fontWeight:'500'}}>Traveller {index+1}</p>
                                    <p style={{margin:'0px',fontSize:'16px',fontWeight:'500',color:'#e36802',cursor:'pointer'}}  onClick={()=>removeTraveller(index)} >Delete</p>
                                </div>
                                <p style={{margin:'6px 0px',fontSize:'14px',fontWeight:'500'}}>First Name: <span style={{color:'#5E616E',margin:'0px',fontSize:'14px',fontWeight:'400'}}>{traveller.FirstName}</span></p>
                                <p style={{margin:'6px 0px',fontSize:'14px',fontWeight:'500'}}>Last Name: <span style={{color:'#5E616E',margin:'0px',fontSize:'14px',fontWeight:'400'}}>{traveller.LastName}</span></p>
                                <p style={{margin:'6px 0px',fontSize:'14px',fontWeight:'500'}}>Age: <span style={{color:'#5E616E',margin:'0px',fontSize:'14px',fontWeight:'400'}}>{traveller.Age}</span></p>
                                <p style={{margin:'6px 0px',fontSize:'14px',fontWeight:'500'}}>Nationality: <span style={{color:'#5E616E',margin:'0px',fontSize:'14px',fontWeight:'400'}}>{traveller.Nationality}</span></p>
                            </div>
                        )
                    })
                }
            </Box>
            <Box
                sx={{
                    marginTop:'20px',
                    backgroundColor:'white',
                    padding:'20px',
                    borderRadius: '20px',
                    boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                    overflow:'hidden',
                 }}
                >
                    <Box
                     className='fligh-booking-contact-details'
                    >
                        <h3>Contact Details</h3>
                        <p>Your ticket & other information will be sent here</p>
                        <Stack
                        direction={{ xs: 'column', sm: 'column', md:'column', lg:'row' }}
                        spacing={{sm:2.5,md:2.5}}
                        sx={{
                            display:'flex',
                            alignItems:"flex-start",
                            justifyContent:'space-between',
                            padding:'20px',
                            marginTop:'20px',
                            gap:'10px'
                        }}
                        >
                            <TextField
                            size='small'
                            label="Country Code"
                            required
                            value={contactDetails.countrycode}
                            name='countrycode'
                            onChange={handleContactDetailsChange}
                            />
                            <TextField
                            required
                            type='number'
                            size='small'
                            label="Mobile Number"
                            value={contactDetails.number}
                            name='number'
                            onChange={handleContactDetailsChange}
                            />
                            <TextField
                            required
                            type='email'
                            size='small'
                            label="Email"
                            value={contactDetails.email}
                            name='email'
                            onChange={handleContactDetailsChange}
                            />
                        </Stack>
                 </Box>
                 <Box className='flight-billing-address'>
                    <h3>GST Details</h3>
                    <p>To claim credit for the GST charged by airlines,Trains, please enter your GST details</p>
                    <div className='gst-no'>
                        <input type='checkbox' />
                        <p>I would like to add my GST Number</p>
                    </div>

                    <h3>Billing Address</h3>
                    <p>As per the latest govt. regulations, its mandatory to provide your address.</p>
                    <Stack
                     direction={{ xs: 'column', sm: 'column', md:'column', lg:'row' }}
                     spacing={{sm:2.5,md:2.5}}
                     sx={{
                        display:'flex',
                        alignItems:"flex-start",
                        justifyContent:'space-between',
                        padding:'20px',
                        gap:'10px'
                     }}
                    >

                    <TextField
                      size='small'
                      label="Pincode"
                      type='pin'
                      value={addressDetails.pincode}
                      name='pincode'
                      onChange={handleAdressDetailsChange}
                    />
                    <TextField
                      size='small'
                      label="Address"
                      type='text'
                      value={addressDetails.address}
                      name='address'
                      onChange={handleAdressDetailsChange}
                      />
                    <TextField
                      size='small'
                      label="City"
                      type='text'
                      value={addressDetails.city}
                      name='city'
                      onChange={handleAdressDetailsChange}
                    />
                    <TextField
                      size='small'
                      label="State"
                      type='text'
                      value={addressDetails.state}
                      name='state'
                      onChange={handleAdressDetailsChange}
                      />
                    </Stack>
                 </Box>
                
            </Box>
            <Box
                sx={{
                    mt:'20px',
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    backgroundColor:'white',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius:'20px',
                    boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                    padding:'20px 20px 10px 20px',
                    position:'sticky',
                    bottom: 0,
                    zIndex:25
                }}
            >
              <Typography variant='h6'  sx={{color:'#17181C',fontWeight:'700', lineHeight:'1.4'}} component='h2' >{`₹${totalAmount}`}</Typography> 
                <CustomButton
                    size='large' 
                    variant="contained"
                    disableElevation
                    disableRipple 
                    onClick={handlePayment } 
                >
                    Pay Now
                </CustomButton>
            </Box>
        </Stack>
      </Stack>

    </>
  )
}

export default BookingPage 