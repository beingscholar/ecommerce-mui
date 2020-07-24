import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
 
    return (
      promiseInProgress && 
      <div
      style={{
               width: "100%",
               height: "100vh",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               zIndex:"180"
             }}
           >
     <CircularProgress/>
     </div>
   );  
  }

  export default LoadingIndicator;