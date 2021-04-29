const booking = {
	template:
	'<div class="booking">\
	<div class="booking__one" v-if="!this.moveon">\
		<h1 class="booking__header">Book your stay with us!</h1>\
		<form @submit.prevent class="booking-form">\
			<label>First Name: </label><input type="text" placeholder="Joe" v-model="form.name">\
			<label>Last Name: </label><input type="text" placeholder="Doe" v-model="form.last">\
			<label>Number of days staying: </label><input type="number" placeholder="ex. 3" min="0" v-model="form.days">\
			<label>Starting date: </label><input type="text" placeholder="dd/mm/yy" v-model="form.date">\
			<button @click="moveOn">Submit</button>\
		</form>\
	</div>\
	<div class="booking__two" v-if="this.moveon">\
		<h4>Is this the correct info, {{ form.name }}?</h4>\
		<p>First Name: {{ form.name }}</p>\
		<p>Last Name: {{ form.last }}</p>\
		<p>Days: {{ form.days }}</p>\
		<p>Date: {{ form.date }}</p>\
		<button @click="moveOn">Go back</button>\
		<button class="booking-form__button" @click="submitForm">Confirm</button>\
	</div>\
	</div>',
	data: function() {
		return {
			form: {
				name: 'Joe',
				last: 'Biden',
				days: null,
				date: 'lately'
			},
			moveon: false
		}
	},
	methods: {
		moveOn: function() {
			this.moveon = !this.moveon;
		},
		submitForm: async function() {
			const name = this.form.name;
			const last = this.form.last;
			const days = this.form.days;
			const date = this.form.date;

			if (name < 2) {
				return alert('First name should be at least 2 characters long.');
			}
			if (last < 2) {
				return alert('Last name should be at least 2 characters long.');
			}
			if (days < 1) {
				return alert('A minimum of 1 day per stay is required.');
			}
			try {
				const response = await this.httpReq('POST', 'http://localhost:3000/main/book', {
					name: name,
					last: last,
					days: days,
					date: date
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
				headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer' }
			});
			if (response.status >= 400) {
				const errResData = await response.json();
				const error = new Error(errResData.message);
				throw error;
			}
			return response.json();
		}
	}
}