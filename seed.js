let chalk = require('chalk'),
    chance = require('chance')(),
    db = require('./server/db'),
    User = db.model('user'),
    Job = db.model('job'),
    JobDescription = db.model('job_description'),
    JobApplication = db.model('job_application'),
    Comment = db.model('comment'),
    Stage = db.model('stage'),
    Company = db.model('company'),
    App = db.model('application');
var Promise = require('sequelize').Promise;
const numUsers = 25,
    numCompanies = 5,
    numJobs = 30, //pipelines have jobs, jobs have app descriptions, and jobappforms
    numStages = 100,
    numApps = 500,
    numComments = 2500;
const companyNames = ['Fullstack Academy', 'Microsoft', 'Lyft', 'Uber', 'BMW'],
    userEmails = chance.unique(chance.email, numUsers),
    department = ["Business Analytics", "Software Engineering", "Engineering", "Frontend Developement", "Customer Service", "Data Science", "Accounting", "Legal", "Marketing", "Operations", "HR", "Communications", "Compliance"],
    titles = ["Manager", "CEO", "Designer", "Intern", "Data Scientist", "Executive Assistant", "Insights Manager", "Product Manager", "Front-End Engineer", "DevOps Engineer", "QA Engineer", "Database Manager", "Social Media Specialist", "Translator", "Paralegal"],
    descriptions = ["<div style=\"font-size: 14px;\">Lyft is hiring for its growing Regulatory Compliance Team. Do you have a legal background, and want to use that expertise to advise a fast-growing business on complex regulatory issues? Are you creative and like to think on your feet? Do you want to help change the transportation industry? If so, then this role is for you.  </div><div style=\"font-size: 14px;\"><br/></div><div style=\"font-size: 14px;\">The Associate Regulatory Compliance Manager will be responsible for developing a deep understanding of Lyft’s regulatory obligations in various markets, and providing the necessary guidance throughout the organization to implement those regulations. The Associate Regulatory Compliance Manager will also negotiate directly with regulators to get favorable regulations in place that reflect Lyft’s business objectives.  </div>"],
    innerDescriptions = ["<ul style=\"font-size: 14px;\"><li>Interprets and analyzes new regulations and laws that govern Lyft’s operations</li><li>Provides strategic advice and guidance on implementing those laws, working closely with the product, legal, communications, and operations teams</li><li>Works closely with regulators in various jurisdictions to negotiate for favorable regulations that support the company’s business objectives</li><li>Maintains ongoing positive relationship with regulators</li><li>Works closely with legal and government relations to draft correspondence, comments, and position papers touching upon Lyft compliance matters</li><li>Meets corporate compliance objectives by forecasting requirements, analyzing variances, and initiating corrective actions</li><li>Works closely with legal and government relations to recommend public policy strategies and operational impacts</li><li>Keeps management, operational, and marketing areas informed of compliance issues</li></ul>",
        "<ul style=\"font-size: 14px;\"><li>JD from a top-tiered law school</li><li>2+ years of legal experience at a mid- to large-sized law firm, government regulatory entity or in-house at a technology company</li><li>Outstanding writing, research, negotiating, and interpersonal skills </li><li>Strong oral advocacy and presentation skills</li><li>Experience advising fast-growing businesses in a regulated industry</li><li>Proven ability to work cross-functionally to achieve maximum compliance while minimizing the impact of compliance on the business</li><li>An understanding of the transportation industry, ridesharing, payments, or other fast growing newly regulated industry</li></ul>"
    ],
    commentContent = ['I love you', '^ is he comming off too strong?', 'he seems too qualified', 'there might something to this', 'I like bread', 'maybe if we actually screen applicants we wouldnt end up with another carl', 'whoopsie daisy', 'if you want to add more comments just put them in the seed file', 'this looks fun', 'wow I love rejecting people... it just makes me feel...  so powerful!', 'Im going insane', 'how many more comments content do I have to write', 'I love seed files!', '#LOL #YOLO #AMIRIGHT?'],
    commentTitles = ['Great Job!', 'Could be better', 'it\'s not me, it\'s you', 'it\'s not you, it\'s me', 'it\'s not me, it\'s me', 'it\'s not you, it\'s you', 'fame', 'I think he\'s the perfect applicant!', 'Next!', 'another one bites the dust', 'Clever title', 'comment.title', 'I put one title in here to screw with the scope'],
    fullNames = ['Bob Dole', 'Elon Musk', 'Jonathan Ligh', 'Ishaan Nagpal', 'Firstname Lastname', 'Kevin Li', 'Payton Henson'],
    stageNames = ['Applied', 'Phone Interview', 'In-Person Interview', 'Offer']

