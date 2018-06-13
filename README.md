Zakupnik
=======
Record your monthly expenses and income.


## Features
- extremely simple (no accounts, social bs, bank integrations)
- just enter your receipts & salary and see the charts
- focus on speed and minimalism
- keyboard friendly
- preview before adding


## Requirements
- client: a modern browser
- server: Apache + php 5.4 + sqlite
- building: gulp, babel and stuff

## Installation
- put files on a php server
- `chmod 777 assets` - so we can write to the sqlite db file
- it should work! :-)


## Screens

#### enter multiple receipts of the same type
![Main](https://raw.github.com/tborychowski/zakupnik/master/_stuff/screen.png)

#### split one receipt into different categories
![Split](https://raw.github.com/tborychowski/zakupnik/master/_stuff/screen-split.png)

#### repeat an expense every month
![Repeat](https://raw.github.com/tborychowski/zakupnik/master/_stuff/screen-repeat.png)

#### Categories
![Categories](https://raw.github.com/tborychowski/zakupnik/master/_stuff/screen-categories.png)

#### Stats
![Stats](https://raw.github.com/tborychowski/zakupnik/master/_stuff/screen-stats.png)


## References & third-parties:
- [Medoo](https://github.com/catfan/Medoo) - db framework
- [Pikaday](https://github.com/dbushell/Pikaday) - datepicker
- [Highcharts](http://api.highcharts.com/highcharts#legend.useHTML)
- [momentjs](http://momentjs.com/)
- [font awesome](http://fortawesome.github.io/Font-Awesome/icons/) - icon font

#### TODO
- [HybridAuth](http://hybridauth.sourceforge.net/index.html)
- [hellojs - js oauth](https://github.com/MrSwitch/hello.js)

