(function() {
    angular
        .module('app')
        .directive('tnwExercisesLearn', [exercisesLearn]);

    function exercisesLearn () {

        return {
            restrict: "E",
            templateUrl: "./blocks/exercises/exercises-learn.html",
            controller: ['storageService', 'settingsService', learnController],
            controllerAs: "learn"
        };

        function learnController(storageService, settingsService) {
            var vm = this;

            angular.extend(vm, {
                getReadableTranslations
            });

            function getReadableTranslations(array) {
                return array.join(', ')
            }
        }
    }
})();