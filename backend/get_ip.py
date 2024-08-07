from flask import Blueprint,jsonify
import socket

ip=Blueprint('ip',__name__)

@ip.route("/get-ip",methods=["GET"])
def get_ip():
    hostname=socket.gethostname()
    ip_andress=socket.gethostbyname(hostname)
    return jsonify({"ip":ip_andress}),200