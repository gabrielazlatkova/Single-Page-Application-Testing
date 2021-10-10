import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
 constructor() {
   // console.log('constructor');
 }
 ngOnInit(): void{
   // console.log('ngOnInit');
 }
 ngOnChanges(): void{
   // console.log('ngOnChanges');
 }
 ngAfterViewInit(): void{
   // console.log('ngAfterViewInit');
 }
 ngOnDestroy(): void{
   // console.log('ngOnDestroy');
 }

}
