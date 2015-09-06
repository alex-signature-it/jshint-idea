"use strict";

// Reporter that respects IDEA console output conventions
// that allows links to the file and line, but not specific character
// and only if the line is not started by the file path.
// The format is " FILENAME:LINE:COL: MESSAGE" and it is essentially a copy-paste of standard jshint's reporters/unix.js
// with output prefixed by a single space character.

module.exports = {
    reporter: function(results, data, opts) {
        var len = results.length;
        var str = "";
        var prevfile;

        opts = opts || {};

        results.forEach(function(result) {
            var file = result.file;
            var error = result.error;

            if (prevfile && prevfile !== file) {
                str += "\n";
            }
            prevfile = file;

            str += ' ' + file + ":" + error.line + ":" + error.character + ": " + error.reason;

            if (opts.verbose) {
                str += " (" + error.code + ")";
            }

            str += "\n";
        });

        if (str) {
            console.log(str + "\n" + len + " error" + ((len === 1) ? "" : "s"));
        }
    }
};