var categoryChosen;
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var easyModeTimer;
var hardModeTimer;
var resetTime;


// Basic Arithmetic category questions array
var arithmeticQuestions = [{
    question: 'What is 2+2?',
    choices: ["3", "4", "2", "1"],
    correctAnswer: 1
  }, {
    question: 'What is 2/2?',
    choices: ["3", "4", "2", "1"],
    correctAnswer: 3
  }, {
    question: 'What is 2-2?',
    choices: ["3", "4", "2", "0"],
    correctAnswer: 3
  }, {
    question: 'What is 4+4?',
    choices: ["3", "4", "8", "16"],
    correctAnswer: 2   
}];

var arithmeticQuestionsLength = arithmeticQuestions.length;


// Math subject array
// gives the name of the subject
// and gives value if the subject is ready to be played
var mathCategories = [

	arithmetic = {
		name: 'Basic Arithmetic',
		id: 'arithmetic',
		ready:true,
		easyTime: 30,
		hardTime: 6,
		numQuestions: arithmeticQuestionsLength
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





function gameSetup() {

	// Find out button onClick will show math categories
	// along with additional messages and headings
	$('#findOutBtn').on('click', function() {
		var categoryText = "Select a category";
		$('#findOutBtn').css('display', 'none');
		$('#headerText').text(categoryText);
		$('.btnCategories').show();
		$('.jumbotron').append("<p id='comingSoonText'>* coming soon</p>");
	});

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
		$('.math-categories').append(mathCategory);
	}

	// Only targets math category buttons if they are not ready
	// adds an * to identify subject is not ready
	if($('.btnCategories').hasClass('btn-danger')) {
		$('.notReady').append('*');
	}

	// Allows user to go back to math category selection page
	// if user decides they do not want that subject
	$('#backBtn').on('click', function() {
		categoryChosen = false;
		$('.categoryDifficulty').hide();
		$('.btnCategories').show();
		$('#comingSoonText').show();
		$('#headerText').show();
		$('#backBtn').hide();
	});

	// Identifies which math subject was clicked
	// allows user to select difficulty and supplies 
	// information about each difficulty mode
	$('.btnCategories').on('click', function(event) {
		var mathCategoryId = event.currentTarget.id;
		var currentCategory = mathCategories.filter(function(currentCategory) {
			return currentCategory.id === mathCategoryId;
			})[0];

		if(!categoryChosen && currentCategory.ready) {
			categoryChosen = true;
			$('.btnCategories').hide();
			$('#comingSoonText').hide();
			$('#easyModeHeading').html(currentCategory.name + ": easy mode");
			easyModeTimer = currentCategory.easyTime;
			$('.easyModeTime').html(currentCategory.easyTime);
			$('.numQuestions').html(currentCategory.numQuestions);
			$('#hardModeHeading').html(currentCategory.name + ": hard mode");
			hardModeTimer = currentCategory.hardTime;
			$('.hardModeTime').html(currentCategory.hardTime);
			$('.categoryDifficulty').show();
			$('#headerText').hide();
			$('#backBtn').css('display', 'block');
		}

		$('#easyMode').on('click', function() {
			displayCurrentQuestion();
			$('.categoryDifficulty').hide();
			$('#backBtn').hide();
			$('.nextBtn').show();
			easyModeTimerRun();
		})

		$('#hardMode').on('click', function() {
			displayCurrentQuestion();
			$('.categoryDifficulty').hide();
			$('#backBtn').hide();
			$('.nextBtn').show();
			hardModeTimerRun(hardModeTimer);
		})
	})
};

function easyModeDecrement() {
	easyModeTimer--;
	$('.timer').html("<h2>" + easyModeTimer + "</h2>");
	if(easyModeTimer <= 0) {
		displayScore();
		easyModeTimerStop();
		quizOver = true;
		$('.nextBtn').text('Play again?');
	}
}

function easyModeTimerRun() {
	easyCountdown = setInterval(easyModeDecrement, 1000);
}

function easyModeTimerStop() {
	clearInterval(easyCountdown);
}

function hardModeDecrement() {
	hardModeTimer--;
	$('.timer').html("<h2>" + hardModeTimer + "</h2>");
	if(hardModeTimer <= 0) {
		currentQuestion++;
		if(currentQuestion < arithmeticQuestions.length) {
			displayCurrentQuestion();
			hardModeTimerStop();
			hardModeTimerRun(resetTime);
		} else {
			hardModeTimerStop();
			displayScore();
			$('.nextBtn').text('Play again?');
			quizOver = true;
		}
	}

	$('.nextBtn').on('click', function() {
		hardModeTimerStop();
		hardModeTimerRun(resetTime);
		if(currentQuestion >= arithmeticQuestions.length){
			hardModeTimerStop();
		}
	});
}

function hardModeTimerRun(time) {
	hardModeTimer = time;
	resetTime = time;
	hardCountdown = setInterval(hardModeDecrement, 1000);
}

function hardModeTimerStop() {
	clearInterval(hardCountdown);
}




function displayCurrentQuestion() {

	var question = arithmeticQuestions[currentQuestion].question;
	var questionClass = $('.currentQuestion').text(question);
	var choiceList = $('.choiceList').find("li").remove();
	var numChoices = arithmeticQuestions[currentQuestion].choices.length;
	var choice;

	for(i = 0; i < numChoices; i++) {
		choice = arithmeticQuestions[currentQuestion].choices[i];
		$("<li><input type='radio' value=" + i + " name='dynradio' /><span class='choiceGap'>" + choice + "</span></li>").appendTo('.choiceList');
	}
}

function resetQuiz() {
	location.reload();
}

function displayScore() {
	$('.score').text("You scored: " + correctAnswers+ " out of " + arithmeticQuestions.length);
	$('.score').show();
}

function hideScore() {
	$('.score').hide();
}

$('.nextBtn').on('click', function() {
	if(!quizOver) {

		value = $("input[type='radio']:checked").val();

		if(value == undefined) {
			$('.message').text('please select an answer');
			$('.message').show();
		} else {

			$('.message').hide();
			if(value == arithmeticQuestions[currentQuestion].correctAnswer) {
				correctAnswers++;
			}

		currentQuestion++;
		if(currentQuestion < arithmeticQuestions.length) {
			displayCurrentQuestion();
		} else {
			displayScore();
			$('.nextBtn').text('Play again?');
			quizOver = true;
			}
		}
	} else {
		quizOver = false;
		resetQuiz();
	}
})


gameSetup();


















