import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Product = () => {
  const [formData, setFormData] = useState({
    ProductName: '',
  });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      const data = response.data;

      
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error('Data is not in expected format:', data);
        setProducts([]); 
      }

      console.log('Fetched products:', data.products); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]); 
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { product_name: formData.ProductName };

      if (editingId) {
        await axios.put(`${baseURL}/product/${editingId}`, payload);
        alert('Data produk berhasil diperbarui!');
        setEditingId(null);
      } else {
        await axios.post(`${baseURL}/product`, payload);
        alert('Data produk berhasil disimpan!');
      }

      fetchProducts(); 
      setFormData({ ProductName: '' });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Gagal menyimpan data produk.');
    }
  };

  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleEdit = (product) => {
    setFormData({ ProductName: product.product_name });
    setEditingId(product.product_pk);
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/product`, { 
        data: { id } 
      });
      alert('Data produk berhasil dihapus!');
      fetchProducts(); 
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
        {editingId ? 'Edit Product' : 'Add Product'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Input Product Name"
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
        <h3 className="text-xl font-bold text-gray-700 mb-4">Product List</h3>
        <ul>
          {products.map((product) => (
            <li key={product.product_pk} className="flex justify-between items-center mb-2 p-2 border-b">
              <span>{product.product_name}</span>
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.product_pk)}
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

export default Product;
