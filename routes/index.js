var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Link = mongoose.model('Link');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route('/links')
        .get(function(req, res, next) {
            Link.find(function(err, links) {
                if (err) {return next(err);}

                // return a JSON
                res.json(links);
            })
        })
        .post(function(req, res, next) {
            var link = new Link(req.body);

            link.save(function(err, data) {
                if (err) {return next(err);}

                res.json(link);
            })
        });

router.get('/links/:id', function(req, res, next) {
    var id = req.params.id;

    Link.find({_id: id}, function(err, link) {
        if (err) {return next(err);}

        res.json(link);
    })
});

router.put('/links/:id', function(req, res, next) {
    var id = req.params.id;
    var newName = req.body.name;
    var newLink = req.body.link;

    // use our Link model to find the link we want
    Link.findById(id, function(err, link) {
        if (err) {
            console.log(err);
            res.send(err);
        }

        link.name = newName;
        link.link = newLink;

        link.save(function(err, data) {
            if (err) {return next(err);}

            res.json(link);
        });
    })
});

router.delete('/links/:id/delete', function(req, res, next) {
    var id = req.params.id;

    Link.remove({_id: id}, function(err, removed) {
        if (err) {return next(err);}

        res.json(removed);
    })
})

module.exports = router;
