import React, { useState } from 'react';
import '../CSS/AddItemForm.css';
import axios from 'axios';

const AddItemForm = ({ onBack, setSuccessMessage }) => {
  const [item, setItem] = useState({
    id: '',
    name: '',
    description: '',
    quantity: '',
    price: '', // Store only the numeric part
    unit: 'pcs', // default unit
    phoneNumber: '', // Added phone number field
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'id') {
      
      if (value.length > 5 || (!/^(0|[1-9][0-9]{0,4})?$/.test(value) && value !== '')) {
        setErrors((prev) => ({ ...prev, [name]: 'Item ID must be a positive integer (up to 5 digits and not starting with 0)' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
      }
    }

    if (name === 'quantity' || name === 'price') {
      if (!/^\d*\.?\d*$/.test(value) && value !== '') {
        setErrors((prev) => ({ ...prev, [name]: 'Must be a positive number' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }

    
    if (name === 'price') {
      setItem({ ...item, [name]: value.replace(/Rs.\s*/, '') }); 
    } else if (name === 'phoneNumber') {
      if (!/^\d{0,10}$/.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: 'Phone number must be exactly 10 digits' }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setItem({ ...item, [name]: value });
      }
    } else if (name !== 'id') {
      setItem({ ...item, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!item.id.trim() || !/^(0|[1-9][0-9]{0,4})$/.test(item.id)) {
      newErrors.id = 'Item ID must be a positive integer (up to 5 digits and not starting with 0)';
    }

    if (!item.name.trim()) {
      newErrors.name = 'Item Name is required';
    }

    if (!item.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!item.quantity || isNaN(item.quantity) || item.quantity <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    // Validate price
    if (!item.price || isNaN(item.price) || item.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Validate phone number
    if (!item.phoneNumber || !/^\d{10}$/.test(item.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newItem = {
        itemID: item.id,
        itemName: item.name,
        description: item.description,
        quantity: `${item.quantity} ${item.unit}`,
        price: `Rs. ${item.price}`, // Send price with "Rs."
        phoneNumber: item.phoneNumber, // Include phone number in the payload
      };

      axios.post("http://localhost:8070/inventory/add", newItem)
        .then(() => {
          setSuccessMessage('Item added successfully');
          onBack(); // Return to the inventory list

          // Refresh the stock management page after 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setSuccessMessage('Error adding item');
          console.error("Error adding item:", err);
        });
    }
  };

  return (
    <div className="add-item-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item ID:</label>
          <input
            type="text"
            name="id"
            value={item.id}
            onChange={handleChange}
            placeholder="Enter Item ID (up to 5 digits)"
          />
          {errors.id && <p className="error">{errors.id}</p>}
        </div>

        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="Enter Item Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={item.description}
            onChange={handleChange}
            placeholder="Enter Description"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
          />
          <select
            name="unit"
            value={item.unit}
            onChange={handleChange}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="pcs">pcs</option>
          </select>
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>

        <div className="form-group">
          <label>Price (Rs):</label>
          <input
            type="text"
            name="price"
            value={`Rs. ${item.price}`} // Display with "Rs."
            onChange={handleChange}
            placeholder="Enter Price"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={item.phoneNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <button type="submit" className="add-item-button">+ Add Item</button>
      </form>
      <button className="back-button" onClick={onBack}>Back to Inventory</button>
    </div>
  );
};

export default AddItemForm;
