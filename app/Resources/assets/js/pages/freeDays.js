import $ from 'jquery';
import 'bootstrap-sass';
import 'bootstrap-datepicker';

$(function () {
    console.log(array);
    $('#datetimepicker5').datepicker({
                             autoclose: true,    // It is false, by default
                             format: 'mm/dd/yyyy',
                             datesDisabled: JSON.parse(array),
                             daysOfWeekDisabled: '06',
                             todayHighlight: true,


                         })
                         .on('changeDate', function (e) {
                         });
});