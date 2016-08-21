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
    stageNames = ['Applied', 'Phone Interview', 'In-Person Interview', 'Hired']

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
    return Job.create({ companyId: company.id })
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
    panelContent = [{"title":"Interviewer Instructions","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-notes.html","panelId":0,"panelNotes":"<ol><li>Print out interview questions.</li><li>Ask about previous experience as a lead developer.</li></ol>"},{"title":"Interview Kit","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-form.html","panelId":1,"panelQuestions":[{"title":"Describe candidate in a single word.","description":"Adjectives only.","selectedField":"text","dropdownOptions":""},{"title":"What did the candidate do well?","description":"Note their behavior.","selectedField":"textbox","dropdownOptions":""},{"title":"Programming Portion","description":"Include the programming code sample from HackerRank.","selectedField":"code","dropdownOptions":""}]}];
    } else if (num === 2) {
     panelContent = [{"title":"Interviewer Instructions","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-notes.html","panelId":0,"panelNotes":"<ol><li>Print out interview questions.</li><li>Ask about previous experience as a lead developer.</li></ol>"},{"title":"Interview Kit","templateUrl":"/js/postings/edit/pipeline/panel-templates/default-form.html","panelId":1,"panelQuestions":[{"title":"Describe candidate in a single word.","description":"Adjectives only.","selectedField":"text","dropdownOptions":""},{"title":"What did the candidate do well?","description":"Note their behavior.","selectedField":"textbox","dropdownOptions":""},{"title":"Programming Portion","description":"Include the programming code sample from HackerRank.","selectedField":"code","dropdownOptions":""}]}];
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
