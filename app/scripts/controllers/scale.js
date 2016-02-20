'use strict';

/**
 * @ngdoc function
 * @name kordingApp.controller:ScaleCtrl
 * @description
 * # ScaleCtrl
 * Controller of the kordingApp
 */
angular.module('kordingApp')
    .controller('ScaleCtrl', function() {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        this.scales = [{
            'src': 'images/CMajor.png',
            'tonic': 'C',
            'mode': 'Major'
        }, {
            'src': 'images/d-major.png',
            'tonic': 'D',
            'mode': 'Major'
        }];
    });
