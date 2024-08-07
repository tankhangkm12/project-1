from flask import Flask,Blueprint
from .register.controller import register
from .login.controller import login
from .students.controller import student
from .classes.controller import classes_blueprint
from .teachers.controller import teacher
from .subject.controller import subject_blueprint
from .score.controller import score
from .get_ip import ip
from .extension_database import create_all_table,create_database
from flask_cors import CORS


def create_app(config_file="config.py"):
    app = Flask(__name__,template_folder='../frontend')
    CORS(app,resources={r"/*": {"origins": "*"}})
    app.config.from_pyfile(config_file)
    app.register_blueprint(ip)
    app.register_blueprint(register)
    app.register_blueprint(login)
    app.register_blueprint(student)
    app.register_blueprint(classes_blueprint)
    app.register_blueprint(teacher)
    app.register_blueprint(subject_blueprint)
    app.register_blueprint(score)
    create_database()
    create_all_table()
    return app