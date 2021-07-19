import { Component, OnInit } from '@angular/core';
import { ForgotpasswordService} from '../service/forgotpassword.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-verifypassword',
  templateUrl: './verifypassword.component.html',
  styleUrls: ['./verifypassword.component.scss']
})
export class VerifypasswordComponent implements OnInit {
result : any;
  constructor(public password : ForgotpasswordService,private router : Router) {
    this.password.createFormverify()
   }

  ngOnInit(): void {

  }
  async onSubmitVerify(){
   let {securite} = this.password.verify.getRawValue();
   console.log(securite)
   try{
    this.result = await this.password.SendToken(securite).then(result => {return result}).catch(error=> {return error});
    console.log(this.result.data)
    if(this.result.data === "approved"){
      localStorage.removeItem('telephone')
      this.router.navigateByUrl('/changepassword');
    }
    
   }catch(error){
   return error;
   }


  }
}
