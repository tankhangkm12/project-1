from backend.extension_database import connect_database

def get_account(username,password):
    try:
        db=connect_database()
        cur=db.cursor()
        cur.execute("SELECT * FROM accounts WHERE username=%s AND password=%s",(username,str(password)))
        data=cur.fetchone()
        cur.close()
        db.close()
        print(data)
        return data
    except ImportError:
        db.rollback()
        cur.close()
        db.close()
        return "Failed to get account! ",404
def check_account(username,password):
    data=get_account(username,password)
    if data==None:
        return False
    if data[0]==username and data[1]==str(password):
        return True
    else:
        return False


