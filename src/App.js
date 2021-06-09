import React from "react";
import { connect } from "react-redux";
import TripInfo from './components/TripInfo';
import Item from './components/Item';
import './css/App.css';

const App = ({ items }) => {
  return (  
    <div className='App'>
      <TripInfo />
      {items.length === 0 ? '' : <h2>Needed items:</h2>}
      <div className='itemsContainer'>
        {items.map((item, index) => (
          <Item itemName={item.name} quantity={item.quantity} key={index}/>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state
})

export default connect(mapStateToProps, null)(App);
