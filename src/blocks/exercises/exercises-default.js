(function() {
    angular
        .module('app')
        .directive('tnwExercisesDefault', [exercisesDefault]);

    function exercisesDefault () {

        return {
            restrict: "E",
            templateUrl: "./blocks/exercises/exercises-default.html"
        };
    }
})();