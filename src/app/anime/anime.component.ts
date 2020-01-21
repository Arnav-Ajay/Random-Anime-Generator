import { NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'

import { ApiService } from '../api.service';
import { Anime } from '../anime';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})

export class AnimeComponent implements OnInit {

  constructor(private api: ApiService) {}

  anime: Anime[] = [];
  randAnime: Anime[] = [];
  isVisible= false;
  paused = true;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  pauseOnHover = false; 
  // unpauseOnArrow = false

  ngOnInit() {
    this.getAnime();
    // this.testFunction();

  }

  getAnime() {
    this.api.getAnime()
      .subscribe(data => {
        this.anime = data as Anime[];
        console.log(this.anime);
      });
      this.testFunction();
  }

  testFunction(){
    for(let i = 0; i < this.anime.length; i++){
      let randomValue = this.anime[Math.floor(Math.random() * this.anime.length)];
      // console.log(randomValue);
      this.randAnime.push(randomValue);
      // console.log(this.randAnime);
    }
  }

  flush(){
    for(let i=0; i < this.randAnime.length - 1; i++){
      this.randAnime.pop();
      // console.log(i);
    }
    // console.log(this.randAnime);
  }

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    // if (this.unpauseOnArrow && this.paused===false) {
      if (this.paused===false) {
      this.carousel.cycle();
      this.isVisible= false;
      this.testFunction();      
    
    } if(this.paused===true) {
      this.carousel.pause();
      this.isVisible= true;
      this.flush();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (slideEvent.paused) {
      this.togglePaused();

    }
    if (!slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }    
  }

}
