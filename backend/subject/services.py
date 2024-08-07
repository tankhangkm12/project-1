from backend.extension_database import connect_database,create_table_score
def add_subject(id,name,teacher_id):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("INSERT INTO subjects(id,name,teacher_id) VALUES(%s,%s,%s)",(id,name,teacher_id))
        db.commit()
        cur.close()
        db.close()
    except Exception as e:
        print(str(e))
        raise e

def get_all_subjects():
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("SELECT subjects.id,subjects.name,subjects.teacher_id,teachers.name FROM subjects INNER JOIN teachers ON subjects.teacher_id = teachers.id ORDER BY subjects.id ASC")
        subjects=cur.fetchall()
        cur.close()
        db.close()
        return subjects
    except Exception as e:
        print("KO lấy được dữ liệu" + e)
        raise e

def remove_subject(id):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("DELETE FROM subjects WHERE id=%s",(id,))
        db.commit()
        cur.close()
        db.close()
        print("Removed subject successfully!")
    except Exception as e:
        print(e)
        raise e
    
def create_tablescore(id):
    try:
        create_table_score(id)
        print(f"Table score_{id} has been created successfully!")
    except Exception as e:
        print(e)
        raise e

def updateSubject(id,name,teacher):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("UPDATE subjects SET name=%s, teacher_id=%s WHERE id=%s",(name,teacher,id))
        db.commit()
        cur.close()
        db.close()
        print("Updated subject successfully!")
    except Exception as e:
        print(e)
        raise e