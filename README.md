# haystack.js

Needle in a haystack

## What is this?

I find that deeply nested JSON is hard to examine. I wanted something similar to browser inspector for JSON where you give either key or value (or both) of json and it tells you the full path.

## Bookmarklet

For chrome, go to "Bookmarks Bar", right click to select "Add Page", and add the following javascript.

    javascript:(function() {
       var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = 'https://github.com/makoto/haystack.js/raw/master/dist/haystack-0.0.1.min.js';
       document.getElementsByTagName('body')[0].appendChild(script)
    })();

## Usage

When you go to the page where you want to examine the json, click the bookmarklet. This will load up "Haystack" and "H" functions.

### Example

Let's say you have this kind of json object

    var json = [
      {a:"A"},
      {b:"B"},
      {c:{
        name:"bob",
        age:10
      }},
      {d:{
        name:"mark",
        age:10,
        alphabet:"a",
        hage: true
      }}
    ];

### Instantiate

    hs = new Haystack(json)

### Basic Use

Search by Key

    hs.val(10)               // ['["2"]["c"]["age"]', '["3"]["d"]["age"]']
    

Search by Value

    hs.key("a")              // ["["0"]["a"]"]

Search either by Key or Value

    hs.all("a")              // ["["0"]["a"]", "["3"]["d"]["alphabet"]"]


### Advanced Use

"any" takes a function and you can define various search conditions

Search where key is "name" and value is "bob"

    hs.any(function(k,v){return k == "name" && v == "bob"}) // ["["2"]["c"]["name"]"]
    

Search where key matches "age"

    hs.any(function(k,v){return k.match(/age/i)}) // ["["2"]["c"]["age"]", "["3"]["d"]["age"]", "["3"]["d"]["hage"]"]


Search where key is greater than 3

    hs.any(function(k,v){return k > 3}) // ["["2"]["c"]["age"]", "["3"]["d"]["age"]"]

### For impatient people

No need to instantiate HayStack

    H(json).val(10) // ['["2"]["c"]["age"]', '["3"]["d"]["age"]']

## Todo list

- Visualise tree of the selected object.
- Is it good idea if this works for any dom element? At this moment, it causes stack overflow.
- If dom search is good idea, add limit of how deep it searches to avoid stack overflow.
- Anything else I should add?

## Hacking guide

Make sure if you have ruby and [bundler](http://gembundler.com/) installed

    git clone git@github.com:makoto/haystack.js.git
    cd haystack.js
    bundle install
    rake test
    # Go to http://localhost:4567/ to make sure that tests all pass

## Credits

- [olivernn](https://github.com/markevans) for brainstorming the initial idea.
- [markevans](https://github.com/markevans) for reviewing code, refactoring the code and coming up with this  wonderful name.
- [benpickles](https://github.com/benpickles) for tests and minification frameworks. They are mostly taken from [js-model](https://github.com/benpickles/js-model).
- [Qunit](http://docs.jquery.com/Qunit) for tests.

## License

Inside haystack.js file
