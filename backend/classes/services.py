from backend.extension_database import connect_database

def add_class(name,numbers_student,id_teacher):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("INSERT INTO class(name,numbers_student,id_teacher) VALUES(%s,%s,%s)",(name,numbers_student,id_teacher))
        db.commit()
        cur.close()
        db.close()
        print("Added class successfully!")
    except Exception as e:
        print(e)
        raise e

def get_all_class():
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("SELECT class.name,class.numbers_student,teachers.name,class.id_teacher FROM class INNER JOIN teachers ON class.id_teacher=teachers.id ORDER BY class.name ASC")
        data=cur.fetchall()
        cur.close()
        db.close()
        return data
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        raise e
    

def remove_class(name):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("DELETE FROM class WHERE name=%s",(name,))
        db.commit()
        cur.close()
        db.close()
        print("Removed class ! ")
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print("failed to remove class")
        raise e
def updateClass(name,number_student,teacher):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("UPDATE class SET name=%s, numbers_student=%s, id_teacher=%s WHERE name=%s",(name,number_student,teacher,name))
        db.commit()
        cur.close()
        db.close()
        print("Updated class successfully!")
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print("Failed to update class")
        raise e

