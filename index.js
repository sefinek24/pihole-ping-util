const fs = require('node:fs');
const exec = require('node:child_process').exec;
const arr = ['#', '255.255.255.255', '::1', 'fe80::1%lo0', 'ff00::0', 'ff02::1', 'ff02::2', 'ff02::3'];

const data = fs.readFileSync('hostfile.txt', 'utf-8');
const lines = data.replace(/127\.0\.0\.1 |0\.0\.0\.0 |\\n/gi, '').split(/\r?\n/);

lines.forEach(line => {
	if (!line.length || arr.some(w => line.startsWith(w))) return;

	exec(`ping -n 1 ${line}`, (error, stdout, stderr) => {
		console.log('================================================================================================================');

		if (error) return console.error(`\nError: ${error.message}`);
		if (stderr) return console.log(stderr);

		console.log(`${stdout}`);
	});
});