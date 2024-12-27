"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const process_1 = __importDefault(require("process"));
const ton_core_1 = require("ton-core");
const func_js_1 = require("@ton-community/func-js");
async function compileScripts() {
  console.log("================================================");
  console.log(
    "Compile Script is Running, let's Find some FunC code to compile..."
  );
  const compileResult = await (0, func_js_1.compileFunc)({
    targets: ["./contracts/main.fc"],
    sources: (x) => fs.readFileSync(x).toString("utf-8"),
  });
  console.log(" - Compilation Successful!");
  if (compileResult.status == "error") {
    console.log(" - OH NO! Compilation Errors! The compiler output was:");
    console.log(`\n${compileResult.message}`);
    process_1.default.exit(1);
  }
  const hexArtifact = `build/main.compiled.json`;
  fs.writeFileSync(
    hexArtifact,
    JSON.stringify({
      hex: ton_core_1.Cell.fromBoc(
        Buffer.from(compileResult.codeBoc, "base64")
      )[0]
        .toBoc()
        .toString("hex"),
    })
  );
  console.log(" - Compiled code save to " + hexArtifact);
}
compileScripts();
