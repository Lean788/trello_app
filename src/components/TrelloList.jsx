import React from 'react'
import {Paper, CssBaseline} from "@mui/material"
import ListTitle from './ListTitle'
import TrelloCard from './TrelloCard'
import AddCardorList from './AddCardorList'

const TrelloList = () => {
  return (
    
    <Paper>
        <div>
            <CssBaseline/>
            <ListTitle />
            <TrelloCard />
            <TrelloCard />
            <TrelloCard />
            <AddCardorList />
        </div>
    </Paper>
  )
}

export default TrelloList