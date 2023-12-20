// Main file

/**
 * Read README.md before looking into the code
 * Lire README.md avant de regarder le code
 */


// Variables

var error404 = "Error 404: Not found"
var date = new Date
var ss = SpreadsheetApp.getActiveSpreadsheet()

// code

class Employee {
  /**
   * Create a new employee instance
   * 
   * @param {number} id - OPTIONAL:The id of the employee
   * @param {string} department - MANDATORY: The department sheet of the employee
   * @param {string} job - OPT: The job of the employee
   * @param {number} row - MAND: The row of the employee
   * 
   */
  constructor(id,department,job,row){
    this.row = row
    this.job = job
    this.department = department 
    this.id = id
  }
  
  get nom() {
    if(this.row != null){
    return ss.getSheetByName(this.department).getRange(this.row,3).getValue()
    }else if(this.id != null){
      var row = searchUser(this.id,this.department)
      if(row == error404){
        Logger.log("Error 404: No user with this id was found")
        return error404
      }else{
      return ss.getSheetByName(this.department).getRange(row,3).getValue()
      }
    }else if(this.job != null){
      var row = searchJob(this.job,this.department)
      if(row == error404){
       Logger.log("Error 404: No user with this job was found")
       return error404
      }else{
      return ss.getSheetByName(this.division).getRange(row,3).getValue()
    }
    }else{
      throw SyntaxError("Please specify at least one information; Row,id or job.")
    }
  }
  get prenom() {
   if(this.row != null){
      return ss.getSheetByName(this.department).getRange(this.row,4).getValue()
    }else if(this.id != null){
      var row = searchUser(this.id,this.department)
      if(row == error404){
        Logger.log("Error 404: No user with this id was found")
        return error404
      }else{
      return ss.getSheetByName(this.department).getRange(row,4).getValue()
      }
    }else if(this.job != null){
      var row = searchJob(this.job,this.department)
      if(row == error404){
       Logger.log("Error 404: No user with this rank was found")
       return error404
      }else{
      return ss.getSheetByName(this.department).getRange(row,4).getValue()
      }
    } else {
      throw SyntaxError("Please specify at least one information; Row, id or job.")
    }
  }
  get Job() {
   if(this.row != null){
     return ss.getSheetByName(this.department).getRange(this.row,2).getValue()
    }else if(this.id != null){
      var row = searchUser(this.id,this.department)
      if(row == error404){
        Logger.log("Error 404: No user with this callsign was found")
        return error404
      }else{
      return ss.getSheetByName(this.department).getRange(row,2).getValue()
      }
    }else if(this.job != null){
      return this.job
    }else{
      throw SyntaxError("Error 404: Please specify at least one information: row,id or job")
    }
  }
  
  get ID() {
   if(this.row != null){
    return ss.getSheetByName(this.department).getRange(this.row,1).getValue()
   }else if(this.job != null){
     var row = searchJob(this.id,this.department)
     if(row == error404){
      Logger.log("Error 404: No user with this rank was found")
      return error404
     }else{
      return ss.getSheetByName(this.department).getRange(row,1).getValue()
     }
   }else if(this.id != null){
    return this.id
   }else{
    throw SyntaxError("Error 404; Please specify at least one information: row, id or job")
   }
  }
  get email(){
   if(this.row != null){
    return ss.getSheetByName(this.department).getRange(this.row,6).getValue()
   }else if(this.id != null){
    var row = searchUser(this.id,this.department)
    if(row == error404){
     Logger.log("Error 404: No user with this id was found")
     return error404
    }else{
      return ss.getSheetByName(this.department).getRange(row,6).getValue()
    }
   }else if(this.job != null){
    var row = searchJob(this.job,this.department)
    if(row == error404){
      Logger.log("Error 404: No user with this job was found")
      return error404
    }else{
      return ss.getSheetByName(this.department).getRange(row,6).getValue()
    }
   }else{
    throw SyntaxError("Error 404: Please specify at least one information: row, id or job")
   }
  }
  get tel(){
    if(this.row != null){
      return ss.getSheetByName(this.department).getRange(this.row,2).getValue()
    }else if(this.job != null){
      var row = searchJob(this.job,this.department)
      if(row == error404){
        Logger.log("Error 404: No user with this job was found")
        return error404
      }else{
        return ss.getSheetByName(this.department).getRange(row,5).getValue()
      }
    }else if(this.id != null){
      var row = searchUser(this.id,this.department)
      if(row == error404){
        Logger.log("Error 404: No user with this ID was found")
      }else{
        return ss.getSheetByName(this.department).getRange(row,5).getValue()
      }
    }else{
      throw SyntaxError("Error 404: Please specify at least one information: row,id or job")
    }
  }
  push(id,job,nom,prenom,tel,mail,department){
   
    var sheet = ss.getSheetByName(department)
    var row = searchJob(job,department)
    var maxcolumns = sheet.getMaxColumns()
    if(row == error404){
      Logger.log("Error 404: No rank named like this exist")
      return error404
    }else{
      sheet.appendRow([id,job,nom,prenom,tel,mail
      ])
      var maxRows = sheet.getMaxRows()
      sheet.moveRows(sheet.getRange(maxRows,maxcolumns),row)
      sheet.getRange("A9:" + sheet.getRange(9,maxcolumns).getA1Notation()).copyFormatToRange(sheet.getSheetId(),1,maxcolumns,row,row + 1)
      Logger.log("Sucessfully added " + prenom +" "+ nom + " to the roster in row " + row)
    }}
    remove(id,department){

      var sheet = ss.getSheetByName(department)
      var row = searchUser(id,department)
      if(row == error404){
        Logger.log("Error 404: No user with this id was found")
        return error404
      }else{
        sheet.deleteRow(row)
        Logger.log("Sucessfully deleted")
      }
    }
  
}

function doGet(e) {

  // Handle GET request

  var log = "Processed at: " + date + ".";
  Logger.log(log)
  var action = e.parameter.action // Get what action was ran
  
 switch(action){

  case "searchUser":
 
   var queryId = e.parameter.id; 
   var queryDepartment = e.parameter.department 

  if(searchUser(queryId,queryDepartment) != error404){
   var user = new Employee(queryId,queryDepartment)
   var output = "\n" + "\nNom: " + user.nom + "\nPrenom: " + user.prenom + "\nJob: " + user.Job + "\nMail: " + user.mail + "\nID: " + user.ID + "\ntel:" + user.tel + "\n" 
   Logger.log(output)
   return ContentService.createTextOutput(log + output).setMimeType(ContentService.MimeType.TEXT)
  }else{
    var err = "Error 404:  Not found: No user in " + queryDepartment + " had the " + queryId + " ID."
    return ContentService.createTextOutput(err).setMimeType(ContentService.MimeType.TEXT);
  }
  break

  default: 
   var error = "Error: HTTP request action option was not recognized. Check syntax."
   return ContentService.createTextOutput(error).setMimeType(ContentService.MimeType.TEXT)
  break
   
 }
}


function doPost(e) {

  // Handle POST request

  var log = "Processed at: " + date + ".";
  Logger.log(log)
  var action = e.parameter.action // Get what action was ran
  
 switch(action){
  
  case "addUser":
  var department = e.parameter.department
  var job = e.parameter.job
  var nom = e.parameter.nom 
  var prenom = e.parameter.prenom
  var id = e.parameter.id
  var tel = e.parameter.tel
  var mail = e.parameter.mail
  var user = new Employee(id,department,job)
   if( searchJob(job,department) != error404){
    user.push(id,job,nom,prenom,tel,mail,department)
    Logger.log("Sucessfully added user to the roster.")
    var output = "\n\nSucessfully added " + user.prenom +" "+ user.nom +" to the roster."
    return ContentService.createTextOutput(log + output ).setMimeType(ContentService.MimeType.TEXT);
   }else{
      var error = "Error: No job named like this was found."
      return ContentService.createTextOutput(error).setMimeType(ContentService.MimeType.TEXT);
   }
  break

  case "removeUser":
  var department = e.parameter.department
  var id = e.parameter.id
  var user = new Employee(id,department)
  var nom = user.n
  if( searchJob(job,department) != error404){
   var output = "\n\nSucessfully removed " + user.prenom +" "+ user.nom + " from the roster"
   user.remove(id,department)
   return ContentService.createTextOutput(log + output ).setMimeType(ContentService.MimeType.TEXT)
  }else{
    var error = "Error : No employee with this id was found"
    return ContentService.createTextOutput(error).setMimeType(ContentService.MimeType.TEXT)
  }
  break
  }
}



function searchJob(job,department){
  var departmentSheet = ss.getSheetByName(department)
  var  column = departmentSheet.getRange("B:B")
  var textFinder = column.createTextFinder(job).matchEntireCell(true)
  var jobCell = textFinder.findNext()
  if(jobCell == null){
    jobCell = departmentSheet.getRange(5,5)
    return error404
  }else{
    return rankRow = jobCell.getRow()
  }
}
function searchUser(query,department) {
  
  var departmentSheet = ss.getSheetByName(department)
  var column = departmentSheet.getRange("A:A")
  var textFinder = column.createTextFinder(query).matchEntireCell(true)
  var userCell = textFinder.findNext()
  if(userCell == null){
    userCell = departmentSheet.getRange(5,5)
   return error404
  }else{
    return userRow = userCell.getRow()
  }
}
