import psycopg2
import os
from dotenv import load_dotenv
import psycopg2.sql
load_dotenv()
DATABASE_NAME=os.environ.get('DATABASE_NAME')
DATABASE_USERNAME=os.environ.get('DATABASE_USERNAME')
DATABASE_PASSWORDS=os.environ.get('DATABASE_PASSWORD')
DATABASE_HOST=os.environ.get('DATABASE_HOST')
DATABASE_PORT=os.environ.get('DATABASE_PORT')
DATABASE_STUDENT_CLASS=os.environ.get('DATABASE_STUDENT_CLASS')
DATABASE_SCORE_NAME=os.environ.get('DATABASE_SCORE_NAME')

def connect_database():
    conn = psycopg2.connect(database=DATABASE_NAME, user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT)
    return conn

def connect_database_class():
    conn = psycopg2.connect(database=DATABASE_STUDENT_CLASS, user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT)
    return conn

def connect_database_score():
    conn = psycopg2.connect(database=DATABASE_SCORE_NAME, user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT)
    return conn
def create_table_accounts():
    conn = psycopg2.connect(database=DATABASE_NAME, user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT)
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS accounts(username VARCHAR(100) NOT NULL PRIMARY KEY, password VARCHAR(100) NOT NULL)")
    conn.commit()
    cur.close()
    conn.close()


def create_teacher():
    db=connect_database()
    cur=db.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS teachers(id INT PRIMARY KEY NOT NULL,name VARCHAR(50) NOT NULL,subject TEXT)")
    db.commit()
    cur.close()
    db.close()

def create_table_class():
    db=connect_database()
    cur=db.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS class(name VARCHAR(50) PRIMARY KEY NOT NULL,numbers_student INT,id_teacher INT NOT NULL REFERENCES teachers(id))")
    db.commit()
    cur.close()
    db.close()
def create_table_students():
    db=connect_database()
    cur=db.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS students(id INT PRIMARY KEY NOT NULL,name VARCHAR(50) NOT NULL,class VARCHAR(50) NOT NULL REFERENCES class(name),grade INT NOT NULL,gender TEXT NOT NULL,begin_year INT NOT NULL,end_year INT NOT NULL,andress TEXT,birthday TEXT)")
    db.commit()
    cur.close()
    db.close()
def create_database():
    conn = psycopg2.connect(user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT, database="postgres")
    cur = conn.cursor()
    conn.autocommit=True
    # Kiểm tra sự tồn tại của cơ sở dữ liệu
    cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s", (DATABASE_NAME,))
    exists1 = cur.fetchone()
    if not exists1:
        cur.execute("CREATE DATABASE %s" %DATABASE_NAME)
    cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s",(DATABASE_STUDENT_CLASS,))
    exists2=cur.fetchone()
    if not exists2:
        cur.execute("CREATE DATABASE %s" %DATABASE_STUDENT_CLASS)
    cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s",(DATABASE_SCORE_NAME,))
    exists3=cur.fetchone()
    if not exists3:
        cur.execute("CREATE DATABASE %s" %DATABASE_SCORE_NAME)
    cur.close()
    conn.close()

def create_table_subject():
    conn = psycopg2.connect(user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT, database=DATABASE_NAME)
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS subjects(id INT PRIMARY KEY NOT NULL,name VARCHAR(50) NOT NULL,teacher_id INT NOT NULL REFERENCES teachers(id))")
    conn.commit()
    cur.close()
    conn.close()


def create_table_score(subject_id):
    conn = psycopg2.connect(user=DATABASE_USERNAME, password=DATABASE_PASSWORDS, host=DATABASE_HOST, port=DATABASE_PORT, database=DATABASE_SCORE_NAME)
    cur = conn.cursor()
    cur.execute(f"CREATE TABLE IF NOT EXISTS score_{subject_id}(student_id INT NOT NULL PRIMARY KEY,name TEXT,subject TEXT NOT NULL,usually_score FLOAT,firthteen_minute_score FLOAT,midterm_score FLOAT,finally_score FLOAT,average_score FLOAT)")
    conn.commit()
    cur.close()
    conn.close()
    
def create_all_table():
    create_table_accounts()
    create_teacher()
    create_table_class()
    create_table_students()
    create_table_subject()
