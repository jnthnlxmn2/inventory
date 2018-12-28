import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../services/discount.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  discounts: any = [];
  constructor(public discountService: DiscountService, private spinner: NgxSpinnerService, public router: Router) { }
  code: any = "";
  type: any = "";
  value: any = "";
  id: any = "";
  update: any = false;
  ngOnInit() {
    this.spinner.show();
    this.discountService.getDiscount().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.discounts = data.data;
        console.log(this.discounts);
      }
    }, err => {

    })
  }


  updateFile() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        let params = {
          code: this.code,
          type: this.type,
          value: this.value
        }
        this.discountService.updateDiscount(this.id, params).then(response => {
          let data: any = response;
          if (data.data) {
            this.id = '';
            this.code = '';
            this.type = '';
            this.value = '';
            this.update = false;

            swal({
              type: 'success',
              title: 'Updated!',
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
    })
  }

  deleteFile(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.discountService.deleteDiscount(id).then(response => {
          let data: any = response;
          if (data) {

            swal({
              type: 'success',
              title: 'Deleted!',
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
    })

  }


  addDiscount() {
    this.spinner.show();
    let params = {
      code: this.code,
      type: this.type,
      value: this.value,
      created_by: 1,
      updated_by: 1
    }
    this.discountService.addDiscount(params).then(response => {
      let data: any = response;
      if (data.data) {
        this.code = '';
        this.type = '';
        this.value = '';
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

  toUpdate(discount) {
    this.id = discount.id;
    this.code = discount.code;
    this.type = discount.type;
    this.value = discount.value;
    this.update = true;
  }


  clear() {
    this.code = '';
    this.type = '';
    this.value = '';
  }
  cancel() {
    this.id = '';
    this.code = '';
    this.type = '';
    this.value = '';
    this.update = false;
  }




}
