$('#findOutBtn').on('click', function() {
	var categoryText = "Select a category";
	$('#findOutBtn').css('display', 'none');
	$('#headerText').text(categoryText);
	$('.btnCategories').show();
	$('.jumbotron').append("<p id='comingSoonText'>* coming soon</p>");
});

// Math subject array
// gives the name of the subject
// and gives value if the subject is ready to be played
var mathCategories = [

	arithmetic = {
		name: 'Basic arithmetic',
		id: 'arithmetic',
		ready:true
	},

	algebra = {
		name:'Algebra',
		id: 'algebra',
		ready:false
	},

	geometry = {
		name:'Geometry',
		id: 'geometry',
		ready:false
	},

	trigonometry = {
		name:'Trigonometry',
		id: 'trigonometry',
		ready:false
	},

	calculus = {
		name:'Calculus',
		id: 'calculus',
		ready:false
	}
];

// Creates the math subject btns 
// applies btn-danger class if subject has not been added yet
// and displays an '*' to show it is not ready
for(var i = 0; i < mathCategories.length; i++) {
	if(mathCategories[i].ready === true) {
		mathCategories[i].ready = 'btn-info';
	} else {
		mathCategories[i].ready = 'btn-danger';
	}
	var mathCategory = $("<button class='btn btn-lg " + mathCategories[i].ready + " btnCategories'>" + mathCategories[i].name + " </button>");
	$('.math-categories').append(mathCategory);
}

if($('.btnCategories').hasClass('btn-danger')) {
	$('.btn-danger').append('*');
}

function chooseCategory() {
	console.log();
}

function gameSetup() {
	$('.btnCategories').on('click', function(event) {
		var mathCategoryId = event.currentTarget.id;
		var currentCategory = mathCategories.filter(function(currentCategory) {
			return currentCategory.id === mathCategoryId;
			})[0];
		console.log(mathCategoryId);
		chooseCategory(currentCategory);
	})
}

gameSetup();


















