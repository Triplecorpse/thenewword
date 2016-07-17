(function() {
    angular
        .module('app')
        .directive('tnwExercisesTranslate', [exercisesTranslate]);

    function exercisesTranslate () {

        return {
            restrict: "E",
            templateUrl: "./blocks/exercises/exercises-translate.html",
            controller: ['storageService', 'settingsService', '$scope', translateController],
            controllerAs: "translate"
        };

        function translateController(storageService, settingsService, $scope) {
            var vm = this;
            var isTranslated = false;
            var words = $scope.$parent.exercises.dictionary.words;

            angular.extend(vm, {
                getReadableTranslations,
                isTranslated,
                getTranscription,
                check
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
                for(let word in words) {
                    if(words[word].word === words[word].suggestion) {
                        words[word].className = 'label label-success';
                    } else {
                        words[word].className = 'label label-warning';
                    }
                }
            }
        }
    }
})();