
define(["require", "appController", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojpagingdataproviderview", "ojs/ojarraydataprovider", "ojs/ojknockout", "ojs/ojtable", "ojs/ojpagingcontrol", "ojs/ojbutton", "ojs/ojdialog", "ojs/ojmessages", "ojs/ojinputtext", "ojs/ojavatar", "ojs/ojselectcombobox", "ojs/ojcheckboxset","ojs/ojselectsingle","ojs/ojmessages"],
function (require, app, exports, ko, ojbootstrap_1, PagingDataProviderView, ArrayDataProvider) {
    function UsersViewModel() {
      var self = this;
      this.userName =ko.observable();
      this.userDisplayName = ko.observable() ;
      this.userType = ko.observable("USER");
      this.userActive = ko.observable(); 
      this.userPassword = ko.observable(); 
      this.messagesDataprovider = ko.observableArray([]);

      self.userNameUpdate = ko.observable();
      self.userDisplayNameUpdate= ko.observable();
      self.userPasswordUpdate= ko.observable();
      self.deletedUser = ko.observable();;
      //this.selectVal = ko.observable("CH");
      this.users = [
          { value: "ADMIN", label: "Admin" },
          { value: "USER", label: "User" }
      ];
      this.usersDP = new ArrayDataProvider(this.users, {
          keyAttributes: "value",
      });

      this.userArray = ko.observableArray([{
        userName: "Neha Gupta",
        userDisplayName: "Neha Gupta",
        userType :"Regular",
        userActive:"Y"
      },
      {
        userName: "Harsh Lal Gupta",
        userDisplayName: "HL Gupta",
        userType :"Regular",
        userActive:"Y"
      },
      {
        userName: "Harshita Gupta",
        userDisplayName: "H Gupta",
        userType :"Regular",
        userActive:"Y"
      }
    ]);
      this.pagingDataProvider = new ArrayDataProvider(this.userArray, {
        keyAttributes: "userName",
        implicitSort: [{ attribute: "userName", direction: "ascending" }],
    });

    this.openUser = function() {
      self.userName('');
      self.userDisplayName('') ;
      self.userType("USER");
      self.userPassword(''); 
      document.getElementById("AddUserDialog").open();
     }

     this.saveUser = function() {
       console.log("User Details : "+self.userName()+" "+self.userDisplayName()+" "+self.userType()+" "+self.userActive());
       if(self.userName() == '' || self.userDisplayName() == '' || self.userDisplayName() == undefined || self.userName() == undefined || self.userPassword() == undefined || self.userPassword() == undefined){
        self.messagesDataprovider.push(
          {
            severity: "error",
            summary: "Error",
            detail: "Please enter user name and user display name and user Password",
            autoTimeout: 4000
        });
      }else{
        self.messagesDataprovider.push(
          {
            severity: "info",
            summary: "New User",
            detail: "New User Added",
            autoTimeout: 4000
        });
       self.userArray.push({
        userName: self.userName(),
        userDisplayName: self.userDisplayName(),
        userType :self.userType(),
        userActive:self.userActive()         
       });
      }
      document.getElementById("AddUserDialog").close();
     }

     this.cancelUser = function() {
      document.getElementById("AddUserDialog").close();
     }

     this.cancelDelete = function() {
      document.getElementById("DeleteUserDialog").close();
     }

     this.updateUsers = function() {
      document.getElementById("UpdateUserDialog").open();
    };

    this.cancelUpdate = function() {
      document.getElementById("UpdateUserDialog").close();
     }

     this.updateUser = function() {
      document.getElementById("UpdateUserDialog").close();
      console.log("user Name : "+self.userNameUpdate()+"  user display name : "+self.userDisplayNameUpdate());
      if(self.userDisplayNameUpdate() == '' || self.userDisplayNameUpdate() == undefined){
        self.messagesDataprovider.push(
          {
            severity: "error",
            summary: "Error",
            detail: "Please enter user display name and password",
            autoTimeout: 4000
        });
      }else{
        var selectedServ = self.userArray().find(s => s.userName === self.userNameUpdate());
        self.userArray.replace(selectedServ,{
          "userName": self.userNameUpdate(),
          "userDisplayName": self.userDisplayNameUpdate(),
          "userType" :selectedServ.userType,
           "userActive":selectedServ.userActive
        });
        self.messagesDataprovider.push(
          {
            severity: "info",
            summary: "Update User",
            detail: "User Updated",
            autoTimeout: 4000
        });
      }
      };
  

    this.deleteUser = function() {
      document.getElementById("DeleteUserDialog").open();
    };
    this.selectedChangedListener = (event) => {
      const row = event.detail.value.row;
      if (row.values().size > 0) {
          row.values().forEach(function (key) {
              console.log(key);
              var selectedUser = self.userArray().find(s => s.userName === key);
              console.log(selectedUser);
              self.userNameUpdate(selectedUser.userName);
              self.userDisplayNameUpdate(selectedUser.userDisplayName);
              self.userPasswordUpdate(selectedUser.userPassword);
              self.deletedUser(selectedUser);
          });
      }
  };
    this.okDelete = function() {
      document.getElementById("DeleteUserDialog").close();
      console.log('Deleted User '+self.deletedUser());
      self.userArray.remove(self.deletedUser());
        self.messagesDataprovider.push(
          {
            severity: "info",
            summary: "Deleted User",
            detail: "User Deleted",
            autoTimeout: 4000
        });
      
      };

    }
    return UsersViewModel;
  }
);
