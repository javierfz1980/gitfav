import { Subject } from 'rxjs';

export enum AppAlertType {
    Danger = 'danger',
    Info = 'info',
    Warning = 'warning',
    Success = 'success'
}
/**
 * Service used to display top-level alerts, see app-alert.component.
 */
export class AlertService {
    // Observable sources:
    // alertMessageSource array contains the message to display and the alert type (see Clarity doc)
    // closeAlertSource is for closing the alert component
    private alertMessageSource$ = new Subject<[string, string, boolean]>();
    private closeAlertSource$ = new Subject();

    // Observable streams
    alertMessage$ = this.alertMessageSource$.asObservable();
    closeAlert$ = this.closeAlertSource$.asObservable();

    /**
     * Show error messages
     * @param message -> message string
     * @param cleanPreviousErrors -> if true cleans previous messages
     */
    showError(message: string, cleanPreviousErrors: boolean = false) {
        this.alertMessageSource$.next([message, AppAlertType.Danger, cleanPreviousErrors]);
    }

    /**
     * Show info messages
     * @param message -> message string
     * @param cleanPreviousErrors -> if true cleans previous messages
     */
    showInfo(message: string, cleanPreviousErrors: boolean = false) {
        this.alertMessageSource$.next([message, AppAlertType.Info, cleanPreviousErrors]);
    }

    /**
     * Show warning messages
     * @param message -> message string
     * @param cleanPreviousErrors -> if true cleans previous messages
     */
    showWarning(message: string, cleanPreviousErrors: boolean = false) {
        this.alertMessageSource$.next([message, AppAlertType.Warning, cleanPreviousErrors]);
    }

    /**
     * Show success messages
     * @param message -> message string
     * @param cleanPreviousErrors -> if true cleans previous messages
     */
    showSuccess(message: string, cleanPreviousErrors: boolean = false) {
        this.alertMessageSource$.next([message, AppAlertType.Success, cleanPreviousErrors]);
    }

    /**
     * Close alert messages
     * @param message -> message string
     * @param cleanPreviousErrors -> if true cleans previous messages
     */
    closeAlert() {
        this.closeAlertSource$.next();
    }
}
