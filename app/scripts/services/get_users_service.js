yelo.service('getUsers',function($http){

this.get = function(){

  var val = $http({
    method: 'post',
    url: 'http://192.168.1.216:8081/getUser',
      'headers': {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {

    return response;

  }, function () {
  });

return val;
}

});

