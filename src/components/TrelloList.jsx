import React from 'react'
import AddCardorList from './AddCardorList'
import ListTitle from './ListTitle'
import TrelloCard from './TrelloCard'
import {Paper, CssBaseline, makeStyles} from "@material-ui/core";




const TrelloList = () => {
  const classes = useStyle();
  return (
    
        <Paper className={classes.root}>
            <CssBaseline/>
            <ListTitle />
            <TrelloCard />
            <TrelloCard />
            <AddCardorList type="Card"/>
        </Paper>
    
  )
}


const useStyle = makeStyles(theme => ({
  root: {
    width: "300px",
    background: "#ebecf0",
    margin: theme.spacing(1)
  }
}))

export default TrelloList