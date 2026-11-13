// Costalia server-side product lookup. Set SERPAPI_KEY in Vercel environment settings.
// No credentials are ever sent to the browser. Each button click makes at most one search.
const cache = new Map();
const LIMIT=100, TTL=15*60*1000, MAX=40;
function output(res,status,body){res.statusCode=status;res.setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.setHeader("X-Content-Type-Options","nosniff");res.end(JSON.stringify(body));}
function isUrl(v){try{const u=new URL(v);return u.protocol==="https:";}catch{return false;}}
const accessories=/\b(funda|carcasa|carcasses|case for|cover for|protector|screen protector|cargador|charger|cable|correa|strap|soporte|support|holder|pegatina|sticker|bater[ií]a de repuesto|replacement battery|repuesto|spare part|accesorio|accessory|adaptador|adapter|maqueta|miniatura|toy|juguete|manual|libro|book|poster|lámina|lamina|kit de limpieza)\b/i;
function relevance(q,title){
const tokens=q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(/[^a-z0-9]+/).filter(t=>t.length>1);
const t=title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
return tokens.length && tokens.every(token=>t.includes(token));
}
export default async function handler(req,res){
if(req.method!=="GET")return output(res,405,{error:"method_not_allowed"});
const q=String(req.query?.q||"").trim().replace(/\s+/g," ");
if(q.length<3||q.length>90)return output(res,400,{error:"invalid_query"});
const key=process.env.SERPAPI_KEY;
if(!key)return output(res,503,{error:"not_configured",message:"Configure SERPAPI_KEY in the Costalia Vercel project."});
const now=Date.now();for(const [k,v] of cache){if(now-v.time>TTL)cache.delete(k);}
const ip=String(req.headers["x-forwarded-for"]||req.socket?.remoteAddress||"anonymous").split(",")[0].trim();
const rateKey="ip:"+ip,rate=cache.get(rateKey)||{time:now,count:0};if(now-rate.time>60*1000){rate.count=0;rate.time=now;}rate.count++;cache.set(rateKey,rate);if(rate.count>12)return output(res,429,{error:"rate_limited"});
const queryKey="q:"+q.toLowerCase(),stored=cache.get(queryKey);if(stored&&now-stored.time<TTL)return output(res,200,{...stored.data,cached:true});
try{
const params=new URLSearchParams({engine:"google_shopping",q,gl:"es",hl:"es",location:"Spain",api_key:key,num:"20"});
const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),11000);
let response;try{response=await fetch("https://serpapi.com/search.json?"+params.toString(),{signal:controller.signal});}finally{clearTimeout(timeout);}
if(!response.ok)return output(res,502,{error:"provider_unavailable"});
const json=await response.json();
if(json.error)return output(res,502,{error:"provider_error"});
const items=Array.isArray(json.shopping_results)?json.shopping_results:[];
const products=items.filter(i=>{
const title=String(i.title||"");
const price=Number(i.extracted_price);
const raw=String(i.price||"");
return title&&Number.isFinite(price)&&price>0&&price<1000000&&relevance(q,title)&&!accessories.test(title)&&(!raw||/[€]|EUR|^\d/.test(raw))&&!(i.installment&&/month|mes|\/mo|cuota/i.test(raw));
}).slice(0,MAX).map(i=>({
title:String(i.title).slice(0,170),price:Number(i.extracted_price),currency:"EUR",
source:String(i.source||"Google Shopping").slice(0,100),
url:isUrl(i.product_link)?i.product_link:null,
image:isUrl(i.thumbnail)?i.thumbnail:null,
delivery:String(i.delivery||"").slice(0,120),
condition:String(i.second_hand_condition||"").slice(0,70),
note:"Precio encontrado en Google Shopping. Verifica el precio final, condición y envío en la tienda."
}));
const data={query:q,provider:"Google Shopping via SerpApi",checkedAt:new Date().toISOString(),products};
cache.set(queryKey,{time:now,data});if(cache.size>250){for(const [k,v] of cache){if(k.startsWith("q:")){cache.delete(k);break;}}}
return output(res,200,data);
}catch(e){return output(res,502,{error:"search_failed"});}
}
