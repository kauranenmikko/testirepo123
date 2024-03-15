fetch('https://run.mocky.io/v3/875b9369-11dd-4e1a-a371-c10e55fb6276') // piti kopioida data ja laittaa uuteen URI 
// Muunnetaan vastaus JSON muotoon
.then(function (response) {
return response.json();
})
// Käsitellään muunnettu (eli JSON muotoinen) vastaus
.then(function (responseJson) {
// Testataan onnistuuko json-luku
// jos onnistuu päivitetään tähän json-datan käsittelevän funktion kutsu
kerro(responseJson);
function kerro(data){
    var teksti = "";
    var teksti2 = "";
    var kuva = ""; // määritellään muuttuja, johon tulostettava tieto kerätään
    var teksti3 = "";
    var teksti4 = "";
    var teksti5 = "";
    // otsikkotiedon hakeminen ja sijoittaminen h1-elementtiin
    teksti = "<h1>" + data.otsikko + "</h1>";
    teksti2 =  "<p>" + data.kuvaus + "</p>";
    kuva =  "<p><img src='" + data.kuva + "' alt='kuva' ></p>";
    teksti4 = teksti4 + "<h3>Opintojakso: " + data.opintojakso.nimi + " " +  data.opintojakso.tunnus + " " +  data.opintojakso.opintopisteet + "op" + "</h3>";
    teksti3 = teksti3 + "<ul>"
    for(var i = 0; i < data.sisalto.length; i++) {
        teksti3 = teksti3 + "<li>" + data.sisalto[i] + "</li>";
        }
    teksti3 = teksti3 + "</ul>"

    teksti5 = teksti5 + "<ul>"
    for(var i = 0; i < data.tekniikat.length; i++) {
        teksti5 = teksti5 + "<li>" + data.tekniikat[i].aihe + '<a href="' + data.tekniikat[i].linkki + '">' + data.tekniikat[i].linkki + "</a>" + "</li>";
        }
    teksti5 = teksti5 + "</ul>"
    // tähän tulee muiden tietojen käsittely kohta
    // teksti-muuttujan sisällön tulostus
    document.getElementById("vastaus").innerHTML = teksti + teksti2 + kuva + teksti4 + teksti3 + teksti5;
    }
})

// Jos tuli jokin virhe
.catch(function (error) {
document.getElementById("vastaus").innerHTML =
"<p>Tietoa ei pystytä hakemaan</p>";
})