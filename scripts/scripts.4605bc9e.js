"use strict";angular.module("kordingApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/scale",{templateUrl:"views/scale.html",controller:"ScaleCtrl",controllerAs:"scale"}).otherwise({redirectTo:"/"})}]),angular.module("kordingApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").controller("ScaleCtrl",["vexScale",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],this.tonics=["C","D","Db","E","F#","F","G","Ab","A","Bb","B"],this.scaleTypes=teoria.Scale.KNOWN_SCALES,this.defaultOctave="4",this.selected={tonic:"c",scaleType:"major"},this.genVexScale=function(b,c,d){for(var e={tonic:c,notes:[],scaleType:d,accSpec:{acc:null,num:0}},f=teoria.scale(c+this.defaultOctave,d).notes(),g=0;g<f.length;g++){var h=f[g];e.notes.push(h.name()+h.accidental()+"/"+h.octave()),h.accidental()&&(e.accSpec.acc||(e.accSpec.acc=h.accidental()),e.accSpec.num++)}a(b,e)}}]),angular.module("kordingApp").factory("vexScale",function(){var a="q",b=function(a){var b=Vex.Flow.keySignature.keySpecs;for(var c in b){var d=b[c];if(d.acc===a.acc&&d.num===a.num)return c}throw new Vex.RERR("BadArguments","Failed to find a KeySpec with the same number and type of accidentals.")};return function(c,d){var e=new Vex.Flow.Renderer(c,Vex.Flow.Renderer.Backends.CANVAS),f=e.getContext();f.clearRect(0,0,c.width,c.height);var g=new Vex.Flow.Stave(10,0,500);g.setContext(f),g.addClef("treble"),g.addKeySignature(b(d.accSpec)),g.draw();for(var h=[],i=0;i<d.notes.length;i++)h.push(new Vex.Flow.StaveNote({keys:[d.notes[i]],duration:a}));var j=new Vex.Flow.Voice({num_beats:d.notes.length,beat_value:4,resolution:Vex.Flow.RESOLUTION});j.addTickables(h),(new Vex.Flow.Formatter).joinVoices([j]).format([j],500),j.draw(f,g)}}),angular.module("kordingApp").directive("korScale",function(){return{restrict:"A",link:function(a,b){var c=b[0];c.width=700,c.height=100,a.$watch("scale.selected",function(){a.scale.genVexScale(c,a.scale.selected.tonic,a.scale.selected.scaleType)},!0)}}}),angular.module("kordingApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>Wanna Kord?</h1> <p class="lead"> <img class="img-responsive logo" src="images/kording-logo.457caec0.png" alt="kording"> <br> I bet I can find it for you. </p> </div> <div ng-controller="ScaleCtrl as scale" ng-include="\'views/scale.html\'"></div>'),a.put("views/scale.html",'<div class="btn-group"> <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {{scale.selected.tonic }} <span class="caret"></span> </button> <ul class="dropdown-menu"> <li ng-repeat="tonic in scale.tonics" ng-click="scale.selected.tonic=tonic"><a ng-href="">{{tonic}}</a></li> </ul> </div> <div class="btn-group"> <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {{scale.selected.scaleType }} <span class="caret"></span> </button> <ul class="dropdown-menu"> <li ng-repeat="scaleType in scale.scaleTypes" ng-click="scale.selected.scaleType=scaleType"><a ng-href="">{{scaleType}}</a></li> </ul> </div> <h3>{{scale.selected.tonic}} {{scale.selected.scaleType}}</h3> <img class="img-responsive" ng-src="{{scale.selected.src}}" ng-alt="{{scale.selected.tonic}}"> <!-- <img ng-src="{{scaleImages}}"> --> <h3>Lets get our VexFlow on</h3> <canvas kor-scale></canvas>')}]);