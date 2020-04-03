# usrnme

[![Build Status](https://travis-ci.com/tylerdevs/usrnme.svg?branch=master)](https://travis-ci.com/tylerdevs/usrnme) [![dependencies Status](https://david-dm.org/tylerdevs/usrnme/status.svg)](https://david-dm.org/tylerdevs/usrnme) [![devDependencies Status](https://david-dm.org/tylerdevs/usrnme/dev-status.svg)](https://david-dm.org/tylerdevs/usrnme?type=dev) [![Vulns](https://snyk.io/test/github/tylerdevs/usrnme/badge.svg)](https://snyk.io/test/github/tylerdevs/usrnme) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**usrnme is an OSINT username search tool built on Node.js**
Quickly and easily check hundreds of websites to see if an account exists for a given username.

# Features

* **Extensive List** - usrnme comes with a wide arrange of websites ready to search, fully categorized.
* **CLI Application** - usrnme is a fully featured command line application for node that can be installed in seconds.
* **High Speed** - usrnme is built for speed, check hundreds of websites in minutes. *A real skookum choocher.*
* **Category Filtering** - Define what types of websites usrnme should check when searching.
* **HTML Output** - usrnme can built a HTML output file of matched links for easy browsing of results.

# Install

```
$ npm install usrnme -g
```

# Usage

usrnme only needs the -u arg set to run. By default it will run a search on all websites and print the results to screen. There are also a number of options you can use to fine tune usrnme:
```
$ usrnme --help

Usage: -u <username>

Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  -u, --username    Username to search                                  [string]
  -f, --filter      List of categories to focus search on               [string]
  -c, --categories  Display list of categories                         [boolean]
  -w, --writefile   Output matches to HTML file                        [boolean]
```

### Filters And Categories

To use the filter option, simply enter the category numbers to use separated by a colon:
```
// search for username 'tylerdevs' in categories 1 and 10
$ usrnme -u tylerdevs -f 1:10
```
To output the category list:
```
$ usrnme -c
1: Social Media
2: Messaging Apps
3: Forums
4: Dating Sites
5: Marketplaces
6: Gaming
7: Anime Manga Cosplay
8: Arts & Crafts
9: Music
10: Coding & Hacking
11: Adult
12: Other
13: Payment Apps
14: Movies
```

### HTML Output File

usrnme can generate an HTML file that allows for easy browsing of any matches found during the search process. The output file will be placed in the /output/ folder.

- Naming convention: username_timstamp.html
- To enable HTML output just add the -w arg when calling usrnme:

```
$ usrnme -u tylerdevs -f 10 -w
```

# URL List And Feature Requests

- The URL list is managed in a database and is constantly being updated to account for changes in web sites, and any adjustments that may need to be made to the test strings.

- I try to test as regularly as possible for false positive matches, errors etc. but as the list grows it can be time consuming to track them all down. That being said the list is fairly accurate at the moment. **If you notice a false positive match please let me know.**
- I am going to be regularly pushing updates to the JSON file included in usrnme. If you have URLs or websites you would like added or other requests, let me know ;)

# License

MIT © Tyler Colwell 