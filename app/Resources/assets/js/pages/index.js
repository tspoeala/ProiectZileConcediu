import $ from 'jquery';
import 'bootstrap-sass';
import 'bootstrap-datepicker';
import 'fullcalendar';

console.log(array);
console.log(JSON.parse(array));

$(function () {
    $('#calendar').fullCalendar({
        eventSources: [
            {
                events: JSON.parse(array),
                color: '#a94442',     // an option!
                textColor: 'white' // an option!
            },

        ],
        weekends: false
    });
});