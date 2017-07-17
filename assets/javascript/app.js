var categoryChosen;


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
		name: 'Basic Arithmetic',
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
		checkReady = 'btn-info';
	} else {
		checkReady = 'btn-danger notReady';
	}
	var mathCategory = $("<button class='btn btn-lg " + checkReady + " btnCategories' id='" + mathCategories[i].id + "'>"
	 + mathCategories[i].name + " </button>");
	console.log(mathCategories[i].id);
	$('.math-categories').append(mathCategory);
}

if($('.btnCategories').hasClass('btn-danger')) {
	$('.notReady').append('*');
}

// May not need this function
function chooseCategory(category) {
	if(!categoryChosen) {
		categoryChosen = true;
		$('.btnCategories').hide();
		$('#easyMode').html(currentCategory + " easy mode");
		$('.categoryDifficulty').show();
	}	
}

$('#backBtn').on('click', function() {
	categoryChosen = false;
	$('.categoryDifficulty').hide();
	$('.btnCategories').show();
	$('#comingSoonText').show();
	$('#headerText').show();
	$('#backBtn').hide();
});

function gameSetup() {
	$('.btnCategories').on('click', function(event) {
		var mathCategoryId = event.currentTarget.id;
		var currentCategory = mathCategories.filter(function(currentCategory) {
			return currentCategory.id === mathCategoryId;
			})[0];
		console.log(currentCategory);
		// chooseCategory(currentCategory);
		if(!categoryChosen && currentCategory.ready) {
			categoryChosen = true;
			$('.btnCategories').hide();
			$('#comingSoonText').hide();
			$('#easyModeHeading').html(currentCategory.name + ": easy mode");
			$('#hardModeHeading').html(currentCategory.name + ": hard mode");
			$('.categoryDifficulty').show();
			$('#headerText').hide();
			$('#backBtn').css('display', 'block');
		}
	})
}



var arithmeticQuestions = [
  question1 = {
    name: 'question one',
    problem: 'what is 2 + 2?',
    choices: [
      one = '2',
      two = '3',
      three = '4',
      four = '5'
    
    ],
    correctChoice: '4'
  },

   question2 = {
    name: 'question one',
    problem: 'what is 2 + 2?',
    choices: [
      one = '2',
      two = '3',
      three = '4',
      four = '5'
    
    ],
    correctChoice: '4'
  },

   question3 = {
    name: 'question one',
    problem: 'what is 8 * 3?',
    choices: [
      one = '2',
      two = '3',
      three = '4'
    
    ],
    correctChoice: '4'
  }


];

if(arithmeticQuestions[0].choices[2] === arithmeticQuestions[0].correctChoice) {
   	console.log(arithmeticQuestions[0].choices[2]);
   	console.log(arithmeticQuestions[0].correctChoice);
}


for(var i = 0; i < arithmeticQuestions.length; i++) {
	var questionProblem = $("<div class='question-problem'>" +  arithmeticQuestions[i].problem + "</div>");
    var questionChoices = $("<div class='question-choices'>" + arithmeticQuestions[i].choices + "</div>");
    $('#quizContent').append(questionProblem).append(questionChoices);
}

gameSetup();


















