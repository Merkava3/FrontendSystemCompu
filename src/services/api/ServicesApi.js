import { RequestUrl} from "../helpers/hepers"

class ServicesApi{
    constructor(requeriments, name){
        this.requeriments = requeriments;
        this.name = name;
        
    }

    async PostVentas(){
      const url = RequestUrl(this.name)
      console.log("ventas");
      console.log(this.requeriments)

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.requeriments)


        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
        
        if (typeof data === 'object' && data !== null) {
          return data;
        } else {
          throw new Error('La respuesta no contiene un objeto válido');
        }
      } catch (error) {
        console.error('Ocurrió un error:', error.message);
        return null;
      }
    }
    
    async PostVentasDetalles(){
      const url = RequestUrl(this.name)
      console.log(url)
    console.log("detalles ventas")
    console.log(this.requeriments)
    

    try {
        const response = await fetch("http://127.0.0.1:4000/api/v1/detalles_venta", {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
                },
          body: JSON.stringify(this.requeriments)


        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
        
        if (typeof data === 'object' && data !== null) {
          return data;
        } else {
          throw new Error('La respuesta no contiene un objeto válido');
        }
      } catch (error) {
        console.error('Ocurrió un error:', error.message);
        return null;
      }
    }

   async PostUrl() {

    const url = RequestUrl(this.name)
    console.log(this.requeriments)

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.requeriments)


        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
        
        if (typeof data === 'object' && data !== null) {
          return data;
        } else {
          throw new Error('La respuesta no contiene un objeto válido');
        }
      } catch (error) {
        console.error('Ocurrió un error:', error.message);
        return null;
      }
       
   }
   async PutUrl(){
    const url = RequestUrl(this.name)
    console.log(this.requeriments)
    try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.requeriments)

        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
        
        if (typeof data === 'object' && data !== null) {
          return data;
        } else {
          throw new Error('La respuesta no contiene un objeto válido');
        }
      } catch (error) {
        console.error('Ocurrió un error:', error.message);
        return null;
      }
   }
   async DeleteUrl(){
    const url = RequestUrl(this.name)
    console.log(this.requeriments)

    try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.requeriments)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);
        
        if (typeof data === 'object' && data !== null) {
          return data;
        } else {
          throw new Error('La respuesta no contiene un objeto válido');
        }
      } catch (error) {
        console.error('Ocurrió un error:', error.message);
        return null;
      }
   }

   async getUrl() {
    const url = RequestUrl(this.name);
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); 
      console.log(data);
  
      if (data && typeof data === 'object') {
        return data;
      } else {
        throw new Error('La respuesta no contiene un objeto válido');
      }
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
      return null; 
    }
  }

  async getSearchUrl() {
    const url = RequestUrl(this.name);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.requeriments)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); 
  
      if (data && typeof data === 'object') {
        return data;
      } else {
        throw new Error('La respuesta no contiene un objeto válido');
      }
    } catch (error) {
      console.error('Ocurrió un error:', error.message);
      return null; 
    }
  }

  
}
export default ServicesApi;