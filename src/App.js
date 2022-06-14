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
import NavBar from './components/layout/NavBar';


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
  const addList = (title) => {
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

    const removeCard = (card, index) => {
      const results = Object.values(mockData.lists);
      const newCardsList = results[0].cards

      console.log(card);
      // arrFases = arrFases.filter(val => !fasewant.includes(val));
      const updatedCards = newCardsList.filter(tarjeta => tarjeta === index);
      updatedCards.splice(index, 1);
      setData([...newCardsList])      
      console.log(newCardsList);

    }

  // DnD
    const onDragEnd = (result) => {

      const {destination, destination:{droppableId:destdroppableId, index: destIndex}, source, source: {droppableId:sourcedroppableId, index: sourceIndex}, type, draggableId} = result
      // Control de datos:
      // console.table(result);

      // extracción de indicadores necesarios para sacar la lógica:
      // console.table([
      //   {
      //     sourcedroppableId,
      //     destdroppableId,
      //     draggableId
      //   }
      // ]);
      // console.table([
      //   {
      //     type,
      //     sourceIndex,
      //     destIndex
      //   }
      // ]);

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId &&
                destination.index === source.index) {
                  return;
                }

      if (type === "list") {
        const newListIds = data.listIds
        newListIds.splice(sourceIndex, 1)
        newListIds.splice(destIndex, 0, draggableId)
        return;
      }

      const start = data.lists[sourcedroppableId]
      const finish = data.lists[destdroppableId]
      const draggingCard = start.cards.filter((card) => card.id === draggableId)[0]
      console.log(draggingCard);
      
      if (start === finish) {
        // splice para intercambiar los indices
        start.cards.splice(sourceIndex, 1)
        finish.cards.splice(destIndex, 0, draggingCard)
        // actualizaremos setData con los nuevos indices
        setData({
          ...data,
          list:{
            ...data.lists,
            [start.id] : finish
          }
        })
      } else {
        
        const startCardIds = start.cards
        startCardIds.splice(sourceIndex, 1)
        const newStart = {
          ...start, 
          [start.cards.id] : startCardIds,
        }
        const finishCardIds = finish.cards
        finishCardIds.splice(destIndex, 0, draggingCard);
        const newFinish = {
          ...finish,
          [start.cards.id] : finishCardIds,
        }
        setData({
          ...data,
          lists:{
            [newStart.id] : newStart,
            [newFinish.id] : newFinish
          }

        })
      }
    };


  return (
      <ContextAPI.Provider value={{updateListTitle, addCard, addList, removeCard}}>
        
        <NavBar />
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
                        data?.listIds.map((listID, index) =>{
                        const list = data.lists[listID]
                        return <TrelloList className="trelloList" list={list} key={listID} index={index}/>
                        })
                      }
                    <div>
                      <AddCardorList type="list"/>
                    </div>
                      {provided.placeholder}
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
    minHeight: "100px",
  },
  trelloList:{
    flexGrow: 1,
  }
  
}));


export default App
