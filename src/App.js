import React, { useEffect, useState } from 'react';
import AppNavbar from './component/AppNavbar';
import ShowData from './component/ShowData';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from './component/Details';
import Paginate from './component/Paginate';
import Cart from './component/Cart';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <BrowserRouter>
    <AppNavbar/>
      <Routes>
          <Route path="/" element={<ShowData data={data} />} />
          <Route path="/paginate" element={<Paginate data={data} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details/:itemId" element={<Details data={data} />} />
          <Route path="*" element={<NoPage  />} />

      </Routes>
    </BrowserRouter>
  )
}

function NoPage() {
   return (
     <div className="">
        <h1>404 - Page Not Found..</h1>
     </div>
   )
}

export default App;
