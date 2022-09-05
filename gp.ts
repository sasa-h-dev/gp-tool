import * as fs from "fs";
import { exec } from "child_process";

interface PackageType {
  /** \<name>XXX\</name> */
  name: string;
  /** \<members>XXX\</members> if * string; else string[]*/
  members?: string | string[];
}

// metadata types that accept * reg exp
const acceptWildcardTypeList = [
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

async function start() {
  /** save all data to this */
  let mainPackageTypeList: PackageType[];

  // 1.get all Metadata Types
  console.log(`Get All Metadata Types`);
  mainPackageTypeList = await getAllMetadataTypes();

  // 2.loop all MetadataTypes get type detail to set object for create package.xml
  mainPackageTypeList = await getTypesDetail(mainPackageTypeList);

  // 3.create file
  generatePackageXML(mainPackageTypeList);
}

start();

/**
 * @description getAllMetadataTypes
 * @return {PackageType[]} mainPackageTypeList
 */
async function getAllMetadataTypes(): Promise<PackageType[]> {
  const resListMetadata = await execSfdcCommandReturnJson(
    "sfdx force:mdapi:describemetadata -a 53.0 --json"
  );

  const metadataObjList: [] = resListMetadata["metadataObjects"];

  return metadataObjList
    .map((item) => {
      return {
        name: item["xmlName"],
        members: acceptWildcardTypeList.includes(item["xmlName"]) ? "*" : ""
      };
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

/**
 * @description getTypesDetail
 * @return {PackageType[]} mainPackageTypeList
 */
async function getTypesDetail(
  mainPackageTypeList: PackageType[]
): Promise<PackageType[]> {
  const typeDetailPromiseList: Promise<any>[] = [];

  // loop all MetadataTypes get type detail
  mainPackageTypeList.forEach(async (packageType: PackageType) => {
    console.log(`Get Metadata Detail: ${packageType.name}`);
    // metadata types that don't accept * reg exp
    if (packageType.members !== "*") {
      // call listmetadata
      typeDetailPromiseList.push(
        execSfdcCommandReturnJson(
          `sfdx force:mdapi:listmetadata --json -a 53.0 -m ${packageType.name}`
        )
      );
    }
  });

  const resTypeDetailPromiseList: [][] = await Promise.all(
    typeDetailPromiseList
  );

  // set object for create package.xml
  const packageTypeCallOutList = mainPackageTypeList.filter(
    // metadata types that can not accept * reg exp
    (item: PackageType) => item.members !== "*"
  );
  packageTypeCallOutList.forEach(async (packageType: PackageType) => {
    console.log("Dealing With The Metadata Type: " + packageType.name);
    // filter the save type packageType detail
    const sameTypeList = resTypeDetailPromiseList
      .filter((typeDetail: []) => {
        if (typeDetail.length === 0) {
          return false;
        }
        return typeDetail.every(
          (members) => members["type"] === packageType.name
        );
      })
      .shift();

    // set members
    packageType.members = sameTypeList
      ?.map((child) => child["fullName"])
      .sort();
  });

  // Report: get by other way
  const reportMembers = await getReportMembers();
  mainPackageTypeList.forEach((item) => {
    if (item.name === "Report") {
      item.members = reportMembers;
    }
  });

  // Dashboard: get by other way
  const dashboardMembers = await getDashboardMembers();
  mainPackageTypeList.forEach((item) => {
    if (item.name === "Dashboard") {
      item.members = dashboardMembers;
    }
  });

  // EmailTemplate: get by other way
  const emailTemplateMembers = await getEmailTemplateMembers();
  mainPackageTypeList.forEach((item) => {
    if (item.name === "EmailTemplate") {
      item.members = emailTemplateMembers;
    }
  });

  return mainPackageTypeList;
}

/**
 * @descript generatePackageXML
 * @param {PackageType[]} mainPackageTypeList
 */
function generatePackageXML(mainPackageTypeList: PackageType[]) {
  console.log("Generating PackageXML...");

  const PACKAGE_START =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
    '<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n';
  const TYPES_START = "<types>";
  const TYPES_END = "</types>";
  const MEMBERS_START = "<members>";
  const MEMBERS_END = "</members>";
  const NAME_START = "<name>";
  const NAME_END = "</name>";
  const VERSION_START = "<version>";
  const VERSION_END = "</version>";
  const PACKAGE_END = "</Package>";
  const NEW_LINE = "\n";
  const VERSION_NUM = "53.0";
  const CHAR_TAB = "\t";

  // create package.xml string
  let xmlString = "";
  xmlString += PACKAGE_START;

  mainPackageTypeList.forEach((packageType) => {
    console.log(`Creating For Type: ${packageType.name}`);
    xmlString += CHAR_TAB + TYPES_START + NEW_LINE;
    if (packageType.members === "*") {
      xmlString +=
        CHAR_TAB +
        CHAR_TAB +
        MEMBERS_START +
        packageType.members +
        MEMBERS_END +
        NEW_LINE;
    } else {
      (packageType.members as string[])?.forEach((member) => {
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
  const nowDate = new Date();
  const timestomp =
    nowDate
      .toLocaleDateString()
      .split("/")
      .map((i) => i.padStart(2, "0"))
      .join("") +
    nowDate
      .toLocaleTimeString()
      .split(":")
      .map((i) => i.padStart(2, "0"))
      .join("");

  const filePath = `./manifest/package${timestomp}.xml`;
  fs.writeFile(filePath, xmlString, (err) => {
    if (err) {
      console.log("writeFile Error: ", err);
    }
  });

  console.log(`PackageXML Successfully Generated ${filePath}`);
}

/**
 * @descript execSfdcCommandReturnJson
 * @param {string} command
 */
async function execSfdcCommandReturnJson(command: string): Promise<any> {
  return new Promise(async (resolve) => {
    const process = exec(command, {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 6
    });

    process.stdout?.on("data", (data) => {
      const response = JSON.parse(data);
      // if Error (get all Metadata Types)
      if (response.status !== 0) {
        throw new Error(`Error:${response.message}`);
      }
      resolve(response["result"]);
    });
    process.on("exit", (err) => resolve(err));
    process.on("close", (err) => resolve(err));
  });
}

/**
 * @descript getReportMembers
 * @param {Promise<any>} report's members
 */
async function getReportMembers(): Promise<any> {
  const queryString = `sfdx force:data:soql:query -q "SELECT Id, FolderName, DeveloperName FROM Report WHERE FolderName <> 'Private Reports' ORDER BY FolderName" --perflog --json`;
  const result = await execSfdcCommandReturnJson(queryString);

  return result.records?.map((r) => {
    const folderName =
      r["FolderName"] === "Public Reports" ? "unfiled$public" : r["FolderName"];
    return `${folderName}/${r["DeveloperName"]}`;
  });
}

/**
 * @descript getDashboardMembers
 * @param {Promise<any>} Dashboard's members
 */
async function getDashboardMembers(): Promise<any> {
  const queryString = `sfdx force:data:soql:query -q "SELECT Id, FolderName, DeveloperName FROM Dashboard WHERE FolderName <> 'Private Dashboards' ORDER BY FolderName" --perflog --json`;
  const result = await execSfdcCommandReturnJson(queryString);

  return result.records?.map((record) => {
    const folderName =
      record["FolderName"] === "Public Dashboards"
        ? "unfiled$public"
        : record["FolderName"];
    return `${folderName}/${record["DeveloperName"]}`;
  });
}

/**
 * @descript getEmailTemplateMembers
 * @param {Promise<any>} EmailTemplate's members
 */
async function getEmailTemplateMembers(): Promise<any> {
  const queryString = `sfdx force:data:soql:query -q "SELECT Id, FolderName, DeveloperName FROM EmailTemplate ORDER BY FolderName" --perflog --json`;
  const result = await execSfdcCommandReturnJson(queryString);

  return result.records?.map((record) => {
    const folderName =
      record["FolderName"] === "Unfiled Public Classic Email Templates"
        ? "unfiled$public"
        : record["FolderName"];
    return `${folderName}/${record["DeveloperName"]}`;
  });
}
