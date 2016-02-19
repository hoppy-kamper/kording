"use strict";angular.module("kordingApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("kordingApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],this.scaleImages=[{src:"/images/CMajor.2283ebbf.png",name:"C Major"},{src:"/images/d-major.4aa4536e.png",name:"D Major"}]}),angular.module("kordingApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>Wanna Kord?</h1> <p class="lead"> <img class="logo" src="images/kording-logo.457caec0.png" alt="kording"> <br> I bet I can find it for you. </p> </div> <a ng-repeat="scale in main.scaleImages" ng-click="main.selected=scale" class="btn btn-lg btn-default" ng-href="#/">{{scale.name}}</a> <h3>{{main.selected.name}}</h3> <img ng-src="{{main.selected.src}}" ng-alt="{{main.selected.name}}"> <!-- <img ng-src="{{scaleImages}}"> -->')}]);