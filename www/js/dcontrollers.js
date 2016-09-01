angular.module('starter.dcontrollers', ['ionic', 'ionic-material'])


.controller('dtabsCtrl', function($scope,$state, $ionicModal, $ionicPopover, $timeout,$rootScope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    //$rootScope.hideTabsBar = false;
    $rootScope.$on('$ionicView.beforeEnter', function() {
    var stateName = $state.current.name;
    if (stateName === 'dapp.dtabs.symptify' || stateName === 'dapp.dtabs.feed' || stateName === 'dapp.dtabs.groups' || stateName === 'dapp.dtabs.notifications' ) {
      $rootScope.hideTabsBar = false;
    } else {
      $rootScope.hideTabsBar = true;
    }
      // if(stateName === 'tab.pmenu' && !$rootScope.IsLoggedIn){
      //   $state.go('login');
      // }
    });
    $scope.gosymptify = function() {
    $state.go('dapp.dtabs.symptify');
  }
  $scope.gofeed = function() {
    $state.go('dapp.dtabs.feed');
  }
  $scope.gogroups = function() {
    $state.go('dapp.dtabs.groups');
  }
  $scope.gonotification = function() {
    $state.go('dapp.dtabs.notifications');
  }
  // $scope.gopmenu = function() {
  //   $state.go('tab.pmenu');
  // }

    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function() {
    //         this.classList.toggle('active');
    //     });
    // }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
    
})


.controller('dSymptifyCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('dFeedCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('dGroupsCtrl', function($scope, $stateParams, $state,Http,$ionicLoading,$ionicModal, $ionicPopover, $timeout){

	$scope.me="Jaishriram";
  console.log("khujli");
 
    $scope.goToProfile = function(){
      console.log("hello");
      $state.go('dapp.dtabs.profile');
    };
	Http.post('getcommunities', {
      'UserID': 4
    })
    .success(function(data) {
      $scope.ResponseCode = data.Status.ResponseCode;
      $scope.ResponseMessage = data.Status.ResponseMessage;
      $ionicLoading.hide();
      if ($scope.ResponseCode == 200) {
        $scope.myCommunities = data.Status.myCommunities;
        $scope.otherCommunities = data.Status.otherCommunities;
        $scope.following = data.Status.following;
        console.dir($scope.myCommunities,$scope.following);
      } else {
        alert($scope.ResponseMessage);
      }
    }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
        $ionicLoading.hide();
      });

})

.controller('ProfileCtrl', function($scope, $stateParams,$state, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    console.log("dsds");
    // $scope.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);

    // Set Motion
    $scope.goToActivity = function(){
      $state.go('dapp.dtabs.activity');
    }
    $scope.goToMembers = function(){
      $state.go('dapp.dtabs.connections');
    }
    $scope.goToFollowers = function(){
      $state.go('dapp.dtabs.followers');
    }
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('ActivityCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    // $scope.$parent.setHeaderFab('right');
   // $rootScope.hideTabsBar = true;

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('ConnectionsCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
   // $rootScope.hideTabsBar = true;
    // Set Header
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.$parent.setHeaderFab('left');

    // Delay expansion
    // $timeout(function() {
    //     $scope.isExpanded = true;
    //     $scope.$parent.setExpanded(true);
    // }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})
.controller('FollowersCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    //$rootScope.hideTabsBar = true;
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    // $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})



.controller('dNotificationsCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})





.controller('dDashCtrl', function($scope, $stateParams, $state){

	$scope.me="Fuck";
})

