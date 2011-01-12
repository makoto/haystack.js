# haystack.js

Needle in a haystack

## Bookmarklet (Not working yet)

Drag this to your bookmark toolbar.

- <a href="javascript:(function() {
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = 'https://github.com/makoto/haystack.js/raw/master/dist/haystack-0.0.1.min.js';
   document.getElementsByTagName('body')[0].appendChild(script)
 })();" title="Haystack">Haystack Bookmarklet</a>

 - [Haystack Bookmarklet2]("javascript:(function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://github.com/makoto/haystack.js/raw/master/dist/haystack-0.0.1.min.js';
    document.getElementsByTagName('body')[0].appendChild(script)
  })();")


- [test link to google]("http://www.google.com")

## Usage

### Basic Use

    match_test.key("name")                    // match_test.any(function(k,v){return k == "name"})

    match_test.val("foo")                     // match_test.any(function(k,v){return v == "foo" })
    match_test.all("1")                       // match_test.any(function(k,v){return k == 1 || v == 1})

### Advanced Use

    match_test.any(function(k,v){return k == "name" && v == "bob"}) 
    match_test.any(function(k,v){return k.match(/age/i)})
    match_test.any(function(k,v){return k > 3})
