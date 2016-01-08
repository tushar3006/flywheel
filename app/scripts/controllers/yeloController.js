


yelo.controller('yeloMainCtrl',function($http,$scope,$rootScope,getUsers){


  function MyCtrl($q, DTOptionsBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionBuilder.newOptions()
      .withOptions('autoWidth', fnThatReturnsAPromise);

    function fnThatReturnsAPromise() {
      var defer = $q.defer();
      defer.resolve(false);
      return defer.promise;
    }
  }

  getUsers.get().then(
    function(response){

      $scope.all_users = response.data;


    },
    function(){
      console.log('err');
    }
  )


  $scope.selected_user = function (selected) {
   console.log(selected);
  };



})
