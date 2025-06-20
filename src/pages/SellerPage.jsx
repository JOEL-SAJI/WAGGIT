import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

const SellerPage = () => {
  const [petData, setPetData] = useState({
    animal: '',
    age: '',
    price: '',
    certifications: '',
    images: []
  });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch existing pets when the component mounts
    axios.get('http://localhost:5000/api/pets')
      .then(response => setPets(response.data))
      .catch(error => console.error('Error fetching pets:', error));

    // Set up socket listeners for real-time updates
    socket.on('delete_pet', data => {
      setPets(prevPets => prevPets.filter(pet => pet.id !== data.id));
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.off('delete_pet');
    };
  }, []);

  const handleChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('image', file);

      return axios.post('http://localhost:5000/api/upload', formData)
        .then(response => response.data.imageUrl);
    });

    const imageUrls = await Promise.all(uploadPromises);

    setPetData({
      ...petData,
      images: [...petData.images, ...imageUrls]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/pets', petData)
      .then(response => {
        setPets([...pets, response.data]);
        setPetData({
          animal: '',
          age: '',
          price: '',
          certifications: '',
          images: []
        });
      })
      .catch(error => console.error('Error creating pet listing:', error));
  };

  const handleDelete = (petId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      axios.delete(`http://localhost:5000/api/pets/${petId}`)
        .then(() => {
          setPets(pets.filter(pet => pet.id !== petId));
        })
        .catch(error => console.error('Error deleting pet listing:', error));
    }
  };

  return (
    <div className="seller-page pl-100 w-full h-[200vw] bg-zinc-900 bg-cover bg-center">
      <h1 className="text-[5vw] font-['FoundersGrotesk-Semibold'] text-red-400">Seller's Dashboard</h1>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="text-white text-[2vw] font-['FoundersGrotesk-Semibold']">
          <label>ANIMAL TYPE:</label>
          <input 
            className="bg-zinc-400 border-2 border-red-400 rounded-md ml-10 text-black"
            type="text" 
            name="animal" 
            value={petData.animal} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="text-white text-[2vw] font-['FoundersGrotesk-Semibold'] mt-6">
          <label>AGE:</label>
          <input 
            className="bg-zinc-400 border-2 border-red-400 rounded-md ml-16 text-black"
            type="text" 
            name="age" 
            value={petData.age} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="text-white text-[2vw] font-['FoundersGrotesk-Semibold'] mt-6">
          <label>PRICE:</label>
          <input 
            className="bg-zinc-400 border-2 border-red-400 rounded-md ml-11 text-black"
            type="number" 
            name="price" 
            value={petData.price} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="text-white text-[2vw] font-['FoundersGrotesk-Semibold'] mt-6">
          <label>CERTIFICATIONS:</label>
          <textarea 
            className="bg-zinc-400 text-black border-2 border-red-400 rounded-md ml-9"
            name="certifications" 
            value={petData.certifications} 
            onChange={handleChange}
          />
        </div>

        <div className="text-white text-[2vw] font-['FoundersGrotesk-Semibold'] mt-6">
          <label className="block mb-2 text-lg">Images:</label>
          <label className="relative w-48 group cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="bg-[#252525] text-[#e8e8e8] font-['FoundersGrotesk-Semibold'] px-4 py-2 rounded-t shadow-md w-48 text-center transition-colors duration-200 ease-in-out border-none group-hover:bg-[#2f2f2f] peer-focus:bg-[#353535]">
              Upload Images
            </div>
            <span className="absolute left-0 bottom-0 w-full h-px bg-white/40 peer-focus:h-0.5 peer-focus:bg-[#a3e583] transition-all duration-200 ease-in-out"></span>
          </label>
          <div className="image-preview mt-4 flex flex-wrap gap-2">
            {petData.images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index}`}
                className="w-[100px] h-[100px] object-cover rounded border border-white/20"
              />
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="text-white bg-black border border-black rounded px-8 py-3 transition-all duration-200 cursor-pointer hover:text-black hover:bg-[#ff90e8] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] active:translate-x-0 active:translate-y-0 active:shadow-none mt-6"
        >
          List Pet
        </button>
      </form>

      <h2 className="text-white text-[2vw] font-['FoundersGrotesk-Semibold'] pt-10">Your Listings</h2>
      <div className="pet-listings mt-6">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card mb-6 p-4 bg-zinc-800 rounded-lg shadow-lg">
            {pet.images.length > 0 && (
              <img 
                src={pet.images[0]} 
                alt={pet.animal} 
                className="w-[100px] h-[100px] object-cover rounded"
              />
            )}
            <h3 className="text-xl text-white mt-4">{pet.animal}</h3>
            <p className="text-white">Age: {pet.age}</p>
            <p className="text-white">Price: ${pet.price}</p>

            <div className="card-actions mt-4">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                onClick={() => handleDelete(pet.id)}
              >
                Delete Listing
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerPage;
