'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollingSchema = new Schema({
	// _creator: {type: Number, ref:'User'},  // this may change
	name: String,			// title of poll
	user:String,
	items: [{itemName: String, votes: Number}] // item names with corresponding vote totals
});

PollingSchema.methods.incrementChoice= function(choice, cb) {
	Console.log("Tryign to increment " + choice);
	var pos = 0;
	while (pos < this.items.length && this.items[pos]!=choice)
		pos++;
	if (pos<this.items.length) 
		this.items.votes++;
	this.save(cb);
}
module.exports = mongoose.model('Polling', PollingSchema);


// I definitely need to think through here what we need to store
// 

//var Poll = new Schema ({
	
//})