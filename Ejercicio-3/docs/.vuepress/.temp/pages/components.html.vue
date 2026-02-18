<template><div><h1 id="documentacion-de-componentes" tabindex="-1"><a class="header-anchor" href="#documentacion-de-componentes"><span>Documentación de Componentes</span></a></h1>
<h2 id="table-vue" tabindex="-1"><a class="header-anchor" href="#table-vue"><span>Table.vue</span></a></h2>
<p>Componente visual que representa una mesa en el mapa.</p>
<h3 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h3>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Tipo</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>table</code></td>
<td><code v-pre>Table</code></td>
<td>Objeto con datos de la mesa (id, label, capacity, position).</td>
</tr>
<tr>
<td><code v-pre>status</code></td>
<td><code v-pre>'free' | 'occupied' | 'selected'</code></td>
<td>Estado visual de la mesa.</td>
</tr>
</tbody>
</table>
<h3 id="eventos" tabindex="-1"><a class="header-anchor" href="#eventos"><span>Eventos</span></a></h3>
<ul>
<li><code v-pre>click(id: number)</code>: Se emite al hacer clic en la mesa (incluso si está ocupada, aunque la lógica padre puede ignorarlo).</li>
</ul>
<h3 id="accesibilidad" tabindex="-1"><a class="header-anchor" href="#accesibilidad"><span>Accesibilidad</span></a></h3>
<ul>
<li>Renderiza un <code v-pre>&lt;button&gt;</code>.</li>
<li>Usa <code v-pre>aria-label</code> dinámico describiendo estado y capacidad.</li>
<li><code v-pre>aria-disabled=&quot;true&quot;</code> si el estado es <code v-pre>occupied</code>.</li>
</ul>
<hr>
<h2 id="reservationform-vue" tabindex="-1"><a class="header-anchor" href="#reservationform-vue"><span>ReservationForm.vue</span></a></h2>
<p>Formulario para crear una nueva reserva.</p>
<h3 id="props-1" tabindex="-1"><a class="header-anchor" href="#props-1"><span>Props</span></a></h3>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Tipo</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>selectedTable</code></td>
<td><code v-pre>Table</code></td>
<td>La mesa que se está intentando reservar.</td>
</tr>
</tbody>
</table>
<h3 id="eventos-1" tabindex="-1"><a class="header-anchor" href="#eventos-1"><span>Eventos</span></a></h3>
<ul>
<li><code v-pre>submit(payload)</code>: Se emite cuando el formulario es válido y se envía.
<ul>
<li><code v-pre>payload</code>: <code v-pre>{ customerName: string, email: string, peopleCount: number }</code></li>
</ul>
</li>
</ul>
<h3 id="validaciones" tabindex="-1"><a class="header-anchor" href="#validaciones"><span>Validaciones</span></a></h3>
<ul>
<li><strong>Nombre/Email</strong>: Requeridos. Formato de email simple.</li>
<li><strong>Comensales</strong>: Debe ser &gt; 0 y &lt;= <code v-pre>selectedTable.capacity</code>.</li>
</ul>
</div></template>


