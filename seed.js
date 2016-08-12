/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/


let chalk = require('chalk'),
 db = require('./server/db'),
 User = db.model('user'),
 Job = db.model('job'),
 JobDescription = db.model('job_description'),
 JobApplication = db.model('job_application'),
 Comment = db.model('comment'),
 Pipette = db.model('pipe'),
 Company = db.model('company'),
 Pipeline = db.model('pipe_array'),
 App = db.model('application');

var Promise = require('sequelize').Promise;

const numUsers = 20,
    numCompanies = 5,
    numComments = 30,
    numJobs = 5,//pipelines have jobs, jobs have app descriptions, and jobappforms
    numApps = 7,
    numJobDesc = 5,
    numJobApp = 5;

const companyNames = ['Fullstack Academy', 'Moon.com', 'Whateva', 'AlreadyRunningOutofIdeas.com', 'LastOne'],
    commentContent = ['I love you', '^ is he comming off too strong?', 'he seems too qualified', 'there might something to this', 'I like bread', 'maybe if we actually screen applicants we wouldnt end up with another carl', 'whoopsie daisy', 'if you want to add more comments just put them in the seed file', 'this looks fun', 'wow I love rejecting people... it just makes me feel...  so powerful!', 'Im going insane', 'how many more comments content do I have to write', 'I love seed files!', '#LOL #YOLO #AMIRIGHT?'],
    commentTitles = ['Great Job!', 'Could be better', 'it\'s not me, it\'s you', 'it\'s not you, it\'s me', 'it\'s not me, it\'s me', 'it\'s not you, it\'s you', 'fame', 'I think he\'s the perfect applicant!', 'Next!', 'another one bites the dust', 'Clever title', 'comment.title', 'I put one title in here to screw with the scope'],
    stageNames = ['Phone Screen', 'YOLO', 'Haze Them', 'Just give them the job already'],
    userEmails =['bob@bob.com', 'Jerbderb@ferb.com', 'thesearealleastereggs@seed.com', 'Jamal@gmail.com', 'Ineed20differentemails@gmail.com', 'Istherelifeonmars@gmail.com', 'davidbowie@starman.com', 'crazydiamond@shineon.com', 'Istartedmakingmusicreferences@bored.com', 'a@gmail.com','b@gmail.com','c@gmail.com','d@gmail.com','g@gmail.com', 'f@gmail.com', 'e@gmail.com', 'h@gmail.com', 'i@gmail.com', 'j@gmail.com', 'LonathanJigh@gmail.com', 'LevinKi@gmail.com', 'NishaanAgpal@gmail.com', 'HaytonPenson@gmail.com'],
    passwords = ['asdf','pgs','ishaan', 'nissan','hondacivic'],
    companyWebsites = ['Fullstack.com', 'moon.net', 'whateva.com', 'lasso.com', 'com.com'],
    department = ["Business Analytics", "Software Engineering", "Engineering", "Frontend Developement", "Astronaught"],
    commitment = ["Part-Time", "Full-Time"],
    title = ["title", "title1", "title2", "title3", "title4"],
    description = ["<p>s</p>", "<p>there is a description here</p>", "<p>this is what you'll do</p>", "<p>We need someone who means business</p>", "<p>We need someone who can \" engineer\" a solution</p>"];


function doNTimes(n, fn) {
    var results = [];
    while(n--) {
        results.push(fn(n));
    }
    return results;
}
//for randomize functions that dont require passing something into the function
function doTimes(n, fn) {
    var results = [];
    while(n--) {
        results.push(fn(n));
    }
    return results;
}

function randomCompany(num){
    return Company.build({
        name: companyNames[num],
        website: companyWebsites[num]
    })
}

function genCompany(){
    var companies = doNTimes(numCompanies, randomCompany);
    return companies;
}

function createCompany() {
    return Promise.map(genCompany(), company => company.save());
}

function randomUser(num) {
    return User.build({
        email: userEmails[num + 1],
        password: passwords[2],
        companyId: Math.floor(Math.random() * 5) + 1
    })
}


function genUser(){
    var users = doNTimes(numUsers, randomUser);
    return users;
}

function createUsers(){
    return Promise.map(genUser(), user => user.save());
}

function randomJobDesc(){
    return JobDescription.build({
        fields: JSON.stringify({
            "title": title[Math.floor(Math.random() * 5) + 1],
            "commitment": commitment[Math.floor(Math.random() * 2) + 1],
            "department": department[Math.floor(Math.random() * 5) + 1],
            "description": description[Math.floor(Math.random() * 5) + 1],
            "country": "US",
            "region": "New York, USA"
        })
    })
}

function genJobDesc() {
    var jobDescriptions = doTimes(numJobDesc, randomJobDesc);
    return jobDescriptions;
}

function createJobDesc() {
    return Promise.map(genJobDesc(), job_description => job_description.save());
}

function randomJobApp(){
    return JobApplication.build({
        fields: {
            "nothing": "not yet"
        }
    })
}

function genJobApp() {
    var jobApplications = doTimes(numJobApp, randomJobApp);
    return jobApplications;
}

function createJobApp(){
    return Promise.map(genJobApp(), job_application => job_application.save());
}

function randomJob(num){
    return Job.build({
        descriptionId: num + 1,
        applicationId: num + 1,
        companyId: num + 1
    })
}

function genJobs(){
    var jobs = doNTimes(numJobs, randomJob);
    return jobs;
}

function createJobs() {
    return Promise.map(genJobs(), job => job.save());
}


function seed() {
    
    return createCompany()
    .then(function(){
        return createUsers();
    }).then(function(){
        return createJobApp();
    }).then(function() {
        return createJobDesc();
    }).then(function(){
        return createJobs();
    })

}

db.sync({ force: true })
    .then(function () {
        return seed();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
