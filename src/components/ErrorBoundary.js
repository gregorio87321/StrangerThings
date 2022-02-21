import React, {useState} from "react"


const ErrorBoundary = (props) => {
    const [hasError, setHasError] = useState(false);
   
    
  
   

    
      if (hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return props.children; 
    
  }

  export default ErrorBoundary