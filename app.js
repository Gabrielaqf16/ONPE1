async function cargarDatos() {
    const response = await fetch("datos.json");
    const data = await response.json();

    render(data);
}

function crearTabla(obj) {
    let html = `<table><tr><th>Campo</th><th>Valor</th></tr>`;
    for (const key in obj) {
        html += `<tr><td>${key}</td><td>${obj[key]}</td></tr>`;
    }
    html += "</table>";
    return html;
}

function crearTablaArray(arr) {
    if (!arr.length) return "";

    let html = "<table><tr>";

    // Crear encabezados dinámicos
    Object.keys(arr[0]).forEach(k => {
        html += `<th>${k}</th>`;
    });
    html += "</tr>";

    // Filas
    arr.forEach(item => {
        html += "<tr>";
        Object.values(item).forEach(v => {
            html += `<td>${v}</td>`;
        });
        html += "</tr>";
    });

    html += "</table>";
    return html;
}

function render(data) {
    const content = document.getElementById("content");

    let html = "";

    // =====================
    //  NIVEL GENERAL
    // =====================
    html += `<section>
        <h2>1. Estadísticas Generales</h2>
        <h3>Clasificación General</h3>
        ${crearTabla(data.clasificacion)}
        
        <h3>Indexación General</h3>
        ${crearTabla(data.Indexacion)}
    </section>`;

    // =====================
    //  ONPE
    // =====================
    html += `<section>
        <h2>2. Colección ONPE</h2>

        <h3>Clasificación ONPE</h3>
        ${crearTabla(data.onpe.clasificacion)}

        <h3>Indexación ONPE</h3>
        ${crearTabla(data.onpe.indexacion)}

        <h3>Serie por Año (ONPE)</h3>
        ${crearTablaArray(data.onpe.serie_por_ano)}
    </section>`;

    // =====================
    //  NO ONPE
    // =====================
    html += `<section>
        <h2>3. Colección NO ONPE</h2>

        <h3>Clasificación</h3>
        ${crearTabla(data.no_onpe.clasificacion)}

        <h3>Indexación</h3>
        ${crearTabla(data.no_onpe.indexacion)}

        <h3>Instituciones</h3>
        ${crearTablaArray(data.no_onpe.instituciones)}
    </section>`;

    content.innerHTML = html;
}

cargarDatos();
