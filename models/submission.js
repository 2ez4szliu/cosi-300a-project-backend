const mongoose = require('mongoose');

module.exports = (mongoose) => {
	const Submission = mongoose.model(
		'submission',
		mongoose.Schema(
			{
				path: String,
				user: String,
				code: String
			},
			{ timestamps: true }
		)
	);

	return Submission;
};