function doTimes(n, fn, arg) {
    var results = [];
    while (n--) {
        results.push(fn(arg));
    }
    return results;
}

function doNTimes(n, fn, arg, arr) {
    //var results = arr //|| [];
    var idx = 0;
    while (idx < n) {
        arr.push(fn(arg, idx));
        idx++;
    }
    //return results;
}

function randomCompany() {
    return Company.build({
        name: companyNames.pop(),
        website: chance.url()
    })
}

function genCompanies() {
    var companies = doTimes(numCompanies, randomCompany);
    return companies;
}

function createCompanies() {
    return Promise.map(genCompanies(), company => company.save());
}

function randomUser(companies) {
    var company = chance.pick(companies);
    return User.build({
        firstName: chance.first(),
        lastName: chance.last(),
        email: userEmails.pop(),
        password: chance.word(),
        companyId: company.id,
        isCompanyAdmin: chance.bool()
    })
}

function genUsers(companies) {
    var users = doTimes(numUsers, randomUser, companies);
    users.push(User.build({
        email: "ishaan@gmail.com",
        password: "ishaan",
        companyId: 1,
        isCompanyAdmin: true,
        firstName: 'Ishaan',
        lastName: 'Nagpal'
    }))
    users.push(User.build({
        email: "kevin@gmail.com",
        password: "kevin",
        companyId: 1,
        isCompanyAdmin: false,
        firstName: 'Kevin',
        lastName: 'Li'
    }))
    return users;
}

function createUsers(companies) {
    return Promise.map(genUsers(companies), user => user.save());
}

function randomJob(companies) {
    var company = chance.pick(companies);
    return Job.create({
        companyId: company.id,
        published: chance.bool({likelihood: 85})
    });
}

function genJobs(companies) {
    var jobs, lobs, cobs, pobs = doTimes(numJobs, randomJob, companies);
    return jobs, lobs, cobs, pobs;
}

function createJobs(companies) {
    return Promise.map(genJobs(companies), job => job.save())
}

function randJobDescription(jobs) {
    var job = jobs.shift();
    var state = chance.state({ country: 'us', full: true })
    return JobDescription.build({
        fields: JSON.stringify({
            "title": chance.pick(titles),
            "commitment": chance.pick(['Full-Time', 'Part-Time']),
            "department": chance.pick(department),
            "description": chance.pick(descriptions),
            "sections": [{
                "sectionTitle": "Requirements",
                "description": innerDescriptions[0]
            }, {
                "sectionTitle": "Experience and Skills",
                "description": innerDescriptions[1]
            }],
            "state": state,
            "city": chance.city({ country: 'us', state: state })
        }),
        jobId: job.id
    })
}

function genJobDescriptions(jobs) {
    return doTimes(numJobs, randJobDescription, jobs);
}

function createJobDescriptions(jobs) {
    return Promise.map(genJobDescriptions(jobs), description => description.save())
}

