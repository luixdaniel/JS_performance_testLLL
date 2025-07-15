// Import all the necessary functions from the api.js file
import { getEventsByUserId, createEvent, getStays, deleteEvent, updateEvent, getAllEvents, createStay, deleteStay } from "../js/api.js";

// This function builds and returns the Dashboard view based on the logged in user.
export function DashboardView() {
    const main = document.createElement("main");
    main.classList.add("container-dashboard");

    // Get the current user from localStorage (active session)
    const user = JSON.parse(localStorage.getItem("currentUser"));

    // If there is no active user, I show an error message and return the view.
    if (!user) {
        main.innerHTML = "<p>No active session. Please log in.</p>";
        return main;
    }

    // Check if the current user is an administrator (roleId = 1)
    const isAdmin = user.roleId === 1;

    // General structure of the HTML displayed on the dashboard.
    // If you're an admin, I'll show the form for creating events.
    // If you're a regular user, I'll only allow you to view events.
    main.innerHTML = `
    <h2>Welcome, ${user.name}</h2>

    <div class="dashboard-layout">
      ${isAdmin ? `
        <section class="form-section">
          <h3>Create New Event</h3>
          <form id="eventForm">
            <div>
              <label for="eventTitle">Title:</label>
              <input type="text" id="eventTitle" required />
            </div>
            <div>
              <label for="eventType">Type: (ej:party, meeting)</label>
              <input type="text" id="eventType" required />
            </div>
            <div>
              <label for="eventCapacity">Capacity:</label>
              <input type="number" id="eventCapacity" required />
            </div>
            <button type="submit">Add Event</button>
          </form>
        </section>
      ` : `
        <p>You are registered as a standard user. You can join or leave events.</p>
      `}

      <section class="events-section">
        <h3>Events</h3>
        <ul id="eventList"></ul>
      </section>
    </div>

    <button id="logoutBtn">Log Out</button>
  `;

    // I get the important elements
    const eventList = main.querySelector("#eventList");
    const form = main.querySelector("#eventForm");
    const logoutBtn = main.querySelector("#logoutBtn");

    // Auxiliary variable to handle event editing
    let editingEventId = null;

    // Function that loads and displays all events in the list
    async function loadEvents() {
        eventList.innerHTML = ""; // clear list

        // I get all the events and stays
        const events = await getAllEvents();
        const stays = await getStays();

        // If there are no events, show message
        if (events.length === 0) {
            eventList.innerHTML = "<li>No events available.</li>";
            return;
        }

        // Loop through each event to display it in the interface
        events.forEach((event) => {
            const li = document.createElement("li");

            // Filter users registered for this event
            const registeredUsers = stays.filter(s => s.eventId === event.id);
            const userAlreadyRegistered = registeredUsers.some(s => s.userId === user.id);

            const remainingCapacity = event.capacity - registeredUsers.length;

            // Estructure event
            li.innerHTML = `
        <strong>${event.title}</strong>
        <span>${event.type} - ${remainingCapacity} remaining quotas</span>
      `;

            // If the user is an administrator, I show buttons to edit and delete events
            if (isAdmin) {
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = async () => {
                    if (confirm("Are you sure?")) {
                        await deleteEvent(event.id);
                        loadEvents();
                    }
                };
                li.appendChild(deleteBtn);

                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.onclick = () => {
                    // Load the event data into the form for editing
                    form.eventTitle.value = event.title;
                    form.eventType.value = event.type;
                    form.eventCapacity.value = event.capacity;
                    editingEventId = event.id; // Save ID of the event to edit
                    form.querySelector("button[type='submit']").textContent = "Save Changes";
                };
                li.appendChild(editBtn);

            } else {
                // If it is a normal user, I show a button to join or leave the event
                const actionBtn = document.createElement("button");

                if (userAlreadyRegistered) {
                    actionBtn.textContent = "Leave Event";
                    actionBtn.onclick = async () => {
                        const stayToDelete = stays.find(s => s.eventId === event.id && s.userId === user.id);
                        if (stayToDelete) {
                            await deleteStay(stayToDelete.id);
                            loadEvents();
                        }
                    };
                } else if (remainingCapacity > 0) {
                    actionBtn.textContent = "Join Event";
                    actionBtn.onclick = async () => {
                        await createStay({ eventId: event.id, userId: user.id });
                        loadEvents();
                    };
                } else {
                    actionBtn.textContent = "Full";
                    actionBtn.disabled = true;
                }

                li.appendChild(actionBtn);
            }

            eventList.appendChild(li);
        });
    }

    // Only the administrator can create or edit events
    if (isAdmin) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedEvent = {
                title: form.eventTitle.value.trim(),
                type: form.eventType.value.trim(),
                capacity: parseInt(form.eventCapacity.value),
                userId: user.id,
            };

            if (editingEventId) {
                // If I'm editing an event, I update
                await updateEvent(editingEventId, updatedEvent);
                editingEventId = null;
                form.querySelector("button[type='submit']").textContent = "Add Event";
            } else {
                // If not, I create a new one
                await createEvent(updatedEvent);
            }

            form.reset();
            loadEvents();
        });
    }

    // Button to log out
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("lastSection");
        window.location.hash = "#/login";
    });

    // When the view loads, I call the function to display events
    loadEvents();

    // Return the generated view
    return main;
}
