import React, {useState} from 'react';
import {Collapse, alpha, makeStyles, Paper, Typography } from "@material-ui/core";
import AddCardorListText from './AddCardorListText';

const AddCardorList = ({type}) => {
  const [open, setOpen] = useState(false)
  const classes = useStyle();
  return (
    <div className={classes.root}>
        <Collapse in={open}>
          <AddCardorListText />
        </Collapse>
        <Collapse in={!open}>
          <Paper className={classes.AddCardorListText}>
            <Typography>
              + Add another card
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