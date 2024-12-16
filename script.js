// DICHIARAZIONE VARIABILI GLOBALI
let p = ["P1", "P2", "P3"]; //ARRAY PROCESSI
let at = [3, 2, 5]; //ARRAY TEMPO DI ARRIVO
let bt = [2, 4, 2]; //ARRAY TEMPO DI BURST
let rbt = []; //ARRAY TEMPO DI BURST RIMANENTE
let wt = []; //ARRAY TEMPO DI ATTESA
let op = []; //ARRAY ID o INDICI PROCESSI ORDINATO
let t; //TEMPO DEL PROCESSORE
let idfirst; //ID o INDICE DEL PROCESSO DA ESEGUIRE
let tottime; //TEMPO DI TURNAROUND TOTALE

function reset(){
  let tableEl = document.getElementById("idTable");
  let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
  let newTBodyEl = document.createElement('tbody');

 // 1) La tabella dei processi viene sostituita con una tabella vuota
  tableEl.replaceChild(newTBodyEl, oldTBodyEl);

 // 2) Il tempo di evoluzione t viene inizializzato a 0
  t = 0;

 // 3) Il contenuto dei div relativi ai messaggi di output viene cancellato
  document.getElementById("idTime").innerHTML = "";
  document.getElementById("idStatistics").innerHTML = "";
}

function start(){

 // 1) si inizializzano le variabili relative al tempo del processore t e tottime
   t = 0;
  tottime = 0;

  // 2) si inizializzano gli array rbt, wt, op
  for (let i=0; i<p.length; i++){
    rbt[i] = bt[i];
    op[i] = i;
    wt[i] = 0;
  }

 // 3) si mostra la variabile tempo t
   document.getElementById("idTime").innerHTML = "Tempo: " + t;
 
//4) si inseriscono nel corpo della tabella i dati dei processi (nome, tempo di arrivo, tempo di burst)
let tableEl = document.getElementById("idTable");


let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
let newTBodyEl = document.createElement('tbody');
for(i=0; i<p.length; i++) {
   const trEl = newTBodyEl.insertRow();
   let tdEl = trEl.insertCell();
   tdEl.appendChild(document.createTextNode(p[i]));
   tdEl = trEl.insertCell();
   tdEl.appendChild(document.createTextNode(at[i]));
   tdEl = trEl.insertCell();
 tdEl.appendChild(document.createTextNode(bt[i]));
   tdEl = trEl.insertCell();


 tdEl.id = "idP" + i;
 tdEl.appendChild(document.createTextNode(rbt[i]));


}
 tableEl.replaceChild(newTBodyEl, oldTBodyEl);

  //5) si ordina (Selection sort) l'array op con l'indice dei processi in funzione dell'algoritmo di scheduling scelto
//(FCFS: ordine in base al tempo di arrivo at[i] > at[j])
let j, temp;
console.log(op);
for (i=0;i<p.length - 1;i++)
 for (j=i+1;j<p.length;j++){
   if (at[i] > at[j]) {
     temp=op[i];
     op[i]=op[j];
     op[j]=temp;
   }
 }
console.log("ordine processi: " + op);

  //6) si determina il primo processo da eseguire aggiornando idfirst
idfirst = op[0];

}

function step(){
// 1) si incrementa il tempo ad ogni click
  t++
 // 2) si visualizzano il tempo totale e il tempo di esecuzione del processore
  console.log("tempo" + t);
  console.log("tempo totale" + tottime);

  //3) si verifica se ci sono ancora processi in ready list e si confrontano i processi dell'array p con quelli della ready list; solo un processo diminuirà il rbt, gli altri aumenteranno il wt
  if (op.length>0){
 for (let i = 0; i<p.length; i++) {
   console.log("primo processo: " + idfirst);


   if (at[i]<=t){
     console.log(p[i] + " arrivato");
     if (rbt[i]>0)
     {
       console.log(p[i] + " arrivato con rbt>0");
       if (i==idfirst){
         console.log("processo arrivato ed in esecuzione: " + p[i]);
         rbt[i]-=1;
         document.getElementById("idP"+i).style.backgroundColor = "green";
         document.getElementById("idP"+i).innerHTML = rbt[i];
       }
       else{
         wt[i]+=1;
         console.log("processo arrivato in attesa con tempo rbt>0: " + p[i]);
         document.getElementById("idP"+i).style.backgroundColor = "white";
       }
     }
     else
     {
       console.log("processo terminato " + p[i]);
       document.getElementById("idP"+i).style.backgroundColor = "red";
       if (op.indexOf(i)!=-1){
         console.log("CC");
         op.shift();
         console.log("shift: " + op);
         idfirst = op[0];
       }
     }
   }
   else {
       document.getElementById("idP"+i).style.backgroundColor = "white";
       console.log("processo non arrivato: " + p[i]);
       }
   console.log("----------------")
 }
 document.getElementById("idTime").innerHTML = "Tempo: " + t;




}
else {
 document.getElementById("idTime").innerHTML = "Processi terminati";
 document.getElementById("idStatistics").innerHTML = "Tempo di attesa medio: " + findWaitingTime();
}
console.log("wt " + wt);
console.log("bt " + bt);
console.log("rbt " + rbt);


}

function findWaitingTime() {
  // 1) Si accumula il tempo di attesa totale sommando tutti gli elementi di wt
  let tempoattesatotale = 0;
  for (let i = 0; i < wt.length; i++) {
    totalWaitingTime += wt[i];
  }

  // 2) Si calcola il tempo medio di attesa dividendo per il numero totale di processi
  let averageWaitingTime = totalWaitingTime / wt.length;

  // 3) Restituisce il tempo medio di attesa calcolato
  return averageWaitingTime.toFixed(2); // Con due cifre decimali
}