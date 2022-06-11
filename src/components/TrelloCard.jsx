import { IconButton, makeStyles, Paper } from '@material-ui/core';
import React, { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import ContextAPI from '../ContextAPI';
import ClearIcon from "@material-ui/icons/Clear"


const TrelloCard = ({card, index}) => {

  const classes = useStyle();

  const {removeCard} = useContext(ContextAPI)

  return (
    <Draggable draggableId={card.id} index={index}>
      {
        (provided) => (
          <div 
          ref={provided.innerRef} 
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          >
            <Paper className={classes.trellocard}>
                {card.title}
                <IconButton onClick = {() => removeCard(index)} aria-label="delete" size="small">
                  <ClearIcon color='error' className="btnDelete" fontSize="small"/>
                </IconButton>
            </Paper>
          </div>
        )
      }
    </Draggable>
  )
}

const useStyle = makeStyles(theme => ({
  trellocard: {
    padding: theme.spacing(1,1,1,2),
    margin: theme.spacing(1),
    display:"flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover":{
      
    }
    
  }
}))

export default TrelloCard