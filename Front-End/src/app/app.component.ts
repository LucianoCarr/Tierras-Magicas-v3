import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllComponent } from "./modules/realms/components/all/all.component";
import { CreateComponent } from "./modules/realms/components/create/create.component";
import { EditComponent } from "./modules/realms/components/edit/edit.component";
import { DetailComponent } from "./modules/realms/components/detail/detail.component";
import { DeleteComponent } from "./modules/realms/components/delete/delete.component";
import { AdminComponent } from "./modules/realms/components/admin/admin.component";
import { HeaderComponent } from "./modules/others/header/header.component";
import { FooterComponent } from "./modules/others/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Front-End';

}
