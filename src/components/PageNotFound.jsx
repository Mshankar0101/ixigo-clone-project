import React from 'react'

const PageNotFound = () => {
  return (
    <>
    <div style={{padding:'0px 20px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column', width:'100%',margin:'0px',boxSizing:'border-box'}}>
       <div style={{maxWidth:'400px'}}>
        <img alt='page not found' style={{marginBottom:'30px',height:'auto',width:'100%'}} src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Frail%2F24089105b90cdc7d3e6404e6ac053e81-zmvsx.png&w=640&q=75' />
       </div>
       <div style={{maxWidth:'400px'}}>
         <p style={{textAlign:'center',marginBottom:'1rem',fontSize:'16px',lineHeight:'1.4',margin:'0px',fontWeight:'500'}}>
            Oops! You seem to have reached the wrong destination. We couldn't find the page you were looking for.
        </p>
       </div>
    </div>
    </>
  )
}

export default PageNotFound