document.querySelectorAll('input[name="formSelector"]').forEach((elem) => {
  elem.addEventListener("change", function(event) {
      var value = event.target.value;
      document.getElementById("formFoundations").style.display = value === "form1" ? "block" : "none";
      document.getElementById("formDonors").style.display = value === "form2" ? "block" : "none";
  });
});
$(document).ready(function() {
  $('#country').select2({
    placeholder: 'Seleccione un país',
    ajax: {
      url: 'http://api.geonames.org/countryInfoJSON',
      dataType: 'json',
      delay: 250,
      data: function(params) {
        return {
          username: 'demo', // Reemplaza 'demo' con tu nombre de usuario de Geonames
          lang: 'es'
        };
      },
      processResults: function(data) {
        return {
          results: data.geonames.map(function(country) {
            return {
              id: country.geonameId,
              text: country.countryName
            };
          })
        };
      },
      cache: true
    }
  });

  $('#country').on('select2:select', function(e) {
    var countryId = e.params.data.id;
    $('#state').val(null).trigger('change');
    $('#city').val(null).trigger('change');
    loadStates(countryId);
  });

  function loadStates(countryId) {
    $('#state').select2({
      placeholder: 'Seleccione un departamento',
      ajax: {
        url: 'http://api.geonames.org/childrenJSON',
        dataType: 'json',
        delay: 250,
        data: function(params) {
          return {
            geonameId: countryId,
            username: 'demo', // Reemplaza 'demo' con tu nombre de usuario de Geonames
            lang: 'es'
          };
        },
        processResults: function(data) {
          return {
            results: data.geonames.map(function(state) {
              return {
                id: state.geonameId,
                text: state.name
              };
            })
          };
        },
        cache: true
      }
    });
  }

  $('#state').on('select2:select', function(e) {
    var stateId = e.params.data.id;
    $('#city').val(null).trigger('change');
    loadCities(stateId);
  });

  function loadCities(stateId) {
    $('#city').select2({
      placeholder: 'Seleccione una ciudad',
      ajax: {
        url: 'http://api.geonames.org/childrenJSON',
        dataType: 'json',
        delay: 250,
        data: function(params) {
          return {
            geonameId: stateId,
            username: 'demo', // Reemplaza 'demo' con tu nombre de usuario de Geonames
            lang: 'es'
          };
        },
        processResults: function(data) {
          return {
            results: data.geonames.map(function(city) {
              return {
                id: city.geonameId,
                text: city.name
              };
            })
          };
        },
        cache: true
      }
    });
  }
});