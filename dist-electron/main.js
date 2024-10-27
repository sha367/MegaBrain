import { app as l, BrowserWindow as g } from "electron";
import { fileURLToPath as _ } from "node:url";
import t from "node:path";
import f from "node:fs";
import { exec as h, spawn as S } from "node:child_process";
import y from "node:http";
const L = t.dirname(_(import.meta.url)), C = process.env.HOME || process.env.USERPROFILE, m = `${C}/ollama_models`;
process.env.OLLAMA_MODELS = m;
process.env.APP_ROOT = t.join(L, "..");
const u = process.env.VITE_DEV_SERVER_URL, v = t.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = u ? t.join(process.env.APP_ROOT, "public") : v;
const T = u ? t.join(L, "../resources") : process.resourcesPath;
let o = null;
const i = t.join(T, "ollama/llm"), p = t.join(m, "Modelfile"), a = (e) => {
  o == null || o.webContents.send("main-process-message", e);
}, w = (e) => {
  o == null || o.webContents.send("main-process-error", e);
}, $ = (e) => {
  o == null || o.webContents.send("main-process-warn", e);
};
function x() {
  if (f.existsSync(p)) return;
  const r = f.readdirSync(m).find((n) => n.endsWith(".gguf"));
  if (!r)
    throw new Error("No .gguf model file found in ollama_models directory.");
  const s = `FROM ${t.join(m, r)}`;
  f.writeFileSync(p, s), console.log(`Created Modelfile: ${s}`);
}
function R() {
  o = new g({
    icon: t.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: t.join(L, "preload.mjs")
    }
  }), o.webContents.openDevTools(), o.webContents.on("did-finish-load", async () => {
    try {
      console.log("Trying to run LLM..."), a("Trying to run LLM..."), x(), await I(), console.log("LLM started successfully"), a("LLM started successfully");
    } catch (e) {
      console.error("Failed to run LLM:", e), w(`Failed to run LLM: ${e}`);
    }
  }), u ? o.loadURL(u) : o.loadFile(t.join(v, "index.html"));
}
async function I() {
  if (!f.existsSync(i))
    throw w(`LLM executable not found at path: ${i}`), new Error(`LLM executable not found at ${i}`);
  await M(`${i}`, ["serve"], !0), console.log("LLM serve started."), a("LLM serve started."), await j(), await O("defaultModel") ? (console.warn("Model already exists. Skipping creation."), $("Model already exists. Skipping creation.")) : (console.log("Creating model..."), a("Creating model..."), await M(`${i}`, ["create", "defaultModel", "-f", p]));
}
async function O(e) {
  return new Promise((r, s) => {
    h(`${i} list`, (n, c) => {
      if (n)
        console.error("Error checking model list:", n), w(`Error checking model list: ${n}`), s(n);
      else {
        const d = c.includes(`${e}:latest`);
        d && a(`Models: 
${c}`), r(d);
      }
    });
  });
}
function M(e, r, s = !1) {
  return new Promise((n, c) => {
    const d = S(e, r, { detached: s, stdio: "inherit" });
    s ? n(!0) : d.on("close", (E) => {
      E === 0 ? n(!0) : c(new Error(`Command failed with exit code ${E}`));
    });
  });
}
function j() {
  return new Promise((e, r) => {
    const s = setInterval(() => {
      y.get("http://127.0.0.1:11434", (n) => {
        n.statusCode === 200 && (clearInterval(s), e(!0));
      }).on("error", () => {
      });
    }, 1e3);
    setTimeout(() => {
      clearInterval(s), r(new Error("LLM server failed to start in time."));
    }, 15e3);
  });
}
function P() {
  h(`pkill -f ${i}`, (e) => {
    e ? console.error("Failed to terminate LLM process:", e) : console.log("LLM process terminated.");
  });
}
l.on("window-all-closed", () => {
  process.platform !== "darwin" && (P(), l.quit());
});
l.on("before-quit", P);
l.on("activate", () => {
  g.getAllWindows().length === 0 && R();
});
l.whenReady().then(R);
