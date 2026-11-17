export type Answer=[string,string,string,string];
export type Review={id:string;date:string;merchant:string;amount:number;category:string;answer:Answer;status:string;payer:string};
const s=(v:unknown)=>String(v??'');
export function answer(r:any[]):Answer{return [s(r[4]),s(r[5]),s(r[6]),s(r[7])];}
export function reviews(rows:any[][],tx:any[][]):Review[]{const payer=new Map(tx.slice(1).map(r=>[s(r[12]),s(r[3])])); const seen=new Set<string>();return rows.slice(1).filter(r=>s(r[8])).map(r=>{const id=s(r[8]);if(seen.has(id))throw new Error('Dubblett av Wallet-ID i Granskning.');seen.add(id);return {id,date:s(r[0]),merchant:s(r[1]),amount:Number(r[2]),category:s(r[3]),answer:answer(r),status:s(r[9]),payer:payer.get(id)||'Okänd'};});}
export const handled=(r:Review)=>r.status.trim().toLowerCase()==='åtgärdad';
export const answered=(r:Review)=>r.answer.some(v=>v.trim());
export const money=(n:number)=>new Intl.NumberFormat('sv-SE',{style:'currency',currency:'SEK',maximumFractionDigits:2}).format(n);
