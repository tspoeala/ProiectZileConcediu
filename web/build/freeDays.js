webpackJsonp([3],{

/***/ "./app/Resources/assets/js/pages/freeDays.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_sass__ = __webpack_require__("./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bootstrap_sass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_datepicker__ = __webpack_require__("./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bootstrap_datepicker__);




__WEBPACK_IMPORTED_MODULE_0_jquery___default()(function () {
                         console.log(array);
                         __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#datetimepicker5').datepicker({
                                                  autoclose: true, // It is false, by default
                                                  format: 'mm/dd/yyyy',
                                                  datesDisabled: JSON.parse(array),
                                                  daysOfWeekDisabled: '06',
                                                  todayHighlight: true,
                                                  minDate: 0

                         }).on('changeDate', function (e) {});
});

/***/ }),

/***/ "./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Datepicker for Bootstrap v1.7.1 (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

(function(factory){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined){
	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function isUTCEquals(date1, date2) {
		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	}
	function alias(method, deprecationMsg){
		return function(){
			if (deprecationMsg !== undefined) {
				$.fn.datepicker.deprecated(deprecationMsg);
			}

			return this[method].apply(this, arguments);
		};
	}
	function isValidDate(d) {
		return d && !isNaN(d.getTime());
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
          // Use date arithmetic to allow dates with different times to match
          if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 1000*60*60*24)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		$.data(element, 'datepicker', this);
		this._process_options(options);

		this.dates = new DateArray();
		this.viewDate = this.o.defaultViewDate;
		this.focusDate = null;

		this.element = $(element);
		this.isInput = this.element.is('input');
		this.inputField = this.isInput ? this.element : this.element.find('input');
		this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		if (this.component && this.component.length === 0)
			this.component = false;
		this.isInline = !this.component && this.element.is('div');

		this.picker = $(DPGlobal.template);

		// Checking templates and inserting
		if (this._check_template(this.o.templates.leftArrow)) {
			this.picker.find('.prev').html(this.o.templates.leftArrow);
		}

		if (this._check_template(this.o.templates.rightArrow)) {
			this.picker.find('.next').html(this.o.templates.rightArrow);
		}

		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		if (this.o.calendarWeeks) {
			this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear')
				.attr('colspan', function(i, val){
					return Number(val) + 1;
				});
		}

		this._process_options({
			startDate: this._o.startDate,
			endDate: this._o.endDate,
			daysOfWeekDisabled: this.o.daysOfWeekDisabled,
			daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
			datesDisabled: this.o.datesDisabled
		});

		this._allow_update = false;
		this.setViewMode(this.o.startView);
		this._allow_update = true;

		this.fillDow();
		this.fillMonths();

		this.update();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_resolveViewName: function(view){
			$.each(DPGlobal.viewModes, function(i, viewMode){
				if (view === i || $.inArray(view, viewMode.names) !== -1){
					view = i;
					return false;
				}
			});

			return view;
		},

		_resolveDaysOfWeek: function(daysOfWeek){
			if (!$.isArray(daysOfWeek))
				daysOfWeek = daysOfWeek.split(/[,\s]*/);
			return $.map(daysOfWeek, Number);
		},

		_check_template: function(tmp){
			try {
				// If empty
				if (tmp === undefined || tmp === "") {
					return false;
				}
				// If no html, everything ok
				if ((tmp.match(/[<>]/g) || []).length <= 0) {
					return true;
				}
				// Checking if html is fine
				var jDom = $(tmp);
				return jDom.length > 0;
			}
			catch (ex) {
				return false;
			}
		},

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			// Retrieve view index from any aliases
			o.startView = this._resolveViewName(o.startView);
			o.minViewMode = this._resolveViewName(o.minViewMode);
			o.maxViewMode = this._resolveViewName(o.maxViewMode);

			// Check view is between min and max
			o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = (o.weekStart + 6) % 7;

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled||[]);
			o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted||[]);

			o.datesDisabled = o.datesDisabled||[];
			if (!$.isArray(o.datesDisabled)) {
				o.datesDisabled = o.datesDisabled.split(',');
			}
			o.datesDisabled = $.map(o.datesDisabled, function(d){
				return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return /^auto|left|right|top|bottom$/.test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return /^left|right$/.test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return /^top|bottom$/.test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
			if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === 'string') {
				o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
			} else if (o.defaultViewDate) {
				var year = o.defaultViewDate.year || new Date().getFullYear();
				var month = o.defaultViewDate.month || 0;
				var day = o.defaultViewDate.day || 1;
				o.defaultViewDate = UTCDate(year, month, day);
			} else {
				o.defaultViewDate = UTCToday();
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				} else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				} else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
            var events = {
                keyup: $.proxy(function(e){
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };

            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }

            if (this.isInput) { // single input
                this._events = [
                    [this.element, events]
                ];
            }
            // component: input + button
            else if (this.component && this.inputField.length) {
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.inputField, events],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			if (this.o.immediateUpdates) {
				// Trigger input updates immediately on changed year/month
				this._events.push([this.element, {
					'changeYear changeMonth': $.proxy(function(e){
						this.update(e.date);
					}, this)
				}]);
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[this.picker, '.prev, .next', {
					click: $.proxy(this.navArrowsClick, this)
				}],
				[this.picker, '.day:not(.disabled)', {
					click: $.proxy(this.dayCellClick, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length ||
							this.isInline
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				viewMode: this.viewMode,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					} else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
				return;
			if (!this.isInline)
				this.picker.appendTo(this.o.container);
			this.place();
			this.picker.show();
			this._attachSecondaryEvents();
			this._trigger('show');
			if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
				$(this.element).blur();
			}
			return this;
		},

		hide: function(){
			if (this.isInline || !this.picker.is(':visible'))
				return this;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.setViewMode(this.o.startView);

			if (this.o.forceParse && this.inputField.val())
				this.setValue();
			this._trigger('hide');
			return this;
		},

		destroy: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
			return this;
		},

		paste: function(e){
			var dateString;
			if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types
				&& $.inArray('text/plain', e.originalEvent.clipboardData.types) !== -1) {
				dateString = e.originalEvent.clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				dateString = window.clipboardData.getData('Text');
			} else {
				return;
			}
			this.setDate(dateString);
			this.update();
			e.preventDefault();
		},

		_utc_to_local: function(utc){
			if (!utc) {
				return utc;
			}

			var local = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));

			if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) {
				local = new Date(utc.getTime() + (local.getTimezoneOffset() * 60000));
			}

			return local;
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			var selected_date = this.dates.get(-1);
			if (selected_date !== undefined) {
				return new Date(selected_date);
			} else {
				return null;
			}
		},

		clearDates: function(){
			this.inputField.val('');
			this.update();
			this._trigger('changeDate');

			if (this.o.autoclose) {
				this.hide();
			}
		},

		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.setDates.apply(this, $.map(args, this._utc_to_local));
			return this;
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),
		remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			this.inputField.val(formatted);
			return this;
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		getStartDate: function(){
			return this.o.startDate;
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		getEndDate: function(){
			return this.o.endDate;
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			return this;
		},

		setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
			this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
			this.update();
			return this;
		},

		setDatesDisabled: function(datesDisabled){
			this._process_options({datesDisabled: datesDisabled});
			this.update();
			return this;
		},

		place: function(){
			if (this.isInline)
				return this;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				container = $(this.o.container),
				windowWidth = container.width(),
				scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
				appendOffset = container.offset();

			var parentsZindex = [0];
			this.element.parents().each(function(){
				var itemZIndex = $(this).css('z-index');
				if (itemZIndex !== 'auto' && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
			});
			var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left - appendOffset.left;
			var top = offset.top - appendOffset.top;

			if (this.o.container !== 'body') {
				top += scrollTop;
			}

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				if (offset.left < 0) {
					// component is outside the window on the left side. Move it into visible range
					this.picker.addClass('datepicker-orient-left');
					left -= offset.left - visualPadding;
				} else if (left + calendarWidth > windowWidth) {
					// the calendar passes the widow right edge. Align it to component right side
					this.picker.addClass('datepicker-orient-right');
					left += width - calendarWidth;
				} else {
					if (this.o.rtl) {
						// Default to right
						this.picker.addClass('datepicker-orient-right');
					} else {
						// Default to left
						this.picker.addClass('datepicker-orient-left');
					}
				}
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + top - calendarHeight;
				yorient = top_overflow < 0 ? 'bottom' : 'top';
			}

			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));
			else
				top += height;

			if (this.o.rtl) {
				var right = windowWidth - (left + width);
				this.picker.css({
					top: top,
					right: right,
					zIndex: zIndex
				});
			} else {
				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			}
			return this;
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return this;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			} else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.inputField.val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					!this.dateWithinRange(date) ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.o.updateViewDate) {
				if (this.dates.length)
					this.viewDate = new Date(this.dates.get(-1));
				else if (this.viewDate < this.o.startDate)
					this.viewDate = new Date(this.o.startDate);
				else if (this.viewDate > this.o.endDate)
					this.viewDate = new Date(this.o.endDate);
				else
					this.viewDate = this.o.defaultViewDate;
			}

			if (fromArgs){
				// setting date by clicking
				this.setValue();
				this.element.change();
			}
			else if (this.dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates) && fromArgs) {
					this._trigger('changeDate');
					this.element.change();
				}
			}
			if (!this.dates.length && oldDates.length) {
				this._trigger('clearDate');
				this.element.change();
			}

			this.fill();
			return this;
		},

		fillDow: function(){
      if (this.o.showWeekDays) {
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				html += '<th class="cw">&#160;</th>';
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow';
        if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1)
          html += ' disabled';
        html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
      }
		},

		fillMonths: function(){
      var localDate = this._utc_to_local(this.viewDate);
			var html = '';
			var focused;
			for (var i = 0; i < 12; i++){
				focused = localDate && localDate.getMonth() === i ? ' focused' : '';
				html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + '</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = UTCToday();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with UTC today, not local today
			if (this.o.todayHighlight && isUTCEquals(date, today)) {
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (!this.dateWithinRange(date)){
				cls.push('disabled');
			}
			if (this.dateIsDisabled(date)){
				cls.push('disabled', 'disabled-date');
			}
			if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
				cls.push('highlighted');
			}

			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
				if (date.valueOf() === this.range[0]){
          cls.push('range-start');
        }
        if (date.valueOf() === this.range[this.range.length-1]){
          cls.push('range-end');
        }
			}
			return cls;
		},

		_fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn){
			var html = '';
			var step = factor / 10;
			var view = this.picker.find(selector);
			var startVal = Math.floor(year / factor) * factor;
			var endVal = startVal + step * 9;
			var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
			var selected = $.map(this.dates, function(d){
				return Math.floor(d.getUTCFullYear() / step) * step;
			});

			var classes, tooltip, before;
			for (var currVal = startVal - step; currVal <= endVal + step; currVal += step) {
				classes = [cssClass];
				tooltip = null;

				if (currVal === startVal - step) {
					classes.push('old');
				} else if (currVal === endVal + step) {
					classes.push('new');
				}
				if ($.inArray(currVal, selected) !== -1) {
					classes.push('active');
				}
				if (currVal < startYear || currVal > endYear) {
					classes.push('disabled');
				}
				if (currVal === focusedVal) {
				  classes.push('focused');
        }

				if (beforeFn !== $.noop) {
					before = beforeFn(new Date(currVal, 0, 1));
					if (before === undefined) {
						before = {};
					} else if (typeof before === 'boolean') {
						before = {enabled: before};
					} else if (typeof before === 'string') {
						before = {classes: before};
					}
					if (before.enabled === false) {
						classes.push('disabled');
					}
					if (before.classes) {
						classes = classes.concat(before.classes.split(/\s+/));
					}
					if (before.tooltip) {
						tooltip = before.tooltip;
					}
				}

				html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + currVal + '</span>';
			}

			view.find('.datepicker-switch').text(startVal + '-' + endVal);
			view.find('td').html(html);
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
				tooltip,
				before;
			if (isNaN(year) || isNaN(month))
				return;
			this.picker.find('.datepicker-days .datepicker-switch')
						.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
			this.picker.find('tfoot .today')
						.text(todaytxt)
						.css('display', this.o.todayBtn === true || this.o.todayBtn === 'linked' ? 'table-cell' : 'none');
			this.picker.find('tfoot .clear')
						.text(cleartxt)
						.css('display', this.o.clearBtn === true ? 'table-cell' : 'none');
			this.picker.find('thead .datepicker-title')
						.text(this.o.title)
						.css('display', typeof this.o.title === 'string' && this.o.title !== '' ? 'table-cell' : 'none');
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month, 0),
				day = prevMonth.getUTCDate();
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			if (prevMonth.getUTCFullYear() < 100){
        nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
      }
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var weekDay, clsName;
			while (prevMonth.valueOf() < nextMonth){
				weekDay = prevMonth.getUTCDay();
				if (weekDay === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek = (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');
					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				var content = prevMonth.getUTCDate();

				if (this.o.beforeShowDay !== $.noop){
					before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof before === 'boolean')
						before = {enabled: before};
					else if (typeof before === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
					if (before.content)
						content = before.content;
				}

				//Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
				//Fallback to unique function for older jquery versions
				if ($.isFunction($.uniqueSort)) {
					clsName = $.uniqueSort(clsName);
				} else {
					clsName = $.unique(clsName);
				}

				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + ' data-date="' + prevMonth.getTime().toString() + '">' + content + '</td>');
				tooltip = null;
				if (weekDay === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
			}
			this.picker.find('.datepicker-days tbody').html(html.join(''));

			var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
			var months = this.picker.find('.datepicker-months')
						.find('.datepicker-switch')
							.text(this.o.maxViewMode < 2 ? monthsTitle : year)
							.end()
						.find('tbody span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			if (this.o.beforeShowMonth !== $.noop){
				var that = this;
				$.each(months, function(i, month){
          var moDate = new Date(year, i, 1);
          var before = that.o.beforeShowMonth(moDate);
					if (before === undefined)
						before = {};
					else if (typeof before === 'boolean')
						before = {enabled: before};
					else if (typeof before === 'string')
						before = {classes: before};
					if (before.enabled === false && !$(month).hasClass('disabled'))
					    $(month).addClass('disabled');
					if (before.classes)
					    $(month).addClass(before.classes);
					if (before.tooltip)
					    $(month).prop('title', before.tooltip);
				});
			}

			// Generating decade/years picker
			this._fill_yearsView(
				'.datepicker-years',
				'year',
				10,
				year,
				startYear,
				endYear,
				this.o.beforeShowYear
			);

			// Generating century/decades picker
			this._fill_yearsView(
				'.datepicker-decades',
				'decade',
				100,
				year,
				startYear,
				endYear,
				this.o.beforeShowDecade
			);

			// Generating millennium/centuries picker
			this._fill_yearsView(
				'.datepicker-centuries',
				'century',
				1000,
				year,
				startYear,
				endYear,
				this.o.beforeShowCentury
			);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				prevIsDisabled,
				nextIsDisabled,
				factor = 1;
			switch (this.viewMode){
				case 0:
					prevIsDisabled = year <= startYear && month <= startMonth;
					nextIsDisabled = year >= endYear && month >= endMonth;
					break;
				case 4:
					factor *= 10;
					/* falls through */
				case 3:
					factor *= 10;
					/* falls through */
				case 2:
					factor *= 10;
					/* falls through */
				case 1:
					prevIsDisabled = Math.floor(year / factor) * factor <= startYear;
					nextIsDisabled = Math.floor(year / factor) * factor + factor >= endYear;
					break;
			}

			this.picker.find('.prev').toggleClass('disabled', prevIsDisabled);
			this.picker.find('.next').toggleClass('disabled', nextIsDisabled);
		},

		click: function(e){
			e.preventDefault();
			e.stopPropagation();

			var target, dir, day, year, month;
			target = $(e.target);

			// Clicked on the switch
			if (target.hasClass('datepicker-switch') && this.viewMode !== this.o.maxViewMode){
				this.setViewMode(this.viewMode + 1);
			}

			// Clicked on today button
			if (target.hasClass('today') && !target.hasClass('day')){
				this.setViewMode(0);
				this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
			}

			// Clicked on clear button
			if (target.hasClass('clear')){
				this.clearDates();
			}

			if (!target.hasClass('disabled')){
				// Clicked on a month, year, decade, century
				if (target.hasClass('month')
						|| target.hasClass('year')
						|| target.hasClass('decade')
						|| target.hasClass('century')) {
					this.viewDate.setUTCDate(1);

					day = 1;
					if (this.viewMode === 1){
						month = target.parent().find('span').index(target);
						year = this.viewDate.getUTCFullYear();
						this.viewDate.setUTCMonth(month);
					} else {
						month = 0;
						year = Number(target.text());
						this.viewDate.setUTCFullYear(year);
					}

					this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);

					if (this.viewMode === this.o.minViewMode){
						this._setDate(UTCDate(year, month, day));
					} else {
						this.setViewMode(this.viewMode - 1);
						this.fill();
					}
				}
			}

			if (this.picker.is(':visible') && this._focused_from){
				this._focused_from.focus();
			}
			delete this._focused_from;
		},

		dayCellClick: function(e){
			var $target = $(e.currentTarget);
			var timestamp = $target.data('date');
			var date = new Date(timestamp);

			if (this.o.updateViewDate) {
				if (date.getUTCFullYear() !== this.viewDate.getUTCFullYear()) {
					this._trigger('changeYear', this.viewDate);
				}

				if (date.getUTCMonth() !== this.viewDate.getUTCMonth()) {
					this._trigger('changeMonth', this.viewDate);
				}
			}
			this._setDate(date);
		},

		// Clicked on prev or next
		navArrowsClick: function(e){
			var $target = $(e.currentTarget);
			var dir = $target.hasClass('prev') ? -1 : 1;
			if (this.viewMode !== 0){
				dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
			}
			this.viewDate = this.moveMonth(this.viewDate, dir);
			this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
			this.fill();
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}

			if (ix !== -1){
				if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
					this.dates.remove(ix);
				}
			} else if (this.o.multidate === false) {
				this.dates.clear();
				this.dates.push(date);
			}
			else {
				this.dates.push(date);
			}

			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if ((!which && this.o.updateViewDate) || which === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			if (!which || which !== 'view') {
				this._trigger('changeDate');
			}
			this.inputField.trigger('change');
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveDay: function(date, dir){
			var newDate = new Date(date);
			newDate.setUTCDate(date.getUTCDate() + dir);

			return newDate;
		},

		moveWeek: function(date, dir){
			return this.moveDay(date, dir * 7);
		},

		moveMonth: function(date, dir){
			if (!isValidDate(date))
				return this.o.defaultViewDate;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		moveAvailableDate: function(date, dir, fn){
			do {
				date = this[fn](date, dir);

				if (!this.dateWithinRange(date))
					return false;

				fn = 'moveDay';
			}
			while (this.dateIsDisabled(date));

			return date;
		},

		weekOfDateIsDisabled: function(date){
			return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
		},

		dateIsDisabled: function(date){
			return (
				this.weekOfDateIsDisabled(date) ||
				$.grep(this.o.datesDisabled, function(d){
					return isUTCEquals(date, d);
				}).length > 0
			);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (!this.picker.is(':visible')){
				if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
					this.show();
					e.stopPropagation();
        }
				return;
			}
			var dateChanged = false,
				dir, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 37: // left
				case 38: // up
				case 39: // right
				case 40: // down
					if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
						break;
					dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
          if (this.viewMode === 0) {
  					if (e.ctrlKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

  						if (newViewDate)
  							this._trigger('changeYear', this.viewDate);
  					} else if (e.shiftKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

  						if (newViewDate)
  							this._trigger('changeMonth', this.viewDate);
  					} else if (e.keyCode === 37 || e.keyCode === 39){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
  					} else if (!this.weekOfDateIsDisabled(focusDate)){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
  					}
          } else if (this.viewMode === 1) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
          } else if (this.viewMode === 2) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
          }
					if (newViewDate){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 13: // enter
					if (!this.o.forceParse)
						break;
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						e.stopPropagation();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				this.inputField.trigger('change');
			}
		},

		setViewMode: function(viewMode){
			this.viewMode = viewMode;
			this.picker
				.children('div')
				.hide()
				.filter('.datepicker-' + DPGlobal.viewModes[this.viewMode].clsName)
					.show();
			this.updateNavArrows();
      this._trigger('changeViewMode', new Date(this.viewDate));
		}
	};

	var DateRangePicker = function(element, options){
		$.data(element, 'datepicker', this);
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		this.keepEmptyValues = options.keepEmptyValues;
		delete options.keepEmptyValues;

		datepickerPlugin.call($(this.inputs), options)
			.on('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $.data(i, 'datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $.data(e.target, 'datepicker');

			if (dp === undefined) {
				return;
			}

			var new_date = dp.getUTCDate(),
				keep_empty_values = this.keepEmptyValues,
				i = $.inArray(e.target, this.inputs),
				j = i - 1,
				k = i + 1,
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate() && (p === dp || !keep_empty_values))
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[j]){
				// Date being moved earlier/left
				while (j >= 0 && new_date < this.dates[j]){
					this.pickers[j--].setUTCDate(new_date);
				}
			} else if (new_date > this.dates[k]){
				// Date being moved later/right
				while (k < l && new_date > this.dates[k]){
					this.pickers[k++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		destroy: function(){
			$.map(this.pickers, function(p){ p.destroy(); });
			$(this.inputs).off('changeDate', this.dateUpdated);
			delete this.element.data().datepicker;
		},
		remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	var datepickerPlugin = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.hasClass('input-daterange') || opts.inputs){
					$.extend(opts, {
						inputs: opts.inputs || $this.find('input').toArray()
					});
					data = new DateRangePicker(this, opts);
				}
				else {
					data = new Datepicker(this, opts);
				}
				$this.data('datepicker', data);
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
			}
		});

		if (
			internal_return === undefined ||
			internal_return instanceof Datepicker ||
			internal_return instanceof DateRangePicker
		)
			return this;

		if (this.length > 1)
			throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
		else
			return internal_return;
	};
	$.fn.datepicker = datepickerPlugin;

	var defaults = $.fn.datepicker.defaults = {
		assumeNearbyYear: false,
		autoclose: false,
		beforeShowDay: $.noop,
		beforeShowMonth: $.noop,
		beforeShowYear: $.noop,
		beforeShowDecade: $.noop,
		beforeShowCentury: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		toggleActive: false,
		daysOfWeekDisabled: [],
		daysOfWeekHighlighted: [],
		datesDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keepEmptyValues: false,
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		maxViewMode: 4,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		updateViewDate: true,
		weekStart: 0,
		disableTouchKeyboard: false,
		enableOnReadonly: true,
		showOnFocus: true,
		zIndexOffset: 10,
		container: 'body',
		immediateUpdates: false,
		title: '',
		templates: {
			leftArrow: '&#x00AB;',
			rightArrow: '&#x00BB;'
		},
    showWeekDays: true
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear",
			titleFormat: "MM yyyy"
		}
	};

	var DPGlobal = {
		viewModes: [
			{
				names: ['days', 'month'],
				clsName: 'days',
				e: 'changeMonth'
			},
			{
				names: ['months', 'year'],
				clsName: 'months',
				e: 'changeYear',
				navStep: 1
			},
			{
				names: ['years', 'decade'],
				clsName: 'years',
				e: 'changeDecade',
				navStep: 10
			},
			{
				names: ['decades', 'century'],
				clsName: 'decades',
				e: 'changeCentury',
				navStep: 100
			},
			{
				names: ['centuries', 'millennium'],
				clsName: 'centuries',
				e: 'changeMillennium',
				navStep: 1000
			}
		],
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                return format;
            // IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language, assumeNearby){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toValue)
				return format.toValue(date, format, language);
			var fn_map = {
					d: 'moveDay',
					m: 'moveMonth',
					w: 'moveWeek',
					y: 'moveYear'
				},
				dateAliases = {
					yesterday: '-1d',
					today: '+0d',
					tomorrow: '+1d'
				},
				parts, part, dir, i, fn;
			if (date in dateAliases){
				date = dateAliases[date];
			}
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)){
				parts = date.match(/([\-+]\d+)([dmwy])/gi);
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = parts[i].match(/([\-+]\d+)([dmwy])/i);
					dir = Number(part[1]);
					fn = fn_map[part[2].toLowerCase()];
					date = Datepicker.prototype[fn](date, dir);
				}
				return Datepicker.prototype._zero_utc_time(date);
			}

			parts = date && date.match(this.nonpunctuation) || [];

			function applyNearbyYear(year, threshold){
				if (threshold === true)
					threshold = 10;

				// if year is 2 digits or less, than the user most likely is trying to get a recent century
				if (year < 100){
					year += 2000;
					// if the new year is more than threshold years in advance, use last century
					if (year > ((new Date()).getFullYear()+threshold)){
						year -= 100;
					}
				}

				return year;
			}

			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['yy'] = setters_map['yyyy'];
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCToday();
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m.toLowerCase() === p.toLowerCase();
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toDisplay)
                return format.toDisplay(date, format, language);
            var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
			              '<tr>'+
			                '<th colspan="7" class="datepicker-title"></th>'+
			              '</tr>'+
							'<tr>'+
								'<th class="prev">'+defaults.templates.leftArrow+'</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">'+defaults.templates.rightArrow+'</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-decades">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-centuries">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};

	/* DATEPICKER VERSION
	 * =================== */
	$.fn.datepicker.version = '1.7.1';

	$.fn.datepicker.deprecated = function(msg){
		var console = window.console;
		if (console && console.warn) {
			console.warn('DEPRECATED: ' + msg);
		}
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			datepickerPlugin.call($this, 'show');
		}
	);
	$(function(){
		datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	});

}));


