import './styles/App.css';
import {useState} from "react";
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import background_image from "./images/aman-dhakal-YkWz_coLm84-unsplash.jpg";
import AddCardorList from './components/AddCardorList';
import mockData from "./mockdata.js";
import ContextAPI from './ContextAPI';



function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);


  const updateListTitle = (updatedTitle, listId) => {
    const list = data.lists[listId]
    list.title = updatedTitle;
    setData({
      ...data, 
      list: {
        ...data.list,
        [listId] : list
      }
    })
  }

  return (
      <ContextAPI.Provider value={{updateListTitle}}>
        <div className={classes.root}>
          <div className={classes.container}>
            {
              data.listIds.map(listID =>{
                const list = data.lists[listID]
                return <TrelloList list={list} key={listID}/>
                
              })
            }
            <div>
              <AddCardorList type="list"/>
            </div>
          </div>

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


export default App;
