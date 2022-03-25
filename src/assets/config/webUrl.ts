export var webUrl = {
  host_dashboard: 'http://192.168.40.101:8080/fr_formariz/rest/rest',
  /*
  host: 'http://192.168.40.101:8080/sgiid',
  mod_pro: true,
  host_app: 'http://192.168.40.101:8080/app',
  link: 'http://192.168.40.101:5050/dev/sgiid/'

  /*
  host: 'http://localhost:8080/sgiid',
  host_app: 'http://localhost:8080/app',
  mod_pro: false,

  mod_pro: false,
  host_app: 'http://192.168.40.126:8080/app',
  host: 'http://192.168.40.126:8080/sgiid',
  link: location.protocol + '//' + location.host.replace('4200', '5050').replace('8080', '5050') + '/dev/sgiid/'
  /*  */
  mod_pro: true,
  host_app: location.protocol + '//' + location.host.replace('4200', '8080') + '/app',
  host: location.protocol + '//' + location.host.replace('4200', '8080') + '/sgiid',
  link: location.protocol + '//' + location.host.replace('4200', '5050').replace('8080', '5050') + '/dev/sgiid/'
  /**/
}
