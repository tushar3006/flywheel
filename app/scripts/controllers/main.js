'use strict';

/**
 * @ngdoc function
 * @name flywheelInitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flywheelInitApp
 */

// date time picker


flywheel.controller('MainCtrl', function ($scope, $http) {
  $scope.qty = 0;

//watch for map display
  $scope.$watch('qty', function () {
    if ($scope.qty == 1) {
      initialize();

      google.maps.event.trigger(map, "resize");

      console.log("asd", document.getElementById("hangMap").style.left = null)
      console.log("asd", document.getElementById("hangMap").style.right = null)
      console.log("asd", document.getElementById("hangMap").style.right = 0)

    }
    else {
      initialize();

      console.log("asd", document.getElementById("hangMap").style.right = null)
      console.log("asd", document.getElementById("hangMap").style.right = null)
      console.log("asd", document.getElementById("hangMap").style.left = '27%')

    }
  });



// send message request @todo make service
  $scope.sendMessage = function () {

    $scope.messageObj = {};

    if($scope.isOption == 'All'){
      $scope.messageObj.auth_token = "a8b382a0-ff64-4db6-a3af-99d151e943e3" ;
      $scope.messageObj.message = $scope.messageText ;
      $scope.messageObj.broadcast_all = true;
    }
    else {
      $scope.messageObj.auth_token = "a8b382a0-ff64-4db6-a3af-99d151e943e3";
      $scope.messageObj.message = $scope.messageText;
      $scope.messageObj.lat = $scope.lat;
      $scope.messageObj.lng = $scope.lng;
      $scope.messageObj.distance = $scope.radius;
      $scope.messageObj.drivers = $scope.driverIds.join(',');
      $scope.messageObj.medallions = $scope.medallionIds;
      $scope.messageObj.broadcast_all = $scope.broadcastAll;
      $scope.messageObj.cron_string = $scope.cronString;
    }

  console.log($scope.messageObj);
    $http({
      method: 'post',
      url: 'http://mobile-acceptance.flywheel.com/regulators/1/message',
      data: $scope.messageObj,
      'headers': {
        'content-type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function (data) {
        return $.param(data);
      }
    }).then(function (response) {

      if (response.status == 200) {
        alert('message sent');
      }

    }, function () {
    });

  }

  //drivers in the array to be display added
  $scope.driverData = [];
  $scope.driverIds = [];


  //search telephone text
  $scope.add_telephone = function (selected) {
    $scope.driverData.push(selected);
    $scope.driverIds.push(selected.xid);
  };
  //search name text
  $scope.add_name = function (selected) {
    $scope.driverData.push(selected);
    $scope.driverIds.push(selected.xid);
  };
  //search name text
  $scope.add_medallions = function (selected) {
    console.log(selected);
  };



  //remove selected driver
  $scope.removeData = function (val) {
    $scope.driverData.splice(val, 1);
    $scope.driverIds.splice(val,1);
  }

 // get messages request @todo service to be made

  $scope.getMessages = function(){
    $scope.isDisplayed = 1
  $http({
    method: 'post',
    url: 'http://mobile-acceptance.flywheel.com/regulators/1/messages',
    data: {auth_token: "a8b382a0-ff64-4db6-a3af-99d151e943e3"},
    'headers': {
      'content-type': 'application/x-www-form-urlencoded'
    },
    transformRequest: function (data) {
      return $.param(data);
    }
  }).then(function (response) {
    $scope.messages = response.data.messages;

  }, function () {
  });
    };

  // get driver listing request @todo service to be made

  $http.get("http://mobile-acceptance.flywheel.com/regulators/1/drivers?auth_token=a8b382a0-ff64-4db6-a3af-99d151e943e3").then(
    function (response) {


      $scope.all_drivers = response.data.drivers;


    }, function (err) {
      console.log(err);
    }
  );

  $http.get("http://mobile-acceptance.flywheel.com/regulators/1/medallions?auth_token=a8b382a0-ff64-4db6-a3af-99d151e943e3").then(
    function (response) {
      $scope.all_drivers_medallions = response.data.medallions;
      console.log($scope.all_drivers_medallions);

    }, function (err) {
      console.log(err);
    }
  );





  $scope.isDisplayed = 3;


  $scope.$watch('val', function () {
    if ($scope.val) {

      $('#myModal').modal('show');
    }
  });


  $scope.isDisplayed = 3;

  $scope.isOption = 'All';


  //map initialization @todo as a service
  function initialize() {
    var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15,
      scrollwheel: false
    });

    // Specify location, radius and place types for your Places API search.
    var request = {
      location: pyrmont,
      radius: '500',
      types: ['store']
    };


      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // [START region_getplaces]
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        markers.forEach(function (marker) {
          marker.setMap(null);
        });

        var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              // Create a marker for each place.


              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
      });


    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.CIRCLE
        ]
      },
      markerOptions: {icon: 'images/beachflag.png'},
      circleOptions: {
        fillColor: '#f00000',
        fillOpacity: 0.2,
        strokeWeight: 1,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });

    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
      var radius = circle.getRadius();

      $scope.radius = circle.getRadius();
      $scope.lat = circle.getCenter().lat();
      $scope.lng = circle.getCenter().lng();

    });


    function setAlert() {
      alert(1232131);
    }

    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {

      alert(123);
      var triangleCoords = [
        {lat: 25.774, lng: -80.19},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757}
      ];

      var polyCoords = [];


      for (var val = 0; val < polygon.getPath().getLength(); val++) {
        var obj = {};
        obj.lat = polygon.getPath().getAt(val).lat();
        obj.lng = polygon.getPath().getAt(val).lng();
        polyCoords.push(obj);
      }

      console.log("asdasdasdasdas", polyCoords);
      console.log(google.maps.geometry.poly.containsLocation(new google.maps.LatLng(-33.86275419443827, 151.19054317474365), polygon));
      //lat: -33.86275419443827
      //lng: 151.19062900543213

    });


  }


  google.maps.event.addListener(map, 'click', function (event) {
    this.setOptions({scrollwheel: true});
  });
// Run the initialize function when the window has finished loading.





});
