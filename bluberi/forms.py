from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, PasswordField, SubmitField, BooleanField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from bluberi.models import User
from flask_login import current_user


class RegistrationForm(FlaskForm):
	username =  StringField('UserName', 
							validators = [DataRequired(), Length(min=2, max=20)])
	email = StringField('Email',
						validators = [DataRequired(), Email()])
	password = PasswordField('Password', validators = [DataRequired()])
	
	confirm_password = PasswordField('Confirm Password', 
									validators = [DataRequired(), EqualTo('password')])
	submit = SubmitField('Sign Up!!')

	def validate_username(self, username):
		user = User.query.filter_by(username=username.data).first()
		if user:
			raise ValidationError('That username is already taken. Please choose a different one.')

	def validate_email(self, email):
		user = User.query.filter_by(email=email.data).first()
		if user:
			raise ValidationError('That email is already taken. Please choose a different one.')



class LoginForm(FlaskForm):
	email = StringField('Email', validators = [DataRequired(), Email()])
	password = PasswordField('Password', validators = [DataRequired()])
	remember = BooleanField('Remember Me')
	submit = SubmitField('Login!!')	


class UpdateAccountForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    picture = FileField('Update Profile Picture', validators=[FileAllowed(['jpg', 'png'])])
    submit = SubmitField('Update')

    def validate_username(self, username):
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError('That username is already taken. Please choose a different one.')

    def validate_email(self, email):
        if email.data != current_user.email:
            user = User.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError('That email is already taken. Please choose a different one.')


'''
class StegoHide(FlaskForm):
	inputImage = FileField('Overt Image', validators=[FileAllowed(['jpg', 'jpeg', 'png']), DataRequired()])
	typeStego = SelectField('Steganography Type', choices=[('IMG', 'Image'), 
						   ('TXT', 'Text')], validators=[DataRequired()])
	hideText = TextAreaField('Hide this Text') 
	hideImg = FileField('Hide this Image', validators=[FileAllowed(['jpg', 'jpeg', 'png'])])
	lsb = SelectField('Number of LSBs', choices=[('1', 'One'), ('2', 'Two'), ('4', 'Four')], 
					  validators=[DataRequired()])
	fileName = StringField('Name the Covert Image', validators=[Length(min=2, max=20)])
	submit = SubmitField('Work the magic!!')


class StegoReveal(FlaskForm):
	rvlimage = FileField('Covert Image', validators=[FileAllowed(['jpg', 'jpeg', 'png']), DataRequired()])
	typeStego = SelectField('Steganography Type', choices=[('IMG', 'Image'), 
						   ('TXT', 'Text')], validators=[DataRequired()])
	lsb = SelectField('Number of LSBs', choices=[('1', 'One'), ('2', 'Two'), ('4', 'Four')], 
					  validators=[DataRequired()])
	hiddenFileName = StringField('Name the hidden image. Else put gibberish.', validators=[Length(min=2, max=20)])
	submit = SubmitField('Work the magic!!')
'''
