import React from 'react'
import AddCardorList from './AddCardorList'
import ListTitle from './ListTitle'
import TrelloCard from './TrelloCard'
import {Paper, CssBaseline, makeStyles} from "@material-ui/core";
import { Draggable, Droppable } from 'react-beautiful-dnd';




const TrelloList = ({list, index}) => {
  // console.log(list);
    const classes = useStyle();
    return (
        <Draggable 
        draggableId={list.id} 
        index={index}
        >        
          {
            (provided) => (
                        <div
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                        // {...provided.dragHandleProps}
                        >
                          <Paper 
                          className={classes.root} 
                          {...provided.dragHandleProps}
                          >
                                <CssBaseline/>
                                  <ListTitle title={list.title} listId={list.id}/>
                                  <Droppable droppableId={list.id} key={list.id} type="card">
                                    {
                                      (provided) => (
                                        <div
                                        className={classes.taskList}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                          {
                                            list.cards.map((card, index) => (
                                              <TrelloCard 
                                              card={card} 
                                              key={card.id} 
                                              index={index}
                                              />
                                            ))
                                          }
                                          {provided.placeholder}
                                        </div>
                                      )    
                                    }
                                  </Droppable>   
                            <AddCardorList 
                            type="card"
                            listId={list.id}
                            />
                          </Paper>
                        </div>
                    )
          } 
        </Draggable>
      );
    }
const useStyle = makeStyles(theme => ({
  root: {
    width: "300px",
    background: "#ebecf0",
    margin: theme.spacing(1)
  },
  taskList:{
     
  }
}));

export default TrelloList