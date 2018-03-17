(function(window){var svgSprite='<svg><symbol id="icon-un-complete" viewBox="0 0 1024 1024"><path d="M510.756683 959.99936c-60.499909 0-119.200846-11.853979-174.473707-35.232432-53.376675-22.577205-101.30936-54.893214-142.465712-96.049566-41.156352-41.154305-73.471338-89.086991-96.048543-142.464689-23.378453-55.271838-35.231409-113.972774-35.231409-174.472684 0-60.499909 11.852956-119.200846 35.231409-174.473707 22.576181-53.376675 54.892191-101.30936 96.048543-142.465712 41.156352-41.156352 89.089038-73.472362 142.465712-96.048543 55.271838-23.378453 113.972774-35.231409 174.473707-35.231409 60.498886 0 119.200846 11.852956 174.472684 35.231409 53.376675 22.577205 101.30936 54.893214 142.465712 96.049566 41.157375 41.155329 73.472362 89.088014 96.048543 142.465712 23.378453 55.269791 35.232432 113.971751 35.232432 174.473707 0 60.501956-11.853979 119.203916-35.233456 174.472684-22.577205 53.378721-54.892191 101.310384-96.04752 142.464689-41.156352 41.157375-89.089038 73.473385-142.464689 96.049566C629.956505 948.145381 571.255569 959.99936 510.756683 959.99936zM510.756683 94.259804c-56.368822 0-111.047142 11.037381-162.514327 32.806173-49.717332 21.028942-94.369298 51.135634-132.716674 89.481987-38.347376 38.347376-68.453045 82.999342-89.481987 132.716674-21.768793 51.467185-32.806173 106.145505-32.806173 162.514327 0 56.368822 11.037381 111.047142 32.806173 162.513304 21.029966 49.719378 51.135634 94.372368 89.481987 132.716674 38.347376 38.3484 82.999342 68.454068 132.716674 89.481987 51.468209 21.769816 106.145505 32.80822 162.514327 32.80822s111.046119-11.037381 162.514327-32.80822c49.717332-21.028942 94.369298-51.134611 132.715651-89.481987 38.347376-38.34533 68.453045-82.996273 89.480964-132.715651 21.769816-51.465139 32.80822-106.143459 32.80822-162.514327 0-56.370869-11.037381-111.048165-32.80822-162.514327-21.028942-49.718355-51.134611-94.371344-89.480964-132.717697-38.347376-38.347376-82.999342-68.453045-132.716674-89.481987C621.803825 105.297185 567.125505 94.259804 510.756683 94.259804z"  ></path></symbol><symbol id="icon-completed" viewBox="0 0 1024 1024"><path d="M954.854886 512C954.854886 267.418001 756.581999 69.145114 512 69.145114 267.418001 69.145114 69.145114 267.418001 69.145114 512 69.145114 756.581999 267.418001 954.854886 512 954.854886 756.581999 954.854886 954.854886 756.581999 954.854886 512ZM97.716397 512C97.716397 283.197484 283.197484 97.716397 512 97.716397 740.802516 97.716397 926.283603 283.197484 926.283603 512 926.283603 740.802516 740.802516 926.283603 512 926.283603 283.197484 926.283603 97.716397 740.802516 97.716397 512Z"  ></path><path d="M437.763438 686.669033C452.286479 705.335114 479.468285 705.62405 494.339774 687.157359L724.074654 401.883775C733.971792 389.593991 732.03217 371.607938 719.742386 361.7108 707.452603 351.813663 689.466549 353.753285 679.569412 366.04307L449.834532 651.316653C458.122119 641.02553 474.789691 641.202702 482.863219 651.579397L367.816205 503.712509C358.126469 491.258549 340.175457 489.017701 327.721497 498.707437 315.267536 508.397171 313.026689 526.348185 322.716424 538.802145L437.763438 686.669033Z"  ></path></symbol><symbol id="icon-toggle" viewBox="0 0 1024 1024"><path d="M83.2 332.8l409.6 409.6c12.8 12.8 32 12.8 44.8 0l409.6-409.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-384 384-384-384c-12.8-12.8-32-12.8-44.8 0s-19.2 32-6.4 44.8z"  ></path></symbol><symbol id="icon-delete" viewBox="0 0 1024 1024"><path d="M587.7 511.9L912.3 187c20.9-21 20.9-54.8 0-75.8s-54.8-21-75.7 0L512 436.1 187.5 111.2c-20.9-21-54.8-21-75.7 0-20.9 21-20.9 54.8 0 75.8l324.5 324.8-324.5 324.9c-20.9 21-20.9 54.8 0 75.8 10.4 10.5 24.1 15.7 37.9 15.7 13.7 0 27.4-5.2 37.9-15.7L512 587.7l324.5 324.8c10.4 10.5 24.2 15.7 37.9 15.7s27.4-5.2 37.8-15.7c20.9-21 20.9-54.8 0-75.8L587.7 511.9z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)