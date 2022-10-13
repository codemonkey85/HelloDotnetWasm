// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from "./dotnet.js"

const isBrowser = typeof window != "undefined";
if (!isBrowser) throw new Error(`Expected to be running in a browser`);

const { setModuleImports, getAssemblyExports, getConfig, runMainAndExit } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

setModuleImports("main.js", {
    window: {
        location: {
            href: () => globalThis.window.location.href
        }
    }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
const html = exports.MyClass.Greeting();
console.log(html);

document.getElementById("out").innerHTML = `${html}`;
await runMainAndExit(config.mainAssemblyName, ["dotnet", "is", "great!"]);
