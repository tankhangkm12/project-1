from backend.extension_database import connect_database

def insert_teacher(id,name,subject):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("INSERT INTO teachers(id,name,subject) VALUES(%s,%s,%s)",(id,name,subject))
        db.commit()
        cur.close()
        db.close()
        print("Added teacher successfully!")
    except Exception as e:
        print("Add teacher falled ",e)


def get_all_teachers():
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("SELECT * FROM teachers ORDER BY name,subject ASC")
        data=cur.fetchall()
        cur.close()
        db.close()
        return data
    except Exception as e:
        print(e)

def remove_teacher(id):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("DELETE FROM teachers WHERE id=%s",(id,))
        db.commit()
        cur.close()
        db.close()
        print("Teacher removed successfully!")
    except Exception as e:
        print("Remove teacher failed ",e)

def updateTeacher(id,name,subject):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("UPDATE teachers SET name=%s, subject=%s WHERE id=%s",(name,subject,id))
        db.commit()
        cur.close()
        db.close()
        print("Updated teacher successfully!")
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print("Failed to update teacher")
        raise e