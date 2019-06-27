import PlayerData from './player-data';
import ResourcesManager from './../uillity/resources-manager';
let utilsData = function () {
    let that = {};
    that.playerData = PlayerData();
    that.resourcesManager = ResourcesManager();
    return that;
}

export default utilsData;