function randomJobApplication(jobs) { //need to finish
    var job = jobs.shift();
    return JobApplication.build({
        fields: JSON.stringify({
                "customFields": [{
                    "field": "text",
                    "options": {},
                    "basic": {
                        "question": "Why do you want to work here?"
                    },
                    "advanced": {},
                    "id": "custom-field-0"
                }, {
                    "field": "textbox",
                    "options": {},
                    "basic": {
                        "question": "Please submit a thoughtful cover letter detailing your interest and experience here."
                    },
                    "advanced": {},
                    "id": "custom-field-1"
                }, {
                    "field": "dropdown",
                    "options": {},
                    "basic": {
                        "question": "Would you be willing to work part-time?"
                    },
                    "advanced": {
                        "options": [{
                            "value": "Yes"
                        }, {
                            "value": "No"
                        }]
                    },
                    "id": "custom-field-2"
                }, {
                    "field": "radio",
                    "options": {},
                    "basic": {
                        "question": "Where did you hear about this opportunity?"
                    },
                    "advanced": {
                        "options": [{
                            "value": "Google"
                        }, {
                            "value": "Recruiter"
                        }, {
                            "value": "LinkedIn"
                        }, {
                            "value": "Indeed.Com"
                        }]
                    },
                    "id": "custom-field-3"
                }, {
                    "field": "checkbox",
                    "options": {},
                    "basic": {
                        "question": "What locations are you interested in working at?"
                    },
                    "advanced": {
                        "options": [{
                            "value": "New York"
                        }, {
                            "value": "New Jersey"
                        }, {
                            "value": "San Francisco"
                        }, {
                            "value": "China"
                        }]
                    },
                    "id": "custom-field-4"
                }],
                "general": {
                    "fullNameField": {
                        "value": 0,
                        "label": "Full Name"
                    },
                    "emailField": {
                        "value": 0,
                        "label": "Email"
                    },
                    "resumeField": {
                        "value": 0,
                        "label": "Resume"
                    },
                    "phoneField": {
                        "value": 1,
                        "label": "Phone"
                    },
                    "currentCompanyField": {
                        "value": 1,
                        "label": "Current Company"
                    }
                },
                "links": {
                    "linkedInLinkField": {
                        "value": chance.pick([1, 2]),
                        "label": "LinkedIn URL"
                    },
                    "twitterLinkField": {
                        "value": chance.pick([1, 2]),
                        "label": "Twitter URL"
                    },
                    "githubLinkField": {
                        "value": chance.pick([1, 2]),
                        "label": "GitHub URL"
                    },
                    "portfolioLinkField": {
                        "value": chance.pick([1, 2]),
                        "label": "Portfolio URL"
                    },
                    "otherLinkField": {
                        "value": chance.pick([1, 2]),
                        "label": "Other Website"
                    }
                }
            }


        ),
        jobId: job.id
    })
}

function genJobApplications(jobs) {
    return doTimes(numJobs, randomJobApplication, jobs);
}

function createJobApplications(jobs) {
    return Promise.map(genJobApplications(jobs), application => application.save())
}

