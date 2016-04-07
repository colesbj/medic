
// Load the AutoMedic module
angular.module('autoMedic', [
  'ui.router',
  'ngAnimate',
  'btford.socket-io',
  'mdo-angular-cryptography',
  'ui.bootstrap',
  'angular-virtual-keyboard',
  'ds.clock',
  'ngSanitize',
  'weatherModule',
  'angular-confirm'
])
.config(['VKI_CONFIG', function(VKI_CONFIG) {
			VKI_CONFIG.layout.Numerico = {
				'name': "Numerico", 'keys': [
				[["1", '1'], ["2", "2"], ["3", "3"], ["Bksp", "Bksp"]],
				[["4", "4"], ["5", "5"], ["6", '6'], ["Enter", "Enter"]],
				[["7", "7"], ["8", "8"], ["9", "9"], []],
				[["0", "0"], ["-"], ["+"], [","]]
			], 'lang': ["pt-BR-num"] };

			VKI_CONFIG.deadkeysOn = false;
			VKI_CONFIG.size = 4;

		}])
.run(function($confirmModalDefaults) {
  $confirmModalDefaults.defaultLabels.ok = '';
  $confirmModalDefaults.defaultLabels.cancel = '';
})