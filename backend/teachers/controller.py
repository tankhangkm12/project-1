from .services import *
from flask import Blueprint,request,jsonify


teacher=Blueprint("teacher",__name__)

def uppercase_and_delete_space(s):
    return (" ".join(str(s).split())).title()
@teacher.route("/teacher/add-teacher",methods=["POST"])
def add_teacher():
    if request.method=="POST":
        try:
            data=request.json
            print(data)
            insert_teacher(int(data["id"]),uppercase_and_delete_space(data["name"]),uppercase_and_delete_space(data["subject"]))
            return {"message":"Successfully"},200
        except Exception as e:
            if "exists" in str(e):
                return {"message":"Teacher already exists"},400
            elif "foreign key" in str(e):
                return {"message":"Subject does not exist"},404
            else:
                return {"message":f"{e}"},500

        

@teacher.route("/teacher/get_all_teachers",methods=["GET"])
def get_teachers():
    if request.method=="GET":
        try:
            teachers=get_all_teachers()
            print(teachers)
            datas=[]
            for teacher in teachers:
                id=teacher[0]
                name=teacher[1]
                subject=teacher[2]
                data={
                    "id":str(id),
                    "name":str(name),
                    "subject":str(subject)
                }

                datas.append(data)
            return jsonify(datas),200
        except Exception as e:
            return jsonify({"message":f"{e}"}),500
        
@teacher.route("/teacher/delete-teacher/<string:id>",methods=["DELETE"])
def delete_teacher(id):
    if request.method=="DELETE":
        try:
            remove_teacher(int(id))
            return {"message":"success"},200
        except Exception as e:
            return jsonify({"message":f"failed! {e}"}),400
        
@teacher.route("/teacher/update-teacher",methods=["PUT"])
def update_teacher():
    if request.method=="PUT":
        try:
            data=request.json
            print(data)
            updateTeacher(int(data["id"]),uppercase_and_delete_space(data["name"]),uppercase_and_delete_space(data["subject"]))
            return {"message":"success"},200
        except Exception as e:
            return {"message":f"failed! {e}"},500