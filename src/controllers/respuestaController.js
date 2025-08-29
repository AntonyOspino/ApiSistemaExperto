const Historial = require("../models/historialModel.js");
const Hecho = require("../models/hechoModel.js");
const Diagnostico = require("../models/DiagnosticoModel.js");
const { Rules } = require("../models/rulesModel.js");

const enviarRespuesta = async (req, res) => {
  const { ID_USUARIO, respuestas } = req.body;

  if (!respuestas || !Array.isArray(respuestas)) {
    return res.status(400).json({ error: "Las respuestas deben ser un array." });
  }

  try {
const fecha = new Date();

const options = {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

const formatter = new Intl.DateTimeFormat('es-CO', options);
const partes = formatter.formatToParts(fecha);

const year = partes.find(part => part.type === 'year').value;
const month = partes.find(part => part.type === 'month').value;
const day = partes.find(part => part.type === 'day').value;
const hour = partes.find(part => part.type === 'hour').value;
const minute = partes.find(part => part.type === 'minute').value;
const second = partes.find(part => part.type === 'second').value;

const fechaActual = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    // Paso 1: Crear historial y obtener su ID
    // El error de creación es manejado por el bloque 'catch'
    const historialId = await Historial.createHistorial({ id_usuario: ID_USUARIO, fecha: fechaActual });

    // Inicializar los hechos (facts) para el motor de reglas
    const facts = {
      "1": false, "2": false, "3": false, "4": false, "5": false
    };

    // Paso 2: Crear un array de promesas para guardar todos los hechos en paralelo
    const hechosPromesas = respuestas.map(respuesta => {
      const { id_pregunta, respuesta_valor } = respuesta;
      const valorBooleano = (respuesta_valor === true || respuesta_valor === 'true' || respuesta_valor === 1);
      facts[String(id_pregunta)] = valorBooleano;
      const hechoData = {
        ID_HISTORIAL: historialId,
        ID_PREGUNTA: id_pregunta,
        RESPUESTA: valorBooleano,
      };
      return Hecho.createHecho(hechoData);
    });

    // Esperar a que todas las inserciones de hechos se completen
    await Promise.all(hechosPromesas);

    // Paso 3: Ejecutar el motor de reglas
    console.log("Hechos para el motor de reglas:", facts);
    const ruleEngine = new Rules(facts);
    const { results: ruleResults } = await ruleEngine.run();
    console.log("Resultados del motor de reglas:", ruleResults);

    let diagnosticoId = null;
    if (ruleResults && ruleResults.length > 0) {
      diagnosticoId = ruleResults[0].event.params.id_diagnostico;
      console.log("Diagnóstico obtenido:", diagnosticoId);
    }

    const diagnostico = await Diagnostico.getDiagnosticoById(diagnosticoId);
    if (!diagnostico) {
        return res.status(404).json({ error: "No se pudo determinar el diagnóstico." });
    }

    // Paso 4: Actualizar el historial con el ID del diagnóstico
    // Los errores son manejados por el bloque 'catch'
    await Historial.updateHistorial(historialId, {
      id_usuario: ID_USUARIO,
      fecha: fechaActual,
      id_diagnostico: diagnosticoId,
    });

    // Paso 5: Retornar la respuesta final
    return res.status(201).json({
      message: "Consulta y diagnóstico procesados exitosamente.",
      historialId: historialId,
      diagnosticoId: diagnosticoId,
      diagnostico: diagnostico
    });

  } catch (err) {
    console.error("Error en el flujo de la consulta:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  enviarRespuesta,
};