// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nimi: '',
    vanus: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/kasutajad', formData);
      console.log('Andmed saadetud andmebaasi:', response.data);
      // Võid siin teha ka muid tegevusi vastuse käsitlemiseks, kui soovid
    } catch (error) {
      console.error('Viga:', error);
    }
  };

  return (
    <div>
      <h2>Kasutaja Lisamine</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nimi:
          <input type="text" name="nimi" value={formData.nimi} onChange={handleChange} />
        </label>
        <br />
        <label>
          Vanus:
          <input type="number" name="vanus" value={formData.vanus} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Saada</button>
      </form>
    </div>
  );
};

export default UserForm;