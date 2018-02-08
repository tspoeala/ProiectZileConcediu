import $ from 'jquery';
import 'bootstrap-sass';
import 'bootstrap-datepicker';
import 'fullcalendar';

var event = [];

$(function () {
    $('#calendar').fullCalendar({

        eventSources: [
            {
                events: JSON.parse(freeDays),
                color: '#a94442',     // an option!
                textColor: 'white' // an option!
            },
        ],

        weekends: false,
    });

    $.each(JSON.parse(daysOff), function (key, value) {
        let event = {
            events: value['daysOff'],
            color: value['color'],     // an option!
            textColor: 'white' // an option!
        };

        $('#calendar').fullCalendar('addEventSource', event);
    });
});
