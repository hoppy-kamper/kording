"use strict";angular.module("kordingApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial"]).config(["$routeProvider","$mdThemingProvider","$mdIconProvider",function(a,b,c){a.when("/scale",{templateUrl:"views/scale.html",controller:"ScaleCtrl",controllerAs:"scale"}).otherwise({redirectTo:"/scale"}),b.theme("default").primaryPalette("deep-purple").accentPalette("deep-orange"),c.defaultIconSet("img/icons/sets/core-icons.svg",24)}]),angular.module("kordingApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("kordingApp").controller("ScaleCtrl",["vexScale",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],this.tonics=["C","D","E","F","G","A","B"],this.accidentals=[{name:"natural",value:""},{name:"sharp",value:"#"},{name:"flat",value:"b"}],this.scaleTypes=teoria.Scale.KNOWN_SCALES,this.defaultOctave="4",this.selected={tonic:"C",accidental:"",scaleType:"major"},this.setTonic=function(a){this.selected.tonic=a},this.isTonic=function(a){return this.selected.tonic===a},this.setAccidental=function(a){this.selected.accidental=a},this.isAccidental=function(a){return this.selected.accidental===a.value},this.setScaleType=function(a){this.selected.scaleType=a},this.isScaleType=function(a){return this.selected.scaleType===a},this.genVexScale=function(b,c,d,e){for(var f={tonic:c,notes:[],scaleType:e,accSpec:{acc:null,num:0}},g=teoria.scale(c+d+this.defaultOctave,e).notes(),h=0;h<g.length;h++){var i=g[h];f.notes.push(i.name()+i.accidental()+"/"+i.octave()),i.accidental()&&(f.accSpec.acc||(f.accSpec.acc=i.accidental()),f.accSpec.num++)}var j=f.notes[0],k=j.split("/")[0]+"/"+(parseInt(j.substr(-1))+1).toString();f.notes.push(k),a(b,f)}}]),angular.module("kordingApp").factory("vexScale",function(){var a="q",b=function(a){var b=Vex.Flow.keySignature.keySpecs;for(var c in b){var d=b[c];if(d.acc===a.acc&&d.num===a.num)return c}throw new Vex.RERR("BadArguments","Failed to find a KeySpec with the same number and type of accidentals.")};return function(c,d){var e=c.width-50,f=new Vex.Flow.Renderer(c,Vex.Flow.Renderer.Backends.CANVAS),g=f.getContext();g.clearRect(0,0,c.width,c.height);var h=new Vex.Flow.Stave(10,0,e);h.setContext(g),h.addClef("treble"),h.addKeySignature(b(d.accSpec)),h.setEndBarType(Vex.Flow.Barline.type.SINGLE);for(var i=[],j=0;j<d.notes.length;j++)i.push(new Vex.Flow.StaveNote({keys:[d.notes[j]],duration:a}));var k=new Vex.Flow.Voice({num_beats:d.notes.length,beat_value:4,resolution:Vex.Flow.RESOLUTION});k.addTickables(i);var l=new Vex.Flow.Formatter;l.joinVoices([k]),l.format([k],e),l.formatToStave([k],h),h.draw(),k.draw(g,h)}}),angular.module("kordingApp").directive("korScale",function(){return{restrict:"E",link:function(a,b){var c=document.createElement("canvas");c.height=100,window.innerWidth<650?c.width=window.innerWidth:c.width=650,b[0].appendChild(c),a.$watch("scale.selected",function(){a.scale.genVexScale(c,a.scale.selected.tonic,a.scale.selected.accidental,a.scale.selected.scaleType)},!0)}}}),angular.module("kordingApp").controller("SidenavCtrl",["$mdSidenav",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],this.openLeftMenu=function(){a("left").toggle()},this.closeLeftMenu=function(){a("left").toggle()}}]),angular.module("kordingApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div layout="column" layout-align="space-between center"> <h1 class="md-display-3">Wanna Kord? </h1> <img class="logo" src="images/kording-logo.457caec0.png" alt="kording"> <p class="md-subhead">I bet I can find it for you.</p> </div>'),a.put("views/picker.html",'<div layout="row" layout-wrap layout-margin> <md-toolbar layout="row" layout-wrap> <md-button ng-repeat="tonic in scale.tonics" ng-class="{\'md-raised\' : scale.isTonic(tonic)}" ng-click="scale.setTonic(tonic)">{{tonic}}</md-button> </md-toolbar> <md-toolbar layout="row"> <md-button class="md-accent" flex="20" ng-repeat="accidental in scale.accidentals" ng-class="{\'md-raised\' : scale.isAccidental(accidental)}" ng-click="scale.setAccidental(accidental.value)">{{accidental.name}}</md-button> </md-toolbar> <md-toolbar layout="row" layout-wrap> <md-button ng-repeat="scaleType in scale.scaleTypes" ng-class="{\'md-raised\' : scale.isScaleType(scaleType)}" ng-click="scale.setScaleType(scaleType)">{{scaleType}}</md-button> </md-toolbar> </div>'),a.put("views/scale.html",'<div layout="row" layout-align="center center"> <div layout="column"> <ng-include src="\'views/picker.html\'"></ng-include> <div layout="row" layout-align="center center"> <md-whiteframe class="md-whiteframe-12dp" layout-margin layout-align="center center"> <div class="page-container"> <div class="page"> <h1>{{scale.selected.tonic}}{{scale.selected.accidental}} {{scale.selected.scaleType}}</h1> </div> <kor-scale layout-align="center center"></kor-scale> </div> </md-whiteframe> </div> </div> </div>'),a.put("views/sidenav.html",'<div ng-controller="SidenavCtrl as nav"> <div md-swipe-left="nav.closeLeftMenu()"> <md-button class="md-icon-button" ng-click="nav.openLeftMenu()" md-swipe-right="nav.openLeftMenu()"> <i class="material-icons">menu</i> </md-button> <md-sidenav md-component-id="left" class="md-sidenav-left"> <md-toolbar class="md-primary"> <span> <img src="images/kording-logo.457caec0.png" class="logo" alt="kording" style="height: 50px; width: auto"> Kording </span> </md-toolbar> <md-content> <md-list ng-click="nav.closeLeftMenu()"> <md-list-item> <md-button ng-href="/#/" class="md-hue-2">Home</md-button> </md-list-item> <md-divider ng-if="!$last"></md-divider> <md-list-item> <md-button ng-href="/#/scale" class="md-hue-3">Scale</md-button> </md-list-item> </md-list> </md-content> </md-sidenav> </div> </div>')}]);