
$(document).ready(function () {


});


function downloadAgent() {
    console.log("hi oooo");

    var backendApiUrl = $("#" + chart + "").data("backend-api-url") + "?from=" + from + "&to=" + to
        + "&sensorType=" + sensorType;
    var successCallback = function (data) {
        if (data) {
            drawLineGraph(JSON.parse(data), sensorType, deviceIndex, graphConfig, graph);
        }
    };
    invokerUtil.get(backendApiUrl, successCallback, function (message) {
        console.log(message);
    });


   // $('#downloadForm').submit();
    /*
    var deviceName;
    $('.new-device-name').each(function () {
        if (this.value != "") {
            deviceName = this.value;
        }
    });
    var deviceNameFormat = /^[^~?!#$:;%^*`+={}\[\]\\()|<>,'"]{1,30}$/;
    if (deviceName && deviceName.length < 4) {
        $("#invalid-username-error-msg span").text("Device name should be more than 3 letters!");
        $("#invalid-username-error-msg").removeClass("hidden");
    } else if (deviceName && deviceNameFormat.test(deviceName)) {
        $('#downloadForm').submit();
        hidePopup();
        $(modalPopupContent).html($('#device-agent-downloading-content').html());
        showPopup();
        setTimeout(function () {
            hidePopup();
        }, 1000);
    }else {
        $("#invalid-username-error-msg span").text("Invalid device name");
        $("#invalid-username-error-msg").removeClass("hidden");
    }*/
}




function showDevicesDiv(group) {
    console.log("group"+group+"devices");
    $("#group"+group+"devices").toggle(500);
}