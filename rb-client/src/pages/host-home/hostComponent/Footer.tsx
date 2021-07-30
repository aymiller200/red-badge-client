import '../styles/footer.scss'

import React from 'react'
import { Grid } from '@material-ui/core'

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <Grid container direction='row' justify="center" alignItems='center' className='footer'>
                <h4>Copyright © 2021 Ayanna Miller All Rights Reserved </h4>
               
                <h4> All photography on this page by Sara Collins (Instagram: @filmcowgirl) </h4>
            </Grid>
            </footer>
        )
    }
}

export default Footer