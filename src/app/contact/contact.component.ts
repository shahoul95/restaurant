import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../service/commande.service';
import { ContactService } from '../service/contact.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  displays: boolean;
  display: boolean;
  nombre: any;
  account: any;
  logout: any;
  panieritems: any;
  basketSubscription: Subscription = new Subscription();
  constructor(private commande: CommandeService, public contact: ContactService) {
    this.displays = false;
    this.display = false;
    this.account = false;
    this.nombre = 20;
    this.logout = false;
    this.contact.createFormContact()
  }

  async ngOnInit() {
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');

    this.basketSubscription = await this.commande.appareilsSubject.subscribe(
      (appareils: any[]) => {



        this.panieritems = appareils === null ? 0 : appareils.length;;

      }
    );
    this.commande.getItems();
  }
  onClickMe() {
    localStorage.removeItem('user');
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');

  }

  onSubmitContact() {
    let contact = this.contact.createcontact.getRawValue();
    this.contact.SendContact(contact).then(body => {
      if (body) {
        this.contact.createcontact.reset();
        this.displays = true;
      } else {
        this.display = false;
        console.log("error");
      }
    }).catch(error => { console.log(error) });

  }
}
