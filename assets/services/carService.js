const BASE_URL = 'https://www.localizacar.info/api';

export const fetchUserCoches = async (usermail) => {
    try {
        console.log(`Fetching coches for user ${usermail}`);
        const response = await fetch(`${BASE_URL}/user/${usermail}/cars`);
        if (!response.ok) throw new Error('Error fetching user coches');
        const data = await response.json();
        console.log('Fetched user coches:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching user coches:', error);
        return [];
    }
};

export const createCar = async (carData) => {
    try {
        console.log('Creating car with data:', carData);
        const response = await fetch(`${BASE_URL}/coches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) throw new Error('Error creating car');
        const data = await response.json();
        console.log('Created car response:', data);
        return data;
    } catch (error) {
        console.error('Error creating car:', error);
        return null;
    }
};

export const updateCar = async (matricula, marca, color) => {
    try {
        console.log(`Updating car ${matricula} with marca ${marca} and color ${color}`);
        const response = await fetch(`${BASE_URL}/coches/${matricula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ marca, color }),
        });
        if (!response.ok) throw new Error('Error updating car');
        const data = await response.json();
        console.log('Update car response:', data);
        return data;
    } catch (error) {
        console.error('Error updating car:', error);
        return null;
    }
};

export const deleteCar = async (matricula) => {
    try {
        console.log(`Deleting car with matricula ${matricula}`);
        const response = await fetch(`${BASE_URL}/coches/${matricula}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error deleting car');
        console.log('Delete car response:', response);
        return response.ok;
    } catch (error) {
        console.error('Error deleting car:', error);
        return false;
    }
};
