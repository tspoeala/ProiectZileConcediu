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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvUmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9mcmVlRGF5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qcyJdLCJuYW1lcyI6WyIkIiwiY29uc29sZSIsImxvZyIsImFycmF5IiwiZGF0ZXBpY2tlciIsImF1dG9jbG9zZSIsImZvcm1hdCIsImRhdGVzRGlzYWJsZWQiLCJKU09OIiwicGFyc2UiLCJkYXlzT2ZXZWVrRGlzYWJsZWQiLCJ0b2RheUhpZ2hsaWdodCIsIm1pbkRhdGUiLCJvbiIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsOENBQUFBLENBQUUsWUFBWTtBQUNWQyxpQ0FBUUMsR0FBUixDQUFZQyxLQUFaO0FBQ0FILHlCQUFBLDhDQUFBQSxDQUFFLGtCQUFGLEVBQXNCSSxVQUF0QixDQUFpQztBQUNSQyw2REFBVyxJQURILEVBQ1k7QUFDcEJDLDBEQUFRLFlBRkE7QUFHUkMsaUVBQWVDLEtBQUtDLEtBQUwsQ0FBV04sS0FBWCxDQUhQO0FBSVJPLHNFQUFvQixJQUpaO0FBS1JDLGtFQUFnQixJQUxSO0FBTVJDLDJEQUFTOztBQU5ELDBCQUFqQyxFQVVzQkMsRUFWdEIsQ0FVeUIsWUFWekIsRUFVdUMsVUFBVUMsQ0FBVixFQUFhLENBQzlCLENBWHRCO0FBWUgsQ0FkRCxFOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CO0FBQ3BCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHVDQUF1QztBQUNqRTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDBCQUEwQiw2Q0FBNkM7QUFDdkU7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwwQkFBMEIsNkJBQTZCO0FBQ3ZEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxzQ0FBc0MsMEJBQTBCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsbUNBQW1DLGFBQWEsRUFBRTtBQUNsRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixDQUFDIiwiZmlsZSI6ImZyZWVEYXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdib290c3RyYXAtc2Fzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwLWRhdGVwaWNrZXInO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICAkKCcjZGF0ZXRpbWVwaWNrZXI1JykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2Nsb3NlOiB0cnVlLCAgICAvLyBJdCBpcyBmYWxzZSwgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ21tL2RkL3l5eXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IEpTT04ucGFyc2UoYXJyYXkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheXNPZldlZWtEaXNhYmxlZDogJzA2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiAwXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9SZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL2ZyZWVEYXlzLmpzIiwiLyohXHJcbiAqIERhdGVwaWNrZXIgZm9yIEJvb3RzdHJhcCB2MS43LjEgKGh0dHBzOi8vZ2l0aHViLmNvbS91eHNvbHV0aW9ucy9ib290c3RyYXAtZGF0ZXBpY2tlcilcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlIHYyLjAgKGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMClcclxuICovXHJcblxyXG4oZnVuY3Rpb24oZmFjdG9yeSl7XHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcclxuICAgICAgICBkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcclxuICAgIH1cclxufShmdW5jdGlvbigkLCB1bmRlZmluZWQpe1xyXG5cdGZ1bmN0aW9uIFVUQ0RhdGUoKXtcclxuXHRcdHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShEYXRlLCBhcmd1bWVudHMpKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gVVRDVG9kYXkoKXtcclxuXHRcdHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcblx0XHRyZXR1cm4gVVRDRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXREYXRlKCkpO1xyXG5cdH1cclxuXHRmdW5jdGlvbiBpc1VUQ0VxdWFscyhkYXRlMSwgZGF0ZTIpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdGRhdGUxLmdldFVUQ0Z1bGxZZWFyKCkgPT09IGRhdGUyLmdldFVUQ0Z1bGxZZWFyKCkgJiZcclxuXHRcdFx0ZGF0ZTEuZ2V0VVRDTW9udGgoKSA9PT0gZGF0ZTIuZ2V0VVRDTW9udGgoKSAmJlxyXG5cdFx0XHRkYXRlMS5nZXRVVENEYXRlKCkgPT09IGRhdGUyLmdldFVUQ0RhdGUoKVxyXG5cdFx0KTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gYWxpYXMobWV0aG9kLCBkZXByZWNhdGlvbk1zZyl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYgKGRlcHJlY2F0aW9uTXNnICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHQkLmZuLmRhdGVwaWNrZXIuZGVwcmVjYXRlZChkZXByZWNhdGlvbk1zZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzW21ldGhvZF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdH07XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGlzVmFsaWREYXRlKGQpIHtcclxuXHRcdHJldHVybiBkICYmICFpc05hTihkLmdldFRpbWUoKSk7XHJcblx0fVxyXG5cclxuXHR2YXIgRGF0ZUFycmF5ID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZXh0cmFzID0ge1xyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKGkpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNsaWNlKGkpWzBdO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb250YWluczogZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0Ly8gQXJyYXkuaW5kZXhPZiBpcyBub3QgY3Jvc3MtYnJvd3NlcjtcclxuXHRcdFx0XHQvLyAkLmluQXJyYXkgZG9lc24ndCB3b3JrIHdpdGggRGF0ZXNcclxuXHRcdFx0XHR2YXIgdmFsID0gZCAmJiBkLnZhbHVlT2YoKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpPTAsIGw9dGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspXHJcbiAgICAgICAgICAvLyBVc2UgZGF0ZSBhcml0aG1ldGljIHRvIGFsbG93IGRhdGVzIHdpdGggZGlmZmVyZW50IHRpbWVzIHRvIG1hdGNoXHJcbiAgICAgICAgICBpZiAoMCA8PSB0aGlzW2ldLnZhbHVlT2YoKSAtIHZhbCAmJiB0aGlzW2ldLnZhbHVlT2YoKSAtIHZhbCA8IDEwMDAqNjAqNjAqMjQpXHJcblx0XHRcdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cmVtb3ZlOiBmdW5jdGlvbihpKXtcclxuXHRcdFx0XHR0aGlzLnNwbGljZShpLDEpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRyZXBsYWNlOiBmdW5jdGlvbihuZXdfYXJyYXkpe1xyXG5cdFx0XHRcdGlmICghbmV3X2FycmF5KVxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdGlmICghJC5pc0FycmF5KG5ld19hcnJheSkpXHJcblx0XHRcdFx0XHRuZXdfYXJyYXkgPSBbbmV3X2FycmF5XTtcclxuXHRcdFx0XHR0aGlzLmNsZWFyKCk7XHJcblx0XHRcdFx0dGhpcy5wdXNoLmFwcGx5KHRoaXMsIG5ld19hcnJheSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNsZWFyOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHRoaXMubGVuZ3RoID0gMDtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y29weTogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgYSA9IG5ldyBEYXRlQXJyYXkoKTtcclxuXHRcdFx0XHRhLnJlcGxhY2UodGhpcyk7XHJcblx0XHRcdFx0cmV0dXJuIGE7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBhID0gW107XHJcblx0XHRcdGEucHVzaC5hcHBseShhLCBhcmd1bWVudHMpO1xyXG5cdFx0XHQkLmV4dGVuZChhLCBleHRyYXMpO1xyXG5cdFx0XHRyZXR1cm4gYTtcclxuXHRcdH07XHJcblx0fSkoKTtcclxuXHJcblxyXG5cdC8vIFBpY2tlciBvYmplY3RcclxuXHJcblx0dmFyIERhdGVwaWNrZXIgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKXtcclxuXHRcdCQuZGF0YShlbGVtZW50LCAnZGF0ZXBpY2tlcicsIHRoaXMpO1xyXG5cdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuZGF0ZXMgPSBuZXcgRGF0ZUFycmF5KCk7XHJcblx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5vLmRlZmF1bHRWaWV3RGF0ZTtcclxuXHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5pc0lucHV0ID0gdGhpcy5lbGVtZW50LmlzKCdpbnB1dCcpO1xyXG5cdFx0dGhpcy5pbnB1dEZpZWxkID0gdGhpcy5pc0lucHV0ID8gdGhpcy5lbGVtZW50IDogdGhpcy5lbGVtZW50LmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuZWxlbWVudC5oYXNDbGFzcygnZGF0ZScpID8gdGhpcy5lbGVtZW50LmZpbmQoJy5hZGQtb24sIC5pbnB1dC1ncm91cC1hZGRvbiwgLmJ0bicpIDogZmFsc2U7XHJcblx0XHRpZiAodGhpcy5jb21wb25lbnQgJiYgdGhpcy5jb21wb25lbnQubGVuZ3RoID09PSAwKVxyXG5cdFx0XHR0aGlzLmNvbXBvbmVudCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pc0lubGluZSA9ICF0aGlzLmNvbXBvbmVudCAmJiB0aGlzLmVsZW1lbnQuaXMoJ2RpdicpO1xyXG5cclxuXHRcdHRoaXMucGlja2VyID0gJChEUEdsb2JhbC50ZW1wbGF0ZSk7XHJcblxyXG5cdFx0Ly8gQ2hlY2tpbmcgdGVtcGxhdGVzIGFuZCBpbnNlcnRpbmdcclxuXHRcdGlmICh0aGlzLl9jaGVja190ZW1wbGF0ZSh0aGlzLm8udGVtcGxhdGVzLmxlZnRBcnJvdykpIHtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLnByZXYnKS5odG1sKHRoaXMuby50ZW1wbGF0ZXMubGVmdEFycm93KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fY2hlY2tfdGVtcGxhdGUodGhpcy5vLnRlbXBsYXRlcy5yaWdodEFycm93KSkge1xyXG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcubmV4dCcpLmh0bWwodGhpcy5vLnRlbXBsYXRlcy5yaWdodEFycm93KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9idWlsZEV2ZW50cygpO1xyXG5cdFx0dGhpcy5fYXR0YWNoRXZlbnRzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNJbmxpbmUpe1xyXG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1pbmxpbmUnKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLWRyb3Bkb3duIGRyb3Bkb3duLW1lbnUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vLnJ0bCl7XHJcblx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLXJ0bCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLm8uY2FsZW5kYXJXZWVrcykge1xyXG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcuZGF0ZXBpY2tlci1kYXlzIC5kYXRlcGlja2VyLXN3aXRjaCwgdGhlYWQgLmRhdGVwaWNrZXItdGl0bGUsIHRmb290IC50b2RheSwgdGZvb3QgLmNsZWFyJylcclxuXHRcdFx0XHQuYXR0cignY29sc3BhbicsIGZ1bmN0aW9uKGksIHZhbCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gTnVtYmVyKHZhbCkgKyAxO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7XHJcblx0XHRcdHN0YXJ0RGF0ZTogdGhpcy5fby5zdGFydERhdGUsXHJcblx0XHRcdGVuZERhdGU6IHRoaXMuX28uZW5kRGF0ZSxcclxuXHRcdFx0ZGF5c09mV2Vla0Rpc2FibGVkOiB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkLFxyXG5cdFx0XHRkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IHRoaXMuby5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQsXHJcblx0XHRcdGRhdGVzRGlzYWJsZWQ6IHRoaXMuby5kYXRlc0Rpc2FibGVkXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLl9hbGxvd191cGRhdGUgPSBmYWxzZTtcclxuXHRcdHRoaXMuc2V0Vmlld01vZGUodGhpcy5vLnN0YXJ0Vmlldyk7XHJcblx0XHR0aGlzLl9hbGxvd191cGRhdGUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuZmlsbERvdygpO1xyXG5cdFx0dGhpcy5maWxsTW9udGhzKCk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5pc0lubGluZSl7XHJcblx0XHRcdHRoaXMuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVwaWNrZXIucHJvdG90eXBlID0ge1xyXG5cdFx0Y29uc3RydWN0b3I6IERhdGVwaWNrZXIsXHJcblxyXG5cdFx0X3Jlc29sdmVWaWV3TmFtZTogZnVuY3Rpb24odmlldyl7XHJcblx0XHRcdCQuZWFjaChEUEdsb2JhbC52aWV3TW9kZXMsIGZ1bmN0aW9uKGksIHZpZXdNb2RlKXtcclxuXHRcdFx0XHRpZiAodmlldyA9PT0gaSB8fCAkLmluQXJyYXkodmlldywgdmlld01vZGUubmFtZXMpICE9PSAtMSl7XHJcblx0XHRcdFx0XHR2aWV3ID0gaTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHZpZXc7XHJcblx0XHR9LFxyXG5cclxuXHRcdF9yZXNvbHZlRGF5c09mV2VlazogZnVuY3Rpb24oZGF5c09mV2Vlayl7XHJcblx0XHRcdGlmICghJC5pc0FycmF5KGRheXNPZldlZWspKVxyXG5cdFx0XHRcdGRheXNPZldlZWsgPSBkYXlzT2ZXZWVrLnNwbGl0KC9bLFxcc10qLyk7XHJcblx0XHRcdHJldHVybiAkLm1hcChkYXlzT2ZXZWVrLCBOdW1iZXIpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRfY2hlY2tfdGVtcGxhdGU6IGZ1bmN0aW9uKHRtcCl7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Ly8gSWYgZW1wdHlcclxuXHRcdFx0XHRpZiAodG1wID09PSB1bmRlZmluZWQgfHwgdG1wID09PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIElmIG5vIGh0bWwsIGV2ZXJ5dGhpbmcgb2tcclxuXHRcdFx0XHRpZiAoKHRtcC5tYXRjaCgvWzw+XS9nKSB8fCBbXSkubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBDaGVja2luZyBpZiBodG1sIGlzIGZpbmVcclxuXHRcdFx0XHR2YXIgakRvbSA9ICQodG1wKTtcclxuXHRcdFx0XHRyZXR1cm4gakRvbS5sZW5ndGggPiAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChleCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRfcHJvY2Vzc19vcHRpb25zOiBmdW5jdGlvbihvcHRzKXtcclxuXHRcdFx0Ly8gU3RvcmUgcmF3IG9wdGlvbnMgZm9yIHJlZmVyZW5jZVxyXG5cdFx0XHR0aGlzLl9vID0gJC5leHRlbmQoe30sIHRoaXMuX28sIG9wdHMpO1xyXG5cdFx0XHQvLyBQcm9jZXNzZWQgb3B0aW9uc1xyXG5cdFx0XHR2YXIgbyA9IHRoaXMubyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vKTtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIFwiZGUtREVcIiBzdHlsZSBkYXRlIGlzIGF2YWlsYWJsZSwgaWYgbm90IGxhbmd1YWdlIHNob3VsZFxyXG5cdFx0XHQvLyBmYWxsYmFjayB0byAyIGxldHRlciBjb2RlIGVnIFwiZGVcIlxyXG5cdFx0XHR2YXIgbGFuZyA9IG8ubGFuZ3VhZ2U7XHJcblx0XHRcdGlmICghZGF0ZXNbbGFuZ10pe1xyXG5cdFx0XHRcdGxhbmcgPSBsYW5nLnNwbGl0KCctJylbMF07XHJcblx0XHRcdFx0aWYgKCFkYXRlc1tsYW5nXSlcclxuXHRcdFx0XHRcdGxhbmcgPSBkZWZhdWx0cy5sYW5ndWFnZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvLmxhbmd1YWdlID0gbGFuZztcclxuXHJcblx0XHRcdC8vIFJldHJpZXZlIHZpZXcgaW5kZXggZnJvbSBhbnkgYWxpYXNlc1xyXG5cdFx0XHRvLnN0YXJ0VmlldyA9IHRoaXMuX3Jlc29sdmVWaWV3TmFtZShvLnN0YXJ0Vmlldyk7XHJcblx0XHRcdG8ubWluVmlld01vZGUgPSB0aGlzLl9yZXNvbHZlVmlld05hbWUoby5taW5WaWV3TW9kZSk7XHJcblx0XHRcdG8ubWF4Vmlld01vZGUgPSB0aGlzLl9yZXNvbHZlVmlld05hbWUoby5tYXhWaWV3TW9kZSk7XHJcblxyXG5cdFx0XHQvLyBDaGVjayB2aWV3IGlzIGJldHdlZW4gbWluIGFuZCBtYXhcclxuXHRcdFx0by5zdGFydFZpZXcgPSBNYXRoLm1heCh0aGlzLm8ubWluVmlld01vZGUsIE1hdGgubWluKHRoaXMuby5tYXhWaWV3TW9kZSwgby5zdGFydFZpZXcpKTtcclxuXHJcblx0XHRcdC8vIHRydWUsIGZhbHNlLCBvciBOdW1iZXIgPiAwXHJcblx0XHRcdGlmIChvLm11bHRpZGF0ZSAhPT0gdHJ1ZSl7XHJcblx0XHRcdFx0by5tdWx0aWRhdGUgPSBOdW1iZXIoby5tdWx0aWRhdGUpIHx8IGZhbHNlO1xyXG5cdFx0XHRcdGlmIChvLm11bHRpZGF0ZSAhPT0gZmFsc2UpXHJcblx0XHRcdFx0XHRvLm11bHRpZGF0ZSA9IE1hdGgubWF4KDAsIG8ubXVsdGlkYXRlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvLm11bHRpZGF0ZVNlcGFyYXRvciA9IFN0cmluZyhvLm11bHRpZGF0ZVNlcGFyYXRvcik7XHJcblxyXG5cdFx0XHRvLndlZWtTdGFydCAlPSA3O1xyXG5cdFx0XHRvLndlZWtFbmQgPSAoby53ZWVrU3RhcnQgKyA2KSAlIDc7XHJcblxyXG5cdFx0XHR2YXIgZm9ybWF0ID0gRFBHbG9iYWwucGFyc2VGb3JtYXQoby5mb3JtYXQpO1xyXG5cdFx0XHRpZiAoby5zdGFydERhdGUgIT09IC1JbmZpbml0eSl7XHJcblx0XHRcdFx0aWYgKCEhby5zdGFydERhdGUpe1xyXG5cdFx0XHRcdFx0aWYgKG8uc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZSlcclxuXHRcdFx0XHRcdFx0by5zdGFydERhdGUgPSB0aGlzLl9sb2NhbF90b191dGModGhpcy5femVyb190aW1lKG8uc3RhcnREYXRlKSk7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdG8uc3RhcnREYXRlID0gRFBHbG9iYWwucGFyc2VEYXRlKG8uc3RhcnREYXRlLCBmb3JtYXQsIG8ubGFuZ3VhZ2UsIG8uYXNzdW1lTmVhcmJ5WWVhcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0by5zdGFydERhdGUgPSAtSW5maW5pdHk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChvLmVuZERhdGUgIT09IEluZmluaXR5KXtcclxuXHRcdFx0XHRpZiAoISFvLmVuZERhdGUpe1xyXG5cdFx0XHRcdFx0aWYgKG8uZW5kRGF0ZSBpbnN0YW5jZW9mIERhdGUpXHJcblx0XHRcdFx0XHRcdG8uZW5kRGF0ZSA9IHRoaXMuX2xvY2FsX3RvX3V0Yyh0aGlzLl96ZXJvX3RpbWUoby5lbmREYXRlKSk7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdG8uZW5kRGF0ZSA9IERQR2xvYmFsLnBhcnNlRGF0ZShvLmVuZERhdGUsIGZvcm1hdCwgby5sYW5ndWFnZSwgby5hc3N1bWVOZWFyYnlZZWFyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRvLmVuZERhdGUgPSBJbmZpbml0eTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG8uZGF5c09mV2Vla0Rpc2FibGVkID0gdGhpcy5fcmVzb2x2ZURheXNPZldlZWsoby5kYXlzT2ZXZWVrRGlzYWJsZWR8fFtdKTtcclxuXHRcdFx0by5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQgPSB0aGlzLl9yZXNvbHZlRGF5c09mV2VlayhvLmRheXNPZldlZWtIaWdobGlnaHRlZHx8W10pO1xyXG5cclxuXHRcdFx0by5kYXRlc0Rpc2FibGVkID0gby5kYXRlc0Rpc2FibGVkfHxbXTtcclxuXHRcdFx0aWYgKCEkLmlzQXJyYXkoby5kYXRlc0Rpc2FibGVkKSkge1xyXG5cdFx0XHRcdG8uZGF0ZXNEaXNhYmxlZCA9IG8uZGF0ZXNEaXNhYmxlZC5zcGxpdCgnLCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdG8uZGF0ZXNEaXNhYmxlZCA9ICQubWFwKG8uZGF0ZXNEaXNhYmxlZCwgZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0cmV0dXJuIERQR2xvYmFsLnBhcnNlRGF0ZShkLCBmb3JtYXQsIG8ubGFuZ3VhZ2UsIG8uYXNzdW1lTmVhcmJ5WWVhcik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dmFyIHBsYyA9IFN0cmluZyhvLm9yaWVudGF0aW9uKS50b0xvd2VyQ2FzZSgpLnNwbGl0KC9cXHMrL2cpLFxyXG5cdFx0XHRcdF9wbGMgPSBvLm9yaWVudGF0aW9uLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdHBsYyA9ICQuZ3JlcChwbGMsIGZ1bmN0aW9uKHdvcmQpe1xyXG5cdFx0XHRcdHJldHVybiAvXmF1dG98bGVmdHxyaWdodHx0b3B8Ym90dG9tJC8udGVzdCh3b3JkKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdG8ub3JpZW50YXRpb24gPSB7eDogJ2F1dG8nLCB5OiAnYXV0byd9O1xyXG5cdFx0XHRpZiAoIV9wbGMgfHwgX3BsYyA9PT0gJ2F1dG8nKVxyXG5cdFx0XHRcdDsgLy8gbm8gYWN0aW9uXHJcblx0XHRcdGVsc2UgaWYgKHBsYy5sZW5ndGggPT09IDEpe1xyXG5cdFx0XHRcdHN3aXRjaCAocGxjWzBdKXtcclxuXHRcdFx0XHRcdGNhc2UgJ3RvcCc6XHJcblx0XHRcdFx0XHRjYXNlICdib3R0b20nOlxyXG5cdFx0XHRcdFx0XHRvLm9yaWVudGF0aW9uLnkgPSBwbGNbMF07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XHJcblx0XHRcdFx0XHRjYXNlICdyaWdodCc6XHJcblx0XHRcdFx0XHRcdG8ub3JpZW50YXRpb24ueCA9IHBsY1swXTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdF9wbGMgPSAkLmdyZXAocGxjLCBmdW5jdGlvbih3b3JkKXtcclxuXHRcdFx0XHRcdHJldHVybiAvXmxlZnR8cmlnaHQkLy50ZXN0KHdvcmQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG8ub3JpZW50YXRpb24ueCA9IF9wbGNbMF0gfHwgJ2F1dG8nO1xyXG5cclxuXHRcdFx0XHRfcGxjID0gJC5ncmVwKHBsYywgZnVuY3Rpb24od29yZCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gL150b3B8Ym90dG9tJC8udGVzdCh3b3JkKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRvLm9yaWVudGF0aW9uLnkgPSBfcGxjWzBdIHx8ICdhdXRvJztcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoby5kZWZhdWx0Vmlld0RhdGUgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBvLmRlZmF1bHRWaWV3RGF0ZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRvLmRlZmF1bHRWaWV3RGF0ZSA9IERQR2xvYmFsLnBhcnNlRGF0ZShvLmRlZmF1bHRWaWV3RGF0ZSwgZm9ybWF0LCBvLmxhbmd1YWdlLCBvLmFzc3VtZU5lYXJieVllYXIpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG8uZGVmYXVsdFZpZXdEYXRlKSB7XHJcblx0XHRcdFx0dmFyIHllYXIgPSBvLmRlZmF1bHRWaWV3RGF0ZS55ZWFyIHx8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuXHRcdFx0XHR2YXIgbW9udGggPSBvLmRlZmF1bHRWaWV3RGF0ZS5tb250aCB8fCAwO1xyXG5cdFx0XHRcdHZhciBkYXkgPSBvLmRlZmF1bHRWaWV3RGF0ZS5kYXkgfHwgMTtcclxuXHRcdFx0XHRvLmRlZmF1bHRWaWV3RGF0ZSA9IFVUQ0RhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0by5kZWZhdWx0Vmlld0RhdGUgPSBVVENUb2RheSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0X2V2ZW50czogW10sXHJcblx0XHRfc2Vjb25kYXJ5RXZlbnRzOiBbXSxcclxuXHRcdF9hcHBseUV2ZW50czogZnVuY3Rpb24oZXZzKXtcclxuXHRcdFx0Zm9yICh2YXIgaT0wLCBlbCwgY2gsIGV2OyBpIDwgZXZzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRlbCA9IGV2c1tpXVswXTtcclxuXHRcdFx0XHRpZiAoZXZzW2ldLmxlbmd0aCA9PT0gMil7XHJcblx0XHRcdFx0XHRjaCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdGV2ID0gZXZzW2ldWzFdO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZzW2ldLmxlbmd0aCA9PT0gMyl7XHJcblx0XHRcdFx0XHRjaCA9IGV2c1tpXVsxXTtcclxuXHRcdFx0XHRcdGV2ID0gZXZzW2ldWzJdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbC5vbihldiwgY2gpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0X3VuYXBwbHlFdmVudHM6IGZ1bmN0aW9uKGV2cyl7XHJcblx0XHRcdGZvciAodmFyIGk9MCwgZWwsIGV2LCBjaDsgaSA8IGV2cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0ZWwgPSBldnNbaV1bMF07XHJcblx0XHRcdFx0aWYgKGV2c1tpXS5sZW5ndGggPT09IDIpe1xyXG5cdFx0XHRcdFx0Y2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRldiA9IGV2c1tpXVsxXTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGV2c1tpXS5sZW5ndGggPT09IDMpe1xyXG5cdFx0XHRcdFx0Y2ggPSBldnNbaV1bMV07XHJcblx0XHRcdFx0XHRldiA9IGV2c1tpXVsyXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWwub2ZmKGV2LCBjaCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRfYnVpbGRFdmVudHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBldmVudHMgPSB7XHJcbiAgICAgICAgICAgICAgICBrZXl1cDogJC5wcm94eShmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KGUua2V5Q29kZSwgWzI3LCAzNywgMzksIDM4LCA0MCwgMzIsIDEzLCA5XSkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyksXHJcbiAgICAgICAgICAgICAgICBrZXlkb3duOiAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcyksXHJcbiAgICAgICAgICAgICAgICBwYXN0ZTogJC5wcm94eSh0aGlzLnBhc3RlLCB0aGlzKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuby5zaG93T25Gb2N1cyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzLmZvY3VzID0gJC5wcm94eSh0aGlzLnNob3csIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0lucHV0KSB7IC8vIHNpbmdsZSBpbnB1dFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLmVsZW1lbnQsIGV2ZW50c11cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29tcG9uZW50OiBpbnB1dCArIGJ1dHRvblxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvbXBvbmVudCAmJiB0aGlzLmlucHV0RmllbGQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGNvbXBvbmVudHMgdGhhdCBhcmUgbm90IHJlYWRvbmx5LCBhbGxvdyBrZXlib2FyZCBuYXZcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5pbnB1dEZpZWxkLCBldmVudHNdLFxyXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLmNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogJC5wcm94eSh0aGlzLnNob3csIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5fZXZlbnRzID0gW1xyXG5cdFx0XHRcdFx0W3RoaXMuZWxlbWVudCwge1xyXG5cdFx0XHRcdFx0XHRjbGljazogJC5wcm94eSh0aGlzLnNob3csIHRoaXMpLFxyXG5cdFx0XHRcdFx0XHRrZXlkb3duOiAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcylcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLl9ldmVudHMucHVzaChcclxuXHRcdFx0XHQvLyBDb21wb25lbnQ6IGxpc3RlbiBmb3IgYmx1ciBvbiBlbGVtZW50IGRlc2NlbmRhbnRzXHJcblx0XHRcdFx0W3RoaXMuZWxlbWVudCwgJyonLCB7XHJcblx0XHRcdFx0XHRibHVyOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9mb2N1c2VkX2Zyb20gPSBlLnRhcmdldDtcclxuXHRcdFx0XHRcdH0sIHRoaXMpXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0Ly8gSW5wdXQ6IGxpc3RlbiBmb3IgYmx1ciBvbiBlbGVtZW50XHJcblx0XHRcdFx0W3RoaXMuZWxlbWVudCwge1xyXG5cdFx0XHRcdFx0Ymx1cjogJC5wcm94eShmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5fZm9jdXNlZF9mcm9tID0gZS50YXJnZXQ7XHJcblx0XHRcdFx0XHR9LCB0aGlzKVxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLmltbWVkaWF0ZVVwZGF0ZXMpIHtcclxuXHRcdFx0XHQvLyBUcmlnZ2VyIGlucHV0IHVwZGF0ZXMgaW1tZWRpYXRlbHkgb24gY2hhbmdlZCB5ZWFyL21vbnRoXHJcblx0XHRcdFx0dGhpcy5fZXZlbnRzLnB1c2goW3RoaXMuZWxlbWVudCwge1xyXG5cdFx0XHRcdFx0J2NoYW5nZVllYXIgY2hhbmdlTW9udGgnOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZShlLmRhdGUpO1xyXG5cdFx0XHRcdFx0fSwgdGhpcylcclxuXHRcdFx0XHR9XSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3NlY29uZGFyeUV2ZW50cyA9IFtcclxuXHRcdFx0XHRbdGhpcy5waWNrZXIsIHtcclxuXHRcdFx0XHRcdGNsaWNrOiAkLnByb3h5KHRoaXMuY2xpY2ssIHRoaXMpXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0W3RoaXMucGlja2VyLCAnLnByZXYsIC5uZXh0Jywge1xyXG5cdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5uYXZBcnJvd3NDbGljaywgdGhpcylcclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0XHRbdGhpcy5waWNrZXIsICcuZGF5Om5vdCguZGlzYWJsZWQpJywge1xyXG5cdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5kYXlDZWxsQ2xpY2ssIHRoaXMpXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0WyQod2luZG93KSwge1xyXG5cdFx0XHRcdFx0cmVzaXplOiAkLnByb3h5KHRoaXMucGxhY2UsIHRoaXMpXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0WyQoZG9jdW1lbnQpLCB7XHJcblx0XHRcdFx0XHQnbW91c2Vkb3duIHRvdWNoc3RhcnQnOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0XHQvLyBDbGlja2VkIG91dHNpZGUgdGhlIGRhdGVwaWNrZXIsIGhpZGUgaXRcclxuXHRcdFx0XHRcdFx0aWYgKCEoXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmlzKGUudGFyZ2V0KSB8fFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5maW5kKGUudGFyZ2V0KS5sZW5ndGggfHxcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5pcyhlLnRhcmdldCkgfHxcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5maW5kKGUudGFyZ2V0KS5sZW5ndGggfHxcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlzSW5saW5lXHJcblx0XHRcdFx0XHRcdCkpe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LCB0aGlzKVxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdF07XHJcblx0XHR9LFxyXG5cdFx0X2F0dGFjaEV2ZW50czogZnVuY3Rpb24oKXtcclxuXHRcdFx0dGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcblx0XHRcdHRoaXMuX2FwcGx5RXZlbnRzKHRoaXMuX2V2ZW50cyk7XHJcblx0XHR9LFxyXG5cdFx0X2RldGFjaEV2ZW50czogZnVuY3Rpb24oKXtcclxuXHRcdFx0dGhpcy5fdW5hcHBseUV2ZW50cyh0aGlzLl9ldmVudHMpO1xyXG5cdFx0fSxcclxuXHRcdF9hdHRhY2hTZWNvbmRhcnlFdmVudHM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuX2RldGFjaFNlY29uZGFyeUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLl9hcHBseUV2ZW50cyh0aGlzLl9zZWNvbmRhcnlFdmVudHMpO1xyXG5cdFx0fSxcclxuXHRcdF9kZXRhY2hTZWNvbmRhcnlFdmVudHM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuX3VuYXBwbHlFdmVudHModGhpcy5fc2Vjb25kYXJ5RXZlbnRzKTtcclxuXHRcdH0sXHJcblx0XHRfdHJpZ2dlcjogZnVuY3Rpb24oZXZlbnQsIGFsdGRhdGUpe1xyXG5cdFx0XHR2YXIgZGF0ZSA9IGFsdGRhdGUgfHwgdGhpcy5kYXRlcy5nZXQoLTEpLFxyXG5cdFx0XHRcdGxvY2FsX2RhdGUgPSB0aGlzLl91dGNfdG9fbG9jYWwoZGF0ZSk7XHJcblxyXG5cdFx0XHR0aGlzLmVsZW1lbnQudHJpZ2dlcih7XHJcblx0XHRcdFx0dHlwZTogZXZlbnQsXHJcblx0XHRcdFx0ZGF0ZTogbG9jYWxfZGF0ZSxcclxuXHRcdFx0XHR2aWV3TW9kZTogdGhpcy52aWV3TW9kZSxcclxuXHRcdFx0XHRkYXRlczogJC5tYXAodGhpcy5kYXRlcywgdGhpcy5fdXRjX3RvX2xvY2FsKSxcclxuXHRcdFx0XHRmb3JtYXQ6ICQucHJveHkoZnVuY3Rpb24oaXgsIGZvcm1hdCl7XHJcblx0XHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0XHRcdGl4ID0gdGhpcy5kYXRlcy5sZW5ndGggLSAxO1xyXG5cdFx0XHRcdFx0XHRmb3JtYXQgPSB0aGlzLm8uZm9ybWF0O1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgaXggPT09ICdzdHJpbmcnKXtcclxuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gaXg7XHJcblx0XHRcdFx0XHRcdGl4ID0gdGhpcy5kYXRlcy5sZW5ndGggLSAxO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9ybWF0ID0gZm9ybWF0IHx8IHRoaXMuby5mb3JtYXQ7XHJcblx0XHRcdFx0XHR2YXIgZGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KGl4KTtcclxuXHRcdFx0XHRcdHJldHVybiBEUEdsb2JhbC5mb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgdGhpcy5vLmxhbmd1YWdlKTtcclxuXHRcdFx0XHR9LCB0aGlzKVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2hvdzogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYgKHRoaXMuaW5wdXRGaWVsZC5wcm9wKCdkaXNhYmxlZCcpIHx8ICh0aGlzLmlucHV0RmllbGQucHJvcCgncmVhZG9ubHknKSAmJiB0aGlzLm8uZW5hYmxlT25SZWFkb25seSA9PT0gZmFsc2UpKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0aWYgKCF0aGlzLmlzSW5saW5lKVxyXG5cdFx0XHRcdHRoaXMucGlja2VyLmFwcGVuZFRvKHRoaXMuby5jb250YWluZXIpO1xyXG5cdFx0XHR0aGlzLnBsYWNlKCk7XHJcblx0XHRcdHRoaXMucGlja2VyLnNob3coKTtcclxuXHRcdFx0dGhpcy5fYXR0YWNoU2Vjb25kYXJ5RXZlbnRzKCk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ3Nob3cnKTtcclxuXHRcdFx0aWYgKCh3aW5kb3cubmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgfHwgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQpICYmIHRoaXMuby5kaXNhYmxlVG91Y2hLZXlib2FyZCkge1xyXG5cdFx0XHRcdCQodGhpcy5lbGVtZW50KS5ibHVyKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdGhpZGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmICh0aGlzLmlzSW5saW5lIHx8ICF0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0dGhpcy5mb2N1c0RhdGUgPSBudWxsO1xyXG5cdFx0XHR0aGlzLnBpY2tlci5oaWRlKCkuZGV0YWNoKCk7XHJcblx0XHRcdHRoaXMuX2RldGFjaFNlY29uZGFyeUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLnNldFZpZXdNb2RlKHRoaXMuby5zdGFydFZpZXcpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuby5mb3JjZVBhcnNlICYmIHRoaXMuaW5wdXRGaWVsZC52YWwoKSlcclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlKCk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2hpZGUnKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuXHRcdFx0dGhpcy5fZGV0YWNoU2Vjb25kYXJ5RXZlbnRzKCk7XHJcblx0XHRcdHRoaXMucGlja2VyLnJlbW92ZSgpO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGEoKS5kYXRlcGlja2VyO1xyXG5cdFx0XHRpZiAoIXRoaXMuaXNJbnB1dCl7XHJcblx0XHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5kYXRhKCkuZGF0ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0cGFzdGU6IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR2YXIgZGF0ZVN0cmluZztcclxuXHRcdFx0aWYgKGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhICYmIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLnR5cGVzXHJcblx0XHRcdFx0JiYgJC5pbkFycmF5KCd0ZXh0L3BsYWluJywgZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEudHlwZXMpICE9PSAtMSkge1xyXG5cdFx0XHRcdGRhdGVTdHJpbmcgPSBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAod2luZG93LmNsaXBib2FyZERhdGEpIHtcclxuXHRcdFx0XHRkYXRlU3RyaW5nID0gd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNldERhdGUoZGF0ZVN0cmluZyk7XHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0X3V0Y190b19sb2NhbDogZnVuY3Rpb24odXRjKXtcclxuXHRcdFx0aWYgKCF1dGMpIHtcclxuXHRcdFx0XHRyZXR1cm4gdXRjO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbG9jYWwgPSBuZXcgRGF0ZSh1dGMuZ2V0VGltZSgpICsgKHV0Yy5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApKTtcclxuXHJcblx0XHRcdGlmIChsb2NhbC5nZXRUaW1lem9uZU9mZnNldCgpICE9PSB1dGMuZ2V0VGltZXpvbmVPZmZzZXQoKSkge1xyXG5cdFx0XHRcdGxvY2FsID0gbmV3IERhdGUodXRjLmdldFRpbWUoKSArIChsb2NhbC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGxvY2FsO1xyXG5cdFx0fSxcclxuXHRcdF9sb2NhbF90b191dGM6IGZ1bmN0aW9uKGxvY2FsKXtcclxuXHRcdFx0cmV0dXJuIGxvY2FsICYmIG5ldyBEYXRlKGxvY2FsLmdldFRpbWUoKSAtIChsb2NhbC5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKSk7XHJcblx0XHR9LFxyXG5cdFx0X3plcm9fdGltZTogZnVuY3Rpb24obG9jYWwpe1xyXG5cdFx0XHRyZXR1cm4gbG9jYWwgJiYgbmV3IERhdGUobG9jYWwuZ2V0RnVsbFllYXIoKSwgbG9jYWwuZ2V0TW9udGgoKSwgbG9jYWwuZ2V0RGF0ZSgpKTtcclxuXHRcdH0sXHJcblx0XHRfemVyb191dGNfdGltZTogZnVuY3Rpb24odXRjKXtcclxuXHRcdFx0cmV0dXJuIHV0YyAmJiBVVENEYXRlKHV0Yy5nZXRVVENGdWxsWWVhcigpLCB1dGMuZ2V0VVRDTW9udGgoKSwgdXRjLmdldFVUQ0RhdGUoKSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldERhdGVzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gJC5tYXAodGhpcy5kYXRlcywgdGhpcy5fdXRjX3RvX2xvY2FsKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0VVRDRGF0ZXM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiAkLm1hcCh0aGlzLmRhdGVzLCBmdW5jdGlvbihkKXtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IERhdGUoZCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXREYXRlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fdXRjX3RvX2xvY2FsKHRoaXMuZ2V0VVRDRGF0ZSgpKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0VVRDRGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHNlbGVjdGVkX2RhdGUgPSB0aGlzLmRhdGVzLmdldCgtMSk7XHJcblx0XHRcdGlmIChzZWxlY3RlZF9kYXRlICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IERhdGUoc2VsZWN0ZWRfZGF0ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Y2xlYXJEYXRlczogZnVuY3Rpb24oKXtcclxuXHRcdFx0dGhpcy5pbnB1dEZpZWxkLnZhbCgnJyk7XHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZURhdGUnKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm8uYXV0b2Nsb3NlKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0RGF0ZXM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBhcmdzID0gJC5pc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XHJcblx0XHRcdHRoaXMudXBkYXRlLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XHJcblx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldFVUQ0RhdGVzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgYXJncyA9ICQuaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xyXG5cdFx0XHR0aGlzLnNldERhdGVzLmFwcGx5KHRoaXMsICQubWFwKGFyZ3MsIHRoaXMuX3V0Y190b19sb2NhbCkpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0RGF0ZTogYWxpYXMoJ3NldERhdGVzJyksXHJcblx0XHRzZXRVVENEYXRlOiBhbGlhcygnc2V0VVRDRGF0ZXMnKSxcclxuXHRcdHJlbW92ZTogYWxpYXMoJ2Rlc3Ryb3knLCAnTWV0aG9kIGByZW1vdmVgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDIuMC4gVXNlIGBkZXN0cm95YCBpbnN0ZWFkJyksXHJcblxyXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBmb3JtYXR0ZWQgPSB0aGlzLmdldEZvcm1hdHRlZERhdGUoKTtcclxuXHRcdFx0dGhpcy5pbnB1dEZpZWxkLnZhbChmb3JtYXR0ZWQpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0Rm9ybWF0dGVkRGF0ZTogZnVuY3Rpb24oZm9ybWF0KXtcclxuXHRcdFx0aWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdGZvcm1hdCA9IHRoaXMuby5mb3JtYXQ7XHJcblxyXG5cdFx0XHR2YXIgbGFuZyA9IHRoaXMuby5sYW5ndWFnZTtcclxuXHRcdFx0cmV0dXJuICQubWFwKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGQpe1xyXG5cdFx0XHRcdHJldHVybiBEUEdsb2JhbC5mb3JtYXREYXRlKGQsIGZvcm1hdCwgbGFuZyk7XHJcblx0XHRcdH0pLmpvaW4odGhpcy5vLm11bHRpZGF0ZVNlcGFyYXRvcik7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldFN0YXJ0RGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuby5zdGFydERhdGU7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldFN0YXJ0RGF0ZTogZnVuY3Rpb24oc3RhcnREYXRlKXtcclxuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtzdGFydERhdGU6IHN0YXJ0RGF0ZX0pO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZU5hdkFycm93cygpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0RW5kRGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuby5lbmREYXRlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXRFbmREYXRlOiBmdW5jdGlvbihlbmREYXRlKXtcclxuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtlbmREYXRlOiBlbmREYXRlfSk7XHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdHRoaXMudXBkYXRlTmF2QXJyb3dzKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXREYXlzT2ZXZWVrRGlzYWJsZWQ6IGZ1bmN0aW9uKGRheXNPZldlZWtEaXNhYmxlZCl7XHJcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZGF5c09mV2Vla0Rpc2FibGVkOiBkYXlzT2ZXZWVrRGlzYWJsZWR9KTtcclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldERheXNPZldlZWtIaWdobGlnaHRlZDogZnVuY3Rpb24oZGF5c09mV2Vla0hpZ2hsaWdodGVkKXtcclxuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IGRheXNPZldlZWtIaWdobGlnaHRlZH0pO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0RGF0ZXNEaXNhYmxlZDogZnVuY3Rpb24oZGF0ZXNEaXNhYmxlZCl7XHJcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZGF0ZXNEaXNhYmxlZDogZGF0ZXNEaXNhYmxlZH0pO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0cGxhY2U6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmICh0aGlzLmlzSW5saW5lKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHR2YXIgY2FsZW5kYXJXaWR0aCA9IHRoaXMucGlja2VyLm91dGVyV2lkdGgoKSxcclxuXHRcdFx0XHRjYWxlbmRhckhlaWdodCA9IHRoaXMucGlja2VyLm91dGVySGVpZ2h0KCksXHJcblx0XHRcdFx0dmlzdWFsUGFkZGluZyA9IDEwLFxyXG5cdFx0XHRcdGNvbnRhaW5lciA9ICQodGhpcy5vLmNvbnRhaW5lciksXHJcblx0XHRcdFx0d2luZG93V2lkdGggPSBjb250YWluZXIud2lkdGgoKSxcclxuXHRcdFx0XHRzY3JvbGxUb3AgPSB0aGlzLm8uY29udGFpbmVyID09PSAnYm9keScgPyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA6IGNvbnRhaW5lci5zY3JvbGxUb3AoKSxcclxuXHRcdFx0XHRhcHBlbmRPZmZzZXQgPSBjb250YWluZXIub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHR2YXIgcGFyZW50c1ppbmRleCA9IFswXTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudHMoKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIGl0ZW1aSW5kZXggPSAkKHRoaXMpLmNzcygnei1pbmRleCcpO1xyXG5cdFx0XHRcdGlmIChpdGVtWkluZGV4ICE9PSAnYXV0bycgJiYgTnVtYmVyKGl0ZW1aSW5kZXgpICE9PSAwKSBwYXJlbnRzWmluZGV4LnB1c2goTnVtYmVyKGl0ZW1aSW5kZXgpKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciB6SW5kZXggPSBNYXRoLm1heC5hcHBseShNYXRoLCBwYXJlbnRzWmluZGV4KSArIHRoaXMuby56SW5kZXhPZmZzZXQ7XHJcblx0XHRcdHZhciBvZmZzZXQgPSB0aGlzLmNvbXBvbmVudCA/IHRoaXMuY29tcG9uZW50LnBhcmVudCgpLm9mZnNldCgpIDogdGhpcy5lbGVtZW50Lm9mZnNldCgpO1xyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gdGhpcy5jb21wb25lbnQgPyB0aGlzLmNvbXBvbmVudC5vdXRlckhlaWdodCh0cnVlKSA6IHRoaXMuZWxlbWVudC5vdXRlckhlaWdodChmYWxzZSk7XHJcblx0XHRcdHZhciB3aWR0aCA9IHRoaXMuY29tcG9uZW50ID8gdGhpcy5jb21wb25lbnQub3V0ZXJXaWR0aCh0cnVlKSA6IHRoaXMuZWxlbWVudC5vdXRlcldpZHRoKGZhbHNlKTtcclxuXHRcdFx0dmFyIGxlZnQgPSBvZmZzZXQubGVmdCAtIGFwcGVuZE9mZnNldC5sZWZ0O1xyXG5cdFx0XHR2YXIgdG9wID0gb2Zmc2V0LnRvcCAtIGFwcGVuZE9mZnNldC50b3A7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLmNvbnRhaW5lciAhPT0gJ2JvZHknKSB7XHJcblx0XHRcdFx0dG9wICs9IHNjcm9sbFRvcDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5waWNrZXIucmVtb3ZlQ2xhc3MoXHJcblx0XHRcdFx0J2RhdGVwaWNrZXItb3JpZW50LXRvcCBkYXRlcGlja2VyLW9yaWVudC1ib3R0b20gJytcclxuXHRcdFx0XHQnZGF0ZXBpY2tlci1vcmllbnQtcmlnaHQgZGF0ZXBpY2tlci1vcmllbnQtbGVmdCdcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm8ub3JpZW50YXRpb24ueCAhPT0gJ2F1dG8nKXtcclxuXHRcdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtJyArIHRoaXMuby5vcmllbnRhdGlvbi54KTtcclxuXHRcdFx0XHRpZiAodGhpcy5vLm9yaWVudGF0aW9uLnggPT09ICdyaWdodCcpXHJcblx0XHRcdFx0XHRsZWZ0IC09IGNhbGVuZGFyV2lkdGggLSB3aWR0aDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBhdXRvIHggb3JpZW50YXRpb24gaXMgYmVzdC1wbGFjZW1lbnQ6IGlmIGl0IGNyb3NzZXMgYSB3aW5kb3dcclxuXHRcdFx0Ly8gZWRnZSwgZnVkZ2UgaXQgc2lkZXdheXNcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0aWYgKG9mZnNldC5sZWZ0IDwgMCkge1xyXG5cdFx0XHRcdFx0Ly8gY29tcG9uZW50IGlzIG91dHNpZGUgdGhlIHdpbmRvdyBvbiB0aGUgbGVmdCBzaWRlLiBNb3ZlIGl0IGludG8gdmlzaWJsZSByYW5nZVxyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItb3JpZW50LWxlZnQnKTtcclxuXHRcdFx0XHRcdGxlZnQgLT0gb2Zmc2V0LmxlZnQgLSB2aXN1YWxQYWRkaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAobGVmdCArIGNhbGVuZGFyV2lkdGggPiB3aW5kb3dXaWR0aCkge1xyXG5cdFx0XHRcdFx0Ly8gdGhlIGNhbGVuZGFyIHBhc3NlcyB0aGUgd2lkb3cgcmlnaHQgZWRnZS4gQWxpZ24gaXQgdG8gY29tcG9uZW50IHJpZ2h0IHNpZGVcclxuXHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1yaWdodCcpO1xyXG5cdFx0XHRcdFx0bGVmdCArPSB3aWR0aCAtIGNhbGVuZGFyV2lkdGg7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLm8ucnRsKSB7XHJcblx0XHRcdFx0XHRcdC8vIERlZmF1bHQgdG8gcmlnaHRcclxuXHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItb3JpZW50LXJpZ2h0Jyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBEZWZhdWx0IHRvIGxlZnRcclxuXHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItb3JpZW50LWxlZnQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGF1dG8geSBvcmllbnRhdGlvbiBpcyBiZXN0LXNpdHVhdGlvbjogdG9wIG9yIGJvdHRvbSwgbm8gZnVkZ2luZyxcclxuXHRcdFx0Ly8gZGVjaXNpb24gYmFzZWQgb24gd2hpY2ggc2hvd3MgbW9yZSBvZiB0aGUgY2FsZW5kYXJcclxuXHRcdFx0dmFyIHlvcmllbnQgPSB0aGlzLm8ub3JpZW50YXRpb24ueSxcclxuXHRcdFx0XHR0b3Bfb3ZlcmZsb3c7XHJcblx0XHRcdGlmICh5b3JpZW50ID09PSAnYXV0bycpe1xyXG5cdFx0XHRcdHRvcF9vdmVyZmxvdyA9IC1zY3JvbGxUb3AgKyB0b3AgLSBjYWxlbmRhckhlaWdodDtcclxuXHRcdFx0XHR5b3JpZW50ID0gdG9wX292ZXJmbG93IDwgMCA/ICdib3R0b20nIDogJ3RvcCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC0nICsgeW9yaWVudCk7XHJcblx0XHRcdGlmICh5b3JpZW50ID09PSAndG9wJylcclxuXHRcdFx0XHR0b3AgLT0gY2FsZW5kYXJIZWlnaHQgKyBwYXJzZUludCh0aGlzLnBpY2tlci5jc3MoJ3BhZGRpbmctdG9wJykpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dG9wICs9IGhlaWdodDtcclxuXHJcblx0XHRcdGlmICh0aGlzLm8ucnRsKSB7XHJcblx0XHRcdFx0dmFyIHJpZ2h0ID0gd2luZG93V2lkdGggLSAobGVmdCArIHdpZHRoKTtcclxuXHRcdFx0XHR0aGlzLnBpY2tlci5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiB0b3AsXHJcblx0XHRcdFx0XHRyaWdodDogcmlnaHQsXHJcblx0XHRcdFx0XHR6SW5kZXg6IHpJbmRleFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucGlja2VyLmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6IHRvcCxcclxuXHRcdFx0XHRcdGxlZnQ6IGxlZnQsXHJcblx0XHRcdFx0XHR6SW5kZXg6IHpJbmRleFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRfYWxsb3dfdXBkYXRlOiB0cnVlLFxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZiAoIXRoaXMuX2FsbG93X3VwZGF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0XHRcdHZhciBvbGREYXRlcyA9IHRoaXMuZGF0ZXMuY29weSgpLFxyXG5cdFx0XHRcdGRhdGVzID0gW10sXHJcblx0XHRcdFx0ZnJvbUFyZ3MgPSBmYWxzZTtcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGgpe1xyXG5cdFx0XHRcdCQuZWFjaChhcmd1bWVudHMsICQucHJveHkoZnVuY3Rpb24oaSwgZGF0ZSl7XHJcblx0XHRcdFx0XHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXHJcblx0XHRcdFx0XHRcdGRhdGUgPSB0aGlzLl9sb2NhbF90b191dGMoZGF0ZSk7XHJcblx0XHRcdFx0XHRkYXRlcy5wdXNoKGRhdGUpO1xyXG5cdFx0XHRcdH0sIHRoaXMpKTtcclxuXHRcdFx0XHRmcm9tQXJncyA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGF0ZXMgPSB0aGlzLmlzSW5wdXRcclxuXHRcdFx0XHRcdFx0PyB0aGlzLmVsZW1lbnQudmFsKClcclxuXHRcdFx0XHRcdFx0OiB0aGlzLmVsZW1lbnQuZGF0YSgnZGF0ZScpIHx8IHRoaXMuaW5wdXRGaWVsZC52YWwoKTtcclxuXHRcdFx0XHRpZiAoZGF0ZXMgJiYgdGhpcy5vLm11bHRpZGF0ZSlcclxuXHRcdFx0XHRcdGRhdGVzID0gZGF0ZXMuc3BsaXQodGhpcy5vLm11bHRpZGF0ZVNlcGFyYXRvcik7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0ZGF0ZXMgPSBbZGF0ZXNdO1xyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YSgpLmRhdGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRhdGVzID0gJC5tYXAoZGF0ZXMsICQucHJveHkoZnVuY3Rpb24oZGF0ZSl7XHJcblx0XHRcdFx0cmV0dXJuIERQR2xvYmFsLnBhcnNlRGF0ZShkYXRlLCB0aGlzLm8uZm9ybWF0LCB0aGlzLm8ubGFuZ3VhZ2UsIHRoaXMuby5hc3N1bWVOZWFyYnlZZWFyKTtcclxuXHRcdFx0fSwgdGhpcykpO1xyXG5cdFx0XHRkYXRlcyA9ICQuZ3JlcChkYXRlcywgJC5wcm94eShmdW5jdGlvbihkYXRlKXtcclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0IXRoaXMuZGF0ZVdpdGhpblJhbmdlKGRhdGUpIHx8XHJcblx0XHRcdFx0XHQhZGF0ZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0sIHRoaXMpLCB0cnVlKTtcclxuXHRcdFx0dGhpcy5kYXRlcy5yZXBsYWNlKGRhdGVzKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm8udXBkYXRlVmlld0RhdGUpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5kYXRlcy5sZW5ndGgpXHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlcy5nZXQoLTEpKTtcclxuXHRcdFx0XHRlbHNlIGlmICh0aGlzLnZpZXdEYXRlIDwgdGhpcy5vLnN0YXJ0RGF0ZSlcclxuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLm8uc3RhcnREYXRlKTtcclxuXHRcdFx0XHRlbHNlIGlmICh0aGlzLnZpZXdEYXRlID4gdGhpcy5vLmVuZERhdGUpXHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5vLmVuZERhdGUpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUgPSB0aGlzLm8uZGVmYXVsdFZpZXdEYXRlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZnJvbUFyZ3Mpe1xyXG5cdFx0XHRcdC8vIHNldHRpbmcgZGF0ZSBieSBjbGlja2luZ1xyXG5cdFx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcclxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hhbmdlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAodGhpcy5kYXRlcy5sZW5ndGgpe1xyXG5cdFx0XHRcdC8vIHNldHRpbmcgZGF0ZSBieSB0eXBpbmdcclxuXHRcdFx0XHRpZiAoU3RyaW5nKG9sZERhdGVzKSAhPT0gU3RyaW5nKHRoaXMuZGF0ZXMpICYmIGZyb21BcmdzKSB7XHJcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XHJcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hhbmdlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghdGhpcy5kYXRlcy5sZW5ndGggJiYgb2xkRGF0ZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2xlYXJEYXRlJyk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNoYW5nZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdGZpbGxEb3c6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmICh0aGlzLm8uc2hvd1dlZWtEYXlzKSB7XHJcblx0XHRcdHZhciBkb3dDbnQgPSB0aGlzLm8ud2Vla1N0YXJ0LFxyXG5cdFx0XHRcdGh0bWwgPSAnPHRyPic7XHJcblx0XHRcdGlmICh0aGlzLm8uY2FsZW5kYXJXZWVrcyl7XHJcblx0XHRcdFx0aHRtbCArPSAnPHRoIGNsYXNzPVwiY3dcIj4mIzE2MDs8L3RoPic7XHJcblx0XHRcdH1cclxuXHRcdFx0d2hpbGUgKGRvd0NudCA8IHRoaXMuby53ZWVrU3RhcnQgKyA3KXtcclxuXHRcdFx0XHRodG1sICs9ICc8dGggY2xhc3M9XCJkb3cnO1xyXG4gICAgICAgIGlmICgkLmluQXJyYXkoZG93Q250LCB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkKSAhPT0gLTEpXHJcbiAgICAgICAgICBodG1sICs9ICcgZGlzYWJsZWQnO1xyXG4gICAgICAgIGh0bWwgKz0gJ1wiPicrZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS5kYXlzTWluWyhkb3dDbnQrKyklN10rJzwvdGg+JztcclxuXHRcdFx0fVxyXG5cdFx0XHRodG1sICs9ICc8L3RyPic7XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLWRheXMgdGhlYWQnKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgIH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZmlsbE1vbnRoczogZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIGxvY2FsRGF0ZSA9IHRoaXMuX3V0Y190b19sb2NhbCh0aGlzLnZpZXdEYXRlKTtcclxuXHRcdFx0dmFyIGh0bWwgPSAnJztcclxuXHRcdFx0dmFyIGZvY3VzZWQ7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKyl7XHJcblx0XHRcdFx0Zm9jdXNlZCA9IGxvY2FsRGF0ZSAmJiBsb2NhbERhdGUuZ2V0TW9udGgoKSA9PT0gaSA/ICcgZm9jdXNlZCcgOiAnJztcclxuXHRcdFx0XHRodG1sICs9ICc8c3BhbiBjbGFzcz1cIm1vbnRoJyArIGZvY3VzZWQgKyAnXCI+JyArIGRhdGVzW3RoaXMuby5sYW5ndWFnZV0ubW9udGhzU2hvcnRbaV0gKyAnPC9zcGFuPic7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItbW9udGhzIHRkJykuaHRtbChodG1sKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0UmFuZ2U6IGZ1bmN0aW9uKHJhbmdlKXtcclxuXHRcdFx0aWYgKCFyYW5nZSB8fCAhcmFuZ2UubGVuZ3RoKVxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLnJhbmdlO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy5yYW5nZSA9ICQubWFwKHJhbmdlLCBmdW5jdGlvbihkKXtcclxuXHRcdFx0XHRcdHJldHVybiBkLnZhbHVlT2YoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5maWxsKCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldENsYXNzTmFtZXM6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cdFx0XHR2YXIgY2xzID0gW10sXHJcblx0XHRcdFx0eWVhciA9IHRoaXMudmlld0RhdGUuZ2V0VVRDRnVsbFllYXIoKSxcclxuXHRcdFx0XHRtb250aCA9IHRoaXMudmlld0RhdGUuZ2V0VVRDTW9udGgoKSxcclxuXHRcdFx0XHR0b2RheSA9IFVUQ1RvZGF5KCk7XHJcblx0XHRcdGlmIChkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgPCB5ZWFyIHx8IChkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgPT09IHllYXIgJiYgZGF0ZS5nZXRVVENNb250aCgpIDwgbW9udGgpKXtcclxuXHRcdFx0XHRjbHMucHVzaCgnb2xkJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGF0ZS5nZXRVVENGdWxsWWVhcigpID4geWVhciB8fCAoZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA+IG1vbnRoKSl7XHJcblx0XHRcdFx0Y2xzLnB1c2goJ25ldycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmZvY3VzRGF0ZSAmJiBkYXRlLnZhbHVlT2YoKSA9PT0gdGhpcy5mb2N1c0RhdGUudmFsdWVPZigpKVxyXG5cdFx0XHRcdGNscy5wdXNoKCdmb2N1c2VkJyk7XHJcblx0XHRcdC8vIENvbXBhcmUgaW50ZXJuYWwgVVRDIGRhdGUgd2l0aCBVVEMgdG9kYXksIG5vdCBsb2NhbCB0b2RheVxyXG5cdFx0XHRpZiAodGhpcy5vLnRvZGF5SGlnaGxpZ2h0ICYmIGlzVVRDRXF1YWxzKGRhdGUsIHRvZGF5KSkge1xyXG5cdFx0XHRcdGNscy5wdXNoKCd0b2RheScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmRhdGVzLmNvbnRhaW5zKGRhdGUpICE9PSAtMSlcclxuXHRcdFx0XHRjbHMucHVzaCgnYWN0aXZlJyk7XHJcblx0XHRcdGlmICghdGhpcy5kYXRlV2l0aGluUmFuZ2UoZGF0ZSkpe1xyXG5cdFx0XHRcdGNscy5wdXNoKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmRhdGVJc0Rpc2FibGVkKGRhdGUpKXtcclxuXHRcdFx0XHRjbHMucHVzaCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQtZGF0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICgkLmluQXJyYXkoZGF0ZS5nZXRVVENEYXkoKSwgdGhpcy5vLmRheXNPZldlZWtIaWdobGlnaHRlZCkgIT09IC0xKXtcclxuXHRcdFx0XHRjbHMucHVzaCgnaGlnaGxpZ2h0ZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMucmFuZ2Upe1xyXG5cdFx0XHRcdGlmIChkYXRlID4gdGhpcy5yYW5nZVswXSAmJiBkYXRlIDwgdGhpcy5yYW5nZVt0aGlzLnJhbmdlLmxlbmd0aC0xXSl7XHJcblx0XHRcdFx0XHRjbHMucHVzaCgncmFuZ2UnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCQuaW5BcnJheShkYXRlLnZhbHVlT2YoKSwgdGhpcy5yYW5nZSkgIT09IC0xKXtcclxuXHRcdFx0XHRcdGNscy5wdXNoKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZGF0ZS52YWx1ZU9mKCkgPT09IHRoaXMucmFuZ2VbMF0pe1xyXG4gICAgICAgICAgY2xzLnB1c2goJ3JhbmdlLXN0YXJ0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRlLnZhbHVlT2YoKSA9PT0gdGhpcy5yYW5nZVt0aGlzLnJhbmdlLmxlbmd0aC0xXSl7XHJcbiAgICAgICAgICBjbHMucHVzaCgncmFuZ2UtZW5kJyk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjbHM7XHJcblx0XHR9LFxyXG5cclxuXHRcdF9maWxsX3llYXJzVmlldzogZnVuY3Rpb24oc2VsZWN0b3IsIGNzc0NsYXNzLCBmYWN0b3IsIHllYXIsIHN0YXJ0WWVhciwgZW5kWWVhciwgYmVmb3JlRm4pe1xyXG5cdFx0XHR2YXIgaHRtbCA9ICcnO1xyXG5cdFx0XHR2YXIgc3RlcCA9IGZhY3RvciAvIDEwO1xyXG5cdFx0XHR2YXIgdmlldyA9IHRoaXMucGlja2VyLmZpbmQoc2VsZWN0b3IpO1xyXG5cdFx0XHR2YXIgc3RhcnRWYWwgPSBNYXRoLmZsb29yKHllYXIgLyBmYWN0b3IpICogZmFjdG9yO1xyXG5cdFx0XHR2YXIgZW5kVmFsID0gc3RhcnRWYWwgKyBzdGVwICogOTtcclxuXHRcdFx0dmFyIGZvY3VzZWRWYWwgPSBNYXRoLmZsb29yKHRoaXMudmlld0RhdGUuZ2V0RnVsbFllYXIoKSAvIHN0ZXApICogc3RlcDtcclxuXHRcdFx0dmFyIHNlbGVjdGVkID0gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoZC5nZXRVVENGdWxsWWVhcigpIC8gc3RlcCkgKiBzdGVwO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBjbGFzc2VzLCB0b29sdGlwLCBiZWZvcmU7XHJcblx0XHRcdGZvciAodmFyIGN1cnJWYWwgPSBzdGFydFZhbCAtIHN0ZXA7IGN1cnJWYWwgPD0gZW5kVmFsICsgc3RlcDsgY3VyclZhbCArPSBzdGVwKSB7XHJcblx0XHRcdFx0Y2xhc3NlcyA9IFtjc3NDbGFzc107XHJcblx0XHRcdFx0dG9vbHRpcCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyVmFsID09PSBzdGFydFZhbCAtIHN0ZXApIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMucHVzaCgnb2xkJyk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjdXJyVmFsID09PSBlbmRWYWwgKyBzdGVwKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ25ldycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoJC5pbkFycmF5KGN1cnJWYWwsIHNlbGVjdGVkKSAhPT0gLTEpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMucHVzaCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjdXJyVmFsIDwgc3RhcnRZZWFyIHx8IGN1cnJWYWwgPiBlbmRZZWFyKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjdXJyVmFsID09PSBmb2N1c2VkVmFsKSB7XHJcblx0XHRcdFx0ICBjbGFzc2VzLnB1c2goJ2ZvY3VzZWQnKTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0XHRcdGlmIChiZWZvcmVGbiAhPT0gJC5ub29wKSB7XHJcblx0XHRcdFx0XHRiZWZvcmUgPSBiZWZvcmVGbihuZXcgRGF0ZShjdXJyVmFsLCAwLCAxKSk7XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge307XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7ZW5hYmxlZDogYmVmb3JlfTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge2NsYXNzZXM6IGJlZm9yZX07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmVuYWJsZWQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChiZWZvcmUuY2xhc3Nlcykge1xyXG5cdFx0XHRcdFx0XHRjbGFzc2VzID0gY2xhc3Nlcy5jb25jYXQoYmVmb3JlLmNsYXNzZXMuc3BsaXQoL1xccysvKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlLnRvb2x0aXApIHtcclxuXHRcdFx0XHRcdFx0dG9vbHRpcCA9IGJlZm9yZS50b29sdGlwO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aHRtbCArPSAnPHNwYW4gY2xhc3M9XCInICsgY2xhc3Nlcy5qb2luKCcgJykgKyAnXCInICsgKHRvb2x0aXAgPyAnIHRpdGxlPVwiJyArIHRvb2x0aXAgKyAnXCInIDogJycpICsgJz4nICsgY3VyclZhbCArICc8L3NwYW4+JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmlldy5maW5kKCcuZGF0ZXBpY2tlci1zd2l0Y2gnKS50ZXh0KHN0YXJ0VmFsICsgJy0nICsgZW5kVmFsKTtcclxuXHRcdFx0dmlldy5maW5kKCd0ZCcpLmh0bWwoaHRtbCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGZpbGw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBkID0gbmV3IERhdGUodGhpcy52aWV3RGF0ZSksXHJcblx0XHRcdFx0eWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKSxcclxuXHRcdFx0XHRtb250aCA9IGQuZ2V0VVRDTW9udGgoKSxcclxuXHRcdFx0XHRzdGFydFllYXIgPSB0aGlzLm8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkgPyB0aGlzLm8uc3RhcnREYXRlLmdldFVUQ0Z1bGxZZWFyKCkgOiAtSW5maW5pdHksXHJcblx0XHRcdFx0c3RhcnRNb250aCA9IHRoaXMuby5zdGFydERhdGUgIT09IC1JbmZpbml0eSA/IHRoaXMuby5zdGFydERhdGUuZ2V0VVRDTW9udGgoKSA6IC1JbmZpbml0eSxcclxuXHRcdFx0XHRlbmRZZWFyID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IEluZmluaXR5LFxyXG5cdFx0XHRcdGVuZE1vbnRoID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDTW9udGgoKSA6IEluZmluaXR5LFxyXG5cdFx0XHRcdHRvZGF5dHh0ID0gZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS50b2RheSB8fCBkYXRlc1snZW4nXS50b2RheSB8fCAnJyxcclxuXHRcdFx0XHRjbGVhcnR4dCA9IGRhdGVzW3RoaXMuby5sYW5ndWFnZV0uY2xlYXIgfHwgZGF0ZXNbJ2VuJ10uY2xlYXIgfHwgJycsXHJcblx0XHRcdFx0dGl0bGVGb3JtYXQgPSBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLnRpdGxlRm9ybWF0IHx8IGRhdGVzWydlbiddLnRpdGxlRm9ybWF0LFxyXG5cdFx0XHRcdHRvb2x0aXAsXHJcblx0XHRcdFx0YmVmb3JlO1xyXG5cdFx0XHRpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItZGF5cyAuZGF0ZXBpY2tlci1zd2l0Y2gnKVxyXG5cdFx0XHRcdFx0XHQudGV4dChEUEdsb2JhbC5mb3JtYXREYXRlKGQsIHRpdGxlRm9ybWF0LCB0aGlzLm8ubGFuZ3VhZ2UpKTtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgndGZvb3QgLnRvZGF5JylcclxuXHRcdFx0XHRcdFx0LnRleHQodG9kYXl0eHQpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ2Rpc3BsYXknLCB0aGlzLm8udG9kYXlCdG4gPT09IHRydWUgfHwgdGhpcy5vLnRvZGF5QnRuID09PSAnbGlua2VkJyA/ICd0YWJsZS1jZWxsJyA6ICdub25lJyk7XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJ3Rmb290IC5jbGVhcicpXHJcblx0XHRcdFx0XHRcdC50ZXh0KGNsZWFydHh0KVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgdGhpcy5vLmNsZWFyQnRuID09PSB0cnVlID8gJ3RhYmxlLWNlbGwnIDogJ25vbmUnKTtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgndGhlYWQgLmRhdGVwaWNrZXItdGl0bGUnKVxyXG5cdFx0XHRcdFx0XHQudGV4dCh0aGlzLm8udGl0bGUpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ2Rpc3BsYXknLCB0eXBlb2YgdGhpcy5vLnRpdGxlID09PSAnc3RyaW5nJyAmJiB0aGlzLm8udGl0bGUgIT09ICcnID8gJ3RhYmxlLWNlbGwnIDogJ25vbmUnKTtcclxuXHRcdFx0dGhpcy51cGRhdGVOYXZBcnJvd3MoKTtcclxuXHRcdFx0dGhpcy5maWxsTW9udGhzKCk7XHJcblx0XHRcdHZhciBwcmV2TW9udGggPSBVVENEYXRlKHllYXIsIG1vbnRoLCAwKSxcclxuXHRcdFx0XHRkYXkgPSBwcmV2TW9udGguZ2V0VVRDRGF0ZSgpO1xyXG5cdFx0XHRwcmV2TW9udGguc2V0VVRDRGF0ZShkYXkgLSAocHJldk1vbnRoLmdldFVUQ0RheSgpIC0gdGhpcy5vLndlZWtTdGFydCArIDcpJTcpO1xyXG5cdFx0XHR2YXIgbmV4dE1vbnRoID0gbmV3IERhdGUocHJldk1vbnRoKTtcclxuXHRcdFx0aWYgKHByZXZNb250aC5nZXRVVENGdWxsWWVhcigpIDwgMTAwKXtcclxuICAgICAgICBuZXh0TW9udGguc2V0VVRDRnVsbFllYXIocHJldk1vbnRoLmdldFVUQ0Z1bGxZZWFyKCkpO1xyXG4gICAgICB9XHJcblx0XHRcdG5leHRNb250aC5zZXRVVENEYXRlKG5leHRNb250aC5nZXRVVENEYXRlKCkgKyA0Mik7XHJcblx0XHRcdG5leHRNb250aCA9IG5leHRNb250aC52YWx1ZU9mKCk7XHJcblx0XHRcdHZhciBodG1sID0gW107XHJcblx0XHRcdHZhciB3ZWVrRGF5LCBjbHNOYW1lO1xyXG5cdFx0XHR3aGlsZSAocHJldk1vbnRoLnZhbHVlT2YoKSA8IG5leHRNb250aCl7XHJcblx0XHRcdFx0d2Vla0RheSA9IHByZXZNb250aC5nZXRVVENEYXkoKTtcclxuXHRcdFx0XHRpZiAod2Vla0RheSA9PT0gdGhpcy5vLndlZWtTdGFydCl7XHJcblx0XHRcdFx0XHRodG1sLnB1c2goJzx0cj4nKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLm8uY2FsZW5kYXJXZWVrcyl7XHJcblx0XHRcdFx0XHRcdC8vIElTTyA4NjAxOiBGaXJzdCB3ZWVrIGNvbnRhaW5zIGZpcnN0IHRodXJzZGF5LlxyXG5cdFx0XHRcdFx0XHQvLyBJU08gYWxzbyBzdGF0ZXMgd2VlayBzdGFydHMgb24gTW9uZGF5LCBidXQgd2UgY2FuIGJlIG1vcmUgYWJzdHJhY3QgaGVyZS5cclxuXHRcdFx0XHRcdFx0dmFyXHJcblx0XHRcdFx0XHRcdFx0Ly8gU3RhcnQgb2YgY3VycmVudCB3ZWVrOiBiYXNlZCBvbiB3ZWVrc3RhcnQvY3VycmVudCBkYXRlXHJcblx0XHRcdFx0XHRcdFx0d3MgPSBuZXcgRGF0ZSgrcHJldk1vbnRoICsgKHRoaXMuby53ZWVrU3RhcnQgLSB3ZWVrRGF5IC0gNykgJSA3ICogODY0ZTUpLFxyXG5cdFx0XHRcdFx0XHRcdC8vIFRodXJzZGF5IG9mIHRoaXMgd2Vla1xyXG5cdFx0XHRcdFx0XHRcdHRoID0gbmV3IERhdGUoTnVtYmVyKHdzKSArICg3ICsgNCAtIHdzLmdldFVUQ0RheSgpKSAlIDcgKiA4NjRlNSksXHJcblx0XHRcdFx0XHRcdFx0Ly8gRmlyc3QgVGh1cnNkYXkgb2YgeWVhciwgeWVhciBmcm9tIHRodXJzZGF5XHJcblx0XHRcdFx0XHRcdFx0eXRoID0gbmV3IERhdGUoTnVtYmVyKHl0aCA9IFVUQ0RhdGUodGguZ2V0VVRDRnVsbFllYXIoKSwgMCwgMSkpICsgKDcgKyA0IC0geXRoLmdldFVUQ0RheSgpKSAlIDcgKiA4NjRlNSksXHJcblx0XHRcdFx0XHRcdFx0Ly8gQ2FsZW5kYXIgd2VlazogbXMgYmV0d2VlbiB0aHVyc2RheXMsIGRpdiBtcyBwZXIgZGF5LCBkaXYgNyBkYXlzXHJcblx0XHRcdFx0XHRcdFx0Y2FsV2VlayA9ICh0aCAtIHl0aCkgLyA4NjRlNSAvIDcgKyAxO1xyXG5cdFx0XHRcdFx0XHRodG1sLnB1c2goJzx0ZCBjbGFzcz1cImN3XCI+JysgY2FsV2VlayArJzwvdGQ+Jyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNsc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZXMocHJldk1vbnRoKTtcclxuXHRcdFx0XHRjbHNOYW1lLnB1c2goJ2RheScpO1xyXG5cclxuXHRcdFx0XHR2YXIgY29udGVudCA9IHByZXZNb250aC5nZXRVVENEYXRlKCk7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLm8uYmVmb3JlU2hvd0RheSAhPT0gJC5ub29wKXtcclxuXHRcdFx0XHRcdGJlZm9yZSA9IHRoaXMuby5iZWZvcmVTaG93RGF5KHRoaXMuX3V0Y190b19sb2NhbChwcmV2TW9udGgpKTtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge307XHJcblx0XHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgYmVmb3JlID09PSAnYm9vbGVhbicpXHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtlbmFibGVkOiBiZWZvcmV9O1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ3N0cmluZycpXHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtjbGFzc2VzOiBiZWZvcmV9O1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5lbmFibGVkID09PSBmYWxzZSlcclxuXHRcdFx0XHRcdFx0Y2xzTmFtZS5wdXNoKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5jbGFzc2VzKVxyXG5cdFx0XHRcdFx0XHRjbHNOYW1lID0gY2xzTmFtZS5jb25jYXQoYmVmb3JlLmNsYXNzZXMuc3BsaXQoL1xccysvKSk7XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlLnRvb2x0aXApXHJcblx0XHRcdFx0XHRcdHRvb2x0aXAgPSBiZWZvcmUudG9vbHRpcDtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUuY29udGVudClcclxuXHRcdFx0XHRcdFx0Y29udGVudCA9IGJlZm9yZS5jb250ZW50O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9DaGVjayBpZiB1bmlxdWVTb3J0IGV4aXN0cyAoc3VwcG9ydGVkIGJ5IGpxdWVyeSA+PTEuMTIgYW5kID49Mi4yKVxyXG5cdFx0XHRcdC8vRmFsbGJhY2sgdG8gdW5pcXVlIGZ1bmN0aW9uIGZvciBvbGRlciBqcXVlcnkgdmVyc2lvbnNcclxuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKCQudW5pcXVlU29ydCkpIHtcclxuXHRcdFx0XHRcdGNsc05hbWUgPSAkLnVuaXF1ZVNvcnQoY2xzTmFtZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNsc05hbWUgPSAkLnVuaXF1ZShjbHNOYW1lKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGh0bWwucHVzaCgnPHRkIGNsYXNzPVwiJytjbHNOYW1lLmpvaW4oJyAnKSsnXCInICsgKHRvb2x0aXAgPyAnIHRpdGxlPVwiJyt0b29sdGlwKydcIicgOiAnJykgKyAnIGRhdGEtZGF0ZT1cIicgKyBwcmV2TW9udGguZ2V0VGltZSgpLnRvU3RyaW5nKCkgKyAnXCI+JyArIGNvbnRlbnQgKyAnPC90ZD4nKTtcclxuXHRcdFx0XHR0b29sdGlwID0gbnVsbDtcclxuXHRcdFx0XHRpZiAod2Vla0RheSA9PT0gdGhpcy5vLndlZWtFbmQpe1xyXG5cdFx0XHRcdFx0aHRtbC5wdXNoKCc8L3RyPicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwcmV2TW9udGguc2V0VVRDRGF0ZShwcmV2TW9udGguZ2V0VVRDRGF0ZSgpICsgMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItZGF5cyB0Ym9keScpLmh0bWwoaHRtbC5qb2luKCcnKSk7XHJcblxyXG5cdFx0XHR2YXIgbW9udGhzVGl0bGUgPSBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLm1vbnRoc1RpdGxlIHx8IGRhdGVzWydlbiddLm1vbnRoc1RpdGxlIHx8ICdNb250aHMnO1xyXG5cdFx0XHR2YXIgbW9udGhzID0gdGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItbW9udGhzJylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5kYXRlcGlja2VyLXN3aXRjaCcpXHJcblx0XHRcdFx0XHRcdFx0LnRleHQodGhpcy5vLm1heFZpZXdNb2RlIDwgMiA/IG1vbnRoc1RpdGxlIDogeWVhcilcclxuXHRcdFx0XHRcdFx0XHQuZW5kKClcclxuXHRcdFx0XHRcdFx0LmZpbmQoJ3Rib2R5IHNwYW4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHQkLmVhY2godGhpcy5kYXRlcywgZnVuY3Rpb24oaSwgZCl7XHJcblx0XHRcdFx0aWYgKGQuZ2V0VVRDRnVsbFllYXIoKSA9PT0geWVhcilcclxuXHRcdFx0XHRcdG1vbnRocy5lcShkLmdldFVUQ01vbnRoKCkpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoeWVhciA8IHN0YXJ0WWVhciB8fCB5ZWFyID4gZW5kWWVhcil7XHJcblx0XHRcdFx0bW9udGhzLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh5ZWFyID09PSBzdGFydFllYXIpe1xyXG5cdFx0XHRcdG1vbnRocy5zbGljZSgwLCBzdGFydE1vbnRoKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoeWVhciA9PT0gZW5kWWVhcil7XHJcblx0XHRcdFx0bW9udGhzLnNsaWNlKGVuZE1vbnRoKzEpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLmJlZm9yZVNob3dNb250aCAhPT0gJC5ub29wKXtcclxuXHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblx0XHRcdFx0JC5lYWNoKG1vbnRocywgZnVuY3Rpb24oaSwgbW9udGgpe1xyXG4gICAgICAgICAgdmFyIG1vRGF0ZSA9IG5ldyBEYXRlKHllYXIsIGksIDEpO1xyXG4gICAgICAgICAgdmFyIGJlZm9yZSA9IHRoYXQuby5iZWZvcmVTaG93TW9udGgobW9EYXRlKTtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge307XHJcblx0XHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgYmVmb3JlID09PSAnYm9vbGVhbicpXHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtlbmFibGVkOiBiZWZvcmV9O1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ3N0cmluZycpXHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtjbGFzc2VzOiBiZWZvcmV9O1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5lbmFibGVkID09PSBmYWxzZSAmJiAhJChtb250aCkuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpXHJcblx0XHRcdFx0XHQgICAgJChtb250aCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmNsYXNzZXMpXHJcblx0XHRcdFx0XHQgICAgJChtb250aCkuYWRkQ2xhc3MoYmVmb3JlLmNsYXNzZXMpO1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS50b29sdGlwKVxyXG5cdFx0XHRcdFx0ICAgICQobW9udGgpLnByb3AoJ3RpdGxlJywgYmVmb3JlLnRvb2x0aXApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0aW5nIGRlY2FkZS95ZWFycyBwaWNrZXJcclxuXHRcdFx0dGhpcy5fZmlsbF95ZWFyc1ZpZXcoXHJcblx0XHRcdFx0Jy5kYXRlcGlja2VyLXllYXJzJyxcclxuXHRcdFx0XHQneWVhcicsXHJcblx0XHRcdFx0MTAsXHJcblx0XHRcdFx0eWVhcixcclxuXHRcdFx0XHRzdGFydFllYXIsXHJcblx0XHRcdFx0ZW5kWWVhcixcclxuXHRcdFx0XHR0aGlzLm8uYmVmb3JlU2hvd1llYXJcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRpbmcgY2VudHVyeS9kZWNhZGVzIHBpY2tlclxyXG5cdFx0XHR0aGlzLl9maWxsX3llYXJzVmlldyhcclxuXHRcdFx0XHQnLmRhdGVwaWNrZXItZGVjYWRlcycsXHJcblx0XHRcdFx0J2RlY2FkZScsXHJcblx0XHRcdFx0MTAwLFxyXG5cdFx0XHRcdHllYXIsXHJcblx0XHRcdFx0c3RhcnRZZWFyLFxyXG5cdFx0XHRcdGVuZFllYXIsXHJcblx0XHRcdFx0dGhpcy5vLmJlZm9yZVNob3dEZWNhZGVcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdC8vIEdlbmVyYXRpbmcgbWlsbGVubml1bS9jZW50dXJpZXMgcGlja2VyXHJcblx0XHRcdHRoaXMuX2ZpbGxfeWVhcnNWaWV3KFxyXG5cdFx0XHRcdCcuZGF0ZXBpY2tlci1jZW50dXJpZXMnLFxyXG5cdFx0XHRcdCdjZW50dXJ5JyxcclxuXHRcdFx0XHQxMDAwLFxyXG5cdFx0XHRcdHllYXIsXHJcblx0XHRcdFx0c3RhcnRZZWFyLFxyXG5cdFx0XHRcdGVuZFllYXIsXHJcblx0XHRcdFx0dGhpcy5vLmJlZm9yZVNob3dDZW50dXJ5XHJcblx0XHRcdCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHVwZGF0ZU5hdkFycm93czogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYgKCF0aGlzLl9hbGxvd191cGRhdGUpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0dmFyIGQgPSBuZXcgRGF0ZSh0aGlzLnZpZXdEYXRlKSxcclxuXHRcdFx0XHR5ZWFyID0gZC5nZXRVVENGdWxsWWVhcigpLFxyXG5cdFx0XHRcdG1vbnRoID0gZC5nZXRVVENNb250aCgpLFxyXG5cdFx0XHRcdHN0YXJ0WWVhciA9IHRoaXMuby5zdGFydERhdGUgIT09IC1JbmZpbml0eSA/IHRoaXMuby5zdGFydERhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IC1JbmZpbml0eSxcclxuXHRcdFx0XHRzdGFydE1vbnRoID0gdGhpcy5vLnN0YXJ0RGF0ZSAhPT0gLUluZmluaXR5ID8gdGhpcy5vLnN0YXJ0RGF0ZS5nZXRVVENNb250aCgpIDogLUluZmluaXR5LFxyXG5cdFx0XHRcdGVuZFllYXIgPSB0aGlzLm8uZW5kRGF0ZSAhPT0gSW5maW5pdHkgPyB0aGlzLm8uZW5kRGF0ZS5nZXRVVENGdWxsWWVhcigpIDogSW5maW5pdHksXHJcblx0XHRcdFx0ZW5kTW9udGggPSB0aGlzLm8uZW5kRGF0ZSAhPT0gSW5maW5pdHkgPyB0aGlzLm8uZW5kRGF0ZS5nZXRVVENNb250aCgpIDogSW5maW5pdHksXHJcblx0XHRcdFx0cHJldklzRGlzYWJsZWQsXHJcblx0XHRcdFx0bmV4dElzRGlzYWJsZWQsXHJcblx0XHRcdFx0ZmFjdG9yID0gMTtcclxuXHRcdFx0c3dpdGNoICh0aGlzLnZpZXdNb2RlKXtcclxuXHRcdFx0XHRjYXNlIDA6XHJcblx0XHRcdFx0XHRwcmV2SXNEaXNhYmxlZCA9IHllYXIgPD0gc3RhcnRZZWFyICYmIG1vbnRoIDw9IHN0YXJ0TW9udGg7XHJcblx0XHRcdFx0XHRuZXh0SXNEaXNhYmxlZCA9IHllYXIgPj0gZW5kWWVhciAmJiBtb250aCA+PSBlbmRNb250aDtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgNDpcclxuXHRcdFx0XHRcdGZhY3RvciAqPSAxMDtcclxuXHRcdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cclxuXHRcdFx0XHRjYXNlIDM6XHJcblx0XHRcdFx0XHRmYWN0b3IgKj0gMTA7XHJcblx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXHJcblx0XHRcdFx0Y2FzZSAyOlxyXG5cdFx0XHRcdFx0ZmFjdG9yICo9IDEwO1xyXG5cdFx0XHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xyXG5cdFx0XHRcdGNhc2UgMTpcclxuXHRcdFx0XHRcdHByZXZJc0Rpc2FibGVkID0gTWF0aC5mbG9vcih5ZWFyIC8gZmFjdG9yKSAqIGZhY3RvciA8PSBzdGFydFllYXI7XHJcblx0XHRcdFx0XHRuZXh0SXNEaXNhYmxlZCA9IE1hdGguZmxvb3IoeWVhciAvIGZhY3RvcikgKiBmYWN0b3IgKyBmYWN0b3IgPj0gZW5kWWVhcjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcucHJldicpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHByZXZJc0Rpc2FibGVkKTtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLm5leHQnKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBuZXh0SXNEaXNhYmxlZCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNsaWNrOiBmdW5jdGlvbihlKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0dmFyIHRhcmdldCwgZGlyLCBkYXksIHllYXIsIG1vbnRoO1xyXG5cdFx0XHR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcblx0XHRcdC8vIENsaWNrZWQgb24gdGhlIHN3aXRjaFxyXG5cdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCdkYXRlcGlja2VyLXN3aXRjaCcpICYmIHRoaXMudmlld01vZGUgIT09IHRoaXMuby5tYXhWaWV3TW9kZSl7XHJcblx0XHRcdFx0dGhpcy5zZXRWaWV3TW9kZSh0aGlzLnZpZXdNb2RlICsgMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENsaWNrZWQgb24gdG9kYXkgYnV0dG9uXHJcblx0XHRcdGlmICh0YXJnZXQuaGFzQ2xhc3MoJ3RvZGF5JykgJiYgIXRhcmdldC5oYXNDbGFzcygnZGF5Jykpe1xyXG5cdFx0XHRcdHRoaXMuc2V0Vmlld01vZGUoMCk7XHJcblx0XHRcdFx0dGhpcy5fc2V0RGF0ZShVVENUb2RheSgpLCB0aGlzLm8udG9kYXlCdG4gPT09ICdsaW5rZWQnID8gbnVsbCA6ICd2aWV3Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENsaWNrZWQgb24gY2xlYXIgYnV0dG9uXHJcblx0XHRcdGlmICh0YXJnZXQuaGFzQ2xhc3MoJ2NsZWFyJykpe1xyXG5cdFx0XHRcdHRoaXMuY2xlYXJEYXRlcygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRhcmdldC5oYXNDbGFzcygnZGlzYWJsZWQnKSl7XHJcblx0XHRcdFx0Ly8gQ2xpY2tlZCBvbiBhIG1vbnRoLCB5ZWFyLCBkZWNhZGUsIGNlbnR1cnlcclxuXHRcdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCdtb250aCcpXHJcblx0XHRcdFx0XHRcdHx8IHRhcmdldC5oYXNDbGFzcygneWVhcicpXHJcblx0XHRcdFx0XHRcdHx8IHRhcmdldC5oYXNDbGFzcygnZGVjYWRlJylcclxuXHRcdFx0XHRcdFx0fHwgdGFyZ2V0Lmhhc0NsYXNzKCdjZW50dXJ5JykpIHtcclxuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUuc2V0VVRDRGF0ZSgxKTtcclxuXHJcblx0XHRcdFx0XHRkYXkgPSAxO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMudmlld01vZGUgPT09IDEpe1xyXG5cdFx0XHRcdFx0XHRtb250aCA9IHRhcmdldC5wYXJlbnQoKS5maW5kKCdzcGFuJykuaW5kZXgodGFyZ2V0KTtcclxuXHRcdFx0XHRcdFx0eWVhciA9IHRoaXMudmlld0RhdGUuZ2V0VVRDRnVsbFllYXIoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy52aWV3RGF0ZS5zZXRVVENNb250aChtb250aCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRtb250aCA9IDA7XHJcblx0XHRcdFx0XHRcdHllYXIgPSBOdW1iZXIodGFyZ2V0LnRleHQoKSk7XHJcblx0XHRcdFx0XHRcdHRoaXMudmlld0RhdGUuc2V0VVRDRnVsbFllYXIoeWVhcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcihEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZSAtIDFdLmUsIHRoaXMudmlld0RhdGUpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLnZpZXdNb2RlID09PSB0aGlzLm8ubWluVmlld01vZGUpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9zZXREYXRlKFVUQ0RhdGUoeWVhciwgbW9udGgsIGRheSkpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRWaWV3TW9kZSh0aGlzLnZpZXdNb2RlIC0gMSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZmlsbCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMucGlja2VyLmlzKCc6dmlzaWJsZScpICYmIHRoaXMuX2ZvY3VzZWRfZnJvbSl7XHJcblx0XHRcdFx0dGhpcy5fZm9jdXNlZF9mcm9tLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVsZXRlIHRoaXMuX2ZvY3VzZWRfZnJvbTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGF5Q2VsbENsaWNrOiBmdW5jdGlvbihlKXtcclxuXHRcdFx0dmFyICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblx0XHRcdHZhciB0aW1lc3RhbXAgPSAkdGFyZ2V0LmRhdGEoJ2RhdGUnKTtcclxuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuby51cGRhdGVWaWV3RGF0ZSkge1xyXG5cdFx0XHRcdGlmIChkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgIT09IHRoaXMudmlld0RhdGUuZ2V0VVRDRnVsbFllYXIoKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlWWVhcicsIHRoaXMudmlld0RhdGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGRhdGUuZ2V0VVRDTW9udGgoKSAhPT0gdGhpcy52aWV3RGF0ZS5nZXRVVENNb250aCgpKSB7XHJcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VNb250aCcsIHRoaXMudmlld0RhdGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLl9zZXREYXRlKGRhdGUpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBDbGlja2VkIG9uIHByZXYgb3IgbmV4dFxyXG5cdFx0bmF2QXJyb3dzQ2xpY2s6IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR2YXIgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdFx0dmFyIGRpciA9ICR0YXJnZXQuaGFzQ2xhc3MoJ3ByZXYnKSA/IC0xIDogMTtcclxuXHRcdFx0aWYgKHRoaXMudmlld01vZGUgIT09IDApe1xyXG5cdFx0XHRcdGRpciAqPSBEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZV0ubmF2U3RlcCAqIDEyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudmlld0RhdGUgPSB0aGlzLm1vdmVNb250aCh0aGlzLnZpZXdEYXRlLCBkaXIpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKERQR2xvYmFsLnZpZXdNb2Rlc1t0aGlzLnZpZXdNb2RlXS5lLCB0aGlzLnZpZXdEYXRlKTtcclxuXHRcdFx0dGhpcy5maWxsKCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdF90b2dnbGVfbXVsdGlkYXRlOiBmdW5jdGlvbihkYXRlKXtcclxuXHRcdFx0dmFyIGl4ID0gdGhpcy5kYXRlcy5jb250YWlucyhkYXRlKTtcclxuXHRcdFx0aWYgKCFkYXRlKXtcclxuXHRcdFx0XHR0aGlzLmRhdGVzLmNsZWFyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpeCAhPT0gLTEpe1xyXG5cdFx0XHRcdGlmICh0aGlzLm8ubXVsdGlkYXRlID09PSB0cnVlIHx8IHRoaXMuby5tdWx0aWRhdGUgPiAxIHx8IHRoaXMuby50b2dnbGVBY3RpdmUpe1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRlcy5yZW1vdmUoaXgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm8ubXVsdGlkYXRlID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRoaXMuZGF0ZXMuY2xlYXIoKTtcclxuXHRcdFx0XHR0aGlzLmRhdGVzLnB1c2goZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kYXRlcy5wdXNoKGRhdGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMuby5tdWx0aWRhdGUgPT09ICdudW1iZXInKVxyXG5cdFx0XHRcdHdoaWxlICh0aGlzLmRhdGVzLmxlbmd0aCA+IHRoaXMuby5tdWx0aWRhdGUpXHJcblx0XHRcdFx0XHR0aGlzLmRhdGVzLnJlbW92ZSgwKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0X3NldERhdGU6IGZ1bmN0aW9uKGRhdGUsIHdoaWNoKXtcclxuXHRcdFx0aWYgKCF3aGljaCB8fCB3aGljaCA9PT0gJ2RhdGUnKVxyXG5cdFx0XHRcdHRoaXMuX3RvZ2dsZV9tdWx0aWRhdGUoZGF0ZSAmJiBuZXcgRGF0ZShkYXRlKSk7XHJcblx0XHRcdGlmICgoIXdoaWNoICYmIHRoaXMuby51cGRhdGVWaWV3RGF0ZSkgfHwgd2hpY2ggPT09ICd2aWV3JylcclxuXHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gZGF0ZSAmJiBuZXcgRGF0ZShkYXRlKTtcclxuXHJcblx0XHRcdHRoaXMuZmlsbCgpO1xyXG5cdFx0XHR0aGlzLnNldFZhbHVlKCk7XHJcblx0XHRcdGlmICghd2hpY2ggfHwgd2hpY2ggIT09ICd2aWV3Jykge1xyXG5cdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZURhdGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmlucHV0RmllbGQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdGlmICh0aGlzLm8uYXV0b2Nsb3NlICYmICghd2hpY2ggfHwgd2hpY2ggPT09ICdkYXRlJykpe1xyXG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdG1vdmVEYXk6IGZ1bmN0aW9uKGRhdGUsIGRpcil7XHJcblx0XHRcdHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblx0XHRcdG5ld0RhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpcik7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3RGF0ZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0bW92ZVdlZWs6IGZ1bmN0aW9uKGRhdGUsIGRpcil7XHJcblx0XHRcdHJldHVybiB0aGlzLm1vdmVEYXkoZGF0ZSwgZGlyICogNyk7XHJcblx0XHR9LFxyXG5cclxuXHRcdG1vdmVNb250aDogZnVuY3Rpb24oZGF0ZSwgZGlyKXtcclxuXHRcdFx0aWYgKCFpc1ZhbGlkRGF0ZShkYXRlKSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vLmRlZmF1bHRWaWV3RGF0ZTtcclxuXHRcdFx0aWYgKCFkaXIpXHJcblx0XHRcdFx0cmV0dXJuIGRhdGU7XHJcblx0XHRcdHZhciBuZXdfZGF0ZSA9IG5ldyBEYXRlKGRhdGUudmFsdWVPZigpKSxcclxuXHRcdFx0XHRkYXkgPSBuZXdfZGF0ZS5nZXRVVENEYXRlKCksXHJcblx0XHRcdFx0bW9udGggPSBuZXdfZGF0ZS5nZXRVVENNb250aCgpLFxyXG5cdFx0XHRcdG1hZyA9IE1hdGguYWJzKGRpciksXHJcblx0XHRcdFx0bmV3X21vbnRoLCB0ZXN0O1xyXG5cdFx0XHRkaXIgPSBkaXIgPiAwID8gMSA6IC0xO1xyXG5cdFx0XHRpZiAobWFnID09PSAxKXtcclxuXHRcdFx0XHR0ZXN0ID0gZGlyID09PSAtMVxyXG5cdFx0XHRcdFx0Ly8gSWYgZ29pbmcgYmFjayBvbmUgbW9udGgsIG1ha2Ugc3VyZSBtb250aCBpcyBub3QgY3VycmVudCBtb250aFxyXG5cdFx0XHRcdFx0Ly8gKGVnLCBNYXIgMzEgLT4gRmViIDMxID09IEZlYiAyOCwgbm90IE1hciAwMilcclxuXHRcdFx0XHRcdD8gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld19kYXRlLmdldFVUQ01vbnRoKCkgPT09IG1vbnRoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gSWYgZ29pbmcgZm9yd2FyZCBvbmUgbW9udGgsIG1ha2Ugc3VyZSBtb250aCBpcyBhcyBleHBlY3RlZFxyXG5cdFx0XHRcdFx0Ly8gKGVnLCBKYW4gMzEgLT4gRmViIDMxID09IEZlYiAyOCwgbm90IE1hciAwMilcclxuXHRcdFx0XHRcdDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld19kYXRlLmdldFVUQ01vbnRoKCkgIT09IG5ld19tb250aDtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0bmV3X21vbnRoID0gbW9udGggKyBkaXI7XHJcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDTW9udGgobmV3X21vbnRoKTtcclxuXHRcdFx0XHQvLyBEZWMgLT4gSmFuICgxMikgb3IgSmFuIC0+IERlYyAoLTEpIC0tIGxpbWl0IGV4cGVjdGVkIGRhdGUgdG8gMC0xMVxyXG5cdFx0XHRcdG5ld19tb250aCA9IChuZXdfbW9udGggKyAxMikgJSAxMjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBGb3IgbWFnbml0dWRlcyA+MSwgbW92ZSBvbmUgbW9udGggYXQgYSB0aW1lLi4uXHJcblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgbWFnOyBpKyspXHJcblx0XHRcdFx0XHQvLyAuLi53aGljaCBtaWdodCBkZWNyZWFzZSB0aGUgZGF5IChlZywgSmFuIDMxIHRvIEZlYiAyOCwgZXRjKS4uLlxyXG5cdFx0XHRcdFx0bmV3X2RhdGUgPSB0aGlzLm1vdmVNb250aChuZXdfZGF0ZSwgZGlyKTtcclxuXHRcdFx0XHQvLyAuLi50aGVuIHJlc2V0IHRoZSBkYXksIGtlZXBpbmcgaXQgaW4gdGhlIG5ldyBtb250aFxyXG5cdFx0XHRcdG5ld19tb250aCA9IG5ld19kYXRlLmdldFVUQ01vbnRoKCk7XHJcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDRGF0ZShkYXkpO1xyXG5cdFx0XHRcdHRlc3QgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ld19tb250aCAhPT0gbmV3X2RhdGUuZ2V0VVRDTW9udGgoKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIENvbW1vbiBkYXRlLXJlc2V0dGluZyBsb29wIC0tIGlmIGRhdGUgaXMgYmV5b25kIGVuZCBvZiBtb250aCwgbWFrZSBpdFxyXG5cdFx0XHQvLyBlbmQgb2YgbW9udGhcclxuXHRcdFx0d2hpbGUgKHRlc3QoKSl7XHJcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDRGF0ZSgtLWRheSk7XHJcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDTW9udGgobmV3X21vbnRoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3X2RhdGU7XHJcblx0XHR9LFxyXG5cclxuXHRcdG1vdmVZZWFyOiBmdW5jdGlvbihkYXRlLCBkaXIpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb3ZlTW9udGgoZGF0ZSwgZGlyKjEyKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0bW92ZUF2YWlsYWJsZURhdGU6IGZ1bmN0aW9uKGRhdGUsIGRpciwgZm4pe1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0ZGF0ZSA9IHRoaXNbZm5dKGRhdGUsIGRpcik7XHJcblxyXG5cdFx0XHRcdGlmICghdGhpcy5kYXRlV2l0aGluUmFuZ2UoZGF0ZSkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGZuID0gJ21vdmVEYXknO1xyXG5cdFx0XHR9XHJcblx0XHRcdHdoaWxlICh0aGlzLmRhdGVJc0Rpc2FibGVkKGRhdGUpKTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRlO1xyXG5cdFx0fSxcclxuXHJcblx0XHR3ZWVrT2ZEYXRlSXNEaXNhYmxlZDogZnVuY3Rpb24oZGF0ZSl7XHJcblx0XHRcdHJldHVybiAkLmluQXJyYXkoZGF0ZS5nZXRVVENEYXkoKSwgdGhpcy5vLmRheXNPZldlZWtEaXNhYmxlZCkgIT09IC0xO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkYXRlSXNEaXNhYmxlZDogZnVuY3Rpb24oZGF0ZSl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0dGhpcy53ZWVrT2ZEYXRlSXNEaXNhYmxlZChkYXRlKSB8fFxyXG5cdFx0XHRcdCQuZ3JlcCh0aGlzLm8uZGF0ZXNEaXNhYmxlZCwgZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gaXNVVENFcXVhbHMoZGF0ZSwgZCk7XHJcblx0XHRcdFx0fSkubGVuZ3RoID4gMFxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkYXRlV2l0aGluUmFuZ2U6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cdFx0XHRyZXR1cm4gZGF0ZSA+PSB0aGlzLm8uc3RhcnREYXRlICYmIGRhdGUgPD0gdGhpcy5vLmVuZERhdGU7XHJcblx0XHR9LFxyXG5cclxuXHRcdGtleWRvd246IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRpZiAoIXRoaXMucGlja2VyLmlzKCc6dmlzaWJsZScpKXtcclxuXHRcdFx0XHRpZiAoZS5rZXlDb2RlID09PSA0MCB8fCBlLmtleUNvZGUgPT09IDI3KSB7IC8vIGFsbG93IGRvd24gdG8gcmUtc2hvdyBwaWNrZXJcclxuXHRcdFx0XHRcdHRoaXMuc2hvdygpO1xyXG5cdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBkYXRlQ2hhbmdlZCA9IGZhbHNlLFxyXG5cdFx0XHRcdGRpciwgbmV3Vmlld0RhdGUsXHJcblx0XHRcdFx0Zm9jdXNEYXRlID0gdGhpcy5mb2N1c0RhdGUgfHwgdGhpcy52aWV3RGF0ZTtcclxuXHRcdFx0c3dpdGNoIChlLmtleUNvZGUpe1xyXG5cdFx0XHRcdGNhc2UgMjc6IC8vIGVzY2FwZVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZm9jdXNEYXRlKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c0RhdGUgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5kYXRlcy5nZXQoLTEpIHx8IHRoaXMudmlld0RhdGU7XHJcblx0XHRcdFx0XHRcdHRoaXMuZmlsbCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIDM3OiAvLyBsZWZ0XHJcblx0XHRcdFx0Y2FzZSAzODogLy8gdXBcclxuXHRcdFx0XHRjYXNlIDM5OiAvLyByaWdodFxyXG5cdFx0XHRcdGNhc2UgNDA6IC8vIGRvd25cclxuXHRcdFx0XHRcdGlmICghdGhpcy5vLmtleWJvYXJkTmF2aWdhdGlvbiB8fCB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkLmxlbmd0aCA9PT0gNylcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRkaXIgPSBlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzggPyAtMSA6IDE7XHJcbiAgICAgICAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gMCkge1xyXG4gIFx0XHRcdFx0XHRpZiAoZS5jdHJsS2V5KXtcclxuICBcdFx0XHRcdFx0XHRuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlWWVhcicpO1xyXG5cclxuICBcdFx0XHRcdFx0XHRpZiAobmV3Vmlld0RhdGUpXHJcbiAgXHRcdFx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VZZWFyJywgdGhpcy52aWV3RGF0ZSk7XHJcbiAgXHRcdFx0XHRcdH0gZWxzZSBpZiAoZS5zaGlmdEtleSl7XHJcbiAgXHRcdFx0XHRcdFx0bmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZU1vbnRoJyk7XHJcblxyXG4gIFx0XHRcdFx0XHRcdGlmIChuZXdWaWV3RGF0ZSlcclxuICBcdFx0XHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZU1vbnRoJywgdGhpcy52aWV3RGF0ZSk7XHJcbiAgXHRcdFx0XHRcdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KXtcclxuICBcdFx0XHRcdFx0XHRuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlRGF5Jyk7XHJcbiAgXHRcdFx0XHRcdH0gZWxzZSBpZiAoIXRoaXMud2Vla09mRGF0ZUlzRGlzYWJsZWQoZm9jdXNEYXRlKSl7XHJcbiAgXHRcdFx0XHRcdFx0bmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZVdlZWsnKTtcclxuICBcdFx0XHRcdFx0fVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXdNb2RlID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgICAgICAgICBkaXIgPSBkaXIgKiA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVNb250aCcpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXdNb2RlID09PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgICAgICAgICBkaXIgPSBkaXIgKiA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVZZWFyJyk7XHJcbiAgICAgICAgICB9XHJcblx0XHRcdFx0XHRpZiAobmV3Vmlld0RhdGUpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IHRoaXMudmlld0RhdGUgPSBuZXdWaWV3RGF0ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAxMzogLy8gZW50ZXJcclxuXHRcdFx0XHRcdGlmICghdGhpcy5vLmZvcmNlUGFyc2UpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Zm9jdXNEYXRlID0gdGhpcy5mb2N1c0RhdGUgfHwgdGhpcy5kYXRlcy5nZXQoLTEpIHx8IHRoaXMudmlld0RhdGU7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5vLmtleWJvYXJkTmF2aWdhdGlvbikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl90b2dnbGVfbXVsdGlkYXRlKGZvY3VzRGF0ZSk7XHJcblx0XHRcdFx0XHRcdGRhdGVDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcclxuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUgPSB0aGlzLmRhdGVzLmdldCgtMSkgfHwgdGhpcy52aWV3RGF0ZTtcclxuXHRcdFx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcclxuXHRcdFx0XHRcdHRoaXMuZmlsbCgpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMucGlja2VyLmlzKCc6dmlzaWJsZScpKXtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vLmF1dG9jbG9zZSlcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgOTogLy8gdGFiXHJcblx0XHRcdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5kYXRlcy5nZXQoLTEpIHx8IHRoaXMudmlld0RhdGU7XHJcblx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGRhdGVDaGFuZ2VkKXtcclxuXHRcdFx0XHRpZiAodGhpcy5kYXRlcy5sZW5ndGgpXHJcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2xlYXJEYXRlJyk7XHJcblx0XHRcdFx0dGhpcy5pbnB1dEZpZWxkLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldFZpZXdNb2RlOiBmdW5jdGlvbih2aWV3TW9kZSl7XHJcblx0XHRcdHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcclxuXHRcdFx0dGhpcy5waWNrZXJcclxuXHRcdFx0XHQuY2hpbGRyZW4oJ2RpdicpXHJcblx0XHRcdFx0LmhpZGUoKVxyXG5cdFx0XHRcdC5maWx0ZXIoJy5kYXRlcGlja2VyLScgKyBEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZV0uY2xzTmFtZSlcclxuXHRcdFx0XHRcdC5zaG93KCk7XHJcblx0XHRcdHRoaXMudXBkYXRlTmF2QXJyb3dzKCk7XHJcbiAgICAgIHRoaXMuX3RyaWdnZXIoJ2NoYW5nZVZpZXdNb2RlJywgbmV3IERhdGUodGhpcy52aWV3RGF0ZSkpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHZhciBEYXRlUmFuZ2VQaWNrZXIgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKXtcclxuXHRcdCQuZGF0YShlbGVtZW50LCAnZGF0ZXBpY2tlcicsIHRoaXMpO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaW5wdXRzID0gJC5tYXAob3B0aW9ucy5pbnB1dHMsIGZ1bmN0aW9uKGkpe1xyXG5cdFx0XHRyZXR1cm4gaS5qcXVlcnkgPyBpWzBdIDogaTtcclxuXHRcdH0pO1xyXG5cdFx0ZGVsZXRlIG9wdGlvbnMuaW5wdXRzO1xyXG5cclxuXHRcdHRoaXMua2VlcEVtcHR5VmFsdWVzID0gb3B0aW9ucy5rZWVwRW1wdHlWYWx1ZXM7XHJcblx0XHRkZWxldGUgb3B0aW9ucy5rZWVwRW1wdHlWYWx1ZXM7XHJcblxyXG5cdFx0ZGF0ZXBpY2tlclBsdWdpbi5jYWxsKCQodGhpcy5pbnB1dHMpLCBvcHRpb25zKVxyXG5cdFx0XHQub24oJ2NoYW5nZURhdGUnLCAkLnByb3h5KHRoaXMuZGF0ZVVwZGF0ZWQsIHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLnBpY2tlcnMgPSAkLm1hcCh0aGlzLmlucHV0cywgZnVuY3Rpb24oaSl7XHJcblx0XHRcdHJldHVybiAkLmRhdGEoaSwgJ2RhdGVwaWNrZXInKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy51cGRhdGVEYXRlcygpO1xyXG5cdH07XHJcblx0RGF0ZVJhbmdlUGlja2VyLnByb3RvdHlwZSA9IHtcclxuXHRcdHVwZGF0ZURhdGVzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLmRhdGVzID0gJC5tYXAodGhpcy5waWNrZXJzLCBmdW5jdGlvbihpKXtcclxuXHRcdFx0XHRyZXR1cm4gaS5nZXRVVENEYXRlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVJhbmdlcygpO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZVJhbmdlczogZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHJhbmdlID0gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0cmV0dXJuIGQudmFsdWVPZigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JC5lYWNoKHRoaXMucGlja2VycywgZnVuY3Rpb24oaSwgcCl7XHJcblx0XHRcdFx0cC5zZXRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGRhdGVVcGRhdGVkOiBmdW5jdGlvbihlKXtcclxuXHRcdFx0Ly8gYHRoaXMudXBkYXRpbmdgIGlzIGEgd29ya2Fyb3VuZCBmb3IgcHJldmVudGluZyBpbmZpbml0ZSByZWN1cnNpb25cclxuXHRcdFx0Ly8gYmV0d2VlbiBgY2hhbmdlRGF0ZWAgdHJpZ2dlcmluZyBhbmQgYHNldFVUQ0RhdGVgIGNhbGxpbmcuICBVbnRpbFxyXG5cdFx0XHQvLyB0aGVyZSBpcyBhIGJldHRlciBtZWNoYW5pc20uXHJcblx0XHRcdGlmICh0aGlzLnVwZGF0aW5nKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dGhpcy51cGRhdGluZyA9IHRydWU7XHJcblxyXG5cdFx0XHR2YXIgZHAgPSAkLmRhdGEoZS50YXJnZXQsICdkYXRlcGlja2VyJyk7XHJcblxyXG5cdFx0XHRpZiAoZHAgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG5ld19kYXRlID0gZHAuZ2V0VVRDRGF0ZSgpLFxyXG5cdFx0XHRcdGtlZXBfZW1wdHlfdmFsdWVzID0gdGhpcy5rZWVwRW1wdHlWYWx1ZXMsXHJcblx0XHRcdFx0aSA9ICQuaW5BcnJheShlLnRhcmdldCwgdGhpcy5pbnB1dHMpLFxyXG5cdFx0XHRcdGogPSBpIC0gMSxcclxuXHRcdFx0XHRrID0gaSArIDEsXHJcblx0XHRcdFx0bCA9IHRoaXMuaW5wdXRzLmxlbmd0aDtcclxuXHRcdFx0aWYgKGkgPT09IC0xKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdCQuZWFjaCh0aGlzLnBpY2tlcnMsIGZ1bmN0aW9uKGksIHApe1xyXG5cdFx0XHRcdGlmICghcC5nZXRVVENEYXRlKCkgJiYgKHAgPT09IGRwIHx8ICFrZWVwX2VtcHR5X3ZhbHVlcykpXHJcblx0XHRcdFx0XHRwLnNldFVUQ0RhdGUobmV3X2RhdGUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChuZXdfZGF0ZSA8IHRoaXMuZGF0ZXNbal0pe1xyXG5cdFx0XHRcdC8vIERhdGUgYmVpbmcgbW92ZWQgZWFybGllci9sZWZ0XHJcblx0XHRcdFx0d2hpbGUgKGogPj0gMCAmJiBuZXdfZGF0ZSA8IHRoaXMuZGF0ZXNbal0pe1xyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXJzW2otLV0uc2V0VVRDRGF0ZShuZXdfZGF0ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKG5ld19kYXRlID4gdGhpcy5kYXRlc1trXSl7XHJcblx0XHRcdFx0Ly8gRGF0ZSBiZWluZyBtb3ZlZCBsYXRlci9yaWdodFxyXG5cdFx0XHRcdHdoaWxlIChrIDwgbCAmJiBuZXdfZGF0ZSA+IHRoaXMuZGF0ZXNba10pe1xyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXJzW2srK10uc2V0VVRDRGF0ZShuZXdfZGF0ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudXBkYXRlRGF0ZXMoKTtcclxuXHJcblx0XHRcdGRlbGV0ZSB0aGlzLnVwZGF0aW5nO1xyXG5cdFx0fSxcclxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQubWFwKHRoaXMucGlja2VycywgZnVuY3Rpb24ocCl7IHAuZGVzdHJveSgpOyB9KTtcclxuXHRcdFx0JCh0aGlzLmlucHV0cykub2ZmKCdjaGFuZ2VEYXRlJywgdGhpcy5kYXRlVXBkYXRlZCk7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YSgpLmRhdGVwaWNrZXI7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlOiBhbGlhcygnZGVzdHJveScsICdNZXRob2QgYHJlbW92ZWAgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMi4wLiBVc2UgYGRlc3Ryb3lgIGluc3RlYWQnKVxyXG5cdH07XHJcblxyXG5cdGZ1bmN0aW9uIG9wdHNfZnJvbV9lbChlbCwgcHJlZml4KXtcclxuXHRcdC8vIERlcml2ZSBvcHRpb25zIGZyb20gZWxlbWVudCBkYXRhLWF0dHJzXHJcblx0XHR2YXIgZGF0YSA9ICQoZWwpLmRhdGEoKSxcclxuXHRcdFx0b3V0ID0ge30sIGlua2V5LFxyXG5cdFx0XHRyZXBsYWNlID0gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICcoW0EtWl0pJyk7XHJcblx0XHRwcmVmaXggPSBuZXcgUmVnRXhwKCdeJyArIHByZWZpeC50b0xvd2VyQ2FzZSgpKTtcclxuXHRcdGZ1bmN0aW9uIHJlX2xvd2VyKF8sYSl7XHJcblx0XHRcdHJldHVybiBhLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBrZXkgaW4gZGF0YSlcclxuXHRcdFx0aWYgKHByZWZpeC50ZXN0KGtleSkpe1xyXG5cdFx0XHRcdGlua2V5ID0ga2V5LnJlcGxhY2UocmVwbGFjZSwgcmVfbG93ZXIpO1xyXG5cdFx0XHRcdG91dFtpbmtleV0gPSBkYXRhW2tleV07XHJcblx0XHRcdH1cclxuXHRcdHJldHVybiBvdXQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBvcHRzX2Zyb21fbG9jYWxlKGxhbmcpe1xyXG5cdFx0Ly8gRGVyaXZlIG9wdGlvbnMgZnJvbSBsb2NhbGUgcGx1Z2luc1xyXG5cdFx0dmFyIG91dCA9IHt9O1xyXG5cdFx0Ly8gQ2hlY2sgaWYgXCJkZS1ERVwiIHN0eWxlIGRhdGUgaXMgYXZhaWxhYmxlLCBpZiBub3QgbGFuZ3VhZ2Ugc2hvdWxkXHJcblx0XHQvLyBmYWxsYmFjayB0byAyIGxldHRlciBjb2RlIGVnIFwiZGVcIlxyXG5cdFx0aWYgKCFkYXRlc1tsYW5nXSl7XHJcblx0XHRcdGxhbmcgPSBsYW5nLnNwbGl0KCctJylbMF07XHJcblx0XHRcdGlmICghZGF0ZXNbbGFuZ10pXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBkYXRlc1tsYW5nXTtcclxuXHRcdCQuZWFjaChsb2NhbGVfb3B0cywgZnVuY3Rpb24oaSxrKXtcclxuXHRcdFx0aWYgKGsgaW4gZClcclxuXHRcdFx0XHRvdXRba10gPSBkW2tdO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH1cclxuXHJcblx0dmFyIG9sZCA9ICQuZm4uZGF0ZXBpY2tlcjtcclxuXHR2YXIgZGF0ZXBpY2tlclBsdWdpbiA9IGZ1bmN0aW9uKG9wdGlvbil7XHJcblx0XHR2YXIgYXJncyA9IEFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcblx0XHRhcmdzLnNoaWZ0KCk7XHJcblx0XHR2YXIgaW50ZXJuYWxfcmV0dXJuO1xyXG5cdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0ZGF0YSA9ICR0aGlzLmRhdGEoJ2RhdGVwaWNrZXInKSxcclxuXHRcdFx0XHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PT0gJ29iamVjdCcgJiYgb3B0aW9uO1xyXG5cdFx0XHRpZiAoIWRhdGEpe1xyXG5cdFx0XHRcdHZhciBlbG9wdHMgPSBvcHRzX2Zyb21fZWwodGhpcywgJ2RhdGUnKSxcclxuXHRcdFx0XHRcdC8vIFByZWxpbWluYXJ5IG90aW9uc1xyXG5cdFx0XHRcdFx0eG9wdHMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGVsb3B0cywgb3B0aW9ucyksXHJcblx0XHRcdFx0XHRsb2NvcHRzID0gb3B0c19mcm9tX2xvY2FsZSh4b3B0cy5sYW5ndWFnZSksXHJcblx0XHRcdFx0XHQvLyBPcHRpb25zIHByaW9yaXR5OiBqcyBhcmdzLCBkYXRhLWF0dHJzLCBsb2NhbGVzLCBkZWZhdWx0c1xyXG5cdFx0XHRcdFx0b3B0cyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgbG9jb3B0cywgZWxvcHRzLCBvcHRpb25zKTtcclxuXHRcdFx0XHRpZiAoJHRoaXMuaGFzQ2xhc3MoJ2lucHV0LWRhdGVyYW5nZScpIHx8IG9wdHMuaW5wdXRzKXtcclxuXHRcdFx0XHRcdCQuZXh0ZW5kKG9wdHMsIHtcclxuXHRcdFx0XHRcdFx0aW5wdXRzOiBvcHRzLmlucHV0cyB8fCAkdGhpcy5maW5kKCdpbnB1dCcpLnRvQXJyYXkoKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRkYXRhID0gbmV3IERhdGVSYW5nZVBpY2tlcih0aGlzLCBvcHRzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRkYXRhID0gbmV3IERhdGVwaWNrZXIodGhpcywgb3B0cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCR0aGlzLmRhdGEoJ2RhdGVwaWNrZXInLCBkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGRhdGFbb3B0aW9uXSA9PT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdFx0aW50ZXJuYWxfcmV0dXJuID0gZGF0YVtvcHRpb25dLmFwcGx5KGRhdGEsIGFyZ3MpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdGludGVybmFsX3JldHVybiA9PT0gdW5kZWZpbmVkIHx8XHJcblx0XHRcdGludGVybmFsX3JldHVybiBpbnN0YW5jZW9mIERhdGVwaWNrZXIgfHxcclxuXHRcdFx0aW50ZXJuYWxfcmV0dXJuIGluc3RhbmNlb2YgRGF0ZVJhbmdlUGlja2VyXHJcblx0XHQpXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHRcdGlmICh0aGlzLmxlbmd0aCA+IDEpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignVXNpbmcgb25seSBhbGxvd2VkIGZvciB0aGUgY29sbGVjdGlvbiBvZiBhIHNpbmdsZSBlbGVtZW50ICgnICsgb3B0aW9uICsgJyBmdW5jdGlvbiknKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIGludGVybmFsX3JldHVybjtcclxuXHR9O1xyXG5cdCQuZm4uZGF0ZXBpY2tlciA9IGRhdGVwaWNrZXJQbHVnaW47XHJcblxyXG5cdHZhciBkZWZhdWx0cyA9ICQuZm4uZGF0ZXBpY2tlci5kZWZhdWx0cyA9IHtcclxuXHRcdGFzc3VtZU5lYXJieVllYXI6IGZhbHNlLFxyXG5cdFx0YXV0b2Nsb3NlOiBmYWxzZSxcclxuXHRcdGJlZm9yZVNob3dEYXk6ICQubm9vcCxcclxuXHRcdGJlZm9yZVNob3dNb250aDogJC5ub29wLFxyXG5cdFx0YmVmb3JlU2hvd1llYXI6ICQubm9vcCxcclxuXHRcdGJlZm9yZVNob3dEZWNhZGU6ICQubm9vcCxcclxuXHRcdGJlZm9yZVNob3dDZW50dXJ5OiAkLm5vb3AsXHJcblx0XHRjYWxlbmRhcldlZWtzOiBmYWxzZSxcclxuXHRcdGNsZWFyQnRuOiBmYWxzZSxcclxuXHRcdHRvZ2dsZUFjdGl2ZTogZmFsc2UsXHJcblx0XHRkYXlzT2ZXZWVrRGlzYWJsZWQ6IFtdLFxyXG5cdFx0ZGF5c09mV2Vla0hpZ2hsaWdodGVkOiBbXSxcclxuXHRcdGRhdGVzRGlzYWJsZWQ6IFtdLFxyXG5cdFx0ZW5kRGF0ZTogSW5maW5pdHksXHJcblx0XHRmb3JjZVBhcnNlOiB0cnVlLFxyXG5cdFx0Zm9ybWF0OiAnbW0vZGQveXl5eScsXHJcblx0XHRrZWVwRW1wdHlWYWx1ZXM6IGZhbHNlLFxyXG5cdFx0a2V5Ym9hcmROYXZpZ2F0aW9uOiB0cnVlLFxyXG5cdFx0bGFuZ3VhZ2U6ICdlbicsXHJcblx0XHRtaW5WaWV3TW9kZTogMCxcclxuXHRcdG1heFZpZXdNb2RlOiA0LFxyXG5cdFx0bXVsdGlkYXRlOiBmYWxzZSxcclxuXHRcdG11bHRpZGF0ZVNlcGFyYXRvcjogJywnLFxyXG5cdFx0b3JpZW50YXRpb246IFwiYXV0b1wiLFxyXG5cdFx0cnRsOiBmYWxzZSxcclxuXHRcdHN0YXJ0RGF0ZTogLUluZmluaXR5LFxyXG5cdFx0c3RhcnRWaWV3OiAwLFxyXG5cdFx0dG9kYXlCdG46IGZhbHNlLFxyXG5cdFx0dG9kYXlIaWdobGlnaHQ6IGZhbHNlLFxyXG5cdFx0dXBkYXRlVmlld0RhdGU6IHRydWUsXHJcblx0XHR3ZWVrU3RhcnQ6IDAsXHJcblx0XHRkaXNhYmxlVG91Y2hLZXlib2FyZDogZmFsc2UsXHJcblx0XHRlbmFibGVPblJlYWRvbmx5OiB0cnVlLFxyXG5cdFx0c2hvd09uRm9jdXM6IHRydWUsXHJcblx0XHR6SW5kZXhPZmZzZXQ6IDEwLFxyXG5cdFx0Y29udGFpbmVyOiAnYm9keScsXHJcblx0XHRpbW1lZGlhdGVVcGRhdGVzOiBmYWxzZSxcclxuXHRcdHRpdGxlOiAnJyxcclxuXHRcdHRlbXBsYXRlczoge1xyXG5cdFx0XHRsZWZ0QXJyb3c6ICcmI3gwMEFCOycsXHJcblx0XHRcdHJpZ2h0QXJyb3c6ICcmI3gwMEJCOydcclxuXHRcdH0sXHJcbiAgICBzaG93V2Vla0RheXM6IHRydWVcclxuXHR9O1xyXG5cdHZhciBsb2NhbGVfb3B0cyA9ICQuZm4uZGF0ZXBpY2tlci5sb2NhbGVfb3B0cyA9IFtcclxuXHRcdCdmb3JtYXQnLFxyXG5cdFx0J3J0bCcsXHJcblx0XHQnd2Vla1N0YXJ0J1xyXG5cdF07XHJcblx0JC5mbi5kYXRlcGlja2VyLkNvbnN0cnVjdG9yID0gRGF0ZXBpY2tlcjtcclxuXHR2YXIgZGF0ZXMgPSAkLmZuLmRhdGVwaWNrZXIuZGF0ZXMgPSB7XHJcblx0XHRlbjoge1xyXG5cdFx0XHRkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcclxuXHRcdFx0ZGF5c1Nob3J0OiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXHJcblx0XHRcdGRheXNNaW46IFtcIlN1XCIsIFwiTW9cIiwgXCJUdVwiLCBcIldlXCIsIFwiVGhcIiwgXCJGclwiLCBcIlNhXCJdLFxyXG5cdFx0XHRtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxyXG5cdFx0XHRtb250aHNTaG9ydDogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdLFxyXG5cdFx0XHR0b2RheTogXCJUb2RheVwiLFxyXG5cdFx0XHRjbGVhcjogXCJDbGVhclwiLFxyXG5cdFx0XHR0aXRsZUZvcm1hdDogXCJNTSB5eXl5XCJcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR2YXIgRFBHbG9iYWwgPSB7XHJcblx0XHR2aWV3TW9kZXM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG5hbWVzOiBbJ2RheXMnLCAnbW9udGgnXSxcclxuXHRcdFx0XHRjbHNOYW1lOiAnZGF5cycsXHJcblx0XHRcdFx0ZTogJ2NoYW5nZU1vbnRoJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bmFtZXM6IFsnbW9udGhzJywgJ3llYXInXSxcclxuXHRcdFx0XHRjbHNOYW1lOiAnbW9udGhzJyxcclxuXHRcdFx0XHRlOiAnY2hhbmdlWWVhcicsXHJcblx0XHRcdFx0bmF2U3RlcDogMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bmFtZXM6IFsneWVhcnMnLCAnZGVjYWRlJ10sXHJcblx0XHRcdFx0Y2xzTmFtZTogJ3llYXJzJyxcclxuXHRcdFx0XHRlOiAnY2hhbmdlRGVjYWRlJyxcclxuXHRcdFx0XHRuYXZTdGVwOiAxMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bmFtZXM6IFsnZGVjYWRlcycsICdjZW50dXJ5J10sXHJcblx0XHRcdFx0Y2xzTmFtZTogJ2RlY2FkZXMnLFxyXG5cdFx0XHRcdGU6ICdjaGFuZ2VDZW50dXJ5JyxcclxuXHRcdFx0XHRuYXZTdGVwOiAxMDBcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG5hbWVzOiBbJ2NlbnR1cmllcycsICdtaWxsZW5uaXVtJ10sXHJcblx0XHRcdFx0Y2xzTmFtZTogJ2NlbnR1cmllcycsXHJcblx0XHRcdFx0ZTogJ2NoYW5nZU1pbGxlbm5pdW0nLFxyXG5cdFx0XHRcdG5hdlN0ZXA6IDEwMDBcclxuXHRcdFx0fVxyXG5cdFx0XSxcclxuXHRcdHZhbGlkUGFydHM6IC9kZD98REQ/fG1tP3xNTT98eXkoPzp5eSk/L2csXHJcblx0XHRub25wdW5jdHVhdGlvbjogL1teIC1cXC86LUBcXHU1ZTc0XFx1NjcwOFxcdTY1ZTVcXFstYHstflxcdFxcblxccl0rL2csXHJcblx0XHRwYXJzZUZvcm1hdDogZnVuY3Rpb24oZm9ybWF0KXtcclxuXHRcdFx0aWYgKHR5cGVvZiBmb3JtYXQudG9WYWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZm9ybWF0LnRvRGlzcGxheSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgICAgIC8vIElFIHRyZWF0cyBcXDAgYXMgYSBzdHJpbmcgZW5kIGluIGlucHV0cyAodHJ1bmNhdGluZyB0aGUgdmFsdWUpLFxyXG5cdFx0XHQvLyBzbyBpdCdzIGEgYmFkIGZvcm1hdCBkZWxpbWl0ZXIsIGFueXdheVxyXG5cdFx0XHR2YXIgc2VwYXJhdG9ycyA9IGZvcm1hdC5yZXBsYWNlKHRoaXMudmFsaWRQYXJ0cywgJ1xcMCcpLnNwbGl0KCdcXDAnKSxcclxuXHRcdFx0XHRwYXJ0cyA9IGZvcm1hdC5tYXRjaCh0aGlzLnZhbGlkUGFydHMpO1xyXG5cdFx0XHRpZiAoIXNlcGFyYXRvcnMgfHwgIXNlcGFyYXRvcnMubGVuZ3RoIHx8ICFwYXJ0cyB8fCBwYXJ0cy5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQuXCIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB7c2VwYXJhdG9yczogc2VwYXJhdG9ycywgcGFydHM6IHBhcnRzfTtcclxuXHRcdH0sXHJcblx0XHRwYXJzZURhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2UsIGFzc3VtZU5lYXJieSl7XHJcblx0XHRcdGlmICghZGF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0XHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXHJcblx0XHRcdFx0cmV0dXJuIGRhdGU7XHJcblx0XHRcdGlmICh0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJylcclxuXHRcdFx0XHRmb3JtYXQgPSBEUEdsb2JhbC5wYXJzZUZvcm1hdChmb3JtYXQpO1xyXG5cdFx0XHRpZiAoZm9ybWF0LnRvVmFsdWUpXHJcblx0XHRcdFx0cmV0dXJuIGZvcm1hdC50b1ZhbHVlKGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2UpO1xyXG5cdFx0XHR2YXIgZm5fbWFwID0ge1xyXG5cdFx0XHRcdFx0ZDogJ21vdmVEYXknLFxyXG5cdFx0XHRcdFx0bTogJ21vdmVNb250aCcsXHJcblx0XHRcdFx0XHR3OiAnbW92ZVdlZWsnLFxyXG5cdFx0XHRcdFx0eTogJ21vdmVZZWFyJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGF0ZUFsaWFzZXMgPSB7XHJcblx0XHRcdFx0XHR5ZXN0ZXJkYXk6ICctMWQnLFxyXG5cdFx0XHRcdFx0dG9kYXk6ICcrMGQnLFxyXG5cdFx0XHRcdFx0dG9tb3Jyb3c6ICcrMWQnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwYXJ0cywgcGFydCwgZGlyLCBpLCBmbjtcclxuXHRcdFx0aWYgKGRhdGUgaW4gZGF0ZUFsaWFzZXMpe1xyXG5cdFx0XHRcdGRhdGUgPSBkYXRlQWxpYXNlc1tkYXRlXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoL15bXFwtK11cXGQrW2Rtd3ldKFtcXHMsXStbXFwtK11cXGQrW2Rtd3ldKSokL2kudGVzdChkYXRlKSl7XHJcblx0XHRcdFx0cGFydHMgPSBkYXRlLm1hdGNoKC8oW1xcLStdXFxkKykoW2Rtd3ldKS9naSk7XHJcblx0XHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdFx0Zm9yIChpPTA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRwYXJ0ID0gcGFydHNbaV0ubWF0Y2goLyhbXFwtK11cXGQrKShbZG13eV0pL2kpO1xyXG5cdFx0XHRcdFx0ZGlyID0gTnVtYmVyKHBhcnRbMV0pO1xyXG5cdFx0XHRcdFx0Zm4gPSBmbl9tYXBbcGFydFsyXS50b0xvd2VyQ2FzZSgpXTtcclxuXHRcdFx0XHRcdGRhdGUgPSBEYXRlcGlja2VyLnByb3RvdHlwZVtmbl0oZGF0ZSwgZGlyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIERhdGVwaWNrZXIucHJvdG90eXBlLl96ZXJvX3V0Y190aW1lKGRhdGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwYXJ0cyA9IGRhdGUgJiYgZGF0ZS5tYXRjaCh0aGlzLm5vbnB1bmN0dWF0aW9uKSB8fCBbXTtcclxuXHJcblx0XHRcdGZ1bmN0aW9uIGFwcGx5TmVhcmJ5WWVhcih5ZWFyLCB0aHJlc2hvbGQpe1xyXG5cdFx0XHRcdGlmICh0aHJlc2hvbGQgPT09IHRydWUpXHJcblx0XHRcdFx0XHR0aHJlc2hvbGQgPSAxMDtcclxuXHJcblx0XHRcdFx0Ly8gaWYgeWVhciBpcyAyIGRpZ2l0cyBvciBsZXNzLCB0aGFuIHRoZSB1c2VyIG1vc3QgbGlrZWx5IGlzIHRyeWluZyB0byBnZXQgYSByZWNlbnQgY2VudHVyeVxyXG5cdFx0XHRcdGlmICh5ZWFyIDwgMTAwKXtcclxuXHRcdFx0XHRcdHllYXIgKz0gMjAwMDtcclxuXHRcdFx0XHRcdC8vIGlmIHRoZSBuZXcgeWVhciBpcyBtb3JlIHRoYW4gdGhyZXNob2xkIHllYXJzIGluIGFkdmFuY2UsIHVzZSBsYXN0IGNlbnR1cnlcclxuXHRcdFx0XHRcdGlmICh5ZWFyID4gKChuZXcgRGF0ZSgpKS5nZXRGdWxsWWVhcigpK3RocmVzaG9sZCkpe1xyXG5cdFx0XHRcdFx0XHR5ZWFyIC09IDEwMDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB5ZWFyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcGFyc2VkID0ge30sXHJcblx0XHRcdFx0c2V0dGVyc19vcmRlciA9IFsneXl5eScsICd5eScsICdNJywgJ01NJywgJ20nLCAnbW0nLCAnZCcsICdkZCddLFxyXG5cdFx0XHRcdHNldHRlcnNfbWFwID0ge1xyXG5cdFx0XHRcdFx0eXl5eTogZnVuY3Rpb24oZCx2KXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGQuc2V0VVRDRnVsbFllYXIoYXNzdW1lTmVhcmJ5ID8gYXBwbHlOZWFyYnlZZWFyKHYsIGFzc3VtZU5lYXJieSkgOiB2KTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRtOiBmdW5jdGlvbihkLHYpe1xyXG5cdFx0XHRcdFx0XHRpZiAoaXNOYU4oZCkpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGQ7XHJcblx0XHRcdFx0XHRcdHYgLT0gMTtcclxuXHRcdFx0XHRcdFx0d2hpbGUgKHYgPCAwKSB2ICs9IDEyO1xyXG5cdFx0XHRcdFx0XHR2ICU9IDEyO1xyXG5cdFx0XHRcdFx0XHRkLnNldFVUQ01vbnRoKHYpO1xyXG5cdFx0XHRcdFx0XHR3aGlsZSAoZC5nZXRVVENNb250aCgpICE9PSB2KVxyXG5cdFx0XHRcdFx0XHRcdGQuc2V0VVRDRGF0ZShkLmdldFVUQ0RhdGUoKS0xKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGQ7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZDogZnVuY3Rpb24oZCx2KXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGQuc2V0VVRDRGF0ZSh2KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHZhbCwgZmlsdGVyZWQ7XHJcblx0XHRcdHNldHRlcnNfbWFwWyd5eSddID0gc2V0dGVyc19tYXBbJ3l5eXknXTtcclxuXHRcdFx0c2V0dGVyc19tYXBbJ00nXSA9IHNldHRlcnNfbWFwWydNTSddID0gc2V0dGVyc19tYXBbJ21tJ10gPSBzZXR0ZXJzX21hcFsnbSddO1xyXG5cdFx0XHRzZXR0ZXJzX21hcFsnZGQnXSA9IHNldHRlcnNfbWFwWydkJ107XHJcblx0XHRcdGRhdGUgPSBVVENUb2RheSgpO1xyXG5cdFx0XHR2YXIgZnBhcnRzID0gZm9ybWF0LnBhcnRzLnNsaWNlKCk7XHJcblx0XHRcdC8vIFJlbW92ZSBub29wIHBhcnRzXHJcblx0XHRcdGlmIChwYXJ0cy5sZW5ndGggIT09IGZwYXJ0cy5sZW5ndGgpe1xyXG5cdFx0XHRcdGZwYXJ0cyA9ICQoZnBhcnRzKS5maWx0ZXIoZnVuY3Rpb24oaSxwKXtcclxuXHRcdFx0XHRcdHJldHVybiAkLmluQXJyYXkocCwgc2V0dGVyc19vcmRlcikgIT09IC0xO1xyXG5cdFx0XHRcdH0pLnRvQXJyYXkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBQcm9jZXNzIHJlbWFpbmRlclxyXG5cdFx0XHRmdW5jdGlvbiBtYXRjaF9wYXJ0KCl7XHJcblx0XHRcdFx0dmFyIG0gPSB0aGlzLnNsaWNlKDAsIHBhcnRzW2ldLmxlbmd0aCksXHJcblx0XHRcdFx0XHRwID0gcGFydHNbaV0uc2xpY2UoMCwgbS5sZW5ndGgpO1xyXG5cdFx0XHRcdHJldHVybiBtLnRvTG93ZXJDYXNlKCkgPT09IHAudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocGFydHMubGVuZ3RoID09PSBmcGFydHMubGVuZ3RoKXtcclxuXHRcdFx0XHR2YXIgY250O1xyXG5cdFx0XHRcdGZvciAoaT0wLCBjbnQgPSBmcGFydHMubGVuZ3RoOyBpIDwgY250OyBpKyspe1xyXG5cdFx0XHRcdFx0dmFsID0gcGFyc2VJbnQocGFydHNbaV0sIDEwKTtcclxuXHRcdFx0XHRcdHBhcnQgPSBmcGFydHNbaV07XHJcblx0XHRcdFx0XHRpZiAoaXNOYU4odmFsKSl7XHJcblx0XHRcdFx0XHRcdHN3aXRjaCAocGFydCl7XHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAnTU0nOlxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsdGVyZWQgPSAkKGRhdGVzW2xhbmd1YWdlXS5tb250aHMpLmZpbHRlcihtYXRjaF9wYXJ0KTtcclxuXHRcdFx0XHRcdFx0XHRcdHZhbCA9ICQuaW5BcnJheShmaWx0ZXJlZFswXSwgZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRocykgKyAxO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAnTSc6XHJcblx0XHRcdFx0XHRcdFx0XHRmaWx0ZXJlZCA9ICQoZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRoc1Nob3J0KS5maWx0ZXIobWF0Y2hfcGFydCk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YWwgPSAkLmluQXJyYXkoZmlsdGVyZWRbMF0sIGRhdGVzW2xhbmd1YWdlXS5tb250aHNTaG9ydCkgKyAxO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHBhcnNlZFtwYXJ0XSA9IHZhbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIF9kYXRlLCBzO1xyXG5cdFx0XHRcdGZvciAoaT0wOyBpIDwgc2V0dGVyc19vcmRlci5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRzID0gc2V0dGVyc19vcmRlcltpXTtcclxuXHRcdFx0XHRcdGlmIChzIGluIHBhcnNlZCAmJiAhaXNOYU4ocGFyc2VkW3NdKSl7XHJcblx0XHRcdFx0XHRcdF9kYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblx0XHRcdFx0XHRcdHNldHRlcnNfbWFwW3NdKF9kYXRlLCBwYXJzZWRbc10pO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWlzTmFOKF9kYXRlKSlcclxuXHRcdFx0XHRcdFx0XHRkYXRlID0gX2RhdGU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBkYXRlO1xyXG5cdFx0fSxcclxuXHRcdGZvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2Upe1xyXG5cdFx0XHRpZiAoIWRhdGUpXHJcblx0XHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0XHRpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycpXHJcblx0XHRcdFx0Zm9ybWF0ID0gRFBHbG9iYWwucGFyc2VGb3JtYXQoZm9ybWF0KTtcclxuXHRcdFx0aWYgKGZvcm1hdC50b0Rpc3BsYXkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LnRvRGlzcGxheShkYXRlLCBmb3JtYXQsIGxhbmd1YWdlKTtcclxuICAgICAgICAgICAgdmFyIHZhbCA9IHtcclxuXHRcdFx0XHRkOiBkYXRlLmdldFVUQ0RhdGUoKSxcclxuXHRcdFx0XHREOiBkYXRlc1tsYW5ndWFnZV0uZGF5c1Nob3J0W2RhdGUuZ2V0VVRDRGF5KCldLFxyXG5cdFx0XHRcdEREOiBkYXRlc1tsYW5ndWFnZV0uZGF5c1tkYXRlLmdldFVUQ0RheSgpXSxcclxuXHRcdFx0XHRtOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLFxyXG5cdFx0XHRcdE06IGRhdGVzW2xhbmd1YWdlXS5tb250aHNTaG9ydFtkYXRlLmdldFVUQ01vbnRoKCldLFxyXG5cdFx0XHRcdE1NOiBkYXRlc1tsYW5ndWFnZV0ubW9udGhzW2RhdGUuZ2V0VVRDTW9udGgoKV0sXHJcblx0XHRcdFx0eXk6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cmluZygyKSxcclxuXHRcdFx0XHR5eXl5OiBkYXRlLmdldFVUQ0Z1bGxZZWFyKClcclxuXHRcdFx0fTtcclxuXHRcdFx0dmFsLmRkID0gKHZhbC5kIDwgMTAgPyAnMCcgOiAnJykgKyB2YWwuZDtcclxuXHRcdFx0dmFsLm1tID0gKHZhbC5tIDwgMTAgPyAnMCcgOiAnJykgKyB2YWwubTtcclxuXHRcdFx0ZGF0ZSA9IFtdO1xyXG5cdFx0XHR2YXIgc2VwcyA9ICQuZXh0ZW5kKFtdLCBmb3JtYXQuc2VwYXJhdG9ycyk7XHJcblx0XHRcdGZvciAodmFyIGk9MCwgY250ID0gZm9ybWF0LnBhcnRzLmxlbmd0aDsgaSA8PSBjbnQ7IGkrKyl7XHJcblx0XHRcdFx0aWYgKHNlcHMubGVuZ3RoKVxyXG5cdFx0XHRcdFx0ZGF0ZS5wdXNoKHNlcHMuc2hpZnQoKSk7XHJcblx0XHRcdFx0ZGF0ZS5wdXNoKHZhbFtmb3JtYXQucGFydHNbaV1dKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZGF0ZS5qb2luKCcnKTtcclxuXHRcdH0sXHJcblx0XHRoZWFkVGVtcGxhdGU6ICc8dGhlYWQ+JytcclxuXHRcdFx0ICAgICAgICAgICAgICAnPHRyPicrXHJcblx0XHRcdCAgICAgICAgICAgICAgICAnPHRoIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJkYXRlcGlja2VyLXRpdGxlXCI+PC90aD4nK1xyXG5cdFx0XHQgICAgICAgICAgICAgICc8L3RyPicrXHJcblx0XHRcdFx0XHRcdFx0Jzx0cj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0aCBjbGFzcz1cInByZXZcIj4nK2RlZmF1bHRzLnRlbXBsYXRlcy5sZWZ0QXJyb3crJzwvdGg+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGggY29sc3Bhbj1cIjVcIiBjbGFzcz1cImRhdGVwaWNrZXItc3dpdGNoXCI+PC90aD4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0aCBjbGFzcz1cIm5leHRcIj4nK2RlZmF1bHRzLnRlbXBsYXRlcy5yaWdodEFycm93Kyc8L3RoPicrXHJcblx0XHRcdFx0XHRcdFx0JzwvdHI+JytcclxuXHRcdFx0XHRcdFx0JzwvdGhlYWQ+JyxcclxuXHRcdGNvbnRUZW1wbGF0ZTogJzx0Ym9keT48dHI+PHRkIGNvbHNwYW49XCI3XCI+PC90ZD48L3RyPjwvdGJvZHk+JyxcclxuXHRcdGZvb3RUZW1wbGF0ZTogJzx0Zm9vdD4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8dHI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGggY29sc3Bhbj1cIjdcIiBjbGFzcz1cInRvZGF5XCI+PC90aD4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L3RyPicrXHJcblx0XHRcdFx0XHRcdFx0Jzx0cj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0aCBjb2xzcGFuPVwiN1wiIGNsYXNzPVwiY2xlYXJcIj48L3RoPicrXHJcblx0XHRcdFx0XHRcdFx0JzwvdHI+JytcclxuXHRcdFx0XHRcdFx0JzwvdGZvb3Q+J1xyXG5cdH07XHJcblx0RFBHbG9iYWwudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kYXlzXCI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGFibGUgY2xhc3M9XCJ0YWJsZS1jb25kZW5zZWRcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8dGJvZHk+PC90Ym9keT4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1tb250aHNcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuY29udFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci15ZWFyc1wiPicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+JytcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuaGVhZFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5jb250VGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmZvb3RUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdCc8L3RhYmxlPicrXHJcblx0XHRcdFx0XHRcdFx0JzwvZGl2PicrXHJcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWRlY2FkZXNcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuY29udFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1jZW50dXJpZXNcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuY29udFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+JztcclxuXHJcblx0JC5mbi5kYXRlcGlja2VyLkRQR2xvYmFsID0gRFBHbG9iYWw7XHJcblxyXG5cclxuXHQvKiBEQVRFUElDS0VSIE5PIENPTkZMSUNUXHJcblx0KiA9PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdCQuZm4uZGF0ZXBpY2tlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdCQuZm4uZGF0ZXBpY2tlciA9IG9sZDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qIERBVEVQSUNLRVIgVkVSU0lPTlxyXG5cdCAqID09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmZuLmRhdGVwaWNrZXIudmVyc2lvbiA9ICcxLjcuMSc7XHJcblxyXG5cdCQuZm4uZGF0ZXBpY2tlci5kZXByZWNhdGVkID0gZnVuY3Rpb24obXNnKXtcclxuXHRcdHZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XHJcblx0XHRpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKCdERVBSRUNBVEVEOiAnICsgbXNnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHJcblx0LyogREFURVBJQ0tFUiBEQVRBLUFQSVxyXG5cdCogPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKFxyXG5cdFx0J2ZvY3VzLmRhdGVwaWNrZXIuZGF0YS1hcGkgY2xpY2suZGF0ZXBpY2tlci5kYXRhLWFwaScsXHJcblx0XHQnW2RhdGEtcHJvdmlkZT1cImRhdGVwaWNrZXJcIl0nLFxyXG5cdFx0ZnVuY3Rpb24oZSl7XHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdGlmICgkdGhpcy5kYXRhKCdkYXRlcGlja2VyJykpXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdC8vIGNvbXBvbmVudCBjbGljayByZXF1aXJlcyB1cyB0byBleHBsaWNpdGx5IHNob3cgaXRcclxuXHRcdFx0ZGF0ZXBpY2tlclBsdWdpbi5jYWxsKCR0aGlzLCAnc2hvdycpO1xyXG5cdFx0fVxyXG5cdCk7XHJcblx0JChmdW5jdGlvbigpe1xyXG5cdFx0ZGF0ZXBpY2tlclBsdWdpbi5jYWxsKCQoJ1tkYXRhLXByb3ZpZGU9XCJkYXRlcGlja2VyLWlubGluZVwiXScpKTtcclxuXHR9KTtcclxuXHJcbn0pKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAzIl0sInNvdXJjZVJvb3QiOiIifQ==