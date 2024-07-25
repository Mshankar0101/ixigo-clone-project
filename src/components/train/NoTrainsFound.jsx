import React from 'react'

const NoTrainsFound = () => {
    const main = {
        padding:'20px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width:'100%',
        margin:'0px',
        boxSizing:'border-box'
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
           <img alt='page not found' style={{height:'100%',width:'100%',objectFit:'cover'}} src='https://images.ixigo.com/rt-train/pc/img/trainListing/notFound.png' />
          </div>
          <div style={{width:'100%'}} >
            <p style={para}>
            Oops! No Trains Found
           </p>
            <p style={paraTwo}>
              Please fill search feilds again and search.
           </p>
          </div>
       </div>
     )
}

export default NoTrainsFound