var app = angular.module('app', ['truncate']);

function MainCtrl($scope) {
  $scope.load = function() {
    $scope.logs = [];
    var start = Date.parse($('#picker').val()); // Convert to unix time
    var end = new Date(Date.parse($('#picker').val()) + 86400000).getTime(); // Convert to unix time and add a day
    chrome.storage.local.get(function(x) {
      for (var key in x) {
        if (key > start && key < end) { 
          $scope.logs.push([key, x[key].split('^~^')]);
        }
      }
      $scope.$apply();
    });
  }

  chrome.storage.local.getBytesInUse(function(x) {
    $scope.usageMB = (x / 1048576 + '').substring(0, 5);
    $scope.$apply();
  });
}

function get() {
  chrome.storage.local.get(function(x) {
    console.log('popup', x);
    for (var key in x) {
      var val = x[key];
      var textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.value = val;
      document.body.appendChild(textbox);
    }
  })
}