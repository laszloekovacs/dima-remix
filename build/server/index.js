import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useNavigate, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useNavigation, Meta, Links, ScrollRestoration, Scripts, useFetcher, Form } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useHotkeys } from "react-hotkeys-hook";
import { useState, useEffect, useRef, useCallback } from "react";
import os from "node:os";
import "@gsap/react";
import gsap from "gsap";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function SystemColors({
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: "bg-black text-white", children });
}
function SystemKeys({
  children
}) {
  const navigate = useNavigate();
  useHotkeys("alt+0", () => navigate("/settings"), {
    preventDefault: true
  });
  return /* @__PURE__ */ jsx("div", { children });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap"
}];
function Layout({
  children
}) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-black",
      children: [/* @__PURE__ */ jsx(SystemColors, {
        children: isNavigating ? /* @__PURE__ */ jsx("div", {
          children: "loading"
        }) : /* @__PURE__ */ jsx(SystemKeys, {
          children
        })
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const error__lockdown = UNSAFE_withComponentProps(function LockdownScreen() {
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    if (!countdown) {
      setCountdown(new Date(Date.now() + 5e3));
    } else {
      const timer = setInterval(() => {
        const now = /* @__PURE__ */ new Date();
        if (countdown.getTime() <= now.getTime()) {
          setCountdown(null);
          clearInterval(timer);
          window.location.href = "/";
        }
      }, 200);
      return () => clearInterval(timer);
    }
  }, [countdown]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "Sikertelen betores a rendszerbe erzekelve"
    }), /* @__PURE__ */ jsx("p", {
      children: "Terminal lezarva!"
    }), /* @__PURE__ */ jsx("p", {
      children: "biztonsagi csoport ertesitve"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("p", {
        children: "Lezaras feloldasa:"
      }), /* @__PURE__ */ jsx("p", {
        children: countdown == null ? void 0 : countdown.toISOString()
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: error__lockdown
}, Symbol.toStringTag, { value: "Module" }));
const error__generic = UNSAFE_withComponentProps(function TapeSelectionScreen() {
  return /* @__PURE__ */ jsx("p", {
    children: "printer error screen"
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: error__generic
}, Symbol.toStringTag, { value: "Module" }));
const copysequence = UNSAFE_withComponentProps(function CopySequenceScreen() {
  return /* @__PURE__ */ jsx("p", {
    children: "copying"
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: copysequence
}, Symbol.toStringTag, { value: "Module" }));
const SystemLayout = (props) => {
  const { heading, main, commandLine } = props;
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-rows-[auto_1fr_auto] min-w-screen min-h-screen p-4 gap-2", children: [
    /* @__PURE__ */ jsx("header", { children: heading }),
    /* @__PURE__ */ jsx("main", { className: "self-start", children: main }),
    /* @__PURE__ */ jsx("footer", { children: commandLine })
  ] });
};
const tapedetails = UNSAFE_withComponentProps(function TapeSelectionScreen2() {
  return /* @__PURE__ */ jsx(SystemLayout, {
    heading: /* @__PURE__ */ jsx("p", {
      children: "dima konzol"
    }),
    main: /* @__PURE__ */ jsx(DetailsScreen, {}),
    commandLine: /* @__PURE__ */ jsx(KeyCommands, {})
  });
});
const DetailsScreen = () => {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: 'Kiválasztott szalag: "Химера"'
    }), /* @__PURE__ */ jsx("p", {
      children: "загруженные данные: 452Kb"
    }), /* @__PURE__ */ jsx("p", {
      children: "Внимание! Память практически исчерпана"
    }), /* @__PURE__ */ jsx("hr", {}), /* @__PURE__ */ jsx("p", {
      children: "1. dokumentum kinyomtatása"
    }), /* @__PURE__ */ jsx("p", {
      children: "2. lemezmásolat készítése"
    })]
  });
};
const KeyCommands = () => {
  const navigate = useNavigate();
  useHotkeys("1", () => navigate("/print"));
  useHotkeys("2", () => navigate("/startcopy"));
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx("p", {
      children: "parancsok: 1: nyomtatás, 2: másolás"
    })
  });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tapedetails
}, Symbol.toStringTag, { value: "Module" }));
const tapeselect = UNSAFE_withComponentProps(function TapeSelectionScreen3() {
  return /* @__PURE__ */ jsx("p", {
    children: "tape selection screen"
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tapeselect
}, Symbol.toStringTag, { value: "Module" }));
const startcopy = UNSAFE_withComponentProps(function StartCopyScreen() {
  return /* @__PURE__ */ jsx("p", {
    children: "start copy screen"
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: startcopy
}, Symbol.toStringTag, { value: "Module" }));
async function action({
  request
}) {
  const data = await request.formData();
  const jsonform = Object.fromEntries(data);
  console.log(jsonform);
  if (os.platform() !== "linux") return;
  return;
}
async function loader() {
}
const api_beep = UNSAFE_withComponentProps(function BeepPage() {
  const fetcher = useFetcher();
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs(fetcher.Form, {
      method: "post",
      children: [/* @__PURE__ */ jsxs("select", {
        name: "preset",
        children: [/* @__PURE__ */ jsx("option", {
          value: "affirmative",
          children: "affirmative"
        }), /* @__PURE__ */ jsx("option", {
          value: "tripple",
          children: "tripple"
        })]
      }), /* @__PURE__ */ jsx("input", {
        type: "submit",
        value: "submit"
      })]
    })
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: api_beep,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const settings = UNSAFE_withComponentProps(function TapeSelectionScreen4() {
  return /* @__PURE__ */ jsx("p", {
    children: "settings page"
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings
}, Symbol.toStringTag, { value: "Module" }));
const lockout = UNSAFE_withComponentProps(function SleepPage() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx("p", {
      children: "rendszer lezárva"
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lockout
}, Symbol.toStringTag, { value: "Module" }));
function getRemainingTime(endTime) {
  const now = Date.now();
  const totalMs = new Date(endTime).getTime() - now;
  const clamped = Math.max(0, totalMs);
  return new Date(clamped);
}
function useCountdownTimer({
  targetDate,
  onComplete
}) {
  const [timeLeft, setTimeLeft] = useState(() => getRemainingTime(targetDate));
  const rafRef = useRef(0);
  useEffect(() => {
    const update = () => {
      const remaining = getRemainingTime(targetDate);
      setTimeLeft(remaining);
      if (remaining.getTime() <= 0) {
        onComplete == null ? void 0 : onComplete();
        return;
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetDate, onComplete]);
  const sixtieths = Math.floor(timeLeft.getMilliseconds() / 1e3 * 60);
  return [timeLeft, sixtieths];
}
function useSlideshow(images, frequency) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, frequency);
    return () => clearInterval(timer);
  }, [images, frequency]);
  return images[current];
}
const target = new Date(Date.now() + 30 * 60 * 1e3);
const testing = UNSAFE_withComponentProps(function TestingRoute() {
  const [timeLeft, sixtieths] = useCountdownTimer({
    targetDate: target
  });
  const slide = useSlideshow(["hello", "world"], 1e3);
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(SystemLayout, {
      heading: /* @__PURE__ */ jsx("div", {
        className: "warning-stripes background-animation",
        children: "предупреждение, нарушение"
      }),
      main: /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("img", {
            src: "https://www.picsum.dev/400/300",
            alt: "temp"
          })
        }), /* @__PURE__ */ jsx("p", {
          className: "blink-slow",
          children: "very cool"
        }), /* @__PURE__ */ jsx("p", {
          children: slide
        })]
      }),
      commandLine: /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("span", {
          children: timeLeft.toUTCString()
        }), /* @__PURE__ */ jsxs("span", {
          children: [":", sixtieths.toString()]
        })]
      })
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: testing
}, Symbol.toStringTag, { value: "Module" }));
const _index = UNSAFE_withComponentProps(function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("login");
  };
  const buttonRef = useRef(null);
  useEffect(() => {
    var _a;
    (_a = buttonRef.current) == null ? void 0 : _a.focus();
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen min-w-screen grid place-content-center",
    children: /* @__PURE__ */ jsxs("div", {
      className: "text-sm",
      children: [/* @__PURE__ */ jsx("p", {
        children: "DIMA távoli adatelérés terminál"
      }), /* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: handleClick,
        ref: buttonRef,
        onBlur: () => {
          var _a;
          return (_a = buttonRef.current) == null ? void 0 : _a.focus();
        },
        children: "folytatáshoz nyomja meg az Enter-t"
      })]
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_PASSCODE = "5435";
const LoginPage = () => {
  const passcodeRef = useRef(null);
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const [hadFail, setFail] = useState(false);
  useEffect(() => {
    const stored = Number(localStorage.getItem("passcode.count")) || count;
    setCount(stored);
  });
  useEffect(() => {
    var _a;
    (_a = passcodeRef.current) == null ? void 0 : _a.focus();
  }, []);
  const handleSubmit = useCallback((e) => {
    var _a, _b;
    e.preventDefault();
    if (!((_a = passcodeRef.current) == null ? void 0 : _a.value)) return;
    const passcode = localStorage.getItem("dima.passcode") ?? DEFAULT_PASSCODE;
    if (passcode === ((_b = passcodeRef.current) == null ? void 0 : _b.value)) {
      console.log("Access granted");
      localStorage.setItem("passcode.count", "3");
      navigate("/boot");
    } else {
      setCount((c) => {
        const newCount = c - 1;
        localStorage.setItem("passcode.count", newCount.toString());
        return newCount;
      });
      setFail(true);
    }
  }, []);
  useEffect(() => {
    if (count <= 0) {
      console.log("Access denied - lockout");
      navigate("/lockout");
    }
  }, [count, navigate]);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-black text-green-500 flex items-center justify-center p-6 font-mono",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-full max-w-xl border border-green-700 p-6",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-sm mb-4",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-6xl mb-2",
          children: "Д.И.М.А 3850"
        }), /* @__PURE__ */ jsx("p", {
          children: "Департамент Исследований и Мобильного Архива"
        }), /* @__PURE__ */ jsx("p", {
          children: "távoli adat központ terminál"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-6",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "passcode",
          className: "block text-sm mb-2",
          children: "Belépőkód megadása:"
        }), /* @__PURE__ */ jsx(Form, {
          method: "post",
          onSubmit: handleSubmit,
          children: /* @__PURE__ */ jsx("input", {
            ref: passcodeRef,
            type: "text",
            id: "passcode",
            className: "w-full bg-black border border-green-500 text-green-500 px-3 py-2 font-[Share_Tech_Mono] focus:outline-none focus:ring-2 focus:ring-green-700",
            placeholder: "••••••••",
            onBlur: () => {
              var _a;
              return (_a = passcodeRef.current) == null ? void 0 : _a.focus();
            }
          })
        }), hadFail && /* @__PURE__ */ jsxs("p", {
          children: ["sikertelen belépés! Hátralévő próbálkozások: ", count]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "text-xs my-6 border-t border-green-700 pt-4 space-y-1",
        children: [/* @__PURE__ */ jsx("p", {
          children: "1985 Technológiai Fejlesztési Minisztérium, SZU."
        }), /* @__PURE__ */ jsx("p", {
          children: "Dokumentum szám: 3850-12A | Kiadva: 1985. október 29. | Archív kód: STK-17/URZ"
        }), /* @__PURE__ */ jsx("p", {
          children: '"A hűség az intelligencia legmagasabb formája." — X Igazgatóság'
        })]
      })]
    })
  });
};
const login = UNSAFE_withComponentProps(LoginPage);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const print = UNSAFE_withComponentProps(function TapeSelectionScreen5() {
  return /* @__PURE__ */ jsx("p", {
    children: "printing"
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: print
}, Symbol.toStringTag, { value: "Module" }));
const bootLines = ["[  OK  ] ROM betöltése...", "[  OK  ] Kernel modulok betöltése...", "[  OK  ] /dev/sda1 csatolása...", "[  OK  ] Hálózati interfészek aktiválása...", "[  OK  ] D.I.M.A 3850 csomópont kézfogás elindítva...", "[  OK  ] Távoli hozzáférés engedélyezve", "...", "Keretrendszer csatlakoztatása folyamatban..."];
const BootSequenceHU = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  useEffect(() => {
    var _a;
    const lines = (_a = containerRef.current) == null ? void 0 : _a.querySelectorAll(".boot-line");
    if (!lines) return;
    gsap.set(lines, {
      opacity: 0
    });
    lines.forEach((line, i) => {
      gsap.to(line, {
        opacity: 1,
        delay: i * 1.2,
        duration: 0,
        ease: "none"
      });
    });
    gsap.to(headerRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut"
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-black text-green-500 p-6 min-h-screen font-mono",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex justify-center p-2",
      children: /* @__PURE__ */ jsx("img", {
        src: "./assets/hammer-and-sickle.png",
        alt: "redstar",
        className: "h-12"
      })
    }), /* @__PURE__ */ jsx("div", {
      ref: headerRef,
      className: "text-center text-sm mb-4 bg-green-500 text-black",
      children: "Rendszerindítás folyamatban..."
    }), /* @__PURE__ */ jsx("div", {
      ref: containerRef,
      children: bootLines.map((text, i) => /* @__PURE__ */ jsx("p", {
        className: "boot-line text-sm",
        children: text
      }, i))
    })]
  });
};
const boot = UNSAFE_withComponentProps(BootSequenceHU);
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: boot
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CfWjEMPO.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DFYI-xG2.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js", "/assets/index-B_GdEMqV.js"], "css": ["/assets/root-Yw-KZREU.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/error_.lockdown": { "id": "routes/error_.lockdown", "parentId": "root", "path": "error/lockdown", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/error_.lockdown-4nOotKlm.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/error_.generic": { "id": "routes/error_.generic", "parentId": "root", "path": "error/generic", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/error_.generic-bzGTyK1D.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/copysequence": { "id": "routes/copysequence", "parentId": "root", "path": "copysequence", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/copysequence-BEYB0zO6.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tapedetails": { "id": "routes/tapedetails", "parentId": "root", "path": "tapedetails", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tapedetails-C8d_gmJl.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js", "/assets/index-B_GdEMqV.js", "/assets/system-layout-BFT72loD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tapeselect": { "id": "routes/tapeselect", "parentId": "root", "path": "tapeselect", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tapeselect-BwTMqX2e.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/startcopy": { "id": "routes/startcopy", "parentId": "root", "path": "startcopy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/startcopy-BUZdGGaI.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.beep": { "id": "routes/api.beep", "parentId": "root", "path": "api/beep", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.beep-DtL6e2GO.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "root", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-BK9WZ8hz.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/lockout": { "id": "routes/lockout", "parentId": "root", "path": "lockout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/lockout-CnxSeGIB.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/testing": { "id": "routes/testing", "parentId": "root", "path": "testing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/testing-C_85rc5j.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js", "/assets/system-layout-BFT72loD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-Bb_H7Kir.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-CYE9Sc9U.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/print": { "id": "routes/print", "parentId": "root", "path": "print", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/print-Ck8XTClx.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/boot": { "id": "routes/boot", "parentId": "root", "path": "boot", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/boot-CVBfUO4B.js", "imports": ["/assets/chunk-UIGDSWPH-BRFJvEw1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-44e69fb4.js", "version": "44e69fb4", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/error_.lockdown": {
    id: "routes/error_.lockdown",
    parentId: "root",
    path: "error/lockdown",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/error_.generic": {
    id: "routes/error_.generic",
    parentId: "root",
    path: "error/generic",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/copysequence": {
    id: "routes/copysequence",
    parentId: "root",
    path: "copysequence",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/tapedetails": {
    id: "routes/tapedetails",
    parentId: "root",
    path: "tapedetails",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/tapeselect": {
    id: "routes/tapeselect",
    parentId: "root",
    path: "tapeselect",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/startcopy": {
    id: "routes/startcopy",
    parentId: "root",
    path: "startcopy",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/api.beep": {
    id: "routes/api.beep",
    parentId: "root",
    path: "api/beep",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/lockout": {
    id: "routes/lockout",
    parentId: "root",
    path: "lockout",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/testing": {
    id: "routes/testing",
    parentId: "root",
    path: "testing",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route11
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/print": {
    id: "routes/print",
    parentId: "root",
    path: "print",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/boot": {
    id: "routes/boot",
    parentId: "root",
    path: "boot",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
