const test = require('tape');
const validator = require('jsonschema').Validator;
const fs = require('fs');


test('Test URL JSON File', function (t) {

  const result = true;

  // load urls from json file
  let json_data = fs.readFileSync('./src/urls.json');
  let json = JSON.parse(json_data);
  var v = new validator();

  // validation schema
  var schema = {
    "urls": {
        "uri": { "type": "string" },
        "error_string": { "type": "string" },
        "cateogry": { "type": "string" },
    }
  }

  // test it
  var test = v.validate(json, schema);
  if (test.errors.length > 0) {
    result = false;
  }

  // tape
  const expected = 0;
  t.ok(result);
  t.deepEqual(test.errors.length, expected);
  t.end();

});
