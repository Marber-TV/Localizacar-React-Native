const BASE_URL = 'https://www.localizacar.info/api/grupos';

export const fetchGroups = async (usermail) => {
  try {
    const response = await fetch(`https://www.localizacar.info/api/grupo-usuarios?usermail=${usermail}`);
    const data = await response.json();
    console.log('Fetched groups:', data);
    if (data && data.datos) {
      return data.datos;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

export const createGroup = async (groupData) => {
  try {
    console.log('Sending group data:', groupData);
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });
    if (!response.ok) throw new Error('Error creating group');
    const data = await response.json();
    console.log('Created group response:', data);
    return data.datos;
  } catch (error) {
    console.error('Error creating group:', error);
    console.error('Error creating group:', groupData );
    console.error('Error creating group:', response);
    return null;
  }
};

export const addUserToGroup = async (groupId, usermail) => {
  try {
    const response = await fetch(`${BASE_URL}/${groupId}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usermail }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error adding user to group');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding user to group:', error);
    return null;
  }
};

export const joinGroup = async (groupId, usermail) => {
  try {
    console.log(`Joining group ${groupId} with usermail ${usermail}`);
    const response = await fetch(`${BASE_URL}/${groupId}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usermail }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error joining group');
    }
    const data = await response.json();
    console.log('Join group response:', data);
    return data;
  } catch (error) {
    console.error('Error joining group:', error);
    return null;
  }
};

export const addCocheToGroup = async (groupId, matricula) => {
  try {
    console.log(`Adding coche ${matricula} to group ${groupId}`);
    const response = await fetch(`${BASE_URL}/${groupId}/coches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricula }),
    });
    if (!response.ok) throw new Error('Error adding coche to group');
    const data = await response.json();
    console.log('Add coche to group response:', data);
    return data;
  } catch (error) {
    console.error('Error adding coche to group:', error);
    return null;
  }
};

export const fetchUserCoches = async (usermail) => {
  try {
    console.log(`Fetching coches for user ${usermail}`);
    const response = await fetch(`https://www.localizacar.info/api/user/${usermail}/cars`);
    if (!response.ok) throw new Error('Error fetching user coches');
    const data = await response.json();
    console.log('Fetched user coches:', data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching user coches:', error);
    return [];
  }
};

export const fetchMessages = async (groupId) => {
  try {
    const response = await fetch(`${BASE_URL}/${groupId}/mensajes`);
    if (!response.ok) throw new Error('Error fetching messages');
    const data = await response.json();
    console.log('Fetched messages:', data);
    return data.datos || [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const sendMessage = async (groupId, usermail, contenido) => {
  try {
    console.log(`Sending message to group ${groupId} from ${usermail} with content: ${contenido}`);
    const response = await fetch(`${BASE_URL}/${groupId}/mensajes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usermail, contenido }),
    });
    if (!response.ok) throw new Error('Error sending message');
    const data = await response.json();
    console.log('Send message response:', data);
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

export const removeUserFromGroup = async (groupId, usermail) => {
  try {
    console.log(`Removing user ${usermail} from group ${groupId}`);
    const response = await fetch(`${BASE_URL}/${groupId}/usuarios`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usermail }),
    });

    if (response.status === 204 || response.status === 200) {
      console.log('User removed successfully');
      return { success: true };
    } else {
      const data = await response.json();
      console.log('Remove user from group response:', data);
      return data;
    }
  } catch (error) {
    console.error('Error removing user from group:', error);
    return null;
  }
};
