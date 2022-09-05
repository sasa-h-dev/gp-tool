List<Report> reportList = [SELECT Id, FolderName, DeveloperName FROM Report WHERE FolderName <> 'Private Reports' ORDER BY FolderName] ;

// 
// SELECT Id,Description,DeveloperName,FolderName,Format,IsDeleted,LastReferencedDate,LastRunDate,LastViewedDate,Name,NamespacePrefix,OwnerId FROM Report 

// 未整理公開フォルダのレポート
// レポートフォルダの一意名/レポートの一意名
System.debug('---start---');
for(Report r : reportList){
    System.debug('<members>' + r.FolderName+'/' + r.DeveloperName+'</members>' );
}
System.debug('---end---');