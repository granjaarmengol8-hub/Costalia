
(function(){
"use strict";
const root=document.getElementById("costaliaStudio");
if(!root)return;
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const EUR=n=>new Intl.NumberFormat(locale==="ca"?"ca-ES":locale==="en"?"en-IE":"es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
const N=n=>Number(n);
const int=(v,lo,hi)=>Number.isFinite(N(v))&&N(v)>=lo&&N(v)<=hi;
const clone=x=>JSON.parse(JSON.stringify(x));
const localized={
es:{search:"¿Qué quieres calcular?",searchHint:"Escribe una compra (por ejemplo, iPhone 16, BMW Serie 3 o lavadora) y Costalia te sugerirá una categoría. No consulta precios ni inventa fichas de productos.",searchBtn:"Preparar cálculo",cat:"Categoría",mode:"Modo de cálculo",quick:"Rápido",advanced:"Avanzado",quickHint:"En modo rápido se ocultan ajustes adicionales; se siguen usando los supuestos que aparecen en modo avanzado. Revisa los importes antes de decidir.",period:"Años",scenario:"Escenario",normal:"Normal",low:"Optimista",high:"Pesimista",options:"Alternativas para comparar",addOption:"+ Añadir opción",option:"Opción",remove:"Eliminar",price:"Precio inicial (€)",residual:"Valor de reventa al final (€)",deprec:"Depreciación anual (%)",annual:"Uso anual (km)",cons:"Consumo",fuelPrice:"Precio energía (€/unidad)",power:"Motorización",petrol:"Gasolina",diesel:"Diésel",electric:"Eléctrico",down:"Entrada (€)",apr:"Interés nominal TIN (%)",term:"Plazo préstamo (meses)",uses:"Usos al año",expense:"Gasto",value:"Importe (€)",frequency:"Frecuencia",month:"Mensual",year:"Anual",once:"Una vez",use:"Por uso",addExpense:"+ Añadir gasto",estimate:"Calcular costes",results:"Resultados de la comparación",cheapest:"Menor coste económico estimado",difference:"Diferencia entre mejor y peor opción",economic:"Coste económico total",monthly:"Media económica / mes",cash:"Desembolso habitual / mes",valueEnd:"Valor final estimado",loss:"Depreciación o inversión no recuperada",running:"Gastos de uso",interest:"Intereses del préstamo",chart:"¿Dónde se va el dinero?",yearly:"Evolución de costes acumulados",breakEven:"¿Cuándo cambia la opción más económica?",cross:"Según estos supuestos, la opción más barata cambia en el año",noCross:"No hay cambio de opción más económica durante este periodo.",note:"Estimaciones basadas en tus datos y supuestos editables; sin precios en directo, inflación ni comisiones financieras. El valor final y los gastos reales pueden variar.",print:"Informe PDF / imprimir",share:"Compartir enlace",image:"Guardar tarjeta visual",copy:"Copiar resumen",save:"Guardar simulación",saved:"Mis simulaciones",savedHint:"Se guardan únicamente en este navegador. No requieren cuenta.",load:"Abrir",delete:"Borrar",clear:"Sin simulaciones guardadas.",budget:"¿Me lo puedo permitir?",income:"Ingresos mensuales netos (€)",fixed:"Gastos fijos al mes (€)",buffer:"Margen deseado al mes (€)",budgetResult:"Desembolso mensual frente a tu margen disponible",budgetExplain:"Es una orientación, no una recomendación de crédito ni una garantía de capacidad de pago. La entrada inicial y gastos puntuales necesitan ahorro adicional.",missing:"Completa el precio y los costes que conozcas. Los datos son ejemplos editables, nunca cotizaciones verificadas.",warn:"Revisa los importes: deben ser números no negativos; el valor residual y la entrada no pueden superar el precio y un préstamo necesita un plazo.",savedOK:"Simulación guardada en este dispositivo.",copied:"Enlace copiado.",namePrompt:"Nombre de la simulación",reportTitle:"Informe de estimación — Costalia",noLive:"Sin consulta de precios en tiempo real.",more:"Detalles",restore:"Restablecer",help:"Cómo funciona",example:"Datos iniciales de ejemplo, no precios reales.",title:"Calculadora universal de costes",monthPayment:"Cuota de financiación durante el préstamo",yearTable:"Año",totals:"Coste acumulado",compare:"Comparar",financial:"Financiación",extras:"Otros gastos",lineItem:"Concepto",how:"Se calcula compra menos reventa, más gastos de uso e intereses devengados. No se suma dos veces el capital prestado.",resultsHint:"Los valores iniciales son ejemplos ilustrativos y deben verificarse.",savedOne:"Simulaciones guardadas en tu dispositivo",searchFound:"Categoría sugerida. Introduce tus propios importes: no hemos obtenido el precio del producto.",start:"Empezar con esta categoría",openGuide:"Ver guía",unitL:"l/100 km",unitK:"kWh/100 km",resetConfirm:"¿Restablecer los valores de ejemplo de esta categoría?"},
ca:{search:"Què vols calcular?",searchHint:"Escriu una compra (per exemple, iPhone 16, BMW Sèrie 3 o rentadora). Costalia et suggerirà una categoria, sense inventar preus ni consultar fitxes.",searchBtn:"Prepara el càlcul",cat:"Categoria",mode:"Mode de càlcul",quick:"Ràpid",advanced:"Avançat",quickHint:"El mode ràpid amaga ajustos addicionals; els supòsits avançats continuen aplicant-se. Revisa'ls abans de decidir.",period:"Anys",scenario:"Escenari",normal:"Normal",low:"Optimista",high:"Pessimista",options:"Alternatives per comparar",addOption:"+ Afegeix opció",option:"Opció",remove:"Elimina",price:"Preu inicial (€)",residual:"Valor de revenda final (€)",deprec:"Depreciació anual (%)",annual:"Ús anual (km)",cons:"Consum",fuelPrice:"Preu energia (€/unitat)",power:"Motorització",petrol:"Gasolina",diesel:"Dièsel",electric:"Elèctric",down:"Entrada (€)",apr:"Interès nominal TIN (%)",term:"Termini préstec (mesos)",uses:"Usos anuals",expense:"Despesa",value:"Import (€)",frequency:"Freqüència",month:"Mensual",year:"Anual",once:"Una vegada",use:"Per ús",addExpense:"+ Afegeix despesa",estimate:"Calcula costos",results:"Resultats de la comparació",cheapest:"Menor cost econòmic estimat",difference:"Diferència entre millor i pitjor opció",economic:"Cost econòmic total",monthly:"Mitjana econòmica / mes",cash:"Desemborsament habitual / mes",valueEnd:"Valor final estimat",loss:"Depreciació o inversió no recuperada",running:"Despeses d'ús",interest:"Interessos del préstec",chart:"On van els diners?",yearly:"Evolució de costos acumulats",breakEven:"Quan canvia l'opció més econòmica?",cross:"Segons aquests supòsits, l'opció més econòmica canvia a l'any",noCross:"No canvia l'opció més econòmica durant aquest període.",note:"Estimacions basades en les teves dades; sense preus en directe, inflació ni comissions financeres. El valor final i les despeses reals poden variar.",print:"Informe PDF / imprimeix",share:"Comparteix l'enllaç",image:"Desa targeta visual",copy:"Copia el resum",save:"Desa simulació",saved:"Les meves simulacions",savedHint:"Només es desen en aquest navegador, sense compte.",load:"Obre",delete:"Esborra",clear:"Encara no hi ha simulacions.",budget:"M'ho puc permetre?",income:"Ingressos nets mensuals (€)",fixed:"Despeses fixes al mes (€)",buffer:"Marge desitjat al mes (€)",budgetResult:"Desemborsament mensual respecte al marge disponible",budgetExplain:"Només és orientatiu, no una recomanació de crèdit ni garantia de capacitat de pagament. L'entrada inicial requereix estalvis addicionals.",missing:"Completa els preus i despeses que coneguis. Els valors són exemples editables, no pressupostos verificats.",warn:"Revisa els imports: no poden ser negatius; la revenda i l'entrada no poden superar el preu i els préstecs necessiten termini.",savedOK:"Simulació desada en aquest dispositiu.",copied:"Enllaç copiat.",namePrompt:"Nom de la simulació",reportTitle:"Informe d'estimació — Costalia",noLive:"Sense consultar preus en temps real.",more:"Detalls",restore:"Restaura",help:"Com funciona",example:"Dades inicials d'exemple, no preus reals.",title:"Calculadora universal de costos",monthPayment:"Quota de finançament mentre dura el préstec",yearTable:"Any",totals:"Cost acumulat",compare:"Compara",financial:"Finançament",extras:"Altres despeses",lineItem:"Concepte",how:"Compra menys revenda, més despeses d'ús i interessos meritats. No es duplica el capital prestat.",resultsHint:"Els valors inicials són exemples il·lustratius i s'han de verificar.",savedOne:"Simulacions desades al dispositiu",searchFound:"Categoria suggerida. Introdueix imports propis: no hem consultat el preu del producte.",start:"Comença amb aquesta categoria",openGuide:"Veure guia",unitL:"l/100 km",unitK:"kWh/100 km",resetConfirm:"Restaurar els valors d'exemple d'aquesta categoria?"},
en:{search:"What would you like to calculate?",searchHint:"Type a purchase (such as iPhone 16, BMW 3 Series or washing machine). Costalia suggests a category, without inventing product prices or specs.",searchBtn:"Prepare estimate",cat:"Category",mode:"Calculator mode",quick:"Quick",advanced:"Advanced",quickHint:"Quick mode hides advanced inputs, but their assumptions still apply. Review all values before deciding.",period:"Years",scenario:"Scenario",normal:"Normal",low:"Optimistic",high:"Pessimistic",options:"Options to compare",addOption:"+ Add option",option:"Option",remove:"Remove",price:"Upfront price (€)",residual:"Estimated resale at end (€)",deprec:"Annual depreciation (%)",annual:"Annual use (km)",cons:"Consumption",fuelPrice:"Energy cost (€/unit)",power:"Powertrain",petrol:"Petrol",diesel:"Diesel",electric:"Electric",down:"Down payment (€)",apr:"Nominal annual interest (%)",term:"Loan term (months)",uses:"Uses per year",expense:"Expense",value:"Amount (€)",frequency:"Frequency",month:"Monthly",year:"Yearly",once:"One-time",use:"Per use",addExpense:"+ Add expense",estimate:"Calculate costs",results:"Comparison results",cheapest:"Lowest estimated economic cost",difference:"Difference between least and most expensive",economic:"Total economic cost",monthly:"Average economic cost / month",cash:"Typical cash outflow / month",valueEnd:"Estimated residual value",loss:"Depreciation or unrecovered investment",running:"Running costs",interest:"Loan interest",chart:"Where does the money go?",yearly:"Cumulative cost by year",breakEven:"When does the cheapest option change?",cross:"Based on these assumptions, the cheapest option changes in year",noCross:"The lowest-cost option does not change during this period.",note:"Estimates based on editable inputs; no live prices, inflation or loan fees. Actual residual values and costs can vary.",print:"PDF report / print",share:"Share link",image:"Save visual card",copy:"Copy summary",save:"Save simulation",saved:"My simulations",savedHint:"Saved only in this browser. No account needed.",load:"Open",delete:"Delete",clear:"No saved simulations yet.",budget:"Can I afford it?",income:"Monthly net income (€)",fixed:"Monthly fixed expenses (€)",buffer:"Desired monthly buffer (€)",budgetResult:"Monthly cash outflow against available budget",budgetExplain:"Only indicative; not credit advice or a guarantee of affordability. Down payments and one-time expenses require separate savings.",missing:"Enter prices and costs you know. Defaults are editable examples, never verified quotations.",warn:"Check your inputs: no negative amounts; residual value and down payment cannot exceed price, and loans need a term.",savedOK:"Saved on this device.",copied:"Link copied.",namePrompt:"Simulation name",reportTitle:"Estimated cost report — Costalia",noLive:"No live price retrieval.",more:"Details",restore:"Reset",help:"How it works",example:"Illustrative defaults, not live prices.",title:"Universal cost calculator",monthPayment:"Loan instalment while the loan is active",yearTable:"Year",totals:"Cumulative cost",compare:"Compare",financial:"Financing",extras:"Other costs",lineItem:"Expense",how:"Purchase less resale, plus running costs and accrued interest. Loan principal is not counted twice.",resultsHint:"Starting values are illustrative and need verification.",savedOne:"Simulations stored on your device",searchFound:"Suggested category. Enter your own numbers; no price has been retrieved for the named product.",start:"Start with this category",openGuide:"View guide",unitL:"l/100 km",unitK:"kWh/100 km",resetConfirm:"Reset to illustrative category defaults?"}
};
const cats=["car","motorcycle","bicycle","escooter","home","rental","appliance","phone","computer","machinery","solar","subscription","other"];
const names={es:["Coche","Moto","Bicicleta","Patinete eléctrico","Compra de vivienda","Alquiler de vivienda","Electrodoméstico","Móvil o tablet","Ordenador","Maquinaria","Paneles solares","Suscripción","Otro / personalizado"],ca:["Cotxe","Moto","Bicicleta","Patinet elèctric","Compra d'habitatge","Lloguer d'habitatge","Electrodomèstic","Mòbil o tauleta","Ordinador","Maquinària","Plaques solars","Subscripció","Altres / personalitzat"],en:["Car","Motorcycle","Bicycle","Electric scooter","Home purchase","Home rental","Appliance","Phone or tablet","Computer","Machinery","Solar panels","Subscription","Other / custom"]};
const expenseDefaults={
car:[["Seguro",480,"year"],["Mantenimiento",500,"year"],["Impuestos e ITV",150,"year"],["Reparaciones",250,"year"],["Aparcamiento",0,"month"]],
motorcycle:[["Seguro",300,"year"],["Mantenimiento",270,"year"],["Impuestos",70,"year"],["Neumáticos",160,"year"]],
bicycle:[["Mantenimiento",160,"year"],["Cubiertas y transmisión",100,"year"],["Accesorios",40,"year"]],
escooter:[["Mantenimiento",60,"year"],["Batería (reserva)",45,"year"]],
home:[["Impuestos de compra",7000,"once"],["Notaría y registro",1800,"once"],["Comunidad",75,"month"],["IBI",400,"year"],["Mantenimiento",900,"year"],["Electricidad y agua",130,"month"]],
rental:[["Alquiler",850,"month"],["Suministros",130,"month"],["Seguro",130,"year"],["Mudanza",450,"once"]],
appliance:[["Electricidad",80,"year"],["Reparaciones",40,"year"],["Instalación",40,"once"]],
phone:[["Tarifa móvil",15,"month"],["Cambio de batería",80,"once"],["Accesorios",25,"once"]],
computer:[["Electricidad",25,"year"],["Software",90,"year"],["Reparaciones",70,"year"]],
machinery:[["Mantenimiento",250,"year"],["Consumibles",120,"year"],["Seguro",80,"year"]],
solar:[["Mantenimiento",130,"year"],["Inversor (reserva)",100,"year"]],
subscription:[["Cuota",15,"month"],["Alta",0,"once"]],
other:[["Mantenimiento",60,"year"]]
};
const initialPrices={car:12000,motorcycle:4000,bicycle:800,escooter:450,home:150000,rental:0,appliance:600,phone:650,computer:900,machinery:3000,solar:6000,subscription:0,other:1000};
const motorCats=["car","motorcycle","escooter"];
let locale=$("lang").value||"es";
const t=k=>localized[locale][k]||k;
const motor=cat=>motorCats.includes(cat);
function fresh(cat,index){
const price=initialPrices[cat]||0;
return {name:names[locale][cats.indexOf(cat)]+" "+(index+1),price,method:"petrol",km:cat==="car"?12000:cat==="motorcycle"?5000:cat==="escooter"?1200:0,cons:cat==="escooter"?3:cat==="motorcycle"?4:6,unitPrice:1.6,deprec:cat==="car"?10:cat==="motorcycle"?12:cat==="escooter"?18:15,resale:cat==="home"?price:0,down:price,apr:0,term:0,uses:12,expenses:(expenseDefaults[cat]||expenseDefaults.other).map(x=>({name:x[0],amount:x[1],frequency:x[2]})),needsPrice:false};
}
let state={cat:"car",years:5,scenario:"normal",mode:"quick",options:[fresh("car",0),fresh("car",1)],budget:{income:0,fixed:0,buffer:0}};
state.options[1].price=15000;state.options[1].down=15000;state.options[1].cons=5;
function validOption(o){
const nums=["price","km","cons","unitPrice","deprec","resale","down","apr","term","uses"];
if(nums.some(k=>!int(o[k],0,k==="term"?1200:k==="deprec"||k==="apr"?100:1000000000)))return false;
if(o.down>o.price||o.resale>o.price||o.price>o.down&&o.term===0)return false;
return Array.isArray(o.expenses)&&o.expenses.length<=100&&o.expenses.every(e=>typeof e.name==="string"&&e.name.length<=160&&int(e.amount,0,1e9)&&["once","year","month","use"].includes(e.frequency));
}
function validateState(a){return a&&cats.includes(a.cat)&&[3,5,10].includes(a.years)&&["normal","low","high"].includes(a.scenario)&&["quick","advanced"].includes(a.mode)&&Array.isArray(a.options)&&a.options.length>=1&&a.options.length<=4&&a.options.every(validOption)&&a.budget&&["income","fixed","buffer"].every(k=>int(a.budget[k],0,1e9));}
function financing(o,years){
const borrowed=o.price-o.down,r=o.apr/1200,term=o.term,months=years*12;
if(borrowed===0)return {interest:0,payment:0,outstanding:0};
const payment=r===0?borrowed/term:borrowed*r/(1-Math.pow(1+r,-term));
let balance=borrowed,interest=0;
for(let i=0;i<Math.min(months,term);i++){const due=balance*r;interest+=due;balance=Math.max(0,balance-(payment-due));}
return {interest,payment,outstanding:balance};
}
function calculate(o,years){
if(!validOption(o))throw Error("inputs");
const factor={low:.85,normal:1,high:1.2}[state.scenario];
const interest=financing(o,years).interest;
const onetime=o.expenses.filter(e=>e.frequency==="once").reduce((a,e)=>a+e.amount,0);
const recurring=o.expenses.filter(e=>e.frequency!=="once").map(e=>({name:e.name,value:e.amount*(e.frequency==="month"?12*years:e.frequency==="year"?years:o.uses*years)*factor}));
const expense=onetime+recurring.reduce((a,e)=>a+e.value,0);
const energy=motor(state.cat)?o.km*o.cons/100*o.unitPrice*years*factor:0;
const residual=state.cat==="home"?o.resale:state.cat==="rental"||state.cat==="subscription"?0:o.price*Math.pow(1-Math.min(100,o.deprec*factor)/100,years);
const loss=o.price-residual;
const total=loss+expense+energy+interest;
const cash=(expense+energy)/(12*years)+financing(o,years).payment;
return {loss,expense,energy,interest,total,monthly:total/(years*12),cash,residual,recurring,onetime,payment:financing(o,years).payment};
}
function allResults(){return state.options.map(o=>calculate(o,state.years));}
function field(label,path,value,opts){opts=opts||{};const isSelect=opts.options;let html='<div class="cs-field'+(opts.wide?' cs-full':'')+'"><label>'+esc(label)+'</label>';
if(isSelect)html+='<select data-path="'+esc(path)+'">'+opts.options.map(x=>'<option value="'+esc(x[0])+'"'+(String(value)===String(x[0])?' selected':'')+'>'+esc(x[1])+'</option>').join("")+'</select>';
else html+='<input '+(opts.type?'type="'+opts.type+'"':'type="number" min="0" step="any"')+' data-path="'+esc(path)+'" value="'+esc(value)+'" '+(opts.placeholder?'placeholder="'+esc(opts.placeholder)+'"':'')+'>';
return html+'</div>';}
function categoryOptions(){return cats.map((id,i)=>'<option value="'+id+'"'+(id===state.cat?' selected':'')+'>'+names[locale][i]+'</option>').join("")}
function renderTop(){
$("cs-main").innerHTML='<div class="cs-panel cs-edit" id="cs-search-panel"><h2 class="cs-title">'+t("search")+'</h2><p class="cs-sub">'+t("searchHint")+'</p><div class="cs-search"><input id="cs-find" aria-label="'+t("search")+'" placeholder="iPhone 16 · BMW Serie 3 · Lavadora" type="search"><button class="cs-btn" data-action="find">'+t("searchBtn")+'</button></div><p class="cs-toast" id="cs-search-message"></p></div>'+
'<div class="cs-panel cs-edit"><div class="cs-fields">'+field(t("cat"),"cat",state.cat,{options:cats.map((c,i)=>[c,names[locale][i]])})+field(t("mode"),"mode",state.mode,{options:[["quick",t("quick")],["advanced",t("advanced")]]})+'</div>'+
'<div class="cs-section"><label>'+t("period")+'</label><div class="cs-controls">'+[3,5,10].map(y=>'<button class="cs-btn secondary '+(state.years===y?'cs-selected':'')+'" data-action="years" data-value="'+y+'">'+y+'</button>').join("")+'</div></div>'+
'<div class="cs-section"><label>'+t("scenario")+'</label><div class="cs-controls">'+["low","normal","high"].map(k=>'<button class="cs-btn secondary '+(state.scenario===k?'cs-selected':'')+'" data-action="scenario" data-value="'+k+'">'+t(k)+'</button>').join("")+'</div></div><p class="cs-sub">'+t("quickHint")+'</p></div>'+
'<div class="cs-panel cs-edit"><div class="cs-top"><div><h2>'+t("options")+'</h2><p class="cs-sub">'+t("example")+'</p></div><button class="cs-btn secondary" data-action="add" '+(state.options.length>=4?'disabled':'')+'>'+t("addOption")+' ('+state.options.length+'/4)</button></div><div class="cs-grid" id="cs-option-forms"></div></div>'+
'<div class="cs-panel cs-edit"><div class="cs-actions"><button class="cs-btn" data-action="recalc">'+t("estimate")+'</button><button class="cs-btn secondary" data-action="reset">'+t("restore")+'</button><a href="#guide" class="cs-btn secondary" style="text-decoration:none">'+t("openGuide")+'</a></div></div>'+
'<section class="cs-section" id="cs-results"></section>'+
'<div class="cs-panel cs-edit" id="cs-budget-panel"><h2>'+t("budget")+'</h2><p class="cs-sub">'+t("budgetExplain")+'</p><div class="cs-budget">'+["income","fixed","buffer"].map(k=>field(t(k),"budget."+k,state.budget[k])).join("")+'</div><div id="cs-budget-result" class="cs-helper" style="margin-top:16px"></div></div>'+
'<div class="cs-panel cs-edit" id="cs-saved-panel"><div class="cs-top"><div><h2>'+t("saved")+'</h2><p class="cs-sub">'+t("savedHint")+'</p></div><button class="cs-btn secondary" data-action="save">'+t("save")+'</button></div><div id="cs-saved-list"></div></div>';
renderOptions();renderResults();renderSaved();
}
function renderOptions(){
const box=$("cs-option-forms");if(!box)return;
box.innerHTML=state.options.map((o,i)=>{
let content='<div class="cs-option"><div class="cs-option-head"><h3>'+t("option")+' '+(i+1)+'</h3>'+(state.options.length>1?'<button class="cs-btn danger" data-action="remove" data-value="'+i+'">'+t("remove")+'</button>':'')+'</div>';
content+=field(t("name")||"Nombre","options."+i+".name",o.name,{type:'text',wide:true});
content+='<div class="cs-fields">'+field(t("price"),"options."+i+".price",o.price);
if(state.mode==="advanced"&&motor(state.cat)){
content+=field(t("power"),"options."+i+".method",o.method,{options:[["petrol",t("petrol")],["diesel",t("diesel")],["electric",t("electric")]]});
content+=field(t("annual"),"options."+i+".km",o.km);
content+=field(t("cons")+' ('+(o.method==="electric"?t("unitK"):t("unitL"))+')',"options."+i+".cons",o.cons);
content+=field(t("fuelPrice"),"options."+i+".unitPrice",o.unitPrice);
}
if(!motor(state.cat)&&state.mode==="advanced")content+=field(t("uses"),"options."+i+".uses",o.uses);
if(state.mode==="advanced"){
if(state.cat==="home")content+=field(t("residual"),"options."+i+".resale",o.resale);
else if(state.cat!=="rental"&&state.cat!=="subscription")content+=field(t("deprec"),"options."+i+".deprec",o.deprec);
content+=field(t("down"),"options."+i+".down",o.down)+field(t("apr"),"options."+i+".apr",o.apr)+field(t("term"),"options."+i+".term",o.term);
}
content+='</div><div class="cs-section"><div class="cs-top"><b>'+t("extras")+'</b><button class="cs-btn secondary" data-action="addExpense" data-value="'+i+'">'+t("addExpense")+'</button></div>';
const expenses=state.mode==="quick"?o.expenses.slice(0,2):o.expenses;
content+=expenses.map((e,j)=>'<div class="cs-expense">'+field(t("lineItem"),"options."+i+".expenses."+j+".name",e.name,{type:"text"})+field(t("value"),"options."+i+".expenses."+j+".amount",e.amount)+field(t("frequency"),"options."+i+".expenses."+j+".frequency",e.frequency,{options:["once","month","year","use"].map(k=>[k,t(k)])})+'<button class="cs-btn danger" aria-label="'+t("remove")+'" data-action="removeExpense" data-value="'+i+":"+j+'">×</button></div>').join("");
content+='</div></div>';return content;
}).join("");
}
function renderResults(){
const area=$("cs-results");if(!area)return;
let data;try{data=allResults()}catch(e){area.innerHTML='<div class="cs-alert">'+t("warn")+'</div>';return;}
let sorted=data.map((r,i)=>({i,total:r.total})).sort((a,b)=>a.total-b.total),best=sorted[0].i,worst=sorted[sorted.length-1].i,difference=data[worst].total-data[best].total;
let html='<div class="cs-panel"><h2>'+t("results")+'</h2><p class="cs-sub">'+t("resultsHint")+'</p><div class="cs-resultlead"><span>'+t("cheapest")+'</span><strong>'+esc(state.options[best].name)+' · '+EUR(data[best].total)+'</strong><small>'+t("difference")+': '+EUR(difference)+'</small></div>';
html+='<div class="cs-four">'+data.map((r,i)=>'<article class="cs-option '+(i===best?'winner':'')+'"><div class="cs-option-head"><h3>'+esc(state.options[i].name)+'</h3>'+(i===best?'<span class="cs-tag">✓</span>':'')+'</div><div class="cs-stack"><div class="cs-stat"><span>'+t("economic")+'</span><b>'+EUR(r.total)+'</b></div><div class="cs-stat"><span>'+t("monthly")+'</span><b>'+EUR(r.monthly)+'</b></div></div><div class="cs-breakdown"><div class="cs-row"><span>'+t("cash")+'</span><b>'+EUR(r.cash)+'</b></div><div class="cs-row"><span>'+t("valueEnd")+'</span><b>'+EUR(r.residual)+'</b></div><div class="cs-row"><span>'+t("loss")+'</span><b>'+EUR(r.loss)+'</b></div><div class="cs-row"><span>'+t("running")+'</span><b>'+EUR(r.expense+r.energy)+'</b></div><div class="cs-row"><span>'+t("interest")+'</span><b>'+EUR(r.interest)+'</b></div></div>'+stackedBar(r)+'</article>').join("")+'</div><p class="cs-sub">'+t("how")+'</p></div>';
html+='<div class="cs-panel"><h2>'+t("yearly")+'</h2>'+renderTimeline()+'<h3>'+t("breakEven")+'</h3><p class="cs-sub">'+breakEven()+'</p><p class="cs-sub">'+t("note")+'</p></div>';
html+='<div class="cs-panel cs-edit"><div class="cs-actions"><button class="cs-btn" data-action="print">'+t("print")+'</button><button class="cs-btn secondary" data-action="share">'+t("share")+'</button><button class="cs-btn secondary" data-action="visual">'+t("image")+'</button><button class="cs-btn secondary" data-action="copy">'+t("copy")+'</button></div><p class="cs-toast" id="cs-action-note"></p></div>';
area.innerHTML=html;renderBudget();
}
const barColors=["#729b87","#b4cbb8","#d6b991","#738d9a"];
function stackedBar(r){const nums=[r.loss,r.expense,r.energy,r.interest],sum=nums.reduce((a,b)=>a+b,0);return '<div class="cs-chart" aria-label="'+t("chart")+'">'+nums.map((n,i)=>'<span style="width:'+(sum>0?100*n/sum:0)+'%;background:'+barColors[i]+'"></span>').join("")+'</div>';}
function renderTimeline(){
let data=state.options.map(o=>[0,1,2,3,4,5,6,7,8,9,10].slice(1,state.years+1).map(y=>calculate(o,y).total));
const max=Math.max(1,...data.flat()),w=860,h=250,pad=35,plotW=w-pad*2,plotH=h-60;
const lines=[.25,.5,.75,1].map(tick=>'<line x1="'+pad+'" x2="'+(w-pad)+'" y1="'+(h-35-tick*plotH)+'" y2="'+(h-35-tick*plotH)+'" stroke="#e2ebe4" stroke-dasharray="3 5"/>').join("");
const colors=["#27785e","#bc9662","#687fa1","#97739b"];
const paths=data.map((row,i)=>'<polyline fill="none" stroke="'+colors[i]+'" stroke-width="3.5" stroke-linejoin="round" points="'+row.map((v,j)=>(pad+j*plotW/Math.max(1,state.years-1))+','+(h-35-v/max*plotH)).join(" ")+'"/>').join("");
const labels=Array.from({length:state.years},(_,i)=>'<text x="'+(pad+i*plotW/Math.max(1,state.years-1))+'" y="'+(h-7)+'" text-anchor="middle" fill="#789084" font-size="13">'+(i+1)+'</text>').join("");
const legend=state.options.map((o,i)=>'<span style="display:inline-flex;gap:6px;align-items:center;margin:8px 14px 0 0;font-size:12px"><i style="display:inline-block;width:13px;height:13px;border-radius:4px;background:'+colors[i]+'"></i>'+esc(o.name)+'</span>').join("");
let table='<div class="cs-timeline"><table class="cs-table"><thead><tr><th>'+t("yearTable")+'</th>'+state.options.map(o=>'<th>'+esc(o.name)+'</th>').join("")+'</tr></thead><tbody>'+Array.from({length:state.years},(_,y)=>'<tr><td>'+(y+1)+'</td>'+data.map(row=>'<td>'+EUR(row[y])+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>';
return '<div class="cs-timeline"><svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+t("yearly")+'">'+lines+paths+labels+'</svg></div><div>'+legend+'</div><details style="margin-top:16px"><summary>'+t("more")+'</summary>'+table+'</details>';
}
function breakEven(){
if(state.options.length<2)return t("noCross");
let last=null,crossYear=null;for(let y=1;y<=state.years;y++){const totals=state.options.map(o=>calculate(o,y).total);const winner=totals.indexOf(Math.min(...totals));if(last!==null&&last!==winner){crossYear=y;break;}last=winner;}
return crossYear===null?t("noCross"):t("cross")+" "+crossYear+".";
}
function renderBudget(){
const box=$("cs-budget-result");if(!box)return;
try{const data=allResults();const available=state.budget.income-state.budget.fixed-state.budget.buffer,monthly=Math.min(...data.map(x=>x.cash));const ratio=available>0?100*monthly/available:0;
box.textContent=t("budgetResult")+": "+EUR(monthly)+" / "+EUR(Math.max(0,available))+" ("+(available>0?Math.round(ratio)+"%":"—")+"). "+t("budgetExplain");
}catch(e){box.textContent=t("warn");}
}
function findCategory(q){
q=q.toLowerCase();
const rules=[
["home",/piso|vivienda|casa|apartament|house|hipoteca|mortgage|habitatge/],
["rental",/alquiler|arrendamiento|rent|lloguer/],
["motorcycle",/moto|motorbike|scooter 125|yamaha mt|kawasaki|honda cb/],
["escooter",/patinete|patinet|electric scooter|xiaomi scooter/],
["bicycle",/bicicleta|bici|bike|canyon|specialized|trek|orbea/],
["car",/coche|carro|auto|car |bmw|audi|tesla|mercedes|seat |cupra|renault|peugeot|volkswagen|toyota|ford|hyundai/],
["phone",/iphone|móvil|mobil|smartphone|teléfono|telefon|samsung galaxy|pixel |tablet|ipad/],
["computer",/ordenador|computer|portátil|portatil|laptop|macbook|imac|pc gaming/],
["appliance",/lavadora|washing|nevera|frigorífico|frigorific|secadora|dishwasher|lavavajillas|televisor|tv |horno/],
["machinery",/tractor|maquinaria|máquina|maquina|herramienta|tool|excavadora/],
["solar",/placa solar|panel solar|fotovoltaic|solar panel/],
["subscription",/suscripción|subscription|netflix|spotify|disney\+|prime video|gimnasio/]
];
return (rules.find(x=>x[1].test(q))||["other"])[0];
}
function applySearch(){
const q=$("cs-find").value.trim().slice(0,90);if(!q)return;
const category=findCategory(q);
state.cat=category;state.options=[fresh(category,0),fresh(category,1)];
state.options[0].name=q;state.options[0].price=0;state.options[0].down=0;state.options[0].resale=0;state.options[0].needsPrice=true;
state.mode="advanced";
renderTop();$("cs-search-message").textContent=t("searchFound");
}
function renderSaved(){
const div=$("cs-saved-list");if(!div)return;
const entries=getSaved();div.innerHTML=entries.length?entries.map((entry,i)=>'<div class="cs-row"><span>'+esc(entry.name)+' <small style="color:#769080">'+esc(entry.date)+'</small></span><span class="cs-controls"><button class="cs-btn secondary" data-action="load" data-value="'+i+'">'+t("load")+'</button><button class="cs-btn danger" data-action="delete" data-value="'+i+'">'+t("delete")+'</button></span></div>').join(""):'<p class="cs-empty">'+t("clear")+'</p>';
}
const storageKey="costalia.saved.v1";
function getSaved(){try{const x=JSON.parse(localStorage.getItem(storageKey)||"[]");return Array.isArray(x)?x.filter(e=>e&&validateState(e.state)&&typeof e.name==="string").slice(0,30):[]}catch(e){return []}}
function putSaved(entries){try{localStorage.setItem(storageKey,JSON.stringify(entries.slice(0,30)));return true}catch(e){return false}}
function shareUrl(){const url=new URL(location.href);url.searchParams.delete("state");url.searchParams.delete("general");url.searchParams.set("v2",JSON.stringify(state));return url.toString();}
function shareSummary(){return state.options.map((o,i)=>o.name+": "+EUR(allResults()[i].total)+" / "+state.years+" "+t("period")).join("\n")+"\n"+t("noLive");}
function cardImage(){
const data=allResults(),best=data.indexOf(Math.min(...data.map(x=>x.total)));
const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1080;const ctx=canvas.getContext("2d");
ctx.fillStyle="#f1f5ef";ctx.fillRect(0,0,1080,1080);
ctx.fillStyle="#205d4d";ctx.font="bold 54px Arial";ctx.fillText("costalia",85,120);
ctx.fillStyle="#193c32";ctx.font="bold 57px Arial";ctx.fillText(t("results"),85,250);
ctx.font="27px Arial";ctx.fillText(t("period")+": "+state.years,85,300);
data.forEach((r,i)=>{const y=390+i*135;ctx.fillStyle=i===best?"#d4eadc":"#fff";ctx.fillRect(78,y-50,925,110);ctx.fillStyle="#234e40";ctx.font="bold 32px Arial";ctx.fillText(state.options[i].name.slice(0,23),102,y+6);ctx.textAlign="right";ctx.fillText(EUR(r.total),977,y+6);ctx.textAlign="left";});
ctx.font="23px Arial";ctx.fillStyle="#59776a";ctx.fillText(t("resultsHint").slice(0,65),82,1000);
const a=document.createElement("a");a.download="costalia-comparacion.png";a.href=canvas.toDataURL("image/png");a.click();
}
function notify(message){const el=$("cs-action-note")||$("cs-search-message");if(el)el.textContent=message;}
function perform(action,value){
if(action==="find")return applySearch();
if(action==="years"){state.years=Number(value);return renderTop();}
if(action==="scenario"){state.scenario=value;return renderTop();}
if(action==="add"){if(state.options.length<4)state.options.push(fresh(state.cat,state.options.length));return renderTop();}
if(action==="remove"){if(state.options.length>1)state.options.splice(Number(value),1);return renderTop();}
if(action==="addExpense"){const o=state.options[Number(value)];if(o&&o.expenses.length<100)o.expenses.push({name:"Extra",amount:0,frequency:"year"});state.mode="advanced";return renderTop();}
if(action==="removeExpense"){const parts=value.split(":").map(Number);state.options[parts[0]].expenses.splice(parts[1],1);return renderTop();}
if(action==="reset"){if(confirm(t("resetConfirm"))){state.options=[fresh(state.cat,0),fresh(state.cat,1)];return renderTop()}return;}
if(action==="recalc")return renderResults();
if(action==="print"){document.title=t("reportTitle");window.print();return;}
if(action==="copy")return navigator.clipboard.writeText(shareSummary()).then(()=>notify(t("copied"))).catch(()=>prompt(t("copy"),shareSummary()));
if(action==="share")return navigator.clipboard.writeText(shareUrl()).then(()=>notify(t("copied"))).catch(()=>prompt(t("share"),shareUrl()));
if(action==="visual")return cardImage();
if(action==="save"){const name=prompt(t("namePrompt"),names[locale][cats.indexOf(state.cat)]+" "+new Date().toLocaleDateString());if(!name)return;const items=getSaved();items.unshift({name:name.slice(0,80),date:new Date().toLocaleDateString(),state:clone(state)});if(putSaved(items))notify(t("savedOK"));return renderSaved();}
if(action==="load"){const saved=getSaved()[Number(value)];if(saved){state=clone(saved.state);renderTop();$("cs-main").scrollIntoView({behavior:"smooth"})}return;}
if(action==="delete"){const items=getSaved();items.splice(Number(value),1);putSaved(items);return renderSaved();}
}
root.addEventListener("click",function(e){const btn=e.target.closest("[data-action]");if(!btn||!root.contains(btn))return;perform(btn.dataset.action,btn.dataset.value);});
root.addEventListener("change",function(e){const path=e.target.dataset.path;if(!path)return;
if(path==="cat"){state.cat=e.target.value;state.options=[fresh(state.cat,0),fresh(state.cat,1)];renderTop();return;}
if(path==="mode"){state.mode=e.target.value;renderTop();return;}
writePath(path,e.target);renderResults();
});
root.addEventListener("input",function(e){if(e.target.id==="cs-find")return;const path=e.target.dataset.path;if(!path)return;writePath(path,e.target);renderResults();});
root.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.id==="cs-find")applySearch();});
function writePath(path,input){const parts=path.split(".");let target=state;for(let i=0;i<parts.length-1;i++)target=target[parts[i]];const key=parts[parts.length-1];target[key]=input.type==="number"?(input.value===""?NaN:Number(input.value)):input.value;
if(parts[0]==="options"&&key==="price"){const o=state.options[Number(parts[1])];if(Number.isFinite(o.price)&&o.down>o.price)o.down=o.price;if(Number.isFinite(o.price)&&o.resale>o.price)o.resale=o.price;}
if(parts[0]==="options"&&key==="method"){const o=state.options[Number(parts[1])];o.unitPrice=o.method==="electric"?.25:1.6;o.cons=o.method==="electric"?(state.cat==="escooter"?3:17):state.cat==="motorcycle"?4:6;renderOptions();}
}
const language=$("lang");language.addEventListener("change",()=>{locale=language.value;renderTop();});
try{const u=new URL(location.href).searchParams.get("v2");if(u){const parsed=JSON.parse(u);if(validateState(parsed))state=parsed;}}catch(e){}
renderTop();
})();
