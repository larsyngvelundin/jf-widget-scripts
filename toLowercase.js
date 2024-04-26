window.JFWidgetLowercaseSetup ||
    (window.JFWidgetLowercaseSetup = function (i) {
        console.log("test")
        if (((this.served = void 0 !== this.served ? this.served : []), ~this.served.indexOf(i.qid))) return !1;
        this.served.push(i.qid);
        e = navigator.userAgent.toLowerCase();
        var e,
            u =
                /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(e) ||
                /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(e) ||
                (-1 < e.indexOf("macintosh") && 1 < navigator.maxTouchPoints);
        function n(n) {
            console.log("test")
            var a = "input_" + n.qid,
                t = parseInt(n.start) || 0,
                i = parseInt(n.end) || 0;
            function d() {
                return n.source.replace(/^#/i, "");
            }
            function o(e, t, i) {
                i
                    ? $(e).observe(t, function () {
                        setTimeout(s, 1e3);
                    })
                    : setTimeout(function () {
                        $(e).observe(t, s);
                    }, 50);
            }
            function s() {
                var e = document.getElementById("input_" + r(d())) || $(d()),
                    e = (null != e ? e.value : JotForm.fieldHasContent(r(d())) || "").toLowerCase();
                $(a).setValue(e), document.getElementById(a).triggerEvent("change"), JotForm.runConditionForId(n.qid);
            }
            function r(e) {
                console.log("test")
                return (e = e.split("_")).length ? e[1] : "";
            }
            this.init = function () {
                console.log("test")
                var e,
                    t,
                    i = $(d());
                i
                    ? ((t = new Element("input", { type: "text", id: a, name: n.qname, readonly: "readonly", className: "form-textbox to-lowercase" }).setStyle({ "box-sizing": "border-box" })),
                        $(a + "_container").insert(t),
                        (t = $$(".to-lowercase#" + a).first()),
                        (e = t.parentNode.parentNode.style.width),
                        t.setStyle({ width: e }),
                        t.up('div[id*="cid"]').setStyle({ display: "inline-block" }),
                        (function (e) {
                            var t = r(e.id),
                                e = JotForm.getInputType(t),
                                i = $("id_" + t);
                            switch (e) {
                                case "radio":
                                case "checkbox":
                                case "signature":
                                    o(i, "click");
                                    break;
                                case "select":
                                    o(i, "change");
                                    break;
                                case "file":
                                    o(i, "change"),
                                        "multiple" ===
                                        $$("#id_" + t + " input")
                                            .first()
                                            .readAttribute("multiple") && o(i, "click", !0);
                                    break;
                                case "datetime":
                                    o(i, "date:changed"),
                                        $$("#id_" + t + " select").each(function (e) {
                                            o($(e), "change");
                                        });
                                    break;
                                case "time":
                                    $$("#id_" + t + " select").each(function (e) {
                                        o($(e), "change");
                                    }),
                                        $$("#id_" + t + " input").each(function (e) {
                                            null !== $(e).readAttribute("data-mask") && o($(e), "change");
                                        });
                                    break;
                                case "birthdate":
                                    $$("#id_" + t + " select").each(function (e) {
                                        o($(e), "change");
                                    });
                                    break;
                                case "address":
                                case "email":
                                    o(i, "keyup"), o(i, "change");
                                    break;
                                case "number":
                                    o(i, "keyup"), o(i, "click"), o(i, "change");
                                    break;
                                case "text":
                                    $("input_" + t).readAttribute("data-masked") && u ? o(i, "keyup", !0) : (o(i, "keyup"), o(i, "change"));
                                    break;
                                case "widget":
                                    o($("input_" + t), "change"), JotForm.widgetsWithConditions.push(t);
                                    break;
                                default:
                                    o(i, "keyup"), o(i, "change");
                            }
                        })(i),
                        setTimeout(function () {
                            JotForm.runConditionForId(n.qid);
                        }, 50),
                        (e = i && i.id && i.id in JotForm.defaultValues),
                        (JotForm.isEditMode() || e) &&
                        setTimeout(function () {
                            i.value && s();
                        }, 1e3))
                    : ((t = new Element("p").setStyle("color", "#F00").update("Invalid source field ID")), $(a + "_container").insert(t));
            };
        }
        console.log("test")
        document.write('<div id="input_' + i.qid + '_container"></div>'),
            document.observe("dom:loaded", function () {
                var e = new n(i),
                    t = setInterval(() => {
                        JotForm.initializing || (e.init(), clearInterval(t));
                    }, 100);
            });
    }),
    void 0 !== window.srcFieldId &&
    void 0 !== window.lowercaseQid &&
    void 0 !== window.lowercaseQname &&
    window.JFWidgetLowercaseSetup({ source: window.srcFieldId, qid: window.lowercaseQid, qname: window.lowercaseQname });
