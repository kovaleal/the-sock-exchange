from flask import Flask, jsonify
from datetime import datetime
from time import sleep

sock_template = {
    "id": None,
    "sockDetails": {
        "size": "Large",
        "color": "Yellow",
        "pattern": "Plain",
        "material": "Bamboo",
        "condition": "Used",
        "forFoot": "Both"
    },
    "additionalFeatures": {
        "waterResistant": False,
        "padded": False,
        "antiBacterial": True
    },
    "addedTimestamp": None
}

uid = 1

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello, World!"})

@app.route('/socks/<count>')
def get_socks(count):
    socks = []

    for _ in range( int(count) ):
        sock = sock_template.copy()
        global uid
        sock['id'] = uid
        uid += 1
        sock['addedTimestamp'] = datetime.now().isoformat()
        socks.append(sock)
        sleep(0.2)
    
    return jsonify(socks)

@app.route('/socks')
def get_one_sock():
    res = get_socks(1)
    return res

if __name__ == '__main__':
    app.run(debug=True)