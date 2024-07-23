import cypress from 'cypress';

cypress.cli.parseRunArguments(process.argv.slice(2))
	.then(cypress.run)
	.then((results) => {
		if (results.failures) {
			process.exit(1);
		}

		process.exit(results.totalFailed)
	})
