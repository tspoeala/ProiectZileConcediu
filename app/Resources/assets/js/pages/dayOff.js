import $ from 'jquery';
import 'bootstrap-sass';
import 'bootstrap-datepicker';
import 'daterangepicker';
import 'fullcalendar';

//delete console log at the end
console.log(array);
console.log(freeDays);
console.log(daysOff);
var event = [];

$(function () {
    $('input[name="daterange"]').daterangepicker(
        {
            datesDisabled: JSON.parse(array),
            locale: {
                format: 'MM/DD/YYYY',
                daysOfWeekDisabled: '06',
                todayHighlight: true,
                defaultDate: new Date(),
            },
            isInvalidDate: function (date) {
                if (date.day() === 0 || date.day() === 6 || $.inArray(date.format('MM/DD/YYYY'), JSON.parse(array)) !== -1) {
                    return true;
                }
            }


        }
    );
});
$(function () {
    $('#calendar').fullCalendar({

        eventSources: [
            {
                events: JSON.parse(freeDays),
                color: '#a94442',     // an option!
                textColor: 'white' // an option!
            },
        ],

        weekends: false
    });
    $.each(JSON.parse(daysOff), function (key, value) {
        let event = {
            events: value['daysOff'],
            allDay: true,
            nextDayThreshold: "00:00:00",
            color: value['color'],     // an option!
            textColor: 'white' // an option!
        };

        $('#calendar').fullCalendar('addEventSource', event);
    });
});
