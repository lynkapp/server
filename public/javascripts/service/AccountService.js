myApp.service("accountService", function ($flash, $http) {

    var self = this;

    this.model = {
        myself: null
    };

    this.testEmail = function (email, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "email/test/" + email,
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.value);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.registration = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "registration/customer",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
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

    this.testFacebook = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "facebook/test",
            'headers': "Content-Type:application/json",
            'data': dto
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

    this.logout = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "logout",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            self.setMyself(null);
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

    this.accountFusion = function (accountFusion, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/account/fusion",
            'headers': "Content-Type:application/json",
            'data': accountFusion
        }).success(function (data, status) {
            $flash.success(translationService.get("--.login.flash.success"));
            self.setMyself(data);
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

    this.changePassword = function (oldPassword, newPassword, callbackSuccess, callbackError) {
        var dto = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        $http({
            'method': "PUT",
            'url': "/account/password/" + self.getMyself().id,
            'headers': "Content-Type:application/json",
            'data': dto
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

    this.editAccount = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/account/" + self.getMyself().id,
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
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

    this.login = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/login",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
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

    this.addAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/address",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            self.getMyself().addresses.push(data);
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

    this.editAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/address/" + dto.id,
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {

            for (var key in self.getMyself().addresses) {
                if (self.getMyself().addresses[key].id == dto.id) {
                    self.getMyself().addresses.splice(key, 1, data);
                }
            }
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

    this.deleteAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "DELETE",
            'url': "/address/" + dto.id,
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {

            for (var key in self.getMyself().addresses) {
                if (self.getMyself().addresses[key].id == dto.id) {
                    self.getMyself().addresses.splice(key, 1);
                }
            }
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

    this.editCustomerInterest = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/customer/interest/" + self.getMyself().id,
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {

            self.getMyself().customerInterests = data.list;
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

    this.forgotPassword = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/password",
            'headers': "Content-Type:application/json",
            'data': dto
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

    this.getMyself = function () {
        return this.model.myself;
    };

    this.setMyself = function (dto) {
        this.model.myself = dto;
        console.log(this.model.myself);
    };
});