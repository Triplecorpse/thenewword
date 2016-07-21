(function() {
    angular
        .module('app')
        .directive('tnwNewWord', ['storageService', '$http', newWord]);

    function newWord (storageService, $http) {

        return {
            restrict: "E",
            templateUrl: "./blocks/new-word/new-word.html",
            scope: {
                newWord: "=",
                direction: '='
            },
            link: link
        };

        function link(scope) {

            scope.isTranslationsLoading = false;

            scope.addWord = function () {
                storageService.activeDictionary.words.splice(0, 0, scope.newWord);
                storageService.saveDictionary(storageService.activeDictionary);
                scope.newWord = {
                    word: '',
                    transcription: '',
                    translations: ''
                };
            };

            scope.checkKey = function (event) {
                if(event.keyCode === 13) {
                    scope.addWord();
                    $('#new-word-word').focus();
                }
            };

            scope.getTranslations = function (word) {
                let dictionaryKey = 'dict.1.1.20160715T201519Z.76b9725ec634ce52.e9ab89e72ef7a3ec322fa4016beb2a8f09028af1';
                let translateKey = 'trnsl.1.1.20160717T115748Z.066b542dcedc588c.a7897a46c5abbcd39336bf34ae21a6ca70534fdd';
                let direction = `${storageService.activeDictionary.from}-${storageService.activeDictionary.to}`.toLowerCase();
                let dictionaryQuery = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${dictionaryKey}&lang=${direction}&text=${word}`;
                let translationQuery = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&lang=${direction}&text=${word}`;
                scope.isTranslationsLoading = true;

                $http({
                    method: 'get',
                    url: dictionaryQuery
                })
                    .then(onDictionarySuccess)
                    .catch(onError);

                function onDictionarySuccess(response) {
                    var translations = response.data.def.map((element) => {
                        if (element.tr) {
                            return (element.tr.map((element) => {
                                return element.text;
                            })).join(', ');
                        }
                    });
                    translations = translations.filter((elem) => {
                        return elem != undefined
                    });
                    if (translations.length === 0) {
                        $http({
                            method: 'get',
                            url: translationQuery
                        })
                            .then(onTranslateSuccess)
                            .catch(onError);
                    } else {
                        scope.newWord.translations = translations.join(", ");
                        scope.isTranslationsLoading = false;
                    }
                }

                function onTranslateSuccess(response) {
                    scope.newWord.translations = response.data.text.join(', ');
                    scope.isTranslationsLoading = false;
                }

                function onError(error) {
                    scope.isTranslationsLoading = false;
                    console.error(error);
                }
            }
        }
    }
})();