/***/ })

},["./app/Resources/assets/js/pages/freeDays.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvUmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9mcmVlRGF5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qcyJdLCJuYW1lcyI6WyIkIiwiY29uc29sZSIsImxvZyIsImFycmF5IiwiZGF0ZXBpY2tlciIsImF1dG9jbG9zZSIsImZvcm1hdCIsImRhdGVzRGlzYWJsZWQiLCJKU09OIiwicGFyc2UiLCJkYXlzT2ZXZWVrRGlzYWJsZWQiLCJ0b2RheUhpZ2hsaWdodCIsIm1pbkRhdGUiLCJvbiIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsOENBQUFBLENBQUUsWUFBWTtBQUNWQyxpQ0FBUUMsR0FBUixDQUFZQyxLQUFaO0FBQ0FILHlCQUFBLDhDQUFBQSxDQUFFLGtCQUFGLEVBQXNCSSxVQUF0QixDQUFpQztBQUNSQyw2REFBVyxJQURILEVBQ1k7QUFDcEJDLDBEQUFRLFlBRkE7QUFHUkMsaUVBQWVDLEtBQUtDLEtBQUwsQ0FBV04sS0FBWCxDQUhQO0FBSVJPLHNFQUFvQixJQUpaO0FBS1JDLGtFQUFnQixJQUxSO0FBTVJDLDJEQUFTOztBQU5ELDBCQUFqQyxFQVVzQkMsRUFWdEIsQ0FVeUIsWUFWekIsRUFVdUMsVUFBVUMsQ0FBVixFQUFhLENBQzlCLENBWHRCO0FBWUgsQ0FkRCxFOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CO0FBQ3BCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHVDQUF1QztBQUNqRTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDBCQUEwQiw2Q0FBNkM7QUFDdkU7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwwQkFBMEIsNkJBQTZCO0FBQ3ZEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxzQ0FBc0MsMEJBQTBCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsbUNBQW1DLGFBQWEsRUFBRTtBQUNsRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixDQUFDIiwiZmlsZSI6ImZyZWVEYXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCAnYm9vdHN0cmFwLXNhc3MnO1xuaW1wb3J0ICdib290c3RyYXAtZGF0ZXBpY2tlcic7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKGFycmF5KTtcbiAgICAkKCcjZGF0ZXRpbWVwaWNrZXI1JykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jbG9zZTogdHJ1ZSwgICAgLy8gSXQgaXMgZmFsc2UsIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnbW0vZGQveXl5eScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IEpTT04ucGFyc2UoYXJyYXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlzT2ZXZWVrRGlzYWJsZWQ6ICcwNicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiAwXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9SZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL2ZyZWVEYXlzLmpzIiwiLyohXG4gKiBEYXRlcGlja2VyIGZvciBCb290c3RyYXAgdjEuNy4xIChodHRwczovL2dpdGh1Yi5jb20vdXhzb2x1dGlvbnMvYm9vdHN0cmFwLWRhdGVwaWNrZXIpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlIHYyLjAgKGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMClcbiAqL1xuXG4oZnVuY3Rpb24oZmFjdG9yeSl7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uKCQsIHVuZGVmaW5lZCl7XG5cdGZ1bmN0aW9uIFVUQ0RhdGUoKXtcblx0XHRyZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkoRGF0ZSwgYXJndW1lbnRzKSk7XG5cdH1cblx0ZnVuY3Rpb24gVVRDVG9kYXkoKXtcblx0XHR2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXHRcdHJldHVybiBVVENEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIHRvZGF5LmdldERhdGUoKSk7XG5cdH1cblx0ZnVuY3Rpb24gaXNVVENFcXVhbHMoZGF0ZTEsIGRhdGUyKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRhdGUxLmdldFVUQ0Z1bGxZZWFyKCkgPT09IGRhdGUyLmdldFVUQ0Z1bGxZZWFyKCkgJiZcblx0XHRcdGRhdGUxLmdldFVUQ01vbnRoKCkgPT09IGRhdGUyLmdldFVUQ01vbnRoKCkgJiZcblx0XHRcdGRhdGUxLmdldFVUQ0RhdGUoKSA9PT0gZGF0ZTIuZ2V0VVRDRGF0ZSgpXG5cdFx0KTtcblx0fVxuXHRmdW5jdGlvbiBhbGlhcyhtZXRob2QsIGRlcHJlY2F0aW9uTXNnKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdGlmIChkZXByZWNhdGlvbk1zZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdCQuZm4uZGF0ZXBpY2tlci5kZXByZWNhdGVkKGRlcHJlY2F0aW9uTXNnKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXNbbWV0aG9kXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblx0ZnVuY3Rpb24gaXNWYWxpZERhdGUoZCkge1xuXHRcdHJldHVybiBkICYmICFpc05hTihkLmdldFRpbWUoKSk7XG5cdH1cblxuXHR2YXIgRGF0ZUFycmF5ID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGV4dHJhcyA9IHtcblx0XHRcdGdldDogZnVuY3Rpb24oaSl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnNsaWNlKGkpWzBdO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRhaW5zOiBmdW5jdGlvbihkKXtcblx0XHRcdFx0Ly8gQXJyYXkuaW5kZXhPZiBpcyBub3QgY3Jvc3MtYnJvd3Nlcjtcblx0XHRcdFx0Ly8gJC5pbkFycmF5IGRvZXNuJ3Qgd29yayB3aXRoIERhdGVzXG5cdFx0XHRcdHZhciB2YWwgPSBkICYmIGQudmFsdWVPZigpO1xuXHRcdFx0XHRmb3IgKHZhciBpPTAsIGw9dGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICAgICAgLy8gVXNlIGRhdGUgYXJpdGhtZXRpYyB0byBhbGxvdyBkYXRlcyB3aXRoIGRpZmZlcmVudCB0aW1lcyB0byBtYXRjaFxuICAgICAgICAgIGlmICgwIDw9IHRoaXNbaV0udmFsdWVPZigpIC0gdmFsICYmIHRoaXNbaV0udmFsdWVPZigpIC0gdmFsIDwgMTAwMCo2MCo2MCoyNClcblx0XHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlOiBmdW5jdGlvbihpKXtcblx0XHRcdFx0dGhpcy5zcGxpY2UoaSwxKTtcblx0XHRcdH0sXG5cdFx0XHRyZXBsYWNlOiBmdW5jdGlvbihuZXdfYXJyYXkpe1xuXHRcdFx0XHRpZiAoIW5ld19hcnJheSlcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdGlmICghJC5pc0FycmF5KG5ld19hcnJheSkpXG5cdFx0XHRcdFx0bmV3X2FycmF5ID0gW25ld19hcnJheV07XG5cdFx0XHRcdHRoaXMuY2xlYXIoKTtcblx0XHRcdFx0dGhpcy5wdXNoLmFwcGx5KHRoaXMsIG5ld19hcnJheSk7XG5cdFx0XHR9LFxuXHRcdFx0Y2xlYXI6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHRoaXMubGVuZ3RoID0gMDtcblx0XHRcdH0sXG5cdFx0XHRjb3B5OiBmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgYSA9IG5ldyBEYXRlQXJyYXkoKTtcblx0XHRcdFx0YS5yZXBsYWNlKHRoaXMpO1xuXHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYSA9IFtdO1xuXHRcdFx0YS5wdXNoLmFwcGx5KGEsIGFyZ3VtZW50cyk7XG5cdFx0XHQkLmV4dGVuZChhLCBleHRyYXMpO1xuXHRcdFx0cmV0dXJuIGE7XG5cdFx0fTtcblx0fSkoKTtcblxuXG5cdC8vIFBpY2tlciBvYmplY3RcblxuXHR2YXIgRGF0ZXBpY2tlciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpe1xuXHRcdCQuZGF0YShlbGVtZW50LCAnZGF0ZXBpY2tlcicsIHRoaXMpO1xuXHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdHRoaXMuZGF0ZXMgPSBuZXcgRGF0ZUFycmF5KCk7XG5cdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuby5kZWZhdWx0Vmlld0RhdGU7XG5cdFx0dGhpcy5mb2N1c0RhdGUgPSBudWxsO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcblx0XHR0aGlzLmlzSW5wdXQgPSB0aGlzLmVsZW1lbnQuaXMoJ2lucHV0Jyk7XG5cdFx0dGhpcy5pbnB1dEZpZWxkID0gdGhpcy5pc0lucHV0ID8gdGhpcy5lbGVtZW50IDogdGhpcy5lbGVtZW50LmZpbmQoJ2lucHV0Jyk7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmVsZW1lbnQuaGFzQ2xhc3MoJ2RhdGUnKSA/IHRoaXMuZWxlbWVudC5maW5kKCcuYWRkLW9uLCAuaW5wdXQtZ3JvdXAtYWRkb24sIC5idG4nKSA6IGZhbHNlO1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCAmJiB0aGlzLmNvbXBvbmVudC5sZW5ndGggPT09IDApXG5cdFx0XHR0aGlzLmNvbXBvbmVudCA9IGZhbHNlO1xuXHRcdHRoaXMuaXNJbmxpbmUgPSAhdGhpcy5jb21wb25lbnQgJiYgdGhpcy5lbGVtZW50LmlzKCdkaXYnKTtcblxuXHRcdHRoaXMucGlja2VyID0gJChEUEdsb2JhbC50ZW1wbGF0ZSk7XG5cblx0XHQvLyBDaGVja2luZyB0ZW1wbGF0ZXMgYW5kIGluc2VydGluZ1xuXHRcdGlmICh0aGlzLl9jaGVja190ZW1wbGF0ZSh0aGlzLm8udGVtcGxhdGVzLmxlZnRBcnJvdykpIHtcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5wcmV2JykuaHRtbCh0aGlzLm8udGVtcGxhdGVzLmxlZnRBcnJvdyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2NoZWNrX3RlbXBsYXRlKHRoaXMuby50ZW1wbGF0ZXMucmlnaHRBcnJvdykpIHtcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5uZXh0JykuaHRtbCh0aGlzLm8udGVtcGxhdGVzLnJpZ2h0QXJyb3cpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2J1aWxkRXZlbnRzKCk7XG5cdFx0dGhpcy5fYXR0YWNoRXZlbnRzKCk7XG5cblx0XHRpZiAodGhpcy5pc0lubGluZSl7XG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1pbmxpbmUnKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLWRyb3Bkb3duIGRyb3Bkb3duLW1lbnUnKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vLnJ0bCl7XG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1ydGwnKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vLmNhbGVuZGFyV2Vla3MpIHtcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLWRheXMgLmRhdGVwaWNrZXItc3dpdGNoLCB0aGVhZCAuZGF0ZXBpY2tlci10aXRsZSwgdGZvb3QgLnRvZGF5LCB0Zm9vdCAuY2xlYXInKVxuXHRcdFx0XHQuYXR0cignY29sc3BhbicsIGZ1bmN0aW9uKGksIHZhbCl7XG5cdFx0XHRcdFx0cmV0dXJuIE51bWJlcih2YWwpICsgMTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtcblx0XHRcdHN0YXJ0RGF0ZTogdGhpcy5fby5zdGFydERhdGUsXG5cdFx0XHRlbmREYXRlOiB0aGlzLl9vLmVuZERhdGUsXG5cdFx0XHRkYXlzT2ZXZWVrRGlzYWJsZWQ6IHRoaXMuby5kYXlzT2ZXZWVrRGlzYWJsZWQsXG5cdFx0XHRkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IHRoaXMuby5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQsXG5cdFx0XHRkYXRlc0Rpc2FibGVkOiB0aGlzLm8uZGF0ZXNEaXNhYmxlZFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fYWxsb3dfdXBkYXRlID0gZmFsc2U7XG5cdFx0dGhpcy5zZXRWaWV3TW9kZSh0aGlzLm8uc3RhcnRWaWV3KTtcblx0XHR0aGlzLl9hbGxvd191cGRhdGUgPSB0cnVlO1xuXG5cdFx0dGhpcy5maWxsRG93KCk7XG5cdFx0dGhpcy5maWxsTW9udGhzKCk7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMuaXNJbmxpbmUpe1xuXHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0fVxuXHR9O1xuXG5cdERhdGVwaWNrZXIucHJvdG90eXBlID0ge1xuXHRcdGNvbnN0cnVjdG9yOiBEYXRlcGlja2VyLFxuXG5cdFx0X3Jlc29sdmVWaWV3TmFtZTogZnVuY3Rpb24odmlldyl7XG5cdFx0XHQkLmVhY2goRFBHbG9iYWwudmlld01vZGVzLCBmdW5jdGlvbihpLCB2aWV3TW9kZSl7XG5cdFx0XHRcdGlmICh2aWV3ID09PSBpIHx8ICQuaW5BcnJheSh2aWV3LCB2aWV3TW9kZS5uYW1lcykgIT09IC0xKXtcblx0XHRcdFx0XHR2aWV3ID0gaTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gdmlldztcblx0XHR9LFxuXG5cdFx0X3Jlc29sdmVEYXlzT2ZXZWVrOiBmdW5jdGlvbihkYXlzT2ZXZWVrKXtcblx0XHRcdGlmICghJC5pc0FycmF5KGRheXNPZldlZWspKVxuXHRcdFx0XHRkYXlzT2ZXZWVrID0gZGF5c09mV2Vlay5zcGxpdCgvWyxcXHNdKi8pO1xuXHRcdFx0cmV0dXJuICQubWFwKGRheXNPZldlZWssIE51bWJlcik7XG5cdFx0fSxcblxuXHRcdF9jaGVja190ZW1wbGF0ZTogZnVuY3Rpb24odG1wKXtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElmIGVtcHR5XG5cdFx0XHRcdGlmICh0bXAgPT09IHVuZGVmaW5lZCB8fCB0bXAgPT09IFwiXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gSWYgbm8gaHRtbCwgZXZlcnl0aGluZyBva1xuXHRcdFx0XHRpZiAoKHRtcC5tYXRjaCgvWzw+XS9nKSB8fCBbXSkubGVuZ3RoIDw9IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBDaGVja2luZyBpZiBodG1sIGlzIGZpbmVcblx0XHRcdFx0dmFyIGpEb20gPSAkKHRtcCk7XG5cdFx0XHRcdHJldHVybiBqRG9tLmxlbmd0aCA+IDA7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZXgpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcHJvY2Vzc19vcHRpb25zOiBmdW5jdGlvbihvcHRzKXtcblx0XHRcdC8vIFN0b3JlIHJhdyBvcHRpb25zIGZvciByZWZlcmVuY2Vcblx0XHRcdHRoaXMuX28gPSAkLmV4dGVuZCh7fSwgdGhpcy5fbywgb3B0cyk7XG5cdFx0XHQvLyBQcm9jZXNzZWQgb3B0aW9uc1xuXHRcdFx0dmFyIG8gPSB0aGlzLm8gPSAkLmV4dGVuZCh7fSwgdGhpcy5fbyk7XG5cblx0XHRcdC8vIENoZWNrIGlmIFwiZGUtREVcIiBzdHlsZSBkYXRlIGlzIGF2YWlsYWJsZSwgaWYgbm90IGxhbmd1YWdlIHNob3VsZFxuXHRcdFx0Ly8gZmFsbGJhY2sgdG8gMiBsZXR0ZXIgY29kZSBlZyBcImRlXCJcblx0XHRcdHZhciBsYW5nID0gby5sYW5ndWFnZTtcblx0XHRcdGlmICghZGF0ZXNbbGFuZ10pe1xuXHRcdFx0XHRsYW5nID0gbGFuZy5zcGxpdCgnLScpWzBdO1xuXHRcdFx0XHRpZiAoIWRhdGVzW2xhbmddKVxuXHRcdFx0XHRcdGxhbmcgPSBkZWZhdWx0cy5sYW5ndWFnZTtcblx0XHRcdH1cblx0XHRcdG8ubGFuZ3VhZ2UgPSBsYW5nO1xuXG5cdFx0XHQvLyBSZXRyaWV2ZSB2aWV3IGluZGV4IGZyb20gYW55IGFsaWFzZXNcblx0XHRcdG8uc3RhcnRWaWV3ID0gdGhpcy5fcmVzb2x2ZVZpZXdOYW1lKG8uc3RhcnRWaWV3KTtcblx0XHRcdG8ubWluVmlld01vZGUgPSB0aGlzLl9yZXNvbHZlVmlld05hbWUoby5taW5WaWV3TW9kZSk7XG5cdFx0XHRvLm1heFZpZXdNb2RlID0gdGhpcy5fcmVzb2x2ZVZpZXdOYW1lKG8ubWF4Vmlld01vZGUpO1xuXG5cdFx0XHQvLyBDaGVjayB2aWV3IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcblx0XHRcdG8uc3RhcnRWaWV3ID0gTWF0aC5tYXgodGhpcy5vLm1pblZpZXdNb2RlLCBNYXRoLm1pbih0aGlzLm8ubWF4Vmlld01vZGUsIG8uc3RhcnRWaWV3KSk7XG5cblx0XHRcdC8vIHRydWUsIGZhbHNlLCBvciBOdW1iZXIgPiAwXG5cdFx0XHRpZiAoby5tdWx0aWRhdGUgIT09IHRydWUpe1xuXHRcdFx0XHRvLm11bHRpZGF0ZSA9IE51bWJlcihvLm11bHRpZGF0ZSkgfHwgZmFsc2U7XG5cdFx0XHRcdGlmIChvLm11bHRpZGF0ZSAhPT0gZmFsc2UpXG5cdFx0XHRcdFx0by5tdWx0aWRhdGUgPSBNYXRoLm1heCgwLCBvLm11bHRpZGF0ZSk7XG5cdFx0XHR9XG5cdFx0XHRvLm11bHRpZGF0ZVNlcGFyYXRvciA9IFN0cmluZyhvLm11bHRpZGF0ZVNlcGFyYXRvcik7XG5cblx0XHRcdG8ud2Vla1N0YXJ0ICU9IDc7XG5cdFx0XHRvLndlZWtFbmQgPSAoby53ZWVrU3RhcnQgKyA2KSAlIDc7XG5cblx0XHRcdHZhciBmb3JtYXQgPSBEUEdsb2JhbC5wYXJzZUZvcm1hdChvLmZvcm1hdCk7XG5cdFx0XHRpZiAoby5zdGFydERhdGUgIT09IC1JbmZpbml0eSl7XG5cdFx0XHRcdGlmICghIW8uc3RhcnREYXRlKXtcblx0XHRcdFx0XHRpZiAoby5zdGFydERhdGUgaW5zdGFuY2VvZiBEYXRlKVxuXHRcdFx0XHRcdFx0by5zdGFydERhdGUgPSB0aGlzLl9sb2NhbF90b191dGModGhpcy5femVyb190aW1lKG8uc3RhcnREYXRlKSk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0by5zdGFydERhdGUgPSBEUEdsb2JhbC5wYXJzZURhdGUoby5zdGFydERhdGUsIGZvcm1hdCwgby5sYW5ndWFnZSwgby5hc3N1bWVOZWFyYnlZZWFyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRvLnN0YXJ0RGF0ZSA9IC1JbmZpbml0eTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKG8uZW5kRGF0ZSAhPT0gSW5maW5pdHkpe1xuXHRcdFx0XHRpZiAoISFvLmVuZERhdGUpe1xuXHRcdFx0XHRcdGlmIChvLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlKVxuXHRcdFx0XHRcdFx0by5lbmREYXRlID0gdGhpcy5fbG9jYWxfdG9fdXRjKHRoaXMuX3plcm9fdGltZShvLmVuZERhdGUpKTtcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRvLmVuZERhdGUgPSBEUEdsb2JhbC5wYXJzZURhdGUoby5lbmREYXRlLCBmb3JtYXQsIG8ubGFuZ3VhZ2UsIG8uYXNzdW1lTmVhcmJ5WWVhcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0by5lbmREYXRlID0gSW5maW5pdHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0by5kYXlzT2ZXZWVrRGlzYWJsZWQgPSB0aGlzLl9yZXNvbHZlRGF5c09mV2VlayhvLmRheXNPZldlZWtEaXNhYmxlZHx8W10pO1xuXHRcdFx0by5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQgPSB0aGlzLl9yZXNvbHZlRGF5c09mV2VlayhvLmRheXNPZldlZWtIaWdobGlnaHRlZHx8W10pO1xuXG5cdFx0XHRvLmRhdGVzRGlzYWJsZWQgPSBvLmRhdGVzRGlzYWJsZWR8fFtdO1xuXHRcdFx0aWYgKCEkLmlzQXJyYXkoby5kYXRlc0Rpc2FibGVkKSkge1xuXHRcdFx0XHRvLmRhdGVzRGlzYWJsZWQgPSBvLmRhdGVzRGlzYWJsZWQuc3BsaXQoJywnKTtcblx0XHRcdH1cblx0XHRcdG8uZGF0ZXNEaXNhYmxlZCA9ICQubWFwKG8uZGF0ZXNEaXNhYmxlZCwgZnVuY3Rpb24oZCl7XG5cdFx0XHRcdHJldHVybiBEUEdsb2JhbC5wYXJzZURhdGUoZCwgZm9ybWF0LCBvLmxhbmd1YWdlLCBvLmFzc3VtZU5lYXJieVllYXIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhciBwbGMgPSBTdHJpbmcoby5vcmllbnRhdGlvbikudG9Mb3dlckNhc2UoKS5zcGxpdCgvXFxzKy9nKSxcblx0XHRcdFx0X3BsYyA9IG8ub3JpZW50YXRpb24udG9Mb3dlckNhc2UoKTtcblx0XHRcdHBsYyA9ICQuZ3JlcChwbGMsIGZ1bmN0aW9uKHdvcmQpe1xuXHRcdFx0XHRyZXR1cm4gL15hdXRvfGxlZnR8cmlnaHR8dG9wfGJvdHRvbSQvLnRlc3Qod29yZCk7XG5cdFx0XHR9KTtcblx0XHRcdG8ub3JpZW50YXRpb24gPSB7eDogJ2F1dG8nLCB5OiAnYXV0byd9O1xuXHRcdFx0aWYgKCFfcGxjIHx8IF9wbGMgPT09ICdhdXRvJylcblx0XHRcdFx0OyAvLyBubyBhY3Rpb25cblx0XHRcdGVsc2UgaWYgKHBsYy5sZW5ndGggPT09IDEpe1xuXHRcdFx0XHRzd2l0Y2ggKHBsY1swXSl7XG5cdFx0XHRcdFx0Y2FzZSAndG9wJzpcblx0XHRcdFx0XHRjYXNlICdib3R0b20nOlxuXHRcdFx0XHRcdFx0by5vcmllbnRhdGlvbi55ID0gcGxjWzBdO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0XHRcdFx0by5vcmllbnRhdGlvbi54ID0gcGxjWzBdO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRfcGxjID0gJC5ncmVwKHBsYywgZnVuY3Rpb24od29yZCl7XG5cdFx0XHRcdFx0cmV0dXJuIC9ebGVmdHxyaWdodCQvLnRlc3Qod29yZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRvLm9yaWVudGF0aW9uLnggPSBfcGxjWzBdIHx8ICdhdXRvJztcblxuXHRcdFx0XHRfcGxjID0gJC5ncmVwKHBsYywgZnVuY3Rpb24od29yZCl7XG5cdFx0XHRcdFx0cmV0dXJuIC9edG9wfGJvdHRvbSQvLnRlc3Qod29yZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRvLm9yaWVudGF0aW9uLnkgPSBfcGxjWzBdIHx8ICdhdXRvJztcblx0XHRcdH1cblx0XHRcdGlmIChvLmRlZmF1bHRWaWV3RGF0ZSBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIG8uZGVmYXVsdFZpZXdEYXRlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRvLmRlZmF1bHRWaWV3RGF0ZSA9IERQR2xvYmFsLnBhcnNlRGF0ZShvLmRlZmF1bHRWaWV3RGF0ZSwgZm9ybWF0LCBvLmxhbmd1YWdlLCBvLmFzc3VtZU5lYXJieVllYXIpO1xuXHRcdFx0fSBlbHNlIGlmIChvLmRlZmF1bHRWaWV3RGF0ZSkge1xuXHRcdFx0XHR2YXIgeWVhciA9IG8uZGVmYXVsdFZpZXdEYXRlLnllYXIgfHwgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0XHR2YXIgbW9udGggPSBvLmRlZmF1bHRWaWV3RGF0ZS5tb250aCB8fCAwO1xuXHRcdFx0XHR2YXIgZGF5ID0gby5kZWZhdWx0Vmlld0RhdGUuZGF5IHx8IDE7XG5cdFx0XHRcdG8uZGVmYXVsdFZpZXdEYXRlID0gVVRDRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG8uZGVmYXVsdFZpZXdEYXRlID0gVVRDVG9kYXkoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF9ldmVudHM6IFtdLFxuXHRcdF9zZWNvbmRhcnlFdmVudHM6IFtdLFxuXHRcdF9hcHBseUV2ZW50czogZnVuY3Rpb24oZXZzKXtcblx0XHRcdGZvciAodmFyIGk9MCwgZWwsIGNoLCBldjsgaSA8IGV2cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGVsID0gZXZzW2ldWzBdO1xuXHRcdFx0XHRpZiAoZXZzW2ldLmxlbmd0aCA9PT0gMil7XG5cdFx0XHRcdFx0Y2ggPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0ZXYgPSBldnNbaV1bMV07XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZzW2ldLmxlbmd0aCA9PT0gMyl7XG5cdFx0XHRcdFx0Y2ggPSBldnNbaV1bMV07XG5cdFx0XHRcdFx0ZXYgPSBldnNbaV1bMl07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwub24oZXYsIGNoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF91bmFwcGx5RXZlbnRzOiBmdW5jdGlvbihldnMpe1xuXHRcdFx0Zm9yICh2YXIgaT0wLCBlbCwgZXYsIGNoOyBpIDwgZXZzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0ZWwgPSBldnNbaV1bMF07XG5cdFx0XHRcdGlmIChldnNbaV0ubGVuZ3RoID09PSAyKXtcblx0XHRcdFx0XHRjaCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRldiA9IGV2c1tpXVsxXTtcblx0XHRcdFx0fSBlbHNlIGlmIChldnNbaV0ubGVuZ3RoID09PSAzKXtcblx0XHRcdFx0XHRjaCA9IGV2c1tpXVsxXTtcblx0XHRcdFx0XHRldiA9IGV2c1tpXVsyXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbC5vZmYoZXYsIGNoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF9idWlsZEV2ZW50czogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBldmVudHMgPSB7XG4gICAgICAgICAgICAgICAga2V5dXA6ICQucHJveHkoZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoZS5rZXlDb2RlLCBbMjcsIDM3LCAzOSwgMzgsIDQwLCAzMiwgMTMsIDldKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpLFxuICAgICAgICAgICAgICAgIGtleWRvd246ICQucHJveHkodGhpcy5rZXlkb3duLCB0aGlzKSxcbiAgICAgICAgICAgICAgICBwYXN0ZTogJC5wcm94eSh0aGlzLnBhc3RlLCB0aGlzKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuby5zaG93T25Gb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5mb2N1cyA9ICQucHJveHkodGhpcy5zaG93LCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnB1dCkgeyAvLyBzaW5nbGUgaW5wdXRcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLmVsZW1lbnQsIGV2ZW50c11cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29tcG9uZW50OiBpbnB1dCArIGJ1dHRvblxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jb21wb25lbnQgJiYgdGhpcy5pbnB1dEZpZWxkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGNvbXBvbmVudHMgdGhhdCBhcmUgbm90IHJlYWRvbmx5LCBhbGxvdyBrZXlib2FyZCBuYXZcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMuaW5wdXRGaWVsZCwgZXZlbnRzXSxcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMuY29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogJC5wcm94eSh0aGlzLnNob3csIHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9ldmVudHMgPSBbXG5cdFx0XHRcdFx0W3RoaXMuZWxlbWVudCwge1xuXHRcdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5zaG93LCB0aGlzKSxcblx0XHRcdFx0XHRcdGtleWRvd246ICQucHJveHkodGhpcy5rZXlkb3duLCB0aGlzKVxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9ldmVudHMucHVzaChcblx0XHRcdFx0Ly8gQ29tcG9uZW50OiBsaXN0ZW4gZm9yIGJsdXIgb24gZWxlbWVudCBkZXNjZW5kYW50c1xuXHRcdFx0XHRbdGhpcy5lbGVtZW50LCAnKicsIHtcblx0XHRcdFx0XHRibHVyOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0dGhpcy5fZm9jdXNlZF9mcm9tID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0fSwgdGhpcylcblx0XHRcdFx0fV0sXG5cdFx0XHRcdC8vIElucHV0OiBsaXN0ZW4gZm9yIGJsdXIgb24gZWxlbWVudFxuXHRcdFx0XHRbdGhpcy5lbGVtZW50LCB7XG5cdFx0XHRcdFx0Ymx1cjogJC5wcm94eShmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdHRoaXMuX2ZvY3VzZWRfZnJvbSA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdH0sIHRoaXMpXG5cdFx0XHRcdH1dXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAodGhpcy5vLmltbWVkaWF0ZVVwZGF0ZXMpIHtcblx0XHRcdFx0Ly8gVHJpZ2dlciBpbnB1dCB1cGRhdGVzIGltbWVkaWF0ZWx5IG9uIGNoYW5nZWQgeWVhci9tb250aFxuXHRcdFx0XHR0aGlzLl9ldmVudHMucHVzaChbdGhpcy5lbGVtZW50LCB7XG5cdFx0XHRcdFx0J2NoYW5nZVllYXIgY2hhbmdlTW9udGgnOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGUoZS5kYXRlKTtcblx0XHRcdFx0XHR9LCB0aGlzKVxuXHRcdFx0XHR9XSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NlY29uZGFyeUV2ZW50cyA9IFtcblx0XHRcdFx0W3RoaXMucGlja2VyLCB7XG5cdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5jbGljaywgdGhpcylcblx0XHRcdFx0fV0sXG5cdFx0XHRcdFt0aGlzLnBpY2tlciwgJy5wcmV2LCAubmV4dCcsIHtcblx0XHRcdFx0XHRjbGljazogJC5wcm94eSh0aGlzLm5hdkFycm93c0NsaWNrLCB0aGlzKVxuXHRcdFx0XHR9XSxcblx0XHRcdFx0W3RoaXMucGlja2VyLCAnLmRheTpub3QoLmRpc2FibGVkKScsIHtcblx0XHRcdFx0XHRjbGljazogJC5wcm94eSh0aGlzLmRheUNlbGxDbGljaywgdGhpcylcblx0XHRcdFx0fV0sXG5cdFx0XHRcdFskKHdpbmRvdyksIHtcblx0XHRcdFx0XHRyZXNpemU6ICQucHJveHkodGhpcy5wbGFjZSwgdGhpcylcblx0XHRcdFx0fV0sXG5cdFx0XHRcdFskKGRvY3VtZW50KSwge1xuXHRcdFx0XHRcdCdtb3VzZWRvd24gdG91Y2hzdGFydCc6ICQucHJveHkoZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHQvLyBDbGlja2VkIG91dHNpZGUgdGhlIGRhdGVwaWNrZXIsIGhpZGUgaXRcblx0XHRcdFx0XHRcdGlmICghKFxuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuaXMoZS50YXJnZXQpIHx8XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5maW5kKGUudGFyZ2V0KS5sZW5ndGggfHxcblx0XHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuaXMoZS50YXJnZXQpIHx8XG5cdFx0XHRcdFx0XHRcdHRoaXMucGlja2VyLmZpbmQoZS50YXJnZXQpLmxlbmd0aCB8fFxuXHRcdFx0XHRcdFx0XHR0aGlzLmlzSW5saW5lXG5cdFx0XHRcdFx0XHQpKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgdGhpcylcblx0XHRcdFx0fV1cblx0XHRcdF07XG5cdFx0fSxcblx0XHRfYXR0YWNoRXZlbnRzOiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5fZGV0YWNoRXZlbnRzKCk7XG5cdFx0XHR0aGlzLl9hcHBseUV2ZW50cyh0aGlzLl9ldmVudHMpO1xuXHRcdH0sXG5cdFx0X2RldGFjaEV2ZW50czogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuX3VuYXBwbHlFdmVudHModGhpcy5fZXZlbnRzKTtcblx0XHR9LFxuXHRcdF9hdHRhY2hTZWNvbmRhcnlFdmVudHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLl9kZXRhY2hTZWNvbmRhcnlFdmVudHMoKTtcblx0XHRcdHRoaXMuX2FwcGx5RXZlbnRzKHRoaXMuX3NlY29uZGFyeUV2ZW50cyk7XG5cdFx0fSxcblx0XHRfZGV0YWNoU2Vjb25kYXJ5RXZlbnRzOiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5fdW5hcHBseUV2ZW50cyh0aGlzLl9zZWNvbmRhcnlFdmVudHMpO1xuXHRcdH0sXG5cdFx0X3RyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBhbHRkYXRlKXtcblx0XHRcdHZhciBkYXRlID0gYWx0ZGF0ZSB8fCB0aGlzLmRhdGVzLmdldCgtMSksXG5cdFx0XHRcdGxvY2FsX2RhdGUgPSB0aGlzLl91dGNfdG9fbG9jYWwoZGF0ZSk7XG5cblx0XHRcdHRoaXMuZWxlbWVudC50cmlnZ2VyKHtcblx0XHRcdFx0dHlwZTogZXZlbnQsXG5cdFx0XHRcdGRhdGU6IGxvY2FsX2RhdGUsXG5cdFx0XHRcdHZpZXdNb2RlOiB0aGlzLnZpZXdNb2RlLFxuXHRcdFx0XHRkYXRlczogJC5tYXAodGhpcy5kYXRlcywgdGhpcy5fdXRjX3RvX2xvY2FsKSxcblx0XHRcdFx0Zm9ybWF0OiAkLnByb3h5KGZ1bmN0aW9uKGl4LCBmb3JtYXQpe1xuXHRcdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRcdGl4ID0gdGhpcy5kYXRlcy5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gdGhpcy5vLmZvcm1hdDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpeCA9PT0gJ3N0cmluZycpe1xuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gaXg7XG5cdFx0XHRcdFx0XHRpeCA9IHRoaXMuZGF0ZXMubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuby5mb3JtYXQ7XG5cdFx0XHRcdFx0dmFyIGRhdGUgPSB0aGlzLmRhdGVzLmdldChpeCk7XG5cdFx0XHRcdFx0cmV0dXJuIERQR2xvYmFsLmZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCB0aGlzLm8ubGFuZ3VhZ2UpO1xuXHRcdFx0XHR9LCB0aGlzKVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdHNob3c6IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAodGhpcy5pbnB1dEZpZWxkLnByb3AoJ2Rpc2FibGVkJykgfHwgKHRoaXMuaW5wdXRGaWVsZC5wcm9wKCdyZWFkb25seScpICYmIHRoaXMuby5lbmFibGVPblJlYWRvbmx5ID09PSBmYWxzZSkpXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdGlmICghdGhpcy5pc0lubGluZSlcblx0XHRcdFx0dGhpcy5waWNrZXIuYXBwZW5kVG8odGhpcy5vLmNvbnRhaW5lcik7XG5cdFx0XHR0aGlzLnBsYWNlKCk7XG5cdFx0XHR0aGlzLnBpY2tlci5zaG93KCk7XG5cdFx0XHR0aGlzLl9hdHRhY2hTZWNvbmRhcnlFdmVudHMoKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3Nob3cnKTtcblx0XHRcdGlmICgod2luZG93Lm5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzIHx8ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50KSAmJiB0aGlzLm8uZGlzYWJsZVRvdWNoS2V5Ym9hcmQpIHtcblx0XHRcdFx0JCh0aGlzLmVsZW1lbnQpLmJsdXIoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRoaWRlOiBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKHRoaXMuaXNJbmxpbmUgfHwgIXRoaXMucGlja2VyLmlzKCc6dmlzaWJsZScpKVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcblx0XHRcdHRoaXMucGlja2VyLmhpZGUoKS5kZXRhY2goKTtcblx0XHRcdHRoaXMuX2RldGFjaFNlY29uZGFyeUV2ZW50cygpO1xuXHRcdFx0dGhpcy5zZXRWaWV3TW9kZSh0aGlzLm8uc3RhcnRWaWV3KTtcblxuXHRcdFx0aWYgKHRoaXMuby5mb3JjZVBhcnNlICYmIHRoaXMuaW5wdXRGaWVsZC52YWwoKSlcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xuXHRcdFx0dGhpcy5fdHJpZ2dlcignaGlkZScpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdHRoaXMuX2RldGFjaEV2ZW50cygpO1xuXHRcdFx0dGhpcy5fZGV0YWNoU2Vjb25kYXJ5RXZlbnRzKCk7XG5cdFx0XHR0aGlzLnBpY2tlci5yZW1vdmUoKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YSgpLmRhdGVwaWNrZXI7XG5cdFx0XHRpZiAoIXRoaXMuaXNJbnB1dCl7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YSgpLmRhdGU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cGFzdGU6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyIGRhdGVTdHJpbmc7XG5cdFx0XHRpZiAoZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEgJiYgZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEudHlwZXNcblx0XHRcdFx0JiYgJC5pbkFycmF5KCd0ZXh0L3BsYWluJywgZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEudHlwZXMpICE9PSAtMSkge1xuXHRcdFx0XHRkYXRlU3RyaW5nID0gZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuXHRcdFx0fSBlbHNlIGlmICh3aW5kb3cuY2xpcGJvYXJkRGF0YSkge1xuXHRcdFx0XHRkYXRlU3RyaW5nID0gd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXREYXRlKGRhdGVTdHJpbmcpO1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9LFxuXG5cdFx0X3V0Y190b19sb2NhbDogZnVuY3Rpb24odXRjKXtcblx0XHRcdGlmICghdXRjKSB7XG5cdFx0XHRcdHJldHVybiB1dGM7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBsb2NhbCA9IG5ldyBEYXRlKHV0Yy5nZXRUaW1lKCkgKyAodXRjLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCkpO1xuXG5cdFx0XHRpZiAobG9jYWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAhPT0gdXRjLmdldFRpbWV6b25lT2Zmc2V0KCkpIHtcblx0XHRcdFx0bG9jYWwgPSBuZXcgRGF0ZSh1dGMuZ2V0VGltZSgpICsgKGxvY2FsLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbG9jYWw7XG5cdFx0fSxcblx0XHRfbG9jYWxfdG9fdXRjOiBmdW5jdGlvbihsb2NhbCl7XG5cdFx0XHRyZXR1cm4gbG9jYWwgJiYgbmV3IERhdGUobG9jYWwuZ2V0VGltZSgpIC0gKGxvY2FsLmdldFRpbWV6b25lT2Zmc2V0KCkqNjAwMDApKTtcblx0XHR9LFxuXHRcdF96ZXJvX3RpbWU6IGZ1bmN0aW9uKGxvY2FsKXtcblx0XHRcdHJldHVybiBsb2NhbCAmJiBuZXcgRGF0ZShsb2NhbC5nZXRGdWxsWWVhcigpLCBsb2NhbC5nZXRNb250aCgpLCBsb2NhbC5nZXREYXRlKCkpO1xuXHRcdH0sXG5cdFx0X3plcm9fdXRjX3RpbWU6IGZ1bmN0aW9uKHV0Yyl7XG5cdFx0XHRyZXR1cm4gdXRjICYmIFVUQ0RhdGUodXRjLmdldFVUQ0Z1bGxZZWFyKCksIHV0Yy5nZXRVVENNb250aCgpLCB1dGMuZ2V0VVRDRGF0ZSgpKTtcblx0XHR9LFxuXG5cdFx0Z2V0RGF0ZXM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJC5tYXAodGhpcy5kYXRlcywgdGhpcy5fdXRjX3RvX2xvY2FsKTtcblx0XHR9LFxuXG5cdFx0Z2V0VVRDRGF0ZXM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XG5cdFx0XHRcdHJldHVybiBuZXcgRGF0ZShkKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRnZXREYXRlOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX3V0Y190b19sb2NhbCh0aGlzLmdldFVUQ0RhdGUoKSk7XG5cdFx0fSxcblxuXHRcdGdldFVUQ0RhdGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgc2VsZWN0ZWRfZGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KC0xKTtcblx0XHRcdGlmIChzZWxlY3RlZF9kYXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBEYXRlKHNlbGVjdGVkX2RhdGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGNsZWFyRGF0ZXM6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmlucHV0RmllbGQudmFsKCcnKTtcblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XG5cblx0XHRcdGlmICh0aGlzLm8uYXV0b2Nsb3NlKSB7XG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXREYXRlczogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhcmdzID0gJC5pc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdFx0XHR0aGlzLnVwZGF0ZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZURhdGUnKTtcblx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZXRVVENEYXRlczogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBhcmdzID0gJC5pc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdFx0XHR0aGlzLnNldERhdGVzLmFwcGx5KHRoaXMsICQubWFwKGFyZ3MsIHRoaXMuX3V0Y190b19sb2NhbCkpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNldERhdGU6IGFsaWFzKCdzZXREYXRlcycpLFxuXHRcdHNldFVUQ0RhdGU6IGFsaWFzKCdzZXRVVENEYXRlcycpLFxuXHRcdHJlbW92ZTogYWxpYXMoJ2Rlc3Ryb3knLCAnTWV0aG9kIGByZW1vdmVgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDIuMC4gVXNlIGBkZXN0cm95YCBpbnN0ZWFkJyksXG5cblx0XHRzZXRWYWx1ZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBmb3JtYXR0ZWQgPSB0aGlzLmdldEZvcm1hdHRlZERhdGUoKTtcblx0XHRcdHRoaXMuaW5wdXRGaWVsZC52YWwoZm9ybWF0dGVkKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRGb3JtYXR0ZWREYXRlOiBmdW5jdGlvbihmb3JtYXQpe1xuXHRcdFx0aWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRmb3JtYXQgPSB0aGlzLm8uZm9ybWF0O1xuXG5cdFx0XHR2YXIgbGFuZyA9IHRoaXMuby5sYW5ndWFnZTtcblx0XHRcdHJldHVybiAkLm1hcCh0aGlzLmRhdGVzLCBmdW5jdGlvbihkKXtcblx0XHRcdFx0cmV0dXJuIERQR2xvYmFsLmZvcm1hdERhdGUoZCwgZm9ybWF0LCBsYW5nKTtcblx0XHRcdH0pLmpvaW4odGhpcy5vLm11bHRpZGF0ZVNlcGFyYXRvcik7XG5cdFx0fSxcblxuXHRcdGdldFN0YXJ0RGF0ZTogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiB0aGlzLm8uc3RhcnREYXRlO1xuXHRcdH0sXG5cblx0XHRzZXRTdGFydERhdGU6IGZ1bmN0aW9uKHN0YXJ0RGF0ZSl7XG5cdFx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMoe3N0YXJ0RGF0ZTogc3RhcnREYXRlfSk7XG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy51cGRhdGVOYXZBcnJvd3MoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRFbmREYXRlOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuIHRoaXMuby5lbmREYXRlO1xuXHRcdH0sXG5cblx0XHRzZXRFbmREYXRlOiBmdW5jdGlvbihlbmREYXRlKXtcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZW5kRGF0ZTogZW5kRGF0ZX0pO1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdHRoaXMudXBkYXRlTmF2QXJyb3dzKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2V0RGF5c09mV2Vla0Rpc2FibGVkOiBmdW5jdGlvbihkYXlzT2ZXZWVrRGlzYWJsZWQpe1xuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtkYXlzT2ZXZWVrRGlzYWJsZWQ6IGRheXNPZldlZWtEaXNhYmxlZH0pO1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZXREYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IGZ1bmN0aW9uKGRheXNPZldlZWtIaWdobGlnaHRlZCl7XG5cdFx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMoe2RheXNPZldlZWtIaWdobGlnaHRlZDogZGF5c09mV2Vla0hpZ2hsaWdodGVkfSk7XG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNldERhdGVzRGlzYWJsZWQ6IGZ1bmN0aW9uKGRhdGVzRGlzYWJsZWQpe1xuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtkYXRlc0Rpc2FibGVkOiBkYXRlc0Rpc2FibGVkfSk7XG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHBsYWNlOiBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKHRoaXMuaXNJbmxpbmUpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0dmFyIGNhbGVuZGFyV2lkdGggPSB0aGlzLnBpY2tlci5vdXRlcldpZHRoKCksXG5cdFx0XHRcdGNhbGVuZGFySGVpZ2h0ID0gdGhpcy5waWNrZXIub3V0ZXJIZWlnaHQoKSxcblx0XHRcdFx0dmlzdWFsUGFkZGluZyA9IDEwLFxuXHRcdFx0XHRjb250YWluZXIgPSAkKHRoaXMuby5jb250YWluZXIpLFxuXHRcdFx0XHR3aW5kb3dXaWR0aCA9IGNvbnRhaW5lci53aWR0aCgpLFxuXHRcdFx0XHRzY3JvbGxUb3AgPSB0aGlzLm8uY29udGFpbmVyID09PSAnYm9keScgPyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA6IGNvbnRhaW5lci5zY3JvbGxUb3AoKSxcblx0XHRcdFx0YXBwZW5kT2Zmc2V0ID0gY29udGFpbmVyLm9mZnNldCgpO1xuXG5cdFx0XHR2YXIgcGFyZW50c1ppbmRleCA9IFswXTtcblx0XHRcdHRoaXMuZWxlbWVudC5wYXJlbnRzKCkuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgaXRlbVpJbmRleCA9ICQodGhpcykuY3NzKCd6LWluZGV4Jyk7XG5cdFx0XHRcdGlmIChpdGVtWkluZGV4ICE9PSAnYXV0bycgJiYgTnVtYmVyKGl0ZW1aSW5kZXgpICE9PSAwKSBwYXJlbnRzWmluZGV4LnB1c2goTnVtYmVyKGl0ZW1aSW5kZXgpKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHpJbmRleCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHBhcmVudHNaaW5kZXgpICsgdGhpcy5vLnpJbmRleE9mZnNldDtcblx0XHRcdHZhciBvZmZzZXQgPSB0aGlzLmNvbXBvbmVudCA/IHRoaXMuY29tcG9uZW50LnBhcmVudCgpLm9mZnNldCgpIDogdGhpcy5lbGVtZW50Lm9mZnNldCgpO1xuXHRcdFx0dmFyIGhlaWdodCA9IHRoaXMuY29tcG9uZW50ID8gdGhpcy5jb21wb25lbnQub3V0ZXJIZWlnaHQodHJ1ZSkgOiB0aGlzLmVsZW1lbnQub3V0ZXJIZWlnaHQoZmFsc2UpO1xuXHRcdFx0dmFyIHdpZHRoID0gdGhpcy5jb21wb25lbnQgPyB0aGlzLmNvbXBvbmVudC5vdXRlcldpZHRoKHRydWUpIDogdGhpcy5lbGVtZW50Lm91dGVyV2lkdGgoZmFsc2UpO1xuXHRcdFx0dmFyIGxlZnQgPSBvZmZzZXQubGVmdCAtIGFwcGVuZE9mZnNldC5sZWZ0O1xuXHRcdFx0dmFyIHRvcCA9IG9mZnNldC50b3AgLSBhcHBlbmRPZmZzZXQudG9wO1xuXG5cdFx0XHRpZiAodGhpcy5vLmNvbnRhaW5lciAhPT0gJ2JvZHknKSB7XG5cdFx0XHRcdHRvcCArPSBzY3JvbGxUb3A7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGlja2VyLnJlbW92ZUNsYXNzKFxuXHRcdFx0XHQnZGF0ZXBpY2tlci1vcmllbnQtdG9wIGRhdGVwaWNrZXItb3JpZW50LWJvdHRvbSAnK1xuXHRcdFx0XHQnZGF0ZXBpY2tlci1vcmllbnQtcmlnaHQgZGF0ZXBpY2tlci1vcmllbnQtbGVmdCdcblx0XHRcdCk7XG5cblx0XHRcdGlmICh0aGlzLm8ub3JpZW50YXRpb24ueCAhPT0gJ2F1dG8nKXtcblx0XHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItb3JpZW50LScgKyB0aGlzLm8ub3JpZW50YXRpb24ueCk7XG5cdFx0XHRcdGlmICh0aGlzLm8ub3JpZW50YXRpb24ueCA9PT0gJ3JpZ2h0Jylcblx0XHRcdFx0XHRsZWZ0IC09IGNhbGVuZGFyV2lkdGggLSB3aWR0aDtcblx0XHRcdH1cblx0XHRcdC8vIGF1dG8geCBvcmllbnRhdGlvbiBpcyBiZXN0LXBsYWNlbWVudDogaWYgaXQgY3Jvc3NlcyBhIHdpbmRvd1xuXHRcdFx0Ly8gZWRnZSwgZnVkZ2UgaXQgc2lkZXdheXNcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAob2Zmc2V0LmxlZnQgPCAwKSB7XG5cdFx0XHRcdFx0Ly8gY29tcG9uZW50IGlzIG91dHNpZGUgdGhlIHdpbmRvdyBvbiB0aGUgbGVmdCBzaWRlLiBNb3ZlIGl0IGludG8gdmlzaWJsZSByYW5nZVxuXHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1sZWZ0Jyk7XG5cdFx0XHRcdFx0bGVmdCAtPSBvZmZzZXQubGVmdCAtIHZpc3VhbFBhZGRpbmc7XG5cdFx0XHRcdH0gZWxzZSBpZiAobGVmdCArIGNhbGVuZGFyV2lkdGggPiB3aW5kb3dXaWR0aCkge1xuXHRcdFx0XHRcdC8vIHRoZSBjYWxlbmRhciBwYXNzZXMgdGhlIHdpZG93IHJpZ2h0IGVkZ2UuIEFsaWduIGl0IHRvIGNvbXBvbmVudCByaWdodCBzaWRlXG5cdFx0XHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItb3JpZW50LXJpZ2h0Jyk7XG5cdFx0XHRcdFx0bGVmdCArPSB3aWR0aCAtIGNhbGVuZGFyV2lkdGg7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuby5ydGwpIHtcblx0XHRcdFx0XHRcdC8vIERlZmF1bHQgdG8gcmlnaHRcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1yaWdodCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBEZWZhdWx0IHRvIGxlZnRcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1sZWZ0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGF1dG8geSBvcmllbnRhdGlvbiBpcyBiZXN0LXNpdHVhdGlvbjogdG9wIG9yIGJvdHRvbSwgbm8gZnVkZ2luZyxcblx0XHRcdC8vIGRlY2lzaW9uIGJhc2VkIG9uIHdoaWNoIHNob3dzIG1vcmUgb2YgdGhlIGNhbGVuZGFyXG5cdFx0XHR2YXIgeW9yaWVudCA9IHRoaXMuby5vcmllbnRhdGlvbi55LFxuXHRcdFx0XHR0b3Bfb3ZlcmZsb3c7XG5cdFx0XHRpZiAoeW9yaWVudCA9PT0gJ2F1dG8nKXtcblx0XHRcdFx0dG9wX292ZXJmbG93ID0gLXNjcm9sbFRvcCArIHRvcCAtIGNhbGVuZGFySGVpZ2h0O1xuXHRcdFx0XHR5b3JpZW50ID0gdG9wX292ZXJmbG93IDwgMCA/ICdib3R0b20nIDogJ3RvcCc7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC0nICsgeW9yaWVudCk7XG5cdFx0XHRpZiAoeW9yaWVudCA9PT0gJ3RvcCcpXG5cdFx0XHRcdHRvcCAtPSBjYWxlbmRhckhlaWdodCArIHBhcnNlSW50KHRoaXMucGlja2VyLmNzcygncGFkZGluZy10b3AnKSk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRvcCArPSBoZWlnaHQ7XG5cblx0XHRcdGlmICh0aGlzLm8ucnRsKSB7XG5cdFx0XHRcdHZhciByaWdodCA9IHdpbmRvd1dpZHRoIC0gKGxlZnQgKyB3aWR0aCk7XG5cdFx0XHRcdHRoaXMucGlja2VyLmNzcyh7XG5cdFx0XHRcdFx0dG9wOiB0b3AsXG5cdFx0XHRcdFx0cmlnaHQ6IHJpZ2h0LFxuXHRcdFx0XHRcdHpJbmRleDogekluZGV4XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5waWNrZXIuY3NzKHtcblx0XHRcdFx0XHR0b3A6IHRvcCxcblx0XHRcdFx0XHRsZWZ0OiBsZWZ0LFxuXHRcdFx0XHRcdHpJbmRleDogekluZGV4XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdF9hbGxvd191cGRhdGU6IHRydWUsXG5cdFx0dXBkYXRlOiBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKCF0aGlzLl9hbGxvd191cGRhdGUpXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHR2YXIgb2xkRGF0ZXMgPSB0aGlzLmRhdGVzLmNvcHkoKSxcblx0XHRcdFx0ZGF0ZXMgPSBbXSxcblx0XHRcdFx0ZnJvbUFyZ3MgPSBmYWxzZTtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKXtcblx0XHRcdFx0JC5lYWNoKGFyZ3VtZW50cywgJC5wcm94eShmdW5jdGlvbihpLCBkYXRlKXtcblx0XHRcdFx0XHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG5cdFx0XHRcdFx0XHRkYXRlID0gdGhpcy5fbG9jYWxfdG9fdXRjKGRhdGUpO1xuXHRcdFx0XHRcdGRhdGVzLnB1c2goZGF0ZSk7XG5cdFx0XHRcdH0sIHRoaXMpKTtcblx0XHRcdFx0ZnJvbUFyZ3MgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGF0ZXMgPSB0aGlzLmlzSW5wdXRcblx0XHRcdFx0XHRcdD8gdGhpcy5lbGVtZW50LnZhbCgpXG5cdFx0XHRcdFx0XHQ6IHRoaXMuZWxlbWVudC5kYXRhKCdkYXRlJykgfHwgdGhpcy5pbnB1dEZpZWxkLnZhbCgpO1xuXHRcdFx0XHRpZiAoZGF0ZXMgJiYgdGhpcy5vLm11bHRpZGF0ZSlcblx0XHRcdFx0XHRkYXRlcyA9IGRhdGVzLnNwbGl0KHRoaXMuby5tdWx0aWRhdGVTZXBhcmF0b3IpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0ZGF0ZXMgPSBbZGF0ZXNdO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGEoKS5kYXRlO1xuXHRcdFx0fVxuXG5cdFx0XHRkYXRlcyA9ICQubWFwKGRhdGVzLCAkLnByb3h5KGZ1bmN0aW9uKGRhdGUpe1xuXHRcdFx0XHRyZXR1cm4gRFBHbG9iYWwucGFyc2VEYXRlKGRhdGUsIHRoaXMuby5mb3JtYXQsIHRoaXMuby5sYW5ndWFnZSwgdGhpcy5vLmFzc3VtZU5lYXJieVllYXIpO1xuXHRcdFx0fSwgdGhpcykpO1xuXHRcdFx0ZGF0ZXMgPSAkLmdyZXAoZGF0ZXMsICQucHJveHkoZnVuY3Rpb24oZGF0ZSl7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0IXRoaXMuZGF0ZVdpdGhpblJhbmdlKGRhdGUpIHx8XG5cdFx0XHRcdFx0IWRhdGVcblx0XHRcdFx0KTtcblx0XHRcdH0sIHRoaXMpLCB0cnVlKTtcblx0XHRcdHRoaXMuZGF0ZXMucmVwbGFjZShkYXRlcyk7XG5cblx0XHRcdGlmICh0aGlzLm8udXBkYXRlVmlld0RhdGUpIHtcblx0XHRcdFx0aWYgKHRoaXMuZGF0ZXMubGVuZ3RoKVxuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVzLmdldCgtMSkpO1xuXHRcdFx0XHRlbHNlIGlmICh0aGlzLnZpZXdEYXRlIDwgdGhpcy5vLnN0YXJ0RGF0ZSlcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5vLnN0YXJ0RGF0ZSk7XG5cdFx0XHRcdGVsc2UgaWYgKHRoaXMudmlld0RhdGUgPiB0aGlzLm8uZW5kRGF0ZSlcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5vLmVuZERhdGUpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuby5kZWZhdWx0Vmlld0RhdGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmcm9tQXJncyl7XG5cdFx0XHRcdC8vIHNldHRpbmcgZGF0ZSBieSBjbGlja2luZ1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKCk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jaGFuZ2UoKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHRoaXMuZGF0ZXMubGVuZ3RoKXtcblx0XHRcdFx0Ly8gc2V0dGluZyBkYXRlIGJ5IHR5cGluZ1xuXHRcdFx0XHRpZiAoU3RyaW5nKG9sZERhdGVzKSAhPT0gU3RyaW5nKHRoaXMuZGF0ZXMpICYmIGZyb21BcmdzKSB7XG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlRGF0ZScpO1xuXHRcdFx0XHRcdHRoaXMuZWxlbWVudC5jaGFuZ2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF0aGlzLmRhdGVzLmxlbmd0aCAmJiBvbGREYXRlcy5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2xlYXJEYXRlJyk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jaGFuZ2UoKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZmlsbERvdzogZnVuY3Rpb24oKXtcbiAgICAgIGlmICh0aGlzLm8uc2hvd1dlZWtEYXlzKSB7XG5cdFx0XHR2YXIgZG93Q250ID0gdGhpcy5vLndlZWtTdGFydCxcblx0XHRcdFx0aHRtbCA9ICc8dHI+Jztcblx0XHRcdGlmICh0aGlzLm8uY2FsZW5kYXJXZWVrcyl7XG5cdFx0XHRcdGh0bWwgKz0gJzx0aCBjbGFzcz1cImN3XCI+JiMxNjA7PC90aD4nO1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKGRvd0NudCA8IHRoaXMuby53ZWVrU3RhcnQgKyA3KXtcblx0XHRcdFx0aHRtbCArPSAnPHRoIGNsYXNzPVwiZG93JztcbiAgICAgICAgaWYgKCQuaW5BcnJheShkb3dDbnQsIHRoaXMuby5kYXlzT2ZXZWVrRGlzYWJsZWQpICE9PSAtMSlcbiAgICAgICAgICBodG1sICs9ICcgZGlzYWJsZWQnO1xuICAgICAgICBodG1sICs9ICdcIj4nK2RhdGVzW3RoaXMuby5sYW5ndWFnZV0uZGF5c01pblsoZG93Q250KyspJTddKyc8L3RoPic7XG5cdFx0XHR9XG5cdFx0XHRodG1sICs9ICc8L3RyPic7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcuZGF0ZXBpY2tlci1kYXlzIHRoZWFkJykuYXBwZW5kKGh0bWwpO1xuICAgICAgfVxuXHRcdH0sXG5cblx0XHRmaWxsTW9udGhzOiBmdW5jdGlvbigpe1xuICAgICAgdmFyIGxvY2FsRGF0ZSA9IHRoaXMuX3V0Y190b19sb2NhbCh0aGlzLnZpZXdEYXRlKTtcblx0XHRcdHZhciBodG1sID0gJyc7XG5cdFx0XHR2YXIgZm9jdXNlZDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKyl7XG5cdFx0XHRcdGZvY3VzZWQgPSBsb2NhbERhdGUgJiYgbG9jYWxEYXRlLmdldE1vbnRoKCkgPT09IGkgPyAnIGZvY3VzZWQnIDogJyc7XG5cdFx0XHRcdGh0bWwgKz0gJzxzcGFuIGNsYXNzPVwibW9udGgnICsgZm9jdXNlZCArICdcIj4nICsgZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS5tb250aHNTaG9ydFtpXSArICc8L3NwYW4+Jztcblx0XHRcdH1cblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLW1vbnRocyB0ZCcpLmh0bWwoaHRtbCk7XG5cdFx0fSxcblxuXHRcdHNldFJhbmdlOiBmdW5jdGlvbihyYW5nZSl7XG5cdFx0XHRpZiAoIXJhbmdlIHx8ICFyYW5nZS5sZW5ndGgpXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLnJhbmdlO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLnJhbmdlID0gJC5tYXAocmFuZ2UsIGZ1bmN0aW9uKGQpe1xuXHRcdFx0XHRcdHJldHVybiBkLnZhbHVlT2YoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR0aGlzLmZpbGwoKTtcblx0XHR9LFxuXG5cdFx0Z2V0Q2xhc3NOYW1lczogZnVuY3Rpb24oZGF0ZSl7XG5cdFx0XHR2YXIgY2xzID0gW10sXG5cdFx0XHRcdHllYXIgPSB0aGlzLnZpZXdEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gdGhpcy52aWV3RGF0ZS5nZXRVVENNb250aCgpLFxuXHRcdFx0XHR0b2RheSA9IFVUQ1RvZGF5KCk7XG5cdFx0XHRpZiAoZGF0ZS5nZXRVVENGdWxsWWVhcigpIDwgeWVhciB8fCAoZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA8IG1vbnRoKSl7XG5cdFx0XHRcdGNscy5wdXNoKCdvbGQnKTtcblx0XHRcdH0gZWxzZSBpZiAoZGF0ZS5nZXRVVENGdWxsWWVhcigpID4geWVhciB8fCAoZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA+IG1vbnRoKSl7XG5cdFx0XHRcdGNscy5wdXNoKCduZXcnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmZvY3VzRGF0ZSAmJiBkYXRlLnZhbHVlT2YoKSA9PT0gdGhpcy5mb2N1c0RhdGUudmFsdWVPZigpKVxuXHRcdFx0XHRjbHMucHVzaCgnZm9jdXNlZCcpO1xuXHRcdFx0Ly8gQ29tcGFyZSBpbnRlcm5hbCBVVEMgZGF0ZSB3aXRoIFVUQyB0b2RheSwgbm90IGxvY2FsIHRvZGF5XG5cdFx0XHRpZiAodGhpcy5vLnRvZGF5SGlnaGxpZ2h0ICYmIGlzVVRDRXF1YWxzKGRhdGUsIHRvZGF5KSkge1xuXHRcdFx0XHRjbHMucHVzaCgndG9kYXknKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmRhdGVzLmNvbnRhaW5zKGRhdGUpICE9PSAtMSlcblx0XHRcdFx0Y2xzLnB1c2goJ2FjdGl2ZScpO1xuXHRcdFx0aWYgKCF0aGlzLmRhdGVXaXRoaW5SYW5nZShkYXRlKSl7XG5cdFx0XHRcdGNscy5wdXNoKCdkaXNhYmxlZCcpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZGF0ZUlzRGlzYWJsZWQoZGF0ZSkpe1xuXHRcdFx0XHRjbHMucHVzaCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQtZGF0ZScpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCQuaW5BcnJheShkYXRlLmdldFVUQ0RheSgpLCB0aGlzLm8uZGF5c09mV2Vla0hpZ2hsaWdodGVkKSAhPT0gLTEpe1xuXHRcdFx0XHRjbHMucHVzaCgnaGlnaGxpZ2h0ZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMucmFuZ2Upe1xuXHRcdFx0XHRpZiAoZGF0ZSA+IHRoaXMucmFuZ2VbMF0gJiYgZGF0ZSA8IHRoaXMucmFuZ2VbdGhpcy5yYW5nZS5sZW5ndGgtMV0pe1xuXHRcdFx0XHRcdGNscy5wdXNoKCdyYW5nZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkLmluQXJyYXkoZGF0ZS52YWx1ZU9mKCksIHRoaXMucmFuZ2UpICE9PSAtMSl7XG5cdFx0XHRcdFx0Y2xzLnB1c2goJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGRhdGUudmFsdWVPZigpID09PSB0aGlzLnJhbmdlWzBdKXtcbiAgICAgICAgICBjbHMucHVzaCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZS52YWx1ZU9mKCkgPT09IHRoaXMucmFuZ2VbdGhpcy5yYW5nZS5sZW5ndGgtMV0pe1xuICAgICAgICAgIGNscy5wdXNoKCdyYW5nZS1lbmQnKTtcbiAgICAgICAgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0X2ZpbGxfeWVhcnNWaWV3OiBmdW5jdGlvbihzZWxlY3RvciwgY3NzQ2xhc3MsIGZhY3RvciwgeWVhciwgc3RhcnRZZWFyLCBlbmRZZWFyLCBiZWZvcmVGbil7XG5cdFx0XHR2YXIgaHRtbCA9ICcnO1xuXHRcdFx0dmFyIHN0ZXAgPSBmYWN0b3IgLyAxMDtcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5waWNrZXIuZmluZChzZWxlY3Rvcik7XG5cdFx0XHR2YXIgc3RhcnRWYWwgPSBNYXRoLmZsb29yKHllYXIgLyBmYWN0b3IpICogZmFjdG9yO1xuXHRcdFx0dmFyIGVuZFZhbCA9IHN0YXJ0VmFsICsgc3RlcCAqIDk7XG5cdFx0XHR2YXIgZm9jdXNlZFZhbCA9IE1hdGguZmxvb3IodGhpcy52aWV3RGF0ZS5nZXRGdWxsWWVhcigpIC8gc3RlcCkgKiBzdGVwO1xuXHRcdFx0dmFyIHNlbGVjdGVkID0gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKGQuZ2V0VVRDRnVsbFllYXIoKSAvIHN0ZXApICogc3RlcDtcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgY2xhc3NlcywgdG9vbHRpcCwgYmVmb3JlO1xuXHRcdFx0Zm9yICh2YXIgY3VyclZhbCA9IHN0YXJ0VmFsIC0gc3RlcDsgY3VyclZhbCA8PSBlbmRWYWwgKyBzdGVwOyBjdXJyVmFsICs9IHN0ZXApIHtcblx0XHRcdFx0Y2xhc3NlcyA9IFtjc3NDbGFzc107XG5cdFx0XHRcdHRvb2x0aXAgPSBudWxsO1xuXG5cdFx0XHRcdGlmIChjdXJyVmFsID09PSBzdGFydFZhbCAtIHN0ZXApIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ29sZCcpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGN1cnJWYWwgPT09IGVuZFZhbCArIHN0ZXApIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ25ldycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkLmluQXJyYXkoY3VyclZhbCwgc2VsZWN0ZWQpICE9PSAtMSkge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGN1cnJWYWwgPCBzdGFydFllYXIgfHwgY3VyclZhbCA+IGVuZFllYXIpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGN1cnJWYWwgPT09IGZvY3VzZWRWYWwpIHtcblx0XHRcdFx0ICBjbGFzc2VzLnB1c2goJ2ZvY3VzZWQnKTtcbiAgICAgICAgfVxuXG5cdFx0XHRcdGlmIChiZWZvcmVGbiAhPT0gJC5ub29wKSB7XG5cdFx0XHRcdFx0YmVmb3JlID0gYmVmb3JlRm4obmV3IERhdGUoY3VyclZhbCwgMCwgMSkpO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0YmVmb3JlID0ge307XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYmVmb3JlID09PSAnYm9vbGVhbicpIHtcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtlbmFibGVkOiBiZWZvcmV9O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtjbGFzc2VzOiBiZWZvcmV9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYmVmb3JlLmVuYWJsZWQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChiZWZvcmUuY2xhc3Nlcykge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGJlZm9yZS5jbGFzc2VzLnNwbGl0KC9cXHMrLykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYmVmb3JlLnRvb2x0aXApIHtcblx0XHRcdFx0XHRcdHRvb2x0aXAgPSBiZWZvcmUudG9vbHRpcDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRodG1sICs9ICc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc2VzLmpvaW4oJyAnKSArICdcIicgKyAodG9vbHRpcCA/ICcgdGl0bGU9XCInICsgdG9vbHRpcCArICdcIicgOiAnJykgKyAnPicgKyBjdXJyVmFsICsgJzwvc3Bhbj4nO1xuXHRcdFx0fVxuXG5cdFx0XHR2aWV3LmZpbmQoJy5kYXRlcGlja2VyLXN3aXRjaCcpLnRleHQoc3RhcnRWYWwgKyAnLScgKyBlbmRWYWwpO1xuXHRcdFx0dmlldy5maW5kKCd0ZCcpLmh0bWwoaHRtbCk7XG5cdFx0fSxcblxuXHRcdGZpbGw6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgZCA9IG5ldyBEYXRlKHRoaXMudmlld0RhdGUpLFxuXHRcdFx0XHR5ZWFyID0gZC5nZXRVVENGdWxsWWVhcigpLFxuXHRcdFx0XHRtb250aCA9IGQuZ2V0VVRDTW9udGgoKSxcblx0XHRcdFx0c3RhcnRZZWFyID0gdGhpcy5vLnN0YXJ0RGF0ZSAhPT0gLUluZmluaXR5ID8gdGhpcy5vLnN0YXJ0RGF0ZS5nZXRVVENGdWxsWWVhcigpIDogLUluZmluaXR5LFxuXHRcdFx0XHRzdGFydE1vbnRoID0gdGhpcy5vLnN0YXJ0RGF0ZSAhPT0gLUluZmluaXR5ID8gdGhpcy5vLnN0YXJ0RGF0ZS5nZXRVVENNb250aCgpIDogLUluZmluaXR5LFxuXHRcdFx0XHRlbmRZZWFyID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IEluZmluaXR5LFxuXHRcdFx0XHRlbmRNb250aCA9IHRoaXMuby5lbmREYXRlICE9PSBJbmZpbml0eSA/IHRoaXMuby5lbmREYXRlLmdldFVUQ01vbnRoKCkgOiBJbmZpbml0eSxcblx0XHRcdFx0dG9kYXl0eHQgPSBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLnRvZGF5IHx8IGRhdGVzWydlbiddLnRvZGF5IHx8ICcnLFxuXHRcdFx0XHRjbGVhcnR4dCA9IGRhdGVzW3RoaXMuby5sYW5ndWFnZV0uY2xlYXIgfHwgZGF0ZXNbJ2VuJ10uY2xlYXIgfHwgJycsXG5cdFx0XHRcdHRpdGxlRm9ybWF0ID0gZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS50aXRsZUZvcm1hdCB8fCBkYXRlc1snZW4nXS50aXRsZUZvcm1hdCxcblx0XHRcdFx0dG9vbHRpcCxcblx0XHRcdFx0YmVmb3JlO1xuXHRcdFx0aWYgKGlzTmFOKHllYXIpIHx8IGlzTmFOKG1vbnRoKSlcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItZGF5cyAuZGF0ZXBpY2tlci1zd2l0Y2gnKVxuXHRcdFx0XHRcdFx0LnRleHQoRFBHbG9iYWwuZm9ybWF0RGF0ZShkLCB0aXRsZUZvcm1hdCwgdGhpcy5vLmxhbmd1YWdlKSk7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCd0Zm9vdCAudG9kYXknKVxuXHRcdFx0XHRcdFx0LnRleHQodG9kYXl0eHQpXG5cdFx0XHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgdGhpcy5vLnRvZGF5QnRuID09PSB0cnVlIHx8IHRoaXMuby50b2RheUJ0biA9PT0gJ2xpbmtlZCcgPyAndGFibGUtY2VsbCcgOiAnbm9uZScpO1xuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgndGZvb3QgLmNsZWFyJylcblx0XHRcdFx0XHRcdC50ZXh0KGNsZWFydHh0KVxuXHRcdFx0XHRcdFx0LmNzcygnZGlzcGxheScsIHRoaXMuby5jbGVhckJ0biA9PT0gdHJ1ZSA/ICd0YWJsZS1jZWxsJyA6ICdub25lJyk7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCd0aGVhZCAuZGF0ZXBpY2tlci10aXRsZScpXG5cdFx0XHRcdFx0XHQudGV4dCh0aGlzLm8udGl0bGUpXG5cdFx0XHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgdHlwZW9mIHRoaXMuby50aXRsZSA9PT0gJ3N0cmluZycgJiYgdGhpcy5vLnRpdGxlICE9PSAnJyA/ICd0YWJsZS1jZWxsJyA6ICdub25lJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZU5hdkFycm93cygpO1xuXHRcdFx0dGhpcy5maWxsTW9udGhzKCk7XG5cdFx0XHR2YXIgcHJldk1vbnRoID0gVVRDRGF0ZSh5ZWFyLCBtb250aCwgMCksXG5cdFx0XHRcdGRheSA9IHByZXZNb250aC5nZXRVVENEYXRlKCk7XG5cdFx0XHRwcmV2TW9udGguc2V0VVRDRGF0ZShkYXkgLSAocHJldk1vbnRoLmdldFVUQ0RheSgpIC0gdGhpcy5vLndlZWtTdGFydCArIDcpJTcpO1xuXHRcdFx0dmFyIG5leHRNb250aCA9IG5ldyBEYXRlKHByZXZNb250aCk7XG5cdFx0XHRpZiAocHJldk1vbnRoLmdldFVUQ0Z1bGxZZWFyKCkgPCAxMDApe1xuICAgICAgICBuZXh0TW9udGguc2V0VVRDRnVsbFllYXIocHJldk1vbnRoLmdldFVUQ0Z1bGxZZWFyKCkpO1xuICAgICAgfVxuXHRcdFx0bmV4dE1vbnRoLnNldFVUQ0RhdGUobmV4dE1vbnRoLmdldFVUQ0RhdGUoKSArIDQyKTtcblx0XHRcdG5leHRNb250aCA9IG5leHRNb250aC52YWx1ZU9mKCk7XG5cdFx0XHR2YXIgaHRtbCA9IFtdO1xuXHRcdFx0dmFyIHdlZWtEYXksIGNsc05hbWU7XG5cdFx0XHR3aGlsZSAocHJldk1vbnRoLnZhbHVlT2YoKSA8IG5leHRNb250aCl7XG5cdFx0XHRcdHdlZWtEYXkgPSBwcmV2TW9udGguZ2V0VVRDRGF5KCk7XG5cdFx0XHRcdGlmICh3ZWVrRGF5ID09PSB0aGlzLm8ud2Vla1N0YXJ0KXtcblx0XHRcdFx0XHRodG1sLnB1c2goJzx0cj4nKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vLmNhbGVuZGFyV2Vla3Mpe1xuXHRcdFx0XHRcdFx0Ly8gSVNPIDg2MDE6IEZpcnN0IHdlZWsgY29udGFpbnMgZmlyc3QgdGh1cnNkYXkuXG5cdFx0XHRcdFx0XHQvLyBJU08gYWxzbyBzdGF0ZXMgd2VlayBzdGFydHMgb24gTW9uZGF5LCBidXQgd2UgY2FuIGJlIG1vcmUgYWJzdHJhY3QgaGVyZS5cblx0XHRcdFx0XHRcdHZhclxuXHRcdFx0XHRcdFx0XHQvLyBTdGFydCBvZiBjdXJyZW50IHdlZWs6IGJhc2VkIG9uIHdlZWtzdGFydC9jdXJyZW50IGRhdGVcblx0XHRcdFx0XHRcdFx0d3MgPSBuZXcgRGF0ZSgrcHJldk1vbnRoICsgKHRoaXMuby53ZWVrU3RhcnQgLSB3ZWVrRGF5IC0gNykgJSA3ICogODY0ZTUpLFxuXHRcdFx0XHRcdFx0XHQvLyBUaHVyc2RheSBvZiB0aGlzIHdlZWtcblx0XHRcdFx0XHRcdFx0dGggPSBuZXcgRGF0ZShOdW1iZXIod3MpICsgKDcgKyA0IC0gd3MuZ2V0VVRDRGF5KCkpICUgNyAqIDg2NGU1KSxcblx0XHRcdFx0XHRcdFx0Ly8gRmlyc3QgVGh1cnNkYXkgb2YgeWVhciwgeWVhciBmcm9tIHRodXJzZGF5XG5cdFx0XHRcdFx0XHRcdHl0aCA9IG5ldyBEYXRlKE51bWJlcih5dGggPSBVVENEYXRlKHRoLmdldFVUQ0Z1bGxZZWFyKCksIDAsIDEpKSArICg3ICsgNCAtIHl0aC5nZXRVVENEYXkoKSkgJSA3ICogODY0ZTUpLFxuXHRcdFx0XHRcdFx0XHQvLyBDYWxlbmRhciB3ZWVrOiBtcyBiZXR3ZWVuIHRodXJzZGF5cywgZGl2IG1zIHBlciBkYXksIGRpdiA3IGRheXNcblx0XHRcdFx0XHRcdFx0Y2FsV2VlayA9ICh0aCAtIHl0aCkgLyA4NjRlNSAvIDcgKyAxO1xuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8dGQgY2xhc3M9XCJjd1wiPicrIGNhbFdlZWsgKyc8L3RkPicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRjbHNOYW1lID0gdGhpcy5nZXRDbGFzc05hbWVzKHByZXZNb250aCk7XG5cdFx0XHRcdGNsc05hbWUucHVzaCgnZGF5Jyk7XG5cblx0XHRcdFx0dmFyIGNvbnRlbnQgPSBwcmV2TW9udGguZ2V0VVRDRGF0ZSgpO1xuXG5cdFx0XHRcdGlmICh0aGlzLm8uYmVmb3JlU2hvd0RheSAhPT0gJC5ub29wKXtcblx0XHRcdFx0XHRiZWZvcmUgPSB0aGlzLm8uYmVmb3JlU2hvd0RheSh0aGlzLl91dGNfdG9fbG9jYWwocHJldk1vbnRoKSk7XG5cdFx0XHRcdFx0aWYgKGJlZm9yZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge307XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge2VuYWJsZWQ6IGJlZm9yZX07XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ3N0cmluZycpXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7Y2xhc3NlczogYmVmb3JlfTtcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmVuYWJsZWQgPT09IGZhbHNlKVxuXHRcdFx0XHRcdFx0Y2xzTmFtZS5wdXNoKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUuY2xhc3Nlcylcblx0XHRcdFx0XHRcdGNsc05hbWUgPSBjbHNOYW1lLmNvbmNhdChiZWZvcmUuY2xhc3Nlcy5zcGxpdCgvXFxzKy8pKTtcblx0XHRcdFx0XHRpZiAoYmVmb3JlLnRvb2x0aXApXG5cdFx0XHRcdFx0XHR0b29sdGlwID0gYmVmb3JlLnRvb2x0aXA7XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5jb250ZW50KVxuXHRcdFx0XHRcdFx0Y29udGVudCA9IGJlZm9yZS5jb250ZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9DaGVjayBpZiB1bmlxdWVTb3J0IGV4aXN0cyAoc3VwcG9ydGVkIGJ5IGpxdWVyeSA+PTEuMTIgYW5kID49Mi4yKVxuXHRcdFx0XHQvL0ZhbGxiYWNrIHRvIHVuaXF1ZSBmdW5jdGlvbiBmb3Igb2xkZXIganF1ZXJ5IHZlcnNpb25zXG5cdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24oJC51bmlxdWVTb3J0KSkge1xuXHRcdFx0XHRcdGNsc05hbWUgPSAkLnVuaXF1ZVNvcnQoY2xzTmFtZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xzTmFtZSA9ICQudW5pcXVlKGNsc05hbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aHRtbC5wdXNoKCc8dGQgY2xhc3M9XCInK2Nsc05hbWUuam9pbignICcpKydcIicgKyAodG9vbHRpcCA/ICcgdGl0bGU9XCInK3Rvb2x0aXArJ1wiJyA6ICcnKSArICcgZGF0YS1kYXRlPVwiJyArIHByZXZNb250aC5nZXRUaW1lKCkudG9TdHJpbmcoKSArICdcIj4nICsgY29udGVudCArICc8L3RkPicpO1xuXHRcdFx0XHR0b29sdGlwID0gbnVsbDtcblx0XHRcdFx0aWYgKHdlZWtEYXkgPT09IHRoaXMuby53ZWVrRW5kKXtcblx0XHRcdFx0XHRodG1sLnB1c2goJzwvdHI+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJldk1vbnRoLnNldFVUQ0RhdGUocHJldk1vbnRoLmdldFVUQ0RhdGUoKSArIDEpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItZGF5cyB0Ym9keScpLmh0bWwoaHRtbC5qb2luKCcnKSk7XG5cblx0XHRcdHZhciBtb250aHNUaXRsZSA9IGRhdGVzW3RoaXMuby5sYW5ndWFnZV0ubW9udGhzVGl0bGUgfHwgZGF0ZXNbJ2VuJ10ubW9udGhzVGl0bGUgfHwgJ01vbnRocyc7XG5cdFx0XHR2YXIgbW9udGhzID0gdGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItbW9udGhzJylcblx0XHRcdFx0XHRcdC5maW5kKCcuZGF0ZXBpY2tlci1zd2l0Y2gnKVxuXHRcdFx0XHRcdFx0XHQudGV4dCh0aGlzLm8ubWF4Vmlld01vZGUgPCAyID8gbW9udGhzVGl0bGUgOiB5ZWFyKVxuXHRcdFx0XHRcdFx0XHQuZW5kKClcblx0XHRcdFx0XHRcdC5maW5kKCd0Ym9keSBzcGFuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHQkLmVhY2godGhpcy5kYXRlcywgZnVuY3Rpb24oaSwgZCl7XG5cdFx0XHRcdGlmIChkLmdldFVUQ0Z1bGxZZWFyKCkgPT09IHllYXIpXG5cdFx0XHRcdFx0bW9udGhzLmVxKGQuZ2V0VVRDTW9udGgoKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh5ZWFyIDwgc3RhcnRZZWFyIHx8IHllYXIgPiBlbmRZZWFyKXtcblx0XHRcdFx0bW9udGhzLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHllYXIgPT09IHN0YXJ0WWVhcil7XG5cdFx0XHRcdG1vbnRocy5zbGljZSgwLCBzdGFydE1vbnRoKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHRcdGlmICh5ZWFyID09PSBlbmRZZWFyKXtcblx0XHRcdFx0bW9udGhzLnNsaWNlKGVuZE1vbnRoKzEpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5vLmJlZm9yZVNob3dNb250aCAhPT0gJC5ub29wKXtcblx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0XHQkLmVhY2gobW9udGhzLCBmdW5jdGlvbihpLCBtb250aCl7XG4gICAgICAgICAgdmFyIG1vRGF0ZSA9IG5ldyBEYXRlKHllYXIsIGksIDEpO1xuICAgICAgICAgIHZhciBiZWZvcmUgPSB0aGF0Lm8uYmVmb3JlU2hvd01vbnRoKG1vRGF0ZSk7XG5cdFx0XHRcdFx0aWYgKGJlZm9yZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge307XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge2VuYWJsZWQ6IGJlZm9yZX07XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ3N0cmluZycpXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7Y2xhc3NlczogYmVmb3JlfTtcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmVuYWJsZWQgPT09IGZhbHNlICYmICEkKG1vbnRoKS5oYXNDbGFzcygnZGlzYWJsZWQnKSlcblx0XHRcdFx0XHQgICAgJChtb250aCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5jbGFzc2VzKVxuXHRcdFx0XHRcdCAgICAkKG1vbnRoKS5hZGRDbGFzcyhiZWZvcmUuY2xhc3Nlcyk7XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS50b29sdGlwKVxuXHRcdFx0XHRcdCAgICAkKG1vbnRoKS5wcm9wKCd0aXRsZScsIGJlZm9yZS50b29sdGlwKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRpbmcgZGVjYWRlL3llYXJzIHBpY2tlclxuXHRcdFx0dGhpcy5fZmlsbF95ZWFyc1ZpZXcoXG5cdFx0XHRcdCcuZGF0ZXBpY2tlci15ZWFycycsXG5cdFx0XHRcdCd5ZWFyJyxcblx0XHRcdFx0MTAsXG5cdFx0XHRcdHllYXIsXG5cdFx0XHRcdHN0YXJ0WWVhcixcblx0XHRcdFx0ZW5kWWVhcixcblx0XHRcdFx0dGhpcy5vLmJlZm9yZVNob3dZZWFyXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBHZW5lcmF0aW5nIGNlbnR1cnkvZGVjYWRlcyBwaWNrZXJcblx0XHRcdHRoaXMuX2ZpbGxfeWVhcnNWaWV3KFxuXHRcdFx0XHQnLmRhdGVwaWNrZXItZGVjYWRlcycsXG5cdFx0XHRcdCdkZWNhZGUnLFxuXHRcdFx0XHQxMDAsXG5cdFx0XHRcdHllYXIsXG5cdFx0XHRcdHN0YXJ0WWVhcixcblx0XHRcdFx0ZW5kWWVhcixcblx0XHRcdFx0dGhpcy5vLmJlZm9yZVNob3dEZWNhZGVcblx0XHRcdCk7XG5cblx0XHRcdC8vIEdlbmVyYXRpbmcgbWlsbGVubml1bS9jZW50dXJpZXMgcGlja2VyXG5cdFx0XHR0aGlzLl9maWxsX3llYXJzVmlldyhcblx0XHRcdFx0Jy5kYXRlcGlja2VyLWNlbnR1cmllcycsXG5cdFx0XHRcdCdjZW50dXJ5Jyxcblx0XHRcdFx0MTAwMCxcblx0XHRcdFx0eWVhcixcblx0XHRcdFx0c3RhcnRZZWFyLFxuXHRcdFx0XHRlbmRZZWFyLFxuXHRcdFx0XHR0aGlzLm8uYmVmb3JlU2hvd0NlbnR1cnlcblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZU5hdkFycm93czogZnVuY3Rpb24oKXtcblx0XHRcdGlmICghdGhpcy5fYWxsb3dfdXBkYXRlKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdHZhciBkID0gbmV3IERhdGUodGhpcy52aWV3RGF0ZSksXG5cdFx0XHRcdHllYXIgPSBkLmdldFVUQ0Z1bGxZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gZC5nZXRVVENNb250aCgpLFxuXHRcdFx0XHRzdGFydFllYXIgPSB0aGlzLm8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkgPyB0aGlzLm8uc3RhcnREYXRlLmdldFVUQ0Z1bGxZZWFyKCkgOiAtSW5maW5pdHksXG5cdFx0XHRcdHN0YXJ0TW9udGggPSB0aGlzLm8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkgPyB0aGlzLm8uc3RhcnREYXRlLmdldFVUQ01vbnRoKCkgOiAtSW5maW5pdHksXG5cdFx0XHRcdGVuZFllYXIgPSB0aGlzLm8uZW5kRGF0ZSAhPT0gSW5maW5pdHkgPyB0aGlzLm8uZW5kRGF0ZS5nZXRVVENGdWxsWWVhcigpIDogSW5maW5pdHksXG5cdFx0XHRcdGVuZE1vbnRoID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDTW9udGgoKSA6IEluZmluaXR5LFxuXHRcdFx0XHRwcmV2SXNEaXNhYmxlZCxcblx0XHRcdFx0bmV4dElzRGlzYWJsZWQsXG5cdFx0XHRcdGZhY3RvciA9IDE7XG5cdFx0XHRzd2l0Y2ggKHRoaXMudmlld01vZGUpe1xuXHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0cHJldklzRGlzYWJsZWQgPSB5ZWFyIDw9IHN0YXJ0WWVhciAmJiBtb250aCA8PSBzdGFydE1vbnRoO1xuXHRcdFx0XHRcdG5leHRJc0Rpc2FibGVkID0geWVhciA+PSBlbmRZZWFyICYmIG1vbnRoID49IGVuZE1vbnRoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdFx0ZmFjdG9yICo9IDEwO1xuXHRcdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdGZhY3RvciAqPSAxMDtcblx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRmYWN0b3IgKj0gMTA7XG5cdFx0XHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0cHJldklzRGlzYWJsZWQgPSBNYXRoLmZsb29yKHllYXIgLyBmYWN0b3IpICogZmFjdG9yIDw9IHN0YXJ0WWVhcjtcblx0XHRcdFx0XHRuZXh0SXNEaXNhYmxlZCA9IE1hdGguZmxvb3IoeWVhciAvIGZhY3RvcikgKiBmYWN0b3IgKyBmYWN0b3IgPj0gZW5kWWVhcjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLnByZXYnKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBwcmV2SXNEaXNhYmxlZCk7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcubmV4dCcpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIG5leHRJc0Rpc2FibGVkKTtcblx0XHR9LFxuXG5cdFx0Y2xpY2s6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dmFyIHRhcmdldCwgZGlyLCBkYXksIHllYXIsIG1vbnRoO1xuXHRcdFx0dGFyZ2V0ID0gJChlLnRhcmdldCk7XG5cblx0XHRcdC8vIENsaWNrZWQgb24gdGhlIHN3aXRjaFxuXHRcdFx0aWYgKHRhcmdldC5oYXNDbGFzcygnZGF0ZXBpY2tlci1zd2l0Y2gnKSAmJiB0aGlzLnZpZXdNb2RlICE9PSB0aGlzLm8ubWF4Vmlld01vZGUpe1xuXHRcdFx0XHR0aGlzLnNldFZpZXdNb2RlKHRoaXMudmlld01vZGUgKyAxKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xpY2tlZCBvbiB0b2RheSBidXR0b25cblx0XHRcdGlmICh0YXJnZXQuaGFzQ2xhc3MoJ3RvZGF5JykgJiYgIXRhcmdldC5oYXNDbGFzcygnZGF5Jykpe1xuXHRcdFx0XHR0aGlzLnNldFZpZXdNb2RlKDApO1xuXHRcdFx0XHR0aGlzLl9zZXREYXRlKFVUQ1RvZGF5KCksIHRoaXMuby50b2RheUJ0biA9PT0gJ2xpbmtlZCcgPyBudWxsIDogJ3ZpZXcnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xpY2tlZCBvbiBjbGVhciBidXR0b25cblx0XHRcdGlmICh0YXJnZXQuaGFzQ2xhc3MoJ2NsZWFyJykpe1xuXHRcdFx0XHR0aGlzLmNsZWFyRGF0ZXMoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0YXJnZXQuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpe1xuXHRcdFx0XHQvLyBDbGlja2VkIG9uIGEgbW9udGgsIHllYXIsIGRlY2FkZSwgY2VudHVyeVxuXHRcdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCdtb250aCcpXG5cdFx0XHRcdFx0XHR8fCB0YXJnZXQuaGFzQ2xhc3MoJ3llYXInKVxuXHRcdFx0XHRcdFx0fHwgdGFyZ2V0Lmhhc0NsYXNzKCdkZWNhZGUnKVxuXHRcdFx0XHRcdFx0fHwgdGFyZ2V0Lmhhc0NsYXNzKCdjZW50dXJ5JykpIHtcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlLnNldFVUQ0RhdGUoMSk7XG5cblx0XHRcdFx0XHRkYXkgPSAxO1xuXHRcdFx0XHRcdGlmICh0aGlzLnZpZXdNb2RlID09PSAxKXtcblx0XHRcdFx0XHRcdG1vbnRoID0gdGFyZ2V0LnBhcmVudCgpLmZpbmQoJ3NwYW4nKS5pbmRleCh0YXJnZXQpO1xuXHRcdFx0XHRcdFx0eWVhciA9IHRoaXMudmlld0RhdGUuZ2V0VVRDRnVsbFllYXIoKTtcblx0XHRcdFx0XHRcdHRoaXMudmlld0RhdGUuc2V0VVRDTW9udGgobW9udGgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtb250aCA9IDA7XG5cdFx0XHRcdFx0XHR5ZWFyID0gTnVtYmVyKHRhcmdldC50ZXh0KCkpO1xuXHRcdFx0XHRcdFx0dGhpcy52aWV3RGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKERQR2xvYmFsLnZpZXdNb2Rlc1t0aGlzLnZpZXdNb2RlIC0gMV0uZSwgdGhpcy52aWV3RGF0ZSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy52aWV3TW9kZSA9PT0gdGhpcy5vLm1pblZpZXdNb2RlKXtcblx0XHRcdFx0XHRcdHRoaXMuX3NldERhdGUoVVRDRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0Vmlld01vZGUodGhpcy52aWV3TW9kZSAtIDEpO1xuXHRcdFx0XHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSAmJiB0aGlzLl9mb2N1c2VkX2Zyb20pe1xuXHRcdFx0XHR0aGlzLl9mb2N1c2VkX2Zyb20uZm9jdXMoKTtcblx0XHRcdH1cblx0XHRcdGRlbGV0ZSB0aGlzLl9mb2N1c2VkX2Zyb207XG5cdFx0fSxcblxuXHRcdGRheUNlbGxDbGljazogZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdHZhciB0aW1lc3RhbXAgPSAkdGFyZ2V0LmRhdGEoJ2RhdGUnKTtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcblxuXHRcdFx0aWYgKHRoaXMuby51cGRhdGVWaWV3RGF0ZSkge1xuXHRcdFx0XHRpZiAoZGF0ZS5nZXRVVENGdWxsWWVhcigpICE9PSB0aGlzLnZpZXdEYXRlLmdldFVUQ0Z1bGxZZWFyKCkpIHtcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VZZWFyJywgdGhpcy52aWV3RGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZGF0ZS5nZXRVVENNb250aCgpICE9PSB0aGlzLnZpZXdEYXRlLmdldFVUQ01vbnRoKCkpIHtcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VNb250aCcsIHRoaXMudmlld0RhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9zZXREYXRlKGRhdGUpO1xuXHRcdH0sXG5cblx0XHQvLyBDbGlja2VkIG9uIHByZXYgb3IgbmV4dFxuXHRcdG5hdkFycm93c0NsaWNrOiBmdW5jdGlvbihlKXtcblx0XHRcdHZhciAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0dmFyIGRpciA9ICR0YXJnZXQuaGFzQ2xhc3MoJ3ByZXYnKSA/IC0xIDogMTtcblx0XHRcdGlmICh0aGlzLnZpZXdNb2RlICE9PSAwKXtcblx0XHRcdFx0ZGlyICo9IERQR2xvYmFsLnZpZXdNb2Rlc1t0aGlzLnZpZXdNb2RlXS5uYXZTdGVwICogMTI7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5tb3ZlTW9udGgodGhpcy52aWV3RGF0ZSwgZGlyKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoRFBHbG9iYWwudmlld01vZGVzW3RoaXMudmlld01vZGVdLmUsIHRoaXMudmlld0RhdGUpO1xuXHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0fSxcblxuXHRcdF90b2dnbGVfbXVsdGlkYXRlOiBmdW5jdGlvbihkYXRlKXtcblx0XHRcdHZhciBpeCA9IHRoaXMuZGF0ZXMuY29udGFpbnMoZGF0ZSk7XG5cdFx0XHRpZiAoIWRhdGUpe1xuXHRcdFx0XHR0aGlzLmRhdGVzLmNsZWFyKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpeCAhPT0gLTEpe1xuXHRcdFx0XHRpZiAodGhpcy5vLm11bHRpZGF0ZSA9PT0gdHJ1ZSB8fCB0aGlzLm8ubXVsdGlkYXRlID4gMSB8fCB0aGlzLm8udG9nZ2xlQWN0aXZlKXtcblx0XHRcdFx0XHR0aGlzLmRhdGVzLnJlbW92ZShpeCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vLm11bHRpZGF0ZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5kYXRlcy5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmRhdGVzLnB1c2goZGF0ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5kYXRlcy5wdXNoKGRhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMuby5tdWx0aWRhdGUgPT09ICdudW1iZXInKVxuXHRcdFx0XHR3aGlsZSAodGhpcy5kYXRlcy5sZW5ndGggPiB0aGlzLm8ubXVsdGlkYXRlKVxuXHRcdFx0XHRcdHRoaXMuZGF0ZXMucmVtb3ZlKDApO1xuXHRcdH0sXG5cblx0XHRfc2V0RGF0ZTogZnVuY3Rpb24oZGF0ZSwgd2hpY2gpe1xuXHRcdFx0aWYgKCF3aGljaCB8fCB3aGljaCA9PT0gJ2RhdGUnKVxuXHRcdFx0XHR0aGlzLl90b2dnbGVfbXVsdGlkYXRlKGRhdGUgJiYgbmV3IERhdGUoZGF0ZSkpO1xuXHRcdFx0aWYgKCghd2hpY2ggJiYgdGhpcy5vLnVwZGF0ZVZpZXdEYXRlKSB8fCB3aGljaCA9PT0gJ3ZpZXcnKVxuXHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gZGF0ZSAmJiBuZXcgRGF0ZShkYXRlKTtcblxuXHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0XHR0aGlzLnNldFZhbHVlKCk7XG5cdFx0XHRpZiAoIXdoaWNoIHx8IHdoaWNoICE9PSAndmlldycpIHtcblx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlRGF0ZScpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5pbnB1dEZpZWxkLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0aWYgKHRoaXMuby5hdXRvY2xvc2UgJiYgKCF3aGljaCB8fCB3aGljaCA9PT0gJ2RhdGUnKSl7XG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRtb3ZlRGF5OiBmdW5jdGlvbihkYXRlLCBkaXIpe1xuXHRcdFx0dmFyIG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblx0XHRcdG5ld0RhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpcik7XG5cblx0XHRcdHJldHVybiBuZXdEYXRlO1xuXHRcdH0sXG5cblx0XHRtb3ZlV2VlazogZnVuY3Rpb24oZGF0ZSwgZGlyKXtcblx0XHRcdHJldHVybiB0aGlzLm1vdmVEYXkoZGF0ZSwgZGlyICogNyk7XG5cdFx0fSxcblxuXHRcdG1vdmVNb250aDogZnVuY3Rpb24oZGF0ZSwgZGlyKXtcblx0XHRcdGlmICghaXNWYWxpZERhdGUoZGF0ZSkpXG5cdFx0XHRcdHJldHVybiB0aGlzLm8uZGVmYXVsdFZpZXdEYXRlO1xuXHRcdFx0aWYgKCFkaXIpXG5cdFx0XHRcdHJldHVybiBkYXRlO1xuXHRcdFx0dmFyIG5ld19kYXRlID0gbmV3IERhdGUoZGF0ZS52YWx1ZU9mKCkpLFxuXHRcdFx0XHRkYXkgPSBuZXdfZGF0ZS5nZXRVVENEYXRlKCksXG5cdFx0XHRcdG1vbnRoID0gbmV3X2RhdGUuZ2V0VVRDTW9udGgoKSxcblx0XHRcdFx0bWFnID0gTWF0aC5hYnMoZGlyKSxcblx0XHRcdFx0bmV3X21vbnRoLCB0ZXN0O1xuXHRcdFx0ZGlyID0gZGlyID4gMCA/IDEgOiAtMTtcblx0XHRcdGlmIChtYWcgPT09IDEpe1xuXHRcdFx0XHR0ZXN0ID0gZGlyID09PSAtMVxuXHRcdFx0XHRcdC8vIElmIGdvaW5nIGJhY2sgb25lIG1vbnRoLCBtYWtlIHN1cmUgbW9udGggaXMgbm90IGN1cnJlbnQgbW9udGhcblx0XHRcdFx0XHQvLyAoZWcsIE1hciAzMSAtPiBGZWIgMzEgPT0gRmViIDI4LCBub3QgTWFyIDAyKVxuXHRcdFx0XHRcdD8gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdfZGF0ZS5nZXRVVENNb250aCgpID09PSBtb250aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gSWYgZ29pbmcgZm9yd2FyZCBvbmUgbW9udGgsIG1ha2Ugc3VyZSBtb250aCBpcyBhcyBleHBlY3RlZFxuXHRcdFx0XHRcdC8vIChlZywgSmFuIDMxIC0+IEZlYiAzMSA9PSBGZWIgMjgsIG5vdCBNYXIgMDIpXG5cdFx0XHRcdFx0OiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld19kYXRlLmdldFVUQ01vbnRoKCkgIT09IG5ld19tb250aDtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdfbW9udGggPSBtb250aCArIGRpcjtcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDTW9udGgobmV3X21vbnRoKTtcblx0XHRcdFx0Ly8gRGVjIC0+IEphbiAoMTIpIG9yIEphbiAtPiBEZWMgKC0xKSAtLSBsaW1pdCBleHBlY3RlZCBkYXRlIHRvIDAtMTFcblx0XHRcdFx0bmV3X21vbnRoID0gKG5ld19tb250aCArIDEyKSAlIDEyO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIEZvciBtYWduaXR1ZGVzID4xLCBtb3ZlIG9uZSBtb250aCBhdCBhIHRpbWUuLi5cblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgbWFnOyBpKyspXG5cdFx0XHRcdFx0Ly8gLi4ud2hpY2ggbWlnaHQgZGVjcmVhc2UgdGhlIGRheSAoZWcsIEphbiAzMSB0byBGZWIgMjgsIGV0YykuLi5cblx0XHRcdFx0XHRuZXdfZGF0ZSA9IHRoaXMubW92ZU1vbnRoKG5ld19kYXRlLCBkaXIpO1xuXHRcdFx0XHQvLyAuLi50aGVuIHJlc2V0IHRoZSBkYXksIGtlZXBpbmcgaXQgaW4gdGhlIG5ldyBtb250aFxuXHRcdFx0XHRuZXdfbW9udGggPSBuZXdfZGF0ZS5nZXRVVENNb250aCgpO1xuXHRcdFx0XHRuZXdfZGF0ZS5zZXRVVENEYXRlKGRheSk7XG5cdFx0XHRcdHRlc3QgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHJldHVybiBuZXdfbW9udGggIT09IG5ld19kYXRlLmdldFVUQ01vbnRoKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHQvLyBDb21tb24gZGF0ZS1yZXNldHRpbmcgbG9vcCAtLSBpZiBkYXRlIGlzIGJleW9uZCBlbmQgb2YgbW9udGgsIG1ha2UgaXRcblx0XHRcdC8vIGVuZCBvZiBtb250aFxuXHRcdFx0d2hpbGUgKHRlc3QoKSl7XG5cdFx0XHRcdG5ld19kYXRlLnNldFVUQ0RhdGUoLS1kYXkpO1xuXHRcdFx0XHRuZXdfZGF0ZS5zZXRVVENNb250aChuZXdfbW9udGgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld19kYXRlO1xuXHRcdH0sXG5cblx0XHRtb3ZlWWVhcjogZnVuY3Rpb24oZGF0ZSwgZGlyKXtcblx0XHRcdHJldHVybiB0aGlzLm1vdmVNb250aChkYXRlLCBkaXIqMTIpO1xuXHRcdH0sXG5cblx0XHRtb3ZlQXZhaWxhYmxlRGF0ZTogZnVuY3Rpb24oZGF0ZSwgZGlyLCBmbil7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGRhdGUgPSB0aGlzW2ZuXShkYXRlLCBkaXIpO1xuXG5cdFx0XHRcdGlmICghdGhpcy5kYXRlV2l0aGluUmFuZ2UoZGF0ZSkpXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHRcdGZuID0gJ21vdmVEYXknO1xuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKHRoaXMuZGF0ZUlzRGlzYWJsZWQoZGF0ZSkpO1xuXG5cdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHR9LFxuXG5cdFx0d2Vla09mRGF0ZUlzRGlzYWJsZWQ6IGZ1bmN0aW9uKGRhdGUpe1xuXHRcdFx0cmV0dXJuICQuaW5BcnJheShkYXRlLmdldFVUQ0RheSgpLCB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkKSAhPT0gLTE7XG5cdFx0fSxcblxuXHRcdGRhdGVJc0Rpc2FibGVkOiBmdW5jdGlvbihkYXRlKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdHRoaXMud2Vla09mRGF0ZUlzRGlzYWJsZWQoZGF0ZSkgfHxcblx0XHRcdFx0JC5ncmVwKHRoaXMuby5kYXRlc0Rpc2FibGVkLCBmdW5jdGlvbihkKXtcblx0XHRcdFx0XHRyZXR1cm4gaXNVVENFcXVhbHMoZGF0ZSwgZCk7XG5cdFx0XHRcdH0pLmxlbmd0aCA+IDBcblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdGRhdGVXaXRoaW5SYW5nZTogZnVuY3Rpb24oZGF0ZSl7XG5cdFx0XHRyZXR1cm4gZGF0ZSA+PSB0aGlzLm8uc3RhcnREYXRlICYmIGRhdGUgPD0gdGhpcy5vLmVuZERhdGU7XG5cdFx0fSxcblxuXHRcdGtleWRvd246IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aWYgKCF0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSl7XG5cdFx0XHRcdGlmIChlLmtleUNvZGUgPT09IDQwIHx8IGUua2V5Q29kZSA9PT0gMjcpIHsgLy8gYWxsb3cgZG93biB0byByZS1zaG93IHBpY2tlclxuXHRcdFx0XHRcdHRoaXMuc2hvdygpO1xuXHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGRhdGVDaGFuZ2VkID0gZmFsc2UsXG5cdFx0XHRcdGRpciwgbmV3Vmlld0RhdGUsXG5cdFx0XHRcdGZvY3VzRGF0ZSA9IHRoaXMuZm9jdXNEYXRlIHx8IHRoaXMudmlld0RhdGU7XG5cdFx0XHRzd2l0Y2ggKGUua2V5Q29kZSl7XG5cdFx0XHRcdGNhc2UgMjc6IC8vIGVzY2FwZVxuXHRcdFx0XHRcdGlmICh0aGlzLmZvY3VzRGF0ZSl7XG5cdFx0XHRcdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XG5cdFx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5kYXRlcy5nZXQoLTEpIHx8IHRoaXMudmlld0RhdGU7XG5cdFx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzc6IC8vIGxlZnRcblx0XHRcdFx0Y2FzZSAzODogLy8gdXBcblx0XHRcdFx0Y2FzZSAzOTogLy8gcmlnaHRcblx0XHRcdFx0Y2FzZSA0MDogLy8gZG93blxuXHRcdFx0XHRcdGlmICghdGhpcy5vLmtleWJvYXJkTmF2aWdhdGlvbiB8fCB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkLmxlbmd0aCA9PT0gNylcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRpciA9IGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOCA/IC0xIDogMTtcbiAgICAgICAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gMCkge1xuICBcdFx0XHRcdFx0aWYgKGUuY3RybEtleSl7XG4gIFx0XHRcdFx0XHRcdG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVZZWFyJyk7XG5cbiAgXHRcdFx0XHRcdFx0aWYgKG5ld1ZpZXdEYXRlKVxuICBcdFx0XHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZVllYXInLCB0aGlzLnZpZXdEYXRlKTtcbiAgXHRcdFx0XHRcdH0gZWxzZSBpZiAoZS5zaGlmdEtleSl7XG4gIFx0XHRcdFx0XHRcdG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVNb250aCcpO1xuXG4gIFx0XHRcdFx0XHRcdGlmIChuZXdWaWV3RGF0ZSlcbiAgXHRcdFx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VNb250aCcsIHRoaXMudmlld0RhdGUpO1xuICBcdFx0XHRcdFx0fSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzkpe1xuICBcdFx0XHRcdFx0XHRuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlRGF5Jyk7XG4gIFx0XHRcdFx0XHR9IGVsc2UgaWYgKCF0aGlzLndlZWtPZkRhdGVJc0Rpc2FibGVkKGZvY3VzRGF0ZSkpe1xuICBcdFx0XHRcdFx0XHRuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlV2VlaycpO1xuICBcdFx0XHRcdFx0fVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgICAgICAgICBkaXIgPSBkaXIgKiA0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZU1vbnRoJyk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXdNb2RlID09PSAyKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICAgICAgICAgIGRpciA9IGRpciAqIDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlWWVhcicpO1xuICAgICAgICAgIH1cblx0XHRcdFx0XHRpZiAobmV3Vmlld0RhdGUpe1xuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c0RhdGUgPSB0aGlzLnZpZXdEYXRlID0gbmV3Vmlld0RhdGU7XG5cdFx0XHRcdFx0XHR0aGlzLnNldFZhbHVlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMTM6IC8vIGVudGVyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLm8uZm9yY2VQYXJzZSlcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGZvY3VzRGF0ZSA9IHRoaXMuZm9jdXNEYXRlIHx8IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xuXHRcdFx0XHRcdGlmICh0aGlzLm8ua2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl90b2dnbGVfbXVsdGlkYXRlKGZvY3VzRGF0ZSk7XG5cdFx0XHRcdFx0XHRkYXRlQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5kYXRlcy5nZXQoLTEpIHx8IHRoaXMudmlld0RhdGU7XG5cdFx0XHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xuXHRcdFx0XHRcdHRoaXMuZmlsbCgpO1xuXHRcdFx0XHRcdGlmICh0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSl7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuby5hdXRvY2xvc2UpXG5cdFx0XHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA5OiAvLyB0YWJcblx0XHRcdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xuXHRcdFx0XHRcdHRoaXMuZmlsbCgpO1xuXHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRhdGVDaGFuZ2VkKXtcblx0XHRcdFx0aWYgKHRoaXMuZGF0ZXMubGVuZ3RoKVxuXHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZURhdGUnKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NsZWFyRGF0ZScpO1xuXHRcdFx0XHR0aGlzLmlucHV0RmllbGQudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldFZpZXdNb2RlOiBmdW5jdGlvbih2aWV3TW9kZSl7XG5cdFx0XHR0aGlzLnZpZXdNb2RlID0gdmlld01vZGU7XG5cdFx0XHR0aGlzLnBpY2tlclxuXHRcdFx0XHQuY2hpbGRyZW4oJ2RpdicpXG5cdFx0XHRcdC5oaWRlKClcblx0XHRcdFx0LmZpbHRlcignLmRhdGVwaWNrZXItJyArIERQR2xvYmFsLnZpZXdNb2Rlc1t0aGlzLnZpZXdNb2RlXS5jbHNOYW1lKVxuXHRcdFx0XHRcdC5zaG93KCk7XG5cdFx0XHR0aGlzLnVwZGF0ZU5hdkFycm93cygpO1xuICAgICAgdGhpcy5fdHJpZ2dlcignY2hhbmdlVmlld01vZGUnLCBuZXcgRGF0ZSh0aGlzLnZpZXdEYXRlKSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBEYXRlUmFuZ2VQaWNrZXIgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKXtcblx0XHQkLmRhdGEoZWxlbWVudCwgJ2RhdGVwaWNrZXInLCB0aGlzKTtcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuXHRcdHRoaXMuaW5wdXRzID0gJC5tYXAob3B0aW9ucy5pbnB1dHMsIGZ1bmN0aW9uKGkpe1xuXHRcdFx0cmV0dXJuIGkuanF1ZXJ5ID8gaVswXSA6IGk7XG5cdFx0fSk7XG5cdFx0ZGVsZXRlIG9wdGlvbnMuaW5wdXRzO1xuXG5cdFx0dGhpcy5rZWVwRW1wdHlWYWx1ZXMgPSBvcHRpb25zLmtlZXBFbXB0eVZhbHVlcztcblx0XHRkZWxldGUgb3B0aW9ucy5rZWVwRW1wdHlWYWx1ZXM7XG5cblx0XHRkYXRlcGlja2VyUGx1Z2luLmNhbGwoJCh0aGlzLmlucHV0cyksIG9wdGlvbnMpXG5cdFx0XHQub24oJ2NoYW5nZURhdGUnLCAkLnByb3h5KHRoaXMuZGF0ZVVwZGF0ZWQsIHRoaXMpKTtcblxuXHRcdHRoaXMucGlja2VycyA9ICQubWFwKHRoaXMuaW5wdXRzLCBmdW5jdGlvbihpKXtcblx0XHRcdHJldHVybiAkLmRhdGEoaSwgJ2RhdGVwaWNrZXInKTtcblx0XHR9KTtcblx0XHR0aGlzLnVwZGF0ZURhdGVzKCk7XG5cdH07XG5cdERhdGVSYW5nZVBpY2tlci5wcm90b3R5cGUgPSB7XG5cdFx0dXBkYXRlRGF0ZXM6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmRhdGVzID0gJC5tYXAodGhpcy5waWNrZXJzLCBmdW5jdGlvbihpKXtcblx0XHRcdFx0cmV0dXJuIGkuZ2V0VVRDRGF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnVwZGF0ZVJhbmdlcygpO1xuXHRcdH0sXG5cdFx0dXBkYXRlUmFuZ2VzOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHJhbmdlID0gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XG5cdFx0XHRcdHJldHVybiBkLnZhbHVlT2YoKTtcblx0XHRcdH0pO1xuXHRcdFx0JC5lYWNoKHRoaXMucGlja2VycywgZnVuY3Rpb24oaSwgcCl7XG5cdFx0XHRcdHAuc2V0UmFuZ2UocmFuZ2UpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRkYXRlVXBkYXRlZDogZnVuY3Rpb24oZSl7XG5cdFx0XHQvLyBgdGhpcy51cGRhdGluZ2AgaXMgYSB3b3JrYXJvdW5kIGZvciBwcmV2ZW50aW5nIGluZmluaXRlIHJlY3Vyc2lvblxuXHRcdFx0Ly8gYmV0d2VlbiBgY2hhbmdlRGF0ZWAgdHJpZ2dlcmluZyBhbmQgYHNldFVUQ0RhdGVgIGNhbGxpbmcuICBVbnRpbFxuXHRcdFx0Ly8gdGhlcmUgaXMgYSBiZXR0ZXIgbWVjaGFuaXNtLlxuXHRcdFx0aWYgKHRoaXMudXBkYXRpbmcpXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuXG5cdFx0XHR2YXIgZHAgPSAkLmRhdGEoZS50YXJnZXQsICdkYXRlcGlja2VyJyk7XG5cblx0XHRcdGlmIChkcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG5ld19kYXRlID0gZHAuZ2V0VVRDRGF0ZSgpLFxuXHRcdFx0XHRrZWVwX2VtcHR5X3ZhbHVlcyA9IHRoaXMua2VlcEVtcHR5VmFsdWVzLFxuXHRcdFx0XHRpID0gJC5pbkFycmF5KGUudGFyZ2V0LCB0aGlzLmlucHV0cyksXG5cdFx0XHRcdGogPSBpIC0gMSxcblx0XHRcdFx0ayA9IGkgKyAxLFxuXHRcdFx0XHRsID0gdGhpcy5pbnB1dHMubGVuZ3RoO1xuXHRcdFx0aWYgKGkgPT09IC0xKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdCQuZWFjaCh0aGlzLnBpY2tlcnMsIGZ1bmN0aW9uKGksIHApe1xuXHRcdFx0XHRpZiAoIXAuZ2V0VVRDRGF0ZSgpICYmIChwID09PSBkcCB8fCAha2VlcF9lbXB0eV92YWx1ZXMpKVxuXHRcdFx0XHRcdHAuc2V0VVRDRGF0ZShuZXdfZGF0ZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKG5ld19kYXRlIDwgdGhpcy5kYXRlc1tqXSl7XG5cdFx0XHRcdC8vIERhdGUgYmVpbmcgbW92ZWQgZWFybGllci9sZWZ0XG5cdFx0XHRcdHdoaWxlIChqID49IDAgJiYgbmV3X2RhdGUgPCB0aGlzLmRhdGVzW2pdKXtcblx0XHRcdFx0XHR0aGlzLnBpY2tlcnNbai0tXS5zZXRVVENEYXRlKG5ld19kYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChuZXdfZGF0ZSA+IHRoaXMuZGF0ZXNba10pe1xuXHRcdFx0XHQvLyBEYXRlIGJlaW5nIG1vdmVkIGxhdGVyL3JpZ2h0XG5cdFx0XHRcdHdoaWxlIChrIDwgbCAmJiBuZXdfZGF0ZSA+IHRoaXMuZGF0ZXNba10pe1xuXHRcdFx0XHRcdHRoaXMucGlja2Vyc1trKytdLnNldFVUQ0RhdGUobmV3X2RhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnVwZGF0ZURhdGVzKCk7XG5cblx0XHRcdGRlbGV0ZSB0aGlzLnVwZGF0aW5nO1xuXHRcdH0sXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHRcdCQubWFwKHRoaXMucGlja2VycywgZnVuY3Rpb24ocCl7IHAuZGVzdHJveSgpOyB9KTtcblx0XHRcdCQodGhpcy5pbnB1dHMpLm9mZignY2hhbmdlRGF0ZScsIHRoaXMuZGF0ZVVwZGF0ZWQpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5kYXRhKCkuZGF0ZXBpY2tlcjtcblx0XHR9LFxuXHRcdHJlbW92ZTogYWxpYXMoJ2Rlc3Ryb3knLCAnTWV0aG9kIGByZW1vdmVgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDIuMC4gVXNlIGBkZXN0cm95YCBpbnN0ZWFkJylcblx0fTtcblxuXHRmdW5jdGlvbiBvcHRzX2Zyb21fZWwoZWwsIHByZWZpeCl7XG5cdFx0Ly8gRGVyaXZlIG9wdGlvbnMgZnJvbSBlbGVtZW50IGRhdGEtYXR0cnNcblx0XHR2YXIgZGF0YSA9ICQoZWwpLmRhdGEoKSxcblx0XHRcdG91dCA9IHt9LCBpbmtleSxcblx0XHRcdHJlcGxhY2UgPSBuZXcgUmVnRXhwKCdeJyArIHByZWZpeC50b0xvd2VyQ2FzZSgpICsgJyhbQS1aXSknKTtcblx0XHRwcmVmaXggPSBuZXcgUmVnRXhwKCdeJyArIHByZWZpeC50b0xvd2VyQ2FzZSgpKTtcblx0XHRmdW5jdGlvbiByZV9sb3dlcihfLGEpe1xuXHRcdFx0cmV0dXJuIGEudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIga2V5IGluIGRhdGEpXG5cdFx0XHRpZiAocHJlZml4LnRlc3Qoa2V5KSl7XG5cdFx0XHRcdGlua2V5ID0ga2V5LnJlcGxhY2UocmVwbGFjZSwgcmVfbG93ZXIpO1xuXHRcdFx0XHRvdXRbaW5rZXldID0gZGF0YVtrZXldO1xuXHRcdFx0fVxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHRmdW5jdGlvbiBvcHRzX2Zyb21fbG9jYWxlKGxhbmcpe1xuXHRcdC8vIERlcml2ZSBvcHRpb25zIGZyb20gbG9jYWxlIHBsdWdpbnNcblx0XHR2YXIgb3V0ID0ge307XG5cdFx0Ly8gQ2hlY2sgaWYgXCJkZS1ERVwiIHN0eWxlIGRhdGUgaXMgYXZhaWxhYmxlLCBpZiBub3QgbGFuZ3VhZ2Ugc2hvdWxkXG5cdFx0Ly8gZmFsbGJhY2sgdG8gMiBsZXR0ZXIgY29kZSBlZyBcImRlXCJcblx0XHRpZiAoIWRhdGVzW2xhbmddKXtcblx0XHRcdGxhbmcgPSBsYW5nLnNwbGl0KCctJylbMF07XG5cdFx0XHRpZiAoIWRhdGVzW2xhbmddKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBkID0gZGF0ZXNbbGFuZ107XG5cdFx0JC5lYWNoKGxvY2FsZV9vcHRzLCBmdW5jdGlvbihpLGspe1xuXHRcdFx0aWYgKGsgaW4gZClcblx0XHRcdFx0b3V0W2tdID0gZFtrXTtcblx0XHR9KTtcblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0dmFyIG9sZCA9ICQuZm4uZGF0ZXBpY2tlcjtcblx0dmFyIGRhdGVwaWNrZXJQbHVnaW4gPSBmdW5jdGlvbihvcHRpb24pe1xuXHRcdHZhciBhcmdzID0gQXJyYXkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblx0XHRhcmdzLnNoaWZ0KCk7XG5cdFx0dmFyIGludGVybmFsX3JldHVybjtcblx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdGRhdGEgPSAkdGhpcy5kYXRhKCdkYXRlcGlja2VyJyksXG5cdFx0XHRcdG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09PSAnb2JqZWN0JyAmJiBvcHRpb247XG5cdFx0XHRpZiAoIWRhdGEpe1xuXHRcdFx0XHR2YXIgZWxvcHRzID0gb3B0c19mcm9tX2VsKHRoaXMsICdkYXRlJyksXG5cdFx0XHRcdFx0Ly8gUHJlbGltaW5hcnkgb3Rpb25zXG5cdFx0XHRcdFx0eG9wdHMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGVsb3B0cywgb3B0aW9ucyksXG5cdFx0XHRcdFx0bG9jb3B0cyA9IG9wdHNfZnJvbV9sb2NhbGUoeG9wdHMubGFuZ3VhZ2UpLFxuXHRcdFx0XHRcdC8vIE9wdGlvbnMgcHJpb3JpdHk6IGpzIGFyZ3MsIGRhdGEtYXR0cnMsIGxvY2FsZXMsIGRlZmF1bHRzXG5cdFx0XHRcdFx0b3B0cyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgbG9jb3B0cywgZWxvcHRzLCBvcHRpb25zKTtcblx0XHRcdFx0aWYgKCR0aGlzLmhhc0NsYXNzKCdpbnB1dC1kYXRlcmFuZ2UnKSB8fCBvcHRzLmlucHV0cyl7XG5cdFx0XHRcdFx0JC5leHRlbmQob3B0cywge1xuXHRcdFx0XHRcdFx0aW5wdXRzOiBvcHRzLmlucHV0cyB8fCAkdGhpcy5maW5kKCdpbnB1dCcpLnRvQXJyYXkoKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGRhdGEgPSBuZXcgRGF0ZVJhbmdlUGlja2VyKHRoaXMsIG9wdHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGRhdGEgPSBuZXcgRGF0ZXBpY2tlcih0aGlzLCBvcHRzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkdGhpcy5kYXRhKCdkYXRlcGlja2VyJywgZGF0YSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGRhdGFbb3B0aW9uXSA9PT0gJ2Z1bmN0aW9uJyl7XG5cdFx0XHRcdGludGVybmFsX3JldHVybiA9IGRhdGFbb3B0aW9uXS5hcHBseShkYXRhLCBhcmdzKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChcblx0XHRcdGludGVybmFsX3JldHVybiA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRpbnRlcm5hbF9yZXR1cm4gaW5zdGFuY2VvZiBEYXRlcGlja2VyIHx8XG5cdFx0XHRpbnRlcm5hbF9yZXR1cm4gaW5zdGFuY2VvZiBEYXRlUmFuZ2VQaWNrZXJcblx0XHQpXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdGlmICh0aGlzLmxlbmd0aCA+IDEpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VzaW5nIG9ubHkgYWxsb3dlZCBmb3IgdGhlIGNvbGxlY3Rpb24gb2YgYSBzaW5nbGUgZWxlbWVudCAoJyArIG9wdGlvbiArICcgZnVuY3Rpb24pJyk7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIGludGVybmFsX3JldHVybjtcblx0fTtcblx0JC5mbi5kYXRlcGlja2VyID0gZGF0ZXBpY2tlclBsdWdpbjtcblxuXHR2YXIgZGVmYXVsdHMgPSAkLmZuLmRhdGVwaWNrZXIuZGVmYXVsdHMgPSB7XG5cdFx0YXNzdW1lTmVhcmJ5WWVhcjogZmFsc2UsXG5cdFx0YXV0b2Nsb3NlOiBmYWxzZSxcblx0XHRiZWZvcmVTaG93RGF5OiAkLm5vb3AsXG5cdFx0YmVmb3JlU2hvd01vbnRoOiAkLm5vb3AsXG5cdFx0YmVmb3JlU2hvd1llYXI6ICQubm9vcCxcblx0XHRiZWZvcmVTaG93RGVjYWRlOiAkLm5vb3AsXG5cdFx0YmVmb3JlU2hvd0NlbnR1cnk6ICQubm9vcCxcblx0XHRjYWxlbmRhcldlZWtzOiBmYWxzZSxcblx0XHRjbGVhckJ0bjogZmFsc2UsXG5cdFx0dG9nZ2xlQWN0aXZlOiBmYWxzZSxcblx0XHRkYXlzT2ZXZWVrRGlzYWJsZWQ6IFtdLFxuXHRcdGRheXNPZldlZWtIaWdobGlnaHRlZDogW10sXG5cdFx0ZGF0ZXNEaXNhYmxlZDogW10sXG5cdFx0ZW5kRGF0ZTogSW5maW5pdHksXG5cdFx0Zm9yY2VQYXJzZTogdHJ1ZSxcblx0XHRmb3JtYXQ6ICdtbS9kZC95eXl5Jyxcblx0XHRrZWVwRW1wdHlWYWx1ZXM6IGZhbHNlLFxuXHRcdGtleWJvYXJkTmF2aWdhdGlvbjogdHJ1ZSxcblx0XHRsYW5ndWFnZTogJ2VuJyxcblx0XHRtaW5WaWV3TW9kZTogMCxcblx0XHRtYXhWaWV3TW9kZTogNCxcblx0XHRtdWx0aWRhdGU6IGZhbHNlLFxuXHRcdG11bHRpZGF0ZVNlcGFyYXRvcjogJywnLFxuXHRcdG9yaWVudGF0aW9uOiBcImF1dG9cIixcblx0XHRydGw6IGZhbHNlLFxuXHRcdHN0YXJ0RGF0ZTogLUluZmluaXR5LFxuXHRcdHN0YXJ0VmlldzogMCxcblx0XHR0b2RheUJ0bjogZmFsc2UsXG5cdFx0dG9kYXlIaWdobGlnaHQ6IGZhbHNlLFxuXHRcdHVwZGF0ZVZpZXdEYXRlOiB0cnVlLFxuXHRcdHdlZWtTdGFydDogMCxcblx0XHRkaXNhYmxlVG91Y2hLZXlib2FyZDogZmFsc2UsXG5cdFx0ZW5hYmxlT25SZWFkb25seTogdHJ1ZSxcblx0XHRzaG93T25Gb2N1czogdHJ1ZSxcblx0XHR6SW5kZXhPZmZzZXQ6IDEwLFxuXHRcdGNvbnRhaW5lcjogJ2JvZHknLFxuXHRcdGltbWVkaWF0ZVVwZGF0ZXM6IGZhbHNlLFxuXHRcdHRpdGxlOiAnJyxcblx0XHR0ZW1wbGF0ZXM6IHtcblx0XHRcdGxlZnRBcnJvdzogJyYjeDAwQUI7Jyxcblx0XHRcdHJpZ2h0QXJyb3c6ICcmI3gwMEJCOydcblx0XHR9LFxuICAgIHNob3dXZWVrRGF5czogdHJ1ZVxuXHR9O1xuXHR2YXIgbG9jYWxlX29wdHMgPSAkLmZuLmRhdGVwaWNrZXIubG9jYWxlX29wdHMgPSBbXG5cdFx0J2Zvcm1hdCcsXG5cdFx0J3J0bCcsXG5cdFx0J3dlZWtTdGFydCdcblx0XTtcblx0JC5mbi5kYXRlcGlja2VyLkNvbnN0cnVjdG9yID0gRGF0ZXBpY2tlcjtcblx0dmFyIGRhdGVzID0gJC5mbi5kYXRlcGlja2VyLmRhdGVzID0ge1xuXHRcdGVuOiB7XG5cdFx0XHRkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcblx0XHRcdGRheXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuXHRcdFx0ZGF5c01pbjogW1wiU3VcIiwgXCJNb1wiLCBcIlR1XCIsIFwiV2VcIiwgXCJUaFwiLCBcIkZyXCIsIFwiU2FcIl0sXG5cdFx0XHRtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuXHRcdFx0bW9udGhzU2hvcnQ6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcblx0XHRcdHRvZGF5OiBcIlRvZGF5XCIsXG5cdFx0XHRjbGVhcjogXCJDbGVhclwiLFxuXHRcdFx0dGl0bGVGb3JtYXQ6IFwiTU0geXl5eVwiXG5cdFx0fVxuXHR9O1xuXG5cdHZhciBEUEdsb2JhbCA9IHtcblx0XHR2aWV3TW9kZXM6IFtcblx0XHRcdHtcblx0XHRcdFx0bmFtZXM6IFsnZGF5cycsICdtb250aCddLFxuXHRcdFx0XHRjbHNOYW1lOiAnZGF5cycsXG5cdFx0XHRcdGU6ICdjaGFuZ2VNb250aCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWVzOiBbJ21vbnRocycsICd5ZWFyJ10sXG5cdFx0XHRcdGNsc05hbWU6ICdtb250aHMnLFxuXHRcdFx0XHRlOiAnY2hhbmdlWWVhcicsXG5cdFx0XHRcdG5hdlN0ZXA6IDFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWVzOiBbJ3llYXJzJywgJ2RlY2FkZSddLFxuXHRcdFx0XHRjbHNOYW1lOiAneWVhcnMnLFxuXHRcdFx0XHRlOiAnY2hhbmdlRGVjYWRlJyxcblx0XHRcdFx0bmF2U3RlcDogMTBcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWVzOiBbJ2RlY2FkZXMnLCAnY2VudHVyeSddLFxuXHRcdFx0XHRjbHNOYW1lOiAnZGVjYWRlcycsXG5cdFx0XHRcdGU6ICdjaGFuZ2VDZW50dXJ5Jyxcblx0XHRcdFx0bmF2U3RlcDogMTAwXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lczogWydjZW50dXJpZXMnLCAnbWlsbGVubml1bSddLFxuXHRcdFx0XHRjbHNOYW1lOiAnY2VudHVyaWVzJyxcblx0XHRcdFx0ZTogJ2NoYW5nZU1pbGxlbm5pdW0nLFxuXHRcdFx0XHRuYXZTdGVwOiAxMDAwXG5cdFx0XHR9XG5cdFx0XSxcblx0XHR2YWxpZFBhcnRzOiAvZGQ/fEREP3xtbT98TU0/fHl5KD86eXkpPy9nLFxuXHRcdG5vbnB1bmN0dWF0aW9uOiAvW14gLVxcLzotQFxcdTVlNzRcXHU2NzA4XFx1NjVlNVxcWy1gey1+XFx0XFxuXFxyXSsvZyxcblx0XHRwYXJzZUZvcm1hdDogZnVuY3Rpb24oZm9ybWF0KXtcblx0XHRcdGlmICh0eXBlb2YgZm9ybWF0LnRvVmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGZvcm1hdC50b0Rpc3BsYXkgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICAgICAgICAgIC8vIElFIHRyZWF0cyBcXDAgYXMgYSBzdHJpbmcgZW5kIGluIGlucHV0cyAodHJ1bmNhdGluZyB0aGUgdmFsdWUpLFxuXHRcdFx0Ly8gc28gaXQncyBhIGJhZCBmb3JtYXQgZGVsaW1pdGVyLCBhbnl3YXlcblx0XHRcdHZhciBzZXBhcmF0b3JzID0gZm9ybWF0LnJlcGxhY2UodGhpcy52YWxpZFBhcnRzLCAnXFwwJykuc3BsaXQoJ1xcMCcpLFxuXHRcdFx0XHRwYXJ0cyA9IGZvcm1hdC5tYXRjaCh0aGlzLnZhbGlkUGFydHMpO1xuXHRcdFx0aWYgKCFzZXBhcmF0b3JzIHx8ICFzZXBhcmF0b3JzLmxlbmd0aCB8fCAhcGFydHMgfHwgcGFydHMubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIGZvcm1hdC5cIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge3NlcGFyYXRvcnM6IHNlcGFyYXRvcnMsIHBhcnRzOiBwYXJ0c307XG5cdFx0fSxcblx0XHRwYXJzZURhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2UsIGFzc3VtZU5lYXJieSl7XG5cdFx0XHRpZiAoIWRhdGUpXG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG5cdFx0XHRcdHJldHVybiBkYXRlO1xuXHRcdFx0aWYgKHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRmb3JtYXQgPSBEUEdsb2JhbC5wYXJzZUZvcm1hdChmb3JtYXQpO1xuXHRcdFx0aWYgKGZvcm1hdC50b1ZhbHVlKVxuXHRcdFx0XHRyZXR1cm4gZm9ybWF0LnRvVmFsdWUoZGF0ZSwgZm9ybWF0LCBsYW5ndWFnZSk7XG5cdFx0XHR2YXIgZm5fbWFwID0ge1xuXHRcdFx0XHRcdGQ6ICdtb3ZlRGF5Jyxcblx0XHRcdFx0XHRtOiAnbW92ZU1vbnRoJyxcblx0XHRcdFx0XHR3OiAnbW92ZVdlZWsnLFxuXHRcdFx0XHRcdHk6ICdtb3ZlWWVhcidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0ZUFsaWFzZXMgPSB7XG5cdFx0XHRcdFx0eWVzdGVyZGF5OiAnLTFkJyxcblx0XHRcdFx0XHR0b2RheTogJyswZCcsXG5cdFx0XHRcdFx0dG9tb3Jyb3c6ICcrMWQnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHBhcnRzLCBwYXJ0LCBkaXIsIGksIGZuO1xuXHRcdFx0aWYgKGRhdGUgaW4gZGF0ZUFsaWFzZXMpe1xuXHRcdFx0XHRkYXRlID0gZGF0ZUFsaWFzZXNbZGF0ZV07XG5cdFx0XHR9XG5cdFx0XHRpZiAoL15bXFwtK11cXGQrW2Rtd3ldKFtcXHMsXStbXFwtK11cXGQrW2Rtd3ldKSokL2kudGVzdChkYXRlKSl7XG5cdFx0XHRcdHBhcnRzID0gZGF0ZS5tYXRjaCgvKFtcXC0rXVxcZCspKFtkbXd5XSkvZ2kpO1xuXHRcdFx0XHRkYXRlID0gbmV3IERhdGUoKTtcblx0XHRcdFx0Zm9yIChpPTA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0cGFydCA9IHBhcnRzW2ldLm1hdGNoKC8oW1xcLStdXFxkKykoW2Rtd3ldKS9pKTtcblx0XHRcdFx0XHRkaXIgPSBOdW1iZXIocGFydFsxXSk7XG5cdFx0XHRcdFx0Zm4gPSBmbl9tYXBbcGFydFsyXS50b0xvd2VyQ2FzZSgpXTtcblx0XHRcdFx0XHRkYXRlID0gRGF0ZXBpY2tlci5wcm90b3R5cGVbZm5dKGRhdGUsIGRpcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIERhdGVwaWNrZXIucHJvdG90eXBlLl96ZXJvX3V0Y190aW1lKGRhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRwYXJ0cyA9IGRhdGUgJiYgZGF0ZS5tYXRjaCh0aGlzLm5vbnB1bmN0dWF0aW9uKSB8fCBbXTtcblxuXHRcdFx0ZnVuY3Rpb24gYXBwbHlOZWFyYnlZZWFyKHllYXIsIHRocmVzaG9sZCl7XG5cdFx0XHRcdGlmICh0aHJlc2hvbGQgPT09IHRydWUpXG5cdFx0XHRcdFx0dGhyZXNob2xkID0gMTA7XG5cblx0XHRcdFx0Ly8gaWYgeWVhciBpcyAyIGRpZ2l0cyBvciBsZXNzLCB0aGFuIHRoZSB1c2VyIG1vc3QgbGlrZWx5IGlzIHRyeWluZyB0byBnZXQgYSByZWNlbnQgY2VudHVyeVxuXHRcdFx0XHRpZiAoeWVhciA8IDEwMCl7XG5cdFx0XHRcdFx0eWVhciArPSAyMDAwO1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBuZXcgeWVhciBpcyBtb3JlIHRoYW4gdGhyZXNob2xkIHllYXJzIGluIGFkdmFuY2UsIHVzZSBsYXN0IGNlbnR1cnlcblx0XHRcdFx0XHRpZiAoeWVhciA+ICgobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSt0aHJlc2hvbGQpKXtcblx0XHRcdFx0XHRcdHllYXIgLT0gMTAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB5ZWFyO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGFyc2VkID0ge30sXG5cdFx0XHRcdHNldHRlcnNfb3JkZXIgPSBbJ3l5eXknLCAneXknLCAnTScsICdNTScsICdtJywgJ21tJywgJ2QnLCAnZGQnXSxcblx0XHRcdFx0c2V0dGVyc19tYXAgPSB7XG5cdFx0XHRcdFx0eXl5eTogZnVuY3Rpb24oZCx2KXtcblx0XHRcdFx0XHRcdHJldHVybiBkLnNldFVUQ0Z1bGxZZWFyKGFzc3VtZU5lYXJieSA/IGFwcGx5TmVhcmJ5WWVhcih2LCBhc3N1bWVOZWFyYnkpIDogdik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtOiBmdW5jdGlvbihkLHYpe1xuXHRcdFx0XHRcdFx0aWYgKGlzTmFOKGQpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZDtcblx0XHRcdFx0XHRcdHYgLT0gMTtcblx0XHRcdFx0XHRcdHdoaWxlICh2IDwgMCkgdiArPSAxMjtcblx0XHRcdFx0XHRcdHYgJT0gMTI7XG5cdFx0XHRcdFx0XHRkLnNldFVUQ01vbnRoKHYpO1xuXHRcdFx0XHRcdFx0d2hpbGUgKGQuZ2V0VVRDTW9udGgoKSAhPT0gdilcblx0XHRcdFx0XHRcdFx0ZC5zZXRVVENEYXRlKGQuZ2V0VVRDRGF0ZSgpLTEpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGQ7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkOiBmdW5jdGlvbihkLHYpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGQuc2V0VVRDRGF0ZSh2KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHZhbCwgZmlsdGVyZWQ7XG5cdFx0XHRzZXR0ZXJzX21hcFsneXknXSA9IHNldHRlcnNfbWFwWyd5eXl5J107XG5cdFx0XHRzZXR0ZXJzX21hcFsnTSddID0gc2V0dGVyc19tYXBbJ01NJ10gPSBzZXR0ZXJzX21hcFsnbW0nXSA9IHNldHRlcnNfbWFwWydtJ107XG5cdFx0XHRzZXR0ZXJzX21hcFsnZGQnXSA9IHNldHRlcnNfbWFwWydkJ107XG5cdFx0XHRkYXRlID0gVVRDVG9kYXkoKTtcblx0XHRcdHZhciBmcGFydHMgPSBmb3JtYXQucGFydHMuc2xpY2UoKTtcblx0XHRcdC8vIFJlbW92ZSBub29wIHBhcnRzXG5cdFx0XHRpZiAocGFydHMubGVuZ3RoICE9PSBmcGFydHMubGVuZ3RoKXtcblx0XHRcdFx0ZnBhcnRzID0gJChmcGFydHMpLmZpbHRlcihmdW5jdGlvbihpLHApe1xuXHRcdFx0XHRcdHJldHVybiAkLmluQXJyYXkocCwgc2V0dGVyc19vcmRlcikgIT09IC0xO1xuXHRcdFx0XHR9KS50b0FycmF5KCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBQcm9jZXNzIHJlbWFpbmRlclxuXHRcdFx0ZnVuY3Rpb24gbWF0Y2hfcGFydCgpe1xuXHRcdFx0XHR2YXIgbSA9IHRoaXMuc2xpY2UoMCwgcGFydHNbaV0ubGVuZ3RoKSxcblx0XHRcdFx0XHRwID0gcGFydHNbaV0uc2xpY2UoMCwgbS5sZW5ndGgpO1xuXHRcdFx0XHRyZXR1cm4gbS50b0xvd2VyQ2FzZSgpID09PSBwLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGFydHMubGVuZ3RoID09PSBmcGFydHMubGVuZ3RoKXtcblx0XHRcdFx0dmFyIGNudDtcblx0XHRcdFx0Zm9yIChpPTAsIGNudCA9IGZwYXJ0cy5sZW5ndGg7IGkgPCBjbnQ7IGkrKyl7XG5cdFx0XHRcdFx0dmFsID0gcGFyc2VJbnQocGFydHNbaV0sIDEwKTtcblx0XHRcdFx0XHRwYXJ0ID0gZnBhcnRzW2ldO1xuXHRcdFx0XHRcdGlmIChpc05hTih2YWwpKXtcblx0XHRcdFx0XHRcdHN3aXRjaCAocGFydCl7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ01NJzpcblx0XHRcdFx0XHRcdFx0XHRmaWx0ZXJlZCA9ICQoZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRocykuZmlsdGVyKG1hdGNoX3BhcnQpO1xuXHRcdFx0XHRcdFx0XHRcdHZhbCA9ICQuaW5BcnJheShmaWx0ZXJlZFswXSwgZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRocykgKyAxO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0XHRcdFx0XHRmaWx0ZXJlZCA9ICQoZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRoc1Nob3J0KS5maWx0ZXIobWF0Y2hfcGFydCk7XG5cdFx0XHRcdFx0XHRcdFx0dmFsID0gJC5pbkFycmF5KGZpbHRlcmVkWzBdLCBkYXRlc1tsYW5ndWFnZV0ubW9udGhzU2hvcnQpICsgMTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGFyc2VkW3BhcnRdID0gdmFsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBfZGF0ZSwgcztcblx0XHRcdFx0Zm9yIChpPTA7IGkgPCBzZXR0ZXJzX29yZGVyLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRzID0gc2V0dGVyc19vcmRlcltpXTtcblx0XHRcdFx0XHRpZiAocyBpbiBwYXJzZWQgJiYgIWlzTmFOKHBhcnNlZFtzXSkpe1xuXHRcdFx0XHRcdFx0X2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblx0XHRcdFx0XHRcdHNldHRlcnNfbWFwW3NdKF9kYXRlLCBwYXJzZWRbc10pO1xuXHRcdFx0XHRcdFx0aWYgKCFpc05hTihfZGF0ZSkpXG5cdFx0XHRcdFx0XHRcdGRhdGUgPSBfZGF0ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBkYXRlO1xuXHRcdH0sXG5cdFx0Zm9ybWF0RGF0ZTogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0LCBsYW5ndWFnZSl7XG5cdFx0XHRpZiAoIWRhdGUpXG5cdFx0XHRcdHJldHVybiAnJztcblx0XHRcdGlmICh0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJylcblx0XHRcdFx0Zm9ybWF0ID0gRFBHbG9iYWwucGFyc2VGb3JtYXQoZm9ybWF0KTtcblx0XHRcdGlmIChmb3JtYXQudG9EaXNwbGF5KVxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQudG9EaXNwbGF5KGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2UpO1xuICAgICAgICAgICAgdmFyIHZhbCA9IHtcblx0XHRcdFx0ZDogZGF0ZS5nZXRVVENEYXRlKCksXG5cdFx0XHRcdEQ6IGRhdGVzW2xhbmd1YWdlXS5kYXlzU2hvcnRbZGF0ZS5nZXRVVENEYXkoKV0sXG5cdFx0XHRcdEREOiBkYXRlc1tsYW5ndWFnZV0uZGF5c1tkYXRlLmdldFVUQ0RheSgpXSxcblx0XHRcdFx0bTogZGF0ZS5nZXRVVENNb250aCgpICsgMSxcblx0XHRcdFx0TTogZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRoc1Nob3J0W2RhdGUuZ2V0VVRDTW9udGgoKV0sXG5cdFx0XHRcdE1NOiBkYXRlc1tsYW5ndWFnZV0ubW9udGhzW2RhdGUuZ2V0VVRDTW9udGgoKV0sXG5cdFx0XHRcdHl5OiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiksXG5cdFx0XHRcdHl5eXk6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKVxuXHRcdFx0fTtcblx0XHRcdHZhbC5kZCA9ICh2YWwuZCA8IDEwID8gJzAnIDogJycpICsgdmFsLmQ7XG5cdFx0XHR2YWwubW0gPSAodmFsLm0gPCAxMCA/ICcwJyA6ICcnKSArIHZhbC5tO1xuXHRcdFx0ZGF0ZSA9IFtdO1xuXHRcdFx0dmFyIHNlcHMgPSAkLmV4dGVuZChbXSwgZm9ybWF0LnNlcGFyYXRvcnMpO1xuXHRcdFx0Zm9yICh2YXIgaT0wLCBjbnQgPSBmb3JtYXQucGFydHMubGVuZ3RoOyBpIDw9IGNudDsgaSsrKXtcblx0XHRcdFx0aWYgKHNlcHMubGVuZ3RoKVxuXHRcdFx0XHRcdGRhdGUucHVzaChzZXBzLnNoaWZ0KCkpO1xuXHRcdFx0XHRkYXRlLnB1c2godmFsW2Zvcm1hdC5wYXJ0c1tpXV0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRhdGUuam9pbignJyk7XG5cdFx0fSxcblx0XHRoZWFkVGVtcGxhdGU6ICc8dGhlYWQ+Jytcblx0XHRcdCAgICAgICAgICAgICAgJzx0cj4nK1xuXHRcdFx0ICAgICAgICAgICAgICAgICc8dGggY29sc3Bhbj1cIjdcIiBjbGFzcz1cImRhdGVwaWNrZXItdGl0bGVcIj48L3RoPicrXG5cdFx0XHQgICAgICAgICAgICAgICc8L3RyPicrXG5cdFx0XHRcdFx0XHRcdCc8dHI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNsYXNzPVwicHJldlwiPicrZGVmYXVsdHMudGVtcGxhdGVzLmxlZnRBcnJvdysnPC90aD4nK1xuXHRcdFx0XHRcdFx0XHRcdCc8dGggY29sc3Bhbj1cIjVcIiBjbGFzcz1cImRhdGVwaWNrZXItc3dpdGNoXCI+PC90aD4nK1xuXHRcdFx0XHRcdFx0XHRcdCc8dGggY2xhc3M9XCJuZXh0XCI+JytkZWZhdWx0cy50ZW1wbGF0ZXMucmlnaHRBcnJvdysnPC90aD4nK1xuXHRcdFx0XHRcdFx0XHQnPC90cj4nK1xuXHRcdFx0XHRcdFx0JzwvdGhlYWQ+Jyxcblx0XHRjb250VGVtcGxhdGU6ICc8dGJvZHk+PHRyPjx0ZCBjb2xzcGFuPVwiN1wiPjwvdGQ+PC90cj48L3Rib2R5PicsXG5cdFx0Zm9vdFRlbXBsYXRlOiAnPHRmb290PicrXG5cdFx0XHRcdFx0XHRcdCc8dHI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJ0b2RheVwiPjwvdGg+Jytcblx0XHRcdFx0XHRcdFx0JzwvdHI+Jytcblx0XHRcdFx0XHRcdFx0Jzx0cj4nK1xuXHRcdFx0XHRcdFx0XHRcdCc8dGggY29sc3Bhbj1cIjdcIiBjbGFzcz1cImNsZWFyXCI+PC90aD4nK1xuXHRcdFx0XHRcdFx0XHQnPC90cj4nK1xuXHRcdFx0XHRcdFx0JzwvdGZvb3Q+J1xuXHR9O1xuXHREUEdsb2JhbC50ZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlclwiPicrXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kYXlzXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+Jytcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdCc8dGJvZHk+PC90Ym9keT4nK1xuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuZm9vdFRlbXBsYXRlK1xuXHRcdFx0XHRcdFx0XHRcdCc8L3RhYmxlPicrXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItbW9udGhzXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+Jytcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmZvb3RUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xuXHRcdFx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLXllYXJzXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+Jytcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmZvb3RUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xuXHRcdFx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWRlY2FkZXNcIj4nK1xuXHRcdFx0XHRcdFx0XHRcdCc8dGFibGUgY2xhc3M9XCJ0YWJsZS1jb25kZW5zZWRcIj4nK1xuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuaGVhZFRlbXBsYXRlK1xuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuY29udFRlbXBsYXRlK1xuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuZm9vdFRlbXBsYXRlK1xuXHRcdFx0XHRcdFx0XHRcdCc8L3RhYmxlPicrXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY2VudHVyaWVzXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+Jytcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmZvb3RUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xuXHRcdFx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8L2Rpdj4nO1xuXG5cdCQuZm4uZGF0ZXBpY2tlci5EUEdsb2JhbCA9IERQR2xvYmFsO1xuXG5cblx0LyogREFURVBJQ0tFUiBOTyBDT05GTElDVFxuXHQqID09PT09PT09PT09PT09PT09PT0gKi9cblxuXHQkLmZuLmRhdGVwaWNrZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uKCl7XG5cdFx0JC5mbi5kYXRlcGlja2VyID0gb2xkO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8qIERBVEVQSUNLRVIgVkVSU0lPTlxuXHQgKiA9PT09PT09PT09PT09PT09PT09ICovXG5cdCQuZm4uZGF0ZXBpY2tlci52ZXJzaW9uID0gJzEuNy4xJztcblxuXHQkLmZuLmRhdGVwaWNrZXIuZGVwcmVjYXRlZCA9IGZ1bmN0aW9uKG1zZyl7XG5cdFx0dmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcblx0XHRpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcblx0XHRcdGNvbnNvbGUud2FybignREVQUkVDQVRFRDogJyArIG1zZyk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyogREFURVBJQ0tFUiBEQVRBLUFQSVxuXHQqID09PT09PT09PT09PT09PT09PSAqL1xuXG5cdCQoZG9jdW1lbnQpLm9uKFxuXHRcdCdmb2N1cy5kYXRlcGlja2VyLmRhdGEtYXBpIGNsaWNrLmRhdGVwaWNrZXIuZGF0YS1hcGknLFxuXHRcdCdbZGF0YS1wcm92aWRlPVwiZGF0ZXBpY2tlclwiXScsXG5cdFx0ZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0aWYgKCR0aGlzLmRhdGEoJ2RhdGVwaWNrZXInKSlcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly8gY29tcG9uZW50IGNsaWNrIHJlcXVpcmVzIHVzIHRvIGV4cGxpY2l0bHkgc2hvdyBpdFxuXHRcdFx0ZGF0ZXBpY2tlclBsdWdpbi5jYWxsKCR0aGlzLCAnc2hvdycpO1xuXHRcdH1cblx0KTtcblx0JChmdW5jdGlvbigpe1xuXHRcdGRhdGVwaWNrZXJQbHVnaW4uY2FsbCgkKCdbZGF0YS1wcm92aWRlPVwiZGF0ZXBpY2tlci1pbmxpbmVcIl0nKSk7XG5cdH0pO1xuXG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ib290c3RyYXAtZGF0ZXBpY2tlci9kaXN0L2pzL2Jvb3RzdHJhcC1kYXRlcGlja2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9ib290c3RyYXAtZGF0ZXBpY2tlci9kaXN0L2pzL2Jvb3RzdHJhcC1kYXRlcGlja2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDMiXSwic291cmNlUm9vdCI6IiJ9