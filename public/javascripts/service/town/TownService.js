myApp.service("townService", function ($flash, $http) {


    this.getBusinessByZip = function (zip, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "https://lynk-test.herokuapp.com/rest/town/business/zip/" + zip,
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.getPublicationByBusiness = function (businessId,page, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "https://lynk-test.herokuapp.com/rest/town/publication/business/" + businessId+'/'+page,
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.getTranslations = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "https://lynk-test.herokuapp.com/rest/town/translations",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


});