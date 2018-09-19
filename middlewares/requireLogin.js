//Middlewares have the ability to take incoming requests and modify them inside the middlewares body
//Next is a function that we call when the middleware is complete. Kind of like done. It indicates that it passes of to the next middleware in the chain
module.exports = (req, res, next) => {
    if(req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    //Let the user continue to the request handler
    next();
};

