import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import FormPenerimaanBarang from "./Pages/Transaksi/FormPenerimaanBarang.jsx";
import FormPengeluaranBarang from "./Pages/Transaksi/FormPengeluaranBarang.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterPages from "./Pages/MasterPages.jsx";
import Product from "./Pages/Master/Product.jsx";
import Customer from "./Pages/Master/Customer.jsx";
import Warehouse from "./Pages/Master/Warehouse.jsx";
import Supplier from "./Pages/Master/Supplier.jsx";
import LaporanStok from "./Pages/Laporan/LaporanStok.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterPages />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/warehouse",
    element: <Warehouse />,
  },
  {
    path: "/supplier",
    element: <Supplier />,
  },
  {
    path: "/PenerimaanBrg",
    element: <FormPenerimaanBarang />,
  },
  {
    path: "/PengeluaranBrg",
    element: <FormPengeluaranBarang />,
  },
  {
    path: "/LaporanStok",
    element: <LaporanStok />,
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
