define(["require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider", "text!../serviceData.json", "ojs/ojtable", "ojs/ojknockout","ojs/ojbutton", "ojs/ojdialog","ojs/ojmessages","ojs/ojinputtext","ojs/ojselectsingle"],
 function(require, exports, ko, ojbootstrap_1, ArrayDataProvider, serviceData) {
    function ServicesViewModel() {
      var self = this;
      self.serviceName = ko.observable();
      self.serviceDescription = ko.observable();
      self.serviceNameUpdate = ko.observable();
      self.serviceDescriptionUpdate = ko.observable();
      self.deleteService = ko.observableArray();

      this.serviceArray = ko.observableArray([{
        ServiceName: "React Js",
        ServiceDescription: "Learn React Js"
      },
      {
        ServiceName: "Angular Js",
        ServiceDescription: "Learn Angular Js"
      },
      {
        ServiceName: "Spring Boot",
        ServiceDescription: "Learn Spring Boot"
      }
    ]);
     // this.servArray = JSON.parse(serviceData);
      this.messagesDataprovider = ko.observableArray([]);
      this.dataprovider = new ArrayDataProvider(this.serviceArray, {
                  keyAttributes: "ServiceName",
                  implicitSort: [{ attribute: "ServiceName", direction: "ascending" }],
              });

     this.cancel = function() {
                document.getElementById("modalDialog1").close();
      }
      this.save = function() {
        document.getElementById("modalDialog1").close();
        console.log("Service Name : "+self.serviceName()+"  Service Description : "+self.serviceDescription());
        if(self.serviceName() == '' || self.serviceName() == '' || self.serviceName() == undefined || self.serviceName() == undefined){
          self.messagesDataprovider.push(
            {
              severity: "error",
              summary: "Error",
              detail: "Please enter service name and service description",
              autoTimeout: 4000
          });
        }else{
          self.serviceArray.push({
            "ServiceName": self.serviceName(),
            "ServiceDescription": self.serviceDescription()
          });
          console.log(self.servArray);
          self.messagesDataprovider.push(
            {
              severity: "info",
              summary: "New Service",
              detail: "New Service Added",
              autoTimeout: 4000
          });
        }
      }
      this.open = function() {
                self.serviceName('');
                self.serviceDescription('');
                document.getElementById("modalDialog1").open();
      }
      this.openUpdate = function() {
        document.getElementById("UpdateServiceDialog").open();
      };

      this.openDelete = function() {
        document.getElementById("DeleteServiceDialog").open();
      };

      this.selectedChangedListener = (event) => {
        const row = event.detail.value.row;
        if (row.values().size > 0) {
            row.values().forEach(function (key) {
                console.log(key);
                var selectedServ = self.serviceArray().find(s => s.ServiceName === key);
                console.log(selectedServ);
                self.serviceNameUpdate(selectedServ.ServiceName);
                self.serviceDescriptionUpdate(selectedServ.ServiceDescription);
                self.deleteService(selectedServ);
            });
        }
    };
    this.cancelUpdate = function() {
      document.getElementById("UpdateServiceDialog").close();
   };
   this.cancelDelete = function() {
    document.getElementById("DeleteServiceDialog").close();
}
   this.saveUpdate = function() {
    document.getElementById("UpdateServiceDialog").close();
    console.log("Service Name : "+self.serviceNameUpdate()+"  Service Description : "+self.serviceDescriptionUpdate());
    if(self.serviceNameUpdate() == '' || self.serviceNameUpdate() == '' || self.serviceNameUpdate() == undefined || self.serviceNameUpdate() == undefined){
      self.messagesDataprovider.push(
        {
          severity: "error",
          summary: "Error",
          detail: "Please enter service description",
          autoTimeout: 4000
      });
    }else{
      var selectedServ = self.serviceArray().find(s => s.ServiceName === self.serviceNameUpdate());
      self.serviceArray.replace(selectedServ,{
        "ServiceName": self.serviceNameUpdate(),
        "ServiceDescription": self.serviceDescriptionUpdate()
      });
      console.log("Selected Service : "+selectedServ.ServiceName);
      self.messagesDataprovider.push(
        {
          severity: "info",
          summary: "Update Service",
          detail: "Service Updated",
          autoTimeout: 4000
      });
    }
    };


    this.okDelete = function() {
      document.getElementById("DeleteServiceDialog").close();
      console.log('Deleted Service '+self.deleteService());
      self.serviceArray.remove(self.deleteService());
        self.messagesDataprovider.push(
          {
            severity: "info",
            summary: "Deleted Service",
            detail: "Service Deleted",
            autoTimeout: 4000
        });
      
      };
  }

    return ServicesViewModel;
  }
);
