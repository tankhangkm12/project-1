from .services import *
from flask import Blueprint,request,jsonify

classes_blueprint=Blueprint("classes",__name__,)
def uppercase_and_delete_space(s):
    return (" ".join(str(s).split())).title()
@classes_blueprint.route("/classes/add-class",methods=["POST"])
def insert_classes():
    if request.method=="POST":
        try:
            data=request.json
            print(data)
            add_class(str(data["name-class"]).upper(),int(data["number-student-class"]),int(data["teacher-class"]))
            print("Successfully!")
            return {"message":"success"},200
        except Exception as e:
            if "exists" in str(e).lower():
                return {"message":"Lớp đã tồn tại"},409
            elif "foreign key" in str(e).lower():
                return {"message":"Không tìm thấy giáo viên"},404
            else:
                return {"message":str(e)},500
        

@classes_blueprint.route("/classes/get-all-classes",methods=["GET"])
def get_all_classes():
    if request.method=="GET":
        try:
            classes=[]
            datas=get_all_class()
            for data in datas:
                data_class={
                    "name-class":data[0],
                    "number-student-class":data[1],
                    "name-teacher":data[2],
                    "id-teacher":data[3],
                    "teacher-class":f"{data[3]}-{data[2]}",
                }
                classes.append(data_class)
            return jsonify(classes),200
        except Exception as e:
            return jsonify({"message":f"failed! {e}"}),400
        
@classes_blueprint.route("/classes/delete-class",methods=["DELETE"])
def delete_class():
    if request.method=="DELETE":
        try:
            data=request.json
            print(data)
            remove_class(str(data["name-class"]).upper())
            return {"message":"success"},200
        except Exception as e:
            return {"message":f"failed! {e}"},400
        
@classes_blueprint.route("/classes/update-class",methods=["PUT"])
def update_students_class():
    if request.method=="PUT":
        try:
            data=request.json
            print(data)
            updateClass(str(data["name-class"]).upper(),int(data["number-student-class"]),int(data["teacher-class"]))
            return {"message":"success"},200
        except Exception as e:
            if "foreign key constraint" in str(e):
                return {"message":"Không tìm thấy giáo viên"},404
            elif "invalid literal for int()" in str(e):
                return {"message":"Dữ liệu không hợp lệ ! Vui lòng nhập mã giáo viên !"},400
            else:
                return {"message":str(e)},500