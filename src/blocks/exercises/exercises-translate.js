(function() {
    angular
        .module('app')
        .directive('tnwExercisesTranslate', ['storageService', exercisesTranslate]);

    function exercisesTranslate (storageService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/exercises/exercises-translate.html",
            scope: {
                dictionary: '='
            },
            controller: ['settingsService', '$scope', translateController],
            controllerAs: "translate",
            link: link
        };

        function translateController(settingsService, $scope) {
            var vm = this;
            var isTranslated = false;

            angular.extend(vm, {
                getReadableTranslations,
                getTranscription,
                check,
                isTranslated
            });

            function getReadableTranslations(array) {
                return array.join(', ')
            }

            function getTranscription(word) {
                if(vm.isTranslated) {
                    return word.transcription;
                }
            }

            function check() {
                vm.isTranslated = true;
                for(let word in vm.words) {
                    if(vm.words[word].word.toLowerCase() === vm.words[word].suggestion.toLowerCase()) {
                        vm.words[word].className = 'label label-success';
                        if(!vm.words[word].timesTrue) {
                            vm.words[word].timesTrue = 1;
                        } else {
                            vm.words[word].timesTrue++;
                        }
                    } else {

                        if(!vm.words[word].suggestion) {
                            vm.words[word].className = 'label label-danger';
                        } else {
                            vm.words[word].className = 'label label-warning';
                        }

                        if(!vm.words[word].timesFalse) {
                            vm.words[word].timesFalse = 1;
                        } else {
                            vm.words[word].timesFalse++;
                        }
                    }
                    delete word.suggestion;
                    delete word.className;
                }
                storageService.saveDictionary(vm.dictionary);
            }
        }

        function link(scope, element, attributtes) {
            var dictionary = scope.dictionary;
            var controller = scope.translate;

            function init(newVal) {
                var dictionary = storageService.searchDictionary('key', newVal);
                controller.isTranslated = false;
                controller.dictionary = dictionary;
                controller.words = dictionary.words.map((element) => {
                    element.suggestion  = '';
                    return element;
                });
            }

            scope.$watch( 'dictionary.machineName', init );

            storageService.searchDictionary('key', dictionary.machineName);

        }
    }
})();