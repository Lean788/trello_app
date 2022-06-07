import './styles/App.css';
import {useState} from "react";
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import background_image from "./images/aman-dhakal-YkWz_coLm84-unsplash.jpg";
import AddCardorList from './components/AddCardorList';
import mockData from "./mockdata.js";
import ContextAPI from './ContextAPI';
import uuid from "react-uuid";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);


  const updateListTitle = (updatedTitle, listId) => {
    const list = data.lists[listId]
    list.title = updatedTitle;
    setData({
      ...data, 
      lists: {
        ...data.lists,
        [listId] : list
      }
    })
  }

  
  const addCard = (title, listId) => {
    // Id unico para cada Card.
    const newCardId = uuid();
    // Crear el card nuevo.
    const newCard = {
      id: newCardId,
      title: title
    }
    // Añadir el newCard al array de cards que tiene la lista
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId] : list
      }
    })
  };
  const addList = (title, listId) => {
    // Generar un id único para la lista nueva
    const newListId = uuid()
    
    setData({
        listIds : [...data.listIds, newListId],
        lists : {
          ...data.lists,
          [newListId] : {
            id: newListId,
            title: title,
            cards:[]
          }
        }
      })
    }
  
  // DnD
    const onDragEnd = () => {

    };






  return (
      <ContextAPI.Provider value={{updateListTitle, addCard, addList}}>
        <div className={classes.root}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable 
              droppableId='1234' 
              type="list" 
              direction='Horizontal'
              >
                {
                  (provided) => (
                    <div 
                    className={classes.container} 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                      {
                        data.listIds.map(listID =>{
                          const list = data.lists[listID]
                          return <TrelloList list={list} key={listID}/>
                          
                        })
                      }
                      <div>
                          <AddCardorList type="list"/>
                          {provided.placeholder}
                      </div>
                    </div>
                  )
                }
            </Droppable>

          </DragDropContext>


        </div>

      </ContextAPI.Provider>
  );
}



const useStyle = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    overflowY: "auto",
    backgroundImage: `url(${background_image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    display: "flex",
    
  },
  
}));


export default App
