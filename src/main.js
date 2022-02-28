import {Events} from "./events.js";

class MAIN extends Events {
    init() {

        this.eventsTrigger();
        this.drawAll();
    }

    drawAll() {
        this.drawWeekDays();
        this.drawMonths();
        this.drawDays();
        this.drawYearAndCurrentDay();
        this.drawEvents();
        this.drawEventsCount();
    }
}


try {
    let project = new MAIN({id: "calendar"});
    project.init();
} catch (err) {
    alert('Error detected! All event will be clear');
    localStorage.clear();
}
