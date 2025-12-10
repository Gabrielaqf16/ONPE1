// === app.js ===


container.appendChild(c1); container.appendChild(c2); el.appendChild(container);
}


// ONPE por años
function renderOnpeYears(){
const el = $('#onpe-years'); el.innerHTML='';
const title = document.createElement('div'); title.className='section-title';
title.innerHTML = `<h2>📅 Colección ONPE por Años</h2><div class='subtitle'>Detalle por año</div>`;
el.appendChild(title);


const table = document.createElement('table'); table.className='table';
table.innerHTML = `<thead><tr><th>Año</th><th>Total</th><th>Clasif.</th><th>%</th><th>No Clasif.</th><th>%</th><th>Index.</th><th>%</th><th>No Index.</th><th>%</th></tr></thead>`;
const tbody = document.createElement('tbody');


data.onpe.serie_por_ano.forEach(row=>{
const tr = document.createElement('tr');
tr.innerHTML = `<td>${row.Año}</td><td>${row.Total_Registros_ONPE}</td><td>${row.Clasificados}</td><td>${row["%_Clasificados"]}%</td><td>${row.No_Clasificados}</td><td>${row["%_No_Clasificados"]}%</td><td>${row.Indexados}</td><td>${row["%_Indexados"]}%</td><td>${row.No_Indexados}</td><td>${row["%_No_Indexados"]}%</td>`;
tbody.appendChild(tr);
});


table.appendChild(tbody); el.appendChild(table);
}


// No ONPE
function renderNoOnpe(){
const el = $('#no-onpe'); el.innerHTML='';
const title = document.createElement('div'); title.className='section-title';
title.innerHTML = `<h2>🏢 Colección NO ONPE</h2><div class='pill blue'>Total: ${data.no_onpe.clasificacion.Total_de_registros}</div>`;
el.appendChild(title);


const container = document.createElement('div'); container.className='kv';
const it1 = document.createElement('div'); it1.className='item';
it1.innerHTML = `<h3>🗂️ Clasificación No ONPE</h3><p><strong class='green'>Clasificados:</strong> ${data.no_onpe.clasificacion.Colección_clasificada} (${data.no_onpe.clasificacion["%_Colección_clasificada"]}%)<br><strong class='red'>No Clasificados:</strong> ${data.no_onpe.clasificacion.Colección_no_clasificada} (${data.no_onpe.clasificacion["%_Colección_no_clasificada"]}%)</p>`;


const it2 = document.createElement('div'); it2.className='item';
it2.innerHTML = `<h3>🔎 Indexación No ONPE</h3><p><strong class='green'>Indexados:</strong> ${data.no_onpe.indexacion.Registros_Indexados} (${data.no_onpe.indexacion["%_Indexados"]}%)<br><strong class='red'>No Indexados:</strong> ${data.no_onpe.indexacion.Registros_No_Indexados} (${data.no_onpe.indexacion["%_No_Indexados"]}%)</p>`;


container.appendChild(it1); container.appendChild(it2); el.appendChild(container);
}


function renderNoOnpeInst(){
const el = $('#no-onpe-inst'); el.innerHTML='';
const title = document.createElement('div'); title.className='section-title';
title.innerHTML = `<h2>🏛️ Colección No ONPE por Instituciones</h2><div class='subtitle'></div>`;
el.appendChild(title);


const table = document.createElement('table'); table.className='table';
table.innerHTML = `<thead><tr><th>Institución</th><th>Total</th><th>Clasif.</th><th>%</th><th>No Clasif.</th><th>%</th><th>Index.</th><th>%</th><th>No Index.</th><th>%</th></tr></thead>`;
const tbody = document.createElement('tbody');


data.no_onpe.instituciones.forEach(row=>{
const tr = document.createElement('tr');
tr.innerHTML = `<td>${row.Institución}</td><td>${row.Total_Registros}</td><td>${row.Clasificados}</td><td>${row["%_Clasificados"]}%</td><td>${row.No_Clasificados}</td><td>${row["%_No_Clasificados"]}%</td><td>${row.Indexados}</td><td>${row["%_Indexados"]}%</td><td>${row.No_Indexados}</td><td>${row["%_No_Indexados"]}%</td>`;
tbody.appendChild(tr);
});


table.appendChild(tbody); el.appendChild(table);
}


// Init
function init(){
renderGeneral(); renderOnpe(); renderOnpeYears(); renderNoOnpe(); renderNoOnpeInst();


document.getElementById('download-json').addEventListener('click', ()=>{
const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href=url; a.download='datos.json'; a.click(); URL.revokeObjectURL(url);
});


// Quick PDF export using print
document.getElementById('export-pdf').addEventListener('click', ()=> window.print());
}


document.addEventListener('DOMContentLoaded', init);
})();
