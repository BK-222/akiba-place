const members = {
	template:
	'<div class="members">\
		<h1 v-if="newMember" class="members__header">All members enjoy half price stay and special perks!</h1>\
		<div v-if="newMember" class="members__form-testimonial">\
			<div>\
				<form @submit.prevent class="booking-form">\
					<h2>Sign Up Form</h2>\
					<label>First Name: </label><input type="text" placeholder="Joe" v-model="form.name">\
					<label>Last Name: </label><input type="text" placeholder="Doe" v-model="form.last">\
					<label>email: </label><input type="email" placeholder="ex. 3" min="0" v-model="form.email">\
					<label>password: </label><input type="password" placeholder="******" v-model="form.password">\
					<label>repeat password: </label><input type="password" placeholder="******" v-model="form.repeat">\
					<button class="members-form__button" @click="signUpForm">Submit</button>\
				</form>\
				<h3>Already a member? Click below!</h3><div class="navbar__li button--cta" @click="alreadyMember = true, newMember = false">Members</div>\
			</div>\
			<div class="testimonials">\
				<div class="testimonial">\
					<div class="testimonial__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat hic et aperiam repudiandae, iusto delectus!</div>\
					<div class="testimonial__image-signa">\
						<div class="testimonial__image"></div>\
						<div class="testimonial__signa">Joe Doe</div>\
					</div>\
				</div>\
				<div class="testimonial">\
						<div class="testimonial__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed magni, maxime blanditiis dolore omnis nulla.</div>\
					<div class="testimonial__image-signa">\
						<div class="testimonial__image"></div>\
						<div class="testimonial__signa">Bella Mella</div>\
					</div>\
				</div>\
				<div class="testimonial">\
						<div class="testimonial__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates tempore deleniti, maxime magnam perferendis placeat!</div>\
					<div class="testimonial__image-signa">\
						<div class="testimonial__image"></div>\
						<div class="testimonial__signa">Karl Riht</div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div v-if="alreadyMember" class="members__existing-members">\
			<h1 class="members__header">All members enjoy half price stay and special perks!</h1>\
			<form v-if="!logSuccess" @submit.prevent class="booking-form">\
				<h2>Log in Form</h2>\
				<label>email: </label><input type="email" placeholder="ex. 3" min="0" v-model="form.email">\
				<label>password: </label><input type="password" placeholder="******" v-model="form.password">\
				<button class="members-form__button" @click="logInForm">Submit</button>\
			</form>\
			<div v-if="!logSuccess">\
				<h3>Not a member? Click below to sign up!</h3>\
				<div class="navbar__li button--cta" @click="alreadyMember = false, newMember = true">New Members</div>\
			</div>\
			<div v-if="logSuccess" class="members__logged-in">\
				<p>Status: {{ status }}</p>\
				<button @click="userStatus">Status</button>\
				<form @submit.prevent>\
					<label>Update Status: </label><input type="text" v-model="updatedStatus">\
					<button @click="newStatus">Update Status</button>\
				</form>\
			</div>\
		</div>\
	</div>',
	data: function() {
		return {
			counter: 0,
			form: {
				name: 'Sally',
				last: 'Stedchen',
				email: 'eva@mail.jp',
				password: 'bakarosa',
				repeat: 'bakarosa'
			},
			newMember: true,
			alreadyMember: false,
			logSuccess: false,
			secretMsg: '',
			status: '',
			updatedStatus: '',
			statusVisible: false,
			jwt: '',
			userId: ''
		}
	},
	methods: {
		userStatus: async function() {
			try {
				const response = await this.httpReq('POST', 'http://localhost:3000/main/members/status', {
					userId: this.userId
				});
				this.status = response.status;
				console.log(response);
			}
			catch(error) {
				console.log(error);
			}
		},
		newStatus: async function() {
			try {
				const response = await this.httpReq('PATCH', 'http://localhost:3000/main/members/status', {
					userId: this.userId,
					status: this.updatedStatus
				});
				console.log(response);
				this.status = response.newStatus;
				console.log(this.status);
				this.updatedStatus = '';

			}
			catch(error) {
				console.log(error);
			}
		},
		secretMessage: async function() {
			try {
				const response = await this.httpReq('GET', 'http://localhost:3000/main/members/secret');
				this.secretMsg = response;
				console.log(response);
			}
			catch(error) {
				console.log(error);
			}
		},
		logInForm: async function() {
			const email = this.form.email;
			const password = this.form.password;

			if (email < 5) {
				return alert('An email has to be a minimum of 5 characters long.');
			}
			if (password < 5) {
				return alert('A password has to be a minimum of 5 characters long.');
			}
			try {
				const response = await this.httpReq('POST', 'http://localhost:3000/main/members/login', {
					email: email,
					password: password
				});
				this.userId = response.userId;
				this.jwt = response.token;
				// this.statusVisible = true;
				this.logSuccess = true;
				this.status = response.status;
				console.log(response);
				console.log(this.userId);
			}
			catch(error) {
				console.log(error);
			}
		},
		signUpForm: async function() {
			const name = this.form.name;
			const last = this.form.last;
			const email = this.form.email;
			const password = this.form.password;
			const repeat = this.form.repeat;

			if (name < 2) {
				return alert('First name should be at least 2 characters long.');
			}
			if (last < 2) {
				return alert('Last name should be at least 2 characters long.');
			}
			if (email < 5) {
				return alert('An email has to be a minimum of 5 characters long.');
			}
			if (password < 5) {
				return alert('A password has to be a minimum of 5 characters long.');
			}
			if (password !== repeat) {
				return alert('Passwords have to match!');
			}
			try {
				const response = await this.httpReq('POST', 'http://localhost:3000/main/members/signup', {
					firstName: name,
					lastName: last,
					email: email,
					password: password
				});
				console.log(response);
			}
			catch(error) {
				console.log(error);
			}
		},
		httpReq: async function(method, url, data) {
			const response = await fetch(url, {
				method: method,
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.jwt}` }
			});
			console.log(response.headers);
			if (response.status >= 400) {
				const errResData = await response.json();
				const error = new Error(errResData.message);
				throw error;
			}
			return response.json();
		}
	},
	destroyed() {
		console.log('destroyed');
	}
}

//one
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//eyJ1c2VySWQiOiIzYTU2M2NhZjY2NThmZjk0MDNjYWYwY2YiLCJpYXQiOjk3ODc0ODI3MywiZXhwIjo5Nzg3NTE4NzN9.
//bHj65N9x00rvmxg-_fVtCtTy3l08TkzlB9ARChNXShk

//eva
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//eyJ1c2VySWQiOiIzYTU1NjRhNDZkNDc0NGE4MGNkNmQ4ZWIiLCJpYXQiOjk3ODc0ODMyOCwiZXhwIjo5Nzg3NTE5Mjh9.
//cMGD9io7q4IG4-gof4eGe-4127FXSofNSHV95Drt1U0

//old token (eva)
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//eyJ1c2VySWQiOiIzYTU1NjRhNDZkNDc0NGE4MGNkNmQ4ZWIiLCJpYXQiOjk3ODc0NjU4NSwiZXhwIjo5Nzg3NTAxODV9.
//-hAnZvFEXBGYZfAOUx_HqGdx4K49ggDGLFhLvg1xjfQ


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYTU1NjRhNDZkNDc0NGE4MGNkNmQ4ZWIiLCJpYXQiOjk3ODc2MjM0NywiZXhwIjo5Nzg3NjU5NDd9.uv3KucNr8DrqSDNHFCtOC7WiATj5NAXuTYk75w34Goo