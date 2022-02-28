import {Calendar} from "./calendar.js";
import {localStorageName} from "./calendar.js";

class Events extends Calendar {

    eventsTrigger() {
        this.elements.prevYear.addEventListener('click', e => {
            let calendar = this.getCalendar();
            this.updateTime(calendar.pYear);
            this.drawAll()
        });

        this.elements.nextYear.addEventListener('click', e => {
            let calendar = this.getCalendar();
            this.updateTime(calendar.nYear);
            this.drawAll()
        });

        this.elements.month.addEventListener('click', e => {
            let calendar = this.getCalendar();
            let month = e.srcElement.getAttribute('data-month');
            if (!month || calendar.active.month == month) return false;

            let newMonth = new Date(calendar.active.tm).setMonth(month);
            this.updateTime(newMonth);
            this.drawAll()
        });


        this.elements.days.addEventListener('click', e => {
            let element = e.srcElement;
            let day = element.getAttribute('data-day');
            let month = element.getAttribute('data-month');
            let year = element.getAttribute('data-year');
            if (!day) return false;
            let strDate = `${Number(month) + 1}/${day}/${year}`;
            this.updateTime(strDate);
            this.drawAll()
        });


        this.elements.eventAddBtn.addEventListener('click', e => {
            let id = localStorage.getItem('idCount');
            if (id === null) {
                id = 0;
            }
            id++;
            let fieldValue = this.elements.eventField.value;
            if (!fieldValue) return false;
            else if (fieldValue.length > 60) {

                alert('Number of symbols no more than 60!');
                return false;
            }
            let stringEvent = `<p>${fieldValue}</p><i class="fa fa-trash-o del-event-field-btn" job="delete" id="${id}"></i>`;
            let dateFormatted = this.getFormattedDate(new Date(this.date));
            if (!this.eventList[dateFormatted]) this.eventList[dateFormatted] = [];
            this.eventList[dateFormatted].push({
                name: stringEvent,
                id: id
            });
            localStorage.setItem(localStorageName, JSON.stringify(this.eventList));
            localStorage.setItem("idCount", id);
            this.elements.eventField.value = '';

            try {
                this.drawAll();
            } catch (err) {
                localStorage.clear();
                this.drawAll();
            }

        });
        this.elements.eventList.addEventListener('click', e => {
            let dateFormatted = this.getFormattedDate(new Date(this.date));
            let element = e.target;
            let classElement = element.className;
            let item = this.eventList[dateFormatted];
            if (classElement == "fa fa-trash-o del-event-field-btn") {
                element.parentNode.parentNode.removeChild(element.parentNode);
                console.log(this.eventList[dateFormatted]);
                for (let i = 0; i < item.length; i++) {
                    if (item[i].id == e.target.id) {
                        console.log('hi');
                        item.splice(i, 1);
                        break;
                    }
                }
                console.log(item.length);
                if (item.length == 0) {
                    delete this.eventList[dateFormatted];
                }
                localStorage.setItem(localStorageName, JSON.stringify(this.eventList));
                try {
                    this.drawAll();
                } catch (err) {
                    localStorage.clear();
                    this.drawAll();
                }

            }


        });
    }
}

export {Events, localStorageName};