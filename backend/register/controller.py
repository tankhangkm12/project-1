from flask import Blueprint, request, jsonify
from .services import Accounts

register = Blueprint("register", __name__)


@register.route('/register/add-account', methods=['POST']) #add method OPTION if you need 
def AddAccount():
    # if request.method == 'OPTIONS':
    #     # Respond to preflight request
    #     response = jsonify()
    #     response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    #     response.headers.add('Access-Control-Allow-Methods', 'POST')
    #     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    #     print(response)
    #     return response
    if request.method == 'POST':
        try:
            data = request.json
            print("Received data:", data)
            Accounts(data["username"], data["password"])
            return jsonify({"message": "Successfully ! "}), 200
        except Exception as e:
            return jsonify({"message": f"Failure ! {e}"}), 400
        


