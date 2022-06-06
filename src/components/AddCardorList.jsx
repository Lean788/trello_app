import React, {useState} from 'react';
import {Collapse, alpha, makeStyles, Paper, Typography } from "@material-ui/core";
import AddCardorListText from './AddCardorListText';

const AddCardorList = ({type}) => {
  const [open, setOpen] = useState(true)
  const classes = useStyle();
  return (
    <div className={classes.root}>
        <Collapse in={open}>
          <AddCardorListText type={type} setOpen={setOpen}/>
        </Collapse>
        <Collapse in={!open}>
          <Paper
          onClick={()=>setOpen(true)} 
          className={classes.AddCardorListText}
          >
            <Typography>
              {
                type === "card" ? 
                "+ Add a card" :
                "+ Add another list"
              }
            </Typography>
          </Paper>
        </Collapse>
    </div>
  )
}



const useStyle = makeStyles(theme => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(1),
    
  },
  AddCardorListText: {
    padding: theme.spacing(1,1,1,2),
    margin: theme.spacing(0,1,1,1),
    background: "#ebecf0",
    "&:hover": {
      backgroundColor: alpha("#000", 0.25)
    },

  }
}))



export default AddCardorList