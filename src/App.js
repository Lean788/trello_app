import './styles/App.css';
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import background_image from "./images/aman-dhakal-YkWz_coLm84-unsplash.jpg";
import AddCardorList from './components/AddCardorList';


function App() {
  const classes = useStyle();
  return (
      <div className={classes.root}>
        <div className={classes.container}>
          <TrelloList />
          <TrelloList />
          <div>
            <AddCardorList type="list"/>
          </div>
        </div>

      </div>
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
