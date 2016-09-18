/**
 * Created by erick on 26/07/16.
 */

'use strict';

angular.module('myApp.mainPage', [
	'ngRoute',
	'ui.tree'
])

	.config(['$routeProvider', '$logProvider', function($routeProvider, $logProvider) {
		$logProvider.debugEnabled(true);
		$routeProvider.when('/mainPage', {
			templateUrl: 'mainPage/mainPage.view.html',
			controller: 'mainPageCtrl',
			controllerAs: 'mainCtrl'
		});
	}])

	.controller('mainPageCtrl', ['$log', '$document', '$timeout', '$interval',function($log, $document, $timeout, $interval) {

		var _self = this;

		// Constante que armazena o tempo de execucação de cada animação
		this.ANIMATION_TIME = 3000;
		this.QUEUE = [];
		this.BOAT_FRONT = 'up';

		this.blockModel = {
			type: null,
			label: null,
			blocks: []
		};

		this.options = [
			{
				func: 'up',
				label:  'Ir para cima'
			},
			{
				func: 'left',
				label:  'Ir para a esquerda'
			},
			{
				func: 'right',
				label:  'Ir para a direita'
			},
			{
				func: 'down',
				label:  'Ir para a baixo'
			}
		];

		this.path = [
		];

		this.compileAndRun = function () {
			_self.reset();
			for (var i = 0; i < _self.path.length; ++i){
				_self.QUEUE.push(_self.path[i].func);
			}
			$interval(_self.playerController, _self.ANIMATION_TIME, _self.path.length);
		};
		
		this.reset = function () {
			var player = angular.element(document.querySelectorAll('#player'));
			_self.BOAT_FRONT = 'up';
			$(player).remove();
			player.css('top', '200px');
			player.css('left', '200px');
			player.css('animation', 'none');
			$(document.querySelectorAll('#playerWrapper')).append(player);
		};

		this.playerController = function () {
			var direction = _self.QUEUE.shift();
			$log.debug(new Date().getTime() + ' ' + direction);
			_self.turnBoat(direction);
			var player = angular.element(document.querySelectorAll('#player'));
			var top = parseInt(player.css('top').replace('px', ''));
			var left = parseInt(player.css('left').replace('px', ''));
			if (direction == 'up')
				player.css('top', (top - 100) + 'px');
			if (direction == 'down')
				player.css('top', (top + 100) + 'px');
			if (direction == 'left')
				player.css('left', (left - 100) + 'px');
			if (direction == 'right')
				player.css('left', (left + 100) + 'px');
		};

		this.turnBoat = function (direction) {
			var animation = _self.BOAT_FRONT + '-' + direction;
			var player = angular.element(document.querySelectorAll('#player'));
			player.css('animation', animation + '-animation 1s ease-in-out forwards');
			_self.BOAT_FRONT = direction;
		};

		this.calcBoatPosistion = function (x, y) {
			var map = angular.element(document.querySelectorAll('#map'));
			var player = angular.element(document.querySelectorAll('#player'));
			$log.debug(map);
			$log.debug(player);
		};

		this.init = function () {
			$log.debug('Init Main Page');
			_self.calcBoatPosistion();

			// TESTE
			 _self.path.push(_self.options[0]);
			 _self.path.push(_self.options[1]);
		};

		this.init();

	}]);