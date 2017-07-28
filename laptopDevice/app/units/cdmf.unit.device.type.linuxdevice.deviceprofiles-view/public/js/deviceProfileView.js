/**
 * Created by lahiru on 7/28/17.
 */

var deviceProfiles;

function createDeviceProfile() {
    document.getElementById("warningMessage").style.display = "block";

    invokerUtil.get("/linuxdevice/1.0.0/device/profiles", function (message) {
        console.log(message);
    });

}