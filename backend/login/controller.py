from .services import check_account
from flask import Blueprint,request,jsonify

login= Blueprint('login',__name__)

@login.route('/login/check-account',methods=['POST'])
def Login():
    if request.method == 'POST':
        try:
            data=request.json
            username=data['username']
            password=data['password']
            if check_account(username,password):
                return jsonify({"message":"successfully"}),200
            else:
                return jsonify({"message":"failure"}),400
        except Exception as e:
            return jsonify({"message":f"failure ! {e}"}),400