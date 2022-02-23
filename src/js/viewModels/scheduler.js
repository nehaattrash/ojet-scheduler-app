
define(["require", "appController", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider", "ojs/ojlistdataproviderview", "ojs/ojasyncvalidator-regexp", "ojs/ojknockout", "ojs/ojtable", "ojs/ojinputtext", "ojs/ojbutton", "ojs/ojdialog", "ojs/ojmessages", "ojs/ojavatar"],
function (require, app, exports, ko, ojbootstrap_1, ArrayDataProvider, ListDataProviderView, AsyncRegExpValidator) {
    function SchedulerViewModel() {
      this.filter = ko.observable('');
      // this.deptData =  [
      //   {
      //     "DepartmentId": 10,
      //     "DepartmentName": "Finance 9",
      //     "LocationId": 300,
      //     "ManagerId": 7001,
      //     "StartDate": "2014-06-13",
      //     "EmployeeCount": 335,
      //     "Type": "Sales",
      //     "Currency": "EUR",
      //     "Primary": [],
      //     "Rating": 3,
      //     "TargetComplete": 90
      //   },
      //   {
      //     "DepartmentId": 20,
      //     "DepartmentName": "Control And Credit 9",
      //     "LocationId": 300,
      //     "ManagerId": 7001,
      //     "StartDate": "2019-09-10",
      //     "EmployeeCount": 206,
      //     "Type": "HR",
      //     "Currency": "USD",
      //     "Primary": [],
      //     "Rating": 1,
      //     "TargetComplete": 90
      //   }];
      //this.baseDeptArray = JSON.parse(deptData);
      this.baseDeptArray =[
        {
          "DepartmentId": 10,
          "DepartmentName": "Finance 9",
          "LocationId": 300,
          "ManagerId": 7001,
          "StartDate": "2014-06-13",
          "EmployeeCount": 335,
          "Type": "Sales",
          "Currency": "EUR",
          "Primary": [],
          "Rating": 3,
          "TargetComplete": 90
        },
        {
          "DepartmentId": 20,
          "DepartmentName": "Control And Credit 9",
          "LocationId": 300,
          "ManagerId": 7001,
          "StartDate": "2019-09-10",
          "EmployeeCount": 206,
          "Type": "HR",
          "Currency": "USD",
          "Primary": [],
          "Rating": 1,
          "TargetComplete": 90
        }];
      this.generateDeptArray = (num) => {
        const deptArray = [];
        let count = 0;
        for (let i = 0; i < num; i++) {
          for (let j = 0; j < this.baseDeptArray.length; j++) {
            deptArray[count] = {
              DepartmentId: this.baseDeptArray[j].DepartmentId + count.toString(),
              DepartmentName: this.baseDeptArray[j].DepartmentName + count.toString(),
              LocationId: this.baseDeptArray[j].LocationId,
              ManagerId: this.baseDeptArray[j].ManagerId
            };
            count++;
          }
        }
        return deptArray;
      };
      this.deptArray = this.generateDeptArray(1000);
      this.dataprovider = ko.computed(function () {
        let filterCriterion = null;
        if (this.filter() && this.filter() != '') {
          filterCriterion = ojdataprovider_1.FilterFactory.getFilter({
            filterDef: { text: this.filter() }
          });
        }
        const arrayDataProvider = new ArrayDataProvider(this.deptArray, { keyAttributes: 'DepartmentId' });
        return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion });
      }, this);
      this.handleValueChanged = () => {
        this.filter(document.getElementById('filter').rawValue);
      };
      this.highlightingCellRenderer = (context) => {
        let field = null;
        if (context.columnIndex === 0) {
          field = 'DepartmentId';
        }
        else if (context.columnIndex === 1) {
          field = 'DepartmentName';
        }
        else if (context.columnIndex === 2) {
          field = 'LocationId';
        }
        else if (context.columnIndex === 3) {
          field = 'ManagerId';
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
        { headerText: 'Department Id', renderer: this.highlightingCellRenderer },
        { headerText: 'Department Name', renderer: this.highlightingCellRenderer },
        { headerText: 'Location Id', renderer: this.highlightingCellRenderer },
        { headerText: 'Manager Id', renderer: this.highlightingCellRenderer }
      ];
    }
    return SchedulerViewModel;
  }
);
