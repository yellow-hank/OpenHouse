'use strict';
var ctrl = angular.module('oh', ['angular.filter']).config(function ($interpolateProvider, $httpProvider) {
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

ctrl.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

ctrl.controller('seminar_select', function ($scope, $window, $http, $timeout, $interval, $log) {
    //$scope.load=true;
    //$scope.$on('ngRepeatFinished', function(){
    //	$('.ui.checkbox').checkbox() ;
    //});
    angular.element(document).ready(function () {
        $('.ui.checkbox').checkbox();
    });

    var ctrl = this;
    ctrl.selected = null;

    function refresh() {
        $http.post('/company/recruit/seminar/select_ctrl/', {"action": "query"}).success(function (response) {
            ctrl.slot = response.data;
            ctrl.select_ctrl = response.select_ctrl;
        });
    };
    refresh();
    $interval(function () {
        refresh();
    }, 10000);

    ctrl.submit = function () {
        var data = {};
        data.action = "select";
        data.slot = ctrl.selected;
        $http.post('/company/recruit/seminar/select_ctrl/', data).success(function (response) {
            refresh();
            if (response.success) {
                $window.alert("選位成功");
            } else if (!response.success) {
                $window.alert(response.msg);
            }
        });
    };

    ctrl.cancel = function () {
        var data = {};
        data.action = "cancel";
        $http.post('/company/recruit/seminar/select_ctrl/', data).success(function (response) {
            refresh();
        });
    };

});

ctrl.controller('online_seminar_select', function ($scope, $window, $http, $timeout, $interval, $log) {
    //$scope.load=true;
    //$scope.$on('ngRepeatFinished', function(){
    //	$('.ui.checkbox').checkbox() ;
    //});
    angular.element(document).ready(function () {
        $('.ui.checkbox').checkbox();
    });

    var ctrl = this;
    ctrl.selected = null;

    function refresh() {
        $http.post('/company/recruit/online_seminar/select_ctrl/', {"action": "query"}).success(function (response) {
            ctrl.slot = response.data;
            ctrl.select_ctrl = response.select_ctrl;
        });
    };
    refresh();
    $interval(function () {
        refresh();
    }, 10000);

    ctrl.submit = function () {
        var data = {};
        data.action = "select";
        data.slot = ctrl.selected;
        $http.post('/company/recruit/online_seminar/select_ctrl/', data).success(function (response) {
            refresh();
            if (response.success) {
                $window.alert("選位成功");
            } else if (!response.success) {
                $window.alert(response.msg);
            }
        });
    };

    ctrl.cancel = function () {
        var data = {};
        data.action = "cancel";
        $http.post('/company/recruit/online_seminar/select_ctrl/', data).success(function (response) {
            refresh();
        });
    };

});

ctrl.controller('jobfair_select', function ($scope, $window, $http, $timeout, $interval, $log) {
    var ctrl = this;
    ctrl.selected = null;

    function refresh() {
        $http.post('/company/recruit/jobfair/select_ctrl/', {"action": "query"}).success(function (response) {
            // 所有位置
            ctrl.slot_group = response.slot_group;
            // 我已經選的位置(要顯示放棄)
            ctrl.my_slot_list = response.my_slot_list;
            // 選位控制
            ctrl.select_ctrl = response.select_ctrl;
        });
    };
    refresh();
    $interval(function () {
        refresh();
    }, 10000);

    ctrl.select = function (slot_id) {
        var data = {};
        data.action = "select";
        data.slot = slot_id;
        $http.post('/company/recruit/jobfair/select_ctrl/', data).success(function (response) {
            refresh();
            if (response.success) {
                $window.alert("選位成功");
            } else if (!response.success) {
                $window.alert(response.msg);
            }
        });
    };

    ctrl.cancel = function (slot_id) {
        var data = {};
        data.action = "cancel";
        data.slot = slot_id;
        $http.post('/company/recruit/jobfair/select_ctrl/', data).success(function (response) {
            refresh();
        });
    };

});



