module.exports = {

    dist: {
        "outputFile" : "assets/js/vendor/modernizr.js",
        "dest" : "assets/js/vendor/modernizr.js",
        "cache": false,
        "extra" : {
          "shiv" : true,
          "printshiv" : true,
          "load" : true,
          "mq" : true,
          "cssclasses" : true
        },
        "options" : [
          "setClasses",
          "addTest",
          "html5printshiv",
          "testProp",
          "fnBind",
          "mq"
        ],
        // "tests": [
        //     'input',
        //     'inputtypes',
        //     'forms_placeholder'
        // ],
        "excludeTests": [
          "hidden"
        ],
        "parseFiles" : true,
        "crawl" : true,
        "uglify" : true,
        "matchCommunityTests" : true,
    }
};
