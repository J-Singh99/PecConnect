import enum
from datetime import datetime
from application-complete import db, login_manager
from flask_login import UserMixin
from flask_appbuilder.models.mixins import ImageColumn


@login_manager.user_loader
def load_user(user_id):
	return User.query.get(int(user_id))



class User(db.Model, UserMixin):
	
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=True, nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	profile_pic = db.Column(db.String(20), nullable=False, default='default.jpg')
	password = db.Column(db.String(60), nullable=False)
	

	studentTable = db.relationship('Student', nullable=True, uselist=False, backref='mainUserInfo', lazy=True)
	facultyTable = db.relationship('Faculty', nullable=True, uselist=False, backref='mainUserInfo', lazy=True)
	adminTable = db.relationship('Administration', nullable=True, uselist=False, backref='mainUserInfo', lazy=True)
	clubTable = db.relationship('Club', nullable=True, uselist=False, backref='mainUserInfo', lazy=True)


#	overtimgInfo = db.relationship('InputInformation', backref='hidder', lazy=True)
#	revealimgInfo = db.relationship('CovertInput', backref='revealer', lazy=True)

	def __repr__(self):
		return f"User('{self.username}', '{self.email}')"



class Student(db.Model):
	__tablename__ = 'student'

	id = db.Column(db.Integer, primary_key=True)
    => First Name
    => Middle Name
    => Last Name (Remaining Name)
    => D.O.B
    => Gender
    => Category
    => Programme
    => Stream
    => 	

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


class Student(db.Model):
	__tablename__ = 'student'

	id = db.Column(db.Integer, primary_key=True)
    => First Name
    => Middle Name
    => Last Name (Remaining Name)
    => D.O.B
    => Gender
    => Category
    => Programme
    => Stream
    => 	

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


class Student(db.Model):
	__tablename__ = 'student'

	id = db.Column(db.Integer, primary_key=True)
    => First Name
    => Middle Name
    => Last Name (Remaining Name)
    => D.O.B
    => Gender
    => Category
    => Programme
    => Stream
    => 	

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


class Student(db.Model):
	__tablename__ = 'student'

	id = db.Column(db.Integer, primary_key=True)
    => First Name
    => Middle Name
    => Last Name (Remaining Name)
    => D.O.B
    => Gender
    => Category
    => Programme
    => Stream
    => 	

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)




'''
class InputInformation(db.Model):
	__tablename__ = 'inputinformation'

	id = db.Column(db.Integer, primary_key = True)
	inputImage = db.Column(db.String(20), nullable=False, default='default.jpg')
	typeStego = db.Column(db.String(3), default='TXT', nullable=False)
	hideImg = db.Column(db.String(20), default='default.jpg')
	hideText = db.Column(db.String(50), default='Jaspreet is the greatest!')
	lsb = db.Column(db.Integer(), nullable=False)
	fileName = db.Column(db.String(20))

	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	
	final_stego = db.relationship('Final_Stego', uselist=False, backref='mainInfo', lazy=True)

	def __repr__(self):
		return f"ID:'{self.id}', LSB:'{self.lsb}', File Name:'{self.fileName}')"


class Final_Stego(db.Model):
	__tablename__ = 'final_stego'
	id = db.Column(db.Integer, primary_key=True)
	covertImg = db.Column(db.String(20), nullable=False)
	
	overtImgID = db.Column(db.Integer, db.ForeignKey('inputinformation.id'), unique=True, nullable=False)


class CovertInput(db.Model):
	__tablename__ = 'covertinput'

	id = db.Column(db.Integer, primary_key = True)
	rvlimage = db.Column(db.String(20), nullable=False, default='default.jpg')
	typeStego = db.Column(db.String(3), default='TXT', nullable=False)
	lsb = db.Column(db.Integer(), nullable=False)
	fileNameIfImage = db.Column(db.String(20))

	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	
	revealedinfo = db.relationship("RevealedInfo", uselist=False, backref='mainInfo',)

	def __repr__(self):
		return f"Post('{self.title}', '{self.date_posted}')"


class RevealedInfo(db.Model):
	__tablename__ = 'revealedinfo'
	id = db.Column(db.Integer, primary_key=True)
	rvlImg = db.Column(db.String(20))
	rvlMsg = db.Column(db.String(50))
	
	cvtImgID = db.Column(db.Integer, db.ForeignKey('covertinput.id'), unique=True, nullable=False)
'''