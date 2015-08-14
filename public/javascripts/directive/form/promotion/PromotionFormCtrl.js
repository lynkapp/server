myApp.directive('promotionFormCtrl', function ($flash, directiveService, $timeout,businessService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/promotion/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.update = scope.getInfo().dto != null;
                    scope.completePromotion = true;

                    //
                    // initialize default data
                    //
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            startDate: new Date(),
                            minimalQuantity: 1
                        };
                    }
                    else {
                        scope.completePromotion = scope.getInfo().dto.quantity != null;
                    }


                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.isActive = function () {
                                return true;
                            };
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                scope.fields.interests.options.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                        }
                    });

                    //build field + dto binding
                    scope.fields = {
                        title: {
                            fieldTitle: "--.generic.title",
                            validationRegex: "^.{2,100}$",
                            validationMessage: ['--.generic.validation.size', '2', '100'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'title'
                        },
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{0,1000}$",
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'startDate'
                        },
                        endDate: {
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            validationFct: function () {
                                return scope.getInfo().dto.endDate >= scope.getInfo().dto.startDate;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'endDate'
                        },
                        illustration: {
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            sizex: 60,
                            sizey: 60,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            optional: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            multiple:true,
                            fieldName: 'pictures'
                        },
                        quantity: {
                            fieldTitle: "--.promotion.quantity",
                            numbersOnly: 'integer',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.generic.validation.numberExpected',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'quantity'
                        },
                        minimalQuantity: {
                            fieldTitle: "--.promotion.minimalQuantity",
                            numbersOnly: 'integer',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.promotion.validation.minimalQuantityMustBeLowerThanQuantity',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: 1,
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'minimalQuantity'
                        },
                        unit: {
                            fieldTitle: "--.promotion.unit",
                            validationRegex: "^.{0,30}$",
                            validationMessage: ['--.generic.validation.max', '30'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'unit'
                        },
                        originalPrice: {
                            fieldTitle: "--.promotion.originalUnitPrice",
                            numbersOnly: 'double',
                            validationMessage: '--.generic.validation.numberExpected',
                            validationFct: function () {
                                return scope.getInfo().dto.originalPrice != null;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "€",
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'originalPrice'
                        },
                        offPercent: {
                            fieldTitle: "--.promotion.offPercent",
                            numbersOnly: 'percent',
                            validationFct: function () {
                                return scope.getInfo().dto.offPercent != null && parseFloat(scope.getInfo().dto.offPercent) > 0 && parseFloat(scope.getInfo().dto.offPercent) <= 1;
                            },
                            validationMessage: '--.promotion.validation.offPercent',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "%",
                            field: scope.getInfo().dto,
                            fieldName: 'offPercent'
                        },
                        offPrice: {
                            fieldTitle: "--.promotion.offPrice",
                            numbersOnly: 'double',
                            validationMessage: '--.promotion.validation.offPrice',
                            validationFct: function () {
                                return scope.getInfo().dto.offPrice != null && parseFloat(scope.getInfo().dto.offPrice) < parseFloat(scope.getInfo().dto.originalPrice);
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "€",
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'offPrice'
                        },
                        interests: {
                            fieldTitle: "--.promotion.interest",
                            details: '--.promotion.interest.help',
                            validationMessage: '--.error.validation.not_null',
                            options: [],
                            optional: function () {
                                return false;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: function () {
                                return false
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest'
                        }
                    };

                    //
                    // specific treatment
                    //
                    var suspendWatch = false;
                    scope.$watch('getInfo().dto.originalPrice', function (o, n) {
                        if (o != n && scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPercent != null && suspendWatch == false) {
                            suspendWatch = true;
                            scope.getInfo().dto.offPrice = parseFloat(scope.getInfo().dto.originalPrice) * (1 - parseFloat(scope.getInfo().dto.offPercent));
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });
                    scope.$watch('getInfo().dto.offPercent', function (o, n) {
                        if (o != n && scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPercent != null && suspendWatch == false) {
                            suspendWatch = true;
                            scope.getInfo().dto.offPrice = parseFloat(scope.getInfo().dto.originalPrice) * (1 - parseFloat(scope.getInfo().dto.offPercent));
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });
                    scope.$watch('getInfo().dto.offPrice', function (o, n) {
                        if (o != n && scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPrice && suspendWatch == false) {
                            suspendWatch = true;
                            scope.getInfo().dto.offPercent = 1 -  (parseFloat(scope.getInfo().dto.offPrice) / parseFloat(scope.getInfo().dto.originalPrice));
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });

                    //compute first
                    if (scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPercent != null && suspendWatch == false) {
                        suspendWatch = true;
                        scope.getInfo().dto.offPrice = parseFloat(scope.getInfo().dto.originalPrice) * (1 - parseFloat(scope.getInfo().dto.offPercent));
                        $timeout(function () {
                            suspendWatch = false;
                        }, 1);
                    }

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