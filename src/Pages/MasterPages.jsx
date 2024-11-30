import React, { useState } from "react";
import { Link } from "react-router";
const MasterPages = () => {
  const [masterDropdown, setMasterDropdown] = useState(false);
  const [transaksiDropdown, setTransaksiDropdown] = useState(false);
  const [laporanDropdown, setLaporanDropdown] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-around items-center">
        <div className="text-white text-lg font-semibold">
          PT. SAMB Tecnical Test
        </div>
        <ul className="flex space-x-10">
          <li className="relative">
            <button
              onClick={() => setMasterDropdown(!masterDropdown)}
              className="text-gray-300 hover:text-white transition duration-300">
              Master
            </button>
            {masterDropdown && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/supplier"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Supplier
                  </Link>
                </li>
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/customer"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Customer
                  </Link>
                </li>
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/warehouse"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Warehouse
                  </Link>
                </li>
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/product"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => setTransaksiDropdown(!transaksiDropdown)}
              className="text-gray-300 hover:text-white transition duration-300">
              Transaksi
            </button>
            {transaksiDropdown && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/penerimaanBrg"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Penerimaan Barang
                  </Link>
                </li>
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/PengeluaranBrg"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Pengeluaran Barang
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => setLaporanDropdown(!laporanDropdown)}
              className="text-gray-300 hover:text-white transition duration-300">
              Laporan
            </button>
            {laporanDropdown && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                <li className="hover:bg-gray-600">
                  <Link
                    to={"/LaporanStok"}
                    className="block px-4 py-2 text-gray-200 hover:text-white">
                    Stok Barang
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MasterPages;