function randomStage(job, num) { // might want to edit to prevent stages from having the same index on the same job, right now that is statistically impropable
    var panelContent;

    if (num === 0) {
        panelContent = [{"title":"Notes","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-notes.html","panelId":0,"panelNotes":"<p>Make sure that applicants are moved from stage to stage within 3 days of receiving their application.</p>"}];
    }
    else if (num === 1) {
    panelContent = [{"title":"Interviewer Instructions","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-notes.html","panelId":0,"panelNotes":"<h3><b><u>Technical Interview</u></b></h3><h3>Instructions for Interviewers</h3><div>Please ask the Longest Palindromic Substring question: Write a function that finds the longest palindromic substring given a string.</div><div><b><br/></b></div><div><i>This interview is an assessment of the candidate's technical ability. You'll want to spend the majority of the time on the pair programming question.</i> </div><div><b><br/></b></div><div><b>Tips</b></div><div><ul><li>Don't get too bogged down in the details -- make sure that the candidate has enough time to finish it out. </li><li>Leave 5 min at the end of the interview for any questions that come to mind!<br/></li></ul></div><div><b><br/></b></div><div>Here's a general outline of how to conduct this 30 min interview:</div><div><b><br/></b></div><div><ol><li>Introduction (3 min) - Where do you currently work? What do you do there?</li><li>Previous work experience (3 min) - What other jobs have you had?</li><li>Pair programming challenge (19 min) - Longest Palindromic Substring</li><li>Questions from the candidate (5 min)</li></ol></div>"},{"title":"Interview Kit","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-form.html","panelId":1,"panelQuestions":[{"title":"Rating","description":"This is the overall score of the candidate.","selectedField":"dropdown","id":0,"dropdownOptions":"","options":[{"value":"4 - Strong Hire"},{"id":"choice2","value":"3 - Hire"},{"id":"choice3","value":"2 - No Hire"},{"id":"choice4","value":"1 - Strong No Hire"},{"id":"choice5"}]},{"title":"How awesome is this candidate compared to other engineers?","description":"Compare to other interview candidates.","selectedField":"radio","id":1,"options":[{"value":"Top 1%"},{"id":"choice2","value":"Top 10%"},{"id":"choice3","value":"Top 25%"},{"id":"choice4","value":"Below top 25%"},{"id":"choice5"}]},{"title":"Engineering Scorecard","description":"Rate candidate based on their code style, analytical thinking, and communication skills.","selectedField":"scoreboard","id":2,"dropdownOptions":"","options":[{"value":"Does this candidate meet our bar for algorithm problems?"},{"id":"choice2","value":"Is the code clean? Does it have good structure?"},{"id":"choice3","value":"Can we trust this candidate with our challenges?"},{"id":"choice4","value":"Are they able to articulate the details?"},{"id":"choice5"}]},{"title":"Longest Palindromic Substring","description":"Please include the code that the candidate wrote to answer this question.","selectedField":"code","id":3},{"title":"Would you enjoy working alongside this individual?","description":"Your opinion.","selectedField":"yesno","id":4},{"title":"Describe candidate in one adjective.","description":"Based on the entire interview.","selectedField":"text","id":5},{"title":"Additional Thoughts?","description":"Anything else that came to your mind about the candidate during the interview process.","selectedField":"textbox","id":6}]}]
} else if (num === 2) {
     panelContent = [{"title":"Interviewer Instructions","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-notes.html","panelId":0,"panelNotes":"<h3><b><u>Technical Interview</u></b></h3><h3>Instructions for Interviewers</h3><div>Please ask the Longest Palindromic Substring question: Write a function that finds the longest palindromic substring given a string.</div><div><b><br/></b></div><div><i>This interview is an assessment of the candidate's technical ability. You'll want to spend the majority of the time on the pair programming question.</i> </div><div><b><br/></b></div><div><b>Tips</b></div><div><ul><li>Don't get too bogged down in the details -- make sure that the candidate has enough time to finish it out. </li><li>Leave 5 min at the end of the interview for any questions that come to mind!<br/></li></ul></div><div><b><br/></b></div><div>Here's a general outline of how to conduct this 30 min interview:</div><div><b><br/></b></div><div><ol><li>Introduction (3 min) - Where do you currently work? What do you do there?</li><li>Previous work experience (3 min) - What other jobs have you had?</li><li>Pair programming challenge (19 min) - Longest Palindromic Substring</li><li>Questions from the candidate (5 min)</li></ol></div>"},{"title":"Interview Kit","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-form.html","panelId":1,"panelQuestions":[{"title":"Rating","description":"This is the overall score of the candidate.","selectedField":"dropdown","id":0,"dropdownOptions":"","options":[{"value":"4 - Strong Hire"},{"id":"choice2","value":"3 - Hire"},{"id":"choice3","value":"2 - No Hire"},{"id":"choice4","value":"1 - Strong No Hire"},{"id":"choice5"}]},{"title":"How awesome is this candidate compared to other engineers?","description":"Compare to other interview candidates.","selectedField":"radio","id":1,"options":[{"value":"Top 1%"},{"id":"choice2","value":"Top 10%"},{"id":"choice3","value":"Top 25%"},{"id":"choice4","value":"Below top 25%"},{"id":"choice5"}]},{"title":"Engineering Scorecard","description":"Rate candidate based on their code style, analytical thinking, and communication skills.","selectedField":"scoreboard","id":2,"dropdownOptions":"","options":[{"value":"Does this candidate meet our bar for algorithm problems?"},{"id":"choice2","value":"Is the code clean? Does it have good structure?"},{"id":"choice3","value":"Can we trust this candidate with our challenges?"},{"id":"choice4","value":"Are they able to articulate the details?"},{"id":"choice5"}]},{"title":"Longest Palindromic Substring","description":"Please include the code that the candidate wrote to answer this question.","selectedField":"code","id":3},{"title":"Would you enjoy working alongside this individual?","description":"Your opinion.","selectedField":"yesno","id":4},{"title":"Describe candidate in one adjective.","description":"Based on the entire interview.","selectedField":"text","id":5},{"title":"Additional Thoughts?","description":"Anything else that came to your mind about the candidate during the interview process.","selectedField":"textbox","id":6}]}]
    } else if (num === 3) {
    panelContent = [{"title":"Notes","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-notes.html","panelId":0,"panelNotes":"<p>Starting salary between $75,000 to $100,000.</p>"}];
    }

    return Stage.build({
        index: num,
        title: stageNames[num],
        jobId: job.id,
        panels: panelContent
    })
}

