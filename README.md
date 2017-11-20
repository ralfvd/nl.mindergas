### MinderGas

With this app you can upload your gas meter readings to the mindergas.nl website

### Settings

- API token : create your own API token at the mindergas.nl website (after logging in)
- After midnight : check if your flow starts after midnight ; this way the recorded date is set one day earlier.
- Maximum Delay : maximum Randomized delay to send the reading data to the website. This is to balance the load to the mindergas.nl website (see mindergas.nl API page for an explanation)

Consult the API page for restrictions (e.g. only send your reading once a day)

### Flow support

*Actions*

- Send reading . Add the global tag containing the gas meater reading.

### Donate

If you like the app, consider a donation to support development  
[![Paypal donate][pp-donate-image]][pp-donate-link]

### ToDo

- Add documentation
- Add error checking on submitting data to API
- Add error checking on maximum Delay setting

### Known bugs

- The action card will not show a 'green' checkmark.

### Unknown bugs

Yes ;-)

### Changelog

- V0.2.0 2017-11-20 : SDK-2 rewrite
- V0.1.0 2017-04-23 : App store submission
- V0.0.1 2017-04-21 : First test release on Github

[pp-donate-link]: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ralf%40iae%2enl&lc=GB&item_name=homey%2dmindergas&item_number=homey%2dmindergas&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
[pp-donate-image]: https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif
