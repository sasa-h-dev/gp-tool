"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var child_process_1 = require("child_process");
// metadata types that accept * reg exp
var acceptWildcardTypeList = [
    "AccountRelationshipShareRule",
    "ActionLinkGroupTemplate",
    "ApexClass",
    "ApexComponent",
    "ApexPage",
    "ApexTrigger",
    "AppMenu",
    "ApprovalProcess",
    "ArticleType",
    "AssignmentRules",
    "Audience",
    "AuthProvider",
    "AuraDefinitionBundle",
    "AutoResponseRules",
    "Bot",
    "BrandingSet",
    "CallCenter",
    "Certificate",
    "CleanDataService",
    "CMSConnectSource",
    "Community",
    "CommunityTemplateDefinition",
    "CommunityThemeDefinition",
    "CompactLayout",
    "ConnectedApp",
    "ContentAsset",
    "CorsWhitelistOrigin",
    "CustomApplication",
    "CustomApplicationComponent",
    "CustomFeedFilter",
    "CustomHelpMenuSection",
    "CustomMetadata",
    "CustomLabels",
    "CustomObjectTranslation",
    "CustomPageWebLink",
    "CustomPermission",
    "CustomSite",
    "CustomTab",
    "DataCategoryGroup",
    "DelegateGroup",
    "DuplicateRule",
    "EclairGeoData",
    "EntitlementProcess",
    "EntitlementTemplate",
    "EventDelivery",
    "EventSubscription",
    "ExternalServiceRegistration",
    "ExternalDataSource",
    "FeatureParameterBoolean",
    "FeatureParameterDate",
    "FeatureParameterInteger",
    "FieldSet",
    "FlexiPage",
    "Flow",
    "FlowCategory",
    "FlowDefinition",
    "GlobalValueSet",
    "GlobalValueSetTranslation",
    "Group",
    "HomePageComponent",
    "HomePageLayout",
    "InstalledPackage",
    "KeywordList",
    "Layout",
    "LightningBolt",
    "LightningComponentBundle",
    "LightningExperienceTheme",
    "LiveChatAgentConfig",
    "LiveChatButton",
    "LiveChatDeployment",
    "LiveChatSensitiveDataRule",
    "ManagedTopics",
    "MatchingRules",
    "MilestoneType",
    "MlDomain",
    "ModerationRule",
    "NamedCredential",
    "Network",
    "NetworkBranding",
    "PathAssistant",
    "PermissionSet",
    "PlatformCachePartition",
    "Portal",
    "PostTemplate",
    "PresenceDeclineReason",
    "PresenceUserConfig",
    "Profile",
    "ProfilePasswordPolicy",
    "ProfileSessionSetting",
    "Queue",
    "QueueRoutingConfig",
    "QuickAction",
    "RecommendationStrategy",
    "RecordActionDeployment",
    "ReportType",
    "Role",
    "SamlSsoConfig",
    "Scontrol",
    "ServiceChannel",
    "ServicePresenceStatus",
    "SharingRules",
    "SharingSet",
    "SiteDotCom",
    "Skill",
    "StandardValueSetTranslation",
    "StaticResource",
    "SynonymDictionary",
    "Territory",
    "Territory2",
    "Territory2Model",
    "Territory2Rule",
    "Territory2Type",
    "TopicsForObjects",
    "TransactionSecurityPolicy",
    "Translations",
    "WaveApplication",
    "WaveDashboard",
    "WaveDataflow",
    "WaveDataset",
    "WaveLens",
    "WaveTemplateBundle",
    "WaveXmd",
    "Workflow",
    "ActionPlanTemplate",
    "AnimationRule",
    "ChannelLayout",
    "ApexTestSuite",
    "AppointmentSchedulingPolicy",
    "CampaignInfluenceModel",
    "ChatterExtension",
    "CspTrustedSite",
    "CompactLayout",
    "ExperienceBundle",
    "LightningMessageChannel",
    "MyDomainDiscoverableLogin",
    "NavigationMenu",
    "OauthCustomScope",
    "PaymentGatewayProvider",
    "PlatformEventChannel",
    "PlatformEventChannelMember",
    "Prompt",
    "RedirectWhitelistUrl",
    "Settings",
    "TimeSheetTemplate",
    "WaveRecipe",
    "WorkSkillRouting"
];
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var mainPackageTypeList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 1.get all Metadata Types
                    console.log("Get All Metadata Types");
                    return [4 /*yield*/, getAllMetadataTypes()];
                case 1:
                    mainPackageTypeList = _a.sent();
                    return [4 /*yield*/, getTypesDetail(mainPackageTypeList)];
                case 2:
                    // 2.loop all MetadataTypes get type detail to set object for create package.xml
                    mainPackageTypeList = _a.sent();
                    // 3.create file
                    generatePackageXML(mainPackageTypeList);
                    return [2 /*return*/];
            }
        });
    });
}
start();
/**
 * @description getAllMetadataTypes
 * @return {PackageType[]} mainPackageTypeList
 */
function getAllMetadataTypes() {
    return __awaiter(this, void 0, void 0, function () {
        var resListMetadata, metadataObjList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execSfdcCommandReturnJson("sfdx force:mdapi:describemetadata -a 53.0 --json")];
                case 1:
                    resListMetadata = _a.sent();
                    metadataObjList = resListMetadata["metadataObjects"];
                    return [2 /*return*/, metadataObjList
                            .map(function (item) {
                            return {
                                name: item["xmlName"],
                                members: acceptWildcardTypeList.includes(item["xmlName"]) ? "*" : ""
                            };
                        })
                            .sort(function (a, b) { return (a.name > b.name ? 1 : -1); })];
            }
        });
    });
}
/**
 * @description getTypesDetail
 * @return {PackageType[]} mainPackageTypeList
 */
function getTypesDetail(mainPackageTypeList) {
    return __awaiter(this, void 0, void 0, function () {
        var typeDetailPromiseList, resTypeDetailPromiseList, packageTypeCallOutList, reportMembers, dashboardMembers, emailTemplateMembers;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    typeDetailPromiseList = [];
                    // loop all MetadataTypes get type detail
                    mainPackageTypeList.forEach(function (packageType) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log("Get Metadata Detail: ".concat(packageType.name));
                            // metadata types that don't accept * reg exp
                            if (packageType.members !== "*") {
                                // call listmetadata
                                typeDetailPromiseList.push(execSfdcCommandReturnJson("sfdx force:mdapi:listmetadata --json -a 53.0 -m ".concat(packageType.name)));
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(typeDetailPromiseList)];
                case 1:
                    resTypeDetailPromiseList = _a.sent();
                    packageTypeCallOutList = mainPackageTypeList.filter(
                    // metadata types that can not accept * reg exp
                    function (item) { return item.members !== "*"; });
                    packageTypeCallOutList.forEach(function (packageType) { return __awaiter(_this, void 0, void 0, function () {
                        var sameTypeList;
                        return __generator(this, function (_a) {
                            console.log("Dealing With The Metadata Type: " + packageType.name);
                            sameTypeList = resTypeDetailPromiseList
                                .filter(function (typeDetail) {
                                if (typeDetail.length === 0) {
                                    return false;
                                }
                                return typeDetail.every(function (members) { return members["type"] === packageType.name; });
                            })
                                .shift();
                            // set members
                            packageType.members = sameTypeList === null || sameTypeList === void 0 ? void 0 : sameTypeList.map(function (child) { return child["fullName"]; }).sort();
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, getReportMembers()];
                case 2:
                    reportMembers = _a.sent();
                    mainPackageTypeList.forEach(function (item) {
                        if (item.name === "Report") {
                            item.members = reportMembers;
                        }
                    });
                    return [4 /*yield*/, getDashboardMembers()];
                case 3:
                    dashboardMembers = _a.sent();
                    mainPackageTypeList.forEach(function (item) {
                        if (item.name === "Dashboard") {
                            item.members = dashboardMembers;
                        }
                    });
                    return [4 /*yield*/, getEmailTemplateMembers()];
                case 4:
                    emailTemplateMembers = _a.sent();
                    mainPackageTypeList.forEach(function (item) {
                        if (item.name === "EmailTemplate") {
                            item.members = emailTemplateMembers;
                        }
                    });
                    return [2 /*return*/, mainPackageTypeList];
            }
        });
    });
}
/**
 * @descript generatePackageXML
 * @param {PackageType[]} mainPackageTypeList
 */
function generatePackageXML(mainPackageTypeList) {
    console.log("Generating PackageXML...");
    var PACKAGE_START = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        '<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n';
    var TYPES_START = "<types>";
    var TYPES_END = "</types>";
    var MEMBERS_START = "<members>";
    var MEMBERS_END = "</members>";
    var NAME_START = "<name>";
    var NAME_END = "</name>";
    var VERSION_START = "<version>";
    var VERSION_END = "</version>";
    var PACKAGE_END = "</Package>";
    var NEW_LINE = "\n";
    var VERSION_NUM = "53.0";
    var CHAR_TAB = "\t";
    // create package.xml string
    var xmlString = "";
    xmlString += PACKAGE_START;
    mainPackageTypeList.forEach(function (packageType) {
        var _a;
        console.log("Creating For Type: ".concat(packageType.name));
        xmlString += CHAR_TAB + TYPES_START + NEW_LINE;
        if (packageType.members === "*") {
            xmlString +=
                CHAR_TAB +
                    CHAR_TAB +
                    MEMBERS_START +
                    packageType.members +
                    MEMBERS_END +
                    NEW_LINE;
        }
        else {
            (_a = packageType.members) === null || _a === void 0 ? void 0 : _a.forEach(function (member) {
                xmlString +=
                    CHAR_TAB + CHAR_TAB + MEMBERS_START + member + MEMBERS_END + NEW_LINE;
            });
        }
        xmlString +=
            CHAR_TAB + CHAR_TAB + NAME_START + packageType.name + NAME_END + NEW_LINE;
        xmlString += CHAR_TAB + TYPES_END + NEW_LINE;
    });
    xmlString += CHAR_TAB + VERSION_START + VERSION_NUM + VERSION_END + NEW_LINE;
    xmlString += PACKAGE_END;
    // generate package.xml file
    var nowDate = new Date();
    var timestomp = nowDate
        .toLocaleDateString()
        .split("/")
        .map(function (i) { return i.padStart(2, "0"); })
        .join("") +
        nowDate
            .toLocaleTimeString()
            .split(":")
            .map(function (i) { return i.padStart(2, "0"); })
            .join("");
    var filePath = "./manifest/package".concat(timestomp, ".xml");
    fs.writeFile(filePath, xmlString, function (err) {
        if (err) {
            console.log("writeFile Error: ", err);
        }
    });
    console.log("PackageXML Successfully Generated ".concat(filePath));
}
/**
 * @descript execSfdcCommandReturnJson
 * @param {string} command
 */
function execSfdcCommandReturnJson(command) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var process;
                    var _a;
                    return __generator(this, function (_b) {
                        process = (0, child_process_1.exec)(command, {
                            encoding: "utf8",
                            maxBuffer: 1024 * 1024 * 6
                        });
                        (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                            var response = JSON.parse(data);
                            // if Error (get all Metadata Types)
                            if (response.status !== 0) {
                                throw new Error("Error:".concat(response.message));
                            }
                            resolve(response["result"]);
                        });
                        process.on("exit", function (err) { return resolve(err); });
                        process.on("close", function (err) { return resolve(err); });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
/**
 * @descript getReportMembers
 * @param {Promise<any>} report's members
 */
function getReportMembers() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var queryString, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryString = "sfdx force:data:soql:query -q \"SELECT Id, FolderName, DeveloperName FROM Report WHERE FolderName <> 'Private Reports' ORDER BY FolderName\" --perflog --json";
                    return [4 /*yield*/, execSfdcCommandReturnJson(queryString)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, (_a = result.records) === null || _a === void 0 ? void 0 : _a.map(function (r) {
                            var folderName = r["FolderName"] === "Public Reports" ? "unfiled$public" : r["FolderName"];
                            return "".concat(folderName, "/").concat(r["DeveloperName"]);
                        })];
            }
        });
    });
}
/**
 * @descript getDashboardMembers
 * @param {Promise<any>} Dashboard's members
 */
function getDashboardMembers() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var queryString, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryString = "sfdx force:data:soql:query -q \"SELECT Id, FolderName, DeveloperName FROM Dashboard WHERE FolderName <> 'Private Dashboards' ORDER BY FolderName\" --perflog --json";
                    return [4 /*yield*/, execSfdcCommandReturnJson(queryString)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, (_a = result.records) === null || _a === void 0 ? void 0 : _a.map(function (record) {
                            var folderName = record["FolderName"] === "Public Dashboards"
                                ? "unfiled$public"
                                : record["FolderName"];
                            return "".concat(folderName, "/").concat(record["DeveloperName"]);
                        })];
            }
        });
    });
}
/**
 * @descript getEmailTemplateMembers
 * @param {Promise<any>} EmailTemplate's members
 */
function getEmailTemplateMembers() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var queryString, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryString = "sfdx force:data:soql:query -q \"SELECT Id, FolderName, DeveloperName FROM EmailTemplate ORDER BY FolderName\" --perflog --json";
                    return [4 /*yield*/, execSfdcCommandReturnJson(queryString)];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, (_a = result.records) === null || _a === void 0 ? void 0 : _a.map(function (record) {
                            var folderName = record["FolderName"] === "Unfiled Public Classic Email Templates"
                                ? "unfiled$public"
                                : record["FolderName"];
                            return "".concat(folderName, "/").concat(record["DeveloperName"]);
                        })];
            }
        });
    });
}
