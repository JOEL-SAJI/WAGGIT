import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

const BuyerPage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all pets when component mounts
    axios.get('http://localhost:5000/api/pets')
      .then(response => {
        setPets(response.data);
        setFilteredPets(response.data);
      })
      .catch(error => console.error('Error fetching pets:', error));
    
    // Set up socket listeners for real-time updates
    socket.on('new_pet', newPet => {
      setPets(prevPets => [...prevPets, newPet]);
    });
    
    socket.on('update_pet', updatedPet => {
      setPets(prevPets => 
        prevPets.map(pet => 
          pet.id === updatedPet.id ? updatedPet : pet
        )
      );
    });
    
    socket.on('delete_pet', data => {
      setPets(prevPets => 
        prevPets.filter(pet => pet.id !== data.id)
      );
    });
    
    // Clean up socket listeners on unmount
    return () => {
      socket.off('new_pet');
      socket.off('update_pet');
      socket.off('delete_pet');
    };
  }, []);
  
  // Update filtered pets whenever the pets list or search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = pets.filter(pet => 
        pet.animal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPets(filtered);
    } else {
      setFilteredPets(pets);
    }
  }, [pets, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="buyer-page bg-gradient-to-b from-[#02A388] to-[#F9F9F9] min-h-screen p-10 text-white">
      <h1 className="text-center text-[5vw] text-white font-bold mb-10 font-['FoundersGrotesk-Semibold']">Available Pets</h1>
      
      <div className="search-bar flex justify-center mb-10">
        <input
          type="text" 
          placeholder="Search by animal type"
          value={searchTerm}
          onChange={handleSearch}
          className="p-4 rounded-lg w-1/2 md:w-1/3 text-xl focus:outline-none text-zinc-700"
        />
      </div>
      
      <div className="pet-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card bg-white text-black rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="images-slider h-56">
              {pet.images.map((url, index) => (
                <img 
                  key={index} 
                  src={url} 
                  alt={`${pet.animal} - ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{pet.animal}</h2>
              <p className="mb-2"><strong>Age:</strong> {pet.age}</p>
              <p className="mb-2"><strong>Price:</strong> ${pet.price}</p>
              {pet.certifications && (
                <p className="mb-4"><strong>Certifications:</strong> {pet.certifications}</p>
              )}
              <button 
                className="w-full py-2 bg-[#023020] text-white font-semibold rounded-lg hover:bg-[#228B22] transition-all duration-300"
              >
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;
