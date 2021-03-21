var app = angular.module('myApp', []);
app.controller('main', ['$scope', '$http', function ($scope, $http) {

    $http.get('count');

    $http.get('region').then(function(res) {
        $scope.regionList = res.data;

        $scope.selectRegion($scope.regionList[0]);
    });


    $scope.selectRegion = function (region) {
        $scope.selectedRegion = region;
        $scope.person.rated = region.personalRate;
        $scope.company.rated = region.companyRate;
        $scope.insbase = region.insuranceBase;
        $scope.housebase = region.houseBase;

        $scope.houseRate = parseInt(region.personalRate.house*100);
        
        getBaseNumber();

        $scope.calculateAll();
    }

    var myChart = echarts.init(document.getElementById('chart'), 'vintage');
    var option = {
        title: {
            text: '个人税前工资去向',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['养老保险', '医疗保险', '失业保险', '基本住房公积金'
                , '补充住房公积金', '个人所得税', '税后收入']
        },
        series: [
            {
                name: '详细信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 0, name: '税后收入' },
                    { value: 0, name: '养老保险' },
                    { value: 0, name: '医疗保险' },
                    { value: 0, name: '失业保险' },
                    { value: 0, name: '基本住房公积金' },
                    { value: 0, name: '补充住房公积金' },
                    { value: 0, name: '个人所得税' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    var companyChart = echarts.init(document.getElementById('companyChart'), 'vintage');
    var companyOption = {
        title: {
            text: '公司支出情况',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['养老保险', '医疗保险', '失业保险', '工伤保险', '生育保险',
                '基本住房公积金', '补充住房公积金', '支付工资']
        },
        series: [
            {
                name: '详细信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 0, name: '支付工资' },
                    { value: 0, name: '养老保险' },
                    { value: 0, name: '医疗保险' },
                    { value: 0, name: '失业保险' },
                    { value: 0, name: '工伤保险' },
                    { value: 0, name: '生育保险' },
                    { value: 0, name: '基本住房公积金' },
                    { value: 0, name: '补充住房公积金' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    $scope.person = {
        account: {
        },
        rated: {
            pension: 0.08,
            medical: 0.02,
            unemployment: 0.005,
            injury: null,
            birth: null,
            house: 0.07,
            extrahouse: 0
        },
        rate: {
        },
        total: 0
    };
    $scope.company = {
        account: {
        },
        rated: {
            pension: 0.16,
            medical: 0.095,
            unemployment: 0.005,
            injury: 0.002,
            birth: 0.01,
            house: 0.07,
            extrahouse: 0
        },
        rate: {

        },
        total: 0
    };

    $scope.insbase = {
        min: 4927,
        max: 24633,
        actual: 0
    };
    $scope.housebase = {
        min: 2414,
        max: 24633,
        actual: 0
    };

    //更改工资时获取基数
    function getBaseNumber() {
        if ($scope.pretax > $scope.insbase.min && $scope.pretax < $scope.insbase.max)
            $scope.insbase.actual = $scope.pretax;
        else if ($scope.pretax >= $scope.insbase.max)
            $scope.insbase.actual = $scope.insbase.max;
        else if ($scope.pretax < $scope.insbase.min)
            $scope.insbase.actual = $scope.insbase.min;

        if ($scope.pretax > $scope.housebase.min && $scope.pretax < $scope.housebase.max)
            $scope.housebase.actual = $scope.pretax;
        else if ($scope.pretax >= $scope.housebase.max)
            $scope.housebase.actual = $scope.housebase.max;
        else if ($scope.pretax < $scope.housebase.min)
            $scope.housebase.actual = $scope.housebase.min;
    }

    //计算所有数额
    $scope.calculateAll = function () {
        var pretax = $scope.pretaxBefore;
        var limit = $scope.limit;
        $scope.pretax = pretax;
        if (!pretax || pretax < limit) $scope.pretax = limit;
        if (pretax > Math.pow(2, 53)) return;
        $scope.person.total = $scope.company.total = 0;

        // if (!$scope.customRate) {
        //     getBaseNumber();
        // }

        angular.forEach($scope.person.rated, function (value, i) {

            $scope.person.account[i] = $scope.insbase.actual * $scope.person.rated[i];
            $scope.company.account[i] = $scope.insbase.actual * $scope.company.rated[i];

            if (i == "house") {
                $scope.person.account[i] = $scope.housebase.actual * $scope.person.rated[i];
                $scope.company.account[i] = $scope.housebase.actual * $scope.company.rated[i];
            }

            $scope.person.total += $scope.person.account[i];
            $scope.company.total += $scope.company.account[i];
        });
        $scope.person.after = $scope.pretax - $scope.person.total;
        if (!$scope.notax) {
            $scope.tax5000 = caltax5000($scope.person.after);
            $scope.tax3500 = caltax3500($scope.person.after);
            $scope.tax = caltax5000($scope.person.after - $scope.subAmount);
        } else {
            $scope.tax = 0;
        }
        $scope.aftertax5000 = $scope.person.after - $scope.tax5000;
        $scope.aftertax3500 = $scope.person.after - $scope.tax3500;
        $scope.aftertax = $scope.person.after - $scope.tax;

        function LimitToZero(key) {
            $scope[key] = $scope[key] > 0 ? $scope[key] : 0;
        }

        ['aftertax5000', 'aftertax3500', 'aftertax', 'person.after'].forEach(function (key) {
            LimitToZero(key);
        });

        $scope.person.after = $scope.person.after > 0 ? $scope.person.after : 0;

        //生成图表
        var values = [
            $scope.aftertax,
            $scope.person.account['pension'],
            $scope.person.account['medical'],
            $scope.person.account['unemployment'],
            $scope.person.account['house'],
            $scope.person.account['extrahouse'],
            $scope.tax
        ];

        var companyValues = [
            $scope.pretaxBefore,
            $scope.company.account['pension'],
            $scope.company.account['medical'],
            $scope.company.account['unemployment'],
            $scope.company.account['injury'],
            $scope.company.account['birth'],
            $scope.company.account['house'],
            $scope.company.account['extrahouse']
        ];

        angular.forEach(option.series[0].data, function (item, index) {
            item.value = values[index].toFixed(2);
        });

        angular.forEach(companyOption.series[0].data, function (item, index) {
            item.value = Number(companyValues[index]).toFixed(2);
        });

        myChart.setOption(option);
        companyChart.setOption(companyOption);

    }

    //初始化各项数据
    calculateLimit();
    initBase();

    //改变公积金缴纳比率
    $scope.changeHouseRate = function () {
        $scope.person.rated.house = $scope.company.rated.house = $scope.houseRate / 100;
        $scope.calculateAll();
    }

    //改变补充公积金比率
    $scope.changeExtraRate = function () {
        $scope.person.rated.extrahouse = $scope.company.rated.extrahouse = $scope.extrahouse / 100;
        $scope.calculateAll();
    };

    //改变工伤保险比例
    $scope.changeCompanyInjury = function () {
        $scope.company.rated.injury = $scope.injury / 100;
        $scope.calculateAll();
    }

    //是否补充公积金变化
    $scope.changeHasExtra = function () {
        $scope.extrahouse = 0;
        $scope.changeExtraRate();
    };

    //初始化各项数据
    function initBase() {
        $scope.insbase.actual = $scope.insbase.min;
        $scope.housebase.actual = $scope.housebase.min;
        $scope.extrahouse = 0;
        $scope.subAmount = 0;
    }

    //点击最低标准
    $scope.changeLeast = function () {
        if ($scope.leastBase) {
            initBase();
            $scope.customRate = true;
        }

        $scope.calculateAll();
    };

    //点击自定义基数
    $scope.changeCustomRate = function () {
        if (!$scope.customRate) $scope.leastBase = false;
        $scope.calculateAll();
    };

    var getResult = _.debounce(function () {
        if ($scope.pretaxBefore > 1000) {
            $http.post('calculate', {
                salary: $scope.pretaxBefore,
                insurancebase: $scope.insbase.actual,
                housebase: $scope.housebase.actual,
                aftertax: $scope.aftertax,
                city: $scope.selectedRegion.name
            });
        }
    }, 500);

    $scope.$watch(function () {
        return [$scope.pretaxBefore, $scope.aftertax];
    }, function (newValue, oldValue) {
        if (newValue != oldValue) {
            getResult();
        }
    }, true);

    //计算最小数目
    function calculateLimit() {
        $scope.pretaxBefore = $scope.housebase.min;
        initBase();
        $scope.calculateAll();
        $scope.limit = $scope.person.total;

        $scope.pretaxBefore = 0;
        $scope.calculateAll();

        $scope.pretaxBefore = "";
    }

    function caltax3500(account) {
        var taxrate = [
            {
                min: 0,
                max: 1500,
                rate: 0.03,
                sub: 0
            },
            {
                min: 1500,
                max: 4500,
                rate: 0.1,
                sub: 105
            },
            {
                min: 4500,
                max: 9000,
                rate: 0.2,
                sub: 555
            },
            {
                min: 9000,
                max: 35000,
                rate: 0.25,
                sub: 1005
            },
            {
                min: 35000,
                max: 55000,
                rate: 0.3,
                sub: 2755
            },
            {
                min: 55000,
                max: 80000,
                rate: 0.35,
                sub: 5505
            },
            {
                min: 80000,
                max: Math.pow(2, 53),
                rate: 0.45,
                sub: 13505
            }
        ];
        return doCal(account, 3500, taxrate);
    }


    //计算个人所得税
    function caltax5000(account) {
        var taxrate = [
            {
                min: 0,
                max: 3000,
                rate: 0.03,
                sub: 0
            },
            {
                min: 3000,
                max: 12000,
                rate: 0.1,
                sub: 210
            },
            {
                min: 12000,
                max: 25000,
                rate: 0.2,
                sub: 1410
            },
            {
                min: 25000,
                max: 35000,
                rate: 0.25,
                sub: 2660
            },
            {
                min: 35000,
                max: 55000,
                rate: 0.3,
                sub: 4410
            },
            {
                min: 55000,
                max: 80000,
                rate: 0.35,
                sub: 7160
            },
            {
                min: 80000,
                max: Math.pow(2, 53),
                rate: 0.45,
                sub: 15160
            }
        ];
        return doCal(account, 5000, taxrate);
    }



    // 计算个人所得税
    function doCal(account, taxStart, taxrate) {
        account = account - taxStart;
        if (account < 0) return 0;
        var rateObj = {};
        for (var i = 0; i < taxrate.length; i++) {
            if (account > taxrate[i].min && account <= taxrate[i].max) {
                rateObj = taxrate[i];
                break;
            }
        }
        var tax = account * rateObj.rate - rateObj.sub;
        return tax;
    }

}]).filter('percent', function () {
    return function (obj) {
        return "(" + (obj * 100).toFixed(2) + "%)"
    }
});
angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});