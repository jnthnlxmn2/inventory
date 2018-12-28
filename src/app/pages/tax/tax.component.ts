import { Component, OnInit } from '@angular/core';
import { TaxService } from '../../services/tax.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  taxes: any = [];
  tax: any = '';
  constructor(public taxservice: TaxService, private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.taxservice.getTax().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.taxes = data.data;
        console.log(this.taxes);
      }
    }, err => {

    })
  }

  addTax() {
    this.spinner.show();
    let params = {
      tax: this.tax,
      created_by: 1,
      updated_by: 1
    }
    this.taxservice.addTax(params).then(response => {
      let data: any = response;
      if (data.data) {
        this.tax = '';
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.ngOnInit();
        this.spinner.hide();
      } else {

        this.spinner.hide();
        swal({
          type: 'warning',
          title: 'Error!',
          text: 'close',
        });
      }
    })
  }

}
