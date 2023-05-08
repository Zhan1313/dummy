(()=>{"use strict";const e=["6","7","8","9","10","J","Q","K","A"];class t{constructor(e,t){this.level=e,this.suit=t}}let l=new class{constructor(){this.deck=[]}generateCardsDeck(e,l){for(let r=0;r<l.length;r++)for(let n=0;n<e.length;n++)this.deck.push(new t(e[n],l[r]))}shuffleDeck(){let e=[],t=(l,r)=>{if(l.length<1)return e;let n=Math.floor(Math.random()*r);e.push(l[n]);let s=l.filter((e=>e!==l[n]));t(s,r-1)};t(this.deck,this.deck.length),this.deck=e}takeOneCard(){return this.deck.pop()}putOneCard(e,t){return t.push(e),t}};l.generateCardsDeck(e,["Spades","Clubs","Diamonds","Hearts"]),l.shuffleDeck();const r=((e,t)=>{for(let r=0;r<6;r++){let r=l.takeOneCard();l.putOneCard(r,e),r=l.takeOneCard(),l.putOneCard(r,t)}return[e,t,l.takeOneCard()]})([],[]);let n=r[0],s=r[1],i=r[2];const o=(t,l,r,n,s)=>{for(let i=0;i<e.length;i++)if(t===e[i])for(let t=0;t<e.length;t++)if(r===e[t])return t>i&&l===n||n===s&&l!==s},a=document.querySelector(".wrapper"),c=a.querySelector(".player1"),d=a.querySelector(".player2"),u=a.querySelector(".player1_Outer"),h=a.querySelector(".yourTurn1"),g=a.querySelector(".middleField"),f=g.querySelector(".playField"),k=g.querySelector(".mainDeck"),p=g.querySelector(".finishedCards"),y=a.querySelector(".beaten button"),m=a.querySelector(".getMoreCards button"),v=e=>e.querySelectorAll("img"),C=(e,t)=>{e.splice(t,1)},S=(e,t)=>{e.push(t)},b=e=>{e.splice(0)},q=e=>{e.remove()},O=(e,t)=>{e.insertAdjacentHTML("beforeend",`<img src="./assets/${t.level}${t.suit}.png" \n                    alt="${t.level}${t.suit}"/>`)},T=(e,t)=>{e.disabled=t},L=(e,t,l,r)=>{let n=e,s=t.indexOf(n);C(t,s);let i=v(l);q(i[s]),S(r,n),O(f,n),T(y,!1)},M=(e,t,l,r,n)=>{setTimeout((()=>{let s=((e,t,l)=>{let r=[];for(let n=0;n<e.length;n++){let s=o(t.level,t.suit,e[n].level,e[n].suit,l.suit);console.log("defence successful?",s),console.log("====",n),s&&(r.push(e[n]),console.log("this is defending cards",r))}return r})(t,l,n);if(1===s.length)L(s[0],t,e,r);else if(s.length>1){let l=((e,t)=>{let l=e.reduce(((e,l)=>o(e.level,e.suit,l.level,l.suit,t.suit)?e:l),e[0]);return console.log("smallest defence card",l),l})(s,n);L(l,t,e,r)}else((e,t,l)=>{((e,t)=>{let l=v(f);for(let r=0;r<e.length;r++)q(l[r]),O(t,e[r])})(e,t),((e,t)=>{for(let l=0;l<e.length;l++)S(t,e[l]);b(e),console.log("========"),console.log("========")})(e,l),T(y,!0),T(m,!1),u.className="player1BackgroundFlashing",h.innerHTML="Ваш ход!!!",h.className="yourTurn"})(r,d,t)}),500)},H=(e,t,l,r,n,s)=>{let i=((e,t)=>{let l=e.filter((l=>l===e[t]))[0];return console.log("this is attacking or defending card",l),l})(r,l);((e,t)=>0===e.length||((e,t)=>!!e.find((e=>e.level===t.level)))(e,t))(t,i)?(C(r,l),q(e),S(t,i),O(f,i),T(y,!0),M(d,n,i,t,s)):e.style.border="2px solid red"},D=(e,t,l,r,n,s,i)=>{let o=v(t);e===o.item(r)?H(e,l,r,n,s,i):e===o.item(r-1)?H(e,l,r-1,n,s,i):e===o.item(r-2)?H(e,l,r-2,n,s,i):e===o.item(r-3)?H(e,l,r-3,n,s,i):e===o.item(r-4)?H(e,l,r-4,n,s,i):e===o.item(r-5)&&H(e,l,r-5,n,s,i)},A=(e,t,l)=>{for(let r=e.length;r<6;r++){let r=l.takeOneCard();l.putOneCard(r,e),O(t,r)}if(e.length>=6)return e},N=(e,t)=>{for(let l=0;l<e.length;l++)O(t,e[l])},$=(e,t,l,r,n)=>{let s=v(t);for(let i=0;i<e.length;i++)s[i].addEventListener("click",(()=>{h.innerHTML="",h.className="yourTurn1",D(s[i],t,l,i,e,r,n)}))};((e,t,l,r,n,s)=>{N(e,c),N(t,d),O(k,l),$(e,c,r,t,l),((e,t)=>{y.addEventListener("click",(()=>{0===e.length&&p.insertAdjacentHTML("beforeend",'<img src="assets/CardBack.png" alt="CardBack"/>');let l=v(f);for(let r=0;r<t.length;r++)S(e,t[r]),q(l[r]);b(t),y.disabled=!0,m.disabled=!1}))})([],r),((e,t,l,r,n)=>{m.addEventListener("click",(()=>(u.className="player1_Outer",0===r.deck.length?(m.innerHTML="Карты закончены",void(m.disabled=!0)):1===r.deck.length?(m.innerHTML="Карты закончены",m.disabled=!0,A(e,c,r),void $(e,c,t,l,n)):(A(e,c,r),l=A(l,d,r),void $(e,c,t,l,n)))))})(e,r,t,s,l)})(n,s,i,[],0,l)})();