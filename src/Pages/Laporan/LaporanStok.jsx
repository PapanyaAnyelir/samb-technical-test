import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LaporanStok = () => {
  const [stokData, setStokData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchStokData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/laporan-stok`);
        setStokData(response.data.stok);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchStokData();
  }, [API_BASE_URL]);

  if (loading) {
    return <div className="text-center mt-6">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        Error: {error.message || error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <Link to={'/'} className="text-gray-300 bg-slate-500 px-4 py-2 rounded-lg hover:bg-slate-600">Back</Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Laporan Stok</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Warehouse</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Qty Dus</th>
            <th className="border border-gray-300 px-4 py-2">Qty Pcs</th>
          </tr>
        </thead>
        <tbody>
          {stokData.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="border border-gray-300 px-4 py-2">
                {item.warehouse_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.product_name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.qty_dus}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.qty_pcs}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanStok;
