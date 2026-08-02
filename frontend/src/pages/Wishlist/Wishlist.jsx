import React from "react"

const Wishlist = ({LoggedIn}) => {
  return (
    <div>Wishlist
       {!LoggedIn?(
        <p>log in to access this feauture</p>
      ):(
        <p></p>
      )}
    </div>
  )
}

export default Wishlist