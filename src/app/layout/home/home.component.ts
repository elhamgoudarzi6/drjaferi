import {  Component } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { HeroComponent } from "./hero/hero.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from './faq/faq.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ServiceComponent } from './service/service.component';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, FooterComponent,AboutComponent, HeroComponent, GalleryComponent, ContactComponent, FaqComponent,ServiceComponent]
})
export class HomeComponent {

}
