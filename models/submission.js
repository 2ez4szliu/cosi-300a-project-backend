const mongoose = require('mongoose');

module.exports = (mongoose) => {
	const Submission = mongoose.model(
		'submission',
		mongoose.Schema(
			{
				name: String,
				user: String,
				code: String,
				accepted: Boolean
			},
			{ timestamps: true }
		)
	);

	return Submission;
};
