function test(computer) {
  alert(computer);
}

$(document).ready(function() {
    $.ajax({
        url: "http://localhost/data.php",
        method: "GET",
        success: function(data) {
            var today = Date.now();
            var jslast_checkin = [];
            var macAddr = [];
            var hostname = [];
            var last_checkin = [];
            var osvers = [];
            var sierra2 = 0;
            var sierra1 = 0;
            var sierra0 = 0;
            var elcap6 = 0;
            var elcap5 = 0;
            var elcap4 = 0;
            var elcap3 = 0;
            var elcap2 = 0;
            var elcap1 = 0;
            var elcap0 = 0;



            for (var i in data) {
                macAddr.push(data[i].macAddr);
                hostname.push(data[i].hostname);
                last_checkin.push(data[i].last_checkin);
                if (data[i].osvers == "10.12.2") {
                    sierra2 += 1;
                } else if (data[i].osvers == "10.12.1") {
                    sierra1 += 1;
                } else if (data[i].osvers == "10.12.0") {
                    sierra0 += 1;
                } else if (data[i].osvers == "10.11.6") {
                    elcap6 += 1;
                } else if (data[i].osvers == "10.11.5") {
                    elcap5 += 1;
                } else if (data[i].osvers == "10.11.4") {
                    elcap4 += 1;
                } else if (data[i].osvers == "10.11.3") {
                    elcap3 += 1;
                } else if (data[i].osvers == "10.11.2") {
                    elcap2 += 1;
                } else if (data[i].osvers == "10.11.1") {
                    elcap1 += 1;
                } else if (data[i].osvers == "10.11.0") {
                    elcap0 += 1;
                }
                osvers.push(data[i].osvers);

                var sqlDateArr1 = data[i].last_checkin.split("-");
                var sYear = sqlDateArr1[0];
                var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
                var sqlDateArr2 = sqlDateArr1[2].split(" ");
                var sDay = sqlDateArr2[0];
                var sqlDateArr3 = sqlDateArr2[1].split(":");
                var sHour = sqlDateArr3[0];
                var sMinute = sqlDateArr3[1];
                var sqlDateArr4 = sqlDateArr3[2].split(".");
                var sSecond = sqlDateArr4[0];
                jslast_checkin.push(new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond));

                var MATH = 1000 * 60 * 60 * 24;

                var diff = today - jslast_checkin[i];
                var days = diff / MATH;
                if (days >= 7) {
                    $('#computers > tbody:last-child').append('<tr class="danger"><td>' +
                        '<a onclick="test(\'' + data[i].macAddr + '\')" class="btn btn-default btn-sm">' +
                        data[i].hostname + '</a></td><td>' + data[i].macAddr +
                        '</td><td>' + data[i].ip + '</td><td>' + data[i].osname +
                        '</td><td>' + data[i].osvers + '</td><td>' + data[i].osbuild +
                        '</td><td>' + data[i].processor + '</td><td>' + data[i].memory +
                        '</td><td>' + data[i].last_checkin + '</td></tr>');
                } else {
                    $('#computers > tbody:last-child').append('<tr><td>' +
                        '<a onclick="test(\'' + data[i].macAddr + '\')" class="btn btn-default btn-sm">' +
                        data[i].hostname + '</a></td><td>' + data[i].macAddr +
                        '</td><td>' + data[i].ip + '</td><td>' + data[i].osname +
                        '</td><td>' + data[i].osvers + '</td><td>' + data[i].osbuild +
                        '</td><td>' + data[i].processor + '</td><td>' + data[i].memory +
                        '</td><td>' + data[i].last_checkin + '</td></tr>');
                }
            }

            var ctx = document.getElementById("osvers").getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'bar',
                responsive: true,
                data: {
                    labels: ["10.12.2", "10.12.1", "10.12.0", "10.11.6", "10.11.5", "10.11.4", "10.11.3", "10.11.2", "10.11.1", "10.11.0"],
                    datasets: [{
                        label: 'Number of Computers',
                        data: [sierra2, sierra1, sierra0, elcap6, elcap5, elcap4, elcap3, elcap2, elcap1, elcap0]
                    }]
                }
            });
            var greatSev = 0;
            var greatFour = 0;
            var greatTwo = 0;
            var greatOne = 0;
            var lessOne = 0;
            var MATH = 1000 * 60 * 60 * 24;

            for (var i in jslast_checkin) {
                var diff = today - jslast_checkin[i];
                var days = diff / MATH;
                if (days >= 7) {
                    greatSev += 1;
                } else if (days >= 4 && days < 7) {
                    greatFour += 1;
                } else if (days >= 2 && days < 4) {
                    greatTwo += 1;
                } else if (days >= 1 && days < 2) {
                    greatOne += 1;
                } else if (days < 1) {
                    lessOne += 1;
                }
            }



            var ctx2 = document.getElementById("lastcheckin").getContext('2d');
            ctx2.canvas.height = 200;
            var myChart = new Chart(ctx2, {
                type: 'doughnut',
                responsive: true,
                data: {
                    labels: [">=7 Days", ">=4 Days", ">=2 Days", ">=1 Day", "<1 Day"],
                    datasets: [{
                        label: 'Last Check-in',
                        data: [greatSev, greatFour, greatTwo, greatOne, lessOne],
                        backgroundColor: [
                            "#ff0000",
                            "#003366",
                            "#ffff00",
                            "#0000ff",
                            "#00ff00"
                        ],
                        hoverBackgroundColor: [
                            "#ff0000",
                            "#003366",
                            "#ffff00",
                            "#0000ff",
                            "#00ff00"
                        ]
                    }]
                },
                options: {
                    elements: {
                        arc: {
                            borderColor: "#000000"
                        }
                    }
                }
            });
        },
        error: function(data) {
            console.log(data);
        }
    });
});
