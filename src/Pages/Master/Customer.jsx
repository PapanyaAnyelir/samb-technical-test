import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

const Customer = () => {
  const [formData, setFormData] = useState({
    CustomerName: "",
  });
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${baseURL}/customers`);
      const data = response.data;

      if (data && Array.isArray(data.customers)) {
        setCustomers(data.customers);
      } else {
        console.error("Data is not in expected format:", data);
        setCustomers([]);
      }

      console.log("Fetched customers:", data.customers);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCustomers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { customer_name: formData.CustomerName };

      if (editingId) {
        await axios.put(`${baseURL}/customer/${editingId}`, payload);
        alert("Data customer berhasil diperbarui!");
        setEditingId(null);
      } else {
        await axios.post(`${baseURL}/customer`, payload);
        alert("Data customer berhasil disimpan!");
      }

      fetchCustomers();
      setFormData({ CustomerName: "" });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Gagal menyimpan data customer.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (customer) => {
    setFormData({ CustomerName: customer.customer_name });
    setEditingId(customer.customer_pk);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/customer`, {
        data: { id },
      });
      alert("Data customer berhasil dihapus!");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus data customer.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link
        to={"/"}
        className="text-gray-300 bg-slate-500 px-4 py-2 rounded-lg hover:bg-slate-600">
        Back
      </Link>
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        {editingId ? "Edit Customer" : "Add Customer"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            name="CustomerName"
            value={formData.CustomerName}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            placeholder="Input Customer Name"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Customer List</h3>
        <ul>
          {customers.map((customer) => (
            <li
              key={customer.customer_pk}
              className="flex justify-between items-center mb-2 p-2 border-b">
              <span>{customer.customer_name}</span>
              <div>
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600 transition duration-300">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.customer_pk)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">
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

export default Customer;
