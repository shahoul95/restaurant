import { Component, OnInit } from '@angular/core';
import { ForgotpasswordService } from '../service/forgotpassword.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
result : any;
  constructor(public forgotpassword: ForgotpasswordService, private router : Router) {
    this.forgotpassword.createFormchangepassword()
  }

  ngOnInit(): void {
  }
 async  onSubmitpassword() {
    let { newpassword, secondpassword } = this.forgotpassword.changepassword.getRawValue();
    if (newpassword == secondpassword) {
      let data = {
        password: secondpassword
      }
     this.result =  await this.forgotpassword.Finduserchangepassword(data).then(result=> {return result}).catch(error=> {return error});
     console.log(this.result)
     if(this.result.data.success){
       localStorage.removeItem('telephoneid')
       this.router.navigateByUrl('login')
     }
    } else if (newpassword !== secondpassword) {
      console.log('error');
    }

  }
}
