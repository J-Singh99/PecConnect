from views import db
from datetime import datetime
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.relationship('Role', secondary='user_role', uselist= False)
    profile = db.relationship('Profile',uselist = False, backref = 'user',lazy = True)
class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
class UserRoles(db.Model):
    __tablename__ = 'user_role'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='CASCADE'))
class Department(db.Model):
    __tablename__ = 'dept'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    members = db.relationship('Profile',backref='members', lazy = True )
    
class CourseEnrollment(db.Model):
    __tablename__='enrolled'
    id = db.Column(db.Integer,primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('profile.unique_id',ondelete='CASCADE'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id',ondelete = 'CASCADE'))
    year = db.Column(db.Interger, nullable = False)
    assesments = db.relationship('Assesment', backref = 'course', lazy = True)
    attendances = db.relationship('Attendance', backref = 'course', lazy = True)
    grades = db.relationship('Grades', backref = 'course', lazy = True)

class Course(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.String(10), primary_key = True, autoincrement = False)
    name = db.Column(db.String(100), nullable = False)
    lectures = db.Column(db.Integer, default = 40)
    tutorials = db.Column(db.Integer, default = 0)
    practical = db.Column(db.Integer, default = 15)
    credit = db.Column(db.Integer, default = 4)
    
class Teaches(db.Model):
    __tablename__='teaches'
    id = db.Column(db.Integer,primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('profile.unique_id',ondelete='CASCADE'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id',ondelete = 'CASCADE'))
    year = db.Column(db.Interger, nullable = False)
class Profile(db.Model):
    __tablename__='profile'
    unique_id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20),nullable = False)
    last_name = db.Column(db.String(20),nullable = False)
    dept_id = db.Column(db.Integer,db.ForeignKey('dept.id'))
    address = db.Column(db.Text,nullable = True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id', ondelete = 'CASCADE'))
    date_of_joining = db.Column(db.DateTime, default = datetime.now())
    lives_on_campus db.Column(db.Boolean, default = 0)

class Assesment(db.Model):
    __tablename__ = 'assesment'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Text,nullable=False)
    weightage = db.Column(db.Float, nullable = False)
    marks_obtained = db.Column(db.Float, nullable = False)
    max_marks = db.Column(db.Float,nullable = False)
    take_id = db.Column(db.Integer, db.ForeignKey('enrolled.id', ondelete = 'CASCADE'))

class Attendance(db.Model):
    __tablename__ = 'attendance'
    id = db.Column(db.Integer, primary_key = True)
    attended = db.Column(db.Integer, default = 0)
    total = db.Column(db.Integer, default = 0)
    take_id = db.Column(db.Integer, db.ForeignKey('enrolled.id', ondelete = 'CASCADE'))

class Grades(db.Model):
    __tablename__ = 'grades'
    id = db.Column(db.Integer, primary_key = True)
    current_grade = db.Column(db.String(3), default = 'D')
    take_id = db.Column(db.Integer, db.ForeignKey('enrolled.id', ondelete = 'CASCADE'))
