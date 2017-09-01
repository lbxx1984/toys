define(function (require) {
    var fileTreeConfig = {
    "src": {
        "commonConfig": {
            "fullpath": "src/commonConfig",
            "isDirectory": true
        },
        "commonJSX": {
            "fullpath": "src/commonJSX",
            "isDirectory": true
        },
        "core": {
            "fullpath": "src/core",
            "isDirectory": true
        },
        "index.js": {
            "fullpath": "src/index.js",
            "isDirectory": false
        },
        "main.js": {
            "fullpath": "src/main.js",
            "isDirectory": false
        },
        "module": {
            "fullpath": "src/module",
            "isDirectory": true
        },
        "service": {
            "fullpath": "src/service",
            "isDirectory": true
        }
    },
    "src/commonConfig": {
        "appStateDialogConfig.js": {
            "fullpath": "src/commonConfig/appStateDialogConfig.js",
            "isDirectory": false
        }
    },
    "src/commonJSX": {
        "appNormalTargetingEditor": {
            "fullpath": "src/commonJSX/appNormalTargetingEditor",
            "isDirectory": true
        },
        "Footer.jsx.js": {
            "fullpath": "src/commonJSX/Footer.jsx.js",
            "isDirectory": false
        },
        "Header.jsx.js": {
            "fullpath": "src/commonJSX/Header.jsx.js",
            "isDirectory": false
        },
        "layer": {
            "fullpath": "src/commonJSX/layer",
            "isDirectory": true
        },
        "MassWordShow.jsx.js": {
            "fullpath": "src/commonJSX/MassWordShow.jsx.js",
            "isDirectory": false
        },
        "OperationBar.jsx.js": {
            "fullpath": "src/commonJSX/OperationBar.jsx.js",
            "isDirectory": false
        },
        "renderer": {
            "fullpath": "src/commonJSX/renderer",
            "isDirectory": true
        }
    },
    "src/core": {
        "ajax.js": {
            "fullpath": "src/core/ajax.js",
            "isDirectory": false
        },
        "flags.js": {
            "fullpath": "src/core/flags.js",
            "isDirectory": false
        },
        "Model.js": {
            "fullpath": "src/core/Model.js",
            "isDirectory": false
        },
        "ReactDialog.js": {
            "fullpath": "src/core/ReactDialog.js",
            "isDirectory": false
        },
        "ReactShoji.jsx.js": {
            "fullpath": "src/core/ReactShoji.jsx.js",
            "isDirectory": false
        },
        "util.js": {
            "fullpath": "src/core/util.js",
            "isDirectory": false
        }
    },
    "src/module": {
        "addNormalTargeting": {
            "fullpath": "src/module/addNormalTargeting",
            "isDirectory": true
        },
        "adManage": {
            "fullpath": "src/module/adManage",
            "isDirectory": true
        },
        "appManage": {
            "fullpath": "src/module/appManage",
            "isDirectory": true
        },
        "index.js": {
            "fullpath": "src/module/index.js",
            "isDirectory": false
        },
        "noApp": {
            "fullpath": "src/module/noApp",
            "isDirectory": true
        }
    },
    "src/service": {
        "appAdsService": {
            "fullpath": "src/service/appAdsService",
            "isDirectory": true
        },
        "getAppInfo.js": {
            "fullpath": "src/service/getAppInfo.js",
            "isDirectory": false
        },
        "getAppList.js": {
            "fullpath": "src/service/getAppList.js",
            "isDirectory": false
        },
        "getPlanList.js": {
            "fullpath": "src/service/getPlanList.js",
            "isDirectory": false
        },
        "getPlanStatus.js": {
            "fullpath": "src/service/getPlanStatus.js",
            "isDirectory": false
        },
        "getUnitsList.js": {
            "fullpath": "src/service/getUnitsList.js",
            "isDirectory": false
        },
        "getUnitsStatus.js": {
            "fullpath": "src/service/getUnitsStatus.js",
            "isDirectory": false
        }
    },
    "src/commonJSX/appNormalTargetingEditor": {
        "OverPriceType.jsx.js": {
            "fullpath": "src/commonJSX/appNormalTargetingEditor/OverPriceType.jsx.js",
            "isDirectory": false
        },
        "StaticOverPriceType.jsx.js": {
            "fullpath": "src/commonJSX/appNormalTargetingEditor/StaticOverPriceType.jsx.js",
            "isDirectory": false
        }
    },
    "src/commonJSX/layer": {
        "CheckBoxList.jsx.js": {
            "fullpath": "src/commonJSX/layer/CheckBoxList.jsx.js",
            "isDirectory": false
        }
    },
    "src/commonJSX/renderer": {
        "TableFilterHeader.jsx.js": {
            "fullpath": "src/commonJSX/renderer/TableFilterHeader.jsx.js",
            "isDirectory": false
        },
        "TableLinkRenderer.jsx.js": {
            "fullpath": "src/commonJSX/renderer/TableLinkRenderer.jsx.js",
            "isDirectory": false
        }
    },
    "src/module/addNormalTargeting": {
        "App.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/App.jsx.js",
            "isDirectory": false
        },
        "components": {
            "fullpath": "src/module/addNormalTargeting/components",
            "isDirectory": true
        },
        "config": {
            "fullpath": "src/module/addNormalTargeting/config",
            "isDirectory": true
        },
        "Model.js": {
            "fullpath": "src/module/addNormalTargeting/Model.js",
            "isDirectory": false
        }
    },
    "src/module/adManage": {
        "components": {
            "fullpath": "src/module/adManage/components",
            "isDirectory": true
        },
        "config": {
            "fullpath": "src/module/adManage/config",
            "isDirectory": true
        },
        "factory": {
            "fullpath": "src/module/adManage/factory",
            "isDirectory": true
        },
        "Main.jsx.js": {
            "fullpath": "src/module/adManage/Main.jsx.js",
            "isDirectory": false
        },
        "Model.js": {
            "fullpath": "src/module/adManage/Model.js",
            "isDirectory": false
        }
    },
    "src/module/appManage": {
        "App.jsx.js": {
            "fullpath": "src/module/appManage/App.jsx.js",
            "isDirectory": false
        },
        "components": {
            "fullpath": "src/module/appManage/components",
            "isDirectory": true
        },
        "config": {
            "fullpath": "src/module/appManage/config",
            "isDirectory": true
        },
        "Model.js": {
            "fullpath": "src/module/appManage/Model.js",
            "isDirectory": false
        }
    },
    "src/module/noApp": {
        "App.jsx.js": {
            "fullpath": "src/module/noApp/App.jsx.js",
            "isDirectory": false
        },
        "Model.js": {
            "fullpath": "src/module/noApp/Model.js",
            "isDirectory": false
        }
    },
    "src/service/appAdsService": {
        "getAppAdsList.js": {
            "fullpath": "src/service/appAdsService/getAppAdsList.js",
            "isDirectory": false
        },
        "getAppBindList.js": {
            "fullpath": "src/service/appAdsService/getAppBindList.js",
            "isDirectory": false
        },
        "getAppVersions.js": {
            "fullpath": "src/service/appAdsService/getAppVersions.js",
            "isDirectory": false
        }
    },
    "src/module/addNormalTargeting/components": {
        "AppBindLayer.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/AppBindLayer.jsx.js",
            "isDirectory": false
        },
        "AppInfo.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/AppInfo.jsx.js",
            "isDirectory": false
        },
        "DynamicOverPriceType.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/DynamicOverPriceType.jsx.js",
            "isDirectory": false
        },
        "renderer": {
            "fullpath": "src/module/addNormalTargeting/components/renderer",
            "isDirectory": true
        },
        "UnitTree.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/UnitTree.jsx.js",
            "isDirectory": false
        }
    },
    "src/module/addNormalTargeting/config": {
        "appInfoTableConfig.js": {
            "fullpath": "src/module/addNormalTargeting/config/appInfoTableConfig.js",
            "isDirectory": false
        },
        "mainConfig.js": {
            "fullpath": "src/module/addNormalTargeting/config/mainConfig.js",
            "isDirectory": false
        }
    },
    "src/module/adManage/components": {
        "layer": {
            "fullpath": "src/module/adManage/components/layer",
            "isDirectory": true
        },
        "MaterialList.jsx.js": {
            "fullpath": "src/module/adManage/components/MaterialList.jsx.js",
            "isDirectory": false
        },
        "Navigator.jsx.js": {
            "fullpath": "src/module/adManage/components/Navigator.jsx.js",
            "isDirectory": false
        },
        "renderer": {
            "fullpath": "src/module/adManage/components/renderer",
            "isDirectory": true
        }
    },
    "src/module/adManage/config": {
        "mainConfig.js": {
            "fullpath": "src/module/adManage/config/mainConfig.js",
            "isDirectory": false
        },
        "normalTargetingMaterialFieldsConfig.js": {
            "fullpath": "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js",
            "isDirectory": false
        },
        "normalTargetingMaterialLayerConfig.js": {
            "fullpath": "src/module/adManage/config/normalTargetingMaterialLayerConfig.js",
            "isDirectory": false
        },
        "normalTargetingOperationBarConfig.js": {
            "fullpath": "src/module/adManage/config/normalTargetingOperationBarConfig.js",
            "isDirectory": false
        }
    },
    "src/module/adManage/factory": {
        "normalTargetingHomepage.jsx.js": {
            "fullpath": "src/module/adManage/factory/normalTargetingHomepage.jsx.js",
            "isDirectory": false
        }
    },
    "src/module/appManage/components": {
        "AppCard.jsx.js": {
            "fullpath": "src/module/appManage/components/AppCard.jsx.js",
            "isDirectory": false
        },
        "renderer": {
            "fullpath": "src/module/appManage/components/renderer",
            "isDirectory": true
        }
    },
    "src/module/appManage/config": {
        "mainConfig.js": {
            "fullpath": "src/module/appManage/config/mainConfig.js",
            "isDirectory": false
        }
    },
    "src/module/addNormalTargeting/components/renderer": {
        "AppIconRenderer.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/renderer/AppIconRenderer.jsx.js",
            "isDirectory": false
        },
        "AppVersionRenderer.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/renderer/AppVersionRenderer.jsx.js",
            "isDirectory": false
        },
        "ItemAlignLeftRenderer.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/renderer/ItemAlignLeftRenderer.jsx.js",
            "isDirectory": false
        },
        "ItemBigDataRenderer.jsx.js": {
            "fullpath": "src/module/addNormalTargeting/components/renderer/ItemBigDataRenderer.jsx.js",
            "isDirectory": false
        }
    },
    "src/module/adManage/components/layer": {
        "VersionInlineEditor.jsx.js": {
            "fullpath": "src/module/adManage/components/layer/VersionInlineEditor.jsx.js",
            "isDirectory": false
        }
    },
    "src/module/adManage/components/renderer": {
        "AppVersionRenderer.jsx.js": {
            "fullpath": "src/module/adManage/components/renderer/AppVersionRenderer.jsx.js",
            "isDirectory": false
        }
    },
    "src/module/appManage/components/renderer": {
        "SelectItemWithIcon.jsx.js": {
            "fullpath": "src/module/appManage/components/renderer/SelectItemWithIcon.jsx.js",
            "isDirectory": false
        }
    }
};
    var fileMapConfig = {
    "src/main.js": {
        "quoter": [],
        "deps": [
            "src/core/ajax.js",
            "src/core/util.js",
            "src/service/appAdsService/getAppVersions.js",
            "src/module/index.js"
        ]
    },
    "src/core/ajax.js": {
        "quoter": [
            "src/main.js",
            "src/service/appAdsService/getAppVersions.js",
            "src/service/appAdsService/getAppAdsList.js",
            "src/service/appAdsService/getAppBindList.js",
            "src/service/getAppList.js",
            "src/service/getAppInfo.js",
            "src/service/getPlanList.js",
            "src/service/getUnitsList.js",
            "src/service/getPlanStatus.js",
            "src/service/getUnitsStatus.js"
        ],
        "deps": []
    },
    "src/core/util.js": {
        "quoter": [
            "src/main.js",
            "src/module/adManage/Model.js",
            "src/module/adManage/Main.jsx.js",
            "src/module/appManage/Model.js",
            "src/module/addNormalTargeting/Model.js",
            "src/commonJSX/Header.jsx.js",
            "src/module/adManage/config/normalTargetingOperationBarConfig.js"
        ],
        "deps": []
    },
    "src/service/appAdsService/getAppVersions.js": {
        "quoter": [
            "src/main.js",
            "src/module/adManage/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/module/index.js": {
        "quoter": [
            "src/main.js"
        ],
        "deps": [
            "src/module/adManage/Model.js",
            "src/module/adManage/Main.jsx.js",
            "src/module/appManage/Model.js",
            "src/module/appManage/App.jsx.js",
            "src/module/addNormalTargeting/Model.js",
            "src/module/addNormalTargeting/App.jsx.js",
            "src/module/noApp/Model.js",
            "src/module/noApp/App.jsx.js"
        ]
    },
    "src/module/adManage/Model.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/core/Model.js",
            "src/core/util.js",
            "src/service/appAdsService/getAppVersions.js",
            "src/service/appAdsService/getAppAdsList.js",
            "src/service/appAdsService/getAppBindList.js",
            "src/module/adManage/config/mainConfig.js"
        ]
    },
    "src/module/adManage/Main.jsx.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/core/util.js",
            "src/core/flags.js",
            "src/commonJSX/Header.jsx.js",
            "src/commonJSX/Footer.jsx.js",
            "src/module/adManage/components/Navigator.jsx.js",
            "src/module/adManage/factory/normalTargetingHomepage.jsx.js"
        ]
    },
    "src/module/appManage/Model.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/core/Model.js",
            "src/core/util.js",
            "src/service/getAppList.js",
            "src/commonConfig/appStateDialogConfig.js"
        ]
    },
    "src/module/appManage/App.jsx.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/commonJSX/Header.jsx.js",
            "src/commonJSX/Footer.jsx.js",
            "src/module/appManage/components/AppCard.jsx.js"
        ]
    },
    "src/module/addNormalTargeting/Model.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/core/Model.js",
            "src/service/getAppInfo.js",
            "src/service/getPlanList.js",
            "src/service/getUnitsList.js",
            "src/service/getPlanStatus.js",
            "src/service/getUnitsStatus.js",
            "src/core/util.js"
        ]
    },
    "src/module/addNormalTargeting/App.jsx.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/commonJSX/Footer.jsx.js",
            "src/commonJSX/Header.jsx.js",
            "src/module/addNormalTargeting/components/AppInfo.jsx.js",
            "src/module/addNormalTargeting/components/AppBindLayer.jsx.js",
            "src/module/addNormalTargeting/components/DynamicOverPriceType.jsx.js"
        ]
    },
    "src/module/noApp/Model.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/core/Model.js"
        ]
    },
    "src/module/noApp/App.jsx.js": {
        "quoter": [
            "src/module/index.js"
        ],
        "deps": [
            "src/commonJSX/Header.jsx.js",
            "src/commonJSX/Footer.jsx.js"
        ]
    },
    "src/core/Model.js": {
        "quoter": [
            "src/module/adManage/Model.js",
            "src/module/appManage/Model.js",
            "src/module/addNormalTargeting/Model.js",
            "src/module/noApp/Model.js"
        ],
        "deps": []
    },
    "src/service/appAdsService/getAppAdsList.js": {
        "quoter": [
            "src/module/adManage/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/service/appAdsService/getAppBindList.js": {
        "quoter": [
            "src/module/adManage/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/module/adManage/config/mainConfig.js": {
        "quoter": [
            "src/module/adManage/Model.js",
            "src/module/adManage/components/Navigator.jsx.js",
            "src/module/adManage/components/MaterialList.jsx.js",
            "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js"
        ],
        "deps": []
    },
    "src/core/flags.js": {
        "quoter": [
            "src/module/adManage/Main.jsx.js"
        ],
        "deps": []
    },
    "src/commonJSX/Header.jsx.js": {
        "quoter": [
            "src/module/adManage/Main.jsx.js",
            "src/module/appManage/App.jsx.js",
            "src/module/addNormalTargeting/App.jsx.js",
            "src/module/noApp/App.jsx.js"
        ],
        "deps": [
            "src/core/util.js"
        ]
    },
    "src/commonJSX/Footer.jsx.js": {
        "quoter": [
            "src/module/adManage/Main.jsx.js",
            "src/module/appManage/App.jsx.js",
            "src/module/addNormalTargeting/App.jsx.js",
            "src/module/noApp/App.jsx.js"
        ],
        "deps": []
    },
    "src/module/adManage/components/Navigator.jsx.js": {
        "quoter": [
            "src/module/adManage/Main.jsx.js"
        ],
        "deps": [
            "src/module/adManage/config/mainConfig.js"
        ]
    },
    "src/module/adManage/factory/normalTargetingHomepage.jsx.js": {
        "quoter": [
            "src/module/adManage/Main.jsx.js"
        ],
        "deps": [
            "src/commonJSX/OperationBar.jsx.js",
            "src/module/adManage/components/MaterialList.jsx.js",
            "src/module/adManage/config/normalTargetingOperationBarConfig.js",
            "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js"
        ]
    },
    "src/service/getAppList.js": {
        "quoter": [
            "src/module/appManage/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/commonConfig/appStateDialogConfig.js": {
        "quoter": [
            "src/module/appManage/Model.js"
        ],
        "deps": []
    },
    "src/module/appManage/components/AppCard.jsx.js": {
        "quoter": [
            "src/module/appManage/App.jsx.js"
        ],
        "deps": [
            "src/module/appManage/components/renderer/SelectItemWithIcon.jsx.js",
            "src/module/appManage/config/mainConfig.js"
        ]
    },
    "src/service/getAppInfo.js": {
        "quoter": [
            "src/module/addNormalTargeting/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/service/getPlanList.js": {
        "quoter": [
            "src/module/addNormalTargeting/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/service/getUnitsList.js": {
        "quoter": [
            "src/module/addNormalTargeting/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/service/getPlanStatus.js": {
        "quoter": [
            "src/module/addNormalTargeting/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/service/getUnitsStatus.js": {
        "quoter": [
            "src/module/addNormalTargeting/Model.js"
        ],
        "deps": [
            "src/core/ajax.js"
        ]
    },
    "src/module/addNormalTargeting/components/AppInfo.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/App.jsx.js"
        ],
        "deps": [
            "src/module/addNormalTargeting/config/appInfoTableConfig.js"
        ]
    },
    "src/module/addNormalTargeting/components/AppBindLayer.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/App.jsx.js"
        ],
        "deps": [
            "src/module/addNormalTargeting/components/UnitTree.jsx.js"
        ]
    },
    "src/module/addNormalTargeting/components/DynamicOverPriceType.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/App.jsx.js"
        ],
        "deps": []
    },
    "src/commonJSX/OperationBar.jsx.js": {
        "quoter": [
            "src/module/adManage/factory/normalTargetingHomepage.jsx.js"
        ],
        "deps": []
    },
    "src/module/adManage/components/MaterialList.jsx.js": {
        "quoter": [
            "src/module/adManage/factory/normalTargetingHomepage.jsx.js"
        ],
        "deps": [
            "src/module/adManage/config/mainConfig.js",
            "src/module/adManage/config/normalTargetingMaterialLayerConfig.js"
        ]
    },
    "src/module/adManage/config/normalTargetingOperationBarConfig.js": {
        "quoter": [
            "src/module/adManage/factory/normalTargetingHomepage.jsx.js"
        ],
        "deps": [
            "src/core/util.js"
        ]
    },
    "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js": {
        "quoter": [
            "src/module/adManage/factory/normalTargetingHomepage.jsx.js"
        ],
        "deps": [
            "src/module/adManage/config/mainConfig.js",
            "src/commonJSX/renderer/TableFilterHeader.jsx.js",
            "src/commonJSX/renderer/TableLinkRenderer.jsx.js",
            "src/module/adManage/components/renderer/AppVersionRenderer.jsx.js"
        ]
    },
    "src/module/appManage/components/renderer/SelectItemWithIcon.jsx.js": {
        "quoter": [
            "src/module/appManage/components/AppCard.jsx.js"
        ],
        "deps": []
    },
    "src/module/appManage/config/mainConfig.js": {
        "quoter": [
            "src/module/appManage/components/AppCard.jsx.js"
        ],
        "deps": []
    },
    "src/module/addNormalTargeting/config/appInfoTableConfig.js": {
        "quoter": [
            "src/module/addNormalTargeting/components/AppInfo.jsx.js"
        ],
        "deps": [
            "src/module/addNormalTargeting/components/renderer/AppIconRenderer.jsx.js",
            "src/module/addNormalTargeting/components/renderer/ItemAlignLeftRenderer.jsx.js",
            "src/module/addNormalTargeting/components/renderer/AppVersionRenderer.jsx.js",
            "src/module/addNormalTargeting/components/renderer/ItemBigDataRenderer.jsx.js",
            "src/module/addNormalTargeting/config/mainConfig.js"
        ]
    },
    "src/module/addNormalTargeting/components/UnitTree.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/components/AppBindLayer.jsx.js"
        ],
        "deps": []
    },
    "src/module/adManage/config/normalTargetingMaterialLayerConfig.js": {
        "quoter": [
            "src/module/adManage/components/MaterialList.jsx.js"
        ],
        "deps": [
            "src/module/adManage/components/layer/VersionInlineEditor.jsx.js",
            "src/commonJSX/layer/CheckBoxList.jsx.js",
            "src/commonJSX/layer/CheckBoxList.jsx.js"
        ]
    },
    "src/commonJSX/renderer/TableFilterHeader.jsx.js": {
        "quoter": [
            "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js"
        ],
        "deps": []
    },
    "src/commonJSX/renderer/TableLinkRenderer.jsx.js": {
        "quoter": [
            "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js"
        ],
        "deps": []
    },
    "src/module/adManage/components/renderer/AppVersionRenderer.jsx.js": {
        "quoter": [
            "src/module/adManage/config/normalTargetingMaterialFieldsConfig.js"
        ],
        "deps": []
    },
    "src/module/addNormalTargeting/components/renderer/AppIconRenderer.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/config/appInfoTableConfig.js"
        ],
        "deps": []
    },
    "src/module/addNormalTargeting/components/renderer/ItemAlignLeftRenderer.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/config/appInfoTableConfig.js"
        ],
        "deps": []
    },
    "src/module/addNormalTargeting/components/renderer/AppVersionRenderer.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/config/appInfoTableConfig.js"
        ],
        "deps": []
    },
    "src/module/addNormalTargeting/components/renderer/ItemBigDataRenderer.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/config/appInfoTableConfig.js"
        ],
        "deps": [
            "src/commonJSX/MassWordShow.jsx.js"
        ]
    },
    "src/module/addNormalTargeting/config/mainConfig.js": {
        "quoter": [
            "src/module/addNormalTargeting/config/appInfoTableConfig.js"
        ],
        "deps": []
    },
    "src/module/adManage/components/layer/VersionInlineEditor.jsx.js": {
        "quoter": [
            "src/module/adManage/config/normalTargetingMaterialLayerConfig.js"
        ],
        "deps": []
    },
    "src/commonJSX/layer/CheckBoxList.jsx.js": {
        "quoter": [
            "src/module/adManage/config/normalTargetingMaterialLayerConfig.js"
        ],
        "deps": []
    },
    "src/commonJSX/MassWordShow.jsx.js": {
        "quoter": [
            "src/module/addNormalTargeting/components/renderer/ItemBigDataRenderer.jsx.js"
        ],
        "deps": []
    }
};
    return {fileTreeConfig: fileTreeConfig, fileMapConfig: fileMapConfig};
});