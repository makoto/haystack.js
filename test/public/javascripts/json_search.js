JsonSearch = (function () {

  var equal = function(keyword, string){
    return keyword == string;
  };

  var match = function(keyword, string){
    return string.match(keyword);
  };

  var append = function(body, value){
    return body + '["' + value + '"]';
  };

  var search = function(collection, result){
    for (var i in collection){
      // if (selection(keyword, query.key ? i : collection[i])) {
      if (selection(keyword, collection[i])) {
        results.push(append(result, i));
      };
      if (typeof(collection[i]) == "object") {
        search(collection[i], append(result, i));
      };
    };
  };

  var klass = function(list){
    this.list = list;
  }

  klass.prototype.val = function(keyword, query){
    var query = query ? query : {};
    var results = [];
    var selection = query.match ? match : equal;

    var search = function(collection, result){
      for (var i in collection){
        // if (selection(keyword, query.key ? i : collection[i])) {
        if (selection(keyword, collection[i])) {
          results.push(append(result, i));
        };
        if (typeof(collection[i]) == "object") {
          search(collection[i], append(result, i));
        };
      };
    };

    search(this.list, "");
    console && console.log("RESULT: " + results);
    return results;
  };

  klass.prototype.key = function(keyword, query){
    var query = query ? query : {};
    var results = [];
    var selection = query.match ? match : equal;

    var search = function(collection, result){
      for (var i in collection){
        // if (selection(keyword, query.key ? i : collection[i])) {
        if (selection(keyword, i)) {
          results.push(append(result, i));
        };
        if (typeof(collection[i]) == "object") {
          search(collection[i], append(result, i));
        };
      };
    };

    search(this.list, "");
    console && console.log("RESULT: " + results);
    return results;
  };

  return klass;
})();
