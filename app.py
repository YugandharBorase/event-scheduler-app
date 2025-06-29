from flask import Flask, request, jsonify, render_template # type: ignore
import json, uuid, os
from datetime import datetime

app = Flask(__name__, template_folder='templates', static_folder='static')
FILE = 'events.json'

def load_events():
    if os.path.exists(FILE):
        with open(FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_events(events):
    with open(FILE, 'w') as f:
        json.dump(events, f, indent=4)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/events', methods=['GET'])
def get_events():
    events = sorted(load_events(), key=lambda x: x['start_time'])
    return jsonify(events)

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = {
        "id": str(uuid.uuid4()),
        "title": data['title'],
        "description": data['description'],
        "start_time": data['start_time'],
        "end_time": data['end_time']
    }
    events = load_events()
    events.append(event)
    save_events(events)
    return jsonify(event), 201

@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.get_json()
    events = load_events()
    for event in events:
        if event['id'] == event_id:
            event.update(data)
            save_events(events)
            return jsonify(event)
    return jsonify({"error": "Event not found"}), 404

@app.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    events = load_events()
    events = [e for e in events if e['id'] != event_id]
    save_events(events)
    return jsonify({"message": "Event deleted"})

@app.route('/search')
def search_events():
    query = request.args.get('q', '').lower()
    events = load_events()
    matched = [e for e in events if query in e['title'].lower() or query in e['description'].lower()]
    return jsonify(matched)

if __name__ == '__main__':
    app.run(debug=True)
