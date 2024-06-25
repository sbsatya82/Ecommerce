import React, { useState } from "react";
import { itemRemoveFromCart } from "../../action/action";

function CartItem({product}) {
  const [productQuantity,setProductQuantity] = useState(product.quantity)
  const handleRemove = ()=>{
    itemRemoveFromCart(product.product._id);
  }
  const quantityHandle = (e)=>{
    const newQuantity = parseInt(e.target.value);
    setProductQuantity(newQuantity);
  }
  return (
    <>
      <tr>
        <td>
          <div className="cart-info">
            <img src={product.product.images[0].url} alt="" />
            <div>
              <p>{product.product.name}</p>
              <span>{product.product.price}</span> <br />
              <button onClick={handleRemove}>
                Remove
              </button>
            </div>
          </div>
        </td>
        <td>
          <input type="number" 
            onChange={quantityHandle} 
            value={productQuantity}
            min="1"
          />
        </td>
        <td>{product.quantity * product.product.price}</td>
      </tr>
    </>
  );
}

export default CartItem;