function genStages(jobs) {
    var stages = [];
    jobs.forEach(function(job) {
        doNTimes(4, randomStage, job, stages)
    })
    return stages;
}

function createStages(jobs) {
    return Promise.map(genStages(jobs), stages => stages.save());
}

function randomApp(stages) {
    return App.build({
        application: JSON.stringify({
            "fullNameField": chance.name(),
            "emailField": chance.email(),
            "phoneField": chance.phone(),
            "currentCompanyField": chance.sentence({ words: 2 }),
            "linkedInLinkField": "https://ca.linkedin.com/in/tj-holowaychuk-9a92817",
            "twitterLinkField": "https://twitter.com/tjholowaychuk",
            "githubLinkField": "https://github.com/tj",
            "portfolioLinkField": "http://tjholowaychuk.com/",
            "otherLinkField": "https://medium.com/@tjholowaychuk"
        }),
        jobId: Math.floor(Math.random() * 30) + 1,
        stageId: chance.pick(stages).id,
        rejected: chance.weighted([true, false], [80, 20])
    })
}

function genApps(stages) {
    return doTimes(numApps, randomApp, stages)
}

function createApps(stages) {
    return Promise.map(genApps(stages), apps => apps.save());
}

function randomComments() {
    return Comment.build({
        title: chance.pick(commentTitles),
        content: chance.pick(commentContent),
        stageId: Math.floor(Math.random() * 100) + 1,
        userId: Math.floor(Math.random() * 27) + 1,
        rating: chance.pick([0, 1, 2, 3, 4, 5]),
        applicationId: Math.floor(Math.random() * 500) + 1
    })
}

function genComments() {
    return doTimes(numComments, randomComments);
}

function createComments() {
    return Promise.map(genComments(), comments => comments.save());
}

function seed() {
    var _companies, _users, _stages, _jobs;
    return createCompanies()
        .then(companies => {
            _companies = companies;
            return createUsers(companies)
        })
        .then(users => {
            _users = users;
            return createJobs(_companies)
        })
        .then(jobs => {
            _jobs = jobs
            return createJobDescriptions(jobs)
        })
        .then(function(jobs) {
            return createJobApplications(jobs)
        })
        .then(function(jobs) {
            return createStages(jobs)
        })
        .then(stages => {
            return createApps(stages)
        })
        .then(function() {
            return createComments()
        })
        .then(function() {
            console.log("Hello")
        })
}
db.sync({ force: true })
    .then(function() {
        return seed();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });
