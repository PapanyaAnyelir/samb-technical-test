import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Warehouse = () => {
  const [formData, setFormData] = useState({
    WarehouseName: '',
  });
  const [warehouses, setWarehouses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  
  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${baseURL}/warehouses`);
      const data = response.data;

      
      if (data && Array.isArray(data.warehouses)) {
        setWarehouses(data.warehouses);
      } else {
        console.error('Data is not in expected format:', data);
        setWarehouses([]); 
      }

      console.log('Fetched warehouses:', data.warehouses); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setWarehouses([]); 
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { warehouse_name: formData.WarehouseName };

      if (editingId) {
        await axios.put(`${baseURL}/warehouse/${editingId}`, payload);
        alert('Data produk berhasil diperbarui!');
        setEditingId(null);
      } else {
        await axios.post(`${baseURL}/warehouse`, payload);
        alert('Data produk berhasil disimpan!');
      }

      fetchWarehouses(); 
      setFormData({ WarehouseName: '' });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Gagal menyimpan data produk.');
    }
  };

  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleEdit = (warehouse) => {
    setFormData({ WarehouseName: warehouse.warehouse_name });
    setEditingId(warehouse.warehouse_pk);
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/warehouse`, { 
        data: { id } 
      });
      alert('Data produk berhasil dihapus!');
      fetchWarehouses(); 
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Gagal menghapus data produk.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link to={'/'} className="text-gray-300 bg-slate-500 px-4 py-2 rounded-lg hover:bg-slate-600">
        Back
      </Link>
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        {editingId ? 'Edit Warehouse' : 'Add Warehouse'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Warehouse Name
          </label>
          <input
            type="text"
            name="WarehouseName"
            value={formData.WarehouseName}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Input Warehouse Name"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          {editingId ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Warehouse List</h3>
        <ul>
          {warehouses.map((warehouse) => (
            <li key={warehouse.warehouse_pk} className="flex justify-between items-center mb-2 p-2 border-b">
              <span>{warehouse.warehouse_name}</span>
              <div>
                <button
                  onClick={() => handleEdit(warehouse)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(warehouse.warehouse_pk)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Warehouse;
