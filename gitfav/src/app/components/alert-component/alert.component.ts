import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BasicSubscriber } from '../../shared/abstracts/basic-subscriber';
import { AlertService, AppAlertType } from '../../services/alert.service';

/**
 * Alert component for reporting info, warnings or errors at the application level.
 */
@Component({
    selector: 'favo-git-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends BasicSubscriber {

    /**
     * Default alert status
     */
    @Input() alertClosed = true;

    /**
     * Messages sources by type
     */
    dangerList: string[];
    infoList: string[];
    warningList: string[];
    successList: string[];
    alertTypes = AppAlertType;

    constructor(private appAlertService: AlertService,
                private changeDetector: ChangeDetectorRef) {
        super();
        this.dangerList = [];
        this.infoList = [];
        this.dangerList = [];
        this.successList = [];
        // Observe alertMessage$ and open the Alert component when a message arrives
        // Any existing message is overridden with the new one.
        appAlertService.alertMessage$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(param => {
                const message = param[0];
                const source: string[] = this.getSourceByType(param[1]);
                const cleanPreviousAlerts = param[2];
                this.alertClosed = false;

                this.showMessage(message, source, cleanPreviousAlerts);
                // This seems necessary in case there are many events in a row
                this.changeDetector.detectChanges();
            });

        // Register to observe the closeAlert$ source and close the Alert component
        appAlertService.closeAlert$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() =>  this.alertClosed = true);
    }

    /**
     * Removes an specific message from current component list of messages
     * @param idx -> id of message to be removed
     * @param source -> source list from which message should be deleted
     */
    removeMessage(idx: number, source: string[]) {
        source.splice(idx, 1);
        console.log('remove message: ', idx);
    }

    /**
     * Shows an specific message
     * @param message -> message string
     * @param source -> component message type source list
     * @param cleanPreviousAlerts -> a flag indicating if previous messages should be deleted
     */
    private showMessage(message: string, source: string[], cleanPreviousAlerts: boolean) {
        if (cleanPreviousAlerts) {
            this.cleanAlerts(source);
        }
        source.push(message);
    }

    /**
     * Retrieves a list of messages filtered by type
     * @param type -> message type
     */
    private getSourceByType(type: string): string[] {
        switch (type) {
            case AppAlertType.Success: return this.successList;
            case AppAlertType.Warning: return this.warningList;
            case AppAlertType.Info: return this.infoList;
            case AppAlertType.Danger: return this.dangerList;
        }
    }

    /**
     * Resets current component alerts
     * @param source -> source list from which remove all messages
     */
    private cleanAlerts(source: string[]) {
        source = [];
    }
}
