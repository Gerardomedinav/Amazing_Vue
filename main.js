const { createApp } = Vue

const app = createApp({
  data() {
    return {
      apiUrl: 'https://mindhub-xj03.onrender.com/api/amazing',
      amazing_Data: null,
      events: null,
      categorias: [], // Array para almacenar las categorías sin repetir
      texto: '',
      eventosAMostrar: [],// copia de eventos a mostrar
      categoriasSeleccionadas: [],// copia de event seleccionado por checkbox
      eventosFuturos: [],//eventos futuros 
      eventosPasados: [],//eventos pasados
      fechaBase: null,
      idEvento: null,
    }
  },
  created() {
    this.pedirDatos()

  },
  mounted() {

  },
  methods: {
    pedirDatos() {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(datosApi => {
          this.amazing_Data = datosApi
          this.events = datosApi.events
          //console.log(this.events)
          this.eventosAMostrar = Array.from(this.amazing_Data.events)
          //console.log(this.eventosAMostrar)
          this.obtenerCategorias() // Llamada al método para obtener las categorías sin repetir
          this.fechaBase = new Date(this.amazing_Data.currentDate);

          this.eventosFuturos = this.events.filter(evento => new Date(evento.date) > new Date(this.amazing_Data.currentDate));
          this.eventosPasados = this.events.filter(evento => new Date(evento.date) < new Date(this.amazing_Data.currentDate));

        })
        .catch(error => console.log(error.message))
    },
    obtenerCategorias(array) {
      const categoriasSet = new Set() // Set para almacenar las categorías sin repetir
      this.amazing_Data.events.forEach(evento => {
        categoriasSet.add(evento.category)
      })
      this.categorias = Array.from(categoriasSet) // Convertir el Set en un array
      localStorage.setItem('catego', JSON.stringify(this.categorias))

      //console.log(this.categorias)

    },
    verDetalles(eventoId) {

      // Cargar la página de detalles para el evento seleccionado
      window.location.assign(`details.html?id=${eventoId}`);
    }


  },
  computed: {

    superFiltro() {
      let primerFiltro = this.events.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
      if (!this.categoriasSeleccionadas.length) {
        this.eventosAMostrar = primerFiltro

      } else {
        this.eventosAMostrar = primerFiltro.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
      }
    },
    superFiltroUpcoming() {
      let primerFiltro = this.eventosFuturos.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
      if (!this.categoriasSeleccionadas.length) {
        this.eventosAMostrar = primerFiltro

      } else {
        this.eventosAMostrar = primerFiltro.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
      }
    },
    superFiltroPast() {
      let primerFiltro = this.eventosPasados.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
      if (!this.categoriasSeleccionadas.length) {
        this.eventosAMostrar = primerFiltro

      } else {
        this.eventosAMostrar = primerFiltro.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
      }
    }
  }
}).mount('#app')


