async function cargarDatos() {
generarTabla("tabla-onpe-indexacion", datos.onpe.indexacion, "Indexación ONPE");


// --- 3. NO ONPE ---
generarTabla("tabla-noonpe-clasificacion", datos.no_onpe.clasificacion, "Clasificación NO ONPE");
generarTabla("tabla-noonpe-indexacion", datos.no_onpe.indexacion, "Indexación NO ONPE");
}


function generarTabla(contenedorId, objeto, titulo) {
const cont = document.getElementById(contenedorId);
let html = `<h3>${titulo}</h3><table><tr>`;


Object.keys(objeto).forEach(k => html += `<th>${k}</th>`);
html += `</tr><tr>`;
Object.values(objeto).forEach(v => html += `<td>${v}</td>`);
html += `</tr></table>`;


cont.innerHTML = html;
}


function generarGraficos(datos) {
// --- Gráfico 1: Pastel ONPE vs NO ONPE ---
const totalOnpe = datos.onpe.clasificacion.Total_registros;
const totalNoOnpe = datos.no_onpe.clasificacion.Total_de_registros;


new Chart(document.getElementById("grafico-completa"), {
type: "pie",
data: {
labels: ["Colección ONPE", "Colección NO ONPE"],
datasets: [{ data: [totalOnpe, totalNoOnpe] }]
}
});


// --- Gráfico 2: Barras horizontales ONPE ---
const o = datos.onpe;
new Chart(document.getElementById("grafico-onpe"), {
type: "bar",
data: {
labels: ["Clasificados", "No Clasificados", "Indexados", "No Indexados"],
datasets: [{
data: [
o.clasificacion.Registros_Clasificados,
o.clasificacion.Registros_No_Clasificados,
o.indexacion.Registros_Indexados,
o.indexacion.Registros_No_Indexados
]
}]
},
options: { indexAxis: "y" }
});


// --- Gráfico 3: Barras horizontales NO ONPE ---
const n = datos.no_onpe;
new Chart(document.getElementById("grafico-noonpe"), {
type: "bar",
data: {
labels: ["Clasificados", "No Clasificados", "Indexados", "No Indexados"],
datasets: [{
data: [
n.clasificacion.Colección_clasificada,
n.clasificacion.Colección_no_clasificada,
n.indexacion.Registros_Indexados,
n.indexacion.Registros_No_Indexados
]
}]
},
options: { indexAxis: "y" }
});
}


cargarDatos();
