import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FormPenerimaanBarang = () => {
  const [formData, setFormData] = useState({
    whs_idf: '',
    trx_in_supp_idf: '',
    trx_in_notes: '',
    details: [],
  });

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouse] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    trx_in_d_product_idf: '',
    trx_in_d_qty_dus: 0,
    trx_in_d_qty_pcs: 0,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/suppliers`);
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/warehouses`);
        setWarehouse(response.data.warehouses);
      } catch (error) {
        console.error('Error fetching warehouses', error);
      }
    };

    fetchSuppliers();
    fetchProducts();
    fetchWarehouse();
  }, [API_BASE_URL]);

  const addProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      details: [...prevData.details, selectedProduct],
    }));
    setSelectedProduct({ trx_in_d_product_idf: '', trx_in_d_qty_dus: 0, trx_in_d_qty_pcs: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.details.length === 0) {
      alert('Mohon tambahkan minimal satu produk.');
      return;
    }
  
    const payload = {
      header: {
        whs_idf: formData.whs_idf,
        trx_in_supp_idf: formData.trx_in_supp_idf,
        trx_in_notes: formData.trx_in_notes,
      },
      details: formData.details,
    };
  
    try {
      await axios.post(`${API_BASE_URL}/inbound`, payload);
      alert('Goods received successfully');
  
      setFormData({
        whs_idf: '',
        trx_in_supp_idf: '',
        trx_in_notes: '',
        details: [],
      });
  
      setSelectedProduct({
        trx_in_d_product_idf: '',
        trx_in_d_qty_dus: 0,
        trx_in_d_qty_pcs: 0,
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error receiving goods');
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <Link to={'/'} className="text-gray-300 bg-slate-500 px-4 py-2 rounded-lg hover:bg-slate-600">Back</Link>
      <h2 className="text-2xl font-bold mb-4 text-center">Form Penerimaan Barang</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700" htmlFor="trx_in_supp_idf">Supplier</label>
          <select
            id="trx_in_supp_idf"
            value={formData.trx_in_supp_idf}
            onChange={(e) => setFormData({ ...formData, trx_in_supp_idf:  parseInt(e.target.value) })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.supplier_pk} value={supplier.supplier_pk}>
                {supplier.supplier_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700" htmlFor="whs_idf">Warehouse</label>
          <select
            id="whs_idf"
            value={formData.whs_idf}
            onChange={(e) => setFormData({ ...formData, whs_idf:  parseInt(e.target.value) })}
            className="p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.warehouse_pk} value={warehouse.warehouse_pk}>
                {warehouse.warehouse_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700" htmlFor="trx_in_notes">Catatan</label>
          <textarea
            id="trx_in_notes"
            value={formData.trx_in_notes}
            onChange={(e) => setFormData({ ...formData, trx_in_notes: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg"
            rows="4"
          />
        </div>

        <div className="flex flex-col border-t pt-4">
          <h3 className="text-lg font-bold mb-2">Tambah Produk</h3>
          <select
            value={selectedProduct.trx_in_d_product_idf}
            onChange={(e) => setSelectedProduct({ 
              ...selectedProduct, 
              trx_in_d_product_idf: parseInt(e.target.value)  
            })}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Pilih Produk</option>
            {products.map((product) => (
              <option key={product.product_pk} value={product.product_pk}>
                {product.product_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Qty Dus"
            value={selectedProduct.trx_in_d_qty_dus}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, trx_in_d_qty_dus: parseInt(e.target.value) })}
            className="p-2 border border-gray-300 rounded-lg mt-2"
          />

          <input
            type="number"
            placeholder="Qty Pcs"
            value={selectedProduct.trx_in_d_qty_pcs}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, trx_in_d_qty_pcs: parseInt(e.target.value) })}
            className="p-2 border border-gray-300 rounded-lg mt-2"
          />

          <button
            type="button"
            onClick={addProduct}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-green-600"
          >
            Tambah Produk
          </button>
        </div>

        <ul className="mt-4">
          {formData.details.map((item, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              <span>{products.find((prod) => prod.product_pk === parseInt(item.trx_in_d_product_idf))?.product_name}</span>
              <span>Dus: {item.trx_in_d_qty_dus}, Pcs: {item.trx_in_d_qty_pcs}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPenerimaanBarang;
