import React from 'react';
import '../css/item.css';

const Item = ({itemName, quantity}) => {
    
    return (
        <div className='item'>
            <h3>
                {itemName} X {quantity}
            </h3>
        </div>
    )
}

export default Item;