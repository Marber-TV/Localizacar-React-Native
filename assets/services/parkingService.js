const BASE_URL = 'https://www.localizacar.info/api';

export const fetchGroupsByUser = async (usermail) => {
  console.log('Fetching groups by user:', usermail);
  try {
    const response = await fetch(`${BASE_URL}/grupo-usuarios?usermail=${usermail}`);
    const data = await response.json();
    console.log('Groups by user response:', data);
    if (!response.ok) throw new Error(data.message || 'Error fetching groups by user');
    return data.datos;
  } catch (error) {
    console.error('Error fetching groups by user:', error);
    throw error;
  }
};

export const fetchCochesByGroup = async (groupId) => {
  console.log('Fetching coches by group:', groupId);
  try {
    const response = await fetch(`${BASE_URL}/grupos/${groupId}/coches`);
    const data = await response.json();
    console.log('Coches by group response:', data);
    if (!response.ok || !data.ok) throw new Error(data.message || 'Error fetching coches by group');
    return data.datos || [];
  } catch (error) {
    console.error('Error fetching coches by group:', error);
    throw error;
  }
};

export const fetchGroupCoches = async (usermail) => {
  console.log('Fetching group coches for user:', usermail);
  try {
    const groups = await fetchGroupsByUser(usermail);
    let allCoches = [];
    for (let group of groups) {
      try {
        const coches = await fetchCochesByGroup(group.id);
        allCoches = [...allCoches, ...coches];
      } catch (error) {
        console.error(`Error fetching coches for group ${group.id}:`, error);
      }
    }
    console.log('All coches for user:', allCoches);
    return allCoches;
  } catch (error) {
    console.error('Error fetching group coches:', error);
    throw error;
  }
};

export const fetchUserCoches = async (usermail) => {
  console.log('Fetching user coches:', usermail);
  try {
    const response = await fetch(`${BASE_URL}/user-coches?usermail=${usermail}`);
    const data = await response.json();
    console.log('User coches response:', data);
    if (!response.ok) throw new Error(data.message || 'Error fetching user coches');
    return data.datos;
  } catch (error) {
    console.error('Error fetching user coches:', error);
    throw error;
  }
};

export const fetchParkingByUser = async (usermail) => {
  console.log('Fetching parking by user:', usermail);
  try {
    const response = await fetch(`${BASE_URL}/parking?usermail=${usermail}`);
    const data = await response.json();
    console.log('Parking by user response:', data);
    if (!response.ok) throw new Error(data.message || 'Error fetching parking by user');
    return data.datos;
  } catch (error) {
    console.error('Error fetching parking by user:', error);
    throw error;
  }
};

export const createParking = async (parkingData) => {
  console.log('Creating parking with data:', parkingData);
  try {
    const response = await fetch(`${BASE_URL}/parking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parkingData),
    });
    const data = await response.json();
    console.log('Create parking response:', data);
    if (!response.ok) throw new Error(data.message || 'Error creating parking');
    return data;
  } catch (error) {
    console.error('Error creating parking:', error);
    throw error;
  }
};

export const fetchParkingData = async (matricula) => {
  try {
    const response = await fetch(`${BASE_URL}/parking?matricula=${matricula}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error fetching parking data');
    return data.datos;
  } catch (error) {
    console.error('Error fetching parking data:', error);
    throw error;
  }
};

export const fetchParkingDataByUser = async (usermail) => {
  try {
    const response = await fetch(`${BASE_URL}/parking?usermail=${usermail}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error fetching parking data');
    return data.datos;
  } catch (error) {
    console.error('Error fetching parking data:', error);
    throw error;
  }
};
