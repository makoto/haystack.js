/*  haystack.js Needle in a haystack, version 0.0.2
 *  (c) 2011 Makoto Inoue
 *
 *  Released under MIT license.
 */
Haystack = (function () {
  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  var search = function(searchFunction, collection, prefix){
    var prefix = prefix || "";
    var results = [];
    for(var key in collection){
      var value = collection[key];
      if(searchFunction(key, value)) {
        results.push(append(prefix, key));
      }
      if(typeof value == 'object'){
        results = results.concat(search(searchFunction, value, append(prefix, key)));
      };
    }
    console && console.log("RESULT: " + results);
    return results;
  }

  var klass = function(list){
    this.list = list;
  }

  klass.prototype.key = function(key){
    return search(function(k, v){ return k == key}, this.list)
  };

  klass.prototype.val = function(key){
    return search(function(k, v){ return v == key}, this.list)
  };

  klass.prototype.all = function(key){
    return search(function(k, v){ return (v == key || k == key)}, this.list)
  };

  klass.prototype.any = function(matcher){
    return search(matcher, this.list)
  };

  klass.prototype.reg = function(reg){
    return search(function(k, v){
      if(typeof(value) == 'string'){
        result = k.match(reg) || v.match(reg)
      }else{
        result = k.match(reg)
      }
      return result
    }, this.list)
  };
  return klass;
})();

H = function(obj){ return new Haystack(obj) };