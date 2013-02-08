#Calculator#
==========

Resurrection of the calculator app that was pulled from gaia.

##Useful links##
* [prior code](https://github.com/mozilla-b2g/gaia/commits/master/apps/calculator)
* [prior buglist](https://bugzilla.mozilla.org/buglist.cgi?product=Boot2Gecko;component=Gaia%3A%3ACalculator;list_id=5445963)

##Dev notes##
If you plan to create, update, or destroy any files, please make sure to update the zip.

```shell
zip app/application.zip newfile.whatever # add a new file into the zip
zip -f app/applicaton.zip # Rezip modified contents aka freshen
zip -d app/application.zip garbage.whatever # remove a file from the zip
```

Note: updating the zip is unnecessary if you're developing with [make-fxos-install](https://github.com/digitarald/make-fxos-install) (Recommended).