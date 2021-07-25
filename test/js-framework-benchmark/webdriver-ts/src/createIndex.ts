/* deepscan-disable */
import * as fs from 'fs';

import {Benchmark, BenchmarkType, benchmarks} from './benchmarks'
import {JSONResult, config, initializeFrameworks} from './common'

async function main() {
	let frameworks = await initializeFrameworks();

	frameworks.sort( (a,b) => a.fullNameWithKeyedAndVersion.localeCompare(b.fullNameWithKeyedAndVersion));

	const dots = require('dot').process({
		path: './'
	});

	fs.writeFileSync('../index.html', dots.index({
		frameworks
	}), {
		encoding: 'utf8'
	})
}

main();