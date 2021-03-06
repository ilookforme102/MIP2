angular.module('someklone.controllers', [])

  .controller('HomeCtrl', function ($scope, Posts) {

    $scope.likeAdd = function (post) {
      post.isLiked = !post.isLiked;
      if(post.isLiked)
      {
        post.likes++;
      }
        else
      {
        post.likes--;
      }

    }
    Posts.following().then(function (data) {
        $scope.posts = data;
      }
    );

    $scope.newComment = {
      show: false,
      id: 0,
      user: {
        id: 0,
        username: "Sang Cao"
      },
      comment: "",
      userRefs: [],
      tags: [""]
    };

      $scope.pushComment = function (comments) {
      comments.push($scope.newComment);
        $scope.newComment= {
          show: false,
          id: 0,
          user: {
            id: 0,
            username: "Sang Cao"
          },
          comment:"",
          userRefs: [],
          tags: [""]
        };
    };

  })

  .controller('BrowseCtrl', function ($scope, $state) {

    $scope.activateSearch = function () {
      $state.go('tab.browse-search');
    }

    $scope.browseDetail = function (id) {
      $state.go('tab.browse-detail', {id: id});
    }

  })

  .controller('BrowseDetailCtrl', function ($scope, $stateParams) {
    console.log($stateParams);
  })

  .controller('SearchCtrl', function ($scope, $state, $ionicHistory, Users) {

    $scope.input = {
      searchText: ""
    };

    $scope.searchResults = {
      people: [],
      tags: []
    }

    $scope.tabs = {
      people: true,
      tags: false
    }

    $scope.goBack = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.go('tab.browse');
    }

    $scope.emptySearch = function () {
      $scope.input.searchText = "";
    }

    $scope.tabActivate = function (tab) {
      for (var k in $scope.tabs) {
        if ($scope.tabs.hasOwnProperty(k)) {
          $scope.tabs[k] = false;
        }
      }
      $scope.tabs[tab] = true;
    }

    $scope.updateSearch = function () {
      if ($scope.tabs.people == true) {
        Users.searchUser($scope.input.searchText).then(function (result) {
          $scope.searchResults.people = result;
        });
      }
      else // search for posts with tags
      {

      }
    }


  })

  .controller('PostCtrl', function ($scope,$rootScope, $state, $cordovaCamera, Posts) {
    $scope.takePicture = function(){

      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {

        $rootScope.image = imageData;

      }, function(err) {
        // error
      });
    }

    $scope.choosePicture = function(){

      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {

        $rootScope.image = imageData;

      }, function(err) {
        // error
      });
    }
    $scope.sharePic = {
      id: 0,
      like: false,
      user: {
        id: 1,
        username: "dtrump",
        profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
      },
      image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
      imageThumbnail: $rootScope.image,
      likes: 200,
      caption: "Always winning #elections",
      tags: ['elections'],
      comments: [
        { show: false,
          id: 0,
          user: {
            id: 2,
            username: "POTUS"
          },
          comment: "You're never going to make it don #losing",
          userRefs: [],
          tags: ["losing"]
        },
        { show: false,
          id: 1,
          user: {
            id: 3,
            username: "HillaryC"
          },
          comment: "Damn right @POTUS",
          userRefs: ["POTUS"],
          tags: []
        },
      ]

    },
    Posts.following().then(function (data) {
        $scope.sharePics = data;
      }
    )
    $scope.sharePicture = function (sharepic) {
      $scope.sharePic = sharepic  ;
      $scope.sharePics.push(sharepic);

    }

    $scope.goBack = function () {

      $state.go('tab.home');
    }

  /*
    $scope.tabs = {
      gallery: true,
      photo: false
    }

    $scope.goBack = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('tab.home');
    }

    $scope.photo = function () {
      $scope.tabs.photo = true;
      $scope.tabs.gallery = false;

      // activate camera
    }
    $scope.takePicture = function (options) {

      var options = {
        quality: 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 1
      };

      Camera.getPicture(options).then(function (imageData) {
        $scope.picture = imageData;
        ;
      }, function (err) {
        console.log(err);
      });

    };

    $scope.gallery = function () {
      $scope.tabs.photo = false;
      $scope.tabs.gallery = true;

      // fetch photos
    }

    $scope.confimPost = function () {
      $state.go('post-confirm');
    }
*/
  })
/*
  .controller('PostConfirmCtrl', function ($scope, $state, $ionicHistory) {
    $scope.goBack = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('post');
    }

    $scope.sharePost = function () {
      console.log("not implemented yet");
    }
  })
*/
  .controller('ActivityCtrl', function ($scope, Users) {
    $scope.activity = Users.getActiveUserActivity();
  })

  .controller('AccountCtrl', function ($scope, Users, Posts) {
    $scope.userData = Users.getActiveUser();

    Posts.getUserPosts($scope.userData.id).then(function (results) {
      $scope.posts = results;
    });

  });
