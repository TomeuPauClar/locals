module.exports = {
  getAllCookies: function () {
    var i, nom, valor;
    var cadena = document.cookie;
    var galetes = cadena.split(";");
    var arrayGaletes = [];
    for (i = 0; i < galetes.length; i++) {
      var parts = galetes[i].split("=");
      nom = parts[0];
      valor = parts[1];
      arrayGaletes.push([nom, valor]);
    }
    if (arrayGaletes[0][1] !== undefined) return arrayGaletes;
    return [];
  },
  setCookie: function (c_name, value, exdays, domain, path) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = encodeURI(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString()) + (domain == null ? "" : "; domain=" + encodeURI(domain)) + (path == null ? "" : "; path=" + encodeURI(path));
    document.cookie = c_name + "=" + c_value;
  },
  getCookie: function (c_name) {
    var i, nom, valor;
    var galletes = document.cookie.split(";");
    for (i = 0; i < galletes.length; i++) {
      var parts = galletes[i].split("=");
      nom = parts[0];
      valor = parts[1];
      nom = nom.replace(/^\s+|\s+$/g, "");
      if (nom === c_name) {
        return decodeURI(valor);
      }
    }
  },
  deleteCookie: function (nom) {
    this.setCookie(nom, "", -1, null, "/");
  },
  deleteAllCookies: function () {
    var i, nom;
    var arrayGaletes = this.getAllCookies();
    for (i = 0; i < arrayGaletes.length; i++) {
      nom = arrayGaletes[i][0];
      this.deleteCookie(nom);
    }
  },
};
