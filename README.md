# haystack.js

Needle in a haystack

## What is this?

I find it nested JSON hard to examine. I wanted something similar to browser inspector for JSON where you give either key or value of json and it tells you the full path.



## Bookmarklet

For chrome, go to "Bookmarks Bar", right click to select "Add Page", and add the following javascript.

    javascript:(function() {
       var script = document.createElement('script');
       script.type = 'text/javascript';
       script.src = 'https://github.com/makoto/haystack.js/raw/master/dist/haystack-0.0.1.min.js';
       document.getElementsByTagName('body')[0].appendChild(script)
    })();


## Usage

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

"any" takes an function and you can define various condition for the search

Search where key is "name" and value is "bob"

    hs.any(function(k,v){return k == "name" && v == "bob"}) // ["["2"]["c"]["name"]"]
    

Search where key matches "age"

    hs.any(function(k,v){return k.match(/age/i)}) // ["["2"]["c"]["age"]", "["3"]["d"]["age"]", "["3"]["d"]["hage"]"]


Search where key is greater than 3

    hs.any(function(k,v){return k > 3}) // ["["2"]["c"]["age"]", "["3"]["d"]["age"]"]

### For inpatients

No need to instantiate HayStack

    H(json).val(10) // ['["2"]["c"]["age"]', '["3"]["d"]["age"]']

