import { Dialog } from "@material-ui/core";
import {Link} from 'react-router-dom'
import React from "react";


interface DetailProps{
    token: string | null
    guestId: number | null
    firstName: string
    city: string
    state: string
    peopleStaying: string
    notes: string
    startDate: string
    endDate: string
    
   
}

class Details extends React.Component <DetailProps>{

    state={
        open: false
        
    }

    handleClick = () => {
        this.setState({
            open: false
        })
    }

  
  

    render(){
    
        return(
            <Dialog open>
                <button onClick={() => console.log(this.props.firstName)}>Click me</button>
                <Link to="/" onClick={this.handleClick} className="close">Close</Link>
            </Dialog>
        )
    }
}

export default Details