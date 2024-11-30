import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Supplier = () => {
  const [formData, setFormData] = useState({
    SupplierName: '',
  });
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${baseURL}/suppliers`);
      const data = response.data;

      
      if (data && Array.isArray(data.suppliers)) {
        setSuppliers(data.suppliers);
      } else {
        console.error('Data is not in expected format:', data);
        setSuppliers([]); 
      }

      console.log('Fetched suppliers:', data.suppliers); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setSuppliers([]); 
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { supplier_name: formData.SupplierName };

      if (editingId) {
        await axios.put(`${baseURL}/supplier/${editingId}`, payload);
        alert('Data produk berhasil diperbarui!');
        setEditingId(null);
      } else {
        await axios.post(`${baseURL}/supplier`, payload);
        alert('Data produk berhasil disimpan!');
      }

      fetchSuppliers(); 
      setFormData({ SupplierName: '' });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Gagal menyimpan data produk.');
    }
  };

  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleEdit = (supplier) => {
    setFormData({ SupplierName: supplier.supplier_name });
    setEditingId(supplier.supplier_pk);
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/supplier`, { 
        data: { id } 
      });
      alert('Data produk berhasil dihapus!');
      fetchSuppliers(); 
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
        {editingId ? 'Edit Supplier' : 'Add Supplier'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Supplier Name
          </label>
          <input
            type="text"
            name="SupplierName"
            value={formData.SupplierName}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Input Supplier Name"
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
        <h3 className="text-xl font-bold text-gray-700 mb-4">Supplier List</h3>
        <ul>
          {suppliers.map((supplier) => (
            <li key={supplier.supplier_pk} className="flex justify-between items-center mb-2 p-2 border-b">
              <span>{supplier.supplier_name}</span>
              <div>
                <button
                  onClick={() => handleEdit(supplier)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(supplier.supplier_pk)}
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

export default Supplier;
