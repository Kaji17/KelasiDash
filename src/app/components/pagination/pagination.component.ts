import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  page:number=0
  rows:number = 5
  // total:number=0
  @Input() total = 0
  options:any=[
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ]
  first:number = 0

  @Output() newItemEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event:any){
    // console.log(event)
    this.addNewItem({pagination: true,page:event.page,size:event.rows})
   
  }

  onElementSelectChange(event:any){
    // console.log(event)
    this.addNewItem({pagination: true,page:0,size:event.value}) 
   
  }

  addNewItem(value: any) { 
      this.newItemEvent.emit(value);
  }


}
