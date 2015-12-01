# Calculator

Resurrection of the calculator app that was pulled from gaia.

## Useful links
* [prior code](https://github.com/mozilla-b2g/gaia/commits/master/apps/calculator)
* [prior buglist](https://bugzilla.mozilla.org/buglist.cgi?product=Boot2Gecko;component=Gaia%3A%3ACalculator;list_id=5445963)

## Dev notes
If you plan to create, update, or destroy any files, please make sure to update the zip.

```bash
cd app
zip application.zip newfile.whatever # add a new file into the zip
zip -f applicaton.zip # Rezip modified contents aka freshen
zip -d application.zip garbage.whatever # remove a file from the zip
```

Note: updating the zip is unnecessary if you're developing with the
[Firefox OS Simulator](https://developer.mozilla.org/en-US/docs/Tools/Firefox_OS_Simulator)
(Recommended).  With the simulator, you can
install as a packaged app by clicking Add Directory, then browsing to the
manifest.webapp.

## Test Suite

[Test Suite](http://mozilla.github.io/calculator/test/)
