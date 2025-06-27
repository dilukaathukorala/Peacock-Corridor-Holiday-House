import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const UpdateItemForm = ({ item, onBack, setSuccessMessage }) => {
  const [updatedItem, setUpdatedItem] = useState(item);

  useEffect(() => {
    setUpdatedItem(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send PUT request to update item
    axios.put(`http://localhost:8070/inventory/update/${updatedItem._id}`, updatedItem)
      .then(() => {
        setSuccessMessage('Item updated successfully');
        
        // Automatically reload the Stock Management page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // Return to the inventory list after setting success message
        onBack();
      })
      .catch((err) => {
        console.error("Error updating item:", err);
        setSuccessMessage('Error updating item');
      });
  };

  return (
    <div className="update-item-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item ID :</label>
          <input
            type="text"
            name="id"
            value={updatedItem.itemID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Item Name :</label>
          <input
            type="text"
            name="itemName"
            value={updatedItem.itemName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Item Description :</label>
          <input
            type="text"
            name="description"
            value={updatedItem.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Item Quantity :</label>
          <input
            type="text"
            name="quantity"
            value={updatedItem.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Item Price (Rs.) :</label>
          <input
            type="text"
            name="price"
            value={updatedItem.price}
            onChange={handleChange}
            placeholder="Enter Price"
          />
        </div>
        <button type="submit" className="update-button">Update</button>
        <button type="button" className="back-button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
