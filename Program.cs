using System;
using System.Runtime.InteropServices.JavaScript;

// ReSharper disable MemberCanBePrivate.Global

Console.WriteLine("Hello, Browser!");
Console.WriteLine(string.Join(" ", args));

#pragma warning disable CA1050 // Declare types in namespaces
public partial class MyClass
#pragma warning restore CA1050 // Declare types in namespaces
{
    [JSExport]
    internal static string Greeting()
    {
        // language=html
        var text =
            $"""
        <div>
            <h1>Hello, World! Greetings from WASM!</h1>
            <p>Listening at { GetHRef()}   </p>
            <p>This is a test!</p>
        </div>
        """ ;
        Console.WriteLine(text);
        return text;
    }

    [JSImport("window.location.href", "main.js")]
    internal static partial string GetHRef();
}
