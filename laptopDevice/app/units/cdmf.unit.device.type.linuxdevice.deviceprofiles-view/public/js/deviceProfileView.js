/**
 * Created by lahiru on 7/28/17.
 */

var deviceProfiles;

function createDeviceProfile() {
    var profileid = document.getElementById("profileid").value;
    var profilename = document.getElementById("profilename").value;

    invokerUtil.get("/linuxdevice/1.0.0/device/profiles", function (message) {
        deviceProfiles = JSON.parse(message);
        var result = $.grep(deviceProfiles, function(e){ return (e.profileId == profileid || e.profileName==profilename) ; });
        if(result.length>0) {
            document.getElementById("warningMessage").style.display = "inline";
        } else {
            document.getElementById("warningMessage").style.display = "none";
            $('#createProfileForm').submit();
        }

    });

}