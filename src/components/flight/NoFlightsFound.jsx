import React from 'react'

const NoFlightsFound = () => {
   const main = {
     padding:'0px 20px',
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     flexDirection:'column',
     width:'100%',
     margin:'0px',
     boxSizing:'border-box',
     paddingBottom:'20px'
    }
  const para = {
    textAlign:'center',
    marginBottom:'1rem',
    fontSize:'16px',
    lineHeight:'1.4',
    margin:'0px',
    fontWeight:'500'
   }
  const paraTwo = {
    textAlign:'center',
    marginBottom:'1rem',
    fontSize:'16px',
    lineHeight:'1.4',
    margin:'0px',
    color:'#5E616E',
    fontWeight:'500'
   }

   const div = {
     width: '100%',
     maxWidth:'500px',
     height:'400px',
     marginBottom:'30px'
   }

  return (
    <div style={main}>
       <div style={div} >
        <img alt='page not found' style={{height:'100%',width:'100%',objectFit:'cover'}} src='https://edge.ixigo.com/st/vimaan/_next/static/media/noFlightsFound.48ef0d7a.svg' />
       </div>
       <div style={{width:'100%'}} >
         <p style={para}>
           Oops! No Flights Found
        </p>
         <p style={paraTwo}>
           Please fill search feilds again and search.
        </p>
       </div>
    </div>
  )
}

export default NoFlightsFound