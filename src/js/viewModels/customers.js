define(["require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider", "ojs/ojlistdataproviderview", "ojs/ojdataprovider", "ojs/ojknockout", "ojs/ojtable", "ojs/ojinputtext", "ojs/ojbutton", "ojs/ojdialog", "ojs/ojmessages", "ojs/ojinputtext", "ojs/ojselectsingle","ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils","ojs/ojasyncvalidator-regexp"],
  function (require, exports, ko, ojbootstrap_1, ArrayDataProvider, ListDataProviderView, ojdataprovider_1,AsyncRegExpValidator) {
    function CustomerViewModel() {
      this.filter = ko.observable('');
      this.deletedCustomer = ko.observableArray([]);
      this.messagesDataprovider = ko.observableArray([]);
      var self = this;
      this.customerId = ko.observable();
      this.customerName = ko.observable();
      this.customerEmail = ko.observable();
      this.customerAddress = ko.observable();
      this.customerDescription = ko.observable();
      this.customerPhone = ko.observable();
      this.customerWebsite = ko.observable();
      this.customerAddress = ko.observable();

      this.customerIdUpdate = ko.observable();
      this.customerNameUpdate = ko.observable();
      this.customerEmailUpdate = ko.observable();
      this.customerAddressUpdate = ko.observable();
      this.customerDescriptionUpdate = ko.observable();
      this.customerPhoneUpdate = ko.observable();
      this.customerWebsiteUpdate = ko.observable();
      this.customerAddressUpdate = ko.observable();

      this.deptArray = ko.observableArray([
        {
          "customerId": 1,
          "customerName": "Neha Gupta",
          "customerEmail": "neha@gmail.com",
          "customerAddress": "Kadma",
          "customerDescription": "Hey Neha",
          "customerPhone": 7484097229,
          "customerWebsite": "neha.com"
        },
        {
          "customerId": 2,
          "customerName": "Sikha Gupta",
          "customerEmail": "sikha@gmail.com",
          "customerAddress": "Sonari",
          "customerDescription": "Hey Sikha",
          "customerPhone": 8292688621,
          "customerWebsite": "sikha.com"
        }
      ]);
      this.dataprovider = ko.computed(function () {
        let filterCriterion = null;
        if (this.filter() && this.filter() != '') {
          filterCriterion = ojdataprovider_1.FilterFactory.getFilter({
            filterDef: { text: this.filter() }
          });
        }
        const arrayDataProvider = new ArrayDataProvider(this.deptArray, { keyAttributes: 'customerId' });
        return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion });
      }, this);
      this.handleValueChanged = () => {
        this.filter(document.getElementById('filter').rawValue);
      };
      this.highlightingCellRenderer = (context) => {
        let field = null;
        if (context.columnIndex === 2) {
          field = 'customerId';
          //console.log("1");
        }
        else if (context.columnIndex === 3) {
          field = 'customerName';
          //console.log("2");
        }
        else if (context.columnIndex === 4) {
          field = 'customerEmail';
          //console.log("3");
        }
        else if (context.columnIndex === 5) {
          field = 'customerAddress';
          //console.log("4");
        }
        else if (context.columnIndex === 6) {
          field = 'customerDescription';
          //console.log("5");
        }
        else if (context.columnIndex === 7) {
          field = 'customerPhone';
          //console.log("6");
        }
        else if (context.columnIndex === 8) {
          field = 'customerWebsite';
         // console.log("7");
        }
        let data = context.row[field].toString();
        const filterString = this.filter();
        let textNode;
        let spanNode = document.createElement('span');
        if (filterString && filterString.length > 0) {
          const index = data.toLowerCase().indexOf(filterString.toLowerCase());
          if (index > -1) {
            const highlightedSegment = data.substr(index, filterString.length);
            if (index !== 0) {
              textNode = document.createTextNode(data.substr(0, index));
              spanNode.appendChild(textNode);
            }
            let bold = document.createElement('b');
            textNode = document.createTextNode(highlightedSegment);
            bold.appendChild(textNode);
            spanNode.appendChild(bold);
            if (index + filterString.length !== data.length) {
              textNode = document.createTextNode(data.substr(index + filterString.length, data.length - 1));
              spanNode.appendChild(textNode);
            }
          }
          else {
            textNode = document.createTextNode(data);
            spanNode.appendChild(textNode);
          }
        }
        else {
          textNode = document.createTextNode(data);
          spanNode.appendChild(textNode);
        }
        context.parentElement.appendChild(spanNode);
      };
      this.columnArray = [
        { headerText: "Action", width: "150", template: "cellTemplate1" },
        { headerText: "Action", width: "150", template: "cellTemplate2" },
        { headerText: 'Customer Id', renderer: this.highlightingCellRenderer },
        { headerText: 'Customer Name', renderer: this.highlightingCellRenderer },
        { headerText: 'Customer Email', renderer: this.highlightingCellRenderer },
        { headerText: 'Customer Address', renderer: this.highlightingCellRenderer },
        { headerText: 'Customer Description', renderer: this.highlightingCellRenderer },
        { headerText: 'Customer Phone', renderer: this.highlightingCellRenderer },
        { headerText: 'Customer Website', renderer: this.highlightingCellRenderer }
      ];

      this.deleteCustomer = function () {
        document.getElementById("DeleteCustomerDialog").open();
      };
      this.cancelDelete = function () {
        document.getElementById("DeleteCustomerDialog").close();
      }
      this.selectedChangedListener = (event) => {
        const row = event.detail.value.row;
        if (row.values().size > 0) {
          row.values().forEach(function (key) {
            console.log(key);
            var selectedServ = self.deptArray().find(s => s.customerId === key);
            console.log("Selected Customer : " + selectedServ);
            // self.serviceNameUpdate(selectedServ.ServiceName);
            // self.serviceDescriptionUpdate(selectedServ.ServiceDescription);
            self.customerIdUpdate(selectedServ.customerId);
            self.customerNameUpdate(selectedServ.customerName);
            self.customerEmailUpdate(selectedServ.customerEmail);
            self.customerAddressUpdate(selectedServ.customerAddress);
            self.customerDescriptionUpdate(selectedServ.customerDescription);
            self.customerPhoneUpdate(selectedServ.customerPhone);
            self.customerWebsiteUpdate(selectedServ.customerWebsite);

            self.deletedCustomer(selectedServ);
          });
        }
      };
      this.okDelete = function () {
        document.getElementById("DeleteCustomerDialog").close();
        console.log('Deleted Customer ' + self.deletedCustomer().customerId);
        self.deptArray.remove(self.deletedCustomer());

        self.messagesDataprovider.push(
          {
            severity: "info",
            summary: "Deleted Customer",
            detail: "Customer Deleted",
            autoTimeout: 4000
          });

      };
      this.addCustomer = function () {
        document.getElementById("AddCustomerDialog").open();
      }
      this.cancelCustomer = function () {
        document.getElementById("AddCustomerDialog").close();
      }
      this.saveCustomer = function () {
        document.getElementById("AddCustomerDialog").close();
        console.log("Customer Name : " + self.customerName() + "  Customer Id : " + self.customerId()+" Email :"+self.customerEmail()+" Address"+self.customerAddress()+" Description : "+self.customerDescription()+" Phone : "+self.customerPhone()+" Website : "+self.customerWebsite());
        if (self.customerName() == '' || self.customerId() == '' || self.customerName() == undefined || self.customerId() == undefined) {
          self.messagesDataprovider.push(
            {
              severity: "error",
              summary: "Error",
              detail: "Please enter customer name and customer Id",
              autoTimeout: 4000
            });
        } else {
          console.log("Added customer : "+self.customerId()+self.customerName());
          self.deptArray.push({
            "customerId": self.customerId(),
            "customerName": self.customerName(),
            "customerEmail": self.customerEmail(),
            "customerAddress": self.customerAddress(),
            "customerDescription":self.customerDescription(),
            "customerPhone": self.customerPhone(),
            "customerWebsite": self.customerWebsite()
          });
          console.log("Array after addition of new element : "+self.deptArray());
          self.messagesDataprovider.push(
            {
              severity: "info",
              summary: "New Customer",
              detail: "New Customer Added",
              autoTimeout: 4000
            });
        }
      }
      this.cancelUpdate = function () {
        document.getElementById("UpdateCustomerDialog").close();
      }
      this.updateCustomer = function () {
        document.getElementById("UpdateCustomerDialog").open();
      }

      this.saveUpdate = function() {
        document.getElementById("UpdateCustomerDialog").close();
        console.log("Updated Customer Name : " + self.customerNameUpdate() + "  Customer Id : " + self.customerId()+" Email :"+self.customerEmailUpdate()+" Address"+self.customerAddressUpdate()+" Description : "+self.customerDescriptionUpdate()+" Phone : "+self.customerPhoneUpdate()+" Website : "+self.customerWebsiteUpdate());
        var selectedServ = self.deptArray().find(s => s.customerId === self.customerIdUpdate());
        self.deptArray.replace(selectedServ,{
            "customerId": self.customerIdUpdate(),
            "customerName": self.customerNameUpdate(),
            "customerEmail": self.customerEmailUpdate(),
            "customerAddress": self.customerAddressUpdate(),
            "customerDescription":self.customerDescriptionUpdate(),
            "customerPhone": self.customerPhoneUpdate(),
            "customerWebsite": self.customerWebsiteUpdate()
          });
          console.log("Array after addition of new element : "+self.deptArray());
          self.messagesDataprovider.push(
            {
              severity: "info",
              summary: "Updated Customer",
              detail: "Updated Customer",
              autoTimeout: 4000
            });
          }

        //   // this.emailPatternValidator = ko.observableArray([
        //   //   new AsyncRegExpValidator({
        //   //       pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
        //   //       hint: "enter a valid email format",
        //   //       messageDetail: "Not a valid email format"
        //   //   })
        // ]);
  }
    return CustomerViewModel;
  }
);
