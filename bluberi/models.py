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

	def __repr__(self):
		return f"User('{self.username}', '{self.email}')"


class Gender(enum.Enum):
    male = 'M'
    female = 'F'
    retard = 'R'
class Category(enum.Enum):
    general = 'G'
    DASA = 'D'
    SC_ST = 'S'
class Programme(enum.Enum):
    B_Tech = 'B'
    M_Tech = 'M'
    Ph_D = 'P'
class Stream(enum.Enum):
    Aero = 'Aero'
    CompScience = 'C.S.E'
    Mechanical = 'Mech'
    Metalurgy = 'Meta'
    Production = 'Prod'
class Programme(enum.Enum):
    B_Tech = 'B'
    M_Tech = 'M'
    Ph_D = 'P'
class Programme(enum.Enum):
    B_Tech = 'B'
    M_Tech = 'M'
    Ph_D = 'P'


class Student(db.Model):
	__tablename__ = 'student'

	id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), unique=False, nullable=False)
    middle_name = db.Column(db.String(20), unique=False, nullable=True)
    last_name = db.Column(db.String(20), unique=False, nullable=False)
    ========>> D.O.B <<=======
    gender = db.Column(db.Enum(Gender), default=Gender.retard, unique=False, nullable=False)
    SID = db.Column(db.String(8), unique=True, nullable=False)
    category = db.Column(db.Enum(Category), default=Category.general, unique=False, nullable=False)
    programme = db.Column(db.Enum(Programme), default=Programme.B_Tech, unique=False, nullable=False)
    stream = db.Column(db.Enum(Stream), default=Stream.Production, unique=False, nullable=False)
    CG = db.Column(db.Float, nullable=True, unique=False)
    semester = db.Column(db.Integer, nullable=True, unique=False)

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


class Faculty(db.Model):
	__tablename__ = 'faculty'

	id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), unique=False, nullable=False)
    middle_name = db.Column(db.String(20), unique=False, nullable=True)
    last_name = db.Column(db.String(20), unique=False, nullable=False)
    ========>> D.O.B <<=======
    ========>> Qualification (highest) <<=======
    gender = db.Column(db.Enum(Gender), default=Gender.retard, unique=False, nullable=False)
    position = db.Column(db.String(20), unique=False, nullable=False)
    salary = db.Column(db.Float, nullable=False, unique=False)
    main_stream = db.Column(db.Enum(Stream), default=Stream.Production, unique=False, nullable=False) 	

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


class Administration(db.Model):
	__tablename__ = 'administration'

	id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), unique=False, nullable=False)
    middle_name = db.Column(db.String(20), unique=False, nullable=True)
    last_name = db.Column(db.String(20), unique=False, nullable=False)
    ========>> D.O.B <<=======
    ========>> Qualification (highest) <<=======
    gender = db.Column(db.Enum(Gender), default=Gender.retard, unique=False, nullable=False)
    salary = db.Column(db.Float, nullable=False, unique=False)
     	

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)


class Club(db.Model):
	__tablename__ = 'club'

	id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=False, nullable=False)
	=> Club/Society
	secy_SID = db.Column(db.String(8), unique=True, nullable=False)
	j_secy_SID = db.Column(db.String(8), unique=True, nullable=False)
	budget = db.Column(db.Float, nullable=False, unique=False)

	userInfo = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)



class TimeTable(db.Model)
	__tablename__ = 'timetabe'

	id = db.Column(db.Integer, primary_key=True)
    

    name = db.Column(db.String(20), unique=False, nullable=False)
	=> Club/Society
	







'''
from datetime import datetime

class User(db.Model):
    _tablename_ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(50), nullable=False)




    role = db.relationship('Role', secondary='user_role', uselist= False)
    profile = db.relationship('Profile',uselist = False, backref = 'user',lazy = True)

class Role(db.Model):
    _tablename_ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)

class UserRoles(db.Model):
    _tablename_ = 'user_role'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='CASCADE'))

class Department(db.Model):
    _tablename_ = 'dept'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    members = db.relationship('Profile',backref='members', lazy = True )

class CourseEnrollment(db.Model):
    _tablename_='enrolled'
    id = db.Column(db.Integer,primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('profile.unique_id',ondelete='CASCADE'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id',ondelete = 'CASCADE'))
    year = db.Column(db.Interger, nullable = False)
    assesments = db.relationship('Assesment', backref = 'course', lazy = True)
    attendances = db.relationship('Attendance', backref = 'course', lazy = True)
    grades = db.relationship('Grades', backref = 'course', lazy = True)

class Course(db.Model):
    _tablename_ = 'course'
    id = db.Column(db.String(10), primary_key = True, autoincrement = False)
    name = db.Column(db.String(100), nullable = False)
    lectures = db.Column(db.Integer, default = 40)
    tutorials = db.Column(db.Integer, default = 0)
    practical = db.Column(db.Integer, default = 15)
    credit = db.Column(db.Integer, default = 4)
    
class Teaches(db.Model):
    _tablename_='teaches'
    id = db.Column(db.Integer,primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('profile.unique_id',ondelete='CASCADE'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id',ondelete = 'CASCADE'))
    year = db.Column(db.Interger, nullable = False)

class Profile(db.Model):
    _tablename_='profile'
    unique_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20),nullable = False)
    last_name = db.Column(db.String(20),nullable = False)
    dept_id = db.Column(db.Integer,db.ForeignKey('dept.id'))
    address = db.Column(db.Text,nullable = True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id', ondelete = 'CASCADE'))
    date_of_joining = db.Column(db.DateTime, default = datetime.now())
    lives_on_campus db.Column(db.Boolean, default = 0)

class Assesment(db.Model):
    _tablename_ = 'assesment'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Text,nullable=False)
    weightage = db.Column(db.Float, nullable = False)
    marks_obtained = db.Column(db.Float, nullable = False)
    max_marks = db.Column(db.Float,nullable = False)
    take_id = db.Column(db.Integer, db.ForeignKey('enrolled.id', ondelete = 'CASCADE'))

class Attendance(db.Model):
    _tablename_ = 'attendance'
    id = db.Column(db.Integer, primary_key = True)
    attended = db.Column(db.Integer, default = 0)
    total = db.Column(db.Integer, default = 0)
    take_id = db.Column(db.Integer, db.ForeignKey('enrolled.id', ondelete = 'CASCADE'))

class Grades(db.Model):
    _tablename_ = 'grades'
    id = db.Column(db.Integer, primary_key = True)
    current_grade = db.Column(db.String(3), default = 'D')
    take_id = db.Column(db.Integer, db.ForeignKey('enrolled.id', ondelete = 'CASCADE'))
'''









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