import React from 'react'
import {Alert} from 'react-bootstrap'

 function Message(variant, children) {
  return (
     <Alert variant={variant}>
         {{children} /* not working */}
     </Alert>
   )
 }

export default Message
