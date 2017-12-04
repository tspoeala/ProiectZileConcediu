import $ from 'jquery';
import 'bootstrap-sass';
import 'bootstrap-datepicker';
import 'daterangepicker';
import 'fullcalendar';

console.log(array);
console.log(freeAndDaysOff);
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
            // your event source
            {
                events: JSON.parse(freeAndDaysOff),
                color: '#a94442',     // an option!
                textColor: 'white' // an option!
            },

        ],
        weekends: false
    });
});
