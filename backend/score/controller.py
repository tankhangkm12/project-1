from .services import *
from flask import request,Blueprint,jsonify

score=Blueprint("score",__name__)

@score.route("/score/add-score",methods=["POST"])
def add_score():
    if request.method=="POST":
        try:
            data=request.json
            print(data)
            addscoresubject(data["id-subject"],data["id-student"],data["name"],data["subject"],float(data["score-1"]),float(data["score-2"]),float(data["score-3"]),float(data["score-4"]),float(data["average-score"]))
            return {"message":"Successfully"},200
        except Exception as e:
            return {"error":str(e)},400
        
@score.route("/score/get-all-scores-subject/<string:id>")
def get_scores(id):
    if request.method=="GET":
        try:
            scores=get_scoresubject(id)
            datas=[]
            for score in scores:
                id_subject=id
                id_student=score[0]
                name=score[1]
                subject=score[2]
                usually_score=score[3]
                firth_minutes_score=score[4]
                midterm_score=score[5]
                finally_score=score[6]
                average_score=score[7]
                data={
                    "id-subject":id_subject,
                    "id-student":id_student,
                    "name":name,
                    "subject":subject,
                    "score-1":usually_score,
                    "score-2":firth_minutes_score,
                    "score-3":midterm_score,
                    "score-4":finally_score,
                    "average-score":average_score
                }
                datas.append(data)
            return jsonify(datas),200
        except Exception as e:
            return {"error":str(e)},400
        
@score.route("/score/delete-scores-student/<string:idsubject>/<string:idstudent>",methods=["DELETE"])
def delete_scores_student(idsubject,idstudent):
    if request.method=="DELETE":
        try:
            remove_score(idsubject,idstudent)
            return {"message":"Successfully"},200
        except Exception as e:
            print(str(e))
            return {"error":str(e)},400

@score.route("/score/update-scores-student",methods=["PUT"])
def update_scores_student():
    if request.method=="PUT":
        try:
            data=request.json
            print(data)
            updatescorestudent(data["id-subject"],data["id-student"],float(data["score-1"]),float(data["score-2"]),float(data["score-3"]),float(data["score-4"]),float(data["average-score"]))
            return {"message":"Successfully"},200
        except Exception as e:
            print(str(e))
            return {"error":str(e)},400
