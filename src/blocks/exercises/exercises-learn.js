(function() {
    angular
        .module('app')
        .directive('tnwExercisesLearn', [exercisesLearn]);

    function exercisesLearn () {

        return {
            restrict: "E",
            templateUrl: "./blocks/exercises/exercises-learn.html",
            controller: [learnController],
            controllerAs: "learn"
        };

        function learnController() {
            var vm = this;

            angular.extend(vm, {
                getTranscription
            });

            function getTranscription(transcription) {
                if(transcription)
                    return `[${transcription}]`;
            }
        }
    }
})();