export type Answer=[string,string,string,string];
export type Review={id:string;date:string;merchant:string;amount:number;category:string;answer:Answer;status:string;payer:string;question:string};
const s=(v:unknown)=>String(v??'');
export function answer(r:any[]):Answer{return [s(r[17]),s(r[18]),s(r[19]),s(r[20])];}
function date(v:unknown){return typeof v==='number'?new Date(Math.round((v-25569)*86400000)).toISOString().slice(0,10):s(v);}
export function status(r:any[]):string{return s(r[15])||(/flaggad/i.test(s(r[11]))?'Att granska':'Ej granskad');}
export function reviews(rows:any[][]):Review[]{const seen=new Set<string>();return rows.slice(1).filter(r=>s(r[12])).map(r=>{const id=s(r[12]);if(seen.has(id))throw new Error('Dubblett av Wallet-ID.');seen.add(id);return {id,date:date(r[0]),merchant:s(r[4]),amount:Number(r[5]),category:s(r[8]),answer:answer(r),status:status(r),payer:s(r[3])||'Okänd',question:s(r[16])};});}
export const handled=(r:Review)=>r.status==='Åtgärdad';
export const answered=(r:Review)=>r.status==='Besvarad'||r.answer.some(v=>v.trim());
export const pending=(r:Review)=>r.status==='Att granska'&&!answered(r)&&!handled(r);
export const money=(n:number)=>new Intl.NumberFormat('sv-SE',{style:'currency',currency:'SEK',maximumFractionDigits:2}).format(n);
