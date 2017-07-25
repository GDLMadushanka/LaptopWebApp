/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function onRequest() {

    var log = new Log('dashboard.js');
    var constants = require("/app/modules/constants.js");
    var devicemgtProps = require("/app/modules/conf-reader/main.js")["conf"];

    var userModule = require("/app/modules/business-controllers/user.js")["userModule"];
    var deviceModule = require("/app/modules/business-controllers/device.js")["deviceModule"];
    var groupModule = require("/app/modules/business-controllers/group.js")["groupModule"];


    var alldevices = deviceModule.getDevices();
    var allgroups =groupModule.getGroups();
    var currentUser = userModule.getCarbonUser();

    var userGroups = allgroups.filter( function(item){return (item.owner==currentUser.username);} );
    var userDevices = alldevices.filter( function(item){return (item.enrolmentInfo.owner==currentUser.username && item.type=="linuxdevice");} );

    var groupsWithLaptopDevices=[];
    for(var i=0;i<userGroups.length;i++) {
        var devicesOfgroup = groupModule.getGroupDevices(userGroups[i].id);
        var tempp = JSON.parse(devicesOfgroup);
        //temp - laptop devices of the group
        var temp = tempp.devices.filter( function(item){return (item.type=="linuxdevice");} );
        if(temp.length>0) {
            groupsWithLaptopDevices.push({
                "group": userGroups[i],
                "devices": temp
            });
        }
    }


  //  log.info(devicesOfgroup);

    var user = session.get(constants["USER_SESSION_KEY"]);
    var permissions = userModule.getUIPermissions();
    var viewModel = {};

    viewModel.userGroups = groupsWithLaptopDevices;
    viewModel.userDevices = userDevices;
    viewModel.permissions = permissions;
    viewModel.currentUser = currentUser;

    log.info(userDevices);

    if (!permissions.ADD_BUILDING && !permissions.VIEW_BUILDING) {
        viewModel.permittednone = true;
    }

    return viewModel;
}