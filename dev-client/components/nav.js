const navbar = {
	props: {
		pages: { type: Object, required: true }
	},
	template:
	'<div>\
		<ul class="navbar__ul">\
			<div class="navbar__main-li">\
				<li class="navbar__li" @click="navigate(0)">main</li>\
				<li class="navbar__li" @click="navigate(1)">location</li>\
				<li class="navbar__li navbar__member" @click="navigate(3)">members</li>\
			</div>\
			<div>\
				<li class="navbar__li button--cta" @click="navigate(2)">Book now!</li>\
			</div>\
		</ul>\
	</div>',
	data: function() {
		return {
			
		}
	},
	methods: {
		navigate: function(valueId) {
			this.$emit('changepage', valueId);
		}
	}
}


// <li v-for="(value, key, index) in pages" :key="value.id" @click="navigate(index)">
// 	{{ key }}
// </li>