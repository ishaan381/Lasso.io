var checkUser = function (req, res, next) {
    if (req.user) next();
    else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
}

var checkAdmin = function(req, res, next) {
     if (req.user && req.user.isAdmin) next();
     else {
         var err = new Error('Unauthorized');
         err.status = 401;
         next(err);
     }
}

var checkAccess = function (req, res, next) {
    if (req.user.id === req.requestedUser.id || req.user.isAdmin) next();
    else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
}

var checkCompanyAdmin = function(req, res, next) {
    if(req.user.isCompanyAdmin || req.user.companyId === req.requestedCompany.id) next();
    else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
}

var checkCompany = function(req, res, next) {
    if(req.user.companyId === req.requestedCompany.id) next();
    else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
}


module.exports = {
    user: checkUser,
    admin: checkAdmin,
    access: checkAccess,
    pageAdmin: checkCompanyAdmin,
    company: checkCompany
}