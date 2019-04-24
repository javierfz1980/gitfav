import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'favo-git-lang-switch',
    templateUrl: './lang-switch.component.html',
    styleUrls: ['./lang-switch.component.scss']
})
export class LangSwitchComponent {

    constructor(private translateService: TranslateService) { }

    /**
     * Changes the current app's language
     * @param language -> the language to be used by the app
     */
    useLanguage(language: string) {
        this.translateService.use(language);
    }
}
