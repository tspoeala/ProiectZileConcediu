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
                    textColor: 'white',// an option!

                },
            ],

            eventClick: function (event, jsEvent, view) {
                var id = event.id;
                if (id === undefined) {
                    return false;
                }
                else {
                    $('#addModal').modal();
                    let finalPath = Rules.paths.moveFreeDay.replace('SETID', event.id);
                    console.log(finalPath);
                    $("#form_move_day").action = finalPath;
                    $('#save_move_day').click(function () {
                        $('#form_move_day').attr('action', finalPath);
                    });
                    // console.log(Rules.paths.moveFreeDay.replace('SETID', event.id));
                }
            },
            weekends: false,
        },
    );

    $.each(JSON.parse(daysOff), function (key, value) {
        let event1 = {
            events: value['daysOff'],
            allDay: true,
            nextDayThreshold: "00:00:00",
            color: value['color'],     // an option!
            textColor: 'white' // an option!

        };

        $('#calendar').fullCalendar('addEventSource', event1);
    });
});

$(function () {
    console.log(array);
    $('#datetimepicker5').datepicker({
                             autoclose: true,    // It is false, by default
                             format: 'mm/dd/yyyy',
                             datesDisabled: JSON.parse(array),
                             daysOfWeekDisabled: '06',
                             todayHighlight: true,
                             minDate: 0


                         })
                         .on('changeDate', function (e) {
                         });
});
