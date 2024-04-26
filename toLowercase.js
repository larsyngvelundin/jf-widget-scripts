window.JFWidgetLowercaseSetup = function(request) {
    function init(file) {
      function error() {
        return file.source.replace(/^#/i, "");
      }
      function trigger(element, event, dataAndEvents) {
        if (dataAndEvents) {
          $(element).observe(event, function() {
            setTimeout(check, 1E3);
          });
        } else {
          setTimeout(function() {
            $(element).observe(event, check);
          }, 50);
        }
      }
      function check() {
        var name = document.getElementById("input_" + cb(error())) || $(error());
        name = (null != name ? name.value : JotForm.fieldHasContent(cb(error())) || "").toLowerCase();
        $(id).setValue(name);
        document.getElementById(id).triggerEvent("change");
        JotForm.runConditionForId(file.qid);
      }
      function cb(result) {
        return(result = result.split("_")).length ? result[1] : "";
      }
      var id = "input_" + file.qid;
      var nameStart = parseInt(file.start) || 0;
      var indexOfEquals = parseInt(file.end) || 0;
      this.init = function() {
        var originalWidth;
        var element;
        var elem = $(error());
        if (elem) {
          element = (new Element("input", {
            type : "text",
            id : id,
            name : file.qname,
            readonly : "readonly",
            className : "form-textbox toLowercase"
          })).setStyle({
            "box-sizing" : "border-box"
          });
          $(id + "_container").insert(element);
          element = $$(".toLowercase#" + id).first();
          originalWidth = element.parentNode.parentNode.style.width;
          element.setStyle({
            width : originalWidth
          });
          element.up('div[id*="cid"]').setStyle({
            display : "inline-block"
          });
          (function(type) {
            var name = cb(type.id);
            type = JotForm.getInputType(name);
            var submit = $("id_" + name);
            switch(type) {
              case "radio":
              ;
              case "checkbox":
              ;
              case "signature":
                trigger(submit, "click");
                break;
              case "select":
                trigger(submit, "change");
                break;
              case "file":
                trigger(submit, "change");
                if ("multiple" === $$("#id_" + name + " input").first().readAttribute("multiple")) {
                  trigger(submit, "click", true);
                }
                break;
              case "datetime":
                trigger(submit, "date:changed");
                $$("#id_" + name + " select").each(function(mediaElem) {
                  trigger($(mediaElem), "change");
                });
                break;
              case "time":
                $$("#id_" + name + " select").each(function(mediaElem) {
                  trigger($(mediaElem), "change");
                });
                $$("#id_" + name + " input").each(function(element) {
                  if (null !== $(element).readAttribute("data-mask")) {
                    trigger($(element), "change");
                  }
                });
                break;
              case "birthdate":
                $$("#id_" + name + " select").each(function(mediaElem) {
                  trigger($(mediaElem), "change");
                });
                break;
              case "address":
              ;
              case "email":
                trigger(submit, "keyup");
                trigger(submit, "change");
                break;
              case "number":
                trigger(submit, "keyup");
                trigger(submit, "click");
                trigger(submit, "change");
                break;
              case "text":
                if ($("input_" + name).readAttribute("data-masked") && data_masked) {
                  trigger(submit, "keyup", true);
                } else {
                  trigger(submit, "keyup");
                  trigger(submit, "change");
                }
                break;
              case "widget":
                trigger($("input_" + name), "change");
                JotForm.widgetsWithConditions.push(name);
                break;
              default:
                trigger(submit, "keyup");
                trigger(submit, "change");
            }
          })(elem);
          setTimeout(function() {
            JotForm.runConditionForId(file.qid);
          }, 50);
          originalWidth = elem && (elem.id && elem.id in JotForm.defaultValues);
          if (JotForm.isEditMode() || originalWidth) {
            setTimeout(function() {
              if (elem.value) {
                check();
              }
            }, 1E3);
          }
        } else {
          element = (new Element("p")).setStyle("color", "#F00").update("Invalid source field ID");
          $(id + "_container").insert(element);
        }
      };
    }
    if (this.served = void 0 !== this.served ? this.served : [], ~this.served.indexOf(request.qid)) {
      return false;
    }
    this.served.push(request.qid);
    agent = navigator.userAgent.toLowerCase();
    var agent;
    var data_masked = /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(agent) || (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(agent) || -1 < agent.indexOf("macintosh") && 1 < navigator.maxTouchPoints);
  };
  