function createElement(e, t, n) {
    if (void 0 === e) return !1;
    void 0 === n && (n = "");
    var a = document.createElement(e);
    if ("object" == typeof t)
        for (var i in t) a.setAttribute(i, t[i]);
    Array.isArray(n) || (n = [n]);
    for (var r = 0; r < n.length; r++) n[r].tagName ? a.appendChild(n[r]) : a.appendChild(document.createTextNode(n[r]));
    return a
}
var DateInputField = function(r, n, t, l, o) {
        var s, u, d, a, c, p, h, e, f = {
                "y-m-d": "(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])",
                "y-d-m": "(\\d{4})-(0[1-9]|1\\d|2\\d|3[01])-(0[1-9]|1[0-2])",
                "d-y-m": "(0[1-9]|1\\d|2\\d|3[01])-(\\d{4})-(0[1-9]|1[0-2])",
                "d-m-y": "(0[1-9]|1\\d|2\\d|3[01])-(0[1-9]|1[0-2])-(\\d{4})",
                "m-y-d": "(0[1-9]|1[0-2])-(\\d{4})-(0[1-9]|1\\d|2\\d|3[01])",
                "m-d-y": "(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d|3[01])-(\\d{4})"
            },
            m = "MM-DD-YYYY",
            g = "y-m-d",
            v = "01-01-2000",
            b = o.options,
            y = (this.buildHTML = function() {
                var e = createElement("span", {
                        class: "emphasis"
                    }),
                    t = createElement("div", {
                        class: "calendarContainer ",
                        id: "calendar" + r,
                        style: "display:none;"
                    }),
                    n = createElement("img", {
                        src: "assets/calendar.png",
                        class: "calendarIcon translatable",
                        title: "Show/hide calendar"
                    }),
                    a = o.name || "Date",
                    e = (u = createElement("span", {
                        class: "date-input-mask"
                    }, [e, m]), s = createElement("input", {
                        class: " translatable form-textbox date-input ",
                        "aria-label": a
                    }), createElement("span", {}, [u, s, n, t])),
                    a = (((d = !b[1] || "default" !== b[1] && "today" !== b[1] ? d : !0) || l) && (defaultDate.day = defaultDate.day < 10 && "0" != defaultDate.day[0] ? "0" + defaultDate.day : defaultDate.day, defaultDate.month = defaultDate.month < 10 && "0" != defaultDate.month[0] ? "0" + defaultDate.month : defaultDate.month, s.value = F(m.split("-"), defaultDate.year, defaultDate.month, defaultDate.day), u.innerHTML = w(F(m.split("-"), defaultDate.year, defaultDate.month, defaultDate.day))), $("<div>", {
                        class: "dateContainer",
                        id: "dateContainer" + r
                    }).html(e));
                return $.datepicker.setDefaults($.datepicker.regional.en), $(".calendarContainer", a).datepicker({
                    inline: !0,
                    firstDay: 1,
                    dateFormat: "yy-mm-dd",
                    onSelect: C
                }), $(a).on("click", ".calendarIcon", y), a
            }, this.handleValueChange = function(e, t) {
                s.value = e.handleCurrentValue(t), u.innerHTML = w(t.target.value)
            }, this.handleCurrentValue = function(e) {
                for (var t, n = m, a = e.target.value, i = n.length, r = "", l = a.replace(/\D/g, ""), o = 0, s = 0; o < i && (t = !isNaN(parseInt(l[s])), (matchesNumber = 0 <= "XdDmMyY9".indexOf(n[o])) && t ? r += l[s++] : r += "M" != n[o] && n[o], null != l[s]); o++);
                return this.validateProgress(e, r)
            }, this.validateProgress = function(e, t) {
                var n, a = new RegExp(f[g]),
                    r = t.length;
                if (1 == r && "MM" == m.toUpperCase().substr(0, 2)) return t = 1 < t && t < 10 ? "0" + t : t;
                for (i = r; 0 <= i; i--) {
                    if (n = t + v.substr(t.length), a.test(n)) return t;
                    t = t.substr(0, t.length - 1)
                }
                return t
            }, this.getContainer = function() {
                return t
            }, this.activateMasking = function() {
                s.addEventListener && s.addEventListener("input", function(e) {
                    this.handleValueChange.call(null, this, e)
                }.bind(this), !1)
            }, this.getValue = function() {
                return !(s.value.length < 10) && x(r)
            }, this.validate = function() {
                var e = $("input", t)[0];
                return e.validity ? e.validity.valid : "function" != typeof e.checkValidity || e.checkValidity()
            }, this.clear = function() {
                $("input", t).val("")
            }, function(e) {
                "block" == (c = $(".calendarContainer", e.target.parentNode.parentNode)).css("display") ? c.hide() : c.show(), JFCustomWidget.isFromCardform() && (a = a || c.closest(".configurable-list-field-wrapper").height(), e = c.height(), "block" == c.css("display") ? c.closest(".configurable-list-field-wrapper").css("height", a + e) : c.closest(".configurable-list-field-wrapper").css("height", a - e)), n.onCellResize()
            }),
            w = function(e) {
                return "<span class='emphasis'>" + e + "</span>" + m.substr(e.length)
            },
            C = function(e, t) {
                e = e.split("-"), e = F(e, e[0], e[1], e[2]);
                u.innerHTML = w(e), s.value = e, JFCustomWidget.isFromCardform() && c.closest(".configurable-list-field-wrapper").css("height", a), $("#" + t.id).hide(), n.onCellResize()
            },
            x = function(e) {
                var n, a, i, r = s.value.split("-"),
                    t = D();
                return $.each(t, function(e, t) {
                    "year" == t ? n = r[e] : "month" == t ? a = r[e] : i = r[e]
                }), t = n + "-" + a + "-" + i, $("#calendar" + e).datepicker("setDate", t).hide(), s.value
            },
            D = function() {
                return $.map(g.match(/y|m|d/g), function(e) {
                    return e.replace("y", "year").replace("m", "month").replace("d", "day")
                })
            },
            F = function(n, a, i, r) {
                var e = D();
                return $.each(e, function(e, t) {
                    n[e] = "year" == t ? a : "month" == t ? i : r
                }), n[0] + "-" + n[1] + "-" + n[2]
            };
        ! function(e) {
            if ((e.match(/y/g) || []).length != 1) return false;
            if ((e.match(/m/g) || []).length != 1) return false;
            if ((e.match(/d/g) || []).length != 1) return false;
            if (e.match(/[<>&0-9]+/)) return false;
            return true
        }(g = (g = b[0] && b[0].match(/y|m|d/) ? b[0].replace(/\//g, "-") : g).toLowerCase()) && (g = "y-m-d"), m = F(m.split("-"), "YYYY", "MM", "DD"), v = F(v.split("-"), "2000", "01", "01"), defaultDate = (p = l) ? (h = {}, e = D(), $.each(e, function(e, t) {
            var n = "year" == t || "y" == t ? /\d\d\d\d/ : /\d\d/;
            h[t] = p.match(n)[0], p = p.replace(n, "")
        }), h) : {
            year: (e = new Date).getFullYear(),
            month: e.getMonth() + 1,
            day: e.getDate()
        }, setTimeout(function() {
            this.activateMasking()
        }.bind(this), 200)
    },
    TimeInputField = function(e, t, a, r) {
        var l, o, n, s, u = a ? a.substring(0, 2) : null,
            d = a ? a.substring(3, 5) : null,
            c = a ? a.substring(6, 8) : null,
            p = r.options,
            h = 12,
            f = "HH:MM",
            m = [],
            g = !1,
            v = (this.buildHTML = function() {
                var e, t = r.name || "Time",
                    n = createElement("span", {
                        class: "emphasis"
                    }),
                    n = (o = createElement("span", {
                        class: "date-input-mask"
                    }, [n, f]), l = createElement("input", {
                        class: " translatable form-textbox time-input ",
                        "aria-label": t
                    }), (g || a) && (l.value = v(u) + ":" + v(d), o.innerHTML = b(v(u) + ":" + v(d))), createElement("span", {
                        class: "timeContainer"
                    }, [o, l]));
                return 12 == h && (t = a ? a.substring(6, 8) : null, g && (e = 12 <= m[0] ? "PM" : "AM", t = t || e), (e = createElement("select", {
                    class: " ampm form-dropdown date-fields ",
                    "aria-label": "Time Periods"
                })).appendChild(new Option("AM", "AM", !1, "AM" == t)), e.appendChild(new Option("PM", "PM", !1, "PM" == t)), n.appendChild(e)), n
            }, this.handleValueChange = function(e, t) {
                l.value = e.handleCurrentValue(t), o.innerHTML = b(t.target.value)
            }, this.handleCurrentValue = function(e) {
                for (var t, n = f, a = e.target.value, i = n.length, r = "", l = a.replace(/\D/g, ""), o = 0, s = 0; o < i && (t = !isNaN(parseInt(l[s])), (matchesNumber = 0 <= "XhHmMyY9".indexOf(n[o])) && t ? r += l[s++] : r += n[o], null != l[s]); o++);
                return this.validateProgress(e, r)
            }, this.activateMasking = function() {
                l.addEventListener && l.addEventListener("input", function(e) {
                    this.handleValueChange.call(null, this, e)
                }.bind(this), !1)
            }, this.validateProgress = function(e, t) {
                var n, a = "^(0?[1-9]|1[0-2]):[0-5][0-9]$",
                    r = (24 == h && (a = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"), new RegExp(a)),
                    a = t.length;
                for (i = a; 0 <= i; i--) {
                    if (n = t + "01:01".substr(t.length), r.test(n)) return t;
                    t = t.substr(0, t.length - 1)
                }
                return t
            }, this.getValue = function() {
                var e = $("input", t).val() ? $("input", t).val() : "";
                return e && 12 == h && $(".ampm", t).val() ? e += " " + $(".ampm", t).val() : 12 != h || $(".ampm", t).val() || (e = ""), e
            }, this.getContainer = function() {
                return t
            }, this.clear = function() {
                $("input", t).val("")
            }, setTimeout(function() {
                this.activateMasking()
            }.bind(this), 200), function(e) {
                return String(e).padStart(2, "0")
            }),
            b = function(e) {
                return "<span class='emphasis'>" + e + "</span>" + f.substr(e.length)
            };
        p && -1 < p[0].indexOf(",") ? (n = (s = p[0].split(","))[1].toLowerCase().trim(), s = s[0].trim(), h = "24" === s ? Number(s) : h, "now" === n && (s = new Date, m.push(s.getHours()), m.push(s.getMinutes()), g = !0)) : h = "24" === p[0] ? Number(p[0]) : h, g ? (u = u || m[0], 12 === h ? null == c && (u = (u + 11) % 12 + 1) : "PM" == c && (u = 12 + parseInt(u)), d = d || m[1]) : null == u && null == d && (u = "01", d = "00")
    },
    DefaultField = function(n, e, t, a, i) {
        this.buildHTML = function() {
            var e, t = "number" === n;
            return e = t ? (e = {
                type: n,
                name: "input",
                step: "any",
                "aria-label": i.name || "Number"
            }, /CriOS|FxiOS|Firefox/i.test(navigator.userAgent) && (e["data-component"] = "number", e["data-type"] = "input-number", e.type = "text", e.inputmode = "decimal"), isNaN(i.options[1]) || (e.minlength = i.options[1]), isNaN(i.options[2]) || (e.maxlength = i.options[2]), $("<input/>", e)) : $("<input/>", {
                type: n,
                name: "input",
                class: "translatable form-textbox",
                "aria-label": i.name || "Text"
            }), void 0 !== a && e.val(a), void 0 !== i.hint && e.attr("placeholder", i.hint), t && (e.data("step", i.options[0]), e.data("min", i.options[1]), e.data("max", i.options[2]), e.addClass("form-number-input form-textbox stepper"), e.attr("placeholder")) && e.addClass("translatable"), e
        }, this.getValue = function() {
            return $("input", t).val()
        }, this.getContainer = function() {
            return t
        }, this.validate = function() {
            var e = $("input", t)[0];
            return e.validity ? e.validity.valid : "function" != typeof e.checkValidity || e.checkValidity()
        }, this.clear = function() {
            $("input", t).val("")
        }
    },
    TextareaField = function(t, e, n, a) {
        this.buildHTML = function() {
            var e = $("<textarea>", {
                class: "form-textarea translatable",
                name: "textarea",
                "aria-label": a.name || "Textarea"
            });
            return void 0 !== a.hint && e.attr("placeholder", a.hint), e.on("mouseup", t.onCellResize), n && e.val(n), e
        }, this.getValue = function() {
            return $("textarea", e).val()
        }, this.getContainer = function() {
            return e
        }, this.clear = function() {
            $("textarea", e).val("")
        }
    },
    CheckboxRadioField = function(o, s, u, t, d, e) {
        var n = e.options;
        this.buildHTML = function() {
            var r, l, e;
            return 0 < n.length ? (r = [], d && (r = 0 < d.search(/\r\n|\r|\n/g) ? d.split(/\r\n|\r|\n/g) : [d]), l = $('<div class="form-single-column"/>').addClass(o + "-container"), $.each(n, function(e, t) {
                t = $.map(t.split(","), trim);
                $.each(t, function(e, t) {
                    var n, a = $("<div/>").addClass(o),
                        e = o + "_input_" + e + "_row" + s,
                        i = $("<label/>", {
                            for: e,
                            class: "translatable"
                        });
                    "radio" === o && (n = $("<input/>", {
                        type: o,
                        id: e,
                        class: "form-radio translatable"
                    }).val(t)), "checkbox" === o && (n = $("<input/>", {
                        type: o,
                        id: e,
                        class: "form-checkbox translatable"
                    }).val(t)), "radio" === o && n.attr("name", o + "_input_r_" + u.rowCount + "_row" + s), d && 0 < r.length && -1 < r.indexOf(t) && n.prop("checked", !0).attr("checked", "checked"), i.append(t), a.append(n).appendTo(l), a.append(i).appendTo(l), n.on("change", function() {
                        if ("radio" === $(this).attr("type")) {
                            for (var e = $(this).closest("div.radio-container").find('input[type="radio"]'), t = 0; t < e.length; t++) $(e[t]).closest("div").removeClass("selected");
                            $(this).closest("div").addClass("selected")
                        } else "checkbox" === $(this).attr("type") && $(this).closest("div").toggleClass("selected")
                    })
                })
            }), l) : ((e = $("<input/>", {
                type: o
            }).val(d)).on("click", function() {
                $(this).val($(this).is(":checked") ? "1" : "")
            }), 1 == d && e.attr("checked", "checked"), e)
        }, this.getValue = function() {
            var e;
            return 0 < n.length && "checkbox" === o ? (e = [], $("input[type=" + o + "]:checked", t).each(function() {
                e.push($(this).val())
            }), 0 < e.length ? e.join("\n") : "") : void 0 === (e = $("input[type=" + o + "]:checked", t).val()) ? "" : e
        }, this.getContainer = function() {
            return t
        }, this.clear = function() {
            $("input[type=" + o + "]", t).prop("checked", null)
        }
    },
    DropdownField = function(e, t, l, o) {
        this.buildHTML = function() {
            if (!(e = o.options).length) return "";
            var e = $.map(e[0].split(","), trim),
                t = o.name || "Form Dropdown",
                n = $('<select aria-label="' + t + '" class="form-dropdown"/>'),
                a = !1;
            void 0 !== o.hint && (-1 < e.indexOf(o.hint) ? a = "defaultvalue" : (a = $("<option/>", {
                value: ""
            }), (o.required ? a.text(o.hint).attr("disabled", "disabled").attr("selected", "selected").css("display", "none") : a.text(o.hint)).appendTo(n), a.addClass("translatable")));
            for (var i = 0; i < e.length; i++) {
                var r = $("<option/>", {
                    value: e[i]
                }).text(e[i]);
                r.addClass("translatable"), a && "defaultvalue" === a && e[i] === o.hint && l !== e[i] && r.attr("selected", "selected"), l && l == e[i] && (a && "defaultvalue" !== a && a.prop("selected", null), r.attr("selected", "selected")), r.addClass("translatable"), n.append(r)
            }
            return n
        }, this.getValue = function() {
            return $("select", t).val()
        }, this.getContainer = function() {
            return t
        }, this.clear = function() {
            setTimeout(function() {
                $("select", t).val(o.hint || "")
            }, 10)
        }
    },
    DateField = function(r, a, l, o, e, t) {
        var s, i, u, d, c, p, h, f, m, g, v, b = {},
            y = !1,
            w = e.options;
        this.buildHTML = function() {
            var n = "",
                e = (n += '<span class="dateDropdowns">', x()),
                e = (!w[2] || "default" !== w[2] && "today" !== w[2] || (y = !0), $.each(e, function(e, t) {
                    n = "year" == t ? y || o ? (n += "<div class='yearBox date-fields'>") + buildRangeDropdown("y", f, m, s.year) + "</div>" : (n += "<div class='yearBox date-fields'>") + buildRangeDropdown("y", f, m) + "</div>" : "month" == t ? y || o ? (n += "<div class='monthBox date-fields '>") + buildRangeDropdown("m", 1, 12, s.month, D()) + "</div>" : (n += "<div class='monthBox date-fields '>") + buildRangeDropdown("m", 1, 12, "", D()) + "</div>" : y || o ? (n += "<div class='dayBox date-fields '>") + buildRangeDropdown("d", 1, 31, s.day) + "</div>" : (n += "<div class='dayBox date-fields '>") + buildRangeDropdown("d", 1, 31) + "</div>"
                }), t ? "assets/calendar-2.png" : "assets/calendar.png"),
                n = JFCustomWidget.isFromCardform() ? n + "</span><img src=" + e + ' alt="calendar" class="calendarIcon translatable" id="calendarIcon-' + r + ' " title="Show/hide calendar" />' : n + "<img src=" + e + ' alt="calendar" class="calendarIcon translatable" id="calendarIcon-' + r + ' " title="Show/hide calendar" /></span>',
                e = (n += '<div class="calendarContainer" id="calendar' + r + '" style="display:none;"></div>', $("<div>", {
                    class: "dateContainer",
                    id: "dateContainer" + r
                }).html(n));
            $.datepicker.setDefaults($.datepicker.regional.en), $(".calendarContainer", e).datepicker({
                inline: !0,
                firstDay: 1,
                dateFormat: "yy-mm-dd",
                onSelect: k
            }), $(e).on("change", "select", A.bind(null, r)), $(e).on("click", ".calendarIcon", F);
            return b["row_" + r] = {
                year: "",
                month: ""
            }, e
        }, this.getValue = function() {
            var e = $(".y", l).val(),
                t = $(".m", l).val(),
                n = $(".d", l).val();
            return !!(e && t && n) && i.replace("y", e).replace("m", t).replace("d", n)
        }, this.getContainer = function() {
            return l
        };
        C = !!$("th" + (".col" + r) + " span:first-child").hasClass("required"), this.validate = function() {
            var e = $(".y", l).val(),
                t = $(".m", l).val(),
                n = $(".dayBox", l),
                a = $(".d", l).val(),
                i = new Date(e, t, 0).getDate();
            return 2 !== u[0].search("/") && (h = i), e === b["row_" + r].year && t === b["row_" + r].month || (b["row_" + r].year = e, b["row_" + r].month = t, y || o ? f == m && d[0] == c[0] ? n.html(buildRangeDropdown("d", p, h, s.day)) : e == f && t == parseInt(d[0]) ? n.html(buildRangeDropdown("d", p, i, s.day)) : e == m && t == parseInt(c[0]) ? n.html(buildRangeDropdown("d", 1, h, s.day)) : n.html(buildRangeDropdown("d", 1, i, s.day)) : f == m && d[0] == c[0] ? n.html(buildRangeDropdown("d", p, h)) : e == f && t == parseInt(d[0]) ? n.html(buildRangeDropdown("d", p, i)) : e == m && t == parseInt(c[0]) ? n.html(buildRangeDropdown("d", 1, h)) : n.html(buildRangeDropdown("d", 1, i)), "" != a && a <= i && n.children().val(a)), !C || !(e < f || m < e)
        }, this.clear = function() {
            $("select", l).each(function(e, t) {
                $(t).val($("option:first", $(t)).val())
            })
        };
        var C, e = function(e) {
                return 1 == (e.match(/y/g) || []).length && 1 == (e.match(/m/g) || []).length && 1 == (e.match(/d/g) || []).length && !e.match(/[<>&0-9]+/)
            },
            n = function(a) {
                var i, e;
                return a ? (i = {}, e = x(), $.each(e, function(e, t) {
                    var n = "year" == t || "y" == t ? /\d\d\d\d/ : /\d\d/;
                    i[t] = a.match(n)[0], a = a.replace(n, "")
                }), i) : {
                    year: (e = new Date).getFullYear(),
                    month: e.getMonth() + 1,
                    day: e.getDate()
                }
            },
            x = function() {
                return $.map(i.match(/y|m|d/g), function(e) {
                    return e.replace("y", "year").replace("m", "month").replace("d", "day")
                })
            },
            D = function() {
                return {
                    "01": "January",
                    "02": "February",
                    "03": "March",
                    "04": "April",
                    "05": "May",
                    "06": "June",
                    "07": "July",
                    "08": "August",
                    "09": "September",
                    10: "October",
                    11: "November",
                    12: "December"
                }
            },
            F = function(e) {
                "block" == (v = $(".calendarContainer", e.target.parentNode.parentNode)).css("display") ? v.hide() : v.show(), JFCustomWidget.isFromCardform() && (g = g || v.closest(".configurable-list-field-wrapper").height(), e = v.height(), "block" == v.css("display") ? v.closest(".configurable-list-field-wrapper").css("height", g + e) : v.closest(".configurable-list-field-wrapper").css("height", g - e)), a.onCellResize()
            },
            k = function(e, t) {
                var e = e.split("-"),
                    n = "#dateContainer" + t.id.replace("calendar", "");
                $(n + " .y").val(e[0]), $(n + " .m").val(e[1]), $(n + " .d").val(e[2]), JFCustomWidget.isFromCardform() && v.closest(".configurable-list-field-wrapper").css("height", g), $("#" + t.id).hide(), a.onCellResize()
            },
            A = function(e) {
                var t = "",
                    t = (t = (t += $("#dateContainer" + e + " .y").val()) + ("-" + $("#dateContainer" + e + " .m").val())) + ("-" + $("#dateContainer" + e + " .d").val());
                $("#calendar" + e).datepicker("setDate", t).hide()
            },
            T = function(e) {
                return parseInt(e) == e
            };
        w[0] && w[0].match(/y|m|d/) ? (i = w[0], u = w[1] || "") : (u = w[0] || "", i = w[1] || ""), (i = i.toLowerCase()) && e(i) || (i = "y-m-d"), s = n(o), u = u.split("-"), h = u[0].split("/").length - 1 == 2 ? (d = u[0].split("/"), c = u[1].split("/"), f = d[2], m = c[2], p = (0 == (p = d[1].split(""))[0] ? p : d)[1], c[1]) : (f = u && T(u[0]) ? u[0] : s.year - 10, m = u && T(u[1]) ? u[1] : s.year + 1, d = [1, 1], c = [12, 12], p = 1, 31)
    },
    TimeField = function(e, t, i, n) {
        var n = n.options,
            r = 12,
            l = [],
            o = !1;
        if (n && -1 < n[0].indexOf(",")) {
            var a = n[0].split(","),
                s = a[1].toLowerCase().trim(),
                a = a[0].trim(),
                r = "24" === a ? Number(a) : r;
            if ("now" === s) {
                a = new Date;
                l.push(a.getHours()), l.push(a.getMinutes()), o = !0
            } else if (-1 < s.search(/\(([^)]+)\)/g)) {
                a = s.replace(/\((.+?)\)/g, function(e, t, n) {
                    return decodeURIComponent(t)
                });
                if (-1 < a.indexOf(":")) {
                    for (var u = a.split(":"), d = 0; d < u.length; d++) l.push(parseInt(u[d]));
                    o = !0
                }
            }
        } else r = "24" === n[0] ? Number(n[0]) : r;
        this.buildHTML = function() {
            var e = "",
                t = i ? i.substring(0, 2) : null,
                n = i ? i.substring(3, 5) : null,
                a = i ? i.substring(6, 8) : null;
            return o && (t = t || l[0], 12 === r ? null == a && (t = (t + 11) % 12 + 1) : "PM" == a && (t = 12 + parseInt(t)), n = n || l[1]), e += '<span class="timeContainer">', 24 == r && (e += buildRangeDropdown("h", 0, r - 1, t) + '<span class="colons">:</span>' + buildRangeDropdown("m", 0, 59, n)), 12 == r && (e += buildRangeDropdown("h", 1, r, t) + '<span class="colons">:</span>' + buildRangeDropdown("m", 0, 59, n), a = i ? i.substring(6, 8) : null, e = (e = (e += '&nbsp;<select aria-label="Time Periods" class="ampm form-dropdown date-fields ">') + '<option value="" hidden></option><option value="AM"' + ("AM" == (a = o ? a || (12 <= l[0] ? "PM" : "AM") : a) ? ' selected="selected"' : "") + ">AM</option>") + '<option value="PM"' + ("PM" == a ? ' selected="selected"' : "") + ">PM</option></select>"), e += "</span>"
        }, this.getValue = function() {
            var e = $(".h", t).val() && $(".m", t).val() ? $(".h", t).val() + ":" + $(".m", t).val() : "";
            return e && 12 == r && $(".ampm", t).val() ? e += " " + $(".ampm", t).val() : 12 != r || $(".ampm", t).val() || (e = ""), e
        }, this.getContainer = function() {
            return t
        }, this.clear = function() {
            $("select", t).each(function(e, t) {
                $(t).val($("option:first", $(t)).val())
            })
        }
    },
    StaticField = function(e, t, n, a) {
        this.buildHTML = function() {
            var e = a.options;
            return '<span class="staticText translatable">' + (e.length ? e[0].trim() : "") + "</span>"
        }, this.getValue = function() {
            return $("span.staticText").html()
        }, this.getContainer = function() {
            return t
        }
    },
    buildRangeDropdown = function(e, t, n, a, i) {
        var r = '<select aria-label="Date Range" class="form-dropdown date-fields ' + e + '">';
        r += '<option value="" hidden></option>';
        for (var l = t; l <= n; l++) var o = 10 <= l ? l : "0" + l,
            r = (r += '<option class="translatable" value="' + o + '"' + (o == a ? ' selected="selected"' : "") + ">") + (i && i[o] ? i[o] : o) + "</option>";
        return r += "</select>"
    };

function trim(e) {
    return e.replace(/^[\t ]+/g, "").replace(/[\t ]+$/g, "")
}

function decodeEntities(e) {
    var t = document.createElement("textarea");
    return t.innerHTML = e, t.value
}
window.addEventListener("load", function() {
        var S = !1;

        function n(t, u, n) {
            var a = 0,
                i = 0,
                d = [],
                o = {},
                c = [],
                r = 0,
                p = {},
                h = parseInt(n.minRowsNumber) || 0,
                f = parseInt(n.limit) || 0,
                s = n.disableRequire || !1,
                m = !1,
                g = !1,
                v = [],
                e = !1,
                b = JFCustomWidget.isFromCardform(),
                y = "upcoming" == document.querySelector("body").dataset.theme || b,
                w = "Yes" === n.isTableView || !y,
                C = !1;

            function l() {
                var e = n.labelAdd && "<empty>" != n.labelAdd ? n.labelAdd : "Add Row",
                    t = "";
                return t + ('<div id="list" style="display:none;"  class="' + [m ? "vertical" : "horizontal", "configurable-list-wrapper", w ? "no-wrap" : ""].join(" ") + '">') + "</div>" + '<button data-type="add-row" aria-label="Add Row" class="add">' + '<span class="add-icon">' + e + "</span>" + ('<span class="add-text">' + e + "</span>") + "</button>"
            }

            function x() {
                return '<span class="required" title="required field">*</span>'
            }

            function D() {
                return '<span class="configurable-list-field-label hidden-label">x</span><button class="remove"><span class="remove-icon">' + (n.labelRemove && "<empty>" != n.labelRemove ? n.labelRemove : "remove") + "</span></button>"
            }

            function F(r, l) {
                var o, e, s, t;
                r && r.preventDefault(), R() || (o = [], e = $('<div class="configurable-list-field-row-wrapper">'), s = $('<div class="configurable-list-field-row">'), e.append(s), m ? ($td = $("<div/>"), $ul = $("<ul/>"), $.each(d, function(e, t) {
                    var n = null,
                        a = (l && (a = Object.keys(l)[e], n = l[a]), $("<li/>").addClass("rows row" + (e + 1))),
                        i = $("<div/>").addClass("names name-row" + (e + 1)).html(t.name + (t.required ? " " + x() : "")),
                        e = $("<div/>").addClass("fields field-row" + (e + 1)),
                        t = T(e, t, n);
                    e.html(t.buildHTML()), a.append(i).append(e), $ul.append(a), o.push(t)
                }), $ul.append('<li class="col' + (d.length + 1) + ' buttonsColumn">' + D() + "</li>"), $ul.append('<li class="line-separator buttonsColumn"><div class="line"></div></li>'), $td.append($ul), s.append($td)) : ($.each(d, function(e, t) {
                    var n = null,
                        e = (l && (n = l[t.uniqName]), $('<div class="configurable-list-field-wrapper col' + (e + 1) + " " + t.type + '-field-selector ">')),
                        n = T(e, t, n),
                        a = 1 < Number(JFCustomWidget.getWidgetSettings().minRowsNumber),
                        a = (r && ("add-row" === r.target.parentNode.dataset.type || "add-row" === r.target.dataset.type) || a) && 0 < $("#list .configurable-list-field-wrapper").length,
                        i = "",
                        i = w ? $('<span class="configurable-list-field-label ' + (a ? "hide-label" : "show-label") + ' translatable">' + t.name + "</span>") : $('<span class="configurable-list-field-label show-label translatable">' + t.name + "</span>");
                    e.append(i), t.required && i.append(x()), e.append(n.buildHTML()), s.append(e), o.push(n)
                }), s.append('<div class="btn-remove-hidden col' + (d.length + 1) + '">' + D() + "</div>"), e.append('<div class="col' + (d.length + 1) + ' buttonsColumn">' + D() + "</div>")), $("#list").append(e).show(), t = k(), y && (w && setTimeout(() => {
                    var n;
                    I(), n = t, $(".configurable-list-field-row-wrapper .configurable-list-field-label").each(function(e, t) {
                        $(t).css({
                            height: n
                        })
                    })
                }, 500), b || (C && A(), $(".btn-remove-hidden:first").css({
                    "padding-top": t
                }))), c.push(o), p.rowCount = c.length, m ? $(".buttonsColumn, .btn-remove-hidden").show() : $(".buttonsColumn, .btn-remove-hidden").visible(), R() && $("button.add").hide(), g && Placeholders.enable(), v.length && $("input.stepper", s).each(function(e, t) {
                    var n;
                    void 0 === $(t).data("stepper-set") && ($(t).stepper({
                        type: "float",
                        wheelStep: $(t).data("step"),
                        arrowStep: $(t).data("step"),
                        limit: [$(t).data("min"), $(t).data("max")]
                    }).data("stepper-set", !0), JFCustomWidgetUtils.getIE() <= 9) && "undefined" != typeof Placeholders && (n = function(e) {
                        e = e.find("input");
                        isNaN(e.val()) && e.hasClass("placeholdersjs") && e.val(0).removeClass("placeholdersjs")
                    }, $(t).parents(".stepper-wrap").on("DOMMouseScroll mousewheel", function() {
                        n($(this))
                    }), $(t).siblings(".stepper-btn-wrap").find("a").on("click", function() {
                        n($(this).parents(".stepper-wrap"))
                    }))
                }), $("#listContainer").height("auto"), I())
            }

            function k() {
                var n = 0;
                return $(".configurable-list-field-row-wrapper .configurable-list-field-label").each(function(e, t) {
                    n = t.offsetHeight > n ? t.offsetHeight : n
                }), n
            }

            function A() {
                var t, e = document.querySelectorAll(".configurable-list-field-label.show-label");
                t = e, new Promise(function(e) {
                    var n = {};
                    t.forEach(function(e) {
                        var t = e.getBoundingClientRect();
                        n[t.top] || (n[t.top] = []), n[t.top].push(e)
                    }), e(n)
                }).then(function(e) {
                    var t, n, a, i, r = e;
                    for (t in r) r.hasOwnProperty(t) && (n = r[t].map(function(e) {
                        return {
                            label: e,
                            text: $(e).text()
                        }
                    }), a = n.sort(function(e, t) {
                        return t.text.length - e.text.length
                    })[0], i = a.label.getBoundingClientRect(), n.filter(function(e) {
                        return e.text != a.text
                    }).forEach(function(e, t) {
                        var n = e.label.getBoundingClientRect(),
                            n = i.bottom - n.bottom;
                        "0px" == $(e.label).css("padding-top") && $(e.label).css({
                            "padding-top": n
                        })
                    }))
                })
            }

            function T(e, t, n) {
                r += 1;
                var a = {
                    dateInput: DateInputField.bind(null, r),
                    timeInput: TimeInputField,
                    text: DefaultField.bind(null, "text"),
                    textbox: DefaultField.bind(null, "text"),
                    number: DefaultField.bind(null, "number"),
                    textarea: TextareaField,
                    radio: CheckboxRadioField.bind(null, "radio", r),
                    checkbox: CheckboxRadioField.bind(null, "checkbox", r),
                    dropdown: DropdownField,
                    select: DropdownField,
                    date: DateField.bind(null, r),
                    time: TimeField,
                    static: StaticField
                };
                return new a[0 <= Object.keys(a).indexOf(t.type) ? t.type : "text"](p, e, n, t, y)
            }

            function M() {
                var i = {
                        valid: !0,
                        value: []
                    },
                    r = !1,
                    a = !1,
                    l = [],
                    n = ($.each($(".stepper"), function(e, t) {
                        var n = !1;
                        "" != $(t).attr("minlength") && "" != $(t).val() && (+$(t).val() < +$(t).attr("minlength") ? ($(t).addClass("error"), n = a = !0) : $(t).removeClass("error")), n || "" != $(t).attr("maxlength") && (+$(t).val() > +$(t).attr("maxlength") ? ($(t).addClass("error"), n = a = !0) : $(t).removeClass("error")), n && l.push([$(t).attr("minlength"), $(t).attr("maxlength")])
                    }), "");
                if ($.each(l, function(e, t) {
                        t[0] && t[1] ? n += e + 1 + ". Value should be between " + t[0] + " and " + t[1] + ".\n" : t[1] ? n += e + 1 + ". Value should be less or equal " + t[1] + ".\n" : t[0] && (n += e + 1 + ". Value should be greater or equal " + t[0] + ".\n")
                    }), a) return JFCustomWidget.showWidgetError(n), !1;
                JFCustomWidget.hideWidgetError();
                var o = !0,
                    s = "R7pX9QcY2K",
                    e = new RegExp(s, "g");
                return $.each(c, function(e, t) {
                    var n, a = {};
                    if ($.each(t, function(e, t) {
                            "function" != typeof t.validate || t.validate() || (o = !1, i.valid = !1);
                            var n = d[e].name,
                                n = W(isNaN(n) ? n : n + s, a),
                                t = t.getValue() ? t.getValue() : "";
                            "static" === d[e].type && (t = d[e].options[0]), a[n] = t, d[e].required && !t && (a[n] = "", o = !1, r = !(i.valid = !1))
                        }), !o) return !1;
                    0 < Object.keys(a).length && (n = !0, $.each(a, function(e, t) {
                        if ("" !== t && null !== t) return n = !1
                    }), n) || i.value.push(a)
                }), (i.value.length < h || 0 < f && i.value.length > f) && (i.valid = !1), JFCustomWidget.isWidgetRequired() || 0 !== c.length || (i.valid = !0, JFCustomWidget.makeWidgetNotRequired()), i.value = 0 < i.value.length ? JSON.stringify(i.value).replace(e, "") : "", (u.required || r) && !1 === i.valid && (i.value = ""), i
            }

            function R() {
                return 0 < f && c.length >= f
            }

            function E() {
                if (!JFCustomWidget.isWidgetRequired()) {
                    for (cfg in d)
                        if ("required" in d[cfg] && d[cfg].required) {
                            JFCustomWidget.makeWidgetRequired(), e = !0;
                            break
                        } 0 === c.length && e && (JFCustomWidget.makeWidgetNotRequired(), e = !1)
                }
            }

            function W(e, t) {
                for (var n = 1, a = e; void 0 !== t[a];) a = "unique:" + (n += 1) + "[" + e + "]";
                return a
            }

            function N(e) {
                e = $(e.target);
                e.val() ? e.parentsUntil(".configurable-list-field-row").removeClass("error") : e.hasClass("ui-state-default") && $(".dateContainer").parentsUntil(".configurable-list-field-row").removeClass("error"), setTimeout(function() {
                    var i, r, e;
                    JFCustomWidget.sendData((i = {
                        valid: !0,
                        value: []
                    }, r = "R7pX9QcY2K", e = new RegExp(r, "g"), $.each(c, function(e, t) {
                        var n, a = {};
                        $.each(t, function(e, t) {
                            var n = d[e].name,
                                t = (console.log(n, "key"), n = W(isNaN(n) ? n : n + r, a), console.log(n, "key2"), t.getValue() ? t.getValue() : "");
                            "static" === d[e].type && (t = d[e].options[0]), a[n] = t
                        }), 0 < Object.keys(a).length && (n = !0, $.each(a, function(e, t) {
                            if ("" !== t && null !== t) return n = !1
                        }), n) || i.value.push(a)
                    }), i.value = 0 < i.value.length ? JSON.stringify(i.value).replace(e, "") : "", i))
                }, 10)
            }

            function I() {
                var e = $("#list").width(),
                    t = $("body").height();
                if ((!JFCustomWidget.isFromCardform() && u.width + 55 < e || 0 === e) && (0 === e && (t = u.height), e = u.width, $("#listContainer").css({
                        "overflow-x": "auto"
                    })), e == a && t == i) return !1;
                JFCustomWidget.requestFrameResize({
                    width: e,
                    height: t + 20
                }), a = e, i = t
            }
            this.init = function() {
                u.value && (u.value = decodeEntities(decodeEntities(u.value)));
                if (d = function(e) {
                        e = decodeEntities(e);
                        var n = [];
                        return "" !== e && null != e && (e = e.split("\n"), $.each(e, function(e, t) {
                            t = function(e) {
                                if ("" === (e = trim(e)) || "*" == e) return !1;
                                var t = !1;
                                "*" == e.charAt(0) && (t = !s, e = trim(e.substring(1)));
                                if (!e.match(":")) return i = W(e, o), o[i] = i, {
                                    name: e,
                                    uniqName: i,
                                    type: "text",
                                    required: t
                                };
                                var n = $.map(e.split(":"), trim),
                                    a = n[0],
                                    i = W(a, o),
                                    n = (o[i] = i, n[1]);
                                "time" === n && (e = e.replace(/\((.+?)\)/gi, function(e, t, n) {
                                    return encodeURIComponent(e)
                                }));
                                e = $.map(e.split(":"), trim);
                                var r = !1,
                                    l = [];
                                switch (n) {
                                    case "textarea":
                                    case "text":
                                    case "textbox":
                                        2 < e.length && (r = e[e.length - 1]), l = e.slice(3);
                                        break;
                                    case "number":
                                        4 === e.length ? (l = $.map(e[e.length - 1].split(","), function(e) {
                                            return Number(e.trim())
                                        }), r = e[2]) : 3 === e.length && (r = e[e.length - 1]);
                                        break;
                                    case "dropdown":
                                        l = 3 < e.length ? (r = e[e.length - 1], [e[e.length - 2]]) : e.slice(2);
                                        break;
                                    default:
                                        l = e.slice(2)
                                }
                                a = {
                                    name: a,
                                    uniqName: i,
                                    type: n,
                                    options: l,
                                    required: t
                                };
                                r && (a.hint = r, g = !0);
                                "number" === a.type && v.push(a);
                                return a
                            }(t);
                            t && n.push(t)
                        })), n
                    }(n.fields), $("#" + t).attr("data-widget", "533946093c1ad0c45d000070").html(l), $("#list").on("click", "button.remove", function(e) {
                        e && e.preventDefault();
                        var t = (e = $(e.target).parentsUntil("#list").last()).prevAll().length;
                        c.splice(t, 1), e.remove(), 0 === t && w && $(".configurable-list-field-row-wrapper:first-child .configurable-list-field-label").removeClass("hide-label").addClass("show-label"), c.length ? c.length <= h && (m ? $(".buttonsColumn, .btn-remove-hidden").hide() : $(".buttonsColumn, .btn-remove-hidden").invisible()) : $("#list").hide(), p.rowCount = c.length, $("button.add").show(), y && !b && $(".btn-remove-hidden:first").css({
                            "padding-top": k()
                        }), $("#listContainer").height("auto"), I(), JFCustomWidget.sendData(M()), E()
                    }), $("#list").on("keyup", "input.form-number-input", function(e) {
                        "" !== this.value && !/^-?(\d+[\.]?)+$|([\.]\d+)+$/.test(this.value) || e.keyCode
                    }), $("#list").on("keypress", "input.form-number-input", function(e) {
                        var t;
                        !e.metaKey && !e.ctrlKey && (t = [8, 9, 13, 35, 36, 37, 39].join(",").match(new RegExp(e.which)), !(!e.which || 48 <= e.which && e.which <= 57 || 46 == e.which || 45 == e.which || 43 == e.which || t) || 8 != e.which && 0 != e.which && 13 != e.which && (parseInt($(this).val().length) >= parseInt($(this).attr("maxlength")) || e.which < 45 || 57 < e.which)) && e.preventDefault()
                    }), $("#list").on("change", "input, select, textarea", N), $("#list").on("keyup", "input, textarea", N), $("#list").on("click", "input[type=checkbox], input[type=radio], a.stepper-btn-up, a.stepper-btn-dwn", N), $("#list").on("mousewheel DOMMouseScroll", "input[type=number]", N), $("#list").on("mouseup", "a.ui-state-default", N), $("button.add").on("click", function(e) {
                        F(e), JFCustomWidget.sendData(M());
                        JFWidgetTranslation.getDictionary();
                        JFWidgetTranslation.translate(), E()
                    }), 0 < h && !u.value) {
                    for (var e = 0; e < h; e++) F();
                    m ? $(".buttonsColumn, .btn-remove-hidden").hide() : $(".buttonsColumn, .btn-remove-hidden").invisible(), I()
                }
                0 < f && (f = Math.max(h, f));
                R() && ($("button.add").hide(), I());
                (function(e) {
                    try {
                        e = JSON.parse(e)
                    } catch (e) {
                        return
                    }
                    e && $.each(e, function(e, t) {
                        F(null, t)
                    })
                })(u.value), u.value && (function() {
                    var e = $("input:checked");
                    if (0 < e.length)
                        for (var t = 0; t < e.length; t++) $(e[t]).closest("div").addClass("selected")
                }(), JFCustomWidget.sendData(M()));
                $(window).on("resize", I), E(), S = !0, JFWidgetTranslation.translate()
            }, this.getData = M, this.resetFields = function() {
                $.each(d, function(e, t) {
                    T($(".col" + (e + 1)), t).clear()
                })
            }, this.resizeIframe = I, this.alignLabelsByRow = A, this.setCssLoaded = function(e) {
                C = e
            }, this.isNewDefaultTheme = y, this.isCardForm = b, this.checkHeightChange = function() {
                let e = 0,
                    t = $("body").height();
                const n = setInterval(function() {
                    4 === e ? clearInterval(n) : (t < document.body.offsetHeight && (JFCustomWidget.requestFrameResize({
                        height: document.body.offsetHeight + 20
                    }), clearInterval(n)), e++)
                }, 300)
            }, p.rowCount = 0, p.onCellResize = function() {
                I()
            }, $("#listContainer").css("overflow-x", "auto")
        }
        JFCustomWidget.subscribe("ready", function(e) {
            var t = new n("listContainer", e, JFCustomWidget.getWidgetSettings());
            (!t.isNewDefaultTheme || t.isCardForm || -1 < window.location.href.indexOf("offline_forms=true")) && (t.init(), t.checkHeightChange()), JFCustomWidget.subscribe("loadNewDefaultThemeCss", function() {
                t.init(), t.setCssLoaded(!0), t.resizeIframe(), setTimeout(function() {
                    t.alignLabelsByRow()
                }), t.checkHeightChange()
            }), JFCustomWidget.subscribe("submit", function() {
                Placeholders.disable(), JFCustomWidget.sendSubmit(t.getData())
            }), JFCustomWidget.subscribe("customfont show clear", function() {
                t.resizeIframe()
            }), JFCustomWidget.subscribe("clear", function() {
                t.resetFields()
            })
        }), JFCustomWidget.subscribe("translatable", function(e) {
            function t() {
                var e = JFWidgetTranslation.getTranslatables();
                JFCustomWidget.sendTranslatables(e)
            }
            var n, a;
            S ? t() : (n = 1, a = setInterval(function() {
                n += 1, (S || 10 < n) && (t(), clearInterval(a))
            }, 500))
        }), JFCustomWidget.subscribe("translate", function(e) {
            function t() {
                var t = e.to;
                document.querySelectorAll(".dateContainer").forEach(function(e) {
                    "fr-FR" === t && (t = "fr"), $.datepicker.setDefaults($.datepicker.regional[t]), $(".calendarContainer").datepicker("refresh")
                }), JFWidgetTranslation.translate(e)
            }
            var n, a;
            S ? t() : (n = 1, a = setInterval(function() {
                n += 1, (S || 10 < n) && (t(), clearInterval(a))
            }, 500))
        })
    }),
    function(e) {
        "use strict";
        e.Placeholders = {
            Utils: {
                addEventListener: function(e, t, n) {
                    return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : void 0
                },
                inArray: function(e, t) {
                    for (var n = 0, a = e.length; n < a; n++)
                        if (e[n] === t) return !0;
                    return !1
                },
                moveCaret: function(e, t) {
                    var n;
                    e.createTextRange ? ((n = e.createTextRange()).move("character", t), n.select()) : e.selectionStart && (e.focus(), e.setSelectionRange(t, t))
                },
                changeType: function(e, t) {
                    try {
                        return e.type = t, !0
                    } catch (e) {
                        return !1
                    }
                }
            }
        }
    }(this),
    function(e) {
        "use strict";

        function t() {}

        function o() {
            try {
                return document.activeElement
            } catch (e) {}
        }

        function s(e, t) {
            var t = !!t && e.value !== t,
                n = e.value === e.getAttribute(x);
            return (t || n) && "true" === e.getAttribute(D) && (e.removeAttribute(D), e.value = e.value.replace(e.getAttribute(x), ""), e.className = e.className.replace(C, ""), t = e.getAttribute(T), 0 <= parseInt(t, 10) && (e.setAttribute("maxLength", t), e.removeAttribute(T)), (n = e.getAttribute(F)) && (e.type = n), !0)
        }

        function u(e) {
            var t = e.getAttribute(x);
            return !("" !== e.value || !t || (e.setAttribute(D, "true"), e.value = t, e.className += " " + w, e.getAttribute(T) || (e.setAttribute(T, e.maxLength), e.removeAttribute("maxLength")), e.getAttribute(F) ? e.type = "text" : "password" === e.type && N.changeType(e, "text") && e.setAttribute(F, "password"), 0))
        }

        function n(e, t) {
            var n, a, i, r, l;
            if (e && e.getAttribute(x)) t(e);
            else
                for (a = e ? e.getElementsByTagName("input") : c, i = e ? e.getElementsByTagName("textarea") : p, l = 0, r = (n = a ? a.length : 0) + (i ? i.length : 0); l < r; l++) t(l < n ? a[l] : i[l - n])
        }

        function d(e) {
            n(e, s)
        }

        function a(e) {
            var t, n, a, i, r, l;
            e.form && !(g = "string" == typeof(g = e.form) ? document.getElementById(g) : g).getAttribute(k) && (N.addEventListener(g, "submit", (l = g, function() {
                d(l)
            })), g.setAttribute(k, "true")), N.addEventListener(e, "focus", (r = e, function() {
                h && r.value === r.getAttribute(x) && "true" === r.getAttribute(D) ? N.moveCaret(r, 0) : s(r)
            })), N.addEventListener(e, "blur", (i = e, function() {
                u(i)
            })), h && (N.addEventListener(e, "keydown", (a = e, function(e) {
                return f = a.value, "true" === a.getAttribute(D) && f === a.getAttribute(x) && N.inArray(y, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0
            })), N.addEventListener(e, "keyup", (n = e, function() {
                s(n, f), "" === n.value && (n.blur(), N.moveCaret(n, 0))
            })), N.addEventListener(e, "click", (t = e, function() {
                t === o() && t.value === t.getAttribute(x) && "true" === t.getAttribute(D) && N.moveCaret(t, 0)
            }))), e.setAttribute(A, "true"), e.setAttribute(x, m), !h && e === o() || u(e)
        }
        var c, p, h, i, f, m, r, g, l, v, b, $ = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
            y = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
            w = "placeholdersjs",
            C = RegExp("(?:^|\\s)" + w + "(?!\\S)"),
            x = "data-placeholder-value",
            D = "data-placeholder-active",
            F = "data-placeholder-type",
            k = "data-placeholder-submit",
            A = "data-placeholder-bound",
            T = "data-placeholder-maxlength",
            M = document.createElement("input"),
            R = document.getElementsByTagName("head")[0],
            E = document.documentElement,
            W = e.Placeholders,
            N = W.Utils;
        if (W.nativeSupport = void 0 !== M.placeholder, !W.nativeSupport) {
            for (c = document.getElementsByTagName("input"), p = document.getElementsByTagName("textarea"), h = "false" === E.getAttribute("data-placeholder-focus"), i = "false" !== E.getAttribute("data-placeholder-live"), (M = document.createElement("style")).type = "text/css", E = document.createTextNode("." + w + " { color:#ccc; }"), M.styleSheet ? M.styleSheet.cssText = E.nodeValue : M.appendChild(E), R.insertBefore(M, R.firstChild), b = 0, v = c.length + p.length; b < v; b++) l = c.length > b ? c[b] : p[b - c.length], (m = l.attributes.placeholder) && (m = m.nodeValue) && N.inArray($, l.type) && a(l);
            r = setInterval(function() {
                for (b = 0, v = c.length + p.length; b < v; b++) l = c.length > b ? c[b] : p[b - c.length], (m = l.attributes.placeholder) ? (m = m.nodeValue) && N.inArray($, l.type) && (l.getAttribute(A) || a(l), m !== l.getAttribute(x) || "password" === l.type && !l.getAttribute(F)) && ("password" === l.type && !l.getAttribute(F) && N.changeType(l, "text") && l.setAttribute(F, "password"), l.value === l.getAttribute(x) && (l.value = m), l.setAttribute(x, m)) : l.getAttribute(D) && (s(l), l.removeAttribute(x));
                i || clearInterval(r)
            }, 100)
        }
        N.addEventListener(e, "beforeunload", function() {
            W.disable()
        }), W.disable = W.nativeSupport ? t : d, W.enable = W.nativeSupport ? t : function(e) {
            n(e, u)
        }
    }(this),
    function(p) {
        p.fn.stepper = function(d) {
            var c = {
                type: "float",
                floatPrecission: 2,
                ui: !0,
                allowWheel: !0,
                allowArrows: !0,
                arrowStep: 1,
                wheelStep: 1,
                limit: [null, null],
                preventWheelAcceleration: !0,
                incrementButton: "",
                decrementButton: "",
                onStep: null,
                onWheel: null,
                onArrow: null,
                onButton: null,
                onKeyUp: null
            };
            return p(this).each(function() {
                var e, t, n, a = p(this).data(),
                    i = (delete a.stepper, p.extend({}, c, d, a)),
                    r = p(this),
                    a = p('<div class="stepper-wrap"/>');

                function l(e) {
                    r.val() || r.val(0);
                    var t = s(("int" == i.type ? parseInt : parseFloat)(r.val()) + e);
                    return r.val(t), o("Step", [t, 0 < e]), t
                }

                function o(e, t) {
                    e = i["on" + e];
                    "function" == typeof e && e.apply(r, t)
                }

                function s(e) {
                    var t = i.limit[0],
                        n = i.limit[1];
                    return null !== t && e < t ? e = t : null !== n && n < e && (e = n), u(e)
                }

                function u(e, t) {
                    void 0 === t && (t = i.floatPrecission);
                    t = Math.pow(10, t);
                    return e = Math.round(e * t) / t
                }
                r.data("stepper") || (a.insertAfter(r), r.appendTo(a), r.stepper = {
                    limit: s,
                    decimalRound: u,
                    onStep: function(e) {
                        i.onStep = e
                    },
                    onWheel: function(e) {
                        i.onWheel = e
                    },
                    onArrow: function(e) {
                        i.onArrow = e
                    },
                    onButton: function(e) {
                        i.onButton = e
                    },
                    onKeyUp: function(e) {
                        i.onKeyUp = e
                    }
                }, r.data("stepper", r.stepper), i.ui && (e = p('<div class="stepper-btn-wrap"/>').appendTo(a), t = p('<a class="stepper-btn-up">' + i.incrementButton + "</a>").appendTo(e), n = p('<a class="stepper-btn-dwn">' + i.decrementButton + "</a>").appendTo(e), a.css({
                    "margin-top": r.css("margin-top"),
                    "margin-left": r.css("margin-left"),
                    "margin-bottom": r.css("margin-bottom"),
                    "margin-right": e.outerWidth() + parseInt(r.css("margin-right"))
                }), r.css("margin", 0), t.on("mousedown", function(e) {
                    e.preventDefault(), o("Button", [l(i.arrowStep), !0])
                }), n.on("mousedown", function(e) {
                    e.preventDefault(), o("Button", [l(-i.arrowStep), !1])
                }), p(document).on("mouseup", function() {
                    clearInterval(void 0)
                })), i.allowWheel && a.on("DOMMouseScroll mousewheel", function(e) {
                    e.preventDefault();
                    var t, e = e.originalEvent;
                    e.wheelDelta ? t = e.wheelDelta / 120 : e.detail && (t = -e.detail / 3);
                    t && (i.preventWheelAcceleration && (t = t < 0 ? -1 : 1), o("Wheel", [l(i.wheelStep * t), 0 < t]))
                }), a.on({
                    keydown: function(e) {
                        var t = e.which,
                            n = r.val();
                        if (i.allowArrows) switch (t) {
                            case 38:
                                o("Arrow", [n = l(i.arrowStep), !0]);
                                break;
                            case 40:
                                o("Arrow", [n = l(-i.arrowStep), !1])
                        }
                        67 != t && 86 != t && (t < 37 && 40 < t || 57 < t && t < 91 || 105 < t && 110 != t && 190 != t) && e.preventDefault(), "float" == i.type && -1 != p.inArray(t, [110, 190]) && -1 != n.indexOf(".") && e.preventDefault()
                    },
                    keyup: function(e) {
                        "" != r.val() || navigator.userAgent.includes("Version/16") ? r.val().length < d.limit[0] ? console.log("<") : r.val().length > d.limit[1] && console.log(">") : r.val(""), o("KeyUp", [r.val()])
                    }
                }))
            })
        }
    }(jQuery), $.fn.visible = function() {
        return this.css("display", "block")
    }, $.fn.invisible = function() {
        return this.css("display", "none")
    };