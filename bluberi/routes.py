from flask import render_template, url_for, flash, redirect, request
from bluberi import app, db, bcrypt
from flask_login import login_user, current_user, logout_user, login_required
#import secrets, os
#from PIL import Image
#import PIL, numpy

# FORMS
from bluberi.forms import RegistrationForm, LoginForm, UpdateAccountForm#, StegoHide, StegoReveal

# MODELS
from bluberi.models import User#, InputInformation, Final_Stego, CovertInput, RevealedInfo 



'''
# PYTHON SCRIPTS
from python_scripts import #PythonFile


# ERRORS
@app.errorhandler(404)
def error_404(error):
    return render_template('404.html'), 404
@app.errorhandler(403)
def error_403(error):
    return render_template('403.html'), 403
@app.errorhandler(500)
def error_500(error):
    return render_template('500.html'), 500
'''




# ROUTES
@app.route('/test')
def test():
	return render_template('500.html',title = 'TEST!!!!')

@app.route('/')
@app.route('/home')
def home():
    return ""


@app.route('/about')
def about():
    return "<h1>About Page</h1>"


'''
@app.route('/')
@app.route('/home')
def home():
	return render_template('home.html')


@app.route('/register', methods = ['GET', 'POST'])
def register():

	if current_user.is_authenticated:
		return redirect(url_for('home'))
	
	form = RegistrationForm()
	
	if form.validate_on_submit():
		hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		user = User(username=form.username.data, email=form.email.data, password=hashed_password)
		db.session.add(user)
		db.session.commit()
		flash('Your account has been created!!\nYou can now log in!!', 'success')
		return redirect(url_for('login'))
	
	return render_template('register.html', title='Register', form=form)





@app.route('/login', methods = ['GET', 'POST'])
def login():

	if current_user.is_authenticated:
		return redirect(url_for('home'))
	
	form = LoginForm()
	
	if form.validate_on_submit():	
		user = User.query.filter_by(email = form.email.data).first()
		
		if user and bcrypt.check_password_hash(user.password, form.password.data):
			login_user(user, remember = form.remember.data)
			next_page = request.args.get('next')
			return redirect(next_page) if next_page else redirect(url_for('home'))

		else:
			flash('Login Unsuccessful!!\nPlease check email and password!!', 'danger')
	return render_template('login.html', title='Login', form=form)



@app.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('home'))



def save_picture(form_picture):
	random_hex = secrets.token_hex(8)
	_, f_ext = os.path.splitext(form_picture.filename)
	picture_fn = random_hex + f_ext
	picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

	output_size = (125, 125)
	i = Image.open(form_picture)
	i.thumbnail(output_size)
	i.save(picture_path)

	return picture_fn


@app.route("/account-update", methods=['GET', 'POST'])
@login_required
def account():

	form = UpdateAccountForm()
	
	if form.validate_on_submit():
		if form.picture.data:
			picture_file = save_picture(form.picture.data)
			current_user.image_file = picture_file
		
		current_user.username = form.username.data
		current_user.email = form.email.data
		db.session.commit()
		
		flash('Your account has been updated!', 'success')
		return redirect(url_for('account'))
	
	elif request.method == 'GET':
		form.username.data = current_user.username
		form.email.data = current_user.email

	image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
	return render_template('account.html', title='Account', image_file=image_file, form=form)






def save_img_from_form(form_picture, direc):
	random_hex = secrets.token_hex(8)
	_, f_ext = os.path.splitext(form_picture.filename)
	picture_fn = random_hex + f_ext
	picture_path = os.path.join(app.root_path, 'static/' + str(direc), picture_fn)
	
	i = Image.open(form_picture)
	i.save(picture_path)
	return picture_fn

def save_img_from_path(form_picture, direc):
	random_hex = secrets.token_hex(8)
	_, f_ext = os.path.splitext(form_picture)
	picture_fn = random_hex + f_ext
	picture_path = os.path.join(app.root_path, 'static/' + str(direc), picture_fn)
	
	i = Image.open(form_picture)
	i.save(picture_path)
	return picture_fn


@app.route('/hide', methods=['GET', 'POST'])
@login_required
def hide():
	form = StegoHide()

	if form.validate_on_submit():

		inpOvtImg, proc_image, inpHideImg = '0', '0', '0'		
		
		if form.inputImage.data:
			inpOvtImg = save_img_from_form(form.inputImage.data, 'ovt_to_cvt/inpimg')

			dir_inp = str(str(app.root_path) + '/static/ovt_to_cvt/inpimg/')
			if form.typeStego.data == 'IMG':
				if form.hideImg.data:
					inpHideImg = save_img_from_form(form.hideImg.data, 'ovt_to_cvt/hideimg')
				else:
					flash('Some problem with secret image upload!', 'danger')
		
			
				dir_hid = str(str(app.root_path) + '/static/ovt_to_cvt/hideimg/')
								
				proc_image = Hide.run_FLASK(str(dir_inp+inpOvtImg), 
												stego_type=form.typeStego.data,
												dataToHide=str(dir_hid+inpHideImg), 
												lsb_bits=int(form.lsb.data),
												resultFileName=form.fileName.data)
				
				proc_image = save_img_from_path(proc_image, 'ovt_to_cvt/otpimg')

			else:
				proc_image = Hide.run_FLASK(str(dir_inp+inpOvtImg), stego_type=form.typeStego.data,
												 dataToHide=form.hideText.data, 
												 lsb_bits=int(form.lsb.data),
												 resultFileName=form.fileName.data)
				proc_image = save_img_from_path(proc_image, 'ovt_to_cvt/otpimg')


			inp_stuff = InputInformation(inputImage=inpOvtImg, 
									 typeStego=form.typeStego.data,
									 hideText=form.hideText.data, hideImg=inpHideImg,
									 lsb=int(form.lsb.data), fileName=form.fileName.data, 
									 hidder=current_user)
			db.session.add(inp_stuff)
			
			inp_extra = Final_Stego(covertImg=proc_image, mainInfo=inp_stuff)
			db.session.add(inp_extra)

			db.session.commit()
			flash('Your secret has been hidden!', 'success')

			inp_id = inp_stuff.id
			return redirect(url_for('hide_success', inp_id=inp_id))

		else:
			flash('Some problem with overt file upload!', 'danger')
		

	return render_template('hide.html', title='Hide', form=form)


@app.route('/hide_success/<int:inp_id>/')
@login_required
def hide_success(inp_id):

	INP = InputInformation.query.filter_by(id = inp_id).first_or_404()
	OTP = Final_Stego.query.filter_by(mainInfo=INP).first_or_404()
	return render_template('hide_success.html', INP=INP, OTP=OTP)



@app.route('/reveal', methods=['GET', 'POST'])
@login_required
def reveal():
	form = StegoReveal()

	if form.validate_on_submit():
		inpCvtImg, rvldimg, rvlmsg, inp_extra = '0', '0', '0', '0'

		if form.rvlimage.data:
			inpCvtImg = save_img_from_form(form.rvlimage.data, 'cvt_to_ovt/inpimg')			
			dir_inp = str(str(app.root_path) + '/static/cvt_to_ovt/inpimg/')

			inp_stuff = CovertInput(rvlimage=inpCvtImg, typeStego=form.typeStego.data,
									lsb=form.lsb.data, revealer=current_user,
									fileNameIfImage=form.hiddenFileName.data )

			if form.typeStego.data == 'IMG':
				rvldimg = Reveal.run_FLASK(str(dir_inp+inpCvtImg), stego_type=form.typeStego.data,
										   resultFileName=form.hiddenFileName.data,
										   lsb_bits=int(form.lsb.data))

				rvldimg = save_img_from_path(rvldimg, 'cvt_to_ovt/rvldimg')
				inp_extra = RevealedInfo(rvlImg=rvldimg, mainInfo=inp_stuff)

			else:
				rvlmsg = Reveal.run_FLASK(str(dir_inp+inpCvtImg), stego_type=form.typeStego.data,
										   lsb_bits=int(form.lsb.data))
				inp_extra = RevealedInfo(rvlMsg=rvlmsg, mainInfo=inp_stuff)

			db.session.add(inp_stuff)
			db.session.add(inp_extra)
			db.session.commit()
			
			inp_id = inp_stuff.id
			flash('Your secrets are now open...', 'success')
			return redirect(url_for('reveal_success', inp_id=inp_id))
	
	return render_template('reveal.html', title='Reveal', form=form)

@app.route('/reveal_success/<int:inp_id>/')
@login_required
def reveal_success(inp_id):

	INP = CovertInput.query.filter_by(id = inp_id).first_or_404()
	OTP = RevealedInfo.query.filter_by(mainInfo=INP).first_or_404()
	return render_template('reveal_success.html', INP=INP, OTP=OTP)




@app.route('/profile/<string:username>')
@login_required
def profile(username):
	user = User.query.filter_by(username=username).first_or_404()
	
	hide_list = []
	HIDES = InputInformation.query.filter_by(hidder=user)
	for pic in HIDES:
		hide_list.append(Final_Stego.query.filter_by(mainInfo=pic).first())
	
	
	return render_template('profile.html', user=user, HIDES=HIDES, 
							hide_list=hide_list)
'''