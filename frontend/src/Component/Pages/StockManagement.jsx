import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable plugin for jsPDF
import '../CSS/StockManagement.css';
import AddItemForm from './AddItemForm.jsx';
import UpdateItemForm from './UpdateItemForm.jsx';
import Header from '../Common/Header.jsx'; // Import new Header component
import Navbar from '../Common/NavBar.jsx';


const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showUpdateItemForm, setShowUpdateItemForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Add state for success/error message
  const [shouldRefresh, setShouldRefresh] = useState(false); // State to control refresh

  // Fetch inventory items from backend
  useEffect(() => {
    axios.get("http://localhost:8070/inventory")
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.error("Error fetching inventory data:", err);
      });
  }, []);

  // Effect to refresh the page
  useEffect(() => {
    if (shouldRefresh) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000); // Reload after 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [shouldRefresh]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Message will disappear after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [successMessage]);

  const handleUpdate = (item) => {
    setCurrentItem(item);
    setShowUpdateItemForm(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/inventory/delete/${id}`)
      .then(() => {
        const updatedItems = items.filter(item => item._id !== id);
        setItems(updatedItems);
        setSuccessMessage('Item deleted successfully!'); // Set message on successful delete
        setShouldRefresh(true); // Trigger refresh after delete
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        setSuccessMessage('Error deleting item. Please try again.'); // Optional: set error message
      });
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 14, 16);
    
    const columns = [
      { header: "Item ID", dataKey: "itemID" },
      { header: "Item Name", dataKey: "itemName" },
      { header: "Description", dataKey: "description" },
      { header: "Quantity", dataKey: "quantity" },
      { header: "Price (per unit)", dataKey: "price" },
    ];
    
    const data = items.map(item => ({
      itemID: item.itemID,
      itemName: item.itemName,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }));

    doc.autoTable(columns, data, { startY: 30 });
    doc.save("inventory_report.pdf");
  };

  const handleAddItemClick = () => {
    setSuccessMessage(''); // Clear the message when adding a new item
    setShowAddItemForm(true);
  };

  const handleBackToInventory = () => {
    setShowAddItemForm(false);
    setShowUpdateItemForm(false);
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-management">
      <Header /> {/* Render Header */}
      <Navbar /> {/* Render Navbar */}
      {showAddItemForm ? (
        <AddItemForm onBack={handleBackToInventory} setSuccessMessage={setSuccessMessage} />
      ) : showUpdateItemForm ? (
        <UpdateItemForm item={currentItem} onBack={handleBackToInventory} setSuccessMessage={setSuccessMessage} />
      ) : (
        <>
          {/* Display success or error message */}
          {successMessage && (
            <div className={`message ${successMessage.includes('success') ? 'success' : 'error'}`}>
              {successMessage}
            </div>
          )}

          <div className="actions">
            <button className="add-item" onClick={handleAddItemClick}>+ Add Item</button>
            <button className="download-report" onClick={handleDownloadReport}>Download Report</button>
          </div>

          <input
            type="text"
            placeholder="Search by item name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          <table className="inventory-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price (per unit)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td><input type="checkbox" /></td>
                  <td>{item.itemID}</td>
                  <td>{item.itemName}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="update-button" onClick={() => handleUpdate(item)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InventoryManagement;
