import React, { useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertBar = (props) => {

    const [state, SetState] = useState({
        open:false,
        msg:''
    });

    useEffect(() => {
        SetState({open:props.open,msg:props.msg});
    },[props]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        SetState({open:false});
      };

    return (
        <div style={{zindex:1000}}>
            <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose} >
              <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {state.msg}
              </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default AlertBar
