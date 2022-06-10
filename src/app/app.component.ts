import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2} from '@angular/core';
import { min } from 'rxjs';

export type Mode = 'dark-mode' | 'light-mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mode: Mode = 'dark-mode';
  level: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
    this.level = 24;
  }

  ngOnInit() {
    this.init();
  }

  init = (): void => this.renderer.addClass(this.document.body, this.mode);


  lvl_up() {
    this.push_progress_skill_bar();
    this.level = this.level + 1 < 78 ? this.level + 1 : 78;
  }

  clear_lvl() {
    this.level = 24;
    this.document.documentElement.style.setProperty('--progress-skill-bar-width', '0px');
  }


  push_progress_skill_bar() {
    let progress : number = +this.document.documentElement.style.getPropertyValue('--progress-skill-bar-width').replace("px", "");
    if(this.level == 24) progress += 80;
    else if(this.level <= 27) progress += 26.6;
    else if(this.level <= 31) progress += 20;
    else if(this.level <= 36) progress += 16;
    else if(this.level <= 42) progress += 13.3;
    else if(this.level <= 49) progress += 11.4;
    else if(this.level <= 57) progress += 10;
    else if(this.level <= 66) progress += 8.9;
    else if(this.level <= 76) progress += 8;

    this.document.documentElement.style.setProperty('--progress-skill-bar-width', progress.toString(10) + 'px');
    // this.progress_skill_bar.style.width = progress.toString(10) + "px";
  }

  toggle_mode() {
    this.document.body.classList.replace(
      this.mode,
      this.mode === 'dark-mode' ? (this.mode = 'light-mode') : (this.mode = 'dark-mode')
    );
  }



  title = 'skillsets-prototype-app';
}
