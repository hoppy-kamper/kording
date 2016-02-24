"use strict";angular.module("kordingApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/scale",{templateUrl:"views/scale.html",controller:"ScaleCtrl",controllerAs:"scale"}).otherwise({redirectTo:"/"})}]),angular.module("kordingApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").controller("ScaleCtrl",["vexScale",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],this.tonics=["C","D","Db","E","F#","F","G","Ab","A","Bb","B"],this.scaleTypes=teoria.Scale.KNOWN_SCALES,this.defaultOctave="4",this.selected={tonic:"c",scaleType:"major"},this.genVexScale=function(b,c,d){for(var e={tonic:c,notes:[],scaleType:d,accSpec:{acc:null,num:0}},f=teoria.scale(c+this.defaultOctave,d).notes(),g=0;g<f.length;g++){var h=f[g];e.notes.push(h.name()+h.accidental()+"/"+h.octave()),h.accidental()&&(e.accSpec.acc||(e.accSpec.acc=h.accidental()),e.accSpec.num++)}var i=e.notes[0],j=i.split("/")[0]+"/"+(parseInt(i.substr(-1))+1).toString();e.notes.push(j),a(b,e)}}]),angular.module("kordingApp").factory("vexScale",function(){var a="q",b=function(a){var b=Vex.Flow.keySignature.keySpecs;for(var c in b){var d=b[c];if(d.acc===a.acc&&d.num===a.num)return c}throw new Vex.RERR("BadArguments","Failed to find a KeySpec with the same number and type of accidentals.")};return function(c,d){var e=c.width-50,f=new Vex.Flow.Renderer(c,Vex.Flow.Renderer.Backends.CANVAS),g=f.getContext();g.clearRect(0,0,c.width,c.height);var h=new Vex.Flow.Stave(10,0,e);h.setContext(g),h.addClef("treble"),h.addKeySignature(b(d.accSpec)),h.setEndBarType(Vex.Flow.Barline.type.SINGLE);for(var i=[],j=0;j<d.notes.length;j++)i.push(new Vex.Flow.StaveNote({keys:[d.notes[j]],duration:a}));var k=new Vex.Flow.Voice({num_beats:d.notes.length,beat_value:4,resolution:Vex.Flow.RESOLUTION});k.addTickables(i);var l=new Vex.Flow.Formatter;l.joinVoices([k]),l.format([k],e),l.formatToStave([k],h),h.draw(),k.draw(g,h)}}),angular.module("kordingApp").directive("korScale",function(){return{restrict:"E",link:function(a,b){var c=document.createElement("canvas");c.height=100,window.innerWidth<650?c.width=window.innerWidth:c.width=650,b[0].appendChild(c),a.$watch("scale.selected",function(){a.scale.genVexScale(c,a.scale.selected.tonic,a.scale.selected.scaleType)},!0)}}}),angular.module("kordingApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>Wanna Kord?</h1> <p class="lead"> <img class="img-responsive logo" src="images/kording-logo.457caec0.png" alt="kording"> <br> I bet I can find it for you. </p> </div> <div ng-controller="ScaleCtrl as scale" ng-include="\'views/scale.html\'"></div>'),a.put("views/scale.html",'<div class="btn-group"> <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {{scale.selected.tonic }} <span class="caret"></span> </button> <ul class="dropdown-menu"> <li ng-repeat="tonic in scale.tonics" ng-click="scale.selected.tonic=tonic"><a ng-href="">{{tonic}}</a></li> </ul> </div> <div class="btn-group"> <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {{scale.selected.scaleType }} <span class="caret"></span> </button> <ul class="dropdown-menu"> <li ng-repeat="scaleType in scale.scaleTypes" ng-click="scale.selected.scaleType=scaleType"><a ng-href="">{{scaleType}}</a></li> </ul> </div> <img class="img-responsive" ng-src="{{scale.selected.src}}" ng-alt="{{scale.selected.tonic}}"> <kor-scale class="img-responsive"></kor-scale>')}]);