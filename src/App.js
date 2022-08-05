import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Table from './components/Table';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser.js';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
      <Table />
    </div>
  )
}

export default App