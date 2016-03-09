var fs = require('fs');
var _ = require('underscore');

var args = process.argv.slice(2);
var ratings = JSON.parse(fs.readFileSync(args[0], 'utf8')).results;

var summary = false;

ratings = _.filter(ratings, function(rating) {
	return rating.draft === false;
});
ratings = _.groupBy(ratings, function(rating) {
	return rating.talk.title.en;
})

_.each(ratings, function(ratings, title) {
	console.log(title)
	var total = 0;
	_.each(ratings, function(rating) {
		if (!summary) {
			var review = rating.review ? (': ' + rating.review) : ''
			console.log('    ' + rating.rating + review);
		}
		total += rating.rating;
	});
	if (summary) {
		console.log('\tvotes: ' + ratings.length + '\t avg: ' + (total / ratings.length));
	} else {
		console.log('  Avg: ' + (total / ratings.length));
		console.log('');
	}
});