export const BASE_URL = "http://localhost:3000";


// --------------------- USERS ---------------------

// Get all users
export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`);
    return await res.json();
  }
  
// Log in user by identidad and password
export async function loginUser(identidad, password) {
    const users = await getUsers();
    return users.find(
      u => u.identidad === identidad && u.password === password
    );
  }
  
  
  // Create new user (registration)
  export async function createUser(userData) {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    return await res.json();
  }
  
  // Update user by ID
  export async function updateUser(id, userData) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    return await res.json();
  }
  
  // Delete user by ID
  export async function deleteUser(id) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE"
    });
    return res.ok;
  }

  
// Get events by user ID
export async function getEventsByUserId(userId) {
  const res = await fetch(`${BASE_URL}/events?userId=${userId}`);
  return await res.json();
}

// Get all events (only for admin)
export async function getAllEvents() {
  const res = await fetch(`${BASE_URL}/events`);
  return await res.json();
}

// Create a new event
export async function createEvent(eventData) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return await res.json();
}

// Update existing event
export async function updateEvent(eventId, updatedEventData) {
  const res = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEventData),
  });
  return await res.json();
}

// Delete event
export async function deleteEvent(eventId) {
    const res = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "DELETE",
    });
    return res.ok;
  }
  

// Get attendance records (stays)
export async function getStays() {
  const res = await fetch(`${BASE_URL}/stays`);
  return await res.json();
}

// Create stay (user joins an event)
export async function createStay(stayData) {
    const res = await fetch(`${BASE_URL}/stays`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stayData)
    });
    return await res.json();
  }
  
  // Delete stay (user withdraws from an event)
  export async function deleteStay(stayId) {
    const res = await fetch(`${BASE_URL}/stays/${stayId}`, {
      method: "DELETE"
    });
    return res.ok;
  }
  