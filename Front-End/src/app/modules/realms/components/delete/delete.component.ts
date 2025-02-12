import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Realm } from '../../../../models/realms.model';
import { CommonModule } from '@angular/common';
import { RealmService } from '../../../../services/realm.service';

@Component({
  selector: 'app-delete',
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit, OnChanges {
  @Input() realm: Realm | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmDeleteEvent = new EventEmitter<number>();


     constructor(private realmService: RealmService) {}

  ngOnInit(): void {}
  
  ngOnChanges() {}


  confirm() {
    if (this.realm) {
      this.confirmDeleteEvent.emit(this.realm.id); 
    }
  }

  close() {
    this.closeModal.emit();  
  }
  
}