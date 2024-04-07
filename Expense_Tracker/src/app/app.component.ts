import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

// this both line use for run tailwind css properly
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
// import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatIconModule, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'budget-planner';

  ngOnInit(): void {
    initFlowbite();
  }
}
