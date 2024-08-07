from backend.extension_database import connect_database,connect_database_class
class Student:
    def __init__(self,id,name,id_class,grade,gender,begin_year,end_year,andress,birthday):
        self.id=id
        self.name=name
        self.id_class=id_class
        self.grade=grade
        self.gender=gender
        self.begin_year=begin_year
        self.end_year=end_year
        self.andress=andress
        self.birthday=birthday
        self.add_student()
    

    def add_student(self):
        try:
            db=connect_database()
            cur=db.cursor()
            cur.execute("INSERT INTO students(id,name,class,grade,gender,begin_year,end_year,andress,birthday) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)",(self.id,self.name,self.id_class,self.grade,self.gender,self.begin_year,self.end_year,self.andress,self.birthday))
            db.commit()
            cur.close()
            db.close()
            return "Added student ! ",200
        except Exception as e:
            db.rollback()
            cur.close()
            db.close()
            print("có lỗi ")
            raise e
        

def remove_student(id):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("DELETE FROM students WHERE id=%s",(id,))
        db.commit()
        cur.close()
        db.close()
        print("Removed student ! ")
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print("failed to remove student")
        raise e
    
def get_all_student():
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("SELECT students.id,students.name,class.name,students.grade,students.gender,students.begin_year,students.end_year,students.andress,students.birthday FROM students INNER JOIN class ON students.class=class.name ORDER BY students.name ASC")
        data=cur.fetchall()
        cur.close()
        db.close()
        return data
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        return {"message":f"Failed to get student! {e}"},404

def get_students_class(id_class):
    try:
        db=connect_database_class()
        cur=db.cursor()
        cur.execute(f"SELECT * FROM class_{id_class}")
        data=cur.fetchall()
        cur.close()
        db.close()
        return data
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        return f"Failed to get student! {e} ",404

def get_infostudent_with_class(nameClass):
    try:
        db = connect_database()
        cur = db.cursor()
        cur.execute("SELECT id,name,gender,andress,birthday FROM students WHERE class=%s",(nameClass,))
        data=cur.fetchall()
        cur.close()
        db.close()
        return data
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        raise e

def update_student(id, name, id_class, grade, gender, begin_year, end_year, andress, birthday):
    try:
        db = connect_database()
        cur = db.cursor()
        query = "UPDATE students SET name=%s, class=%s, grade=%s, gender=%s, begin_year=%s, end_year=%s, andress=%s, birthday=%s WHERE id=%s"
        values = (name, id_class, grade, gender, begin_year, end_year, andress, birthday, id)
        cur.execute(query, values)
        db.commit()
        cur.close()
        db.close()
        print("Successfully")
        return "Updated student!", 200
    except Exception as e:
        db.rollback()
        cur.close()
        db.close()
        print(f"đéo được! {e}")
        raise e

