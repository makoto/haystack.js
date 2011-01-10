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


  // var search = function(collection, result, keyword, target){
  //   for (var i in collection){
  //     console.log(target);
  //     if (selection(keyword, target == "key" ? i : collection[i])) {
  //       results.push(append(result, i));
  //     };
  //     if (typeof(collection[i]) == "object") {
  //       search(collection[i], append(result, i), keyword, target);
  //     };
  //   };
  // };

  function search(searchFunction, collection, prefix){
    prefix = prefix || "";
    var results = [];
    for(var key in collection){
      var value = collection[key];
      if(typeof value == 'object'){
        results = results.concat(search(searchFunction, value, prefix + '["' + key + '"]'));
      } else {
        if(searchFunction(key, value)) results.push(prefix + '["' + key + '"]');
      }
    }
    return results;
  }


  var klass = function(list){
    this.list = list;
  }

  // klass.prototype.val = function(keyword, query){
  //   var query = query ? query : {};
  //   var results = [];
  //   var selection = query.match ? match : equal;
  // 
  //   search(this.list, "", keyword, "value");
  //   console && console.log("RESULT: " + results);
  //   return results;
  // };

  // klass.prototype.key = function(keyword, query){
  //   var query = query ? query : {};
  //   var results = [];
  //   var selection = query.match ? match : equal;
  // 
  //   search(this.list, "", keyword, "key");
  //   console && console.log("RESULT: " + results);
  //   return results;
  // };
  
  klass.prototype.key = function(kee, query){
    var query = query ? query : {};
    var equal = function(k, v){ return k == kee};
    var match = function(k, v){ return k.match(kee)};
    r = search(function(k, v){ return k == kee} , this.list);
    console && console.log("RESULT: " + r);
    return r;
  };

  klass.prototype.val = function(kee, query){
    var query = query ? query : {};
    var equal = function(k, v){ return v == kee};
    var match = function(k, v){ return v.match(kee)};
    var select = query.match ? match : equal;
    r = search(select, this.list);
    console && console.log("RESULT: " + r);
    return r;
  };
  return klass;
})();

//        // Thing to search for
// search(function(key, value){ return key == "lard" },   collection)
// 
// function search(searchFunction, collection, prefix){
//   prefix = prefix || "";
//   var results = [];
//   for(var key in collection){
//     var value = collection[key];
//     if(typeof value == 'object'){
//       results = results.concat(search(searchFunction, value, prefix + '[' + key + ']'));
//     } else {
//       if(searchFunction(key, value)) results.push(prefix + '[' + key + ']');
//     }
//   }
//   return results;
// }
// 
// function key(kee){
//   search(function(k, v){ return k == kee}), collection);
// }
// 


