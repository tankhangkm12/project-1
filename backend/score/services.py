from backend.extension_database import connect_database_score,create_table_score


def addscoresubject(id_subject,id_student,name,subject,usually,firth_minutes,middle,final,average):
    try:
        db = connect_database_score()
        cur = db.cursor()
        query = "INSERT INTO score_{} (student_id,name,subject,usually_score,firthteen_minute_score,midterm_score,finally_score,average_score) VALUES (%s,%s,%s, %s, %s, %s, %s, %s)".format(id_subject)
        values = (id_student,name,subject,usually, firth_minutes, middle, final, average)
        cur.execute(query, values)
        db.commit()
        cur.close()
        db.close()
        print("Successfully")
        return "Added scoresubject!", 200
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print(f"đéo được! {e}")
        raise e
    
def get_scoresubject(id_subject):
    try:
        db = connect_database_score()
        cur = db.cursor()
        cur.execute(f"SELECT * FROM score_{id_subject} ORDER BY average_score,name")
        data = cur.fetchall()
        cur.close()
        db.close()
        print("Lấy dữu liệu thành công")
        return data
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print(e)
        raise e
    
def create_scoresubject_table(id_subject):
    try:
        create_table_score(id_subject)
        print("Created table successfully!")
        return "Created table scoresubject!", 200
    except Exception as e:
        raise e
    
def remove_score(id_subject,id_student):
    try:
        db = connect_database_score()
        cur = db.cursor()
        cur.execute(f"DELETE FROM score_{id_subject} WHERE student_id = %s", (id_student,))
        db.commit()
        cur.close()
        db.close()
        print("Deleted successfully!")
        return "Deleted scoresubject!", 200
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        raise e
    
def updatescorestudent(idsubject,idstudent,usually, firth_minutes, middle, final, average):
    try:
        db = connect_database_score()
        cur = db.cursor()
        query=("UPDATE score_{} SET usually_score=%s, firthteen_minute_score=%s, midterm_score=%s, finally_score=%s, average_score=%s WHERE student_id=%s".format(idsubject))
        value=(usually,firth_minutes,middle,final,average,idstudent)
        cur.execute(query, value)
        db.commit()
        cur.close()
        db.close()
        print("Updated successfully!")
        return "Updated scoresubject!", 200
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        raise e
