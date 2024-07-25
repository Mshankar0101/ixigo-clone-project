import React from 'react';

const UnderConstruction = () => {
    const div = {
        width: '100%',
        maxWidth:'500px',
        height:'400px',
        background: 'linear-gradient(45deg, #721053, #AD2E41)',
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }
    const heading = {
        margin:'0px',
        textAlign:'center',
        color: 'rgb(252, 121, 13)',
        
    }
  return (
        <div style={div}>
           <h1 style={heading}>Coming Soon ...</h1>
        </div>
  )
}

export default UnderConstruction