With this app you can upload your gas meter readings to the mindergas.nl website

Settings

- API token : create your own API token at the mindergas.nl website (after logging in)
- After midnight : check if your flow starts after midnight ; this way the recorded date is set one day earlier.
- Maximum Delay : maximum Randomized delay to send the reading data to the website. This is to balance the load to the mindergas.nl website (see mindergas.nl API page for an explanation)

Consult the API page for restrictions (e.g. only send your reading once a day)

Flow support

Actions

- Send reading . Add the global tag containing the gas meter reading.

ToDo

- Add documentation
- Add error checking on submitting data to API
- Add error checking on maximum Delay setting

Known bugs

- The action card will not show a 'green' checkmark.

Unknown bugs

Yes ;-)
