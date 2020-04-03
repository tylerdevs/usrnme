#!/usr/bin/env node

const got = require('got');
const fs = require('fs');
const chalk = require('chalk');
const yargs = require("yargs");
const pad = require("advanced-pad");
const path = require("path")
const log = console.log;

// options
const options = yargs
.usage("Usage: -u <username>")
.option("u", { alias: "username", describe: "Username to search", type: "string", demandOption: false })
.option("f", { alias: "filter", describe: "List of categories to focus search on", type: "string", demandOption: false })
.option("c", { alias: "categories", describe: "Display list of categories", type: "boolean", demandOption: false })
.option("w", { alias: "writefile", describe: "Output matches to HTML file", type: "boolean", demandOption: false })
.argv;
const username = options.username;

// chalk theme
const green = chalk.hex('#75ffb0');
const gray = chalk.hex('#6f6f6f');
const red = chalk.hex('#ff5577');

// url objects
const urlArray = [];
const matches = [];

// categories
const categories = {
    1: 'Social Media', 2: 'Messaging Apps', 3: 'Forums', 4: 'Dating Sites', 5: 'Marketplaces', 6: 'Gaming', 7: 'Anime Manga Cosplay', 8: 'Arts & Crafts', 9: 'Music', 10: 'Coding & Hacking', 11: 'Adult', 12: 'Other', 13: 'Payment Apps', 14: 'Movies'
};

// load urls from json file
const packagePath = path.dirname(require.resolve("usrnme/package.json"));
let json_data = fs.readFileSync(packagePath + '/src/urls.json');
let urls = JSON.parse(json_data);

// function to fetch urls
async function fetchAddress(url) {

	try{

		// start request
		log(gray('----- Testing: ' + url.address));

		const response = await got(url.address, {
			headers: {
				'user-agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36`
			},
			timeout: {
				connect: 5000,
				socket: 5000
			}
		});

		// examine response code
		if (response.statusCode >= 200 && response.statusCode <= 399){

			log(gray('Valid Page Response'));
			log(gray('Testing Username String'));

			if (!response.body.includes(url.test)) {
				log(green('Username Match!'));
				matches.push(url.address);
			} else {
				log(red('Could Not Validate Username'));
			}

		}
	} catch(error) {
		log(red('Response: ' + error));
	}
}



// function for writting html file
function writeHTML(matches, username) {

	// load template file
	let template = fs.readFileSync(packagePath + '/src/template.html', 'UTF8');

	// replace data
	var output = template.replace('{MATCHES}', matches)
	output = output.replace('{USERNAME}', username);

	// create file name
	let dateObj = new Date();
	let month = pad.padLeft(dateObj.getMonth(), 2, '0');
	let day = pad.padLeft(dateObj.getDate(), 2, '0');
	let year = dateObj.getFullYear();
	let hour = dateObj.getHours();
	let mins = dateObj.getMinutes();
	let sec = dateObj.getSeconds();
	let filename = username + '_' + year + month + day + hour + mins + sec + '.html';

	fs.writeFile(packagePath + '/output/' + filename, output, function (err,data) {
	  if (err) {
	    log(red(err));
	  } else {
	  	log(green('Output File Created: ' + packagePath + '/output/' + filename));
	  }
	});


}


// process url array
async function processArray(urls) {

	// wait for results
	for (const url of urls) {
		await fetchAddress(url);
	}

	// clear screen and display matches
	process.stdout.write('\033c');
	if (matches.length > 0) {

		var urldata = '';
		log(green('USRNME Found ' + matches.length + ' Matches [' + username + ']'));
	 	matches.forEach(function(url){
	 		if(url){
	 			log(gray(url));
	 			urldata = urldata + '<a href="'+url+'" target="_blank">'+url+'</a><br/>'
	 		}
	 	});
		 	
	 	// create output file?
	 	if (options.writefile) {

		 	// Write File
		 	writeHTML(urldata, username);

	 	}

	} else {

		log(red('No Matches Found for [' + username + ']'));

	}

}


// main run time
if (options.categories) {

	for (var id in categories) {
		log(green(id + ': ') + gray(categories[id]));
	}

} else {

	// check username and run
	if (typeof username !== 'undefined' && !username.includes(' ')) {


		// Build Filters
		var filters = [];
		if (options.filter) {
			var ids = options.filter.split(':');
			for (i in ids) {
				if (ids[i] > 0 && ids[i] <= Object.keys(categories).length) {
					filters.push(categories[ids[i]]);
				}
			}
		}

		// build url array for processing
		for (i in urls['urls']) {  
			var site = {}
			var thisUrl = urls['urls'][i];
			var testUrl = thisUrl['uri'].replace('[USERNAME]', username);
			site.address = testUrl;
			site.test = thisUrl['error_string'];
			if (filters.length === 0 || filters.includes(thisUrl['category'])) {
				urlArray.push(site);
			}
		}

		// clear window and run!
		process.stdout.write('\033c');
		processArray(urlArray);

	} else {
		log(red('Use -u to set a username for searching or use . -- help for more info'));
	}

}