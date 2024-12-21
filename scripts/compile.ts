import * as fs from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";

async function compileScripts() {
  console.log("================================================");

  console.log(
    "Compile Script is Running, let's Find some FunC code to compile..."
  );

  const compileResult = await compileFunc({
    targets: ["./contracts/main.fc"],
    sources: (x) => fs.readFileSync(x).toString("utf-8"),
  });

  console.log(" - Compilation Successful!");

  if (compileResult.status == "error") {
    console.log(" - OH NO! Compilation Errors! The compiler output was:");
    console.log(`\n${compileResult.message}`);
    process.exit(1);
  }

  const hexArtifact = `build/main.compiled.json`;

  fs.writeFileSync(
    hexArtifact,
    JSON.stringify({
      hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
        .toBoc()
        .toString("hex"),
    })
  );

  console.log(" - Compiled code save to " + hexArtifact);
}

compileScripts();
