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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvUmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9mcmVlRGF5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qcyJdLCJuYW1lcyI6WyIkIiwiZGF0ZXBpY2tlciIsImF1dG9jbG9zZSIsImZvcm1hdCIsImRhdGVzRGlzYWJsZWQiLCJKU09OIiwicGFyc2UiLCJhcnJheSIsImRheXNPZldlZWtEaXNhYmxlZCIsInRvZGF5SGlnaGxpZ2h0IiwibWluRGF0ZSIsIm9uIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBQUEsQ0FBRSxZQUFZO0FBQ1ZBLHlCQUFBLDhDQUFBQSxDQUFFLGtCQUFGLEVBQXNCQyxVQUF0QixDQUFpQztBQUNSQyw2REFBVyxJQURILEVBQ1k7QUFDcEJDLDBEQUFRLFlBRkE7QUFHUkMsaUVBQWVDLEtBQUtDLEtBQUwsQ0FBV0MsS0FBWCxDQUhQO0FBSVJDLHNFQUFvQixJQUpaO0FBS1JDLGtFQUFnQixJQUxSO0FBTVJDLDJEQUFTOztBQU5ELDBCQUFqQyxFQVVzQkMsRUFWdEIsQ0FVeUIsWUFWekIsRUFVdUMsVUFBVUMsQ0FBVixFQUFhLENBQzlCLENBWHRCO0FBWUgsQ0FiRCxFOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CO0FBQ3BCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHVDQUF1QztBQUNqRTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDBCQUEwQiw2Q0FBNkM7QUFDdkU7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwwQkFBMEIsNkJBQTZCO0FBQ3ZEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxzQ0FBc0MsMEJBQTBCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsbUNBQW1DLGFBQWEsRUFBRTtBQUNsRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixDQUFDIiwiZmlsZSI6ImZyZWVEYXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdib290c3RyYXAtc2Fzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwLWRhdGVwaWNrZXInO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjZGF0ZXRpbWVwaWNrZXI1JykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2Nsb3NlOiB0cnVlLCAgICAvLyBJdCBpcyBmYWxzZSwgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ21tL2RkL3l5eXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IEpTT04ucGFyc2UoYXJyYXkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheXNPZldlZWtEaXNhYmxlZDogJzA2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiAwXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ2NoYW5nZURhdGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvUmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9mcmVlRGF5cy5qcyIsIi8qIVxyXG4gKiBEYXRlcGlja2VyIGZvciBCb290c3RyYXAgdjEuNy4xIChodHRwczovL2dpdGh1Yi5jb20vdXhzb2x1dGlvbnMvYm9vdHN0cmFwLWRhdGVwaWNrZXIpXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSB2Mi4wIChodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjApXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKGZhY3Rvcnkpe1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XHJcbiAgICB9XHJcbn0oZnVuY3Rpb24oJCwgdW5kZWZpbmVkKXtcclxuXHRmdW5jdGlvbiBVVENEYXRlKCl7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkoRGF0ZSwgYXJndW1lbnRzKSk7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIFVUQ1RvZGF5KCl7XHJcblx0XHR2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0cmV0dXJuIFVUQ0RhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gaXNVVENFcXVhbHMoZGF0ZTEsIGRhdGUyKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHRkYXRlMS5nZXRVVENGdWxsWWVhcigpID09PSBkYXRlMi5nZXRVVENGdWxsWWVhcigpICYmXHJcblx0XHRcdGRhdGUxLmdldFVUQ01vbnRoKCkgPT09IGRhdGUyLmdldFVUQ01vbnRoKCkgJiZcclxuXHRcdFx0ZGF0ZTEuZ2V0VVRDRGF0ZSgpID09PSBkYXRlMi5nZXRVVENEYXRlKClcclxuXHRcdCk7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGFsaWFzKG1ldGhvZCwgZGVwcmVjYXRpb25Nc2cpe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmIChkZXByZWNhdGlvbk1zZyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0JC5mbi5kYXRlcGlja2VyLmRlcHJlY2F0ZWQoZGVwcmVjYXRpb25Nc2cpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHRmdW5jdGlvbiBpc1ZhbGlkRGF0ZShkKSB7XHJcblx0XHRyZXR1cm4gZCAmJiAhaXNOYU4oZC5nZXRUaW1lKCkpO1xyXG5cdH1cclxuXHJcblx0dmFyIERhdGVBcnJheSA9IChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGV4dHJhcyA9IHtcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbihpKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zbGljZShpKVswXTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y29udGFpbnM6IGZ1bmN0aW9uKGQpe1xyXG5cdFx0XHRcdC8vIEFycmF5LmluZGV4T2YgaXMgbm90IGNyb3NzLWJyb3dzZXI7XHJcblx0XHRcdFx0Ly8gJC5pbkFycmF5IGRvZXNuJ3Qgd29yayB3aXRoIERhdGVzXHJcblx0XHRcdFx0dmFyIHZhbCA9IGQgJiYgZC52YWx1ZU9mKCk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaT0wLCBsPXRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKVxyXG4gICAgICAgICAgLy8gVXNlIGRhdGUgYXJpdGhtZXRpYyB0byBhbGxvdyBkYXRlcyB3aXRoIGRpZmZlcmVudCB0aW1lcyB0byBtYXRjaFxyXG4gICAgICAgICAgaWYgKDAgPD0gdGhpc1tpXS52YWx1ZU9mKCkgLSB2YWwgJiYgdGhpc1tpXS52YWx1ZU9mKCkgLSB2YWwgPCAxMDAwKjYwKjYwKjI0KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdH0sXHJcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oaSl7XHJcblx0XHRcdFx0dGhpcy5zcGxpY2UoaSwxKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cmVwbGFjZTogZnVuY3Rpb24obmV3X2FycmF5KXtcclxuXHRcdFx0XHRpZiAoIW5ld19hcnJheSlcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRpZiAoISQuaXNBcnJheShuZXdfYXJyYXkpKVxyXG5cdFx0XHRcdFx0bmV3X2FycmF5ID0gW25ld19hcnJheV07XHJcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdHRoaXMucHVzaC5hcHBseSh0aGlzLCBuZXdfYXJyYXkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjbGVhcjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aGlzLmxlbmd0aCA9IDA7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvcHk6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIGEgPSBuZXcgRGF0ZUFycmF5KCk7XHJcblx0XHRcdFx0YS5yZXBsYWNlKHRoaXMpO1xyXG5cdFx0XHRcdHJldHVybiBhO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgYSA9IFtdO1xyXG5cdFx0XHRhLnB1c2guYXBwbHkoYSwgYXJndW1lbnRzKTtcclxuXHRcdFx0JC5leHRlbmQoYSwgZXh0cmFzKTtcclxuXHRcdFx0cmV0dXJuIGE7XHJcblx0XHR9O1xyXG5cdH0pKCk7XHJcblxyXG5cclxuXHQvLyBQaWNrZXIgb2JqZWN0XHJcblxyXG5cdHZhciBEYXRlcGlja2VyID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucyl7XHJcblx0XHQkLmRhdGEoZWxlbWVudCwgJ2RhdGVwaWNrZXInLCB0aGlzKTtcclxuXHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyhvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLmRhdGVzID0gbmV3IERhdGVBcnJheSgpO1xyXG5cdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuby5kZWZhdWx0Vmlld0RhdGU7XHJcblx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaXNJbnB1dCA9IHRoaXMuZWxlbWVudC5pcygnaW5wdXQnKTtcclxuXHRcdHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMuaXNJbnB1dCA/IHRoaXMuZWxlbWVudCA6IHRoaXMuZWxlbWVudC5maW5kKCdpbnB1dCcpO1xyXG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmVsZW1lbnQuaGFzQ2xhc3MoJ2RhdGUnKSA/IHRoaXMuZWxlbWVudC5maW5kKCcuYWRkLW9uLCAuaW5wdXQtZ3JvdXAtYWRkb24sIC5idG4nKSA6IGZhbHNlO1xyXG5cdFx0aWYgKHRoaXMuY29tcG9uZW50ICYmIHRoaXMuY29tcG9uZW50Lmxlbmd0aCA9PT0gMClcclxuXHRcdFx0dGhpcy5jb21wb25lbnQgPSBmYWxzZTtcclxuXHRcdHRoaXMuaXNJbmxpbmUgPSAhdGhpcy5jb21wb25lbnQgJiYgdGhpcy5lbGVtZW50LmlzKCdkaXYnKTtcclxuXHJcblx0XHR0aGlzLnBpY2tlciA9ICQoRFBHbG9iYWwudGVtcGxhdGUpO1xyXG5cclxuXHRcdC8vIENoZWNraW5nIHRlbXBsYXRlcyBhbmQgaW5zZXJ0aW5nXHJcblx0XHRpZiAodGhpcy5fY2hlY2tfdGVtcGxhdGUodGhpcy5vLnRlbXBsYXRlcy5sZWZ0QXJyb3cpKSB7XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5wcmV2JykuaHRtbCh0aGlzLm8udGVtcGxhdGVzLmxlZnRBcnJvdyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NoZWNrX3RlbXBsYXRlKHRoaXMuby50ZW1wbGF0ZXMucmlnaHRBcnJvdykpIHtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLm5leHQnKS5odG1sKHRoaXMuby50ZW1wbGF0ZXMucmlnaHRBcnJvdyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYnVpbGRFdmVudHMoKTtcclxuXHRcdHRoaXMuX2F0dGFjaEV2ZW50cygpO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzSW5saW5lKXtcclxuXHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItaW5saW5lJykuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1kcm9wZG93biBkcm9wZG93bi1tZW51Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuby5ydGwpe1xyXG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1ydGwnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vLmNhbGVuZGFyV2Vla3MpIHtcclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItZGF5cyAuZGF0ZXBpY2tlci1zd2l0Y2gsIHRoZWFkIC5kYXRlcGlja2VyLXRpdGxlLCB0Zm9vdCAudG9kYXksIHRmb290IC5jbGVhcicpXHJcblx0XHRcdFx0LmF0dHIoJ2NvbHNwYW4nLCBmdW5jdGlvbihpLCB2YWwpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIE51bWJlcih2YWwpICsgMTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMoe1xyXG5cdFx0XHRzdGFydERhdGU6IHRoaXMuX28uc3RhcnREYXRlLFxyXG5cdFx0XHRlbmREYXRlOiB0aGlzLl9vLmVuZERhdGUsXHJcblx0XHRcdGRheXNPZldlZWtEaXNhYmxlZDogdGhpcy5vLmRheXNPZldlZWtEaXNhYmxlZCxcclxuXHRcdFx0ZGF5c09mV2Vla0hpZ2hsaWdodGVkOiB0aGlzLm8uZGF5c09mV2Vla0hpZ2hsaWdodGVkLFxyXG5cdFx0XHRkYXRlc0Rpc2FibGVkOiB0aGlzLm8uZGF0ZXNEaXNhYmxlZFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5fYWxsb3dfdXBkYXRlID0gZmFsc2U7XHJcblx0XHR0aGlzLnNldFZpZXdNb2RlKHRoaXMuby5zdGFydFZpZXcpO1xyXG5cdFx0dGhpcy5fYWxsb3dfdXBkYXRlID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmZpbGxEb3coKTtcclxuXHRcdHRoaXMuZmlsbE1vbnRocygpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNJbmxpbmUpe1xyXG5cdFx0XHR0aGlzLnNob3coKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlcGlja2VyLnByb3RvdHlwZSA9IHtcclxuXHRcdGNvbnN0cnVjdG9yOiBEYXRlcGlja2VyLFxyXG5cclxuXHRcdF9yZXNvbHZlVmlld05hbWU6IGZ1bmN0aW9uKHZpZXcpe1xyXG5cdFx0XHQkLmVhY2goRFBHbG9iYWwudmlld01vZGVzLCBmdW5jdGlvbihpLCB2aWV3TW9kZSl7XHJcblx0XHRcdFx0aWYgKHZpZXcgPT09IGkgfHwgJC5pbkFycmF5KHZpZXcsIHZpZXdNb2RlLm5hbWVzKSAhPT0gLTEpe1xyXG5cdFx0XHRcdFx0dmlldyA9IGk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB2aWV3O1xyXG5cdFx0fSxcclxuXHJcblx0XHRfcmVzb2x2ZURheXNPZldlZWs6IGZ1bmN0aW9uKGRheXNPZldlZWspe1xyXG5cdFx0XHRpZiAoISQuaXNBcnJheShkYXlzT2ZXZWVrKSlcclxuXHRcdFx0XHRkYXlzT2ZXZWVrID0gZGF5c09mV2Vlay5zcGxpdCgvWyxcXHNdKi8pO1xyXG5cdFx0XHRyZXR1cm4gJC5tYXAoZGF5c09mV2VlaywgTnVtYmVyKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0X2NoZWNrX3RlbXBsYXRlOiBmdW5jdGlvbih0bXApe1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdC8vIElmIGVtcHR5XHJcblx0XHRcdFx0aWYgKHRtcCA9PT0gdW5kZWZpbmVkIHx8IHRtcCA9PT0gXCJcIikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBJZiBubyBodG1sLCBldmVyeXRoaW5nIG9rXHJcblx0XHRcdFx0aWYgKCh0bXAubWF0Y2goL1s8Pl0vZykgfHwgW10pLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gQ2hlY2tpbmcgaWYgaHRtbCBpcyBmaW5lXHJcblx0XHRcdFx0dmFyIGpEb20gPSAkKHRtcCk7XHJcblx0XHRcdFx0cmV0dXJuIGpEb20ubGVuZ3RoID4gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZXgpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0X3Byb2Nlc3Nfb3B0aW9uczogZnVuY3Rpb24ob3B0cyl7XHJcblx0XHRcdC8vIFN0b3JlIHJhdyBvcHRpb25zIGZvciByZWZlcmVuY2VcclxuXHRcdFx0dGhpcy5fbyA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9vLCBvcHRzKTtcclxuXHRcdFx0Ly8gUHJvY2Vzc2VkIG9wdGlvbnNcclxuXHRcdFx0dmFyIG8gPSB0aGlzLm8gPSAkLmV4dGVuZCh7fSwgdGhpcy5fbyk7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBcImRlLURFXCIgc3R5bGUgZGF0ZSBpcyBhdmFpbGFibGUsIGlmIG5vdCBsYW5ndWFnZSBzaG91bGRcclxuXHRcdFx0Ly8gZmFsbGJhY2sgdG8gMiBsZXR0ZXIgY29kZSBlZyBcImRlXCJcclxuXHRcdFx0dmFyIGxhbmcgPSBvLmxhbmd1YWdlO1xyXG5cdFx0XHRpZiAoIWRhdGVzW2xhbmddKXtcclxuXHRcdFx0XHRsYW5nID0gbGFuZy5zcGxpdCgnLScpWzBdO1xyXG5cdFx0XHRcdGlmICghZGF0ZXNbbGFuZ10pXHJcblx0XHRcdFx0XHRsYW5nID0gZGVmYXVsdHMubGFuZ3VhZ2U7XHJcblx0XHRcdH1cclxuXHRcdFx0by5sYW5ndWFnZSA9IGxhbmc7XHJcblxyXG5cdFx0XHQvLyBSZXRyaWV2ZSB2aWV3IGluZGV4IGZyb20gYW55IGFsaWFzZXNcclxuXHRcdFx0by5zdGFydFZpZXcgPSB0aGlzLl9yZXNvbHZlVmlld05hbWUoby5zdGFydFZpZXcpO1xyXG5cdFx0XHRvLm1pblZpZXdNb2RlID0gdGhpcy5fcmVzb2x2ZVZpZXdOYW1lKG8ubWluVmlld01vZGUpO1xyXG5cdFx0XHRvLm1heFZpZXdNb2RlID0gdGhpcy5fcmVzb2x2ZVZpZXdOYW1lKG8ubWF4Vmlld01vZGUpO1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgdmlldyBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XHJcblx0XHRcdG8uc3RhcnRWaWV3ID0gTWF0aC5tYXgodGhpcy5vLm1pblZpZXdNb2RlLCBNYXRoLm1pbih0aGlzLm8ubWF4Vmlld01vZGUsIG8uc3RhcnRWaWV3KSk7XHJcblxyXG5cdFx0XHQvLyB0cnVlLCBmYWxzZSwgb3IgTnVtYmVyID4gMFxyXG5cdFx0XHRpZiAoby5tdWx0aWRhdGUgIT09IHRydWUpe1xyXG5cdFx0XHRcdG8ubXVsdGlkYXRlID0gTnVtYmVyKG8ubXVsdGlkYXRlKSB8fCBmYWxzZTtcclxuXHRcdFx0XHRpZiAoby5tdWx0aWRhdGUgIT09IGZhbHNlKVxyXG5cdFx0XHRcdFx0by5tdWx0aWRhdGUgPSBNYXRoLm1heCgwLCBvLm11bHRpZGF0ZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0by5tdWx0aWRhdGVTZXBhcmF0b3IgPSBTdHJpbmcoby5tdWx0aWRhdGVTZXBhcmF0b3IpO1xyXG5cclxuXHRcdFx0by53ZWVrU3RhcnQgJT0gNztcclxuXHRcdFx0by53ZWVrRW5kID0gKG8ud2Vla1N0YXJ0ICsgNikgJSA3O1xyXG5cclxuXHRcdFx0dmFyIGZvcm1hdCA9IERQR2xvYmFsLnBhcnNlRm9ybWF0KG8uZm9ybWF0KTtcclxuXHRcdFx0aWYgKG8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkpe1xyXG5cdFx0XHRcdGlmICghIW8uc3RhcnREYXRlKXtcclxuXHRcdFx0XHRcdGlmIChvLnN0YXJ0RGF0ZSBpbnN0YW5jZW9mIERhdGUpXHJcblx0XHRcdFx0XHRcdG8uc3RhcnREYXRlID0gdGhpcy5fbG9jYWxfdG9fdXRjKHRoaXMuX3plcm9fdGltZShvLnN0YXJ0RGF0ZSkpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRvLnN0YXJ0RGF0ZSA9IERQR2xvYmFsLnBhcnNlRGF0ZShvLnN0YXJ0RGF0ZSwgZm9ybWF0LCBvLmxhbmd1YWdlLCBvLmFzc3VtZU5lYXJieVllYXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdG8uc3RhcnREYXRlID0gLUluZmluaXR5O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoby5lbmREYXRlICE9PSBJbmZpbml0eSl7XHJcblx0XHRcdFx0aWYgKCEhby5lbmREYXRlKXtcclxuXHRcdFx0XHRcdGlmIChvLmVuZERhdGUgaW5zdGFuY2VvZiBEYXRlKVxyXG5cdFx0XHRcdFx0XHRvLmVuZERhdGUgPSB0aGlzLl9sb2NhbF90b191dGModGhpcy5femVyb190aW1lKG8uZW5kRGF0ZSkpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRvLmVuZERhdGUgPSBEUEdsb2JhbC5wYXJzZURhdGUoby5lbmREYXRlLCBmb3JtYXQsIG8ubGFuZ3VhZ2UsIG8uYXNzdW1lTmVhcmJ5WWVhcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0by5lbmREYXRlID0gSW5maW5pdHk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvLmRheXNPZldlZWtEaXNhYmxlZCA9IHRoaXMuX3Jlc29sdmVEYXlzT2ZXZWVrKG8uZGF5c09mV2Vla0Rpc2FibGVkfHxbXSk7XHJcblx0XHRcdG8uZGF5c09mV2Vla0hpZ2hsaWdodGVkID0gdGhpcy5fcmVzb2x2ZURheXNPZldlZWsoby5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWR8fFtdKTtcclxuXHJcblx0XHRcdG8uZGF0ZXNEaXNhYmxlZCA9IG8uZGF0ZXNEaXNhYmxlZHx8W107XHJcblx0XHRcdGlmICghJC5pc0FycmF5KG8uZGF0ZXNEaXNhYmxlZCkpIHtcclxuXHRcdFx0XHRvLmRhdGVzRGlzYWJsZWQgPSBvLmRhdGVzRGlzYWJsZWQuc3BsaXQoJywnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvLmRhdGVzRGlzYWJsZWQgPSAkLm1hcChvLmRhdGVzRGlzYWJsZWQsIGZ1bmN0aW9uKGQpe1xyXG5cdFx0XHRcdHJldHVybiBEUEdsb2JhbC5wYXJzZURhdGUoZCwgZm9ybWF0LCBvLmxhbmd1YWdlLCBvLmFzc3VtZU5lYXJieVllYXIpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBwbGMgPSBTdHJpbmcoby5vcmllbnRhdGlvbikudG9Mb3dlckNhc2UoKS5zcGxpdCgvXFxzKy9nKSxcclxuXHRcdFx0XHRfcGxjID0gby5vcmllbnRhdGlvbi50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRwbGMgPSAkLmdyZXAocGxjLCBmdW5jdGlvbih3b3JkKXtcclxuXHRcdFx0XHRyZXR1cm4gL15hdXRvfGxlZnR8cmlnaHR8dG9wfGJvdHRvbSQvLnRlc3Qod29yZCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRvLm9yaWVudGF0aW9uID0ge3g6ICdhdXRvJywgeTogJ2F1dG8nfTtcclxuXHRcdFx0aWYgKCFfcGxjIHx8IF9wbGMgPT09ICdhdXRvJylcclxuXHRcdFx0XHQ7IC8vIG5vIGFjdGlvblxyXG5cdFx0XHRlbHNlIGlmIChwbGMubGVuZ3RoID09PSAxKXtcclxuXHRcdFx0XHRzd2l0Y2ggKHBsY1swXSl7XHJcblx0XHRcdFx0XHRjYXNlICd0b3AnOlxyXG5cdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcclxuXHRcdFx0XHRcdFx0by5vcmllbnRhdGlvbi55ID0gcGxjWzBdO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2xlZnQnOlxyXG5cdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRvLm9yaWVudGF0aW9uLnggPSBwbGNbMF07XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRfcGxjID0gJC5ncmVwKHBsYywgZnVuY3Rpb24od29yZCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gL15sZWZ0fHJpZ2h0JC8udGVzdCh3b3JkKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRvLm9yaWVudGF0aW9uLnggPSBfcGxjWzBdIHx8ICdhdXRvJztcclxuXHJcblx0XHRcdFx0X3BsYyA9ICQuZ3JlcChwbGMsIGZ1bmN0aW9uKHdvcmQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIC9edG9wfGJvdHRvbSQvLnRlc3Qod29yZCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0by5vcmllbnRhdGlvbi55ID0gX3BsY1swXSB8fCAnYXV0byc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG8uZGVmYXVsdFZpZXdEYXRlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2Ygby5kZWZhdWx0Vmlld0RhdGUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0by5kZWZhdWx0Vmlld0RhdGUgPSBEUEdsb2JhbC5wYXJzZURhdGUoby5kZWZhdWx0Vmlld0RhdGUsIGZvcm1hdCwgby5sYW5ndWFnZSwgby5hc3N1bWVOZWFyYnlZZWFyKTtcclxuXHRcdFx0fSBlbHNlIGlmIChvLmRlZmF1bHRWaWV3RGF0ZSkge1xyXG5cdFx0XHRcdHZhciB5ZWFyID0gby5kZWZhdWx0Vmlld0RhdGUueWVhciB8fCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRcdFx0dmFyIG1vbnRoID0gby5kZWZhdWx0Vmlld0RhdGUubW9udGggfHwgMDtcclxuXHRcdFx0XHR2YXIgZGF5ID0gby5kZWZhdWx0Vmlld0RhdGUuZGF5IHx8IDE7XHJcblx0XHRcdFx0by5kZWZhdWx0Vmlld0RhdGUgPSBVVENEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG8uZGVmYXVsdFZpZXdEYXRlID0gVVRDVG9kYXkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdF9ldmVudHM6IFtdLFxyXG5cdFx0X3NlY29uZGFyeUV2ZW50czogW10sXHJcblx0XHRfYXBwbHlFdmVudHM6IGZ1bmN0aW9uKGV2cyl7XHJcblx0XHRcdGZvciAodmFyIGk9MCwgZWwsIGNoLCBldjsgaSA8IGV2cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0ZWwgPSBldnNbaV1bMF07XHJcblx0XHRcdFx0aWYgKGV2c1tpXS5sZW5ndGggPT09IDIpe1xyXG5cdFx0XHRcdFx0Y2ggPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRldiA9IGV2c1tpXVsxXTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGV2c1tpXS5sZW5ndGggPT09IDMpe1xyXG5cdFx0XHRcdFx0Y2ggPSBldnNbaV1bMV07XHJcblx0XHRcdFx0XHRldiA9IGV2c1tpXVsyXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWwub24oZXYsIGNoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdF91bmFwcGx5RXZlbnRzOiBmdW5jdGlvbihldnMpe1xyXG5cdFx0XHRmb3IgKHZhciBpPTAsIGVsLCBldiwgY2g7IGkgPCBldnMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGVsID0gZXZzW2ldWzBdO1xyXG5cdFx0XHRcdGlmIChldnNbaV0ubGVuZ3RoID09PSAyKXtcclxuXHRcdFx0XHRcdGNoID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0ZXYgPSBldnNbaV1bMV07XHJcblx0XHRcdFx0fSBlbHNlIGlmIChldnNbaV0ubGVuZ3RoID09PSAzKXtcclxuXHRcdFx0XHRcdGNoID0gZXZzW2ldWzFdO1xyXG5cdFx0XHRcdFx0ZXYgPSBldnNbaV1bMl07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsLm9mZihldiwgY2gpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0X2J1aWxkRXZlbnRzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRzID0ge1xyXG4gICAgICAgICAgICAgICAga2V5dXA6ICQucHJveHkoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlLmtleUNvZGUsIFsyNywgMzcsIDM5LCAzOCwgNDAsIDMyLCAxMywgOV0pID09PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpLFxyXG4gICAgICAgICAgICAgICAga2V5ZG93bjogJC5wcm94eSh0aGlzLmtleWRvd24sIHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgcGFzdGU6ICQucHJveHkodGhpcy5wYXN0ZSwgdGhpcylcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm8uc2hvd09uRm9jdXMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cy5mb2N1cyA9ICQucHJveHkodGhpcy5zaG93LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnB1dCkgeyAvLyBzaW5nbGUgaW5wdXRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IFtcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5lbGVtZW50LCBldmVudHNdXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbXBvbmVudDogaW5wdXQgKyBidXR0b25cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jb21wb25lbnQgJiYgdGhpcy5pbnB1dEZpZWxkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCByZWFkb25seSwgYWxsb3cga2V5Ym9hcmQgbmF2XHJcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMuaW5wdXRGaWVsZCwgZXZlbnRzXSxcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy5jb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICQucHJveHkodGhpcy5zaG93LCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX2V2ZW50cyA9IFtcclxuXHRcdFx0XHRcdFt0aGlzLmVsZW1lbnQsIHtcclxuXHRcdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5zaG93LCB0aGlzKSxcclxuXHRcdFx0XHRcdFx0a2V5ZG93bjogJC5wcm94eSh0aGlzLmtleWRvd24sIHRoaXMpXHJcblx0XHRcdFx0XHR9XVxyXG5cdFx0XHRcdF07XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fZXZlbnRzLnB1c2goXHJcblx0XHRcdFx0Ly8gQ29tcG9uZW50OiBsaXN0ZW4gZm9yIGJsdXIgb24gZWxlbWVudCBkZXNjZW5kYW50c1xyXG5cdFx0XHRcdFt0aGlzLmVsZW1lbnQsICcqJywge1xyXG5cdFx0XHRcdFx0Ymx1cjogJC5wcm94eShmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5fZm9jdXNlZF9mcm9tID0gZS50YXJnZXQ7XHJcblx0XHRcdFx0XHR9LCB0aGlzKVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdC8vIElucHV0OiBsaXN0ZW4gZm9yIGJsdXIgb24gZWxlbWVudFxyXG5cdFx0XHRcdFt0aGlzLmVsZW1lbnQsIHtcclxuXHRcdFx0XHRcdGJsdXI6ICQucHJveHkoZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2ZvY3VzZWRfZnJvbSA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdFx0fSwgdGhpcylcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuby5pbW1lZGlhdGVVcGRhdGVzKSB7XHJcblx0XHRcdFx0Ly8gVHJpZ2dlciBpbnB1dCB1cGRhdGVzIGltbWVkaWF0ZWx5IG9uIGNoYW5nZWQgeWVhci9tb250aFxyXG5cdFx0XHRcdHRoaXMuX2V2ZW50cy5wdXNoKFt0aGlzLmVsZW1lbnQsIHtcclxuXHRcdFx0XHRcdCdjaGFuZ2VZZWFyIGNoYW5nZU1vbnRoJzogJC5wcm94eShmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGUoZS5kYXRlKTtcclxuXHRcdFx0XHRcdH0sIHRoaXMpXHJcblx0XHRcdFx0fV0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zZWNvbmRhcnlFdmVudHMgPSBbXHJcblx0XHRcdFx0W3RoaXMucGlja2VyLCB7XHJcblx0XHRcdFx0XHRjbGljazogJC5wcm94eSh0aGlzLmNsaWNrLCB0aGlzKVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdFt0aGlzLnBpY2tlciwgJy5wcmV2LCAubmV4dCcsIHtcclxuXHRcdFx0XHRcdGNsaWNrOiAkLnByb3h5KHRoaXMubmF2QXJyb3dzQ2xpY2ssIHRoaXMpXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0W3RoaXMucGlja2VyLCAnLmRheTpub3QoLmRpc2FibGVkKScsIHtcclxuXHRcdFx0XHRcdGNsaWNrOiAkLnByb3h5KHRoaXMuZGF5Q2VsbENsaWNrLCB0aGlzKVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdFskKHdpbmRvdyksIHtcclxuXHRcdFx0XHRcdHJlc2l6ZTogJC5wcm94eSh0aGlzLnBsYWNlLCB0aGlzKVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdFskKGRvY3VtZW50KSwge1xyXG5cdFx0XHRcdFx0J21vdXNlZG93biB0b3VjaHN0YXJ0JzogJC5wcm94eShmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0Ly8gQ2xpY2tlZCBvdXRzaWRlIHRoZSBkYXRlcGlja2VyLCBoaWRlIGl0XHJcblx0XHRcdFx0XHRcdGlmICghKFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5pcyhlLnRhcmdldCkgfHxcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZmluZChlLnRhcmdldCkubGVuZ3RoIHx8XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuaXMoZS50YXJnZXQpIHx8XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuZmluZChlLnRhcmdldCkubGVuZ3RoIHx8XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pc0lubGluZVxyXG5cdFx0XHRcdFx0XHQpKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSwgdGhpcylcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHRdO1xyXG5cdFx0fSxcclxuXHRcdF9hdHRhY2hFdmVudHM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuX2RldGFjaEV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLl9hcHBseUV2ZW50cyh0aGlzLl9ldmVudHMpO1xyXG5cdFx0fSxcclxuXHRcdF9kZXRhY2hFdmVudHM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuX3VuYXBwbHlFdmVudHModGhpcy5fZXZlbnRzKTtcclxuXHRcdH0sXHJcblx0XHRfYXR0YWNoU2Vjb25kYXJ5RXZlbnRzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLl9kZXRhY2hTZWNvbmRhcnlFdmVudHMoKTtcclxuXHRcdFx0dGhpcy5fYXBwbHlFdmVudHModGhpcy5fc2Vjb25kYXJ5RXZlbnRzKTtcclxuXHRcdH0sXHJcblx0XHRfZGV0YWNoU2Vjb25kYXJ5RXZlbnRzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLl91bmFwcGx5RXZlbnRzKHRoaXMuX3NlY29uZGFyeUV2ZW50cyk7XHJcblx0XHR9LFxyXG5cdFx0X3RyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBhbHRkYXRlKXtcclxuXHRcdFx0dmFyIGRhdGUgPSBhbHRkYXRlIHx8IHRoaXMuZGF0ZXMuZ2V0KC0xKSxcclxuXHRcdFx0XHRsb2NhbF9kYXRlID0gdGhpcy5fdXRjX3RvX2xvY2FsKGRhdGUpO1xyXG5cclxuXHRcdFx0dGhpcy5lbGVtZW50LnRyaWdnZXIoe1xyXG5cdFx0XHRcdHR5cGU6IGV2ZW50LFxyXG5cdFx0XHRcdGRhdGU6IGxvY2FsX2RhdGUsXHJcblx0XHRcdFx0dmlld01vZGU6IHRoaXMudmlld01vZGUsXHJcblx0XHRcdFx0ZGF0ZXM6ICQubWFwKHRoaXMuZGF0ZXMsIHRoaXMuX3V0Y190b19sb2NhbCksXHJcblx0XHRcdFx0Zm9ybWF0OiAkLnByb3h5KGZ1bmN0aW9uKGl4LCBmb3JtYXQpe1xyXG5cdFx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdFx0XHRpeCA9IHRoaXMuZGF0ZXMubGVuZ3RoIC0gMTtcclxuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gdGhpcy5vLmZvcm1hdDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGl4ID09PSAnc3RyaW5nJyl7XHJcblx0XHRcdFx0XHRcdGZvcm1hdCA9IGl4O1xyXG5cdFx0XHRcdFx0XHRpeCA9IHRoaXMuZGF0ZXMubGVuZ3RoIC0gMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLm8uZm9ybWF0O1xyXG5cdFx0XHRcdFx0dmFyIGRhdGUgPSB0aGlzLmRhdGVzLmdldChpeCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gRFBHbG9iYWwuZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIHRoaXMuby5sYW5ndWFnZSk7XHJcblx0XHRcdFx0fSwgdGhpcylcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNob3c6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmICh0aGlzLmlucHV0RmllbGQucHJvcCgnZGlzYWJsZWQnKSB8fCAodGhpcy5pbnB1dEZpZWxkLnByb3AoJ3JlYWRvbmx5JykgJiYgdGhpcy5vLmVuYWJsZU9uUmVhZG9ubHkgPT09IGZhbHNlKSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGlmICghdGhpcy5pc0lubGluZSlcclxuXHRcdFx0XHR0aGlzLnBpY2tlci5hcHBlbmRUbyh0aGlzLm8uY29udGFpbmVyKTtcclxuXHRcdFx0dGhpcy5wbGFjZSgpO1xyXG5cdFx0XHR0aGlzLnBpY2tlci5zaG93KCk7XHJcblx0XHRcdHRoaXMuX2F0dGFjaFNlY29uZGFyeUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdzaG93Jyk7XHJcblx0XHRcdGlmICgod2luZG93Lm5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzIHx8ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50KSAmJiB0aGlzLm8uZGlzYWJsZVRvdWNoS2V5Ym9hcmQpIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxlbWVudCkuYmx1cigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRoaWRlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZiAodGhpcy5pc0lubGluZSB8fCAhdGhpcy5waWNrZXIuaXMoJzp2aXNpYmxlJykpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcclxuXHRcdFx0dGhpcy5waWNrZXIuaGlkZSgpLmRldGFjaCgpO1xyXG5cdFx0XHR0aGlzLl9kZXRhY2hTZWNvbmRhcnlFdmVudHMoKTtcclxuXHRcdFx0dGhpcy5zZXRWaWV3TW9kZSh0aGlzLm8uc3RhcnRWaWV3KTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm8uZm9yY2VQYXJzZSAmJiB0aGlzLmlucHV0RmllbGQudmFsKCkpXHJcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdoaWRlJyk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0dGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcblx0XHRcdHRoaXMuX2RldGFjaFNlY29uZGFyeUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLnBpY2tlci5yZW1vdmUoKTtcclxuXHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5kYXRhKCkuZGF0ZXBpY2tlcjtcclxuXHRcdFx0aWYgKCF0aGlzLmlzSW5wdXQpe1xyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YSgpLmRhdGU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdHBhc3RlOiBmdW5jdGlvbihlKXtcclxuXHRcdFx0dmFyIGRhdGVTdHJpbmc7XHJcblx0XHRcdGlmIChlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YSAmJiBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YS50eXBlc1xyXG5cdFx0XHRcdCYmICQuaW5BcnJheSgndGV4dC9wbGFpbicsIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLnR5cGVzKSAhPT0gLTEpIHtcclxuXHRcdFx0XHRkYXRlU3RyaW5nID0gZS5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHdpbmRvdy5jbGlwYm9hcmREYXRhKSB7XHJcblx0XHRcdFx0ZGF0ZVN0cmluZyA9IHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZXREYXRlKGRhdGVTdHJpbmcpO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdF91dGNfdG9fbG9jYWw6IGZ1bmN0aW9uKHV0Yyl7XHJcblx0XHRcdGlmICghdXRjKSB7XHJcblx0XHRcdFx0cmV0dXJuIHV0YztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGxvY2FsID0gbmV3IERhdGUodXRjLmdldFRpbWUoKSArICh1dGMuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKSk7XHJcblxyXG5cdFx0XHRpZiAobG9jYWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAhPT0gdXRjLmdldFRpbWV6b25lT2Zmc2V0KCkpIHtcclxuXHRcdFx0XHRsb2NhbCA9IG5ldyBEYXRlKHV0Yy5nZXRUaW1lKCkgKyAobG9jYWwuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBsb2NhbDtcclxuXHRcdH0sXHJcblx0XHRfbG9jYWxfdG9fdXRjOiBmdW5jdGlvbihsb2NhbCl7XHJcblx0XHRcdHJldHVybiBsb2NhbCAmJiBuZXcgRGF0ZShsb2NhbC5nZXRUaW1lKCkgLSAobG9jYWwuZ2V0VGltZXpvbmVPZmZzZXQoKSo2MDAwMCkpO1xyXG5cdFx0fSxcclxuXHRcdF96ZXJvX3RpbWU6IGZ1bmN0aW9uKGxvY2FsKXtcclxuXHRcdFx0cmV0dXJuIGxvY2FsICYmIG5ldyBEYXRlKGxvY2FsLmdldEZ1bGxZZWFyKCksIGxvY2FsLmdldE1vbnRoKCksIGxvY2FsLmdldERhdGUoKSk7XHJcblx0XHR9LFxyXG5cdFx0X3plcm9fdXRjX3RpbWU6IGZ1bmN0aW9uKHV0Yyl7XHJcblx0XHRcdHJldHVybiB1dGMgJiYgVVRDRGF0ZSh1dGMuZ2V0VVRDRnVsbFllYXIoKSwgdXRjLmdldFVUQ01vbnRoKCksIHV0Yy5nZXRVVENEYXRlKCkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXREYXRlczogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuICQubWFwKHRoaXMuZGF0ZXMsIHRoaXMuX3V0Y190b19sb2NhbCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldFVUQ0RhdGVzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBEYXRlKGQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Z2V0RGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3V0Y190b19sb2NhbCh0aGlzLmdldFVUQ0RhdGUoKSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldFVUQ0RhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBzZWxlY3RlZF9kYXRlID0gdGhpcy5kYXRlcy5nZXQoLTEpO1xyXG5cdFx0XHRpZiAoc2VsZWN0ZWRfZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBEYXRlKHNlbGVjdGVkX2RhdGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGNsZWFyRGF0ZXM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuaW5wdXRGaWVsZC52YWwoJycpO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLmF1dG9jbG9zZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldERhdGVzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgYXJncyA9ICQuaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZS5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlRGF0ZScpO1xyXG5cdFx0XHR0aGlzLnNldFZhbHVlKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXRVVENEYXRlczogZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGFyZ3MgPSAkLmlzQXJyYXkoYXJndW1lbnRzWzBdKSA/IGFyZ3VtZW50c1swXSA6IGFyZ3VtZW50cztcclxuXHRcdFx0dGhpcy5zZXREYXRlcy5hcHBseSh0aGlzLCAkLm1hcChhcmdzLCB0aGlzLl91dGNfdG9fbG9jYWwpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldERhdGU6IGFsaWFzKCdzZXREYXRlcycpLFxyXG5cdFx0c2V0VVRDRGF0ZTogYWxpYXMoJ3NldFVUQ0RhdGVzJyksXHJcblx0XHRyZW1vdmU6IGFsaWFzKCdkZXN0cm95JywgJ01ldGhvZCBgcmVtb3ZlYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAyLjAuIFVzZSBgZGVzdHJveWAgaW5zdGVhZCcpLFxyXG5cclxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgZm9ybWF0dGVkID0gdGhpcy5nZXRGb3JtYXR0ZWREYXRlKCk7XHJcblx0XHRcdHRoaXMuaW5wdXRGaWVsZC52YWwoZm9ybWF0dGVkKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldEZvcm1hdHRlZERhdGU6IGZ1bmN0aW9uKGZvcm1hdCl7XHJcblx0XHRcdGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHRmb3JtYXQgPSB0aGlzLm8uZm9ybWF0O1xyXG5cclxuXHRcdFx0dmFyIGxhbmcgPSB0aGlzLm8ubGFuZ3VhZ2U7XHJcblx0XHRcdHJldHVybiAkLm1hcCh0aGlzLmRhdGVzLCBmdW5jdGlvbihkKXtcclxuXHRcdFx0XHRyZXR1cm4gRFBHbG9iYWwuZm9ybWF0RGF0ZShkLCBmb3JtYXQsIGxhbmcpO1xyXG5cdFx0XHR9KS5qb2luKHRoaXMuby5tdWx0aWRhdGVTZXBhcmF0b3IpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRTdGFydERhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiB0aGlzLm8uc3RhcnREYXRlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXRTdGFydERhdGU6IGZ1bmN0aW9uKHN0YXJ0RGF0ZSl7XHJcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7c3RhcnREYXRlOiBzdGFydERhdGV9KTtcclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0dGhpcy51cGRhdGVOYXZBcnJvd3MoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdGdldEVuZERhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiB0aGlzLm8uZW5kRGF0ZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0RW5kRGF0ZTogZnVuY3Rpb24oZW5kRGF0ZSl7XHJcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZW5kRGF0ZTogZW5kRGF0ZX0pO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZU5hdkFycm93cygpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0RGF5c09mV2Vla0Rpc2FibGVkOiBmdW5jdGlvbihkYXlzT2ZXZWVrRGlzYWJsZWQpe1xyXG5cdFx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMoe2RheXNPZldlZWtEaXNhYmxlZDogZGF5c09mV2Vla0Rpc2FibGVkfSk7XHJcblx0XHRcdHRoaXMudXBkYXRlKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzZXREYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IGZ1bmN0aW9uKGRheXNPZldlZWtIaWdobGlnaHRlZCl7XHJcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZGF5c09mV2Vla0hpZ2hsaWdodGVkOiBkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWR9KTtcclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldERhdGVzRGlzYWJsZWQ6IGZ1bmN0aW9uKGRhdGVzRGlzYWJsZWQpe1xyXG5cdFx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMoe2RhdGVzRGlzYWJsZWQ6IGRhdGVzRGlzYWJsZWR9KTtcclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdHBsYWNlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZiAodGhpcy5pc0lubGluZSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0dmFyIGNhbGVuZGFyV2lkdGggPSB0aGlzLnBpY2tlci5vdXRlcldpZHRoKCksXHJcblx0XHRcdFx0Y2FsZW5kYXJIZWlnaHQgPSB0aGlzLnBpY2tlci5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdHZpc3VhbFBhZGRpbmcgPSAxMCxcclxuXHRcdFx0XHRjb250YWluZXIgPSAkKHRoaXMuby5jb250YWluZXIpLFxyXG5cdFx0XHRcdHdpbmRvd1dpZHRoID0gY29udGFpbmVyLndpZHRoKCksXHJcblx0XHRcdFx0c2Nyb2xsVG9wID0gdGhpcy5vLmNvbnRhaW5lciA9PT0gJ2JvZHknID8gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgOiBjb250YWluZXIuc2Nyb2xsVG9wKCksXHJcblx0XHRcdFx0YXBwZW5kT2Zmc2V0ID0gY29udGFpbmVyLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0dmFyIHBhcmVudHNaaW5kZXggPSBbMF07XHJcblx0XHRcdHRoaXMuZWxlbWVudC5wYXJlbnRzKCkuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHZhciBpdGVtWkluZGV4ID0gJCh0aGlzKS5jc3MoJ3otaW5kZXgnKTtcclxuXHRcdFx0XHRpZiAoaXRlbVpJbmRleCAhPT0gJ2F1dG8nICYmIE51bWJlcihpdGVtWkluZGV4KSAhPT0gMCkgcGFyZW50c1ppbmRleC5wdXNoKE51bWJlcihpdGVtWkluZGV4KSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YXIgekluZGV4ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgcGFyZW50c1ppbmRleCkgKyB0aGlzLm8uekluZGV4T2Zmc2V0O1xyXG5cdFx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5jb21wb25lbnQgPyB0aGlzLmNvbXBvbmVudC5wYXJlbnQoKS5vZmZzZXQoKSA6IHRoaXMuZWxlbWVudC5vZmZzZXQoKTtcclxuXHRcdFx0dmFyIGhlaWdodCA9IHRoaXMuY29tcG9uZW50ID8gdGhpcy5jb21wb25lbnQub3V0ZXJIZWlnaHQodHJ1ZSkgOiB0aGlzLmVsZW1lbnQub3V0ZXJIZWlnaHQoZmFsc2UpO1xyXG5cdFx0XHR2YXIgd2lkdGggPSB0aGlzLmNvbXBvbmVudCA/IHRoaXMuY29tcG9uZW50Lm91dGVyV2lkdGgodHJ1ZSkgOiB0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aChmYWxzZSk7XHJcblx0XHRcdHZhciBsZWZ0ID0gb2Zmc2V0LmxlZnQgLSBhcHBlbmRPZmZzZXQubGVmdDtcclxuXHRcdFx0dmFyIHRvcCA9IG9mZnNldC50b3AgLSBhcHBlbmRPZmZzZXQudG9wO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuby5jb250YWluZXIgIT09ICdib2R5Jykge1xyXG5cdFx0XHRcdHRvcCArPSBzY3JvbGxUb3A7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucGlja2VyLnJlbW92ZUNsYXNzKFxyXG5cdFx0XHRcdCdkYXRlcGlja2VyLW9yaWVudC10b3AgZGF0ZXBpY2tlci1vcmllbnQtYm90dG9tICcrXHJcblx0XHRcdFx0J2RhdGVwaWNrZXItb3JpZW50LXJpZ2h0IGRhdGVwaWNrZXItb3JpZW50LWxlZnQnXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLm9yaWVudGF0aW9uLnggIT09ICdhdXRvJyl7XHJcblx0XHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItb3JpZW50LScgKyB0aGlzLm8ub3JpZW50YXRpb24ueCk7XHJcblx0XHRcdFx0aWYgKHRoaXMuby5vcmllbnRhdGlvbi54ID09PSAncmlnaHQnKVxyXG5cdFx0XHRcdFx0bGVmdCAtPSBjYWxlbmRhcldpZHRoIC0gd2lkdGg7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gYXV0byB4IG9yaWVudGF0aW9uIGlzIGJlc3QtcGxhY2VtZW50OiBpZiBpdCBjcm9zc2VzIGEgd2luZG93XHJcblx0XHRcdC8vIGVkZ2UsIGZ1ZGdlIGl0IHNpZGV3YXlzXHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGlmIChvZmZzZXQubGVmdCA8IDApIHtcclxuXHRcdFx0XHRcdC8vIGNvbXBvbmVudCBpcyBvdXRzaWRlIHRoZSB3aW5kb3cgb24gdGhlIGxlZnQgc2lkZS4gTW92ZSBpdCBpbnRvIHZpc2libGUgcmFuZ2VcclxuXHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1sZWZ0Jyk7XHJcblx0XHRcdFx0XHRsZWZ0IC09IG9mZnNldC5sZWZ0IC0gdmlzdWFsUGFkZGluZztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGxlZnQgKyBjYWxlbmRhcldpZHRoID4gd2luZG93V2lkdGgpIHtcclxuXHRcdFx0XHRcdC8vIHRoZSBjYWxlbmRhciBwYXNzZXMgdGhlIHdpZG93IHJpZ2h0IGVkZ2UuIEFsaWduIGl0IHRvIGNvbXBvbmVudCByaWdodCBzaWRlXHJcblx0XHRcdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtcmlnaHQnKTtcclxuXHRcdFx0XHRcdGxlZnQgKz0gd2lkdGggLSBjYWxlbmRhcldpZHRoO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5vLnJ0bCkge1xyXG5cdFx0XHRcdFx0XHQvLyBEZWZhdWx0IHRvIHJpZ2h0XHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1yaWdodCcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gRGVmYXVsdCB0byBsZWZ0XHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1sZWZ0Jyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBhdXRvIHkgb3JpZW50YXRpb24gaXMgYmVzdC1zaXR1YXRpb246IHRvcCBvciBib3R0b20sIG5vIGZ1ZGdpbmcsXHJcblx0XHRcdC8vIGRlY2lzaW9uIGJhc2VkIG9uIHdoaWNoIHNob3dzIG1vcmUgb2YgdGhlIGNhbGVuZGFyXHJcblx0XHRcdHZhciB5b3JpZW50ID0gdGhpcy5vLm9yaWVudGF0aW9uLnksXHJcblx0XHRcdFx0dG9wX292ZXJmbG93O1xyXG5cdFx0XHRpZiAoeW9yaWVudCA9PT0gJ2F1dG8nKXtcclxuXHRcdFx0XHR0b3Bfb3ZlcmZsb3cgPSAtc2Nyb2xsVG9wICsgdG9wIC0gY2FsZW5kYXJIZWlnaHQ7XHJcblx0XHRcdFx0eW9yaWVudCA9IHRvcF9vdmVyZmxvdyA8IDAgPyAnYm90dG9tJyA6ICd0b3AnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtJyArIHlvcmllbnQpO1xyXG5cdFx0XHRpZiAoeW9yaWVudCA9PT0gJ3RvcCcpXHJcblx0XHRcdFx0dG9wIC09IGNhbGVuZGFySGVpZ2h0ICsgcGFyc2VJbnQodGhpcy5waWNrZXIuY3NzKCdwYWRkaW5nLXRvcCcpKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRvcCArPSBoZWlnaHQ7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLnJ0bCkge1xyXG5cdFx0XHRcdHZhciByaWdodCA9IHdpbmRvd1dpZHRoIC0gKGxlZnQgKyB3aWR0aCk7XHJcblx0XHRcdFx0dGhpcy5waWNrZXIuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogdG9wLFxyXG5cdFx0XHRcdFx0cmlnaHQ6IHJpZ2h0LFxyXG5cdFx0XHRcdFx0ekluZGV4OiB6SW5kZXhcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnBpY2tlci5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiB0b3AsXHJcblx0XHRcdFx0XHRsZWZ0OiBsZWZ0LFxyXG5cdFx0XHRcdFx0ekluZGV4OiB6SW5kZXhcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0X2FsbG93X3VwZGF0ZTogdHJ1ZSxcclxuXHRcdHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYgKCF0aGlzLl9hbGxvd191cGRhdGUpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdFx0XHR2YXIgb2xkRGF0ZXMgPSB0aGlzLmRhdGVzLmNvcHkoKSxcclxuXHRcdFx0XHRkYXRlcyA9IFtdLFxyXG5cdFx0XHRcdGZyb21BcmdzID0gZmFsc2U7XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKXtcclxuXHRcdFx0XHQkLmVhY2goYXJndW1lbnRzLCAkLnByb3h5KGZ1bmN0aW9uKGksIGRhdGUpe1xyXG5cdFx0XHRcdFx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxyXG5cdFx0XHRcdFx0XHRkYXRlID0gdGhpcy5fbG9jYWxfdG9fdXRjKGRhdGUpO1xyXG5cdFx0XHRcdFx0ZGF0ZXMucHVzaChkYXRlKTtcclxuXHRcdFx0XHR9LCB0aGlzKSk7XHJcblx0XHRcdFx0ZnJvbUFyZ3MgPSB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGRhdGVzID0gdGhpcy5pc0lucHV0XHJcblx0XHRcdFx0XHRcdD8gdGhpcy5lbGVtZW50LnZhbCgpXHJcblx0XHRcdFx0XHRcdDogdGhpcy5lbGVtZW50LmRhdGEoJ2RhdGUnKSB8fCB0aGlzLmlucHV0RmllbGQudmFsKCk7XHJcblx0XHRcdFx0aWYgKGRhdGVzICYmIHRoaXMuby5tdWx0aWRhdGUpXHJcblx0XHRcdFx0XHRkYXRlcyA9IGRhdGVzLnNwbGl0KHRoaXMuby5tdWx0aWRhdGVTZXBhcmF0b3IpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGRhdGVzID0gW2RhdGVzXTtcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGEoKS5kYXRlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkYXRlcyA9ICQubWFwKGRhdGVzLCAkLnByb3h5KGZ1bmN0aW9uKGRhdGUpe1xyXG5cdFx0XHRcdHJldHVybiBEUEdsb2JhbC5wYXJzZURhdGUoZGF0ZSwgdGhpcy5vLmZvcm1hdCwgdGhpcy5vLmxhbmd1YWdlLCB0aGlzLm8uYXNzdW1lTmVhcmJ5WWVhcik7XHJcblx0XHRcdH0sIHRoaXMpKTtcclxuXHRcdFx0ZGF0ZXMgPSAkLmdyZXAoZGF0ZXMsICQucHJveHkoZnVuY3Rpb24oZGF0ZSl7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdCF0aGlzLmRhdGVXaXRoaW5SYW5nZShkYXRlKSB8fFxyXG5cdFx0XHRcdFx0IWRhdGVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9LCB0aGlzKSwgdHJ1ZSk7XHJcblx0XHRcdHRoaXMuZGF0ZXMucmVwbGFjZShkYXRlcyk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vLnVwZGF0ZVZpZXdEYXRlKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuZGF0ZXMubGVuZ3RoKVxyXG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZXMuZ2V0KC0xKSk7XHJcblx0XHRcdFx0ZWxzZSBpZiAodGhpcy52aWV3RGF0ZSA8IHRoaXMuby5zdGFydERhdGUpXHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5vLnN0YXJ0RGF0ZSk7XHJcblx0XHRcdFx0ZWxzZSBpZiAodGhpcy52aWV3RGF0ZSA+IHRoaXMuby5lbmREYXRlKVxyXG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMuby5lbmREYXRlKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5vLmRlZmF1bHRWaWV3RGF0ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGZyb21BcmdzKXtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGRhdGUgYnkgY2xpY2tpbmdcclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlKCk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNoYW5nZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHRoaXMuZGF0ZXMubGVuZ3RoKXtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGRhdGUgYnkgdHlwaW5nXHJcblx0XHRcdFx0aWYgKFN0cmluZyhvbGREYXRlcykgIT09IFN0cmluZyh0aGlzLmRhdGVzKSAmJiBmcm9tQXJncykge1xyXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlRGF0ZScpO1xyXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LmNoYW5nZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXRoaXMuZGF0ZXMubGVuZ3RoICYmIG9sZERhdGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NsZWFyRGF0ZScpO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jaGFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5maWxsKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRmaWxsRG93OiBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAodGhpcy5vLnNob3dXZWVrRGF5cykge1xyXG5cdFx0XHR2YXIgZG93Q250ID0gdGhpcy5vLndlZWtTdGFydCxcclxuXHRcdFx0XHRodG1sID0gJzx0cj4nO1xyXG5cdFx0XHRpZiAodGhpcy5vLmNhbGVuZGFyV2Vla3Mpe1xyXG5cdFx0XHRcdGh0bWwgKz0gJzx0aCBjbGFzcz1cImN3XCI+JiMxNjA7PC90aD4nO1xyXG5cdFx0XHR9XHJcblx0XHRcdHdoaWxlIChkb3dDbnQgPCB0aGlzLm8ud2Vla1N0YXJ0ICsgNyl7XHJcblx0XHRcdFx0aHRtbCArPSAnPHRoIGNsYXNzPVwiZG93JztcclxuICAgICAgICBpZiAoJC5pbkFycmF5KGRvd0NudCwgdGhpcy5vLmRheXNPZldlZWtEaXNhYmxlZCkgIT09IC0xKVxyXG4gICAgICAgICAgaHRtbCArPSAnIGRpc2FibGVkJztcclxuICAgICAgICBodG1sICs9ICdcIj4nK2RhdGVzW3RoaXMuby5sYW5ndWFnZV0uZGF5c01pblsoZG93Q250KyspJTddKyc8L3RoPic7XHJcblx0XHRcdH1cclxuXHRcdFx0aHRtbCArPSAnPC90cj4nO1xyXG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcuZGF0ZXBpY2tlci1kYXlzIHRoZWFkJykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICB9XHJcblx0XHR9LFxyXG5cclxuXHRcdGZpbGxNb250aHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBsb2NhbERhdGUgPSB0aGlzLl91dGNfdG9fbG9jYWwodGhpcy52aWV3RGF0ZSk7XHJcblx0XHRcdHZhciBodG1sID0gJyc7XHJcblx0XHRcdHZhciBmb2N1c2VkO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEyOyBpKyspe1xyXG5cdFx0XHRcdGZvY3VzZWQgPSBsb2NhbERhdGUgJiYgbG9jYWxEYXRlLmdldE1vbnRoKCkgPT09IGkgPyAnIGZvY3VzZWQnIDogJyc7XHJcblx0XHRcdFx0aHRtbCArPSAnPHNwYW4gY2xhc3M9XCJtb250aCcgKyBmb2N1c2VkICsgJ1wiPicgKyBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLm1vbnRoc1Nob3J0W2ldICsgJzwvc3Bhbj4nO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLW1vbnRocyB0ZCcpLmh0bWwoaHRtbCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldFJhbmdlOiBmdW5jdGlvbihyYW5nZSl7XHJcblx0XHRcdGlmICghcmFuZ2UgfHwgIXJhbmdlLmxlbmd0aClcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5yYW5nZTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMucmFuZ2UgPSAkLm1hcChyYW5nZSwgZnVuY3Rpb24oZCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZC52YWx1ZU9mKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuZmlsbCgpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRDbGFzc05hbWVzOiBmdW5jdGlvbihkYXRlKXtcclxuXHRcdFx0dmFyIGNscyA9IFtdLFxyXG5cdFx0XHRcdHllYXIgPSB0aGlzLnZpZXdEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXHJcblx0XHRcdFx0bW9udGggPSB0aGlzLnZpZXdEYXRlLmdldFVUQ01vbnRoKCksXHJcblx0XHRcdFx0dG9kYXkgPSBVVENUb2RheSgpO1xyXG5cdFx0XHRpZiAoZGF0ZS5nZXRVVENGdWxsWWVhcigpIDwgeWVhciB8fCAoZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA8IG1vbnRoKSl7XHJcblx0XHRcdFx0Y2xzLnB1c2goJ29sZCcpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA+IHllYXIgfHwgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA9PT0geWVhciAmJiBkYXRlLmdldFVUQ01vbnRoKCkgPiBtb250aCkpe1xyXG5cdFx0XHRcdGNscy5wdXNoKCduZXcnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5mb2N1c0RhdGUgJiYgZGF0ZS52YWx1ZU9mKCkgPT09IHRoaXMuZm9jdXNEYXRlLnZhbHVlT2YoKSlcclxuXHRcdFx0XHRjbHMucHVzaCgnZm9jdXNlZCcpO1xyXG5cdFx0XHQvLyBDb21wYXJlIGludGVybmFsIFVUQyBkYXRlIHdpdGggVVRDIHRvZGF5LCBub3QgbG9jYWwgdG9kYXlcclxuXHRcdFx0aWYgKHRoaXMuby50b2RheUhpZ2hsaWdodCAmJiBpc1VUQ0VxdWFscyhkYXRlLCB0b2RheSkpIHtcclxuXHRcdFx0XHRjbHMucHVzaCgndG9kYXknKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5kYXRlcy5jb250YWlucyhkYXRlKSAhPT0gLTEpXHJcblx0XHRcdFx0Y2xzLnB1c2goJ2FjdGl2ZScpO1xyXG5cdFx0XHRpZiAoIXRoaXMuZGF0ZVdpdGhpblJhbmdlKGRhdGUpKXtcclxuXHRcdFx0XHRjbHMucHVzaCgnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5kYXRlSXNEaXNhYmxlZChkYXRlKSl7XHJcblx0XHRcdFx0Y2xzLnB1c2goJ2Rpc2FibGVkJywgJ2Rpc2FibGVkLWRhdGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoJC5pbkFycmF5KGRhdGUuZ2V0VVRDRGF5KCksIHRoaXMuby5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQpICE9PSAtMSl7XHJcblx0XHRcdFx0Y2xzLnB1c2goJ2hpZ2hsaWdodGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnJhbmdlKXtcclxuXHRcdFx0XHRpZiAoZGF0ZSA+IHRoaXMucmFuZ2VbMF0gJiYgZGF0ZSA8IHRoaXMucmFuZ2VbdGhpcy5yYW5nZS5sZW5ndGgtMV0pe1xyXG5cdFx0XHRcdFx0Y2xzLnB1c2goJ3JhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICgkLmluQXJyYXkoZGF0ZS52YWx1ZU9mKCksIHRoaXMucmFuZ2UpICE9PSAtMSl7XHJcblx0XHRcdFx0XHRjbHMucHVzaCgnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGRhdGUudmFsdWVPZigpID09PSB0aGlzLnJhbmdlWzBdKXtcclxuICAgICAgICAgIGNscy5wdXNoKCdyYW5nZS1zdGFydCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0ZS52YWx1ZU9mKCkgPT09IHRoaXMucmFuZ2VbdGhpcy5yYW5nZS5sZW5ndGgtMV0pe1xyXG4gICAgICAgICAgY2xzLnB1c2goJ3JhbmdlLWVuZCcpO1xyXG4gICAgICAgIH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY2xzO1xyXG5cdFx0fSxcclxuXHJcblx0XHRfZmlsbF95ZWFyc1ZpZXc6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjc3NDbGFzcywgZmFjdG9yLCB5ZWFyLCBzdGFydFllYXIsIGVuZFllYXIsIGJlZm9yZUZuKXtcclxuXHRcdFx0dmFyIGh0bWwgPSAnJztcclxuXHRcdFx0dmFyIHN0ZXAgPSBmYWN0b3IgLyAxMDtcclxuXHRcdFx0dmFyIHZpZXcgPSB0aGlzLnBpY2tlci5maW5kKHNlbGVjdG9yKTtcclxuXHRcdFx0dmFyIHN0YXJ0VmFsID0gTWF0aC5mbG9vcih5ZWFyIC8gZmFjdG9yKSAqIGZhY3RvcjtcclxuXHRcdFx0dmFyIGVuZFZhbCA9IHN0YXJ0VmFsICsgc3RlcCAqIDk7XHJcblx0XHRcdHZhciBmb2N1c2VkVmFsID0gTWF0aC5mbG9vcih0aGlzLnZpZXdEYXRlLmdldEZ1bGxZZWFyKCkgLyBzdGVwKSAqIHN0ZXA7XHJcblx0XHRcdHZhciBzZWxlY3RlZCA9ICQubWFwKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGQpe1xyXG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKGQuZ2V0VVRDRnVsbFllYXIoKSAvIHN0ZXApICogc3RlcDtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgY2xhc3NlcywgdG9vbHRpcCwgYmVmb3JlO1xyXG5cdFx0XHRmb3IgKHZhciBjdXJyVmFsID0gc3RhcnRWYWwgLSBzdGVwOyBjdXJyVmFsIDw9IGVuZFZhbCArIHN0ZXA7IGN1cnJWYWwgKz0gc3RlcCkge1xyXG5cdFx0XHRcdGNsYXNzZXMgPSBbY3NzQ2xhc3NdO1xyXG5cdFx0XHRcdHRvb2x0aXAgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VyclZhbCA9PT0gc3RhcnRWYWwgLSBzdGVwKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ29sZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoY3VyclZhbCA9PT0gZW5kVmFsICsgc3RlcCkge1xyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCduZXcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCQuaW5BcnJheShjdXJyVmFsLCBzZWxlY3RlZCkgIT09IC0xKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY3VyclZhbCA8IHN0YXJ0WWVhciB8fCBjdXJyVmFsID4gZW5kWWVhcikge1xyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY3VyclZhbCA9PT0gZm9jdXNlZFZhbCkge1xyXG5cdFx0XHRcdCAgY2xhc3Nlcy5wdXNoKCdmb2N1c2VkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdFx0XHRpZiAoYmVmb3JlRm4gIT09ICQubm9vcCkge1xyXG5cdFx0XHRcdFx0YmVmb3JlID0gYmVmb3JlRm4obmV3IERhdGUoY3VyclZhbCwgMCwgMSkpO1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHt9O1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYmVmb3JlID09PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge2VuYWJsZWQ6IGJlZm9yZX07XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtjbGFzc2VzOiBiZWZvcmV9O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5lbmFibGVkID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmNsYXNzZXMpIHtcclxuXHRcdFx0XHRcdFx0Y2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGJlZm9yZS5jbGFzc2VzLnNwbGl0KC9cXHMrLykpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS50b29sdGlwKSB7XHJcblx0XHRcdFx0XHRcdHRvb2x0aXAgPSBiZWZvcmUudG9vbHRpcDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGh0bWwgKz0gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzZXMuam9pbignICcpICsgJ1wiJyArICh0b29sdGlwID8gJyB0aXRsZT1cIicgKyB0b29sdGlwICsgJ1wiJyA6ICcnKSArICc+JyArIGN1cnJWYWwgKyAnPC9zcGFuPic7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZpZXcuZmluZCgnLmRhdGVwaWNrZXItc3dpdGNoJykudGV4dChzdGFydFZhbCArICctJyArIGVuZFZhbCk7XHJcblx0XHRcdHZpZXcuZmluZCgndGQnKS5odG1sKGh0bWwpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRmaWxsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgZCA9IG5ldyBEYXRlKHRoaXMudmlld0RhdGUpLFxyXG5cdFx0XHRcdHllYXIgPSBkLmdldFVUQ0Z1bGxZZWFyKCksXHJcblx0XHRcdFx0bW9udGggPSBkLmdldFVUQ01vbnRoKCksXHJcblx0XHRcdFx0c3RhcnRZZWFyID0gdGhpcy5vLnN0YXJ0RGF0ZSAhPT0gLUluZmluaXR5ID8gdGhpcy5vLnN0YXJ0RGF0ZS5nZXRVVENGdWxsWWVhcigpIDogLUluZmluaXR5LFxyXG5cdFx0XHRcdHN0YXJ0TW9udGggPSB0aGlzLm8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkgPyB0aGlzLm8uc3RhcnREYXRlLmdldFVUQ01vbnRoKCkgOiAtSW5maW5pdHksXHJcblx0XHRcdFx0ZW5kWWVhciA9IHRoaXMuby5lbmREYXRlICE9PSBJbmZpbml0eSA/IHRoaXMuby5lbmREYXRlLmdldFVUQ0Z1bGxZZWFyKCkgOiBJbmZpbml0eSxcclxuXHRcdFx0XHRlbmRNb250aCA9IHRoaXMuby5lbmREYXRlICE9PSBJbmZpbml0eSA/IHRoaXMuby5lbmREYXRlLmdldFVUQ01vbnRoKCkgOiBJbmZpbml0eSxcclxuXHRcdFx0XHR0b2RheXR4dCA9IGRhdGVzW3RoaXMuby5sYW5ndWFnZV0udG9kYXkgfHwgZGF0ZXNbJ2VuJ10udG9kYXkgfHwgJycsXHJcblx0XHRcdFx0Y2xlYXJ0eHQgPSBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLmNsZWFyIHx8IGRhdGVzWydlbiddLmNsZWFyIHx8ICcnLFxyXG5cdFx0XHRcdHRpdGxlRm9ybWF0ID0gZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS50aXRsZUZvcm1hdCB8fCBkYXRlc1snZW4nXS50aXRsZUZvcm1hdCxcclxuXHRcdFx0XHR0b29sdGlwLFxyXG5cdFx0XHRcdGJlZm9yZTtcclxuXHRcdFx0aWYgKGlzTmFOKHllYXIpIHx8IGlzTmFOKG1vbnRoKSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLWRheXMgLmRhdGVwaWNrZXItc3dpdGNoJylcclxuXHRcdFx0XHRcdFx0LnRleHQoRFBHbG9iYWwuZm9ybWF0RGF0ZShkLCB0aXRsZUZvcm1hdCwgdGhpcy5vLmxhbmd1YWdlKSk7XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJ3Rmb290IC50b2RheScpXHJcblx0XHRcdFx0XHRcdC50ZXh0KHRvZGF5dHh0KVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgdGhpcy5vLnRvZGF5QnRuID09PSB0cnVlIHx8IHRoaXMuby50b2RheUJ0biA9PT0gJ2xpbmtlZCcgPyAndGFibGUtY2VsbCcgOiAnbm9uZScpO1xyXG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCd0Zm9vdCAuY2xlYXInKVxyXG5cdFx0XHRcdFx0XHQudGV4dChjbGVhcnR4dClcclxuXHRcdFx0XHRcdFx0LmNzcygnZGlzcGxheScsIHRoaXMuby5jbGVhckJ0biA9PT0gdHJ1ZSA/ICd0YWJsZS1jZWxsJyA6ICdub25lJyk7XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJ3RoZWFkIC5kYXRlcGlja2VyLXRpdGxlJylcclxuXHRcdFx0XHRcdFx0LnRleHQodGhpcy5vLnRpdGxlKVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgdHlwZW9mIHRoaXMuby50aXRsZSA9PT0gJ3N0cmluZycgJiYgdGhpcy5vLnRpdGxlICE9PSAnJyA/ICd0YWJsZS1jZWxsJyA6ICdub25lJyk7XHJcblx0XHRcdHRoaXMudXBkYXRlTmF2QXJyb3dzKCk7XHJcblx0XHRcdHRoaXMuZmlsbE1vbnRocygpO1xyXG5cdFx0XHR2YXIgcHJldk1vbnRoID0gVVRDRGF0ZSh5ZWFyLCBtb250aCwgMCksXHJcblx0XHRcdFx0ZGF5ID0gcHJldk1vbnRoLmdldFVUQ0RhdGUoKTtcclxuXHRcdFx0cHJldk1vbnRoLnNldFVUQ0RhdGUoZGF5IC0gKHByZXZNb250aC5nZXRVVENEYXkoKSAtIHRoaXMuby53ZWVrU3RhcnQgKyA3KSU3KTtcclxuXHRcdFx0dmFyIG5leHRNb250aCA9IG5ldyBEYXRlKHByZXZNb250aCk7XHJcblx0XHRcdGlmIChwcmV2TW9udGguZ2V0VVRDRnVsbFllYXIoKSA8IDEwMCl7XHJcbiAgICAgICAgbmV4dE1vbnRoLnNldFVUQ0Z1bGxZZWFyKHByZXZNb250aC5nZXRVVENGdWxsWWVhcigpKTtcclxuICAgICAgfVxyXG5cdFx0XHRuZXh0TW9udGguc2V0VVRDRGF0ZShuZXh0TW9udGguZ2V0VVRDRGF0ZSgpICsgNDIpO1xyXG5cdFx0XHRuZXh0TW9udGggPSBuZXh0TW9udGgudmFsdWVPZigpO1xyXG5cdFx0XHR2YXIgaHRtbCA9IFtdO1xyXG5cdFx0XHR2YXIgd2Vla0RheSwgY2xzTmFtZTtcclxuXHRcdFx0d2hpbGUgKHByZXZNb250aC52YWx1ZU9mKCkgPCBuZXh0TW9udGgpe1xyXG5cdFx0XHRcdHdlZWtEYXkgPSBwcmV2TW9udGguZ2V0VVRDRGF5KCk7XHJcblx0XHRcdFx0aWYgKHdlZWtEYXkgPT09IHRoaXMuby53ZWVrU3RhcnQpe1xyXG5cdFx0XHRcdFx0aHRtbC5wdXNoKCc8dHI+Jyk7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5vLmNhbGVuZGFyV2Vla3Mpe1xyXG5cdFx0XHRcdFx0XHQvLyBJU08gODYwMTogRmlyc3Qgd2VlayBjb250YWlucyBmaXJzdCB0aHVyc2RheS5cclxuXHRcdFx0XHRcdFx0Ly8gSVNPIGFsc28gc3RhdGVzIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgYnV0IHdlIGNhbiBiZSBtb3JlIGFic3RyYWN0IGhlcmUuXHJcblx0XHRcdFx0XHRcdHZhclxyXG5cdFx0XHRcdFx0XHRcdC8vIFN0YXJ0IG9mIGN1cnJlbnQgd2VlazogYmFzZWQgb24gd2Vla3N0YXJ0L2N1cnJlbnQgZGF0ZVxyXG5cdFx0XHRcdFx0XHRcdHdzID0gbmV3IERhdGUoK3ByZXZNb250aCArICh0aGlzLm8ud2Vla1N0YXJ0IC0gd2Vla0RheSAtIDcpICUgNyAqIDg2NGU1KSxcclxuXHRcdFx0XHRcdFx0XHQvLyBUaHVyc2RheSBvZiB0aGlzIHdlZWtcclxuXHRcdFx0XHRcdFx0XHR0aCA9IG5ldyBEYXRlKE51bWJlcih3cykgKyAoNyArIDQgLSB3cy5nZXRVVENEYXkoKSkgJSA3ICogODY0ZTUpLFxyXG5cdFx0XHRcdFx0XHRcdC8vIEZpcnN0IFRodXJzZGF5IG9mIHllYXIsIHllYXIgZnJvbSB0aHVyc2RheVxyXG5cdFx0XHRcdFx0XHRcdHl0aCA9IG5ldyBEYXRlKE51bWJlcih5dGggPSBVVENEYXRlKHRoLmdldFVUQ0Z1bGxZZWFyKCksIDAsIDEpKSArICg3ICsgNCAtIHl0aC5nZXRVVENEYXkoKSkgJSA3ICogODY0ZTUpLFxyXG5cdFx0XHRcdFx0XHRcdC8vIENhbGVuZGFyIHdlZWs6IG1zIGJldHdlZW4gdGh1cnNkYXlzLCBkaXYgbXMgcGVyIGRheSwgZGl2IDcgZGF5c1xyXG5cdFx0XHRcdFx0XHRcdGNhbFdlZWsgPSAodGggLSB5dGgpIC8gODY0ZTUgLyA3ICsgMTtcclxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8dGQgY2xhc3M9XCJjd1wiPicrIGNhbFdlZWsgKyc8L3RkPicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjbHNOYW1lID0gdGhpcy5nZXRDbGFzc05hbWVzKHByZXZNb250aCk7XHJcblx0XHRcdFx0Y2xzTmFtZS5wdXNoKCdkYXknKTtcclxuXHJcblx0XHRcdFx0dmFyIGNvbnRlbnQgPSBwcmV2TW9udGguZ2V0VVRDRGF0ZSgpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5vLmJlZm9yZVNob3dEYXkgIT09ICQubm9vcCl7XHJcblx0XHRcdFx0XHRiZWZvcmUgPSB0aGlzLm8uYmVmb3JlU2hvd0RheSh0aGlzLl91dGNfdG9fbG9jYWwocHJldk1vbnRoKSk7XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHt9O1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ2Jvb2xlYW4nKVxyXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7ZW5hYmxlZDogYmVmb3JlfTtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdzdHJpbmcnKVxyXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7Y2xhc3NlczogYmVmb3JlfTtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUuZW5hYmxlZCA9PT0gZmFsc2UpXHJcblx0XHRcdFx0XHRcdGNsc05hbWUucHVzaCgnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUuY2xhc3NlcylcclxuXHRcdFx0XHRcdFx0Y2xzTmFtZSA9IGNsc05hbWUuY29uY2F0KGJlZm9yZS5jbGFzc2VzLnNwbGl0KC9cXHMrLykpO1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS50b29sdGlwKVxyXG5cdFx0XHRcdFx0XHR0b29sdGlwID0gYmVmb3JlLnRvb2x0aXA7XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmNvbnRlbnQpXHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBiZWZvcmUuY29udGVudDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vQ2hlY2sgaWYgdW5pcXVlU29ydCBleGlzdHMgKHN1cHBvcnRlZCBieSBqcXVlcnkgPj0xLjEyIGFuZCA+PTIuMilcclxuXHRcdFx0XHQvL0ZhbGxiYWNrIHRvIHVuaXF1ZSBmdW5jdGlvbiBmb3Igb2xkZXIganF1ZXJ5IHZlcnNpb25zXHJcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbigkLnVuaXF1ZVNvcnQpKSB7XHJcblx0XHRcdFx0XHRjbHNOYW1lID0gJC51bmlxdWVTb3J0KGNsc05hbWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjbHNOYW1lID0gJC51bmlxdWUoY2xzTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRodG1sLnB1c2goJzx0ZCBjbGFzcz1cIicrY2xzTmFtZS5qb2luKCcgJykrJ1wiJyArICh0b29sdGlwID8gJyB0aXRsZT1cIicrdG9vbHRpcCsnXCInIDogJycpICsgJyBkYXRhLWRhdGU9XCInICsgcHJldk1vbnRoLmdldFRpbWUoKS50b1N0cmluZygpICsgJ1wiPicgKyBjb250ZW50ICsgJzwvdGQ+Jyk7XHJcblx0XHRcdFx0dG9vbHRpcCA9IG51bGw7XHJcblx0XHRcdFx0aWYgKHdlZWtEYXkgPT09IHRoaXMuby53ZWVrRW5kKXtcclxuXHRcdFx0XHRcdGh0bWwucHVzaCgnPC90cj4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cHJldk1vbnRoLnNldFVUQ0RhdGUocHJldk1vbnRoLmdldFVUQ0RhdGUoKSArIDEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLWRheXMgdGJvZHknKS5odG1sKGh0bWwuam9pbignJykpO1xyXG5cclxuXHRcdFx0dmFyIG1vbnRoc1RpdGxlID0gZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS5tb250aHNUaXRsZSB8fCBkYXRlc1snZW4nXS5tb250aHNUaXRsZSB8fCAnTW9udGhzJztcclxuXHRcdFx0dmFyIG1vbnRocyA9IHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLW1vbnRocycpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuZGF0ZXBpY2tlci1zd2l0Y2gnKVxyXG5cdFx0XHRcdFx0XHRcdC50ZXh0KHRoaXMuby5tYXhWaWV3TW9kZSA8IDIgPyBtb250aHNUaXRsZSA6IHllYXIpXHJcblx0XHRcdFx0XHRcdFx0LmVuZCgpXHJcblx0XHRcdFx0XHRcdC5maW5kKCd0Ym9keSBzcGFuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0JC5lYWNoKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGksIGQpe1xyXG5cdFx0XHRcdGlmIChkLmdldFVUQ0Z1bGxZZWFyKCkgPT09IHllYXIpXHJcblx0XHRcdFx0XHRtb250aHMuZXEoZC5nZXRVVENNb250aCgpKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKHllYXIgPCBzdGFydFllYXIgfHwgeWVhciA+IGVuZFllYXIpe1xyXG5cdFx0XHRcdG1vbnRocy5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoeWVhciA9PT0gc3RhcnRZZWFyKXtcclxuXHRcdFx0XHRtb250aHMuc2xpY2UoMCwgc3RhcnRNb250aCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHllYXIgPT09IGVuZFllYXIpe1xyXG5cdFx0XHRcdG1vbnRocy5zbGljZShlbmRNb250aCsxKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuby5iZWZvcmVTaG93TW9udGggIT09ICQubm9vcCl7XHJcblx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cdFx0XHRcdCQuZWFjaChtb250aHMsIGZ1bmN0aW9uKGksIG1vbnRoKXtcclxuICAgICAgICAgIHZhciBtb0RhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBpLCAxKTtcclxuICAgICAgICAgIHZhciBiZWZvcmUgPSB0aGF0Lm8uYmVmb3JlU2hvd01vbnRoKG1vRGF0ZSk7XHJcblx0XHRcdFx0XHRpZiAoYmVmb3JlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHt9O1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ2Jvb2xlYW4nKVxyXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7ZW5hYmxlZDogYmVmb3JlfTtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdzdHJpbmcnKVxyXG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7Y2xhc3NlczogYmVmb3JlfTtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUuZW5hYmxlZCA9PT0gZmFsc2UgJiYgISQobW9udGgpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKVxyXG5cdFx0XHRcdFx0ICAgICQobW9udGgpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5jbGFzc2VzKVxyXG5cdFx0XHRcdFx0ICAgICQobW9udGgpLmFkZENsYXNzKGJlZm9yZS5jbGFzc2VzKTtcclxuXHRcdFx0XHRcdGlmIChiZWZvcmUudG9vbHRpcClcclxuXHRcdFx0XHRcdCAgICAkKG1vbnRoKS5wcm9wKCd0aXRsZScsIGJlZm9yZS50b29sdGlwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gR2VuZXJhdGluZyBkZWNhZGUveWVhcnMgcGlja2VyXHJcblx0XHRcdHRoaXMuX2ZpbGxfeWVhcnNWaWV3KFxyXG5cdFx0XHRcdCcuZGF0ZXBpY2tlci15ZWFycycsXHJcblx0XHRcdFx0J3llYXInLFxyXG5cdFx0XHRcdDEwLFxyXG5cdFx0XHRcdHllYXIsXHJcblx0XHRcdFx0c3RhcnRZZWFyLFxyXG5cdFx0XHRcdGVuZFllYXIsXHJcblx0XHRcdFx0dGhpcy5vLmJlZm9yZVNob3dZZWFyXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0aW5nIGNlbnR1cnkvZGVjYWRlcyBwaWNrZXJcclxuXHRcdFx0dGhpcy5fZmlsbF95ZWFyc1ZpZXcoXHJcblx0XHRcdFx0Jy5kYXRlcGlja2VyLWRlY2FkZXMnLFxyXG5cdFx0XHRcdCdkZWNhZGUnLFxyXG5cdFx0XHRcdDEwMCxcclxuXHRcdFx0XHR5ZWFyLFxyXG5cdFx0XHRcdHN0YXJ0WWVhcixcclxuXHRcdFx0XHRlbmRZZWFyLFxyXG5cdFx0XHRcdHRoaXMuby5iZWZvcmVTaG93RGVjYWRlXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHQvLyBHZW5lcmF0aW5nIG1pbGxlbm5pdW0vY2VudHVyaWVzIHBpY2tlclxyXG5cdFx0XHR0aGlzLl9maWxsX3llYXJzVmlldyhcclxuXHRcdFx0XHQnLmRhdGVwaWNrZXItY2VudHVyaWVzJyxcclxuXHRcdFx0XHQnY2VudHVyeScsXHJcblx0XHRcdFx0MTAwMCxcclxuXHRcdFx0XHR5ZWFyLFxyXG5cdFx0XHRcdHN0YXJ0WWVhcixcclxuXHRcdFx0XHRlbmRZZWFyLFxyXG5cdFx0XHRcdHRoaXMuby5iZWZvcmVTaG93Q2VudHVyeVxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHJcblx0XHR1cGRhdGVOYXZBcnJvd3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmICghdGhpcy5fYWxsb3dfdXBkYXRlKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdHZhciBkID0gbmV3IERhdGUodGhpcy52aWV3RGF0ZSksXHJcblx0XHRcdFx0eWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKSxcclxuXHRcdFx0XHRtb250aCA9IGQuZ2V0VVRDTW9udGgoKSxcclxuXHRcdFx0XHRzdGFydFllYXIgPSB0aGlzLm8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkgPyB0aGlzLm8uc3RhcnREYXRlLmdldFVUQ0Z1bGxZZWFyKCkgOiAtSW5maW5pdHksXHJcblx0XHRcdFx0c3RhcnRNb250aCA9IHRoaXMuby5zdGFydERhdGUgIT09IC1JbmZpbml0eSA/IHRoaXMuby5zdGFydERhdGUuZ2V0VVRDTW9udGgoKSA6IC1JbmZpbml0eSxcclxuXHRcdFx0XHRlbmRZZWFyID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IEluZmluaXR5LFxyXG5cdFx0XHRcdGVuZE1vbnRoID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDTW9udGgoKSA6IEluZmluaXR5LFxyXG5cdFx0XHRcdHByZXZJc0Rpc2FibGVkLFxyXG5cdFx0XHRcdG5leHRJc0Rpc2FibGVkLFxyXG5cdFx0XHRcdGZhY3RvciA9IDE7XHJcblx0XHRcdHN3aXRjaCAodGhpcy52aWV3TW9kZSl7XHJcblx0XHRcdFx0Y2FzZSAwOlxyXG5cdFx0XHRcdFx0cHJldklzRGlzYWJsZWQgPSB5ZWFyIDw9IHN0YXJ0WWVhciAmJiBtb250aCA8PSBzdGFydE1vbnRoO1xyXG5cdFx0XHRcdFx0bmV4dElzRGlzYWJsZWQgPSB5ZWFyID49IGVuZFllYXIgJiYgbW9udGggPj0gZW5kTW9udGg7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIDQ6XHJcblx0XHRcdFx0XHRmYWN0b3IgKj0gMTA7XHJcblx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXHJcblx0XHRcdFx0Y2FzZSAzOlxyXG5cdFx0XHRcdFx0ZmFjdG9yICo9IDEwO1xyXG5cdFx0XHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xyXG5cdFx0XHRcdGNhc2UgMjpcclxuXHRcdFx0XHRcdGZhY3RvciAqPSAxMDtcclxuXHRcdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cclxuXHRcdFx0XHRjYXNlIDE6XHJcblx0XHRcdFx0XHRwcmV2SXNEaXNhYmxlZCA9IE1hdGguZmxvb3IoeWVhciAvIGZhY3RvcikgKiBmYWN0b3IgPD0gc3RhcnRZZWFyO1xyXG5cdFx0XHRcdFx0bmV4dElzRGlzYWJsZWQgPSBNYXRoLmZsb29yKHllYXIgLyBmYWN0b3IpICogZmFjdG9yICsgZmFjdG9yID49IGVuZFllYXI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLnByZXYnKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBwcmV2SXNEaXNhYmxlZCk7XHJcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5uZXh0JykudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgbmV4dElzRGlzYWJsZWQpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjbGljazogZnVuY3Rpb24oZSl7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdHZhciB0YXJnZXQsIGRpciwgZGF5LCB5ZWFyLCBtb250aDtcclxuXHRcdFx0dGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG5cdFx0XHQvLyBDbGlja2VkIG9uIHRoZSBzd2l0Y2hcclxuXHRcdFx0aWYgKHRhcmdldC5oYXNDbGFzcygnZGF0ZXBpY2tlci1zd2l0Y2gnKSAmJiB0aGlzLnZpZXdNb2RlICE9PSB0aGlzLm8ubWF4Vmlld01vZGUpe1xyXG5cdFx0XHRcdHRoaXMuc2V0Vmlld01vZGUodGhpcy52aWV3TW9kZSArIDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbGlja2VkIG9uIHRvZGF5IGJ1dHRvblxyXG5cdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCd0b2RheScpICYmICF0YXJnZXQuaGFzQ2xhc3MoJ2RheScpKXtcclxuXHRcdFx0XHR0aGlzLnNldFZpZXdNb2RlKDApO1xyXG5cdFx0XHRcdHRoaXMuX3NldERhdGUoVVRDVG9kYXkoKSwgdGhpcy5vLnRvZGF5QnRuID09PSAnbGlua2VkJyA/IG51bGwgOiAndmlldycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbGlja2VkIG9uIGNsZWFyIGJ1dHRvblxyXG5cdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCdjbGVhcicpKXtcclxuXHRcdFx0XHR0aGlzLmNsZWFyRGF0ZXMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF0YXJnZXQuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpe1xyXG5cdFx0XHRcdC8vIENsaWNrZWQgb24gYSBtb250aCwgeWVhciwgZGVjYWRlLCBjZW50dXJ5XHJcblx0XHRcdFx0aWYgKHRhcmdldC5oYXNDbGFzcygnbW9udGgnKVxyXG5cdFx0XHRcdFx0XHR8fCB0YXJnZXQuaGFzQ2xhc3MoJ3llYXInKVxyXG5cdFx0XHRcdFx0XHR8fCB0YXJnZXQuaGFzQ2xhc3MoJ2RlY2FkZScpXHJcblx0XHRcdFx0XHRcdHx8IHRhcmdldC5oYXNDbGFzcygnY2VudHVyeScpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlLnNldFVUQ0RhdGUoMSk7XHJcblxyXG5cdFx0XHRcdFx0ZGF5ID0gMTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnZpZXdNb2RlID09PSAxKXtcclxuXHRcdFx0XHRcdFx0bW9udGggPSB0YXJnZXQucGFyZW50KCkuZmluZCgnc3BhbicpLmluZGV4KHRhcmdldCk7XHJcblx0XHRcdFx0XHRcdHllYXIgPSB0aGlzLnZpZXdEYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XHJcblx0XHRcdFx0XHRcdHRoaXMudmlld0RhdGUuc2V0VVRDTW9udGgobW9udGgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bW9udGggPSAwO1xyXG5cdFx0XHRcdFx0XHR5ZWFyID0gTnVtYmVyKHRhcmdldC50ZXh0KCkpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoRFBHbG9iYWwudmlld01vZGVzW3RoaXMudmlld01vZGUgLSAxXS5lLCB0aGlzLnZpZXdEYXRlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy52aWV3TW9kZSA9PT0gdGhpcy5vLm1pblZpZXdNb2RlKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5fc2V0RGF0ZShVVENEYXRlKHllYXIsIG1vbnRoLCBkYXkpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0Vmlld01vZGUodGhpcy52aWV3TW9kZSAtIDEpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSAmJiB0aGlzLl9mb2N1c2VkX2Zyb20pe1xyXG5cdFx0XHRcdHRoaXMuX2ZvY3VzZWRfZnJvbS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9mb2N1c2VkX2Zyb207XHJcblx0XHR9LFxyXG5cclxuXHRcdGRheUNlbGxDbGljazogZnVuY3Rpb24oZSl7XHJcblx0XHRcdHZhciAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHR2YXIgdGltZXN0YW1wID0gJHRhcmdldC5kYXRhKCdkYXRlJyk7XHJcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm8udXBkYXRlVmlld0RhdGUpIHtcclxuXHRcdFx0XHRpZiAoZGF0ZS5nZXRVVENGdWxsWWVhcigpICE9PSB0aGlzLnZpZXdEYXRlLmdldFVUQ0Z1bGxZZWFyKCkpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZVllYXInLCB0aGlzLnZpZXdEYXRlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkYXRlLmdldFVUQ01vbnRoKCkgIT09IHRoaXMudmlld0RhdGUuZ2V0VVRDTW9udGgoKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlTW9udGgnLCB0aGlzLnZpZXdEYXRlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fc2V0RGF0ZShkYXRlKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gQ2xpY2tlZCBvbiBwcmV2IG9yIG5leHRcclxuXHRcdG5hdkFycm93c0NsaWNrOiBmdW5jdGlvbihlKXtcclxuXHRcdFx0dmFyICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblx0XHRcdHZhciBkaXIgPSAkdGFyZ2V0Lmhhc0NsYXNzKCdwcmV2JykgPyAtMSA6IDE7XHJcblx0XHRcdGlmICh0aGlzLnZpZXdNb2RlICE9PSAwKXtcclxuXHRcdFx0XHRkaXIgKj0gRFBHbG9iYWwudmlld01vZGVzW3RoaXMudmlld01vZGVdLm5hdlN0ZXAgKiAxMjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5tb3ZlTW9udGgodGhpcy52aWV3RGF0ZSwgZGlyKTtcclxuXHRcdFx0dGhpcy5fdHJpZ2dlcihEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZV0uZSwgdGhpcy52aWV3RGF0ZSk7XHJcblx0XHRcdHRoaXMuZmlsbCgpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRfdG9nZ2xlX211bHRpZGF0ZTogZnVuY3Rpb24oZGF0ZSl7XHJcblx0XHRcdHZhciBpeCA9IHRoaXMuZGF0ZXMuY29udGFpbnMoZGF0ZSk7XHJcblx0XHRcdGlmICghZGF0ZSl7XHJcblx0XHRcdFx0dGhpcy5kYXRlcy5jbGVhcigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaXggIT09IC0xKXtcclxuXHRcdFx0XHRpZiAodGhpcy5vLm11bHRpZGF0ZSA9PT0gdHJ1ZSB8fCB0aGlzLm8ubXVsdGlkYXRlID4gMSB8fCB0aGlzLm8udG9nZ2xlQWN0aXZlKXtcclxuXHRcdFx0XHRcdHRoaXMuZGF0ZXMucmVtb3ZlKGl4KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5vLm11bHRpZGF0ZSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLmRhdGVzLmNsZWFyKCk7XHJcblx0XHRcdFx0dGhpcy5kYXRlcy5wdXNoKGRhdGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGF0ZXMucHVzaChkYXRlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLm8ubXVsdGlkYXRlID09PSAnbnVtYmVyJylcclxuXHRcdFx0XHR3aGlsZSAodGhpcy5kYXRlcy5sZW5ndGggPiB0aGlzLm8ubXVsdGlkYXRlKVxyXG5cdFx0XHRcdFx0dGhpcy5kYXRlcy5yZW1vdmUoMCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdF9zZXREYXRlOiBmdW5jdGlvbihkYXRlLCB3aGljaCl7XHJcblx0XHRcdGlmICghd2hpY2ggfHwgd2hpY2ggPT09ICdkYXRlJylcclxuXHRcdFx0XHR0aGlzLl90b2dnbGVfbXVsdGlkYXRlKGRhdGUgJiYgbmV3IERhdGUoZGF0ZSkpO1xyXG5cdFx0XHRpZiAoKCF3aGljaCAmJiB0aGlzLm8udXBkYXRlVmlld0RhdGUpIHx8IHdoaWNoID09PSAndmlldycpXHJcblx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IGRhdGUgJiYgbmV3IERhdGUoZGF0ZSk7XHJcblxyXG5cdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xyXG5cdFx0XHRpZiAoIXdoaWNoIHx8IHdoaWNoICE9PSAndmlldycpIHtcclxuXHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5pbnB1dEZpZWxkLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRpZiAodGhpcy5vLmF1dG9jbG9zZSAmJiAoIXdoaWNoIHx8IHdoaWNoID09PSAnZGF0ZScpKXtcclxuXHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRtb3ZlRGF5OiBmdW5jdGlvbihkYXRlLCBkaXIpe1xyXG5cdFx0XHR2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdFx0XHRuZXdEYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaXIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ld0RhdGU7XHJcblx0XHR9LFxyXG5cclxuXHRcdG1vdmVXZWVrOiBmdW5jdGlvbihkYXRlLCBkaXIpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5tb3ZlRGF5KGRhdGUsIGRpciAqIDcpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRtb3ZlTW9udGg6IGZ1bmN0aW9uKGRhdGUsIGRpcil7XHJcblx0XHRcdGlmICghaXNWYWxpZERhdGUoZGF0ZSkpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuby5kZWZhdWx0Vmlld0RhdGU7XHJcblx0XHRcdGlmICghZGlyKVxyXG5cdFx0XHRcdHJldHVybiBkYXRlO1xyXG5cdFx0XHR2YXIgbmV3X2RhdGUgPSBuZXcgRGF0ZShkYXRlLnZhbHVlT2YoKSksXHJcblx0XHRcdFx0ZGF5ID0gbmV3X2RhdGUuZ2V0VVRDRGF0ZSgpLFxyXG5cdFx0XHRcdG1vbnRoID0gbmV3X2RhdGUuZ2V0VVRDTW9udGgoKSxcclxuXHRcdFx0XHRtYWcgPSBNYXRoLmFicyhkaXIpLFxyXG5cdFx0XHRcdG5ld19tb250aCwgdGVzdDtcclxuXHRcdFx0ZGlyID0gZGlyID4gMCA/IDEgOiAtMTtcclxuXHRcdFx0aWYgKG1hZyA9PT0gMSl7XHJcblx0XHRcdFx0dGVzdCA9IGRpciA9PT0gLTFcclxuXHRcdFx0XHRcdC8vIElmIGdvaW5nIGJhY2sgb25lIG1vbnRoLCBtYWtlIHN1cmUgbW9udGggaXMgbm90IGN1cnJlbnQgbW9udGhcclxuXHRcdFx0XHRcdC8vIChlZywgTWFyIDMxIC0+IEZlYiAzMSA9PSBGZWIgMjgsIG5vdCBNYXIgMDIpXHJcblx0XHRcdFx0XHQ/IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXdfZGF0ZS5nZXRVVENNb250aCgpID09PSBtb250aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIElmIGdvaW5nIGZvcndhcmQgb25lIG1vbnRoLCBtYWtlIHN1cmUgbW9udGggaXMgYXMgZXhwZWN0ZWRcclxuXHRcdFx0XHRcdC8vIChlZywgSmFuIDMxIC0+IEZlYiAzMSA9PSBGZWIgMjgsIG5vdCBNYXIgMDIpXHJcblx0XHRcdFx0XHQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXdfZGF0ZS5nZXRVVENNb250aCgpICE9PSBuZXdfbW9udGg7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdG5ld19tb250aCA9IG1vbnRoICsgZGlyO1xyXG5cdFx0XHRcdG5ld19kYXRlLnNldFVUQ01vbnRoKG5ld19tb250aCk7XHJcblx0XHRcdFx0Ly8gRGVjIC0+IEphbiAoMTIpIG9yIEphbiAtPiBEZWMgKC0xKSAtLSBsaW1pdCBleHBlY3RlZCBkYXRlIHRvIDAtMTFcclxuXHRcdFx0XHRuZXdfbW9udGggPSAobmV3X21vbnRoICsgMTIpICUgMTI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gRm9yIG1hZ25pdHVkZXMgPjEsIG1vdmUgb25lIG1vbnRoIGF0IGEgdGltZS4uLlxyXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaSA8IG1hZzsgaSsrKVxyXG5cdFx0XHRcdFx0Ly8gLi4ud2hpY2ggbWlnaHQgZGVjcmVhc2UgdGhlIGRheSAoZWcsIEphbiAzMSB0byBGZWIgMjgsIGV0YykuLi5cclxuXHRcdFx0XHRcdG5ld19kYXRlID0gdGhpcy5tb3ZlTW9udGgobmV3X2RhdGUsIGRpcik7XHJcblx0XHRcdFx0Ly8gLi4udGhlbiByZXNldCB0aGUgZGF5LCBrZWVwaW5nIGl0IGluIHRoZSBuZXcgbW9udGhcclxuXHRcdFx0XHRuZXdfbW9udGggPSBuZXdfZGF0ZS5nZXRVVENNb250aCgpO1xyXG5cdFx0XHRcdG5ld19kYXRlLnNldFVUQ0RhdGUoZGF5KTtcclxuXHRcdFx0XHR0ZXN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHJldHVybiBuZXdfbW9udGggIT09IG5ld19kYXRlLmdldFVUQ01vbnRoKCk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBDb21tb24gZGF0ZS1yZXNldHRpbmcgbG9vcCAtLSBpZiBkYXRlIGlzIGJleW9uZCBlbmQgb2YgbW9udGgsIG1ha2UgaXRcclxuXHRcdFx0Ly8gZW5kIG9mIG1vbnRoXHJcblx0XHRcdHdoaWxlICh0ZXN0KCkpe1xyXG5cdFx0XHRcdG5ld19kYXRlLnNldFVUQ0RhdGUoLS1kYXkpO1xyXG5cdFx0XHRcdG5ld19kYXRlLnNldFVUQ01vbnRoKG5ld19tb250aCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ld19kYXRlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRtb3ZlWWVhcjogZnVuY3Rpb24oZGF0ZSwgZGlyKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMubW92ZU1vbnRoKGRhdGUsIGRpcioxMik7XHJcblx0XHR9LFxyXG5cclxuXHRcdG1vdmVBdmFpbGFibGVEYXRlOiBmdW5jdGlvbihkYXRlLCBkaXIsIGZuKXtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdGRhdGUgPSB0aGlzW2ZuXShkYXRlLCBkaXIpO1xyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuZGF0ZVdpdGhpblJhbmdlKGRhdGUpKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRmbiA9ICdtb3ZlRGF5JztcclxuXHRcdFx0fVxyXG5cdFx0XHR3aGlsZSAodGhpcy5kYXRlSXNEaXNhYmxlZChkYXRlKSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0ZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0d2Vla09mRGF0ZUlzRGlzYWJsZWQ6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cdFx0XHRyZXR1cm4gJC5pbkFycmF5KGRhdGUuZ2V0VVRDRGF5KCksIHRoaXMuby5kYXlzT2ZXZWVrRGlzYWJsZWQpICE9PSAtMTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGF0ZUlzRGlzYWJsZWQ6IGZ1bmN0aW9uKGRhdGUpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdHRoaXMud2Vla09mRGF0ZUlzRGlzYWJsZWQoZGF0ZSkgfHxcclxuXHRcdFx0XHQkLmdyZXAodGhpcy5vLmRhdGVzRGlzYWJsZWQsIGZ1bmN0aW9uKGQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGlzVVRDRXF1YWxzKGRhdGUsIGQpO1xyXG5cdFx0XHRcdH0pLmxlbmd0aCA+IDBcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGF0ZVdpdGhpblJhbmdlOiBmdW5jdGlvbihkYXRlKXtcclxuXHRcdFx0cmV0dXJuIGRhdGUgPj0gdGhpcy5vLnN0YXJ0RGF0ZSAmJiBkYXRlIDw9IHRoaXMuby5lbmREYXRlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRrZXlkb3duOiBmdW5jdGlvbihlKXtcclxuXHRcdFx0aWYgKCF0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSl7XHJcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PT0gNDAgfHwgZS5rZXlDb2RlID09PSAyNykgeyAvLyBhbGxvdyBkb3duIHRvIHJlLXNob3cgcGlja2VyXHJcblx0XHRcdFx0XHR0aGlzLnNob3coKTtcclxuXHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgZGF0ZUNoYW5nZWQgPSBmYWxzZSxcclxuXHRcdFx0XHRkaXIsIG5ld1ZpZXdEYXRlLFxyXG5cdFx0XHRcdGZvY3VzRGF0ZSA9IHRoaXMuZm9jdXNEYXRlIHx8IHRoaXMudmlld0RhdGU7XHJcblx0XHRcdHN3aXRjaCAoZS5rZXlDb2RlKXtcclxuXHRcdFx0XHRjYXNlIDI3OiAvLyBlc2NhcGVcclxuXHRcdFx0XHRcdGlmICh0aGlzLmZvY3VzRGF0ZSl7XHJcblx0XHRcdFx0XHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAzNzogLy8gbGVmdFxyXG5cdFx0XHRcdGNhc2UgMzg6IC8vIHVwXHJcblx0XHRcdFx0Y2FzZSAzOTogLy8gcmlnaHRcclxuXHRcdFx0XHRjYXNlIDQwOiAvLyBkb3duXHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuby5rZXlib2FyZE5hdmlnYXRpb24gfHwgdGhpcy5vLmRheXNPZldlZWtEaXNhYmxlZC5sZW5ndGggPT09IDcpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGlyID0gZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM4ID8gLTEgOiAxO1xyXG4gICAgICAgICAgaWYgKHRoaXMudmlld01vZGUgPT09IDApIHtcclxuICBcdFx0XHRcdFx0aWYgKGUuY3RybEtleSl7XHJcbiAgXHRcdFx0XHRcdFx0bmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZVllYXInKTtcclxuXHJcbiAgXHRcdFx0XHRcdFx0aWYgKG5ld1ZpZXdEYXRlKVxyXG4gIFx0XHRcdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlWWVhcicsIHRoaXMudmlld0RhdGUpO1xyXG4gIFx0XHRcdFx0XHR9IGVsc2UgaWYgKGUuc2hpZnRLZXkpe1xyXG4gIFx0XHRcdFx0XHRcdG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVNb250aCcpO1xyXG5cclxuICBcdFx0XHRcdFx0XHRpZiAobmV3Vmlld0RhdGUpXHJcbiAgXHRcdFx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VNb250aCcsIHRoaXMudmlld0RhdGUpO1xyXG4gIFx0XHRcdFx0XHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSl7XHJcbiAgXHRcdFx0XHRcdFx0bmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZURheScpO1xyXG4gIFx0XHRcdFx0XHR9IGVsc2UgaWYgKCF0aGlzLndlZWtPZkRhdGVJc0Rpc2FibGVkKGZvY3VzRGF0ZSkpe1xyXG4gIFx0XHRcdFx0XHRcdG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVXZWVrJyk7XHJcbiAgXHRcdFx0XHRcdH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgZGlyID0gZGlyICogNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlTW9udGgnKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gMikge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgZGlyID0gZGlyICogNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlWWVhcicpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdFx0aWYgKG5ld1ZpZXdEYXRlKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c0RhdGUgPSB0aGlzLnZpZXdEYXRlID0gbmV3Vmlld0RhdGU7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5maWxsKCk7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgMTM6IC8vIGVudGVyXHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuby5mb3JjZVBhcnNlKVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGZvY3VzRGF0ZSA9IHRoaXMuZm9jdXNEYXRlIHx8IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuby5rZXlib2FyZE5hdmlnYXRpb24pIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fdG9nZ2xlX211bHRpZGF0ZShmb2N1c0RhdGUpO1xyXG5cdFx0XHRcdFx0XHRkYXRlQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XHJcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gdGhpcy5kYXRlcy5nZXQoLTEpIHx8IHRoaXMudmlld0RhdGU7XHJcblx0XHRcdFx0XHR0aGlzLnNldFZhbHVlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSl7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuby5hdXRvY2xvc2UpXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIDk6IC8vIHRhYlxyXG5cdFx0XHRcdFx0dGhpcy5mb2N1c0RhdGUgPSBudWxsO1xyXG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xyXG5cdFx0XHRcdFx0dGhpcy5maWxsKCk7XHJcblx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChkYXRlQ2hhbmdlZCl7XHJcblx0XHRcdFx0aWYgKHRoaXMuZGF0ZXMubGVuZ3RoKVxyXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlRGF0ZScpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NsZWFyRGF0ZScpO1xyXG5cdFx0XHRcdHRoaXMuaW5wdXRGaWVsZC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRzZXRWaWV3TW9kZTogZnVuY3Rpb24odmlld01vZGUpe1xyXG5cdFx0XHR0aGlzLnZpZXdNb2RlID0gdmlld01vZGU7XHJcblx0XHRcdHRoaXMucGlja2VyXHJcblx0XHRcdFx0LmNoaWxkcmVuKCdkaXYnKVxyXG5cdFx0XHRcdC5oaWRlKClcclxuXHRcdFx0XHQuZmlsdGVyKCcuZGF0ZXBpY2tlci0nICsgRFBHbG9iYWwudmlld01vZGVzW3RoaXMudmlld01vZGVdLmNsc05hbWUpXHJcblx0XHRcdFx0XHQuc2hvdygpO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZU5hdkFycm93cygpO1xyXG4gICAgICB0aGlzLl90cmlnZ2VyKCdjaGFuZ2VWaWV3TW9kZScsIG5ldyBEYXRlKHRoaXMudmlld0RhdGUpKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR2YXIgRGF0ZVJhbmdlUGlja2VyID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucyl7XHJcblx0XHQkLmRhdGEoZWxlbWVudCwgJ2RhdGVwaWNrZXInLCB0aGlzKTtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmlucHV0cyA9ICQubWFwKG9wdGlvbnMuaW5wdXRzLCBmdW5jdGlvbihpKXtcclxuXHRcdFx0cmV0dXJuIGkuanF1ZXJ5ID8gaVswXSA6IGk7XHJcblx0XHR9KTtcclxuXHRcdGRlbGV0ZSBvcHRpb25zLmlucHV0cztcclxuXHJcblx0XHR0aGlzLmtlZXBFbXB0eVZhbHVlcyA9IG9wdGlvbnMua2VlcEVtcHR5VmFsdWVzO1xyXG5cdFx0ZGVsZXRlIG9wdGlvbnMua2VlcEVtcHR5VmFsdWVzO1xyXG5cclxuXHRcdGRhdGVwaWNrZXJQbHVnaW4uY2FsbCgkKHRoaXMuaW5wdXRzKSwgb3B0aW9ucylcclxuXHRcdFx0Lm9uKCdjaGFuZ2VEYXRlJywgJC5wcm94eSh0aGlzLmRhdGVVcGRhdGVkLCB0aGlzKSk7XHJcblxyXG5cdFx0dGhpcy5waWNrZXJzID0gJC5tYXAodGhpcy5pbnB1dHMsIGZ1bmN0aW9uKGkpe1xyXG5cdFx0XHRyZXR1cm4gJC5kYXRhKGksICdkYXRlcGlja2VyJyk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMudXBkYXRlRGF0ZXMoKTtcclxuXHR9O1xyXG5cdERhdGVSYW5nZVBpY2tlci5wcm90b3R5cGUgPSB7XHJcblx0XHR1cGRhdGVEYXRlczogZnVuY3Rpb24oKXtcclxuXHRcdFx0dGhpcy5kYXRlcyA9ICQubWFwKHRoaXMucGlja2VycywgZnVuY3Rpb24oaSl7XHJcblx0XHRcdFx0cmV0dXJuIGkuZ2V0VVRDRGF0ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy51cGRhdGVSYW5nZXMoKTtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVSYW5nZXM6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciByYW5nZSA9ICQubWFwKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGQpe1xyXG5cdFx0XHRcdHJldHVybiBkLnZhbHVlT2YoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdCQuZWFjaCh0aGlzLnBpY2tlcnMsIGZ1bmN0aW9uKGksIHApe1xyXG5cdFx0XHRcdHAuc2V0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRkYXRlVXBkYXRlZDogZnVuY3Rpb24oZSl7XHJcblx0XHRcdC8vIGB0aGlzLnVwZGF0aW5nYCBpcyBhIHdvcmthcm91bmQgZm9yIHByZXZlbnRpbmcgaW5maW5pdGUgcmVjdXJzaW9uXHJcblx0XHRcdC8vIGJldHdlZW4gYGNoYW5nZURhdGVgIHRyaWdnZXJpbmcgYW5kIGBzZXRVVENEYXRlYCBjYWxsaW5nLiAgVW50aWxcclxuXHRcdFx0Ly8gdGhlcmUgaXMgYSBiZXR0ZXIgbWVjaGFuaXNtLlxyXG5cdFx0XHRpZiAodGhpcy51cGRhdGluZylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHRoaXMudXBkYXRpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0dmFyIGRwID0gJC5kYXRhKGUudGFyZ2V0LCAnZGF0ZXBpY2tlcicpO1xyXG5cclxuXHRcdFx0aWYgKGRwID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBuZXdfZGF0ZSA9IGRwLmdldFVUQ0RhdGUoKSxcclxuXHRcdFx0XHRrZWVwX2VtcHR5X3ZhbHVlcyA9IHRoaXMua2VlcEVtcHR5VmFsdWVzLFxyXG5cdFx0XHRcdGkgPSAkLmluQXJyYXkoZS50YXJnZXQsIHRoaXMuaW5wdXRzKSxcclxuXHRcdFx0XHRqID0gaSAtIDEsXHJcblx0XHRcdFx0ayA9IGkgKyAxLFxyXG5cdFx0XHRcdGwgPSB0aGlzLmlucHV0cy5sZW5ndGg7XHJcblx0XHRcdGlmIChpID09PSAtMSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHQkLmVhY2godGhpcy5waWNrZXJzLCBmdW5jdGlvbihpLCBwKXtcclxuXHRcdFx0XHRpZiAoIXAuZ2V0VVRDRGF0ZSgpICYmIChwID09PSBkcCB8fCAha2VlcF9lbXB0eV92YWx1ZXMpKVxyXG5cdFx0XHRcdFx0cC5zZXRVVENEYXRlKG5ld19kYXRlKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAobmV3X2RhdGUgPCB0aGlzLmRhdGVzW2pdKXtcclxuXHRcdFx0XHQvLyBEYXRlIGJlaW5nIG1vdmVkIGVhcmxpZXIvbGVmdFxyXG5cdFx0XHRcdHdoaWxlIChqID49IDAgJiYgbmV3X2RhdGUgPCB0aGlzLmRhdGVzW2pdKXtcclxuXHRcdFx0XHRcdHRoaXMucGlja2Vyc1tqLS1dLnNldFVUQ0RhdGUobmV3X2RhdGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChuZXdfZGF0ZSA+IHRoaXMuZGF0ZXNba10pe1xyXG5cdFx0XHRcdC8vIERhdGUgYmVpbmcgbW92ZWQgbGF0ZXIvcmlnaHRcclxuXHRcdFx0XHR3aGlsZSAoayA8IGwgJiYgbmV3X2RhdGUgPiB0aGlzLmRhdGVzW2tdKXtcclxuXHRcdFx0XHRcdHRoaXMucGlja2Vyc1trKytdLnNldFVUQ0RhdGUobmV3X2RhdGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnVwZGF0ZURhdGVzKCk7XHJcblxyXG5cdFx0XHRkZWxldGUgdGhpcy51cGRhdGluZztcclxuXHRcdH0sXHJcblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xyXG5cdFx0XHQkLm1hcCh0aGlzLnBpY2tlcnMsIGZ1bmN0aW9uKHApeyBwLmRlc3Ryb3koKTsgfSk7XHJcblx0XHRcdCQodGhpcy5pbnB1dHMpLm9mZignY2hhbmdlRGF0ZScsIHRoaXMuZGF0ZVVwZGF0ZWQpO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGEoKS5kYXRlcGlja2VyO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZTogYWxpYXMoJ2Rlc3Ryb3knLCAnTWV0aG9kIGByZW1vdmVgIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDIuMC4gVXNlIGBkZXN0cm95YCBpbnN0ZWFkJylcclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiBvcHRzX2Zyb21fZWwoZWwsIHByZWZpeCl7XHJcblx0XHQvLyBEZXJpdmUgb3B0aW9ucyBmcm9tIGVsZW1lbnQgZGF0YS1hdHRyc1xyXG5cdFx0dmFyIGRhdGEgPSAkKGVsKS5kYXRhKCksXHJcblx0XHRcdG91dCA9IHt9LCBpbmtleSxcclxuXHRcdFx0cmVwbGFjZSA9IG5ldyBSZWdFeHAoJ14nICsgcHJlZml4LnRvTG93ZXJDYXNlKCkgKyAnKFtBLVpdKScpO1xyXG5cdFx0cHJlZml4ID0gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSk7XHJcblx0XHRmdW5jdGlvbiByZV9sb3dlcihfLGEpe1xyXG5cdFx0XHRyZXR1cm4gYS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yICh2YXIga2V5IGluIGRhdGEpXHJcblx0XHRcdGlmIChwcmVmaXgudGVzdChrZXkpKXtcclxuXHRcdFx0XHRpbmtleSA9IGtleS5yZXBsYWNlKHJlcGxhY2UsIHJlX2xvd2VyKTtcclxuXHRcdFx0XHRvdXRbaW5rZXldID0gZGF0YVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHRyZXR1cm4gb3V0O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gb3B0c19mcm9tX2xvY2FsZShsYW5nKXtcclxuXHRcdC8vIERlcml2ZSBvcHRpb25zIGZyb20gbG9jYWxlIHBsdWdpbnNcclxuXHRcdHZhciBvdXQgPSB7fTtcclxuXHRcdC8vIENoZWNrIGlmIFwiZGUtREVcIiBzdHlsZSBkYXRlIGlzIGF2YWlsYWJsZSwgaWYgbm90IGxhbmd1YWdlIHNob3VsZFxyXG5cdFx0Ly8gZmFsbGJhY2sgdG8gMiBsZXR0ZXIgY29kZSBlZyBcImRlXCJcclxuXHRcdGlmICghZGF0ZXNbbGFuZ10pe1xyXG5cdFx0XHRsYW5nID0gbGFuZy5zcGxpdCgnLScpWzBdO1xyXG5cdFx0XHRpZiAoIWRhdGVzW2xhbmddKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciBkID0gZGF0ZXNbbGFuZ107XHJcblx0XHQkLmVhY2gobG9jYWxlX29wdHMsIGZ1bmN0aW9uKGksayl7XHJcblx0XHRcdGlmIChrIGluIGQpXHJcblx0XHRcdFx0b3V0W2tdID0gZFtrXTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG91dDtcclxuXHR9XHJcblxyXG5cdHZhciBvbGQgPSAkLmZuLmRhdGVwaWNrZXI7XHJcblx0dmFyIGRhdGVwaWNrZXJQbHVnaW4gPSBmdW5jdGlvbihvcHRpb24pe1xyXG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG5cdFx0YXJncy5zaGlmdCgpO1xyXG5cdFx0dmFyIGludGVybmFsX3JldHVybjtcclxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdGRhdGEgPSAkdGhpcy5kYXRhKCdkYXRlcGlja2VyJyksXHJcblx0XHRcdFx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT09ICdvYmplY3QnICYmIG9wdGlvbjtcclxuXHRcdFx0aWYgKCFkYXRhKXtcclxuXHRcdFx0XHR2YXIgZWxvcHRzID0gb3B0c19mcm9tX2VsKHRoaXMsICdkYXRlJyksXHJcblx0XHRcdFx0XHQvLyBQcmVsaW1pbmFyeSBvdGlvbnNcclxuXHRcdFx0XHRcdHhvcHRzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBlbG9wdHMsIG9wdGlvbnMpLFxyXG5cdFx0XHRcdFx0bG9jb3B0cyA9IG9wdHNfZnJvbV9sb2NhbGUoeG9wdHMubGFuZ3VhZ2UpLFxyXG5cdFx0XHRcdFx0Ly8gT3B0aW9ucyBwcmlvcml0eToganMgYXJncywgZGF0YS1hdHRycywgbG9jYWxlcywgZGVmYXVsdHNcclxuXHRcdFx0XHRcdG9wdHMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGxvY29wdHMsIGVsb3B0cywgb3B0aW9ucyk7XHJcblx0XHRcdFx0aWYgKCR0aGlzLmhhc0NsYXNzKCdpbnB1dC1kYXRlcmFuZ2UnKSB8fCBvcHRzLmlucHV0cyl7XHJcblx0XHRcdFx0XHQkLmV4dGVuZChvcHRzLCB7XHJcblx0XHRcdFx0XHRcdGlucHV0czogb3B0cy5pbnB1dHMgfHwgJHRoaXMuZmluZCgnaW5wdXQnKS50b0FycmF5KClcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0ZGF0YSA9IG5ldyBEYXRlUmFuZ2VQaWNrZXIodGhpcywgb3B0cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGF0YSA9IG5ldyBEYXRlcGlja2VyKHRoaXMsIG9wdHMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkdGhpcy5kYXRhKCdkYXRlcGlja2VyJywgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnICYmIHR5cGVvZiBkYXRhW29wdGlvbl0gPT09ICdmdW5jdGlvbicpe1xyXG5cdFx0XHRcdGludGVybmFsX3JldHVybiA9IGRhdGFbb3B0aW9uXS5hcHBseShkYXRhLCBhcmdzKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHRpbnRlcm5hbF9yZXR1cm4gPT09IHVuZGVmaW5lZCB8fFxyXG5cdFx0XHRpbnRlcm5hbF9yZXR1cm4gaW5zdGFuY2VvZiBEYXRlcGlja2VyIHx8XHJcblx0XHRcdGludGVybmFsX3JldHVybiBpbnN0YW5jZW9mIERhdGVSYW5nZVBpY2tlclxyXG5cdFx0KVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0XHRpZiAodGhpcy5sZW5ndGggPiAxKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VzaW5nIG9ubHkgYWxsb3dlZCBmb3IgdGhlIGNvbGxlY3Rpb24gb2YgYSBzaW5nbGUgZWxlbWVudCAoJyArIG9wdGlvbiArICcgZnVuY3Rpb24pJyk7XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBpbnRlcm5hbF9yZXR1cm47XHJcblx0fTtcclxuXHQkLmZuLmRhdGVwaWNrZXIgPSBkYXRlcGlja2VyUGx1Z2luO1xyXG5cclxuXHR2YXIgZGVmYXVsdHMgPSAkLmZuLmRhdGVwaWNrZXIuZGVmYXVsdHMgPSB7XHJcblx0XHRhc3N1bWVOZWFyYnlZZWFyOiBmYWxzZSxcclxuXHRcdGF1dG9jbG9zZTogZmFsc2UsXHJcblx0XHRiZWZvcmVTaG93RGF5OiAkLm5vb3AsXHJcblx0XHRiZWZvcmVTaG93TW9udGg6ICQubm9vcCxcclxuXHRcdGJlZm9yZVNob3dZZWFyOiAkLm5vb3AsXHJcblx0XHRiZWZvcmVTaG93RGVjYWRlOiAkLm5vb3AsXHJcblx0XHRiZWZvcmVTaG93Q2VudHVyeTogJC5ub29wLFxyXG5cdFx0Y2FsZW5kYXJXZWVrczogZmFsc2UsXHJcblx0XHRjbGVhckJ0bjogZmFsc2UsXHJcblx0XHR0b2dnbGVBY3RpdmU6IGZhbHNlLFxyXG5cdFx0ZGF5c09mV2Vla0Rpc2FibGVkOiBbXSxcclxuXHRcdGRheXNPZldlZWtIaWdobGlnaHRlZDogW10sXHJcblx0XHRkYXRlc0Rpc2FibGVkOiBbXSxcclxuXHRcdGVuZERhdGU6IEluZmluaXR5LFxyXG5cdFx0Zm9yY2VQYXJzZTogdHJ1ZSxcclxuXHRcdGZvcm1hdDogJ21tL2RkL3l5eXknLFxyXG5cdFx0a2VlcEVtcHR5VmFsdWVzOiBmYWxzZSxcclxuXHRcdGtleWJvYXJkTmF2aWdhdGlvbjogdHJ1ZSxcclxuXHRcdGxhbmd1YWdlOiAnZW4nLFxyXG5cdFx0bWluVmlld01vZGU6IDAsXHJcblx0XHRtYXhWaWV3TW9kZTogNCxcclxuXHRcdG11bHRpZGF0ZTogZmFsc2UsXHJcblx0XHRtdWx0aWRhdGVTZXBhcmF0b3I6ICcsJyxcclxuXHRcdG9yaWVudGF0aW9uOiBcImF1dG9cIixcclxuXHRcdHJ0bDogZmFsc2UsXHJcblx0XHRzdGFydERhdGU6IC1JbmZpbml0eSxcclxuXHRcdHN0YXJ0VmlldzogMCxcclxuXHRcdHRvZGF5QnRuOiBmYWxzZSxcclxuXHRcdHRvZGF5SGlnaGxpZ2h0OiBmYWxzZSxcclxuXHRcdHVwZGF0ZVZpZXdEYXRlOiB0cnVlLFxyXG5cdFx0d2Vla1N0YXJ0OiAwLFxyXG5cdFx0ZGlzYWJsZVRvdWNoS2V5Ym9hcmQ6IGZhbHNlLFxyXG5cdFx0ZW5hYmxlT25SZWFkb25seTogdHJ1ZSxcclxuXHRcdHNob3dPbkZvY3VzOiB0cnVlLFxyXG5cdFx0ekluZGV4T2Zmc2V0OiAxMCxcclxuXHRcdGNvbnRhaW5lcjogJ2JvZHknLFxyXG5cdFx0aW1tZWRpYXRlVXBkYXRlczogZmFsc2UsXHJcblx0XHR0aXRsZTogJycsXHJcblx0XHR0ZW1wbGF0ZXM6IHtcclxuXHRcdFx0bGVmdEFycm93OiAnJiN4MDBBQjsnLFxyXG5cdFx0XHRyaWdodEFycm93OiAnJiN4MDBCQjsnXHJcblx0XHR9LFxyXG4gICAgc2hvd1dlZWtEYXlzOiB0cnVlXHJcblx0fTtcclxuXHR2YXIgbG9jYWxlX29wdHMgPSAkLmZuLmRhdGVwaWNrZXIubG9jYWxlX29wdHMgPSBbXHJcblx0XHQnZm9ybWF0JyxcclxuXHRcdCdydGwnLFxyXG5cdFx0J3dlZWtTdGFydCdcclxuXHRdO1xyXG5cdCQuZm4uZGF0ZXBpY2tlci5Db25zdHJ1Y3RvciA9IERhdGVwaWNrZXI7XHJcblx0dmFyIGRhdGVzID0gJC5mbi5kYXRlcGlja2VyLmRhdGVzID0ge1xyXG5cdFx0ZW46IHtcclxuXHRcdFx0ZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXHJcblx0XHRcdGRheXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxyXG5cdFx0XHRkYXlzTWluOiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcclxuXHRcdFx0bW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcclxuXHRcdFx0bW9udGhzU2hvcnQ6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcclxuXHRcdFx0dG9kYXk6IFwiVG9kYXlcIixcclxuXHRcdFx0Y2xlYXI6IFwiQ2xlYXJcIixcclxuXHRcdFx0dGl0bGVGb3JtYXQ6IFwiTU0geXl5eVwiXHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0dmFyIERQR2xvYmFsID0ge1xyXG5cdFx0dmlld01vZGVzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRuYW1lczogWydkYXlzJywgJ21vbnRoJ10sXHJcblx0XHRcdFx0Y2xzTmFtZTogJ2RheXMnLFxyXG5cdFx0XHRcdGU6ICdjaGFuZ2VNb250aCdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG5hbWVzOiBbJ21vbnRocycsICd5ZWFyJ10sXHJcblx0XHRcdFx0Y2xzTmFtZTogJ21vbnRocycsXHJcblx0XHRcdFx0ZTogJ2NoYW5nZVllYXInLFxyXG5cdFx0XHRcdG5hdlN0ZXA6IDFcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG5hbWVzOiBbJ3llYXJzJywgJ2RlY2FkZSddLFxyXG5cdFx0XHRcdGNsc05hbWU6ICd5ZWFycycsXHJcblx0XHRcdFx0ZTogJ2NoYW5nZURlY2FkZScsXHJcblx0XHRcdFx0bmF2U3RlcDogMTBcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG5hbWVzOiBbJ2RlY2FkZXMnLCAnY2VudHVyeSddLFxyXG5cdFx0XHRcdGNsc05hbWU6ICdkZWNhZGVzJyxcclxuXHRcdFx0XHRlOiAnY2hhbmdlQ2VudHVyeScsXHJcblx0XHRcdFx0bmF2U3RlcDogMTAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRuYW1lczogWydjZW50dXJpZXMnLCAnbWlsbGVubml1bSddLFxyXG5cdFx0XHRcdGNsc05hbWU6ICdjZW50dXJpZXMnLFxyXG5cdFx0XHRcdGU6ICdjaGFuZ2VNaWxsZW5uaXVtJyxcclxuXHRcdFx0XHRuYXZTdGVwOiAxMDAwXHJcblx0XHRcdH1cclxuXHRcdF0sXHJcblx0XHR2YWxpZFBhcnRzOiAvZGQ/fEREP3xtbT98TU0/fHl5KD86eXkpPy9nLFxyXG5cdFx0bm9ucHVuY3R1YXRpb246IC9bXiAtXFwvOi1AXFx1NWU3NFxcdTY3MDhcXHU2NWU1XFxbLWB7LX5cXHRcXG5cXHJdKy9nLFxyXG5cdFx0cGFyc2VGb3JtYXQ6IGZ1bmN0aW9uKGZvcm1hdCl7XHJcblx0XHRcdGlmICh0eXBlb2YgZm9ybWF0LnRvVmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGZvcm1hdC50b0Rpc3BsYXkgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgICAgICAgICAvLyBJRSB0cmVhdHMgXFwwIGFzIGEgc3RyaW5nIGVuZCBpbiBpbnB1dHMgKHRydW5jYXRpbmcgdGhlIHZhbHVlKSxcclxuXHRcdFx0Ly8gc28gaXQncyBhIGJhZCBmb3JtYXQgZGVsaW1pdGVyLCBhbnl3YXlcclxuXHRcdFx0dmFyIHNlcGFyYXRvcnMgPSBmb3JtYXQucmVwbGFjZSh0aGlzLnZhbGlkUGFydHMsICdcXDAnKS5zcGxpdCgnXFwwJyksXHJcblx0XHRcdFx0cGFydHMgPSBmb3JtYXQubWF0Y2godGhpcy52YWxpZFBhcnRzKTtcclxuXHRcdFx0aWYgKCFzZXBhcmF0b3JzIHx8ICFzZXBhcmF0b3JzLmxlbmd0aCB8fCAhcGFydHMgfHwgcGFydHMubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgZm9ybWF0LlwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4ge3NlcGFyYXRvcnM6IHNlcGFyYXRvcnMsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9LFxyXG5cdFx0cGFyc2VEYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQsIGxhbmd1YWdlLCBhc3N1bWVOZWFyYnkpe1xyXG5cdFx0XHRpZiAoIWRhdGUpXHJcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdFx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxyXG5cdFx0XHRcdHJldHVybiBkYXRlO1xyXG5cdFx0XHRpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycpXHJcblx0XHRcdFx0Zm9ybWF0ID0gRFBHbG9iYWwucGFyc2VGb3JtYXQoZm9ybWF0KTtcclxuXHRcdFx0aWYgKGZvcm1hdC50b1ZhbHVlKVxyXG5cdFx0XHRcdHJldHVybiBmb3JtYXQudG9WYWx1ZShkYXRlLCBmb3JtYXQsIGxhbmd1YWdlKTtcclxuXHRcdFx0dmFyIGZuX21hcCA9IHtcclxuXHRcdFx0XHRcdGQ6ICdtb3ZlRGF5JyxcclxuXHRcdFx0XHRcdG06ICdtb3ZlTW9udGgnLFxyXG5cdFx0XHRcdFx0dzogJ21vdmVXZWVrJyxcclxuXHRcdFx0XHRcdHk6ICdtb3ZlWWVhcidcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRhdGVBbGlhc2VzID0ge1xyXG5cdFx0XHRcdFx0eWVzdGVyZGF5OiAnLTFkJyxcclxuXHRcdFx0XHRcdHRvZGF5OiAnKzBkJyxcclxuXHRcdFx0XHRcdHRvbW9ycm93OiAnKzFkJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cGFydHMsIHBhcnQsIGRpciwgaSwgZm47XHJcblx0XHRcdGlmIChkYXRlIGluIGRhdGVBbGlhc2VzKXtcclxuXHRcdFx0XHRkYXRlID0gZGF0ZUFsaWFzZXNbZGF0ZV07XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKC9eW1xcLStdXFxkK1tkbXd5XShbXFxzLF0rW1xcLStdXFxkK1tkbXd5XSkqJC9pLnRlc3QoZGF0ZSkpe1xyXG5cdFx0XHRcdHBhcnRzID0gZGF0ZS5tYXRjaCgvKFtcXC0rXVxcZCspKFtkbXd5XSkvZ2kpO1xyXG5cdFx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRcdGZvciAoaT0wOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0cGFydCA9IHBhcnRzW2ldLm1hdGNoKC8oW1xcLStdXFxkKykoW2Rtd3ldKS9pKTtcclxuXHRcdFx0XHRcdGRpciA9IE51bWJlcihwYXJ0WzFdKTtcclxuXHRcdFx0XHRcdGZuID0gZm5fbWFwW3BhcnRbMl0udG9Mb3dlckNhc2UoKV07XHJcblx0XHRcdFx0XHRkYXRlID0gRGF0ZXBpY2tlci5wcm90b3R5cGVbZm5dKGRhdGUsIGRpcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBEYXRlcGlja2VyLnByb3RvdHlwZS5femVyb191dGNfdGltZShkYXRlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cGFydHMgPSBkYXRlICYmIGRhdGUubWF0Y2godGhpcy5ub25wdW5jdHVhdGlvbikgfHwgW107XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBhcHBseU5lYXJieVllYXIoeWVhciwgdGhyZXNob2xkKXtcclxuXHRcdFx0XHRpZiAodGhyZXNob2xkID09PSB0cnVlKVxyXG5cdFx0XHRcdFx0dGhyZXNob2xkID0gMTA7XHJcblxyXG5cdFx0XHRcdC8vIGlmIHllYXIgaXMgMiBkaWdpdHMgb3IgbGVzcywgdGhhbiB0aGUgdXNlciBtb3N0IGxpa2VseSBpcyB0cnlpbmcgdG8gZ2V0IGEgcmVjZW50IGNlbnR1cnlcclxuXHRcdFx0XHRpZiAoeWVhciA8IDEwMCl7XHJcblx0XHRcdFx0XHR5ZWFyICs9IDIwMDA7XHJcblx0XHRcdFx0XHQvLyBpZiB0aGUgbmV3IHllYXIgaXMgbW9yZSB0aGFuIHRocmVzaG9sZCB5ZWFycyBpbiBhZHZhbmNlLCB1c2UgbGFzdCBjZW50dXJ5XHJcblx0XHRcdFx0XHRpZiAoeWVhciA+ICgobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSt0aHJlc2hvbGQpKXtcclxuXHRcdFx0XHRcdFx0eWVhciAtPSAxMDA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4geWVhcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHBhcnNlZCA9IHt9LFxyXG5cdFx0XHRcdHNldHRlcnNfb3JkZXIgPSBbJ3l5eXknLCAneXknLCAnTScsICdNTScsICdtJywgJ21tJywgJ2QnLCAnZGQnXSxcclxuXHRcdFx0XHRzZXR0ZXJzX21hcCA9IHtcclxuXHRcdFx0XHRcdHl5eXk6IGZ1bmN0aW9uKGQsdil7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkLnNldFVUQ0Z1bGxZZWFyKGFzc3VtZU5lYXJieSA/IGFwcGx5TmVhcmJ5WWVhcih2LCBhc3N1bWVOZWFyYnkpIDogdik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bTogZnVuY3Rpb24oZCx2KXtcclxuXHRcdFx0XHRcdFx0aWYgKGlzTmFOKGQpKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBkO1xyXG5cdFx0XHRcdFx0XHR2IC09IDE7XHJcblx0XHRcdFx0XHRcdHdoaWxlICh2IDwgMCkgdiArPSAxMjtcclxuXHRcdFx0XHRcdFx0diAlPSAxMjtcclxuXHRcdFx0XHRcdFx0ZC5zZXRVVENNb250aCh2KTtcclxuXHRcdFx0XHRcdFx0d2hpbGUgKGQuZ2V0VVRDTW9udGgoKSAhPT0gdilcclxuXHRcdFx0XHRcdFx0XHRkLnNldFVUQ0RhdGUoZC5nZXRVVENEYXRlKCktMSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGQ6IGZ1bmN0aW9uKGQsdil7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkLnNldFVUQ0RhdGUodik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR2YWwsIGZpbHRlcmVkO1xyXG5cdFx0XHRzZXR0ZXJzX21hcFsneXknXSA9IHNldHRlcnNfbWFwWyd5eXl5J107XHJcblx0XHRcdHNldHRlcnNfbWFwWydNJ10gPSBzZXR0ZXJzX21hcFsnTU0nXSA9IHNldHRlcnNfbWFwWydtbSddID0gc2V0dGVyc19tYXBbJ20nXTtcclxuXHRcdFx0c2V0dGVyc19tYXBbJ2RkJ10gPSBzZXR0ZXJzX21hcFsnZCddO1xyXG5cdFx0XHRkYXRlID0gVVRDVG9kYXkoKTtcclxuXHRcdFx0dmFyIGZwYXJ0cyA9IGZvcm1hdC5wYXJ0cy5zbGljZSgpO1xyXG5cdFx0XHQvLyBSZW1vdmUgbm9vcCBwYXJ0c1xyXG5cdFx0XHRpZiAocGFydHMubGVuZ3RoICE9PSBmcGFydHMubGVuZ3RoKXtcclxuXHRcdFx0XHRmcGFydHMgPSAkKGZwYXJ0cykuZmlsdGVyKGZ1bmN0aW9uKGkscCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KHAsIHNldHRlcnNfb3JkZXIpICE9PSAtMTtcclxuXHRcdFx0XHR9KS50b0FycmF5KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gUHJvY2VzcyByZW1haW5kZXJcclxuXHRcdFx0ZnVuY3Rpb24gbWF0Y2hfcGFydCgpe1xyXG5cdFx0XHRcdHZhciBtID0gdGhpcy5zbGljZSgwLCBwYXJ0c1tpXS5sZW5ndGgpLFxyXG5cdFx0XHRcdFx0cCA9IHBhcnRzW2ldLnNsaWNlKDAsIG0ubGVuZ3RoKTtcclxuXHRcdFx0XHRyZXR1cm4gbS50b0xvd2VyQ2FzZSgpID09PSBwLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBhcnRzLmxlbmd0aCA9PT0gZnBhcnRzLmxlbmd0aCl7XHJcblx0XHRcdFx0dmFyIGNudDtcclxuXHRcdFx0XHRmb3IgKGk9MCwgY250ID0gZnBhcnRzLmxlbmd0aDsgaSA8IGNudDsgaSsrKXtcclxuXHRcdFx0XHRcdHZhbCA9IHBhcnNlSW50KHBhcnRzW2ldLCAxMCk7XHJcblx0XHRcdFx0XHRwYXJ0ID0gZnBhcnRzW2ldO1xyXG5cdFx0XHRcdFx0aWYgKGlzTmFOKHZhbCkpe1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKHBhcnQpe1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ01NJzpcclxuXHRcdFx0XHRcdFx0XHRcdGZpbHRlcmVkID0gJChkYXRlc1tsYW5ndWFnZV0ubW9udGhzKS5maWx0ZXIobWF0Y2hfcGFydCk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YWwgPSAkLmluQXJyYXkoZmlsdGVyZWRbMF0sIGRhdGVzW2xhbmd1YWdlXS5tb250aHMpICsgMTtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdGNhc2UgJ00nOlxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsdGVyZWQgPSAkKGRhdGVzW2xhbmd1YWdlXS5tb250aHNTaG9ydCkuZmlsdGVyKG1hdGNoX3BhcnQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsID0gJC5pbkFycmF5KGZpbHRlcmVkWzBdLCBkYXRlc1tsYW5ndWFnZV0ubW9udGhzU2hvcnQpICsgMTtcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwYXJzZWRbcGFydF0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBfZGF0ZSwgcztcclxuXHRcdFx0XHRmb3IgKGk9MDsgaSA8IHNldHRlcnNfb3JkZXIubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0cyA9IHNldHRlcnNfb3JkZXJbaV07XHJcblx0XHRcdFx0XHRpZiAocyBpbiBwYXJzZWQgJiYgIWlzTmFOKHBhcnNlZFtzXSkpe1xyXG5cdFx0XHRcdFx0XHRfZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdFx0XHRcdFx0XHRzZXR0ZXJzX21hcFtzXShfZGF0ZSwgcGFyc2VkW3NdKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFpc05hTihfZGF0ZSkpXHJcblx0XHRcdFx0XHRcdFx0ZGF0ZSA9IF9kYXRlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZGF0ZTtcclxuXHRcdH0sXHJcblx0XHRmb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQsIGxhbmd1YWdlKXtcclxuXHRcdFx0aWYgKCFkYXRlKVxyXG5cdFx0XHRcdHJldHVybiAnJztcclxuXHRcdFx0aWYgKHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnKVxyXG5cdFx0XHRcdGZvcm1hdCA9IERQR2xvYmFsLnBhcnNlRm9ybWF0KGZvcm1hdCk7XHJcblx0XHRcdGlmIChmb3JtYXQudG9EaXNwbGF5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC50b0Rpc3BsYXkoZGF0ZSwgZm9ybWF0LCBsYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSB7XHJcblx0XHRcdFx0ZDogZGF0ZS5nZXRVVENEYXRlKCksXHJcblx0XHRcdFx0RDogZGF0ZXNbbGFuZ3VhZ2VdLmRheXNTaG9ydFtkYXRlLmdldFVUQ0RheSgpXSxcclxuXHRcdFx0XHRERDogZGF0ZXNbbGFuZ3VhZ2VdLmRheXNbZGF0ZS5nZXRVVENEYXkoKV0sXHJcblx0XHRcdFx0bTogZGF0ZS5nZXRVVENNb250aCgpICsgMSxcclxuXHRcdFx0XHRNOiBkYXRlc1tsYW5ndWFnZV0ubW9udGhzU2hvcnRbZGF0ZS5nZXRVVENNb250aCgpXSxcclxuXHRcdFx0XHRNTTogZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRoc1tkYXRlLmdldFVUQ01vbnRoKCldLFxyXG5cdFx0XHRcdHl5OiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiksXHJcblx0XHRcdFx0eXl5eTogZGF0ZS5nZXRVVENGdWxsWWVhcigpXHJcblx0XHRcdH07XHJcblx0XHRcdHZhbC5kZCA9ICh2YWwuZCA8IDEwID8gJzAnIDogJycpICsgdmFsLmQ7XHJcblx0XHRcdHZhbC5tbSA9ICh2YWwubSA8IDEwID8gJzAnIDogJycpICsgdmFsLm07XHJcblx0XHRcdGRhdGUgPSBbXTtcclxuXHRcdFx0dmFyIHNlcHMgPSAkLmV4dGVuZChbXSwgZm9ybWF0LnNlcGFyYXRvcnMpO1xyXG5cdFx0XHRmb3IgKHZhciBpPTAsIGNudCA9IGZvcm1hdC5wYXJ0cy5sZW5ndGg7IGkgPD0gY250OyBpKyspe1xyXG5cdFx0XHRcdGlmIChzZXBzLmxlbmd0aClcclxuXHRcdFx0XHRcdGRhdGUucHVzaChzZXBzLnNoaWZ0KCkpO1xyXG5cdFx0XHRcdGRhdGUucHVzaCh2YWxbZm9ybWF0LnBhcnRzW2ldXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGRhdGUuam9pbignJyk7XHJcblx0XHR9LFxyXG5cdFx0aGVhZFRlbXBsYXRlOiAnPHRoZWFkPicrXHJcblx0XHRcdCAgICAgICAgICAgICAgJzx0cj4nK1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgJzx0aCBjb2xzcGFuPVwiN1wiIGNsYXNzPVwiZGF0ZXBpY2tlci10aXRsZVwiPjwvdGg+JytcclxuXHRcdFx0ICAgICAgICAgICAgICAnPC90cj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8dHI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGggY2xhc3M9XCJwcmV2XCI+JytkZWZhdWx0cy50ZW1wbGF0ZXMubGVmdEFycm93Kyc8L3RoPicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNvbHNwYW49XCI1XCIgY2xhc3M9XCJkYXRlcGlja2VyLXN3aXRjaFwiPjwvdGg+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGggY2xhc3M9XCJuZXh0XCI+JytkZWZhdWx0cy50ZW1wbGF0ZXMucmlnaHRBcnJvdysnPC90aD4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L3RyPicrXHJcblx0XHRcdFx0XHRcdCc8L3RoZWFkPicsXHJcblx0XHRjb250VGVtcGxhdGU6ICc8dGJvZHk+PHRyPjx0ZCBjb2xzcGFuPVwiN1wiPjwvdGQ+PC90cj48L3Rib2R5PicsXHJcblx0XHRmb290VGVtcGxhdGU6ICc8dGZvb3Q+JytcclxuXHRcdFx0XHRcdFx0XHQnPHRyPicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJ0b2RheVwiPjwvdGg+JytcclxuXHRcdFx0XHRcdFx0XHQnPC90cj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8dHI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGggY29sc3Bhbj1cIjdcIiBjbGFzcz1cImNsZWFyXCI+PC90aD4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L3RyPicrXHJcblx0XHRcdFx0XHRcdCc8L3Rmb290PidcclxuXHR9O1xyXG5cdERQR2xvYmFsLnRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyXCI+JytcclxuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZGF5c1wiPicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+JytcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuaGVhZFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPHRib2R5PjwvdGJvZHk+JytcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuZm9vdFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+JytcclxuXHRcdFx0XHRcdFx0XHQnPC9kaXY+JytcclxuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItbW9udGhzXCI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGFibGUgY2xhc3M9XCJ0YWJsZS1jb25kZW5zZWRcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuZm9vdFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+JytcclxuXHRcdFx0XHRcdFx0XHQnPC9kaXY+JytcclxuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXIteWVhcnNcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuY29udFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kZWNhZGVzXCI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGFibGUgY2xhc3M9XCJ0YWJsZS1jb25kZW5zZWRcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuZm9vdFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+JytcclxuXHRcdFx0XHRcdFx0XHQnPC9kaXY+JytcclxuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY2VudHVyaWVzXCI+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGFibGUgY2xhc3M9XCJ0YWJsZS1jb25kZW5zZWRcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXHJcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcclxuXHRcdFx0XHRcdFx0XHRcdFx0RFBHbG9iYWwuZm9vdFRlbXBsYXRlK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+JytcclxuXHRcdFx0XHRcdFx0XHQnPC9kaXY+JytcclxuXHRcdFx0XHRcdFx0JzwvZGl2Pic7XHJcblxyXG5cdCQuZm4uZGF0ZXBpY2tlci5EUEdsb2JhbCA9IERQR2xvYmFsO1xyXG5cclxuXHJcblx0LyogREFURVBJQ0tFUiBOTyBDT05GTElDVFxyXG5cdCogPT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQkLmZuLmRhdGVwaWNrZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkLmZuLmRhdGVwaWNrZXIgPSBvbGQ7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKiBEQVRFUElDS0VSIFZFUlNJT05cclxuXHQgKiA9PT09PT09PT09PT09PT09PT09ICovXHJcblx0JC5mbi5kYXRlcGlja2VyLnZlcnNpb24gPSAnMS43LjEnO1xyXG5cclxuXHQkLmZuLmRhdGVwaWNrZXIuZGVwcmVjYXRlZCA9IGZ1bmN0aW9uKG1zZyl7XHJcblx0XHR2YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xyXG5cdFx0aWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XHJcblx0XHRcdGNvbnNvbGUud2FybignREVQUkVDQVRFRDogJyArIG1zZyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblxyXG5cdC8qIERBVEVQSUNLRVIgREFUQS1BUElcclxuXHQqID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcclxuXHRcdCdmb2N1cy5kYXRlcGlja2VyLmRhdGEtYXBpIGNsaWNrLmRhdGVwaWNrZXIuZGF0YS1hcGknLFxyXG5cdFx0J1tkYXRhLXByb3ZpZGU9XCJkYXRlcGlja2VyXCJdJyxcclxuXHRcdGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHRpZiAoJHRoaXMuZGF0YSgnZGF0ZXBpY2tlcicpKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQvLyBjb21wb25lbnQgY2xpY2sgcmVxdWlyZXMgdXMgdG8gZXhwbGljaXRseSBzaG93IGl0XHJcblx0XHRcdGRhdGVwaWNrZXJQbHVnaW4uY2FsbCgkdGhpcywgJ3Nob3cnKTtcclxuXHRcdH1cclxuXHQpO1xyXG5cdCQoZnVuY3Rpb24oKXtcclxuXHRcdGRhdGVwaWNrZXJQbHVnaW4uY2FsbCgkKCdbZGF0YS1wcm92aWRlPVwiZGF0ZXBpY2tlci1pbmxpbmVcIl0nKSk7XHJcblx0fSk7XHJcblxyXG59KSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1kYXRlcGlja2VyL2Rpc3QvanMvYm9vdHN0cmFwLWRhdGVwaWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1kYXRlcGlja2VyL2Rpc3QvanMvYm9vdHN0cmFwLWRhdGVwaWNrZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMyJdLCJzb3VyY2VSb290IjoiIn0=