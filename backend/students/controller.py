from .services import *
from flask import Blueprint,request,jsonify

student=Blueprint("student",__name__)

def uppercase_and_delete_space(string):
    return (" ".join(str(string).split())).title()
@student.route("/student/add-student",methods=["POST"])
def insert_students():
    if request.method=="POST":
        try:
            data=request.json
            print(data)
            id=int(data["id"])
            name=uppercase_and_delete_space(data['name'])
            id_class=str(data['class_student']).upper()
            grade=data['grade']
            gender=str(data['gender']).title()
            birthday=data['birthday']
            year_school=data["year_school"].split("-")
            begin_year=int(year_school[0])
            end_year=int(year_school[1])
            address=uppercase_and_delete_space(data['andress'])
            Student(id,name,id_class,grade,gender,begin_year,end_year,address,birthday)
            print("Success!")
            return {"message":"success"},200
        except Exception as e:
            print(f"Đéo Thành Công  + {e}")
            if "exists" in str(e):
                return {"message":"Học sinh đã tồn tại"},409
            elif "foreign key" in str(e):
                return {"message":"Không tìm thấy lớp học"},404
            else:
                return {"message":str(e)},500

@student.route("/student/get-all-students",methods=["GET"])
def get_students():
    try:
        if request.method=="GET":
            try:
                students=get_all_student()
                print(students)
                datas=[]
                for student in students:
                    data={
                        "id":str(student[0]),
                        "name":str(student[1]),
                        "class":str(student[2]),
                        "grade":str(student[3]),
                        "gender":str(student[4]),
                        "school_year":f"{student[5]}-{student[6]}",
                        "address":str(student[7]),
                        "birthday":str(student[8])
                    }
                    datas.append(data)
                return jsonify(datas),200
            except Exception as e:
                print(str(e))
                return jsonify({"message":f"{e}"}),500
    except Exception as e:
        return jsonify({"message":f"ko phải get-{e}"}),500
        

@student.route("/student/remove-student", methods=["DELETE"])
def delete_student():
    if request.method == "DELETE":
        try:
            data=request.json
            print(data)
            remove_student(int(data["id"]))
            return {"message":"success"},200
        except Exception as e:
            print(e)
            return {"message":f"failed!"},400
        
@student.route("/student/get_all_student_class/<string:id_class>",methods=["GET"])
def get_all_students_class(id_class):
    if request.method=="GET":
        try:
            print(id_class)
            students=get_students_class(id_class)
            datas=[]
            for student in students:
                data={
                    "id":str(student[0]),
                    "name":str(student[1]),
                    "gender":str(student[2]),
                    "address":str(student[3]),
                    "birthday":str(student[4])
                }
                datas.append(data)
            return jsonify(datas),200
        except Exception as e:
            return jsonify({"message":f"{e}"}),500
@student.route("/student/update-student", methods=["PUT"])
def updateStudent():
    if request.method=="PUT":
        try:
            data=request.json
            id=int(data["id"])
            name=uppercase_and_delete_space(data['name'])
            id_class=str(data['class_student']).upper()
            grade=data['grade']
            gender=str(data['gender']).title()
            birthday=data['birthday']
            year_school=data["year_school"].split("-")
            begin_year=int(year_school[0])
            end_year=int(year_school[1])
            address=uppercase_and_delete_space(data['andress'])
            update_student(id,name,id_class,grade,gender,begin_year,end_year,address,birthday)
            return {"message":"success"},200
        except Exception as e:
            print(f"Đéo Thành Công ! lỗi : {str(e)}")
            if "foreign key constraint" in str(e):
                return {"message":"Không tìm thấy lớp học"},404
            elif "exists" in str(e):
                return {"message":"Học sinh đã tồn tại"},409
            else:
                return {"message":"error!"},500
    else:
        print("Wrong method!")

@student.route("/student/get_student_class/<string:nameClass>", methods=["GET"])
def get_student_by_nameClass(nameClass):
    if request.method=="GET":
        try:
            students=get_infostudent_with_class(nameClass)
            datas=[]
            for student in students:
                data={
                    "id":str(student[0]),
                    "name":str(student[1]),
                    "gender":str(student[2]),
                    "address":str(student[3]),
                    "birthday":str(student[4])
                }
                datas.append(data)
            return jsonify(datas),200
        except Exception as e:
            return jsonify({"message":f"{e}"}),500

