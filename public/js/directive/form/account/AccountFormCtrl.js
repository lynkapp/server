myApp.directive('accountFormCtrl', function ($flash, directiveService, languageService,modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/account/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    //
                    // initialization default data
                    //
                    scope.update = scope.getInfo().dto != null;
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            gender: null
                        };
                    }

                    scope.passwordActive = true;

                    var langOptions = [];


                    scope.fields = {
                        firstname: {
                            name: 'firstname',
                            fieldTitle: "--.generic.firstname",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '50'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'firstname'
                        },
                        lastname: {
                            name: 'lastname',
                            fieldTitle: "--.generic.lastname",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '50'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'lastname'
                        },
                        language: {
                            name: 'language',
                            fieldTitle: "--.generic.favoriteLanguage",
                            validationMessage: '--.error.validation.not_null',
                            options: langOptions,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'lang'
                        },
                        email: {
                            fieldType: "email",
                            name: 'email',
                            fieldTitle: "--.generic.email",
                            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            validationMessage: "--.generic.validation.email",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        password: {
                            name: 'password',
                            fieldTitle: "--.registration.form.password",
                            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
                            validationMessage: "--.generic.validation.password",
                            fieldType: 'password',
                            details: '--.registration.form.password.help',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return !scope.getInfo().updateMode && scope.passwordActive
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'password'
                        },
                        repeatPassword: {
                            name: 'repeatPassword',
                            fieldTitle: "--.registration.form.repeatPassword",
                            validationMessage: "--.generic.validation.wrongRepeatPassword",
                            fieldType: 'password',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            validationFct: function () {
                                return scope.fields.password.field === scope.fields.repeatPassword.field;
                            },
                            active: function () {
                                return !scope.getInfo().updateMode && scope.passwordActive
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'repeatPassword'
                        }
                    };

                    var langs = languageService.getLanguages();
                    for (var key in langs) {
                        var lang = langs[key];
                        langOptions.push({
                            key: lang,
                            value: lang.code
                        });
                        if (lang.code == languageService.currentLanguage) {
                            scope.getInfo().dto.lang = lang;
                        }
                    }

                    scope.getInfo().maskPassword = function () {
                        scope.passwordActive = false;
                    };

                    scope.openSla = function(){
                      modalService.openSla('--.sla.modal.title','/legal/');
                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {

                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }


})
;