import { Component, OnInit,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'web';
  form: FormGroup | any;
  ngOnInit(): void {
    this.createform();
  }
  onSelect(e: any) {
    this.form.controls.date.setValue(e.shamsi);
  }
  createform() {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.compose([Validators.required])),
    })
  }
}
