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
            controller: [translateController],
            controllerAs: "translate",
            link: link
        };

        function translateController() {
            var vm = this;
            var isTranslated = false;

            angular.extend(vm, {
                getTranscription,
                check,
                isTranslated,
            });

            function getTranscription(transcription) {
                if((vm.isTranslated) && (transcription)) {
                    return `[${transcription}]`;
                }
            }

            function check() {
                vm.isTranslated = true;
                for(let word in vm.words) {
                    if(vm.words[word].word.toLowerCase() === vm.suggestions[word].toLowerCase()) {
                        // vm.classNames[word] = 'label label-success';
                        if(!vm.words[word].timesTrue) {
                            vm.words[word].timesTrue = 1;
                        } else {
                            vm.words[word].timesTrue++;
                        }
                    } else {

                        if(!vm.suggestions[word]) {
                            vm.classNames[word] = 'label label-danger';
                        } else {
                            vm.classNames[word] = 'label label-warning';
                        }

                        if(!vm.words[word].timesFalse) {
                            vm.words[word].timesFalse = 1;
                        } else {
                            vm.words[word].timesFalse++;
                        }
                    }
                }
                console.log(vm.classNames);
                console.log(vm.suggestions);
                storageService.saveDictionary(vm.dictionary);
            }
        }

        function link(scope) {
            var dictionary = scope.dictionary;
            var controller = scope.translate;

            function init(newVal) {
                var dictionary = storageService.searchDictionary('key', newVal);
                controller.isTranslated = false;
                controller.dictionary = dictionary;
                controller.classNames = new Array(dictionary.words.length);
                controller.suggestions = new Array(dictionary.words.length);
                controller.words = dictionary.words.map((element, index) => {
                    controller.classNames[index] = 'label label-success';
                    controller.suggestions[index] = '';
                    return element;
                });
            }

            scope.$watch('dictionary.machineName', init);

            storageService.searchDictionary('key', dictionary.machineName);

        }
    }
})();