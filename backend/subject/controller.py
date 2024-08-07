from .services import *
from flask import Blueprint,jsonify,request

subject_blueprint=Blueprint("subject",__name__)


def uppercase_and_delete_space(s):
    return (" ".join(str(s).split())).title()
@subject_blueprint.route("/subject/add-subject",methods=["POST"])
def insert_subject():
    if request.method=="POST":
        try:
            data=request.json
            print(data)
            add_subject(int(data["id"]),uppercase_and_delete_space(str(data["name"])),int(data["teacher"]))
            create_tablescore(data["id"])
            return {"message":"Successfully"},200
        except Exception as e:
            if "foreign key" in str(e).lower():
                return {"message":"Không tìm thấy giáo viên"},404
            elif "exists" in str(e).lower():
                return {"message":"Môn học đã tồn tại"},409
            else:
                return {"message":str(e)},500
    else:
        print("wrong method!")
@subject_blueprint.route("/subject/get-all-subjects",methods=["GET"])
def get_subjects():
    if request.method=="GET":
        try:
            subjects=get_all_subjects()
            datas=[]
            print(subjects)
            for subject in subjects:
                id=subject[0]
                name=subject[1]
                teacher_id=subject[2]
                teacher_name=subject[3]
                teacher=f"{teacher_id}-{teacher_name}"
                data={
                    "id":str(id),
                    "name":str(name),
                    "teacher":str(teacher),
                    "id-teacher":teacher_id,
                    "teacher-name":teacher_name
                }
                datas.append(data)
            return jsonify(datas),200
        except Exception as e:
            return jsonify({"message":str(e)}),500
    else:
        print("Wrong method!")

@subject_blueprint.route("/subject/delete-subject/<string:id>",methods=["DELETE"])
def delete_subject(id):
    if request.method=="DELETE":
        try:
            remove_subject(int(id))
            return {"message":"Successfully"},200
        except Exception as e:
            return jsonify({"message":str(e)}),500
    else:
        print("Wrong method!")

@subject_blueprint.route("/subject/update-subject",methods=["PUT"])
def update_subject():
    if request.method=="PUT":
        try:
            data=request.json
            print(data)
            updateSubject(int(data["id"]),uppercase_and_delete_space(str(data["name"])),int(data["teacher"]))
            return {"message":"Successfully"},200
        except Exception as e:
            if "foreign key" in str(e).lower():
                return {"message":"Không tìm thấy giáo viên"},404
            else:
                return {"message":str(e)},500
    else:
        print("wrong method!")