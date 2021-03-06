/*
 * version string is used to store data in localcache
 * when the code is changed in such a way that the cached data has become invalid
 * we can update the version string to invalidate the old cache
 */
var VERSION = "222097c7d26e4197435980f4731a5c6ad9c8e869";

var classlist = {
    'br': [Barbarian,   'Barbarian'],
    'dh': [DemonHunter, 'Demon Hunter'],
    'mn': [Monk,        'Monk'],
    'wd': [WitchDoctor, 'Witch Doctor'],
    'wz': [Wizard,      'Wizard']
};
var getClassInfo = function(shortname) {
    return (classlist[shortname]) ? modelclass = classlist[shortname] : [];
};

var updateBreadcrumb = function(breadcrumb) {
    window.location.hash = breadcrumb;
};

if (localStorage) {
    if (!(storage_version = localStorage.getItem('VERSION')) || storage_version != VERSION) {
        localStorage.clear();
        localStorage.setItem('VERSION', VERSION);
    }
}

var normalizeFloat = function(value, optionName, alertOnError) {
    var res = parseFloat(value);

    if (isNaN(res) || (res != value && res == parseInt(value))) {
        if (alertOnError) {
            alert("We failed to properly parse the value for [" + optionName + "]");
        
            return 0;
        } else {                  
            return normalizeFloat(value.replace(",", "."), optionName, true);
        }
    }
    
    return res;
}

var CharacterList = new Characters();
CharacterList.localStorage = new Backbone.LocalStorage("Characters");
CharacterList.fetch();

gahandler.logVersion(VERSION);

var mainView = new MainView({'el': $("#container")});