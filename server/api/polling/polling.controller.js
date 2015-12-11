'use strict';

var _ = require('lodash');
var Polling = require('./polling.model');

// Get list of pollings
exports.index = function(req, res) {

console.log("Calling index");
  Polling.find(function (err, pollings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(pollings);
  });
};

// Get a single polling
exports.show = function(req, res) {
  console.log("Calling /api/polling/ get with user " + req.params.id);
  Polling.findById(req.params.id, function (err, polling) {
    if(err) { return handleError(res, err); }
    if(!polling) { return res.status(404).send('Not Found'); }
    return res.json(polling);
  });
};

// Creates a new polling in the DB.
exports.create = function(req, res) {
  console.log("trying to create from post");
  Polling.create(req.body, function(err, polling) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(polling);
  });
};

// Updates an existing polling in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Polling.findById(req.params.id, function (err, polling) {
    if (err) { return handleError(res, err); }
    if(!polling) { return res.status(404).send('Not Found'); }
    var updated = _.extend(polling, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(polling);
    });
  });
};

// Deletes a polling from the DB.
exports.destroy = function(req, res) {
  Polling.findById(req.params.id, function (err, polling) {
    if(err) { return handleError(res, err); }
    if(!polling) { return res.status(404).send('Not Found'); }
    polling.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.retrieve = function(req, res) {
  console.log("Retrieve poll " + req.params.title);
  Polling.find({name:req.params.title}, function (err, polling) {
    if (err) return handleError(res, err);
    if (!polling) { return res.status(404).send('Not Found');}
    return res.status(200).json(polling);
  });
}

exports.retrieveUserPolls = function(req, res) {
  console.log("New Retrieve poll " + req.params.username);
  Polling.find({user:req.params.username}, function (err, polling) {
    if (err) return handleError(res, err);
    if (!polling) { return res.status(404).send('Not Found');}
    return res.status(200).json(polling);
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}