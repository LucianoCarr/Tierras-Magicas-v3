import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { CommonModule } from '@angular/common';
import { Character } from '../../../../models/character.model';


@Component({
  selector: 'app-delete',
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit, OnChanges {
  @Input() character: Character | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmDeleteEvent = new EventEmitter<number>();


     constructor(private characterService: CharacterService) {}

  ngOnInit(): void {}
  
  ngOnChanges() {}

  confirm() {
    if (this.character) {
      this.confirmDeleteEvent.emit(this.character.id); 
    }
  }

  close() {
    this.closeModal.emit();  
  }

}
