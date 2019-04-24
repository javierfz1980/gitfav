import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'favo-git-user-fav',
  templateUrl: './user-fav.component.html',
  styleUrls: ['./user-fav.component.scss']
})
export class UserFavComponent implements OnInit {

    /**
     * Current toggle value
     */
    @Input() isInFav = false;

    /**
     * Current toggle label
     */
    @Input() label: string;

    /**
     * Fav toogle output event emiter
     */
    @Output() favToggle: EventEmitter<boolean>;

    /**
     * Current component form
     */
    public form: FormGroup;

    /**
     * Random id number to be used by template
     */
    public idRandom: string;


    constructor() {
        this.favToggle = new EventEmitter();
        this.idRandom = '_' + Math.random().toString(36).substr(2, 9);
    }

    ngOnInit() {
        this.form = new FormGroup({
            isInFav: new FormControl(this.isInFav)
        });

        this.form.get('isInFav').valueChanges
            .subscribe((isInFav: boolean) => this.favToggle.emit(isInFav));
    }

}
