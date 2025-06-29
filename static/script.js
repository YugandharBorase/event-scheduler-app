document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("eventForm");
    const container = document.getElementById("eventsContainer");
    const searchBox = document.getElementById("searchBox");

    let editingId = null;

    const loadEvents = () => {
        fetch("/events")
            .then(res => res.json())
            .then(displayEvents);
    };

    const displayEvents = (events) => {
        container.innerHTML = "";
        events.forEach(event => {
            const div = document.createElement("div");
            div.className = "event";
            div.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><strong>Start:</strong> ${event.start_time}</p>
                <p><strong>End:</strong> ${event.end_time}</p>
                <button onclick="deleteEvent('${event.id}')">Delete</button>
                <button onclick="fillForm('${event.id}')">Edit</button>
            `;
            container.appendChild(div);
        });
    };

    form.addEventListener("submit", e => {
        e.preventDefault();
        const data = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            start_time: document.getElementById("start_time").value,
            end_time: document.getElementById("end_time").value
        };

        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `/events/${editingId}` : "/events";

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            form.reset();
            editingId = null;
            loadEvents();
        });
    });

    window.deleteEvent = (id) => {
        fetch(`/events/${id}`, { method: "DELETE" })
            .then(() => loadEvents());
    };

    window.fillForm = (id) => {
        fetch("/events")
            .then(res => res.json())
            .then(events => {
                const event = events.find(e => e.id === id);
                if (!event) return;
                document.getElementById("title").value = event.title;
                document.getElementById("description").value = event.description;
                document.getElementById("start_time").value = event.start_time;
                document.getElementById("end_time").value = event.end_time;
                editingId = id;
            });
    };

    searchBox.addEventListener("input", () => {
        const query = searchBox.value.trim();
        fetch(`/search?q=${query}`)
            .then(res => res.json())
            .then(displayEvents);
    });

    loadEvents();
});
