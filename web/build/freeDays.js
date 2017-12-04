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
                                                  todayHighlight: true

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvUmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9mcmVlRGF5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qcyJdLCJuYW1lcyI6WyIkIiwiY29uc29sZSIsImxvZyIsImFycmF5IiwiZGF0ZXBpY2tlciIsImF1dG9jbG9zZSIsImZvcm1hdCIsImRhdGVzRGlzYWJsZWQiLCJKU09OIiwicGFyc2UiLCJkYXlzT2ZXZWVrRGlzYWJsZWQiLCJ0b2RheUhpZ2hsaWdodCIsIm9uIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBQUEsQ0FBRSxZQUFZO0FBQ1ZDLGlDQUFRQyxHQUFSLENBQVlDLEtBQVo7QUFDQUgseUJBQUEsOENBQUFBLENBQUUsa0JBQUYsRUFBc0JJLFVBQXRCLENBQWlDO0FBQ1JDLDZEQUFXLElBREgsRUFDWTtBQUNwQkMsMERBQVEsWUFGQTtBQUdSQyxpRUFBZUMsS0FBS0MsS0FBTCxDQUFXTixLQUFYLENBSFA7QUFJUk8sc0VBQW9CLElBSlo7QUFLUkMsa0VBQWdCOztBQUxSLDBCQUFqQyxFQVNzQkMsRUFUdEIsQ0FTeUIsWUFUekIsRUFTdUMsVUFBVUMsQ0FBVixFQUFhLENBQzlCLENBVnRCO0FBV0gsQ0FiRCxFOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CO0FBQ3BCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMEJBQTBCLHVDQUF1QztBQUNqRTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDBCQUEwQiw2Q0FBNkM7QUFDdkU7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwwQkFBMEIsNkJBQTZCO0FBQ3ZEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxzQ0FBc0MsMEJBQTBCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsbUNBQW1DLGFBQWEsRUFBRTtBQUNsRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixDQUFDIiwiZmlsZSI6ImZyZWVEYXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCAnYm9vdHN0cmFwLXNhc3MnO1xuaW1wb3J0ICdib290c3RyYXAtZGF0ZXBpY2tlcic7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKGFycmF5KTtcbiAgICAkKCcjZGF0ZXRpbWVwaWNrZXI1JykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jbG9zZTogdHJ1ZSwgICAgLy8gSXQgaXMgZmFsc2UsIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnbW0vZGQveXl5eScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IEpTT04ucGFyc2UoYXJyYXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlzT2ZXZWVrRGlzYWJsZWQ6ICcwNicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlLFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignY2hhbmdlRGF0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvUmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9mcmVlRGF5cy5qcyIsIi8qIVxuICogRGF0ZXBpY2tlciBmb3IgQm9vdHN0cmFwIHYxLjcuMSAoaHR0cHM6Ly9naXRodWIuY29tL3V4c29sdXRpb25zL2Jvb3RzdHJhcC1kYXRlcGlja2VyKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSB2Mi4wIChodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjApXG4gKi9cblxuKGZ1bmN0aW9uKGZhY3Rvcnkpe1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbigkLCB1bmRlZmluZWQpe1xuXHRmdW5jdGlvbiBVVENEYXRlKCl7XG5cdFx0cmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KERhdGUsIGFyZ3VtZW50cykpO1xuXHR9XG5cdGZ1bmN0aW9uIFVUQ1RvZGF5KCl7XG5cdFx0dmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcblx0XHRyZXR1cm4gVVRDRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXREYXRlKCkpO1xuXHR9XG5cdGZ1bmN0aW9uIGlzVVRDRXF1YWxzKGRhdGUxLCBkYXRlMikge1xuXHRcdHJldHVybiAoXG5cdFx0XHRkYXRlMS5nZXRVVENGdWxsWWVhcigpID09PSBkYXRlMi5nZXRVVENGdWxsWWVhcigpICYmXG5cdFx0XHRkYXRlMS5nZXRVVENNb250aCgpID09PSBkYXRlMi5nZXRVVENNb250aCgpICYmXG5cdFx0XHRkYXRlMS5nZXRVVENEYXRlKCkgPT09IGRhdGUyLmdldFVUQ0RhdGUoKVxuXHRcdCk7XG5cdH1cblx0ZnVuY3Rpb24gYWxpYXMobWV0aG9kLCBkZXByZWNhdGlvbk1zZyl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoZGVwcmVjYXRpb25Nc2cgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQkLmZuLmRhdGVwaWNrZXIuZGVwcmVjYXRlZChkZXByZWNhdGlvbk1zZyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzW21ldGhvZF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cdGZ1bmN0aW9uIGlzVmFsaWREYXRlKGQpIHtcblx0XHRyZXR1cm4gZCAmJiAhaXNOYU4oZC5nZXRUaW1lKCkpO1xuXHR9XG5cblx0dmFyIERhdGVBcnJheSA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBleHRyYXMgPSB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKGkpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zbGljZShpKVswXTtcblx0XHRcdH0sXG5cdFx0XHRjb250YWluczogZnVuY3Rpb24oZCl7XG5cdFx0XHRcdC8vIEFycmF5LmluZGV4T2YgaXMgbm90IGNyb3NzLWJyb3dzZXI7XG5cdFx0XHRcdC8vICQuaW5BcnJheSBkb2Vzbid0IHdvcmsgd2l0aCBEYXRlc1xuXHRcdFx0XHR2YXIgdmFsID0gZCAmJiBkLnZhbHVlT2YoKTtcblx0XHRcdFx0Zm9yICh2YXIgaT0wLCBsPXRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgIC8vIFVzZSBkYXRlIGFyaXRobWV0aWMgdG8gYWxsb3cgZGF0ZXMgd2l0aCBkaWZmZXJlbnQgdGltZXMgdG8gbWF0Y2hcbiAgICAgICAgICBpZiAoMCA8PSB0aGlzW2ldLnZhbHVlT2YoKSAtIHZhbCAmJiB0aGlzW2ldLnZhbHVlT2YoKSAtIHZhbCA8IDEwMDAqNjAqNjAqMjQpXG5cdFx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fSxcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oaSl7XG5cdFx0XHRcdHRoaXMuc3BsaWNlKGksMSk7XG5cdFx0XHR9LFxuXHRcdFx0cmVwbGFjZTogZnVuY3Rpb24obmV3X2FycmF5KXtcblx0XHRcdFx0aWYgKCFuZXdfYXJyYXkpXG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRpZiAoISQuaXNBcnJheShuZXdfYXJyYXkpKVxuXHRcdFx0XHRcdG5ld19hcnJheSA9IFtuZXdfYXJyYXldO1xuXHRcdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMucHVzaC5hcHBseSh0aGlzLCBuZXdfYXJyYXkpO1xuXHRcdFx0fSxcblx0XHRcdGNsZWFyOiBmdW5jdGlvbigpe1xuXHRcdFx0XHR0aGlzLmxlbmd0aCA9IDA7XG5cdFx0XHR9LFxuXHRcdFx0Y29weTogZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGEgPSBuZXcgRGF0ZUFycmF5KCk7XG5cdFx0XHRcdGEucmVwbGFjZSh0aGlzKTtcblx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGEgPSBbXTtcblx0XHRcdGEucHVzaC5hcHBseShhLCBhcmd1bWVudHMpO1xuXHRcdFx0JC5leHRlbmQoYSwgZXh0cmFzKTtcblx0XHRcdHJldHVybiBhO1xuXHRcdH07XG5cdH0pKCk7XG5cblxuXHQvLyBQaWNrZXIgb2JqZWN0XG5cblx0dmFyIERhdGVwaWNrZXIgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKXtcblx0XHQkLmRhdGEoZWxlbWVudCwgJ2RhdGVwaWNrZXInLCB0aGlzKTtcblx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMob3B0aW9ucyk7XG5cblx0XHR0aGlzLmRhdGVzID0gbmV3IERhdGVBcnJheSgpO1xuXHRcdHRoaXMudmlld0RhdGUgPSB0aGlzLm8uZGVmYXVsdFZpZXdEYXRlO1xuXHRcdHRoaXMuZm9jdXNEYXRlID0gbnVsbDtcblxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cdFx0dGhpcy5pc0lucHV0ID0gdGhpcy5lbGVtZW50LmlzKCdpbnB1dCcpO1xuXHRcdHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMuaXNJbnB1dCA/IHRoaXMuZWxlbWVudCA6IHRoaXMuZWxlbWVudC5maW5kKCdpbnB1dCcpO1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5lbGVtZW50Lmhhc0NsYXNzKCdkYXRlJykgPyB0aGlzLmVsZW1lbnQuZmluZCgnLmFkZC1vbiwgLmlucHV0LWdyb3VwLWFkZG9uLCAuYnRuJykgOiBmYWxzZTtcblx0XHRpZiAodGhpcy5jb21wb25lbnQgJiYgdGhpcy5jb21wb25lbnQubGVuZ3RoID09PSAwKVxuXHRcdFx0dGhpcy5jb21wb25lbnQgPSBmYWxzZTtcblx0XHR0aGlzLmlzSW5saW5lID0gIXRoaXMuY29tcG9uZW50ICYmIHRoaXMuZWxlbWVudC5pcygnZGl2Jyk7XG5cblx0XHR0aGlzLnBpY2tlciA9ICQoRFBHbG9iYWwudGVtcGxhdGUpO1xuXG5cdFx0Ly8gQ2hlY2tpbmcgdGVtcGxhdGVzIGFuZCBpbnNlcnRpbmdcblx0XHRpZiAodGhpcy5fY2hlY2tfdGVtcGxhdGUodGhpcy5vLnRlbXBsYXRlcy5sZWZ0QXJyb3cpKSB7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcucHJldicpLmh0bWwodGhpcy5vLnRlbXBsYXRlcy5sZWZ0QXJyb3cpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9jaGVja190ZW1wbGF0ZSh0aGlzLm8udGVtcGxhdGVzLnJpZ2h0QXJyb3cpKSB7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcubmV4dCcpLmh0bWwodGhpcy5vLnRlbXBsYXRlcy5yaWdodEFycm93KTtcblx0XHR9XG5cblx0XHR0aGlzLl9idWlsZEV2ZW50cygpO1xuXHRcdHRoaXMuX2F0dGFjaEV2ZW50cygpO1xuXG5cdFx0aWYgKHRoaXMuaXNJbmxpbmUpe1xuXHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItaW5saW5lJykuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1kcm9wZG93biBkcm9wZG93bi1tZW51Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuby5ydGwpe1xuXHRcdFx0dGhpcy5waWNrZXIuYWRkQ2xhc3MoJ2RhdGVwaWNrZXItcnRsJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuby5jYWxlbmRhcldlZWtzKSB7XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcuZGF0ZXBpY2tlci1kYXlzIC5kYXRlcGlja2VyLXN3aXRjaCwgdGhlYWQgLmRhdGVwaWNrZXItdGl0bGUsIHRmb290IC50b2RheSwgdGZvb3QgLmNsZWFyJylcblx0XHRcdFx0LmF0dHIoJ2NvbHNwYW4nLCBmdW5jdGlvbihpLCB2YWwpe1xuXHRcdFx0XHRcdHJldHVybiBOdW1iZXIodmFsKSArIDE7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7XG5cdFx0XHRzdGFydERhdGU6IHRoaXMuX28uc3RhcnREYXRlLFxuXHRcdFx0ZW5kRGF0ZTogdGhpcy5fby5lbmREYXRlLFxuXHRcdFx0ZGF5c09mV2Vla0Rpc2FibGVkOiB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkLFxuXHRcdFx0ZGF5c09mV2Vla0hpZ2hsaWdodGVkOiB0aGlzLm8uZGF5c09mV2Vla0hpZ2hsaWdodGVkLFxuXHRcdFx0ZGF0ZXNEaXNhYmxlZDogdGhpcy5vLmRhdGVzRGlzYWJsZWRcblx0XHR9KTtcblxuXHRcdHRoaXMuX2FsbG93X3VwZGF0ZSA9IGZhbHNlO1xuXHRcdHRoaXMuc2V0Vmlld01vZGUodGhpcy5vLnN0YXJ0Vmlldyk7XG5cdFx0dGhpcy5fYWxsb3dfdXBkYXRlID0gdHJ1ZTtcblxuXHRcdHRoaXMuZmlsbERvdygpO1xuXHRcdHRoaXMuZmlsbE1vbnRocygpO1xuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHRcdGlmICh0aGlzLmlzSW5saW5lKXtcblx0XHRcdHRoaXMuc2hvdygpO1xuXHRcdH1cblx0fTtcblxuXHREYXRlcGlja2VyLnByb3RvdHlwZSA9IHtcblx0XHRjb25zdHJ1Y3RvcjogRGF0ZXBpY2tlcixcblxuXHRcdF9yZXNvbHZlVmlld05hbWU6IGZ1bmN0aW9uKHZpZXcpe1xuXHRcdFx0JC5lYWNoKERQR2xvYmFsLnZpZXdNb2RlcywgZnVuY3Rpb24oaSwgdmlld01vZGUpe1xuXHRcdFx0XHRpZiAodmlldyA9PT0gaSB8fCAkLmluQXJyYXkodmlldywgdmlld01vZGUubmFtZXMpICE9PSAtMSl7XG5cdFx0XHRcdFx0dmlldyA9IGk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHZpZXc7XG5cdFx0fSxcblxuXHRcdF9yZXNvbHZlRGF5c09mV2VlazogZnVuY3Rpb24oZGF5c09mV2Vlayl7XG5cdFx0XHRpZiAoISQuaXNBcnJheShkYXlzT2ZXZWVrKSlcblx0XHRcdFx0ZGF5c09mV2VlayA9IGRheXNPZldlZWsuc3BsaXQoL1ssXFxzXSovKTtcblx0XHRcdHJldHVybiAkLm1hcChkYXlzT2ZXZWVrLCBOdW1iZXIpO1xuXHRcdH0sXG5cblx0XHRfY2hlY2tfdGVtcGxhdGU6IGZ1bmN0aW9uKHRtcCl7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJZiBlbXB0eVxuXHRcdFx0XHRpZiAodG1wID09PSB1bmRlZmluZWQgfHwgdG1wID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIElmIG5vIGh0bWwsIGV2ZXJ5dGhpbmcgb2tcblx0XHRcdFx0aWYgKCh0bXAubWF0Y2goL1s8Pl0vZykgfHwgW10pLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gQ2hlY2tpbmcgaWYgaHRtbCBpcyBmaW5lXG5cdFx0XHRcdHZhciBqRG9tID0gJCh0bXApO1xuXHRcdFx0XHRyZXR1cm4gakRvbS5sZW5ndGggPiAwO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGV4KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3Byb2Nlc3Nfb3B0aW9uczogZnVuY3Rpb24ob3B0cyl7XG5cdFx0XHQvLyBTdG9yZSByYXcgb3B0aW9ucyBmb3IgcmVmZXJlbmNlXG5cdFx0XHR0aGlzLl9vID0gJC5leHRlbmQoe30sIHRoaXMuX28sIG9wdHMpO1xuXHRcdFx0Ly8gUHJvY2Vzc2VkIG9wdGlvbnNcblx0XHRcdHZhciBvID0gdGhpcy5vID0gJC5leHRlbmQoe30sIHRoaXMuX28pO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBcImRlLURFXCIgc3R5bGUgZGF0ZSBpcyBhdmFpbGFibGUsIGlmIG5vdCBsYW5ndWFnZSBzaG91bGRcblx0XHRcdC8vIGZhbGxiYWNrIHRvIDIgbGV0dGVyIGNvZGUgZWcgXCJkZVwiXG5cdFx0XHR2YXIgbGFuZyA9IG8ubGFuZ3VhZ2U7XG5cdFx0XHRpZiAoIWRhdGVzW2xhbmddKXtcblx0XHRcdFx0bGFuZyA9IGxhbmcuc3BsaXQoJy0nKVswXTtcblx0XHRcdFx0aWYgKCFkYXRlc1tsYW5nXSlcblx0XHRcdFx0XHRsYW5nID0gZGVmYXVsdHMubGFuZ3VhZ2U7XG5cdFx0XHR9XG5cdFx0XHRvLmxhbmd1YWdlID0gbGFuZztcblxuXHRcdFx0Ly8gUmV0cmlldmUgdmlldyBpbmRleCBmcm9tIGFueSBhbGlhc2VzXG5cdFx0XHRvLnN0YXJ0VmlldyA9IHRoaXMuX3Jlc29sdmVWaWV3TmFtZShvLnN0YXJ0Vmlldyk7XG5cdFx0XHRvLm1pblZpZXdNb2RlID0gdGhpcy5fcmVzb2x2ZVZpZXdOYW1lKG8ubWluVmlld01vZGUpO1xuXHRcdFx0by5tYXhWaWV3TW9kZSA9IHRoaXMuX3Jlc29sdmVWaWV3TmFtZShvLm1heFZpZXdNb2RlKTtcblxuXHRcdFx0Ly8gQ2hlY2sgdmlldyBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XG5cdFx0XHRvLnN0YXJ0VmlldyA9IE1hdGgubWF4KHRoaXMuby5taW5WaWV3TW9kZSwgTWF0aC5taW4odGhpcy5vLm1heFZpZXdNb2RlLCBvLnN0YXJ0VmlldykpO1xuXG5cdFx0XHQvLyB0cnVlLCBmYWxzZSwgb3IgTnVtYmVyID4gMFxuXHRcdFx0aWYgKG8ubXVsdGlkYXRlICE9PSB0cnVlKXtcblx0XHRcdFx0by5tdWx0aWRhdGUgPSBOdW1iZXIoby5tdWx0aWRhdGUpIHx8IGZhbHNlO1xuXHRcdFx0XHRpZiAoby5tdWx0aWRhdGUgIT09IGZhbHNlKVxuXHRcdFx0XHRcdG8ubXVsdGlkYXRlID0gTWF0aC5tYXgoMCwgby5tdWx0aWRhdGUpO1xuXHRcdFx0fVxuXHRcdFx0by5tdWx0aWRhdGVTZXBhcmF0b3IgPSBTdHJpbmcoby5tdWx0aWRhdGVTZXBhcmF0b3IpO1xuXG5cdFx0XHRvLndlZWtTdGFydCAlPSA3O1xuXHRcdFx0by53ZWVrRW5kID0gKG8ud2Vla1N0YXJ0ICsgNikgJSA3O1xuXG5cdFx0XHR2YXIgZm9ybWF0ID0gRFBHbG9iYWwucGFyc2VGb3JtYXQoby5mb3JtYXQpO1xuXHRcdFx0aWYgKG8uc3RhcnREYXRlICE9PSAtSW5maW5pdHkpe1xuXHRcdFx0XHRpZiAoISFvLnN0YXJ0RGF0ZSl7XG5cdFx0XHRcdFx0aWYgKG8uc3RhcnREYXRlIGluc3RhbmNlb2YgRGF0ZSlcblx0XHRcdFx0XHRcdG8uc3RhcnREYXRlID0gdGhpcy5fbG9jYWxfdG9fdXRjKHRoaXMuX3plcm9fdGltZShvLnN0YXJ0RGF0ZSkpO1xuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdG8uc3RhcnREYXRlID0gRFBHbG9iYWwucGFyc2VEYXRlKG8uc3RhcnREYXRlLCBmb3JtYXQsIG8ubGFuZ3VhZ2UsIG8uYXNzdW1lTmVhcmJ5WWVhcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0by5zdGFydERhdGUgPSAtSW5maW5pdHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChvLmVuZERhdGUgIT09IEluZmluaXR5KXtcblx0XHRcdFx0aWYgKCEhby5lbmREYXRlKXtcblx0XHRcdFx0XHRpZiAoby5lbmREYXRlIGluc3RhbmNlb2YgRGF0ZSlcblx0XHRcdFx0XHRcdG8uZW5kRGF0ZSA9IHRoaXMuX2xvY2FsX3RvX3V0Yyh0aGlzLl96ZXJvX3RpbWUoby5lbmREYXRlKSk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0by5lbmREYXRlID0gRFBHbG9iYWwucGFyc2VEYXRlKG8uZW5kRGF0ZSwgZm9ybWF0LCBvLmxhbmd1YWdlLCBvLmFzc3VtZU5lYXJieVllYXIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdG8uZW5kRGF0ZSA9IEluZmluaXR5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG8uZGF5c09mV2Vla0Rpc2FibGVkID0gdGhpcy5fcmVzb2x2ZURheXNPZldlZWsoby5kYXlzT2ZXZWVrRGlzYWJsZWR8fFtdKTtcblx0XHRcdG8uZGF5c09mV2Vla0hpZ2hsaWdodGVkID0gdGhpcy5fcmVzb2x2ZURheXNPZldlZWsoby5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWR8fFtdKTtcblxuXHRcdFx0by5kYXRlc0Rpc2FibGVkID0gby5kYXRlc0Rpc2FibGVkfHxbXTtcblx0XHRcdGlmICghJC5pc0FycmF5KG8uZGF0ZXNEaXNhYmxlZCkpIHtcblx0XHRcdFx0by5kYXRlc0Rpc2FibGVkID0gby5kYXRlc0Rpc2FibGVkLnNwbGl0KCcsJyk7XG5cdFx0XHR9XG5cdFx0XHRvLmRhdGVzRGlzYWJsZWQgPSAkLm1hcChvLmRhdGVzRGlzYWJsZWQsIGZ1bmN0aW9uKGQpe1xuXHRcdFx0XHRyZXR1cm4gRFBHbG9iYWwucGFyc2VEYXRlKGQsIGZvcm1hdCwgby5sYW5ndWFnZSwgby5hc3N1bWVOZWFyYnlZZWFyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgcGxjID0gU3RyaW5nKG8ub3JpZW50YXRpb24pLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1xccysvZyksXG5cdFx0XHRcdF9wbGMgPSBvLm9yaWVudGF0aW9uLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRwbGMgPSAkLmdyZXAocGxjLCBmdW5jdGlvbih3b3JkKXtcblx0XHRcdFx0cmV0dXJuIC9eYXV0b3xsZWZ0fHJpZ2h0fHRvcHxib3R0b20kLy50ZXN0KHdvcmQpO1xuXHRcdFx0fSk7XG5cdFx0XHRvLm9yaWVudGF0aW9uID0ge3g6ICdhdXRvJywgeTogJ2F1dG8nfTtcblx0XHRcdGlmICghX3BsYyB8fCBfcGxjID09PSAnYXV0bycpXG5cdFx0XHRcdDsgLy8gbm8gYWN0aW9uXG5cdFx0XHRlbHNlIGlmIChwbGMubGVuZ3RoID09PSAxKXtcblx0XHRcdFx0c3dpdGNoIChwbGNbMF0pe1xuXHRcdFx0XHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcblx0XHRcdFx0XHRcdG8ub3JpZW50YXRpb24ueSA9IHBsY1swXTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0XHRcdG8ub3JpZW50YXRpb24ueCA9IHBsY1swXTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0X3BsYyA9ICQuZ3JlcChwbGMsIGZ1bmN0aW9uKHdvcmQpe1xuXHRcdFx0XHRcdHJldHVybiAvXmxlZnR8cmlnaHQkLy50ZXN0KHdvcmQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0by5vcmllbnRhdGlvbi54ID0gX3BsY1swXSB8fCAnYXV0byc7XG5cblx0XHRcdFx0X3BsYyA9ICQuZ3JlcChwbGMsIGZ1bmN0aW9uKHdvcmQpe1xuXHRcdFx0XHRcdHJldHVybiAvXnRvcHxib3R0b20kLy50ZXN0KHdvcmQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0by5vcmllbnRhdGlvbi55ID0gX3BsY1swXSB8fCAnYXV0byc7XG5cdFx0XHR9XG5cdFx0XHRpZiAoby5kZWZhdWx0Vmlld0RhdGUgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBvLmRlZmF1bHRWaWV3RGF0ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0by5kZWZhdWx0Vmlld0RhdGUgPSBEUEdsb2JhbC5wYXJzZURhdGUoby5kZWZhdWx0Vmlld0RhdGUsIGZvcm1hdCwgby5sYW5ndWFnZSwgby5hc3N1bWVOZWFyYnlZZWFyKTtcblx0XHRcdH0gZWxzZSBpZiAoby5kZWZhdWx0Vmlld0RhdGUpIHtcblx0XHRcdFx0dmFyIHllYXIgPSBvLmRlZmF1bHRWaWV3RGF0ZS55ZWFyIHx8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblx0XHRcdFx0dmFyIG1vbnRoID0gby5kZWZhdWx0Vmlld0RhdGUubW9udGggfHwgMDtcblx0XHRcdFx0dmFyIGRheSA9IG8uZGVmYXVsdFZpZXdEYXRlLmRheSB8fCAxO1xuXHRcdFx0XHRvLmRlZmF1bHRWaWV3RGF0ZSA9IFVUQ0RhdGUoeWVhciwgbW9udGgsIGRheSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvLmRlZmF1bHRWaWV3RGF0ZSA9IFVUQ1RvZGF5KCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRfZXZlbnRzOiBbXSxcblx0XHRfc2Vjb25kYXJ5RXZlbnRzOiBbXSxcblx0XHRfYXBwbHlFdmVudHM6IGZ1bmN0aW9uKGV2cyl7XG5cdFx0XHRmb3IgKHZhciBpPTAsIGVsLCBjaCwgZXY7IGkgPCBldnMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRlbCA9IGV2c1tpXVswXTtcblx0XHRcdFx0aWYgKGV2c1tpXS5sZW5ndGggPT09IDIpe1xuXHRcdFx0XHRcdGNoID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGV2ID0gZXZzW2ldWzFdO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV2c1tpXS5sZW5ndGggPT09IDMpe1xuXHRcdFx0XHRcdGNoID0gZXZzW2ldWzFdO1xuXHRcdFx0XHRcdGV2ID0gZXZzW2ldWzJdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsLm9uKGV2LCBjaCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRfdW5hcHBseUV2ZW50czogZnVuY3Rpb24oZXZzKXtcblx0XHRcdGZvciAodmFyIGk9MCwgZWwsIGV2LCBjaDsgaSA8IGV2cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGVsID0gZXZzW2ldWzBdO1xuXHRcdFx0XHRpZiAoZXZzW2ldLmxlbmd0aCA9PT0gMil7XG5cdFx0XHRcdFx0Y2ggPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0ZXYgPSBldnNbaV1bMV07XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZzW2ldLmxlbmd0aCA9PT0gMyl7XG5cdFx0XHRcdFx0Y2ggPSBldnNbaV1bMV07XG5cdFx0XHRcdFx0ZXYgPSBldnNbaV1bMl07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwub2ZmKGV2LCBjaCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRfYnVpbGRFdmVudHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgZXZlbnRzID0ge1xuICAgICAgICAgICAgICAgIGtleXVwOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KGUua2V5Q29kZSwgWzI3LCAzNywgMzksIDM4LCA0MCwgMzIsIDEzLCA5XSkgPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSxcbiAgICAgICAgICAgICAgICBrZXlkb3duOiAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcyksXG4gICAgICAgICAgICAgICAgcGFzdGU6ICQucHJveHkodGhpcy5wYXN0ZSwgdGhpcylcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm8uc2hvd09uRm9jdXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBldmVudHMuZm9jdXMgPSAkLnByb3h5KHRoaXMuc2hvdywgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW5wdXQpIHsgLy8gc2luZ2xlIGlucHV0XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gW1xuICAgICAgICAgICAgICAgICAgICBbdGhpcy5lbGVtZW50LCBldmVudHNdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbXBvbmVudDogaW5wdXQgKyBidXR0b25cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29tcG9uZW50ICYmIHRoaXMuaW5wdXRGaWVsZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCByZWFkb25seSwgYWxsb3cga2V5Ym9hcmQgbmF2XG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLmlucHV0RmllbGQsIGV2ZW50c10sXG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLmNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICQucHJveHkodGhpcy5zaG93LCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5fZXZlbnRzID0gW1xuXHRcdFx0XHRcdFt0aGlzLmVsZW1lbnQsIHtcblx0XHRcdFx0XHRcdGNsaWNrOiAkLnByb3h5KHRoaXMuc2hvdywgdGhpcyksXG5cdFx0XHRcdFx0XHRrZXlkb3duOiAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcylcblx0XHRcdFx0XHR9XVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZXZlbnRzLnB1c2goXG5cdFx0XHRcdC8vIENvbXBvbmVudDogbGlzdGVuIGZvciBibHVyIG9uIGVsZW1lbnQgZGVzY2VuZGFudHNcblx0XHRcdFx0W3RoaXMuZWxlbWVudCwgJyonLCB7XG5cdFx0XHRcdFx0Ymx1cjogJC5wcm94eShmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdHRoaXMuX2ZvY3VzZWRfZnJvbSA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdH0sIHRoaXMpXG5cdFx0XHRcdH1dLFxuXHRcdFx0XHQvLyBJbnB1dDogbGlzdGVuIGZvciBibHVyIG9uIGVsZW1lbnRcblx0XHRcdFx0W3RoaXMuZWxlbWVudCwge1xuXHRcdFx0XHRcdGJsdXI6ICQucHJveHkoZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHR0aGlzLl9mb2N1c2VkX2Zyb20gPSBlLnRhcmdldDtcblx0XHRcdFx0XHR9LCB0aGlzKVxuXHRcdFx0XHR9XVxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHRoaXMuby5pbW1lZGlhdGVVcGRhdGVzKSB7XG5cdFx0XHRcdC8vIFRyaWdnZXIgaW5wdXQgdXBkYXRlcyBpbW1lZGlhdGVseSBvbiBjaGFuZ2VkIHllYXIvbW9udGhcblx0XHRcdFx0dGhpcy5fZXZlbnRzLnB1c2goW3RoaXMuZWxlbWVudCwge1xuXHRcdFx0XHRcdCdjaGFuZ2VZZWFyIGNoYW5nZU1vbnRoJzogJC5wcm94eShmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlKGUuZGF0ZSk7XG5cdFx0XHRcdFx0fSwgdGhpcylcblx0XHRcdFx0fV0pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zZWNvbmRhcnlFdmVudHMgPSBbXG5cdFx0XHRcdFt0aGlzLnBpY2tlciwge1xuXHRcdFx0XHRcdGNsaWNrOiAkLnByb3h5KHRoaXMuY2xpY2ssIHRoaXMpXG5cdFx0XHRcdH1dLFxuXHRcdFx0XHRbdGhpcy5waWNrZXIsICcucHJldiwgLm5leHQnLCB7XG5cdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5uYXZBcnJvd3NDbGljaywgdGhpcylcblx0XHRcdFx0fV0sXG5cdFx0XHRcdFt0aGlzLnBpY2tlciwgJy5kYXk6bm90KC5kaXNhYmxlZCknLCB7XG5cdFx0XHRcdFx0Y2xpY2s6ICQucHJveHkodGhpcy5kYXlDZWxsQ2xpY2ssIHRoaXMpXG5cdFx0XHRcdH1dLFxuXHRcdFx0XHRbJCh3aW5kb3cpLCB7XG5cdFx0XHRcdFx0cmVzaXplOiAkLnByb3h5KHRoaXMucGxhY2UsIHRoaXMpXG5cdFx0XHRcdH1dLFxuXHRcdFx0XHRbJChkb2N1bWVudCksIHtcblx0XHRcdFx0XHQnbW91c2Vkb3duIHRvdWNoc3RhcnQnOiAkLnByb3h5KGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0Ly8gQ2xpY2tlZCBvdXRzaWRlIHRoZSBkYXRlcGlja2VyLCBoaWRlIGl0XG5cdFx0XHRcdFx0XHRpZiAoIShcblx0XHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmlzKGUudGFyZ2V0KSB8fFxuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZmluZChlLnRhcmdldCkubGVuZ3RoIHx8XG5cdFx0XHRcdFx0XHRcdHRoaXMucGlja2VyLmlzKGUudGFyZ2V0KSB8fFxuXHRcdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5maW5kKGUudGFyZ2V0KS5sZW5ndGggfHxcblx0XHRcdFx0XHRcdFx0dGhpcy5pc0lubGluZVxuXHRcdFx0XHRcdFx0KSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIHRoaXMpXG5cdFx0XHRcdH1dXG5cdFx0XHRdO1xuXHRcdH0sXG5cdFx0X2F0dGFjaEV2ZW50czogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuX2RldGFjaEV2ZW50cygpO1xuXHRcdFx0dGhpcy5fYXBwbHlFdmVudHModGhpcy5fZXZlbnRzKTtcblx0XHR9LFxuXHRcdF9kZXRhY2hFdmVudHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLl91bmFwcGx5RXZlbnRzKHRoaXMuX2V2ZW50cyk7XG5cdFx0fSxcblx0XHRfYXR0YWNoU2Vjb25kYXJ5RXZlbnRzOiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5fZGV0YWNoU2Vjb25kYXJ5RXZlbnRzKCk7XG5cdFx0XHR0aGlzLl9hcHBseUV2ZW50cyh0aGlzLl9zZWNvbmRhcnlFdmVudHMpO1xuXHRcdH0sXG5cdFx0X2RldGFjaFNlY29uZGFyeUV2ZW50czogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuX3VuYXBwbHlFdmVudHModGhpcy5fc2Vjb25kYXJ5RXZlbnRzKTtcblx0XHR9LFxuXHRcdF90cmlnZ2VyOiBmdW5jdGlvbihldmVudCwgYWx0ZGF0ZSl7XG5cdFx0XHR2YXIgZGF0ZSA9IGFsdGRhdGUgfHwgdGhpcy5kYXRlcy5nZXQoLTEpLFxuXHRcdFx0XHRsb2NhbF9kYXRlID0gdGhpcy5fdXRjX3RvX2xvY2FsKGRhdGUpO1xuXG5cdFx0XHR0aGlzLmVsZW1lbnQudHJpZ2dlcih7XG5cdFx0XHRcdHR5cGU6IGV2ZW50LFxuXHRcdFx0XHRkYXRlOiBsb2NhbF9kYXRlLFxuXHRcdFx0XHR2aWV3TW9kZTogdGhpcy52aWV3TW9kZSxcblx0XHRcdFx0ZGF0ZXM6ICQubWFwKHRoaXMuZGF0ZXMsIHRoaXMuX3V0Y190b19sb2NhbCksXG5cdFx0XHRcdGZvcm1hdDogJC5wcm94eShmdW5jdGlvbihpeCwgZm9ybWF0KXtcblx0XHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0XHRpeCA9IHRoaXMuZGF0ZXMubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdGZvcm1hdCA9IHRoaXMuby5mb3JtYXQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgaXggPT09ICdzdHJpbmcnKXtcblx0XHRcdFx0XHRcdGZvcm1hdCA9IGl4O1xuXHRcdFx0XHRcdFx0aXggPSB0aGlzLmRhdGVzLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLm8uZm9ybWF0O1xuXHRcdFx0XHRcdHZhciBkYXRlID0gdGhpcy5kYXRlcy5nZXQoaXgpO1xuXHRcdFx0XHRcdHJldHVybiBEUEdsb2JhbC5mb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgdGhpcy5vLmxhbmd1YWdlKTtcblx0XHRcdFx0fSwgdGhpcylcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRzaG93OiBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKHRoaXMuaW5wdXRGaWVsZC5wcm9wKCdkaXNhYmxlZCcpIHx8ICh0aGlzLmlucHV0RmllbGQucHJvcCgncmVhZG9ubHknKSAmJiB0aGlzLm8uZW5hYmxlT25SZWFkb25seSA9PT0gZmFsc2UpKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHRpZiAoIXRoaXMuaXNJbmxpbmUpXG5cdFx0XHRcdHRoaXMucGlja2VyLmFwcGVuZFRvKHRoaXMuby5jb250YWluZXIpO1xuXHRcdFx0dGhpcy5wbGFjZSgpO1xuXHRcdFx0dGhpcy5waWNrZXIuc2hvdygpO1xuXHRcdFx0dGhpcy5fYXR0YWNoU2Vjb25kYXJ5RXZlbnRzKCk7XG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdzaG93Jyk7XG5cdFx0XHRpZiAoKHdpbmRvdy5uYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyB8fCAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudCkgJiYgdGhpcy5vLmRpc2FibGVUb3VjaEtleWJvYXJkKSB7XG5cdFx0XHRcdCQodGhpcy5lbGVtZW50KS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0aGlkZTogZnVuY3Rpb24oKXtcblx0XHRcdGlmICh0aGlzLmlzSW5saW5lIHx8ICF0aGlzLnBpY2tlci5pcygnOnZpc2libGUnKSlcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XG5cdFx0XHR0aGlzLnBpY2tlci5oaWRlKCkuZGV0YWNoKCk7XG5cdFx0XHR0aGlzLl9kZXRhY2hTZWNvbmRhcnlFdmVudHMoKTtcblx0XHRcdHRoaXMuc2V0Vmlld01vZGUodGhpcy5vLnN0YXJ0Vmlldyk7XG5cblx0XHRcdGlmICh0aGlzLm8uZm9yY2VQYXJzZSAmJiB0aGlzLmlucHV0RmllbGQudmFsKCkpXG5cdFx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcblx0XHRcdHRoaXMuX3RyaWdnZXIoJ2hpZGUnKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0XHR0aGlzLl9kZXRhY2hFdmVudHMoKTtcblx0XHRcdHRoaXMuX2RldGFjaFNlY29uZGFyeUV2ZW50cygpO1xuXHRcdFx0dGhpcy5waWNrZXIucmVtb3ZlKCk7XG5cdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGEoKS5kYXRlcGlja2VyO1xuXHRcdFx0aWYgKCF0aGlzLmlzSW5wdXQpe1xuXHRcdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRhdGEoKS5kYXRlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHBhc3RlOiBmdW5jdGlvbihlKXtcblx0XHRcdHZhciBkYXRlU3RyaW5nO1xuXHRcdFx0aWYgKGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhICYmIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLnR5cGVzXG5cdFx0XHRcdCYmICQuaW5BcnJheSgndGV4dC9wbGFpbicsIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLnR5cGVzKSAhPT0gLTEpIHtcblx0XHRcdFx0ZGF0ZVN0cmluZyA9IGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcblx0XHRcdH0gZWxzZSBpZiAod2luZG93LmNsaXBib2FyZERhdGEpIHtcblx0XHRcdFx0ZGF0ZVN0cmluZyA9IHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0RGF0ZShkYXRlU3RyaW5nKTtcblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSxcblxuXHRcdF91dGNfdG9fbG9jYWw6IGZ1bmN0aW9uKHV0Yyl7XG5cdFx0XHRpZiAoIXV0Yykge1xuXHRcdFx0XHRyZXR1cm4gdXRjO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbG9jYWwgPSBuZXcgRGF0ZSh1dGMuZ2V0VGltZSgpICsgKHV0Yy5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApKTtcblxuXHRcdFx0aWYgKGxvY2FsLmdldFRpbWV6b25lT2Zmc2V0KCkgIT09IHV0Yy5nZXRUaW1lem9uZU9mZnNldCgpKSB7XG5cdFx0XHRcdGxvY2FsID0gbmV3IERhdGUodXRjLmdldFRpbWUoKSArIChsb2NhbC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxvY2FsO1xuXHRcdH0sXG5cdFx0X2xvY2FsX3RvX3V0YzogZnVuY3Rpb24obG9jYWwpe1xuXHRcdFx0cmV0dXJuIGxvY2FsICYmIG5ldyBEYXRlKGxvY2FsLmdldFRpbWUoKSAtIChsb2NhbC5nZXRUaW1lem9uZU9mZnNldCgpKjYwMDAwKSk7XG5cdFx0fSxcblx0XHRfemVyb190aW1lOiBmdW5jdGlvbihsb2NhbCl7XG5cdFx0XHRyZXR1cm4gbG9jYWwgJiYgbmV3IERhdGUobG9jYWwuZ2V0RnVsbFllYXIoKSwgbG9jYWwuZ2V0TW9udGgoKSwgbG9jYWwuZ2V0RGF0ZSgpKTtcblx0XHR9LFxuXHRcdF96ZXJvX3V0Y190aW1lOiBmdW5jdGlvbih1dGMpe1xuXHRcdFx0cmV0dXJuIHV0YyAmJiBVVENEYXRlKHV0Yy5nZXRVVENGdWxsWWVhcigpLCB1dGMuZ2V0VVRDTW9udGgoKSwgdXRjLmdldFVUQ0RhdGUoKSk7XG5cdFx0fSxcblxuXHRcdGdldERhdGVzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICQubWFwKHRoaXMuZGF0ZXMsIHRoaXMuX3V0Y190b19sb2NhbCk7XG5cdFx0fSxcblxuXHRcdGdldFVUQ0RhdGVzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICQubWFwKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGQpe1xuXHRcdFx0XHRyZXR1cm4gbmV3IERhdGUoZCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Z2V0RGF0ZTogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiB0aGlzLl91dGNfdG9fbG9jYWwodGhpcy5nZXRVVENEYXRlKCkpO1xuXHRcdH0sXG5cblx0XHRnZXRVVENEYXRlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHNlbGVjdGVkX2RhdGUgPSB0aGlzLmRhdGVzLmdldCgtMSk7XG5cdFx0XHRpZiAoc2VsZWN0ZWRfZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgRGF0ZShzZWxlY3RlZF9kYXRlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRjbGVhckRhdGVzOiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5pbnB1dEZpZWxkLnZhbCgnJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlRGF0ZScpO1xuXG5cdFx0XHRpZiAodGhpcy5vLmF1dG9jbG9zZSkge1xuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2V0RGF0ZXM6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYXJncyA9ICQuaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHRcdFx0dGhpcy51cGRhdGUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XG5cdFx0XHR0aGlzLnNldFZhbHVlKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2V0VVRDRGF0ZXM6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgYXJncyA9ICQuaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHRcdFx0dGhpcy5zZXREYXRlcy5hcHBseSh0aGlzLCAkLm1hcChhcmdzLCB0aGlzLl91dGNfdG9fbG9jYWwpKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZXREYXRlOiBhbGlhcygnc2V0RGF0ZXMnKSxcblx0XHRzZXRVVENEYXRlOiBhbGlhcygnc2V0VVRDRGF0ZXMnKSxcblx0XHRyZW1vdmU6IGFsaWFzKCdkZXN0cm95JywgJ01ldGhvZCBgcmVtb3ZlYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAyLjAuIFVzZSBgZGVzdHJveWAgaW5zdGVhZCcpLFxuXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgZm9ybWF0dGVkID0gdGhpcy5nZXRGb3JtYXR0ZWREYXRlKCk7XG5cdFx0XHR0aGlzLmlucHV0RmllbGQudmFsKGZvcm1hdHRlZCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0Rm9ybWF0dGVkRGF0ZTogZnVuY3Rpb24oZm9ybWF0KXtcblx0XHRcdGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0Zm9ybWF0ID0gdGhpcy5vLmZvcm1hdDtcblxuXHRcdFx0dmFyIGxhbmcgPSB0aGlzLm8ubGFuZ3VhZ2U7XG5cdFx0XHRyZXR1cm4gJC5tYXAodGhpcy5kYXRlcywgZnVuY3Rpb24oZCl7XG5cdFx0XHRcdHJldHVybiBEUEdsb2JhbC5mb3JtYXREYXRlKGQsIGZvcm1hdCwgbGFuZyk7XG5cdFx0XHR9KS5qb2luKHRoaXMuby5tdWx0aWRhdGVTZXBhcmF0b3IpO1xuXHRcdH0sXG5cblx0XHRnZXRTdGFydERhdGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5vLnN0YXJ0RGF0ZTtcblx0XHR9LFxuXG5cdFx0c2V0U3RhcnREYXRlOiBmdW5jdGlvbihzdGFydERhdGUpe1xuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtzdGFydERhdGU6IHN0YXJ0RGF0ZX0pO1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdHRoaXMudXBkYXRlTmF2QXJyb3dzKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0RW5kRGF0ZTogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiB0aGlzLm8uZW5kRGF0ZTtcblx0XHR9LFxuXG5cdFx0c2V0RW5kRGF0ZTogZnVuY3Rpb24oZW5kRGF0ZSl7XG5cdFx0XHR0aGlzLl9wcm9jZXNzX29wdGlvbnMoe2VuZERhdGU6IGVuZERhdGV9KTtcblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR0aGlzLnVwZGF0ZU5hdkFycm93cygpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNldERheXNPZldlZWtEaXNhYmxlZDogZnVuY3Rpb24oZGF5c09mV2Vla0Rpc2FibGVkKXtcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZGF5c09mV2Vla0Rpc2FibGVkOiBkYXlzT2ZXZWVrRGlzYWJsZWR9KTtcblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2V0RGF5c09mV2Vla0hpZ2hsaWdodGVkOiBmdW5jdGlvbihkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQpe1xuXHRcdFx0dGhpcy5fcHJvY2Vzc19vcHRpb25zKHtkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IGRheXNPZldlZWtIaWdobGlnaHRlZH0pO1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZXREYXRlc0Rpc2FibGVkOiBmdW5jdGlvbihkYXRlc0Rpc2FibGVkKXtcblx0XHRcdHRoaXMuX3Byb2Nlc3Nfb3B0aW9ucyh7ZGF0ZXNEaXNhYmxlZDogZGF0ZXNEaXNhYmxlZH0pO1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRwbGFjZTogZnVuY3Rpb24oKXtcblx0XHRcdGlmICh0aGlzLmlzSW5saW5lKVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdHZhciBjYWxlbmRhcldpZHRoID0gdGhpcy5waWNrZXIub3V0ZXJXaWR0aCgpLFxuXHRcdFx0XHRjYWxlbmRhckhlaWdodCA9IHRoaXMucGlja2VyLm91dGVySGVpZ2h0KCksXG5cdFx0XHRcdHZpc3VhbFBhZGRpbmcgPSAxMCxcblx0XHRcdFx0Y29udGFpbmVyID0gJCh0aGlzLm8uY29udGFpbmVyKSxcblx0XHRcdFx0d2luZG93V2lkdGggPSBjb250YWluZXIud2lkdGgoKSxcblx0XHRcdFx0c2Nyb2xsVG9wID0gdGhpcy5vLmNvbnRhaW5lciA9PT0gJ2JvZHknID8gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgOiBjb250YWluZXIuc2Nyb2xsVG9wKCksXG5cdFx0XHRcdGFwcGVuZE9mZnNldCA9IGNvbnRhaW5lci5vZmZzZXQoKTtcblxuXHRcdFx0dmFyIHBhcmVudHNaaW5kZXggPSBbMF07XG5cdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50cygpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGl0ZW1aSW5kZXggPSAkKHRoaXMpLmNzcygnei1pbmRleCcpO1xuXHRcdFx0XHRpZiAoaXRlbVpJbmRleCAhPT0gJ2F1dG8nICYmIE51bWJlcihpdGVtWkluZGV4KSAhPT0gMCkgcGFyZW50c1ppbmRleC5wdXNoKE51bWJlcihpdGVtWkluZGV4KSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB6SW5kZXggPSBNYXRoLm1heC5hcHBseShNYXRoLCBwYXJlbnRzWmluZGV4KSArIHRoaXMuby56SW5kZXhPZmZzZXQ7XG5cdFx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5jb21wb25lbnQgPyB0aGlzLmNvbXBvbmVudC5wYXJlbnQoKS5vZmZzZXQoKSA6IHRoaXMuZWxlbWVudC5vZmZzZXQoKTtcblx0XHRcdHZhciBoZWlnaHQgPSB0aGlzLmNvbXBvbmVudCA/IHRoaXMuY29tcG9uZW50Lm91dGVySGVpZ2h0KHRydWUpIDogdGhpcy5lbGVtZW50Lm91dGVySGVpZ2h0KGZhbHNlKTtcblx0XHRcdHZhciB3aWR0aCA9IHRoaXMuY29tcG9uZW50ID8gdGhpcy5jb21wb25lbnQub3V0ZXJXaWR0aCh0cnVlKSA6IHRoaXMuZWxlbWVudC5vdXRlcldpZHRoKGZhbHNlKTtcblx0XHRcdHZhciBsZWZ0ID0gb2Zmc2V0LmxlZnQgLSBhcHBlbmRPZmZzZXQubGVmdDtcblx0XHRcdHZhciB0b3AgPSBvZmZzZXQudG9wIC0gYXBwZW5kT2Zmc2V0LnRvcDtcblxuXHRcdFx0aWYgKHRoaXMuby5jb250YWluZXIgIT09ICdib2R5Jykge1xuXHRcdFx0XHR0b3AgKz0gc2Nyb2xsVG9wO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBpY2tlci5yZW1vdmVDbGFzcyhcblx0XHRcdFx0J2RhdGVwaWNrZXItb3JpZW50LXRvcCBkYXRlcGlja2VyLW9yaWVudC1ib3R0b20gJytcblx0XHRcdFx0J2RhdGVwaWNrZXItb3JpZW50LXJpZ2h0IGRhdGVwaWNrZXItb3JpZW50LWxlZnQnXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAodGhpcy5vLm9yaWVudGF0aW9uLnggIT09ICdhdXRvJyl7XG5cdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC0nICsgdGhpcy5vLm9yaWVudGF0aW9uLngpO1xuXHRcdFx0XHRpZiAodGhpcy5vLm9yaWVudGF0aW9uLnggPT09ICdyaWdodCcpXG5cdFx0XHRcdFx0bGVmdCAtPSBjYWxlbmRhcldpZHRoIC0gd2lkdGg7XG5cdFx0XHR9XG5cdFx0XHQvLyBhdXRvIHggb3JpZW50YXRpb24gaXMgYmVzdC1wbGFjZW1lbnQ6IGlmIGl0IGNyb3NzZXMgYSB3aW5kb3dcblx0XHRcdC8vIGVkZ2UsIGZ1ZGdlIGl0IHNpZGV3YXlzXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKG9mZnNldC5sZWZ0IDwgMCkge1xuXHRcdFx0XHRcdC8vIGNvbXBvbmVudCBpcyBvdXRzaWRlIHRoZSB3aW5kb3cgb24gdGhlIGxlZnQgc2lkZS4gTW92ZSBpdCBpbnRvIHZpc2libGUgcmFuZ2Vcblx0XHRcdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtbGVmdCcpO1xuXHRcdFx0XHRcdGxlZnQgLT0gb2Zmc2V0LmxlZnQgLSB2aXN1YWxQYWRkaW5nO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGxlZnQgKyBjYWxlbmRhcldpZHRoID4gd2luZG93V2lkdGgpIHtcblx0XHRcdFx0XHQvLyB0aGUgY2FsZW5kYXIgcGFzc2VzIHRoZSB3aWRvdyByaWdodCBlZGdlLiBBbGlnbiBpdCB0byBjb21wb25lbnQgcmlnaHQgc2lkZVxuXHRcdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdkYXRlcGlja2VyLW9yaWVudC1yaWdodCcpO1xuXHRcdFx0XHRcdGxlZnQgKz0gd2lkdGggLSBjYWxlbmRhcldpZHRoO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0aGlzLm8ucnRsKSB7XG5cdFx0XHRcdFx0XHQvLyBEZWZhdWx0IHRvIHJpZ2h0XG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtcmlnaHQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gRGVmYXVsdCB0byBsZWZ0XG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtbGVmdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBhdXRvIHkgb3JpZW50YXRpb24gaXMgYmVzdC1zaXR1YXRpb246IHRvcCBvciBib3R0b20sIG5vIGZ1ZGdpbmcsXG5cdFx0XHQvLyBkZWNpc2lvbiBiYXNlZCBvbiB3aGljaCBzaG93cyBtb3JlIG9mIHRoZSBjYWxlbmRhclxuXHRcdFx0dmFyIHlvcmllbnQgPSB0aGlzLm8ub3JpZW50YXRpb24ueSxcblx0XHRcdFx0dG9wX292ZXJmbG93O1xuXHRcdFx0aWYgKHlvcmllbnQgPT09ICdhdXRvJyl7XG5cdFx0XHRcdHRvcF9vdmVyZmxvdyA9IC1zY3JvbGxUb3AgKyB0b3AgLSBjYWxlbmRhckhlaWdodDtcblx0XHRcdFx0eW9yaWVudCA9IHRvcF9vdmVyZmxvdyA8IDAgPyAnYm90dG9tJyA6ICd0b3AnO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBpY2tlci5hZGRDbGFzcygnZGF0ZXBpY2tlci1vcmllbnQtJyArIHlvcmllbnQpO1xuXHRcdFx0aWYgKHlvcmllbnQgPT09ICd0b3AnKVxuXHRcdFx0XHR0b3AgLT0gY2FsZW5kYXJIZWlnaHQgKyBwYXJzZUludCh0aGlzLnBpY2tlci5jc3MoJ3BhZGRpbmctdG9wJykpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0b3AgKz0gaGVpZ2h0O1xuXG5cdFx0XHRpZiAodGhpcy5vLnJ0bCkge1xuXHRcdFx0XHR2YXIgcmlnaHQgPSB3aW5kb3dXaWR0aCAtIChsZWZ0ICsgd2lkdGgpO1xuXHRcdFx0XHR0aGlzLnBpY2tlci5jc3Moe1xuXHRcdFx0XHRcdHRvcDogdG9wLFxuXHRcdFx0XHRcdHJpZ2h0OiByaWdodCxcblx0XHRcdFx0XHR6SW5kZXg6IHpJbmRleFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucGlja2VyLmNzcyh7XG5cdFx0XHRcdFx0dG9wOiB0b3AsXG5cdFx0XHRcdFx0bGVmdDogbGVmdCxcblx0XHRcdFx0XHR6SW5kZXg6IHpJbmRleFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRfYWxsb3dfdXBkYXRlOiB0cnVlLFxuXHRcdHVwZGF0ZTogZnVuY3Rpb24oKXtcblx0XHRcdGlmICghdGhpcy5fYWxsb3dfdXBkYXRlKVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0dmFyIG9sZERhdGVzID0gdGhpcy5kYXRlcy5jb3B5KCksXG5cdFx0XHRcdGRhdGVzID0gW10sXG5cdFx0XHRcdGZyb21BcmdzID0gZmFsc2U7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCl7XG5cdFx0XHRcdCQuZWFjaChhcmd1bWVudHMsICQucHJveHkoZnVuY3Rpb24oaSwgZGF0ZSl7XG5cdFx0XHRcdFx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxuXHRcdFx0XHRcdFx0ZGF0ZSA9IHRoaXMuX2xvY2FsX3RvX3V0YyhkYXRlKTtcblx0XHRcdFx0XHRkYXRlcy5wdXNoKGRhdGUpO1xuXHRcdFx0XHR9LCB0aGlzKSk7XG5cdFx0XHRcdGZyb21BcmdzID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGVzID0gdGhpcy5pc0lucHV0XG5cdFx0XHRcdFx0XHQ/IHRoaXMuZWxlbWVudC52YWwoKVxuXHRcdFx0XHRcdFx0OiB0aGlzLmVsZW1lbnQuZGF0YSgnZGF0ZScpIHx8IHRoaXMuaW5wdXRGaWVsZC52YWwoKTtcblx0XHRcdFx0aWYgKGRhdGVzICYmIHRoaXMuby5tdWx0aWRhdGUpXG5cdFx0XHRcdFx0ZGF0ZXMgPSBkYXRlcy5zcGxpdCh0aGlzLm8ubXVsdGlkYXRlU2VwYXJhdG9yKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGRhdGVzID0gW2RhdGVzXTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5kYXRhKCkuZGF0ZTtcblx0XHRcdH1cblxuXHRcdFx0ZGF0ZXMgPSAkLm1hcChkYXRlcywgJC5wcm94eShmdW5jdGlvbihkYXRlKXtcblx0XHRcdFx0cmV0dXJuIERQR2xvYmFsLnBhcnNlRGF0ZShkYXRlLCB0aGlzLm8uZm9ybWF0LCB0aGlzLm8ubGFuZ3VhZ2UsIHRoaXMuby5hc3N1bWVOZWFyYnlZZWFyKTtcblx0XHRcdH0sIHRoaXMpKTtcblx0XHRcdGRhdGVzID0gJC5ncmVwKGRhdGVzLCAkLnByb3h5KGZ1bmN0aW9uKGRhdGUpe1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdCF0aGlzLmRhdGVXaXRoaW5SYW5nZShkYXRlKSB8fFxuXHRcdFx0XHRcdCFkYXRlXG5cdFx0XHRcdCk7XG5cdFx0XHR9LCB0aGlzKSwgdHJ1ZSk7XG5cdFx0XHR0aGlzLmRhdGVzLnJlcGxhY2UoZGF0ZXMpO1xuXG5cdFx0XHRpZiAodGhpcy5vLnVwZGF0ZVZpZXdEYXRlKSB7XG5cdFx0XHRcdGlmICh0aGlzLmRhdGVzLmxlbmd0aClcblx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlcy5nZXQoLTEpKTtcblx0XHRcdFx0ZWxzZSBpZiAodGhpcy52aWV3RGF0ZSA8IHRoaXMuby5zdGFydERhdGUpXG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMuby5zdGFydERhdGUpO1xuXHRcdFx0XHRlbHNlIGlmICh0aGlzLnZpZXdEYXRlID4gdGhpcy5vLmVuZERhdGUpXG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMuby5lbmREYXRlKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUgPSB0aGlzLm8uZGVmYXVsdFZpZXdEYXRlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZnJvbUFyZ3Mpe1xuXHRcdFx0XHQvLyBzZXR0aW5nIGRhdGUgYnkgY2xpY2tpbmdcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hhbmdlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0aGlzLmRhdGVzLmxlbmd0aCl7XG5cdFx0XHRcdC8vIHNldHRpbmcgZGF0ZSBieSB0eXBpbmdcblx0XHRcdFx0aWYgKFN0cmluZyhvbGREYXRlcykgIT09IFN0cmluZyh0aGlzLmRhdGVzKSAmJiBmcm9tQXJncykge1xuXHRcdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZURhdGUnKTtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hhbmdlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghdGhpcy5kYXRlcy5sZW5ndGggJiYgb2xkRGF0ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NsZWFyRGF0ZScpO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hhbmdlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZmlsbCgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGZpbGxEb3c6IGZ1bmN0aW9uKCl7XG4gICAgICBpZiAodGhpcy5vLnNob3dXZWVrRGF5cykge1xuXHRcdFx0dmFyIGRvd0NudCA9IHRoaXMuby53ZWVrU3RhcnQsXG5cdFx0XHRcdGh0bWwgPSAnPHRyPic7XG5cdFx0XHRpZiAodGhpcy5vLmNhbGVuZGFyV2Vla3Mpe1xuXHRcdFx0XHRodG1sICs9ICc8dGggY2xhc3M9XCJjd1wiPiYjMTYwOzwvdGg+Jztcblx0XHRcdH1cblx0XHRcdHdoaWxlIChkb3dDbnQgPCB0aGlzLm8ud2Vla1N0YXJ0ICsgNyl7XG5cdFx0XHRcdGh0bWwgKz0gJzx0aCBjbGFzcz1cImRvdyc7XG4gICAgICAgIGlmICgkLmluQXJyYXkoZG93Q250LCB0aGlzLm8uZGF5c09mV2Vla0Rpc2FibGVkKSAhPT0gLTEpXG4gICAgICAgICAgaHRtbCArPSAnIGRpc2FibGVkJztcbiAgICAgICAgaHRtbCArPSAnXCI+JytkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLmRheXNNaW5bKGRvd0NudCsrKSU3XSsnPC90aD4nO1xuXHRcdFx0fVxuXHRcdFx0aHRtbCArPSAnPC90cj4nO1xuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLmRhdGVwaWNrZXItZGF5cyB0aGVhZCcpLmFwcGVuZChodG1sKTtcbiAgICAgIH1cblx0XHR9LFxuXG5cdFx0ZmlsbE1vbnRoczogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBsb2NhbERhdGUgPSB0aGlzLl91dGNfdG9fbG9jYWwodGhpcy52aWV3RGF0ZSk7XG5cdFx0XHR2YXIgaHRtbCA9ICcnO1xuXHRcdFx0dmFyIGZvY3VzZWQ7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEyOyBpKyspe1xuXHRcdFx0XHRmb2N1c2VkID0gbG9jYWxEYXRlICYmIGxvY2FsRGF0ZS5nZXRNb250aCgpID09PSBpID8gJyBmb2N1c2VkJyA6ICcnO1xuXHRcdFx0XHRodG1sICs9ICc8c3BhbiBjbGFzcz1cIm1vbnRoJyArIGZvY3VzZWQgKyAnXCI+JyArIGRhdGVzW3RoaXMuby5sYW5ndWFnZV0ubW9udGhzU2hvcnRbaV0gKyAnPC9zcGFuPic7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnBpY2tlci5maW5kKCcuZGF0ZXBpY2tlci1tb250aHMgdGQnKS5odG1sKGh0bWwpO1xuXHRcdH0sXG5cblx0XHRzZXRSYW5nZTogZnVuY3Rpb24ocmFuZ2Upe1xuXHRcdFx0aWYgKCFyYW5nZSB8fCAhcmFuZ2UubGVuZ3RoKVxuXHRcdFx0XHRkZWxldGUgdGhpcy5yYW5nZTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5yYW5nZSA9ICQubWFwKHJhbmdlLCBmdW5jdGlvbihkKXtcblx0XHRcdFx0XHRyZXR1cm4gZC52YWx1ZU9mKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0fSxcblxuXHRcdGdldENsYXNzTmFtZXM6IGZ1bmN0aW9uKGRhdGUpe1xuXHRcdFx0dmFyIGNscyA9IFtdLFxuXHRcdFx0XHR5ZWFyID0gdGhpcy52aWV3RGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuXHRcdFx0XHRtb250aCA9IHRoaXMudmlld0RhdGUuZ2V0VVRDTW9udGgoKSxcblx0XHRcdFx0dG9kYXkgPSBVVENUb2RheSgpO1xuXHRcdFx0aWYgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA8IHllYXIgfHwgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA9PT0geWVhciAmJiBkYXRlLmdldFVUQ01vbnRoKCkgPCBtb250aCkpe1xuXHRcdFx0XHRjbHMucHVzaCgnb2xkJyk7XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA+IHllYXIgfHwgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA9PT0geWVhciAmJiBkYXRlLmdldFVUQ01vbnRoKCkgPiBtb250aCkpe1xuXHRcdFx0XHRjbHMucHVzaCgnbmV3Jyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5mb2N1c0RhdGUgJiYgZGF0ZS52YWx1ZU9mKCkgPT09IHRoaXMuZm9jdXNEYXRlLnZhbHVlT2YoKSlcblx0XHRcdFx0Y2xzLnB1c2goJ2ZvY3VzZWQnKTtcblx0XHRcdC8vIENvbXBhcmUgaW50ZXJuYWwgVVRDIGRhdGUgd2l0aCBVVEMgdG9kYXksIG5vdCBsb2NhbCB0b2RheVxuXHRcdFx0aWYgKHRoaXMuby50b2RheUhpZ2hsaWdodCAmJiBpc1VUQ0VxdWFscyhkYXRlLCB0b2RheSkpIHtcblx0XHRcdFx0Y2xzLnB1c2goJ3RvZGF5Jyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXRlcy5jb250YWlucyhkYXRlKSAhPT0gLTEpXG5cdFx0XHRcdGNscy5wdXNoKCdhY3RpdmUnKTtcblx0XHRcdGlmICghdGhpcy5kYXRlV2l0aGluUmFuZ2UoZGF0ZSkpe1xuXHRcdFx0XHRjbHMucHVzaCgnZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmRhdGVJc0Rpc2FibGVkKGRhdGUpKXtcblx0XHRcdFx0Y2xzLnB1c2goJ2Rpc2FibGVkJywgJ2Rpc2FibGVkLWRhdGUnKTtcblx0XHRcdH1cblx0XHRcdGlmICgkLmluQXJyYXkoZGF0ZS5nZXRVVENEYXkoKSwgdGhpcy5vLmRheXNPZldlZWtIaWdobGlnaHRlZCkgIT09IC0xKXtcblx0XHRcdFx0Y2xzLnB1c2goJ2hpZ2hsaWdodGVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnJhbmdlKXtcblx0XHRcdFx0aWYgKGRhdGUgPiB0aGlzLnJhbmdlWzBdICYmIGRhdGUgPCB0aGlzLnJhbmdlW3RoaXMucmFuZ2UubGVuZ3RoLTFdKXtcblx0XHRcdFx0XHRjbHMucHVzaCgncmFuZ2UnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJC5pbkFycmF5KGRhdGUudmFsdWVPZigpLCB0aGlzLnJhbmdlKSAhPT0gLTEpe1xuXHRcdFx0XHRcdGNscy5wdXNoKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChkYXRlLnZhbHVlT2YoKSA9PT0gdGhpcy5yYW5nZVswXSl7XG4gICAgICAgICAgY2xzLnB1c2goJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGUudmFsdWVPZigpID09PSB0aGlzLnJhbmdlW3RoaXMucmFuZ2UubGVuZ3RoLTFdKXtcbiAgICAgICAgICBjbHMucHVzaCgncmFuZ2UtZW5kJyk7XG4gICAgICAgIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdF9maWxsX3llYXJzVmlldzogZnVuY3Rpb24oc2VsZWN0b3IsIGNzc0NsYXNzLCBmYWN0b3IsIHllYXIsIHN0YXJ0WWVhciwgZW5kWWVhciwgYmVmb3JlRm4pe1xuXHRcdFx0dmFyIGh0bWwgPSAnJztcblx0XHRcdHZhciBzdGVwID0gZmFjdG9yIC8gMTA7XG5cdFx0XHR2YXIgdmlldyA9IHRoaXMucGlja2VyLmZpbmQoc2VsZWN0b3IpO1xuXHRcdFx0dmFyIHN0YXJ0VmFsID0gTWF0aC5mbG9vcih5ZWFyIC8gZmFjdG9yKSAqIGZhY3Rvcjtcblx0XHRcdHZhciBlbmRWYWwgPSBzdGFydFZhbCArIHN0ZXAgKiA5O1xuXHRcdFx0dmFyIGZvY3VzZWRWYWwgPSBNYXRoLmZsb29yKHRoaXMudmlld0RhdGUuZ2V0RnVsbFllYXIoKSAvIHN0ZXApICogc3RlcDtcblx0XHRcdHZhciBzZWxlY3RlZCA9ICQubWFwKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGQpe1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcihkLmdldFVUQ0Z1bGxZZWFyKCkgLyBzdGVwKSAqIHN0ZXA7XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIGNsYXNzZXMsIHRvb2x0aXAsIGJlZm9yZTtcblx0XHRcdGZvciAodmFyIGN1cnJWYWwgPSBzdGFydFZhbCAtIHN0ZXA7IGN1cnJWYWwgPD0gZW5kVmFsICsgc3RlcDsgY3VyclZhbCArPSBzdGVwKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBbY3NzQ2xhc3NdO1xuXHRcdFx0XHR0b29sdGlwID0gbnVsbDtcblxuXHRcdFx0XHRpZiAoY3VyclZhbCA9PT0gc3RhcnRWYWwgLSBzdGVwKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCdvbGQnKTtcblx0XHRcdFx0fSBlbHNlIGlmIChjdXJyVmFsID09PSBlbmRWYWwgKyBzdGVwKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCduZXcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJC5pbkFycmF5KGN1cnJWYWwsIHNlbGVjdGVkKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjdXJyVmFsIDwgc3RhcnRZZWFyIHx8IGN1cnJWYWwgPiBlbmRZZWFyKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjdXJyVmFsID09PSBmb2N1c2VkVmFsKSB7XG5cdFx0XHRcdCAgY2xhc3Nlcy5wdXNoKCdmb2N1c2VkJyk7XG4gICAgICAgIH1cblxuXHRcdFx0XHRpZiAoYmVmb3JlRm4gIT09ICQubm9vcCkge1xuXHRcdFx0XHRcdGJlZm9yZSA9IGJlZm9yZUZuKG5ldyBEYXRlKGN1cnJWYWwsIDAsIDEpKTtcblx0XHRcdFx0XHRpZiAoYmVmb3JlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHt9O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGJlZm9yZSA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7ZW5hYmxlZDogYmVmb3JlfTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRiZWZvcmUgPSB7Y2xhc3NlczogYmVmb3JlfTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5lbmFibGVkID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYmVmb3JlLmNsYXNzZXMpIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChiZWZvcmUuY2xhc3Nlcy5zcGxpdCgvXFxzKy8pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS50b29sdGlwKSB7XG5cdFx0XHRcdFx0XHR0b29sdGlwID0gYmVmb3JlLnRvb2x0aXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aHRtbCArPSAnPHNwYW4gY2xhc3M9XCInICsgY2xhc3Nlcy5qb2luKCcgJykgKyAnXCInICsgKHRvb2x0aXAgPyAnIHRpdGxlPVwiJyArIHRvb2x0aXAgKyAnXCInIDogJycpICsgJz4nICsgY3VyclZhbCArICc8L3NwYW4+Jztcblx0XHRcdH1cblxuXHRcdFx0dmlldy5maW5kKCcuZGF0ZXBpY2tlci1zd2l0Y2gnKS50ZXh0KHN0YXJ0VmFsICsgJy0nICsgZW5kVmFsKTtcblx0XHRcdHZpZXcuZmluZCgndGQnKS5odG1sKGh0bWwpO1xuXHRcdH0sXG5cblx0XHRmaWxsOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGQgPSBuZXcgRGF0ZSh0aGlzLnZpZXdEYXRlKSxcblx0XHRcdFx0eWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKSxcblx0XHRcdFx0bW9udGggPSBkLmdldFVUQ01vbnRoKCksXG5cdFx0XHRcdHN0YXJ0WWVhciA9IHRoaXMuby5zdGFydERhdGUgIT09IC1JbmZpbml0eSA/IHRoaXMuby5zdGFydERhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IC1JbmZpbml0eSxcblx0XHRcdFx0c3RhcnRNb250aCA9IHRoaXMuby5zdGFydERhdGUgIT09IC1JbmZpbml0eSA/IHRoaXMuby5zdGFydERhdGUuZ2V0VVRDTW9udGgoKSA6IC1JbmZpbml0eSxcblx0XHRcdFx0ZW5kWWVhciA9IHRoaXMuby5lbmREYXRlICE9PSBJbmZpbml0eSA/IHRoaXMuby5lbmREYXRlLmdldFVUQ0Z1bGxZZWFyKCkgOiBJbmZpbml0eSxcblx0XHRcdFx0ZW5kTW9udGggPSB0aGlzLm8uZW5kRGF0ZSAhPT0gSW5maW5pdHkgPyB0aGlzLm8uZW5kRGF0ZS5nZXRVVENNb250aCgpIDogSW5maW5pdHksXG5cdFx0XHRcdHRvZGF5dHh0ID0gZGF0ZXNbdGhpcy5vLmxhbmd1YWdlXS50b2RheSB8fCBkYXRlc1snZW4nXS50b2RheSB8fCAnJyxcblx0XHRcdFx0Y2xlYXJ0eHQgPSBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLmNsZWFyIHx8IGRhdGVzWydlbiddLmNsZWFyIHx8ICcnLFxuXHRcdFx0XHR0aXRsZUZvcm1hdCA9IGRhdGVzW3RoaXMuby5sYW5ndWFnZV0udGl0bGVGb3JtYXQgfHwgZGF0ZXNbJ2VuJ10udGl0bGVGb3JtYXQsXG5cdFx0XHRcdHRvb2x0aXAsXG5cdFx0XHRcdGJlZm9yZTtcblx0XHRcdGlmIChpc05hTih5ZWFyKSB8fCBpc05hTihtb250aCkpXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLWRheXMgLmRhdGVwaWNrZXItc3dpdGNoJylcblx0XHRcdFx0XHRcdC50ZXh0KERQR2xvYmFsLmZvcm1hdERhdGUoZCwgdGl0bGVGb3JtYXQsIHRoaXMuby5sYW5ndWFnZSkpO1xuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgndGZvb3QgLnRvZGF5Jylcblx0XHRcdFx0XHRcdC50ZXh0KHRvZGF5dHh0KVxuXHRcdFx0XHRcdFx0LmNzcygnZGlzcGxheScsIHRoaXMuby50b2RheUJ0biA9PT0gdHJ1ZSB8fCB0aGlzLm8udG9kYXlCdG4gPT09ICdsaW5rZWQnID8gJ3RhYmxlLWNlbGwnIDogJ25vbmUnKTtcblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJ3Rmb290IC5jbGVhcicpXG5cdFx0XHRcdFx0XHQudGV4dChjbGVhcnR4dClcblx0XHRcdFx0XHRcdC5jc3MoJ2Rpc3BsYXknLCB0aGlzLm8uY2xlYXJCdG4gPT09IHRydWUgPyAndGFibGUtY2VsbCcgOiAnbm9uZScpO1xuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgndGhlYWQgLmRhdGVwaWNrZXItdGl0bGUnKVxuXHRcdFx0XHRcdFx0LnRleHQodGhpcy5vLnRpdGxlKVxuXHRcdFx0XHRcdFx0LmNzcygnZGlzcGxheScsIHR5cGVvZiB0aGlzLm8udGl0bGUgPT09ICdzdHJpbmcnICYmIHRoaXMuby50aXRsZSAhPT0gJycgPyAndGFibGUtY2VsbCcgOiAnbm9uZScpO1xuXHRcdFx0dGhpcy51cGRhdGVOYXZBcnJvd3MoKTtcblx0XHRcdHRoaXMuZmlsbE1vbnRocygpO1xuXHRcdFx0dmFyIHByZXZNb250aCA9IFVUQ0RhdGUoeWVhciwgbW9udGgsIDApLFxuXHRcdFx0XHRkYXkgPSBwcmV2TW9udGguZ2V0VVRDRGF0ZSgpO1xuXHRcdFx0cHJldk1vbnRoLnNldFVUQ0RhdGUoZGF5IC0gKHByZXZNb250aC5nZXRVVENEYXkoKSAtIHRoaXMuby53ZWVrU3RhcnQgKyA3KSU3KTtcblx0XHRcdHZhciBuZXh0TW9udGggPSBuZXcgRGF0ZShwcmV2TW9udGgpO1xuXHRcdFx0aWYgKHByZXZNb250aC5nZXRVVENGdWxsWWVhcigpIDwgMTAwKXtcbiAgICAgICAgbmV4dE1vbnRoLnNldFVUQ0Z1bGxZZWFyKHByZXZNb250aC5nZXRVVENGdWxsWWVhcigpKTtcbiAgICAgIH1cblx0XHRcdG5leHRNb250aC5zZXRVVENEYXRlKG5leHRNb250aC5nZXRVVENEYXRlKCkgKyA0Mik7XG5cdFx0XHRuZXh0TW9udGggPSBuZXh0TW9udGgudmFsdWVPZigpO1xuXHRcdFx0dmFyIGh0bWwgPSBbXTtcblx0XHRcdHZhciB3ZWVrRGF5LCBjbHNOYW1lO1xuXHRcdFx0d2hpbGUgKHByZXZNb250aC52YWx1ZU9mKCkgPCBuZXh0TW9udGgpe1xuXHRcdFx0XHR3ZWVrRGF5ID0gcHJldk1vbnRoLmdldFVUQ0RheSgpO1xuXHRcdFx0XHRpZiAod2Vla0RheSA9PT0gdGhpcy5vLndlZWtTdGFydCl7XG5cdFx0XHRcdFx0aHRtbC5wdXNoKCc8dHI+Jyk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuby5jYWxlbmRhcldlZWtzKXtcblx0XHRcdFx0XHRcdC8vIElTTyA4NjAxOiBGaXJzdCB3ZWVrIGNvbnRhaW5zIGZpcnN0IHRodXJzZGF5LlxuXHRcdFx0XHRcdFx0Ly8gSVNPIGFsc28gc3RhdGVzIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgYnV0IHdlIGNhbiBiZSBtb3JlIGFic3RyYWN0IGhlcmUuXG5cdFx0XHRcdFx0XHR2YXJcblx0XHRcdFx0XHRcdFx0Ly8gU3RhcnQgb2YgY3VycmVudCB3ZWVrOiBiYXNlZCBvbiB3ZWVrc3RhcnQvY3VycmVudCBkYXRlXG5cdFx0XHRcdFx0XHRcdHdzID0gbmV3IERhdGUoK3ByZXZNb250aCArICh0aGlzLm8ud2Vla1N0YXJ0IC0gd2Vla0RheSAtIDcpICUgNyAqIDg2NGU1KSxcblx0XHRcdFx0XHRcdFx0Ly8gVGh1cnNkYXkgb2YgdGhpcyB3ZWVrXG5cdFx0XHRcdFx0XHRcdHRoID0gbmV3IERhdGUoTnVtYmVyKHdzKSArICg3ICsgNCAtIHdzLmdldFVUQ0RheSgpKSAlIDcgKiA4NjRlNSksXG5cdFx0XHRcdFx0XHRcdC8vIEZpcnN0IFRodXJzZGF5IG9mIHllYXIsIHllYXIgZnJvbSB0aHVyc2RheVxuXHRcdFx0XHRcdFx0XHR5dGggPSBuZXcgRGF0ZShOdW1iZXIoeXRoID0gVVRDRGF0ZSh0aC5nZXRVVENGdWxsWWVhcigpLCAwLCAxKSkgKyAoNyArIDQgLSB5dGguZ2V0VVRDRGF5KCkpICUgNyAqIDg2NGU1KSxcblx0XHRcdFx0XHRcdFx0Ly8gQ2FsZW5kYXIgd2VlazogbXMgYmV0d2VlbiB0aHVyc2RheXMsIGRpdiBtcyBwZXIgZGF5LCBkaXYgNyBkYXlzXG5cdFx0XHRcdFx0XHRcdGNhbFdlZWsgPSAodGggLSB5dGgpIC8gODY0ZTUgLyA3ICsgMTtcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPHRkIGNsYXNzPVwiY3dcIj4nKyBjYWxXZWVrICsnPC90ZD4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lcyhwcmV2TW9udGgpO1xuXHRcdFx0XHRjbHNOYW1lLnB1c2goJ2RheScpO1xuXG5cdFx0XHRcdHZhciBjb250ZW50ID0gcHJldk1vbnRoLmdldFVUQ0RhdGUoKTtcblxuXHRcdFx0XHRpZiAodGhpcy5vLmJlZm9yZVNob3dEYXkgIT09ICQubm9vcCl7XG5cdFx0XHRcdFx0YmVmb3JlID0gdGhpcy5vLmJlZm9yZVNob3dEYXkodGhpcy5fdXRjX3RvX2xvY2FsKHByZXZNb250aCkpO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHt9O1xuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdib29sZWFuJylcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtlbmFibGVkOiBiZWZvcmV9O1xuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge2NsYXNzZXM6IGJlZm9yZX07XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5lbmFibGVkID09PSBmYWxzZSlcblx0XHRcdFx0XHRcdGNsc05hbWUucHVzaCgnZGlzYWJsZWQnKTtcblx0XHRcdFx0XHRpZiAoYmVmb3JlLmNsYXNzZXMpXG5cdFx0XHRcdFx0XHRjbHNOYW1lID0gY2xzTmFtZS5jb25jYXQoYmVmb3JlLmNsYXNzZXMuc3BsaXQoL1xccysvKSk7XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS50b29sdGlwKVxuXHRcdFx0XHRcdFx0dG9vbHRpcCA9IGJlZm9yZS50b29sdGlwO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUuY29udGVudClcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBiZWZvcmUuY29udGVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vQ2hlY2sgaWYgdW5pcXVlU29ydCBleGlzdHMgKHN1cHBvcnRlZCBieSBqcXVlcnkgPj0xLjEyIGFuZCA+PTIuMilcblx0XHRcdFx0Ly9GYWxsYmFjayB0byB1bmlxdWUgZnVuY3Rpb24gZm9yIG9sZGVyIGpxdWVyeSB2ZXJzaW9uc1xuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKCQudW5pcXVlU29ydCkpIHtcblx0XHRcdFx0XHRjbHNOYW1lID0gJC51bmlxdWVTb3J0KGNsc05hbWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNsc05hbWUgPSAkLnVuaXF1ZShjbHNOYW1lKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGh0bWwucHVzaCgnPHRkIGNsYXNzPVwiJytjbHNOYW1lLmpvaW4oJyAnKSsnXCInICsgKHRvb2x0aXAgPyAnIHRpdGxlPVwiJyt0b29sdGlwKydcIicgOiAnJykgKyAnIGRhdGEtZGF0ZT1cIicgKyBwcmV2TW9udGguZ2V0VGltZSgpLnRvU3RyaW5nKCkgKyAnXCI+JyArIGNvbnRlbnQgKyAnPC90ZD4nKTtcblx0XHRcdFx0dG9vbHRpcCA9IG51bGw7XG5cdFx0XHRcdGlmICh3ZWVrRGF5ID09PSB0aGlzLm8ud2Vla0VuZCl7XG5cdFx0XHRcdFx0aHRtbC5wdXNoKCc8L3RyPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByZXZNb250aC5zZXRVVENEYXRlKHByZXZNb250aC5nZXRVVENEYXRlKCkgKyAxKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLWRheXMgdGJvZHknKS5odG1sKGh0bWwuam9pbignJykpO1xuXG5cdFx0XHR2YXIgbW9udGhzVGl0bGUgPSBkYXRlc1t0aGlzLm8ubGFuZ3VhZ2VdLm1vbnRoc1RpdGxlIHx8IGRhdGVzWydlbiddLm1vbnRoc1RpdGxlIHx8ICdNb250aHMnO1xuXHRcdFx0dmFyIG1vbnRocyA9IHRoaXMucGlja2VyLmZpbmQoJy5kYXRlcGlja2VyLW1vbnRocycpXG5cdFx0XHRcdFx0XHQuZmluZCgnLmRhdGVwaWNrZXItc3dpdGNoJylcblx0XHRcdFx0XHRcdFx0LnRleHQodGhpcy5vLm1heFZpZXdNb2RlIDwgMiA/IG1vbnRoc1RpdGxlIDogeWVhcilcblx0XHRcdFx0XHRcdFx0LmVuZCgpXG5cdFx0XHRcdFx0XHQuZmluZCgndGJvZHkgc3BhbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0JC5lYWNoKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGksIGQpe1xuXHRcdFx0XHRpZiAoZC5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyKVxuXHRcdFx0XHRcdG1vbnRocy5lcShkLmdldFVUQ01vbnRoKCkpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoeWVhciA8IHN0YXJ0WWVhciB8fCB5ZWFyID4gZW5kWWVhcil7XG5cdFx0XHRcdG1vbnRocy5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdH1cblx0XHRcdGlmICh5ZWFyID09PSBzdGFydFllYXIpe1xuXHRcdFx0XHRtb250aHMuc2xpY2UoMCwgc3RhcnRNb250aCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoeWVhciA9PT0gZW5kWWVhcil7XG5cdFx0XHRcdG1vbnRocy5zbGljZShlbmRNb250aCsxKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuby5iZWZvcmVTaG93TW9udGggIT09ICQubm9vcCl7XG5cdFx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdFx0JC5lYWNoKG1vbnRocywgZnVuY3Rpb24oaSwgbW9udGgpe1xuICAgICAgICAgIHZhciBtb0RhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBpLCAxKTtcbiAgICAgICAgICB2YXIgYmVmb3JlID0gdGhhdC5vLmJlZm9yZVNob3dNb250aChtb0RhdGUpO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHt9O1xuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdib29sZWFuJylcblx0XHRcdFx0XHRcdGJlZm9yZSA9IHtlbmFibGVkOiBiZWZvcmV9O1xuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBiZWZvcmUgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdFx0YmVmb3JlID0ge2NsYXNzZXM6IGJlZm9yZX07XG5cdFx0XHRcdFx0aWYgKGJlZm9yZS5lbmFibGVkID09PSBmYWxzZSAmJiAhJChtb250aCkuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpXG5cdFx0XHRcdFx0ICAgICQobW9udGgpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUuY2xhc3Nlcylcblx0XHRcdFx0XHQgICAgJChtb250aCkuYWRkQ2xhc3MoYmVmb3JlLmNsYXNzZXMpO1xuXHRcdFx0XHRcdGlmIChiZWZvcmUudG9vbHRpcClcblx0XHRcdFx0XHQgICAgJChtb250aCkucHJvcCgndGl0bGUnLCBiZWZvcmUudG9vbHRpcCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0aW5nIGRlY2FkZS95ZWFycyBwaWNrZXJcblx0XHRcdHRoaXMuX2ZpbGxfeWVhcnNWaWV3KFxuXHRcdFx0XHQnLmRhdGVwaWNrZXIteWVhcnMnLFxuXHRcdFx0XHQneWVhcicsXG5cdFx0XHRcdDEwLFxuXHRcdFx0XHR5ZWFyLFxuXHRcdFx0XHRzdGFydFllYXIsXG5cdFx0XHRcdGVuZFllYXIsXG5cdFx0XHRcdHRoaXMuby5iZWZvcmVTaG93WWVhclxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gR2VuZXJhdGluZyBjZW50dXJ5L2RlY2FkZXMgcGlja2VyXG5cdFx0XHR0aGlzLl9maWxsX3llYXJzVmlldyhcblx0XHRcdFx0Jy5kYXRlcGlja2VyLWRlY2FkZXMnLFxuXHRcdFx0XHQnZGVjYWRlJyxcblx0XHRcdFx0MTAwLFxuXHRcdFx0XHR5ZWFyLFxuXHRcdFx0XHRzdGFydFllYXIsXG5cdFx0XHRcdGVuZFllYXIsXG5cdFx0XHRcdHRoaXMuby5iZWZvcmVTaG93RGVjYWRlXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBHZW5lcmF0aW5nIG1pbGxlbm5pdW0vY2VudHVyaWVzIHBpY2tlclxuXHRcdFx0dGhpcy5fZmlsbF95ZWFyc1ZpZXcoXG5cdFx0XHRcdCcuZGF0ZXBpY2tlci1jZW50dXJpZXMnLFxuXHRcdFx0XHQnY2VudHVyeScsXG5cdFx0XHRcdDEwMDAsXG5cdFx0XHRcdHllYXIsXG5cdFx0XHRcdHN0YXJ0WWVhcixcblx0XHRcdFx0ZW5kWWVhcixcblx0XHRcdFx0dGhpcy5vLmJlZm9yZVNob3dDZW50dXJ5XG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVOYXZBcnJvd3M6IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoIXRoaXMuX2FsbG93X3VwZGF0ZSlcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHR2YXIgZCA9IG5ldyBEYXRlKHRoaXMudmlld0RhdGUpLFxuXHRcdFx0XHR5ZWFyID0gZC5nZXRVVENGdWxsWWVhcigpLFxuXHRcdFx0XHRtb250aCA9IGQuZ2V0VVRDTW9udGgoKSxcblx0XHRcdFx0c3RhcnRZZWFyID0gdGhpcy5vLnN0YXJ0RGF0ZSAhPT0gLUluZmluaXR5ID8gdGhpcy5vLnN0YXJ0RGF0ZS5nZXRVVENGdWxsWWVhcigpIDogLUluZmluaXR5LFxuXHRcdFx0XHRzdGFydE1vbnRoID0gdGhpcy5vLnN0YXJ0RGF0ZSAhPT0gLUluZmluaXR5ID8gdGhpcy5vLnN0YXJ0RGF0ZS5nZXRVVENNb250aCgpIDogLUluZmluaXR5LFxuXHRcdFx0XHRlbmRZZWFyID0gdGhpcy5vLmVuZERhdGUgIT09IEluZmluaXR5ID8gdGhpcy5vLmVuZERhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IEluZmluaXR5LFxuXHRcdFx0XHRlbmRNb250aCA9IHRoaXMuby5lbmREYXRlICE9PSBJbmZpbml0eSA/IHRoaXMuby5lbmREYXRlLmdldFVUQ01vbnRoKCkgOiBJbmZpbml0eSxcblx0XHRcdFx0cHJldklzRGlzYWJsZWQsXG5cdFx0XHRcdG5leHRJc0Rpc2FibGVkLFxuXHRcdFx0XHRmYWN0b3IgPSAxO1xuXHRcdFx0c3dpdGNoICh0aGlzLnZpZXdNb2RlKXtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdHByZXZJc0Rpc2FibGVkID0geWVhciA8PSBzdGFydFllYXIgJiYgbW9udGggPD0gc3RhcnRNb250aDtcblx0XHRcdFx0XHRuZXh0SXNEaXNhYmxlZCA9IHllYXIgPj0gZW5kWWVhciAmJiBtb250aCA+PSBlbmRNb250aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdGZhY3RvciAqPSAxMDtcblx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRmYWN0b3IgKj0gMTA7XG5cdFx0XHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0ZmFjdG9yICo9IDEwO1xuXHRcdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdHByZXZJc0Rpc2FibGVkID0gTWF0aC5mbG9vcih5ZWFyIC8gZmFjdG9yKSAqIGZhY3RvciA8PSBzdGFydFllYXI7XG5cdFx0XHRcdFx0bmV4dElzRGlzYWJsZWQgPSBNYXRoLmZsb29yKHllYXIgLyBmYWN0b3IpICogZmFjdG9yICsgZmFjdG9yID49IGVuZFllYXI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucGlja2VyLmZpbmQoJy5wcmV2JykudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgcHJldklzRGlzYWJsZWQpO1xuXHRcdFx0dGhpcy5waWNrZXIuZmluZCgnLm5leHQnKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBuZXh0SXNEaXNhYmxlZCk7XG5cdFx0fSxcblxuXHRcdGNsaWNrOiBmdW5jdGlvbihlKXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHZhciB0YXJnZXQsIGRpciwgZGF5LCB5ZWFyLCBtb250aDtcblx0XHRcdHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXG5cdFx0XHQvLyBDbGlja2VkIG9uIHRoZSBzd2l0Y2hcblx0XHRcdGlmICh0YXJnZXQuaGFzQ2xhc3MoJ2RhdGVwaWNrZXItc3dpdGNoJykgJiYgdGhpcy52aWV3TW9kZSAhPT0gdGhpcy5vLm1heFZpZXdNb2RlKXtcblx0XHRcdFx0dGhpcy5zZXRWaWV3TW9kZSh0aGlzLnZpZXdNb2RlICsgMSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsaWNrZWQgb24gdG9kYXkgYnV0dG9uXG5cdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCd0b2RheScpICYmICF0YXJnZXQuaGFzQ2xhc3MoJ2RheScpKXtcblx0XHRcdFx0dGhpcy5zZXRWaWV3TW9kZSgwKTtcblx0XHRcdFx0dGhpcy5fc2V0RGF0ZShVVENUb2RheSgpLCB0aGlzLm8udG9kYXlCdG4gPT09ICdsaW5rZWQnID8gbnVsbCA6ICd2aWV3Jyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsaWNrZWQgb24gY2xlYXIgYnV0dG9uXG5cdFx0XHRpZiAodGFyZ2V0Lmhhc0NsYXNzKCdjbGVhcicpKXtcblx0XHRcdFx0dGhpcy5jbGVhckRhdGVzKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGFyZ2V0Lmhhc0NsYXNzKCdkaXNhYmxlZCcpKXtcblx0XHRcdFx0Ly8gQ2xpY2tlZCBvbiBhIG1vbnRoLCB5ZWFyLCBkZWNhZGUsIGNlbnR1cnlcblx0XHRcdFx0aWYgKHRhcmdldC5oYXNDbGFzcygnbW9udGgnKVxuXHRcdFx0XHRcdFx0fHwgdGFyZ2V0Lmhhc0NsYXNzKCd5ZWFyJylcblx0XHRcdFx0XHRcdHx8IHRhcmdldC5oYXNDbGFzcygnZGVjYWRlJylcblx0XHRcdFx0XHRcdHx8IHRhcmdldC5oYXNDbGFzcygnY2VudHVyeScpKSB7XG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZS5zZXRVVENEYXRlKDEpO1xuXG5cdFx0XHRcdFx0ZGF5ID0gMTtcblx0XHRcdFx0XHRpZiAodGhpcy52aWV3TW9kZSA9PT0gMSl7XG5cdFx0XHRcdFx0XHRtb250aCA9IHRhcmdldC5wYXJlbnQoKS5maW5kKCdzcGFuJykuaW5kZXgodGFyZ2V0KTtcblx0XHRcdFx0XHRcdHllYXIgPSB0aGlzLnZpZXdEYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnZpZXdEYXRlLnNldFVUQ01vbnRoKG1vbnRoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bW9udGggPSAwO1xuXHRcdFx0XHRcdFx0eWVhciA9IE51bWJlcih0YXJnZXQudGV4dCgpKTtcblx0XHRcdFx0XHRcdHRoaXMudmlld0RhdGUuc2V0VVRDRnVsbFllYXIoeWVhcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcihEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZSAtIDFdLmUsIHRoaXMudmlld0RhdGUpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMudmlld01vZGUgPT09IHRoaXMuby5taW5WaWV3TW9kZSl7XG5cdFx0XHRcdFx0XHR0aGlzLl9zZXREYXRlKFVUQ0RhdGUoeWVhciwgbW9udGgsIGRheSkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldFZpZXdNb2RlKHRoaXMudmlld01vZGUgLSAxKTtcblx0XHRcdFx0XHRcdHRoaXMuZmlsbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5waWNrZXIuaXMoJzp2aXNpYmxlJykgJiYgdGhpcy5fZm9jdXNlZF9mcm9tKXtcblx0XHRcdFx0dGhpcy5fZm9jdXNlZF9mcm9tLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgdGhpcy5fZm9jdXNlZF9mcm9tO1xuXHRcdH0sXG5cblx0XHRkYXlDZWxsQ2xpY2s6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHR2YXIgdGltZXN0YW1wID0gJHRhcmdldC5kYXRhKCdkYXRlJyk7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG5cblx0XHRcdGlmICh0aGlzLm8udXBkYXRlVmlld0RhdGUpIHtcblx0XHRcdFx0aWYgKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSAhPT0gdGhpcy52aWV3RGF0ZS5nZXRVVENGdWxsWWVhcigpKSB7XG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlWWVhcicsIHRoaXMudmlld0RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGRhdGUuZ2V0VVRDTW9udGgoKSAhPT0gdGhpcy52aWV3RGF0ZS5nZXRVVENNb250aCgpKSB7XG5cdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlTW9udGgnLCB0aGlzLnZpZXdEYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fc2V0RGF0ZShkYXRlKTtcblx0XHR9LFxuXG5cdFx0Ly8gQ2xpY2tlZCBvbiBwcmV2IG9yIG5leHRcblx0XHRuYXZBcnJvd3NDbGljazogZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdHZhciBkaXIgPSAkdGFyZ2V0Lmhhc0NsYXNzKCdwcmV2JykgPyAtMSA6IDE7XG5cdFx0XHRpZiAodGhpcy52aWV3TW9kZSAhPT0gMCl7XG5cdFx0XHRcdGRpciAqPSBEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZV0ubmF2U3RlcCAqIDEyO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMubW92ZU1vbnRoKHRoaXMudmlld0RhdGUsIGRpcik7XG5cdFx0XHR0aGlzLl90cmlnZ2VyKERQR2xvYmFsLnZpZXdNb2Rlc1t0aGlzLnZpZXdNb2RlXS5lLCB0aGlzLnZpZXdEYXRlKTtcblx0XHRcdHRoaXMuZmlsbCgpO1xuXHRcdH0sXG5cblx0XHRfdG9nZ2xlX211bHRpZGF0ZTogZnVuY3Rpb24oZGF0ZSl7XG5cdFx0XHR2YXIgaXggPSB0aGlzLmRhdGVzLmNvbnRhaW5zKGRhdGUpO1xuXHRcdFx0aWYgKCFkYXRlKXtcblx0XHRcdFx0dGhpcy5kYXRlcy5jbGVhcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXggIT09IC0xKXtcblx0XHRcdFx0aWYgKHRoaXMuby5tdWx0aWRhdGUgPT09IHRydWUgfHwgdGhpcy5vLm11bHRpZGF0ZSA+IDEgfHwgdGhpcy5vLnRvZ2dsZUFjdGl2ZSl7XG5cdFx0XHRcdFx0dGhpcy5kYXRlcy5yZW1vdmUoaXgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuby5tdWx0aWRhdGUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHRoaXMuZGF0ZXMuY2xlYXIoKTtcblx0XHRcdFx0dGhpcy5kYXRlcy5wdXNoKGRhdGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuZGF0ZXMucHVzaChkYXRlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLm8ubXVsdGlkYXRlID09PSAnbnVtYmVyJylcblx0XHRcdFx0d2hpbGUgKHRoaXMuZGF0ZXMubGVuZ3RoID4gdGhpcy5vLm11bHRpZGF0ZSlcblx0XHRcdFx0XHR0aGlzLmRhdGVzLnJlbW92ZSgwKTtcblx0XHR9LFxuXG5cdFx0X3NldERhdGU6IGZ1bmN0aW9uKGRhdGUsIHdoaWNoKXtcblx0XHRcdGlmICghd2hpY2ggfHwgd2hpY2ggPT09ICdkYXRlJylcblx0XHRcdFx0dGhpcy5fdG9nZ2xlX211bHRpZGF0ZShkYXRlICYmIG5ldyBEYXRlKGRhdGUpKTtcblx0XHRcdGlmICgoIXdoaWNoICYmIHRoaXMuby51cGRhdGVWaWV3RGF0ZSkgfHwgd2hpY2ggPT09ICd2aWV3Jylcblx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IGRhdGUgJiYgbmV3IERhdGUoZGF0ZSk7XG5cblx0XHRcdHRoaXMuZmlsbCgpO1xuXHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xuXHRcdFx0aWYgKCF3aGljaCB8fCB3aGljaCAhPT0gJ3ZpZXcnKSB7XG5cdFx0XHRcdHRoaXMuX3RyaWdnZXIoJ2NoYW5nZURhdGUnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRGaWVsZC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdGlmICh0aGlzLm8uYXV0b2Nsb3NlICYmICghd2hpY2ggfHwgd2hpY2ggPT09ICdkYXRlJykpe1xuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0bW92ZURheTogZnVuY3Rpb24oZGF0ZSwgZGlyKXtcblx0XHRcdHZhciBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cdFx0XHRuZXdEYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaXIpO1xuXG5cdFx0XHRyZXR1cm4gbmV3RGF0ZTtcblx0XHR9LFxuXG5cdFx0bW92ZVdlZWs6IGZ1bmN0aW9uKGRhdGUsIGRpcil7XG5cdFx0XHRyZXR1cm4gdGhpcy5tb3ZlRGF5KGRhdGUsIGRpciAqIDcpO1xuXHRcdH0sXG5cblx0XHRtb3ZlTW9udGg6IGZ1bmN0aW9uKGRhdGUsIGRpcil7XG5cdFx0XHRpZiAoIWlzVmFsaWREYXRlKGRhdGUpKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vLmRlZmF1bHRWaWV3RGF0ZTtcblx0XHRcdGlmICghZGlyKVxuXHRcdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHRcdHZhciBuZXdfZGF0ZSA9IG5ldyBEYXRlKGRhdGUudmFsdWVPZigpKSxcblx0XHRcdFx0ZGF5ID0gbmV3X2RhdGUuZ2V0VVRDRGF0ZSgpLFxuXHRcdFx0XHRtb250aCA9IG5ld19kYXRlLmdldFVUQ01vbnRoKCksXG5cdFx0XHRcdG1hZyA9IE1hdGguYWJzKGRpciksXG5cdFx0XHRcdG5ld19tb250aCwgdGVzdDtcblx0XHRcdGRpciA9IGRpciA+IDAgPyAxIDogLTE7XG5cdFx0XHRpZiAobWFnID09PSAxKXtcblx0XHRcdFx0dGVzdCA9IGRpciA9PT0gLTFcblx0XHRcdFx0XHQvLyBJZiBnb2luZyBiYWNrIG9uZSBtb250aCwgbWFrZSBzdXJlIG1vbnRoIGlzIG5vdCBjdXJyZW50IG1vbnRoXG5cdFx0XHRcdFx0Ly8gKGVnLCBNYXIgMzEgLT4gRmViIDMxID09IEZlYiAyOCwgbm90IE1hciAwMilcblx0XHRcdFx0XHQ/IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3X2RhdGUuZ2V0VVRDTW9udGgoKSA9PT0gbW9udGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIElmIGdvaW5nIGZvcndhcmQgb25lIG1vbnRoLCBtYWtlIHN1cmUgbW9udGggaXMgYXMgZXhwZWN0ZWRcblx0XHRcdFx0XHQvLyAoZWcsIEphbiAzMSAtPiBGZWIgMzEgPT0gRmViIDI4LCBub3QgTWFyIDAyKVxuXHRcdFx0XHRcdDogZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdfZGF0ZS5nZXRVVENNb250aCgpICE9PSBuZXdfbW9udGg7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0bmV3X21vbnRoID0gbW9udGggKyBkaXI7XG5cdFx0XHRcdG5ld19kYXRlLnNldFVUQ01vbnRoKG5ld19tb250aCk7XG5cdFx0XHRcdC8vIERlYyAtPiBKYW4gKDEyKSBvciBKYW4gLT4gRGVjICgtMSkgLS0gbGltaXQgZXhwZWN0ZWQgZGF0ZSB0byAwLTExXG5cdFx0XHRcdG5ld19tb250aCA9IChuZXdfbW9udGggKyAxMikgJSAxMjtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvLyBGb3IgbWFnbml0dWRlcyA+MSwgbW92ZSBvbmUgbW9udGggYXQgYSB0aW1lLi4uXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaSA8IG1hZzsgaSsrKVxuXHRcdFx0XHRcdC8vIC4uLndoaWNoIG1pZ2h0IGRlY3JlYXNlIHRoZSBkYXkgKGVnLCBKYW4gMzEgdG8gRmViIDI4LCBldGMpLi4uXG5cdFx0XHRcdFx0bmV3X2RhdGUgPSB0aGlzLm1vdmVNb250aChuZXdfZGF0ZSwgZGlyKTtcblx0XHRcdFx0Ly8gLi4udGhlbiByZXNldCB0aGUgZGF5LCBrZWVwaW5nIGl0IGluIHRoZSBuZXcgbW9udGhcblx0XHRcdFx0bmV3X21vbnRoID0gbmV3X2RhdGUuZ2V0VVRDTW9udGgoKTtcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDRGF0ZShkYXkpO1xuXHRcdFx0XHR0ZXN0ID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRyZXR1cm4gbmV3X21vbnRoICE9PSBuZXdfZGF0ZS5nZXRVVENNb250aCgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Ly8gQ29tbW9uIGRhdGUtcmVzZXR0aW5nIGxvb3AgLS0gaWYgZGF0ZSBpcyBiZXlvbmQgZW5kIG9mIG1vbnRoLCBtYWtlIGl0XG5cdFx0XHQvLyBlbmQgb2YgbW9udGhcblx0XHRcdHdoaWxlICh0ZXN0KCkpe1xuXHRcdFx0XHRuZXdfZGF0ZS5zZXRVVENEYXRlKC0tZGF5KTtcblx0XHRcdFx0bmV3X2RhdGUuc2V0VVRDTW9udGgobmV3X21vbnRoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdfZGF0ZTtcblx0XHR9LFxuXG5cdFx0bW92ZVllYXI6IGZ1bmN0aW9uKGRhdGUsIGRpcil7XG5cdFx0XHRyZXR1cm4gdGhpcy5tb3ZlTW9udGgoZGF0ZSwgZGlyKjEyKTtcblx0XHR9LFxuXG5cdFx0bW92ZUF2YWlsYWJsZURhdGU6IGZ1bmN0aW9uKGRhdGUsIGRpciwgZm4pe1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRkYXRlID0gdGhpc1tmbl0oZGF0ZSwgZGlyKTtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZGF0ZVdpdGhpblJhbmdlKGRhdGUpKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0XHRmbiA9ICdtb3ZlRGF5Jztcblx0XHRcdH1cblx0XHRcdHdoaWxlICh0aGlzLmRhdGVJc0Rpc2FibGVkKGRhdGUpKTtcblxuXHRcdFx0cmV0dXJuIGRhdGU7XG5cdFx0fSxcblxuXHRcdHdlZWtPZkRhdGVJc0Rpc2FibGVkOiBmdW5jdGlvbihkYXRlKXtcblx0XHRcdHJldHVybiAkLmluQXJyYXkoZGF0ZS5nZXRVVENEYXkoKSwgdGhpcy5vLmRheXNPZldlZWtEaXNhYmxlZCkgIT09IC0xO1xuXHRcdH0sXG5cblx0XHRkYXRlSXNEaXNhYmxlZDogZnVuY3Rpb24oZGF0ZSl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHR0aGlzLndlZWtPZkRhdGVJc0Rpc2FibGVkKGRhdGUpIHx8XG5cdFx0XHRcdCQuZ3JlcCh0aGlzLm8uZGF0ZXNEaXNhYmxlZCwgZnVuY3Rpb24oZCl7XG5cdFx0XHRcdFx0cmV0dXJuIGlzVVRDRXF1YWxzKGRhdGUsIGQpO1xuXHRcdFx0XHR9KS5sZW5ndGggPiAwXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRkYXRlV2l0aGluUmFuZ2U6IGZ1bmN0aW9uKGRhdGUpe1xuXHRcdFx0cmV0dXJuIGRhdGUgPj0gdGhpcy5vLnN0YXJ0RGF0ZSAmJiBkYXRlIDw9IHRoaXMuby5lbmREYXRlO1xuXHRcdH0sXG5cblx0XHRrZXlkb3duOiBmdW5jdGlvbihlKXtcblx0XHRcdGlmICghdGhpcy5waWNrZXIuaXMoJzp2aXNpYmxlJykpe1xuXHRcdFx0XHRpZiAoZS5rZXlDb2RlID09PSA0MCB8fCBlLmtleUNvZGUgPT09IDI3KSB7IC8vIGFsbG93IGRvd24gdG8gcmUtc2hvdyBwaWNrZXJcblx0XHRcdFx0XHR0aGlzLnNob3coKTtcblx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBkYXRlQ2hhbmdlZCA9IGZhbHNlLFxuXHRcdFx0XHRkaXIsIG5ld1ZpZXdEYXRlLFxuXHRcdFx0XHRmb2N1c0RhdGUgPSB0aGlzLmZvY3VzRGF0ZSB8fCB0aGlzLnZpZXdEYXRlO1xuXHRcdFx0c3dpdGNoIChlLmtleUNvZGUpe1xuXHRcdFx0XHRjYXNlIDI3OiAvLyBlc2NhcGVcblx0XHRcdFx0XHRpZiAodGhpcy5mb2N1c0RhdGUpe1xuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c0RhdGUgPSBudWxsO1xuXHRcdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xuXHRcdFx0XHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM3OiAvLyBsZWZ0XG5cdFx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdGNhc2UgMzk6IC8vIHJpZ2h0XG5cdFx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0XHRpZiAoIXRoaXMuby5rZXlib2FyZE5hdmlnYXRpb24gfHwgdGhpcy5vLmRheXNPZldlZWtEaXNhYmxlZC5sZW5ndGggPT09IDcpXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkaXIgPSBlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzggPyAtMSA6IDE7XG4gICAgICAgICAgaWYgKHRoaXMudmlld01vZGUgPT09IDApIHtcbiAgXHRcdFx0XHRcdGlmIChlLmN0cmxLZXkpe1xuICBcdFx0XHRcdFx0XHRuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlWWVhcicpO1xuXG4gIFx0XHRcdFx0XHRcdGlmIChuZXdWaWV3RGF0ZSlcbiAgXHRcdFx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VZZWFyJywgdGhpcy52aWV3RGF0ZSk7XG4gIFx0XHRcdFx0XHR9IGVsc2UgaWYgKGUuc2hpZnRLZXkpe1xuICBcdFx0XHRcdFx0XHRuZXdWaWV3RGF0ZSA9IHRoaXMubW92ZUF2YWlsYWJsZURhdGUoZm9jdXNEYXRlLCBkaXIsICdtb3ZlTW9udGgnKTtcblxuICBcdFx0XHRcdFx0XHRpZiAobmV3Vmlld0RhdGUpXG4gIFx0XHRcdFx0XHRcdFx0dGhpcy5fdHJpZ2dlcignY2hhbmdlTW9udGgnLCB0aGlzLnZpZXdEYXRlKTtcbiAgXHRcdFx0XHRcdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KXtcbiAgXHRcdFx0XHRcdFx0bmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZURheScpO1xuICBcdFx0XHRcdFx0fSBlbHNlIGlmICghdGhpcy53ZWVrT2ZEYXRlSXNEaXNhYmxlZChmb2N1c0RhdGUpKXtcbiAgXHRcdFx0XHRcdFx0bmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZVdlZWsnKTtcbiAgXHRcdFx0XHRcdH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlld01vZGUgPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgICAgICAgZGlyID0gZGlyICogNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZpZXdEYXRlID0gdGhpcy5tb3ZlQXZhaWxhYmxlRGF0ZShmb2N1c0RhdGUsIGRpciwgJ21vdmVNb250aCcpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3TW9kZSA9PT0gMikge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgICAgICAgICBkaXIgPSBkaXIgKiA0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Vmlld0RhdGUgPSB0aGlzLm1vdmVBdmFpbGFibGVEYXRlKGZvY3VzRGF0ZSwgZGlyLCAnbW92ZVllYXInKTtcbiAgICAgICAgICB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZpZXdEYXRlKXtcblx0XHRcdFx0XHRcdHRoaXMuZm9jdXNEYXRlID0gdGhpcy52aWV3RGF0ZSA9IG5ld1ZpZXdEYXRlO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRWYWx1ZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy5maWxsKCk7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDEzOiAvLyBlbnRlclxuXHRcdFx0XHRcdGlmICghdGhpcy5vLmZvcmNlUGFyc2UpXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRmb2N1c0RhdGUgPSB0aGlzLmZvY3VzRGF0ZSB8fCB0aGlzLmRhdGVzLmdldCgtMSkgfHwgdGhpcy52aWV3RGF0ZTtcblx0XHRcdFx0XHRpZiAodGhpcy5vLmtleWJvYXJkTmF2aWdhdGlvbikge1xuXHRcdFx0XHRcdFx0dGhpcy5fdG9nZ2xlX211bHRpZGF0ZShmb2N1c0RhdGUpO1xuXHRcdFx0XHRcdFx0ZGF0ZUNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLmZvY3VzRGF0ZSA9IG51bGw7XG5cdFx0XHRcdFx0dGhpcy52aWV3RGF0ZSA9IHRoaXMuZGF0ZXMuZ2V0KC0xKSB8fCB0aGlzLnZpZXdEYXRlO1xuXHRcdFx0XHRcdHRoaXMuc2V0VmFsdWUoKTtcblx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcblx0XHRcdFx0XHRpZiAodGhpcy5waWNrZXIuaXMoJzp2aXNpYmxlJykpe1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm8uYXV0b2Nsb3NlKVxuXHRcdFx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgOTogLy8gdGFiXG5cdFx0XHRcdFx0dGhpcy5mb2N1c0RhdGUgPSBudWxsO1xuXHRcdFx0XHRcdHRoaXMudmlld0RhdGUgPSB0aGlzLmRhdGVzLmdldCgtMSkgfHwgdGhpcy52aWV3RGF0ZTtcblx0XHRcdFx0XHR0aGlzLmZpbGwoKTtcblx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmIChkYXRlQ2hhbmdlZCl7XG5cdFx0XHRcdGlmICh0aGlzLmRhdGVzLmxlbmd0aClcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjaGFuZ2VEYXRlJyk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl90cmlnZ2VyKCdjbGVhckRhdGUnKTtcblx0XHRcdFx0dGhpcy5pbnB1dEZpZWxkLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXRWaWV3TW9kZTogZnVuY3Rpb24odmlld01vZGUpe1xuXHRcdFx0dGhpcy52aWV3TW9kZSA9IHZpZXdNb2RlO1xuXHRcdFx0dGhpcy5waWNrZXJcblx0XHRcdFx0LmNoaWxkcmVuKCdkaXYnKVxuXHRcdFx0XHQuaGlkZSgpXG5cdFx0XHRcdC5maWx0ZXIoJy5kYXRlcGlja2VyLScgKyBEUEdsb2JhbC52aWV3TW9kZXNbdGhpcy52aWV3TW9kZV0uY2xzTmFtZSlcblx0XHRcdFx0XHQuc2hvdygpO1xuXHRcdFx0dGhpcy51cGRhdGVOYXZBcnJvd3MoKTtcbiAgICAgIHRoaXMuX3RyaWdnZXIoJ2NoYW5nZVZpZXdNb2RlJywgbmV3IERhdGUodGhpcy52aWV3RGF0ZSkpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgRGF0ZVJhbmdlUGlja2VyID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucyl7XG5cdFx0JC5kYXRhKGVsZW1lbnQsICdkYXRlcGlja2VyJywgdGhpcyk7XG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcblx0XHR0aGlzLmlucHV0cyA9ICQubWFwKG9wdGlvbnMuaW5wdXRzLCBmdW5jdGlvbihpKXtcblx0XHRcdHJldHVybiBpLmpxdWVyeSA/IGlbMF0gOiBpO1xuXHRcdH0pO1xuXHRcdGRlbGV0ZSBvcHRpb25zLmlucHV0cztcblxuXHRcdHRoaXMua2VlcEVtcHR5VmFsdWVzID0gb3B0aW9ucy5rZWVwRW1wdHlWYWx1ZXM7XG5cdFx0ZGVsZXRlIG9wdGlvbnMua2VlcEVtcHR5VmFsdWVzO1xuXG5cdFx0ZGF0ZXBpY2tlclBsdWdpbi5jYWxsKCQodGhpcy5pbnB1dHMpLCBvcHRpb25zKVxuXHRcdFx0Lm9uKCdjaGFuZ2VEYXRlJywgJC5wcm94eSh0aGlzLmRhdGVVcGRhdGVkLCB0aGlzKSk7XG5cblx0XHR0aGlzLnBpY2tlcnMgPSAkLm1hcCh0aGlzLmlucHV0cywgZnVuY3Rpb24oaSl7XG5cdFx0XHRyZXR1cm4gJC5kYXRhKGksICdkYXRlcGlja2VyJyk7XG5cdFx0fSk7XG5cdFx0dGhpcy51cGRhdGVEYXRlcygpO1xuXHR9O1xuXHREYXRlUmFuZ2VQaWNrZXIucHJvdG90eXBlID0ge1xuXHRcdHVwZGF0ZURhdGVzOiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5kYXRlcyA9ICQubWFwKHRoaXMucGlja2VycywgZnVuY3Rpb24oaSl7XG5cdFx0XHRcdHJldHVybiBpLmdldFVUQ0RhdGUoKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy51cGRhdGVSYW5nZXMoKTtcblx0XHR9LFxuXHRcdHVwZGF0ZVJhbmdlczogZnVuY3Rpb24oKXtcblx0XHRcdHZhciByYW5nZSA9ICQubWFwKHRoaXMuZGF0ZXMsIGZ1bmN0aW9uKGQpe1xuXHRcdFx0XHRyZXR1cm4gZC52YWx1ZU9mKCk7XG5cdFx0XHR9KTtcblx0XHRcdCQuZWFjaCh0aGlzLnBpY2tlcnMsIGZ1bmN0aW9uKGksIHApe1xuXHRcdFx0XHRwLnNldFJhbmdlKHJhbmdlKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0ZGF0ZVVwZGF0ZWQ6IGZ1bmN0aW9uKGUpe1xuXHRcdFx0Ly8gYHRoaXMudXBkYXRpbmdgIGlzIGEgd29ya2Fyb3VuZCBmb3IgcHJldmVudGluZyBpbmZpbml0ZSByZWN1cnNpb25cblx0XHRcdC8vIGJldHdlZW4gYGNoYW5nZURhdGVgIHRyaWdnZXJpbmcgYW5kIGBzZXRVVENEYXRlYCBjYWxsaW5nLiAgVW50aWxcblx0XHRcdC8vIHRoZXJlIGlzIGEgYmV0dGVyIG1lY2hhbmlzbS5cblx0XHRcdGlmICh0aGlzLnVwZGF0aW5nKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcblxuXHRcdFx0dmFyIGRwID0gJC5kYXRhKGUudGFyZ2V0LCAnZGF0ZXBpY2tlcicpO1xuXG5cdFx0XHRpZiAoZHAgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBuZXdfZGF0ZSA9IGRwLmdldFVUQ0RhdGUoKSxcblx0XHRcdFx0a2VlcF9lbXB0eV92YWx1ZXMgPSB0aGlzLmtlZXBFbXB0eVZhbHVlcyxcblx0XHRcdFx0aSA9ICQuaW5BcnJheShlLnRhcmdldCwgdGhpcy5pbnB1dHMpLFxuXHRcdFx0XHRqID0gaSAtIDEsXG5cdFx0XHRcdGsgPSBpICsgMSxcblx0XHRcdFx0bCA9IHRoaXMuaW5wdXRzLmxlbmd0aDtcblx0XHRcdGlmIChpID09PSAtMSlcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHQkLmVhY2godGhpcy5waWNrZXJzLCBmdW5jdGlvbihpLCBwKXtcblx0XHRcdFx0aWYgKCFwLmdldFVUQ0RhdGUoKSAmJiAocCA9PT0gZHAgfHwgIWtlZXBfZW1wdHlfdmFsdWVzKSlcblx0XHRcdFx0XHRwLnNldFVUQ0RhdGUobmV3X2RhdGUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChuZXdfZGF0ZSA8IHRoaXMuZGF0ZXNbal0pe1xuXHRcdFx0XHQvLyBEYXRlIGJlaW5nIG1vdmVkIGVhcmxpZXIvbGVmdFxuXHRcdFx0XHR3aGlsZSAoaiA+PSAwICYmIG5ld19kYXRlIDwgdGhpcy5kYXRlc1tqXSl7XG5cdFx0XHRcdFx0dGhpcy5waWNrZXJzW2otLV0uc2V0VVRDRGF0ZShuZXdfZGF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAobmV3X2RhdGUgPiB0aGlzLmRhdGVzW2tdKXtcblx0XHRcdFx0Ly8gRGF0ZSBiZWluZyBtb3ZlZCBsYXRlci9yaWdodFxuXHRcdFx0XHR3aGlsZSAoayA8IGwgJiYgbmV3X2RhdGUgPiB0aGlzLmRhdGVzW2tdKXtcblx0XHRcdFx0XHR0aGlzLnBpY2tlcnNbaysrXS5zZXRVVENEYXRlKG5ld19kYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy51cGRhdGVEYXRlcygpO1xuXG5cdFx0XHRkZWxldGUgdGhpcy51cGRhdGluZztcblx0XHR9LFxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkLm1hcCh0aGlzLnBpY2tlcnMsIGZ1bmN0aW9uKHApeyBwLmRlc3Ryb3koKTsgfSk7XG5cdFx0XHQkKHRoaXMuaW5wdXRzKS5vZmYoJ2NoYW5nZURhdGUnLCB0aGlzLmRhdGVVcGRhdGVkKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0YSgpLmRhdGVwaWNrZXI7XG5cdFx0fSxcblx0XHRyZW1vdmU6IGFsaWFzKCdkZXN0cm95JywgJ01ldGhvZCBgcmVtb3ZlYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAyLjAuIFVzZSBgZGVzdHJveWAgaW5zdGVhZCcpXG5cdH07XG5cblx0ZnVuY3Rpb24gb3B0c19mcm9tX2VsKGVsLCBwcmVmaXgpe1xuXHRcdC8vIERlcml2ZSBvcHRpb25zIGZyb20gZWxlbWVudCBkYXRhLWF0dHJzXG5cdFx0dmFyIGRhdGEgPSAkKGVsKS5kYXRhKCksXG5cdFx0XHRvdXQgPSB7fSwgaW5rZXksXG5cdFx0XHRyZXBsYWNlID0gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICcoW0EtWl0pJyk7XG5cdFx0cHJlZml4ID0gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSk7XG5cdFx0ZnVuY3Rpb24gcmVfbG93ZXIoXyxhKXtcblx0XHRcdHJldHVybiBhLnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGtleSBpbiBkYXRhKVxuXHRcdFx0aWYgKHByZWZpeC50ZXN0KGtleSkpe1xuXHRcdFx0XHRpbmtleSA9IGtleS5yZXBsYWNlKHJlcGxhY2UsIHJlX2xvd2VyKTtcblx0XHRcdFx0b3V0W2lua2V5XSA9IGRhdGFba2V5XTtcblx0XHRcdH1cblx0XHRyZXR1cm4gb3V0O1xuXHR9XG5cblx0ZnVuY3Rpb24gb3B0c19mcm9tX2xvY2FsZShsYW5nKXtcblx0XHQvLyBEZXJpdmUgb3B0aW9ucyBmcm9tIGxvY2FsZSBwbHVnaW5zXG5cdFx0dmFyIG91dCA9IHt9O1xuXHRcdC8vIENoZWNrIGlmIFwiZGUtREVcIiBzdHlsZSBkYXRlIGlzIGF2YWlsYWJsZSwgaWYgbm90IGxhbmd1YWdlIHNob3VsZFxuXHRcdC8vIGZhbGxiYWNrIHRvIDIgbGV0dGVyIGNvZGUgZWcgXCJkZVwiXG5cdFx0aWYgKCFkYXRlc1tsYW5nXSl7XG5cdFx0XHRsYW5nID0gbGFuZy5zcGxpdCgnLScpWzBdO1xuXHRcdFx0aWYgKCFkYXRlc1tsYW5nXSlcblx0XHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgZCA9IGRhdGVzW2xhbmddO1xuXHRcdCQuZWFjaChsb2NhbGVfb3B0cywgZnVuY3Rpb24oaSxrKXtcblx0XHRcdGlmIChrIGluIGQpXG5cdFx0XHRcdG91dFtrXSA9IGRba107XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHZhciBvbGQgPSAkLmZuLmRhdGVwaWNrZXI7XG5cdHZhciBkYXRlcGlja2VyUGx1Z2luID0gZnVuY3Rpb24ob3B0aW9uKXtcblx0XHR2YXIgYXJncyA9IEFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdFx0YXJncy5zaGlmdCgpO1xuXHRcdHZhciBpbnRlcm5hbF9yZXR1cm47XG5cdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRkYXRhID0gJHRoaXMuZGF0YSgnZGF0ZXBpY2tlcicpLFxuXHRcdFx0XHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PT0gJ29iamVjdCcgJiYgb3B0aW9uO1xuXHRcdFx0aWYgKCFkYXRhKXtcblx0XHRcdFx0dmFyIGVsb3B0cyA9IG9wdHNfZnJvbV9lbCh0aGlzLCAnZGF0ZScpLFxuXHRcdFx0XHRcdC8vIFByZWxpbWluYXJ5IG90aW9uc1xuXHRcdFx0XHRcdHhvcHRzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBlbG9wdHMsIG9wdGlvbnMpLFxuXHRcdFx0XHRcdGxvY29wdHMgPSBvcHRzX2Zyb21fbG9jYWxlKHhvcHRzLmxhbmd1YWdlKSxcblx0XHRcdFx0XHQvLyBPcHRpb25zIHByaW9yaXR5OiBqcyBhcmdzLCBkYXRhLWF0dHJzLCBsb2NhbGVzLCBkZWZhdWx0c1xuXHRcdFx0XHRcdG9wdHMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGxvY29wdHMsIGVsb3B0cywgb3B0aW9ucyk7XG5cdFx0XHRcdGlmICgkdGhpcy5oYXNDbGFzcygnaW5wdXQtZGF0ZXJhbmdlJykgfHwgb3B0cy5pbnB1dHMpe1xuXHRcdFx0XHRcdCQuZXh0ZW5kKG9wdHMsIHtcblx0XHRcdFx0XHRcdGlucHV0czogb3B0cy5pbnB1dHMgfHwgJHRoaXMuZmluZCgnaW5wdXQnKS50b0FycmF5KClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRkYXRhID0gbmV3IERhdGVSYW5nZVBpY2tlcih0aGlzLCBvcHRzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRkYXRhID0gbmV3IERhdGVwaWNrZXIodGhpcywgb3B0cyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHRoaXMuZGF0YSgnZGF0ZXBpY2tlcicsIGRhdGEpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnICYmIHR5cGVvZiBkYXRhW29wdGlvbl0gPT09ICdmdW5jdGlvbicpe1xuXHRcdFx0XHRpbnRlcm5hbF9yZXR1cm4gPSBkYXRhW29wdGlvbl0uYXBwbHkoZGF0YSwgYXJncyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoXG5cdFx0XHRpbnRlcm5hbF9yZXR1cm4gPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0aW50ZXJuYWxfcmV0dXJuIGluc3RhbmNlb2YgRGF0ZXBpY2tlciB8fFxuXHRcdFx0aW50ZXJuYWxfcmV0dXJuIGluc3RhbmNlb2YgRGF0ZVJhbmdlUGlja2VyXG5cdFx0KVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRpZiAodGhpcy5sZW5ndGggPiAxKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVc2luZyBvbmx5IGFsbG93ZWQgZm9yIHRoZSBjb2xsZWN0aW9uIG9mIGEgc2luZ2xlIGVsZW1lbnQgKCcgKyBvcHRpb24gKyAnIGZ1bmN0aW9uKScpO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBpbnRlcm5hbF9yZXR1cm47XG5cdH07XG5cdCQuZm4uZGF0ZXBpY2tlciA9IGRhdGVwaWNrZXJQbHVnaW47XG5cblx0dmFyIGRlZmF1bHRzID0gJC5mbi5kYXRlcGlja2VyLmRlZmF1bHRzID0ge1xuXHRcdGFzc3VtZU5lYXJieVllYXI6IGZhbHNlLFxuXHRcdGF1dG9jbG9zZTogZmFsc2UsXG5cdFx0YmVmb3JlU2hvd0RheTogJC5ub29wLFxuXHRcdGJlZm9yZVNob3dNb250aDogJC5ub29wLFxuXHRcdGJlZm9yZVNob3dZZWFyOiAkLm5vb3AsXG5cdFx0YmVmb3JlU2hvd0RlY2FkZTogJC5ub29wLFxuXHRcdGJlZm9yZVNob3dDZW50dXJ5OiAkLm5vb3AsXG5cdFx0Y2FsZW5kYXJXZWVrczogZmFsc2UsXG5cdFx0Y2xlYXJCdG46IGZhbHNlLFxuXHRcdHRvZ2dsZUFjdGl2ZTogZmFsc2UsXG5cdFx0ZGF5c09mV2Vla0Rpc2FibGVkOiBbXSxcblx0XHRkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IFtdLFxuXHRcdGRhdGVzRGlzYWJsZWQ6IFtdLFxuXHRcdGVuZERhdGU6IEluZmluaXR5LFxuXHRcdGZvcmNlUGFyc2U6IHRydWUsXG5cdFx0Zm9ybWF0OiAnbW0vZGQveXl5eScsXG5cdFx0a2VlcEVtcHR5VmFsdWVzOiBmYWxzZSxcblx0XHRrZXlib2FyZE5hdmlnYXRpb246IHRydWUsXG5cdFx0bGFuZ3VhZ2U6ICdlbicsXG5cdFx0bWluVmlld01vZGU6IDAsXG5cdFx0bWF4Vmlld01vZGU6IDQsXG5cdFx0bXVsdGlkYXRlOiBmYWxzZSxcblx0XHRtdWx0aWRhdGVTZXBhcmF0b3I6ICcsJyxcblx0XHRvcmllbnRhdGlvbjogXCJhdXRvXCIsXG5cdFx0cnRsOiBmYWxzZSxcblx0XHRzdGFydERhdGU6IC1JbmZpbml0eSxcblx0XHRzdGFydFZpZXc6IDAsXG5cdFx0dG9kYXlCdG46IGZhbHNlLFxuXHRcdHRvZGF5SGlnaGxpZ2h0OiBmYWxzZSxcblx0XHR1cGRhdGVWaWV3RGF0ZTogdHJ1ZSxcblx0XHR3ZWVrU3RhcnQ6IDAsXG5cdFx0ZGlzYWJsZVRvdWNoS2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdGVuYWJsZU9uUmVhZG9ubHk6IHRydWUsXG5cdFx0c2hvd09uRm9jdXM6IHRydWUsXG5cdFx0ekluZGV4T2Zmc2V0OiAxMCxcblx0XHRjb250YWluZXI6ICdib2R5Jyxcblx0XHRpbW1lZGlhdGVVcGRhdGVzOiBmYWxzZSxcblx0XHR0aXRsZTogJycsXG5cdFx0dGVtcGxhdGVzOiB7XG5cdFx0XHRsZWZ0QXJyb3c6ICcmI3gwMEFCOycsXG5cdFx0XHRyaWdodEFycm93OiAnJiN4MDBCQjsnXG5cdFx0fSxcbiAgICBzaG93V2Vla0RheXM6IHRydWVcblx0fTtcblx0dmFyIGxvY2FsZV9vcHRzID0gJC5mbi5kYXRlcGlja2VyLmxvY2FsZV9vcHRzID0gW1xuXHRcdCdmb3JtYXQnLFxuXHRcdCdydGwnLFxuXHRcdCd3ZWVrU3RhcnQnXG5cdF07XG5cdCQuZm4uZGF0ZXBpY2tlci5Db25zdHJ1Y3RvciA9IERhdGVwaWNrZXI7XG5cdHZhciBkYXRlcyA9ICQuZm4uZGF0ZXBpY2tlci5kYXRlcyA9IHtcblx0XHRlbjoge1xuXHRcdFx0ZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG5cdFx0XHRkYXlzU2hvcnQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcblx0XHRcdGRheXNNaW46IFtcIlN1XCIsIFwiTW9cIiwgXCJUdVwiLCBcIldlXCIsIFwiVGhcIiwgXCJGclwiLCBcIlNhXCJdLFxuXHRcdFx0bW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcblx0XHRcdG1vbnRoc1Nob3J0OiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl0sXG5cdFx0XHR0b2RheTogXCJUb2RheVwiLFxuXHRcdFx0Y2xlYXI6IFwiQ2xlYXJcIixcblx0XHRcdHRpdGxlRm9ybWF0OiBcIk1NIHl5eXlcIlxuXHRcdH1cblx0fTtcblxuXHR2YXIgRFBHbG9iYWwgPSB7XG5cdFx0dmlld01vZGVzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWVzOiBbJ2RheXMnLCAnbW9udGgnXSxcblx0XHRcdFx0Y2xzTmFtZTogJ2RheXMnLFxuXHRcdFx0XHRlOiAnY2hhbmdlTW9udGgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lczogWydtb250aHMnLCAneWVhciddLFxuXHRcdFx0XHRjbHNOYW1lOiAnbW9udGhzJyxcblx0XHRcdFx0ZTogJ2NoYW5nZVllYXInLFxuXHRcdFx0XHRuYXZTdGVwOiAxXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lczogWyd5ZWFycycsICdkZWNhZGUnXSxcblx0XHRcdFx0Y2xzTmFtZTogJ3llYXJzJyxcblx0XHRcdFx0ZTogJ2NoYW5nZURlY2FkZScsXG5cdFx0XHRcdG5hdlN0ZXA6IDEwXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lczogWydkZWNhZGVzJywgJ2NlbnR1cnknXSxcblx0XHRcdFx0Y2xzTmFtZTogJ2RlY2FkZXMnLFxuXHRcdFx0XHRlOiAnY2hhbmdlQ2VudHVyeScsXG5cdFx0XHRcdG5hdlN0ZXA6IDEwMFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bmFtZXM6IFsnY2VudHVyaWVzJywgJ21pbGxlbm5pdW0nXSxcblx0XHRcdFx0Y2xzTmFtZTogJ2NlbnR1cmllcycsXG5cdFx0XHRcdGU6ICdjaGFuZ2VNaWxsZW5uaXVtJyxcblx0XHRcdFx0bmF2U3RlcDogMTAwMFxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0dmFsaWRQYXJ0czogL2RkP3xERD98bW0/fE1NP3x5eSg/Onl5KT8vZyxcblx0XHRub25wdW5jdHVhdGlvbjogL1teIC1cXC86LUBcXHU1ZTc0XFx1NjcwOFxcdTY1ZTVcXFstYHstflxcdFxcblxccl0rL2csXG5cdFx0cGFyc2VGb3JtYXQ6IGZ1bmN0aW9uKGZvcm1hdCl7XG5cdFx0XHRpZiAodHlwZW9mIGZvcm1hdC50b1ZhbHVlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBmb3JtYXQudG9EaXNwbGF5ID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgICAgICAgICAvLyBJRSB0cmVhdHMgXFwwIGFzIGEgc3RyaW5nIGVuZCBpbiBpbnB1dHMgKHRydW5jYXRpbmcgdGhlIHZhbHVlKSxcblx0XHRcdC8vIHNvIGl0J3MgYSBiYWQgZm9ybWF0IGRlbGltaXRlciwgYW55d2F5XG5cdFx0XHR2YXIgc2VwYXJhdG9ycyA9IGZvcm1hdC5yZXBsYWNlKHRoaXMudmFsaWRQYXJ0cywgJ1xcMCcpLnNwbGl0KCdcXDAnKSxcblx0XHRcdFx0cGFydHMgPSBmb3JtYXQubWF0Y2godGhpcy52YWxpZFBhcnRzKTtcblx0XHRcdGlmICghc2VwYXJhdG9ycyB8fCAhc2VwYXJhdG9ycy5sZW5ndGggfHwgIXBhcnRzIHx8IHBhcnRzLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQuXCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHtzZXBhcmF0b3JzOiBzZXBhcmF0b3JzLCBwYXJ0czogcGFydHN9O1xuXHRcdH0sXG5cdFx0cGFyc2VEYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQsIGxhbmd1YWdlLCBhc3N1bWVOZWFyYnkpe1xuXHRcdFx0aWYgKCFkYXRlKVxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxuXHRcdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHRcdGlmICh0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJylcblx0XHRcdFx0Zm9ybWF0ID0gRFBHbG9iYWwucGFyc2VGb3JtYXQoZm9ybWF0KTtcblx0XHRcdGlmIChmb3JtYXQudG9WYWx1ZSlcblx0XHRcdFx0cmV0dXJuIGZvcm1hdC50b1ZhbHVlKGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2UpO1xuXHRcdFx0dmFyIGZuX21hcCA9IHtcblx0XHRcdFx0XHRkOiAnbW92ZURheScsXG5cdFx0XHRcdFx0bTogJ21vdmVNb250aCcsXG5cdFx0XHRcdFx0dzogJ21vdmVXZWVrJyxcblx0XHRcdFx0XHR5OiAnbW92ZVllYXInXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGVBbGlhc2VzID0ge1xuXHRcdFx0XHRcdHllc3RlcmRheTogJy0xZCcsXG5cdFx0XHRcdFx0dG9kYXk6ICcrMGQnLFxuXHRcdFx0XHRcdHRvbW9ycm93OiAnKzFkJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRwYXJ0cywgcGFydCwgZGlyLCBpLCBmbjtcblx0XHRcdGlmIChkYXRlIGluIGRhdGVBbGlhc2VzKXtcblx0XHRcdFx0ZGF0ZSA9IGRhdGVBbGlhc2VzW2RhdGVdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKC9eW1xcLStdXFxkK1tkbXd5XShbXFxzLF0rW1xcLStdXFxkK1tkbXd5XSkqJC9pLnRlc3QoZGF0ZSkpe1xuXHRcdFx0XHRwYXJ0cyA9IGRhdGUubWF0Y2goLyhbXFwtK11cXGQrKShbZG13eV0pL2dpKTtcblx0XHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdGZvciAoaT0wOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdHBhcnQgPSBwYXJ0c1tpXS5tYXRjaCgvKFtcXC0rXVxcZCspKFtkbXd5XSkvaSk7XG5cdFx0XHRcdFx0ZGlyID0gTnVtYmVyKHBhcnRbMV0pO1xuXHRcdFx0XHRcdGZuID0gZm5fbWFwW3BhcnRbMl0udG9Mb3dlckNhc2UoKV07XG5cdFx0XHRcdFx0ZGF0ZSA9IERhdGVwaWNrZXIucHJvdG90eXBlW2ZuXShkYXRlLCBkaXIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBEYXRlcGlja2VyLnByb3RvdHlwZS5femVyb191dGNfdGltZShkYXRlKTtcblx0XHRcdH1cblxuXHRcdFx0cGFydHMgPSBkYXRlICYmIGRhdGUubWF0Y2godGhpcy5ub25wdW5jdHVhdGlvbikgfHwgW107XG5cblx0XHRcdGZ1bmN0aW9uIGFwcGx5TmVhcmJ5WWVhcih5ZWFyLCB0aHJlc2hvbGQpe1xuXHRcdFx0XHRpZiAodGhyZXNob2xkID09PSB0cnVlKVxuXHRcdFx0XHRcdHRocmVzaG9sZCA9IDEwO1xuXG5cdFx0XHRcdC8vIGlmIHllYXIgaXMgMiBkaWdpdHMgb3IgbGVzcywgdGhhbiB0aGUgdXNlciBtb3N0IGxpa2VseSBpcyB0cnlpbmcgdG8gZ2V0IGEgcmVjZW50IGNlbnR1cnlcblx0XHRcdFx0aWYgKHllYXIgPCAxMDApe1xuXHRcdFx0XHRcdHllYXIgKz0gMjAwMDtcblx0XHRcdFx0XHQvLyBpZiB0aGUgbmV3IHllYXIgaXMgbW9yZSB0aGFuIHRocmVzaG9sZCB5ZWFycyBpbiBhZHZhbmNlLCB1c2UgbGFzdCBjZW50dXJ5XG5cdFx0XHRcdFx0aWYgKHllYXIgPiAoKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCkrdGhyZXNob2xkKSl7XG5cdFx0XHRcdFx0XHR5ZWFyIC09IDEwMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4geWVhcjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhcnNlZCA9IHt9LFxuXHRcdFx0XHRzZXR0ZXJzX29yZGVyID0gWyd5eXl5JywgJ3l5JywgJ00nLCAnTU0nLCAnbScsICdtbScsICdkJywgJ2RkJ10sXG5cdFx0XHRcdHNldHRlcnNfbWFwID0ge1xuXHRcdFx0XHRcdHl5eXk6IGZ1bmN0aW9uKGQsdil7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZC5zZXRVVENGdWxsWWVhcihhc3N1bWVOZWFyYnkgPyBhcHBseU5lYXJieVllYXIodiwgYXNzdW1lTmVhcmJ5KSA6IHYpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bTogZnVuY3Rpb24oZCx2KXtcblx0XHRcdFx0XHRcdGlmIChpc05hTihkKSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGQ7XG5cdFx0XHRcdFx0XHR2IC09IDE7XG5cdFx0XHRcdFx0XHR3aGlsZSAodiA8IDApIHYgKz0gMTI7XG5cdFx0XHRcdFx0XHR2ICU9IDEyO1xuXHRcdFx0XHRcdFx0ZC5zZXRVVENNb250aCh2KTtcblx0XHRcdFx0XHRcdHdoaWxlIChkLmdldFVUQ01vbnRoKCkgIT09IHYpXG5cdFx0XHRcdFx0XHRcdGQuc2V0VVRDRGF0ZShkLmdldFVUQ0RhdGUoKS0xKTtcblx0XHRcdFx0XHRcdHJldHVybiBkO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZDogZnVuY3Rpb24oZCx2KXtcblx0XHRcdFx0XHRcdHJldHVybiBkLnNldFVUQ0RhdGUodik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YWwsIGZpbHRlcmVkO1xuXHRcdFx0c2V0dGVyc19tYXBbJ3l5J10gPSBzZXR0ZXJzX21hcFsneXl5eSddO1xuXHRcdFx0c2V0dGVyc19tYXBbJ00nXSA9IHNldHRlcnNfbWFwWydNTSddID0gc2V0dGVyc19tYXBbJ21tJ10gPSBzZXR0ZXJzX21hcFsnbSddO1xuXHRcdFx0c2V0dGVyc19tYXBbJ2RkJ10gPSBzZXR0ZXJzX21hcFsnZCddO1xuXHRcdFx0ZGF0ZSA9IFVUQ1RvZGF5KCk7XG5cdFx0XHR2YXIgZnBhcnRzID0gZm9ybWF0LnBhcnRzLnNsaWNlKCk7XG5cdFx0XHQvLyBSZW1vdmUgbm9vcCBwYXJ0c1xuXHRcdFx0aWYgKHBhcnRzLmxlbmd0aCAhPT0gZnBhcnRzLmxlbmd0aCl7XG5cdFx0XHRcdGZwYXJ0cyA9ICQoZnBhcnRzKS5maWx0ZXIoZnVuY3Rpb24oaSxwKXtcblx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KHAsIHNldHRlcnNfb3JkZXIpICE9PSAtMTtcblx0XHRcdFx0fSkudG9BcnJheSgpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gUHJvY2VzcyByZW1haW5kZXJcblx0XHRcdGZ1bmN0aW9uIG1hdGNoX3BhcnQoKXtcblx0XHRcdFx0dmFyIG0gPSB0aGlzLnNsaWNlKDAsIHBhcnRzW2ldLmxlbmd0aCksXG5cdFx0XHRcdFx0cCA9IHBhcnRzW2ldLnNsaWNlKDAsIG0ubGVuZ3RoKTtcblx0XHRcdFx0cmV0dXJuIG0udG9Mb3dlckNhc2UoKSA9PT0gcC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBhcnRzLmxlbmd0aCA9PT0gZnBhcnRzLmxlbmd0aCl7XG5cdFx0XHRcdHZhciBjbnQ7XG5cdFx0XHRcdGZvciAoaT0wLCBjbnQgPSBmcGFydHMubGVuZ3RoOyBpIDwgY250OyBpKyspe1xuXHRcdFx0XHRcdHZhbCA9IHBhcnNlSW50KHBhcnRzW2ldLCAxMCk7XG5cdFx0XHRcdFx0cGFydCA9IGZwYXJ0c1tpXTtcblx0XHRcdFx0XHRpZiAoaXNOYU4odmFsKSl7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKHBhcnQpe1xuXHRcdFx0XHRcdFx0XHRjYXNlICdNTSc6XG5cdFx0XHRcdFx0XHRcdFx0ZmlsdGVyZWQgPSAkKGRhdGVzW2xhbmd1YWdlXS5tb250aHMpLmZpbHRlcihtYXRjaF9wYXJ0KTtcblx0XHRcdFx0XHRcdFx0XHR2YWwgPSAkLmluQXJyYXkoZmlsdGVyZWRbMF0sIGRhdGVzW2xhbmd1YWdlXS5tb250aHMpICsgMTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRcdFx0ZmlsdGVyZWQgPSAkKGRhdGVzW2xhbmd1YWdlXS5tb250aHNTaG9ydCkuZmlsdGVyKG1hdGNoX3BhcnQpO1xuXHRcdFx0XHRcdFx0XHRcdHZhbCA9ICQuaW5BcnJheShmaWx0ZXJlZFswXSwgZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRoc1Nob3J0KSArIDE7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBhcnNlZFtwYXJ0XSA9IHZhbDtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgX2RhdGUsIHM7XG5cdFx0XHRcdGZvciAoaT0wOyBpIDwgc2V0dGVyc19vcmRlci5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0cyA9IHNldHRlcnNfb3JkZXJbaV07XG5cdFx0XHRcdFx0aWYgKHMgaW4gcGFyc2VkICYmICFpc05hTihwYXJzZWRbc10pKXtcblx0XHRcdFx0XHRcdF9kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cdFx0XHRcdFx0XHRzZXR0ZXJzX21hcFtzXShfZGF0ZSwgcGFyc2VkW3NdKTtcblx0XHRcdFx0XHRcdGlmICghaXNOYU4oX2RhdGUpKVxuXHRcdFx0XHRcdFx0XHRkYXRlID0gX2RhdGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHR9LFxuXHRcdGZvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCwgbGFuZ3VhZ2Upe1xuXHRcdFx0aWYgKCFkYXRlKVxuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHRpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ3N0cmluZycpXG5cdFx0XHRcdGZvcm1hdCA9IERQR2xvYmFsLnBhcnNlRm9ybWF0KGZvcm1hdCk7XG5cdFx0XHRpZiAoZm9ybWF0LnRvRGlzcGxheSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LnRvRGlzcGxheShkYXRlLCBmb3JtYXQsIGxhbmd1YWdlKTtcbiAgICAgICAgICAgIHZhciB2YWwgPSB7XG5cdFx0XHRcdGQ6IGRhdGUuZ2V0VVRDRGF0ZSgpLFxuXHRcdFx0XHREOiBkYXRlc1tsYW5ndWFnZV0uZGF5c1Nob3J0W2RhdGUuZ2V0VVRDRGF5KCldLFxuXHRcdFx0XHRERDogZGF0ZXNbbGFuZ3VhZ2VdLmRheXNbZGF0ZS5nZXRVVENEYXkoKV0sXG5cdFx0XHRcdG06IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsXG5cdFx0XHRcdE06IGRhdGVzW2xhbmd1YWdlXS5tb250aHNTaG9ydFtkYXRlLmdldFVUQ01vbnRoKCldLFxuXHRcdFx0XHRNTTogZGF0ZXNbbGFuZ3VhZ2VdLm1vbnRoc1tkYXRlLmdldFVUQ01vbnRoKCldLFxuXHRcdFx0XHR5eTogZGF0ZS5nZXRVVENGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpLFxuXHRcdFx0XHR5eXl5OiBkYXRlLmdldFVUQ0Z1bGxZZWFyKClcblx0XHRcdH07XG5cdFx0XHR2YWwuZGQgPSAodmFsLmQgPCAxMCA/ICcwJyA6ICcnKSArIHZhbC5kO1xuXHRcdFx0dmFsLm1tID0gKHZhbC5tIDwgMTAgPyAnMCcgOiAnJykgKyB2YWwubTtcblx0XHRcdGRhdGUgPSBbXTtcblx0XHRcdHZhciBzZXBzID0gJC5leHRlbmQoW10sIGZvcm1hdC5zZXBhcmF0b3JzKTtcblx0XHRcdGZvciAodmFyIGk9MCwgY250ID0gZm9ybWF0LnBhcnRzLmxlbmd0aDsgaSA8PSBjbnQ7IGkrKyl7XG5cdFx0XHRcdGlmIChzZXBzLmxlbmd0aClcblx0XHRcdFx0XHRkYXRlLnB1c2goc2Vwcy5zaGlmdCgpKTtcblx0XHRcdFx0ZGF0ZS5wdXNoKHZhbFtmb3JtYXQucGFydHNbaV1dKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkYXRlLmpvaW4oJycpO1xuXHRcdH0sXG5cdFx0aGVhZFRlbXBsYXRlOiAnPHRoZWFkPicrXG5cdFx0XHQgICAgICAgICAgICAgICc8dHI+Jytcblx0XHRcdCAgICAgICAgICAgICAgICAnPHRoIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJkYXRlcGlja2VyLXRpdGxlXCI+PC90aD4nK1xuXHRcdFx0ICAgICAgICAgICAgICAnPC90cj4nK1xuXHRcdFx0XHRcdFx0XHQnPHRyPicrXG5cdFx0XHRcdFx0XHRcdFx0Jzx0aCBjbGFzcz1cInByZXZcIj4nK2RlZmF1bHRzLnRlbXBsYXRlcy5sZWZ0QXJyb3crJzwvdGg+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNvbHNwYW49XCI1XCIgY2xhc3M9XCJkYXRlcGlja2VyLXN3aXRjaFwiPjwvdGg+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNsYXNzPVwibmV4dFwiPicrZGVmYXVsdHMudGVtcGxhdGVzLnJpZ2h0QXJyb3crJzwvdGg+Jytcblx0XHRcdFx0XHRcdFx0JzwvdHI+Jytcblx0XHRcdFx0XHRcdCc8L3RoZWFkPicsXG5cdFx0Y29udFRlbXBsYXRlOiAnPHRib2R5Pjx0cj48dGQgY29sc3Bhbj1cIjdcIj48L3RkPjwvdHI+PC90Ym9keT4nLFxuXHRcdGZvb3RUZW1wbGF0ZTogJzx0Zm9vdD4nK1xuXHRcdFx0XHRcdFx0XHQnPHRyPicrXG5cdFx0XHRcdFx0XHRcdFx0Jzx0aCBjb2xzcGFuPVwiN1wiIGNsYXNzPVwidG9kYXlcIj48L3RoPicrXG5cdFx0XHRcdFx0XHRcdCc8L3RyPicrXG5cdFx0XHRcdFx0XHRcdCc8dHI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRoIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJjbGVhclwiPjwvdGg+Jytcblx0XHRcdFx0XHRcdFx0JzwvdHI+Jytcblx0XHRcdFx0XHRcdCc8L3Rmb290Pidcblx0fTtcblx0RFBHbG9iYWwudGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj4nK1xuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZGF5c1wiPicrXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHQnPHRib2R5PjwvdGJvZHk+Jytcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmZvb3RUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xuXHRcdFx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLW1vbnRoc1wiPicrXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5jb250VGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+Jytcblx0XHRcdFx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci15ZWFyc1wiPicrXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5jb250VGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+Jytcblx0XHRcdFx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1kZWNhZGVzXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPHRhYmxlIGNsYXNzPVwidGFibGUtY29uZGVuc2VkXCI+Jytcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmhlYWRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmNvbnRUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHRcdERQR2xvYmFsLmZvb3RUZW1wbGF0ZStcblx0XHRcdFx0XHRcdFx0XHQnPC90YWJsZT4nK1xuXHRcdFx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWNlbnR1cmllc1wiPicrXG5cdFx0XHRcdFx0XHRcdFx0Jzx0YWJsZSBjbGFzcz1cInRhYmxlLWNvbmRlbnNlZFwiPicrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5oZWFkVGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5jb250VGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0XHREUEdsb2JhbC5mb290VGVtcGxhdGUrXG5cdFx0XHRcdFx0XHRcdFx0JzwvdGFibGU+Jytcblx0XHRcdFx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdFx0XHQnPC9kaXY+JztcblxuXHQkLmZuLmRhdGVwaWNrZXIuRFBHbG9iYWwgPSBEUEdsb2JhbDtcblxuXG5cdC8qIERBVEVQSUNLRVIgTk8gQ09ORkxJQ1Rcblx0KiA9PT09PT09PT09PT09PT09PT09ICovXG5cblx0JC5mbi5kYXRlcGlja2VyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpe1xuXHRcdCQuZm4uZGF0ZXBpY2tlciA9IG9sZDtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvKiBEQVRFUElDS0VSIFZFUlNJT05cblx0ICogPT09PT09PT09PT09PT09PT09PSAqL1xuXHQkLmZuLmRhdGVwaWNrZXIudmVyc2lvbiA9ICcxLjcuMSc7XG5cblx0JC5mbi5kYXRlcGlja2VyLmRlcHJlY2F0ZWQgPSBmdW5jdGlvbihtc2cpe1xuXHRcdHZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG5cdFx0aWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oJ0RFUFJFQ0FURUQ6ICcgKyBtc2cpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qIERBVEVQSUNLRVIgREFUQS1BUElcblx0KiA9PT09PT09PT09PT09PT09PT0gKi9cblxuXHQkKGRvY3VtZW50KS5vbihcblx0XHQnZm9jdXMuZGF0ZXBpY2tlci5kYXRhLWFwaSBjbGljay5kYXRlcGlja2VyLmRhdGEtYXBpJyxcblx0XHQnW2RhdGEtcHJvdmlkZT1cImRhdGVwaWNrZXJcIl0nLFxuXHRcdGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdGlmICgkdGhpcy5kYXRhKCdkYXRlcGlja2VyJykpXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vIGNvbXBvbmVudCBjbGljayByZXF1aXJlcyB1cyB0byBleHBsaWNpdGx5IHNob3cgaXRcblx0XHRcdGRhdGVwaWNrZXJQbHVnaW4uY2FsbCgkdGhpcywgJ3Nob3cnKTtcblx0XHR9XG5cdCk7XG5cdCQoZnVuY3Rpb24oKXtcblx0XHRkYXRlcGlja2VyUGx1Z2luLmNhbGwoJCgnW2RhdGEtcHJvdmlkZT1cImRhdGVwaWNrZXItaW5saW5lXCJdJykpO1xuXHR9KTtcblxufSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWRhdGVwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAzIl0sInNvdXJjZVJvb3QiOiIifQ==