var myApp = angular.module('TTYT',[]);



myApp.controller('check_login', ['$scope', '$http', '$window', '$location',  function ($scope, $http, $window, $location) {
    $scope.username = '';
    $scope.password = '';
    $scope.method = 'post';
    $scope.url = '/check_loginServer';
    $scope.hienLoading = true;

    $scope.validate = function () {
        $scope.hienLoading = false;

        if($scope.username == '' || $scope.password == ''){
            $scope.hienLoading = true;
            alert("Tên đăng nhập hoặc mật khẩu không được rỗng");
        }
        else{
            var dataToCheck = {
                username: $scope.username,
                password: $scope.password
            }
            $http({method: $scope.method, url: $scope.url, data: dataToCheck}).
                then(function(response) {
                    if(response.data.trangthai == 1){
                        $window.location.href = '/home';
                    }
                    else{
                        $scope.hienLoading = true;
                        alert('Tài khoản hoặc mật khẩu không đúng');
                    }                    
                }, function(response) {
                    console.log(response);
            });
        }        
    }
}]);

