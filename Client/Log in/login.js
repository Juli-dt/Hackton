document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:62299/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (!response.ok) {
      alert("usuario o contraseña incorrectos");
      document.getElementById('loginForm').reset();
      throw new Error(`HTTP error! status: ${response.status}`);
      
    }
    console.log(document.cookie);
    if(response.status === 200){
      console.log(document.cookie);
      const data = await response.json();
      alert("Bienvenido");
      //document.getElementById('loginForm').reset();
      console.log(response);
      if(data.userType == "donor"){
        window.location.href = '../Dashboards/donors/donors.html';
      }
      if(data.userType == "foundation"){
        window.location.href = '../Dashboards/foundations/foundations.html';
      }
      if(data.userType == "admin"){
        const response = await fetch('http://localhost:62299/donors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name":"Carlos Andres Noreña Vargas",
            "email":"carlos@gmail.com",
            "password":"123456",
            "idType":"National ID",
            "idNumber":"1000897044",
            "phone":"3000000000",
            "address":"Calle 1 # 1-1",
            "city":"Medellin",
            "state":"Antioquia",
            "country":"Colombia",
            "description":"Donante dinero a caridad",
            "blocked":false,
            "adminId":"13691912-bd99-4693-a8e2-55f65c843a73"
          }),
          credentials: 'include'
        });
        console.log(document.cookie);
        //window.location.href = '../Dashboards/admins/panel/panel.html';
      }
      //window.location.href = '../Dashboards/admins/panel/panel.html';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});