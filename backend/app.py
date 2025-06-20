from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
import uuid
import base64

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

pets = []

@app.route('/api/pets', methods=['GET'])
def get_pets():
    return jsonify(pets)

@app.route('/api/pets', methods=['POST'])
def create_pet():
    data = request.json
    
    pet_id = str(uuid.uuid4())
    
    # Create pet object
    pet = {
        'id': pet_id,
        'animal': data.get('animal', ''),
        'age': data.get('age', ''),
        'price': data.get('price', ''),
        'certifications': data.get('certifications', ''),
        'images': data.get('images', [])
    }
    
    # Add to our in-memory storage
    pets.append(pet)
    
    # Notify all clients about the new pet
    socketio.emit('new_pet', pet)
    
    return jsonify(pet), 201

@app.route('/api/pets/<pet_id>', methods=['PUT'])
def update_pet(pet_id):
    data = request.json
    
    for i, pet in enumerate(pets):
        if pet['id'] == pet_id:
            # Update pet data
            pets[i]['animal'] = data.get('animal', pet['animal'])
            pets[i]['age'] = data.get('age', pet['age'])
            pets[i]['price'] = data.get('price', pet['price'])
            pets[i]['certifications'] = data.get('certifications', pet['certifications'])
            pets[i]['images'] = data.get('images', pet['images'])
            
            # Notify all clients about the updated pet
            socketio.emit('update_pet', pets[i])
            
            return jsonify(pets[i])
    
    return jsonify({'error': 'Pet not found'}), 404

@app.route('/api/pets/<pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    for i, pet in enumerate(pets):
        if pet['id'] == pet_id:
            # Remove pet from storage
            deleted_pet = pets.pop(i)
            
            # Notify all clients about the deleted pet
            socketio.emit('delete_pet', {'id': pet_id})
            
            return jsonify(deleted_pet)
    
    return jsonify({'error': 'Pet not found'}), 404

# Upload images endpoint
@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    
    # In a production app, you'd save the file to disk or a cloud storage
    # For simplicity, we'll encode it to base64 and return
    file_content = file.read()
    encoded = base64.b64encode(file_content).decode('utf-8')
    
    return jsonify({'imageUrl': f"data:{file.content_type};base64,{encoded}"})

# Socket.IO event handlers
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)