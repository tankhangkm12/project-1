from backend.extension_database import connect_database
class Accounts:
    def __init__(self,username,password):
        self.username=username
        self.password=password
        self.add_account()

    def add_account(self):
        try:
            db=connect_database()
            cur=db.cursor()
            cur.execute("INSERT INTO accounts(username,password) VALUES(%s,%s)",(self.username,self.password))
            db.commit()
            cur.close()
            db.close()
            return "Added account ! ",200
        except ImportError:
            db.rollback()
            cur.close()
            db.close()
            return "Failed to add account ! ",404

