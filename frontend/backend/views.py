from datetime import datetime
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_cors import CORS
app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY'] = 'secret'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

@app.route('/login', methods = ['POST'])
def login_handler():
	email = request.get_json()['email']
	password = request.get_json()['password']
	result = ""
	user = User.query.filter_by(email = email).first()
	if user is None:
		result = {'error':'You dont have an account'}
	elif bcrypt.check_password_hash(user.password, password):
		access_token = create_access_token(identity = {'username':user.username,'email':user.email})
		result = {'token':access_token}
	else:
		result = {'error':'Invalid Passoword'}
	# print(result)
	return jsonify(result)
if __name__ == '__main__':
    app.run(debug=True, port = 8000)