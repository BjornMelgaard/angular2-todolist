import { Component, Input, HostListener, ElementRef,
  EventEmitter, AfterViewInit, OnDestroy, ViewChild, Renderer } from '@angular/core';
import { Project, ProjectHeaderEditedService } from '../../shared';

@Component({
  selector: 'project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss'],
  outputs: ['update', 'delete']
})
export class ProjectHeaderComponent implements AfterViewInit, OnDestroy {
  @Input() project: Project;
  @ViewChild('myInput') input: ElementRef;
  private _editing: boolean = false;
  originalName: string;
  update = new EventEmitter();
  delete = new EventEmitter();

  constructor(private _elementRef: ElementRef, private _editedService: ProjectHeaderEditedService, private _renderer: Renderer) { }

  ngAfterViewInit() {
    this.originalName = this.project.name;
    if (!this.project.id) {
      setTimeout(() => this.editing = true, 0); // beautiful
    }
  }

  ngOnDestroy() {
    console.log("destroying", this.project.name)
  }

  get editing() { return this._editing; }
  set editing(data: boolean) {
    if (this._editing !== data) {
      this._editing = data;
      // events about open must arrive after close
      /*on close*/
      if (!this._editing) {
        this._editedService.changeEdited(this._editing);
        this.callUpdate();
      } else /*on open*/ {
        setTimeout(() => {
          this._editedService.changeEdited(this._editing);
          const input = this._elementRef.nativeElement.getElementsByTagName("input")[0];
          console.log(input);
          input.focus();
        }, 0);
      }
    }
  }

  toggleEditing() {
    this.editing = !this.editing
  }

  callUpdate() {
    if (!this.project.name && !this.project.id) {
      this.callDelete()
      return ;
    } else if (this.project.name.trim() == "") {
      this.project.name = this.originalName;
      return ;
    } else if (this.project.name !== this.originalName) {
      this.update.emit();
      this.originalName = this.project.name;
    };
  }

  callDelete() {
    this.delete.emit();
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) return;

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.editing = false
    };
  }

}
