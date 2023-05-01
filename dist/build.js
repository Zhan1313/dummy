(()=>{"use strict";const e=["6","7","8","9","10","J","Q","K","A"];class t{constructor(e,t){this.level=e,this.suit=t}}let l=new class{constructor(){this.deck=[]}generateCardsDeck(e,l){for(let s=0;s<l.length;s++)for(let n=0;n<e.length;n++)this.deck.push(new t(e[n],l[s]))}shuffleDeck(){let e=[],t=(l,s)=>{if(l.length<1)return e;let n=Math.floor(Math.random()*s);e.push(l[n]);let r=l.filter((e=>e!==l[n]));t(r,s-1)};t(this.deck,this.deck.length),this.deck=e}takeOneCard(){return this.deck.pop()}putOneCard(e,t){return t.push(e),t}};l.generateCardsDeck(e,["Spades","Clubs","Diamonds","Hearts"]),l.shuffleDeck();const s=((e,t)=>{for(let s=0;s<6;s++){let s=l.takeOneCard();l.putOneCard(s,e),s=l.takeOneCard(),l.putOneCard(s,t)}return[e,t,l.takeOneCard()]})([],[]);let n=s[0],r=s[1],i=s[2];const a=(t,l,s,n,r)=>{for(let i=0;i<e.length;i++)if(t===e[i])for(let t=0;t<e.length;t++)if(s===e[t])return t>i&&l===n||t<=i&&n===r&&l!==r},o=document.querySelector(".wrapper"),c=o.querySelector(".player1"),d=o.querySelector(".player2"),u=o.querySelector(".middleField"),g=u.querySelector(".playField"),$=u.querySelector(".mainDeck"),h=u.querySelector(".finishedCards"),v=o.querySelector(".beaten button"),p=o.querySelector(".getMoreCards button"),m=(e,t)=>{c.insertAdjacentHTML("beforeend",`<img src="./assets/${e[t].level}${e[t].suit}.png" \n                    alt="${e[t].level}${e[t].suit}"/>`),c.style.boxShadow="antiquewhite"},f=(e,t)=>{d.insertAdjacentHTML("beforeend",`<img src="./assets/${e[t].level}${e[t].suit}.png" \n                    alt="${e[t].level}${e[t].suit}"/>`)},y=e=>{e.remove()},k=(e,t)=>{e.push(t),console.log("this is cards on playField",e),console.log("playField =================")},b=(e,t)=>{3===t.length?(g.insertAdjacentHTML("beforeend",`<img src="./assets/${e.level}${e.suit}.png" \n                    alt="${e.level}${e.suit}"/>`),g.querySelectorAll("img")[2].style.marginLeft="10px"):5===t.length?(g.insertAdjacentHTML("beforeend",`<img src="./assets/${e.level}${e.suit}.png" \n                    alt="${e.level}${e.suit}"/>`),g.querySelectorAll("img")[4].style.marginLeft="10px"):g.insertAdjacentHTML("beforeend",`<img src="./assets/${e.level}${e.suit}.png" \n                    alt="${e.level}${e.suit}"/>`)},A=e=>{v.disabled=e},C=(e,t)=>{let l=e.filter((l=>l===e[t]))[0];return console.log("this is defendCard of player2",l),l},L=(e,t)=>{e.splice(t,1),console.log("this is updated Player2Deck",e)},S=(e,t,l,s,n,r)=>{let i=((e,t)=>{let l=e.filter((l=>l===e[t]))[0];return console.log("this is attacking card",l),l})(n,s);((e,t)=>0===e.length||((e,t)=>!!e.find((e=>e.level===t.level)))(e,t))(t,i)?(((e,t)=>{e.splice(t,1),console.log("this is updated Player1Deck",e)})(n,s),y(e),k(t,i),b(i,t),A(!0),((e,t,l,s)=>{setTimeout((()=>{for(let n=0;n<t.length;n++){let r=a(e.level,e.suit,t[n].level,t[n].suit,s.suit);if(console.log("player2 wins?",r),console.log("====",n),!0===r){let e=C(t,n);L(t,n);let s=d.querySelectorAll("img")[n];return y(s),k(l,e),b(e,l),void A(!1)}}let n=g.querySelectorAll("img");((e,t)=>{1===e.length?(y(t[0]),d.insertAdjacentHTML("beforeend",`<img src="./assets/${e[0].level}${e[0].suit}.png" \n                            alt="${e[0].level}${e[0].suit}"/>`)):3===e.length?(y(t[0]),y(t[1]),y(t[2]),d.insertAdjacentHTML("beforeend",`<img src="./assets/${e[0].level}${e[0].suit}.png" \n                            alt="${e[0].level}${e[0].suit}"/>, \n                            <img src="./assets/${e[1].level}${e[1].suit}.png" \n                            alt="${e[1].level}${e[1].suit}"/>, \n                            <img src="./assets/${e[2].level}${e[2].suit}.png" \n                            alt="${e[2].level}${e[2].suit}"/>`)):5===e.length&&(y(t[0]),y(t[1]),y(t[2]),y(t[3]),y(t[4]),d.insertAdjacentHTML("beforeend",`<img src="./assets/${e[0].level}${e[0].suit}.png" \n                            alt="${e[0].level}${e[0].suit}"/>, \n                            <img src="./assets/${e[1].level}${e[1].suit}.png" \n                            alt="${e[1].level}${e[1].suit}"/>, \n                            <img src="./assets/${e[2].level}${e[2].suit}.png" \n                            alt="${e[2].level}${e[2].suit}"/>, \n                            <img src="./assets/${e[3].level}${e[3].suit}.png" \n                            alt="${e[3].level}${e[3].suit}"/>, \n                            <img src="./assets/${e[4].level}${e[4].suit}.png" \n                            alt="${e[4].level}${e[4].suit}"/>`))})(l,n),((e,t)=>{1===e.length?t.push(e[0]):3===e.length?t.push(e[0],e[1],e[2]):5===e.length&&t.push(e[0],e[1],e[2],e[3],e[4]),e.splice(0),console.log("this is updated cards on playField",e),console.log("========"),console.log("========")})(l,t),A(!0),p.disabled=!1}),2e3)})(i,l,t,r)):e.style.border="2px solid red"},q=(e,t,l,s,n,r)=>{let i=c.querySelectorAll("img");e===i.item(s)?S(e,t,l,s,n,r):e===i.item(s-1)?S(e,t,l,s-1,n,r):e===i.item(s-2)?S(e,t,l,s-2,n,r):e===i.item(s-3)?S(e,t,l,s-3,n,r):e===i.item(s-4)?S(e,t,l,s-4,n,r):e===i.item(s-5)&&S(e,t,l,s-5,n,r)};((e,t,l,s,n,r)=>{for(let n=0;n<e.length;n++){m(e,n);let r=c.querySelectorAll("img")[n];r.addEventListener("click",(()=>{q(r,s,t,n,e,l)})),f(t,n)}$.insertAdjacentHTML("afterbegin",`<img src="./assets/${l.level}${l.suit}.png" alt="${l.level}${l.suit}"/>`),v.addEventListener("click",(()=>{let e=g.querySelectorAll("img");0===n.length&&h.insertAdjacentHTML("beforeend",'<img src="assets/CardBack.png" alt="CardBack"/>'),2===s.length?(n.push(s[0],s[1]),e[0].remove(),e[1].remove()):4===s.length?(n.push(s[0],s[1],s[2],s[3]),e[0].remove(),e[1].remove(),e[2].remove(),e[3].remove()):6===s.length&&(n.push(s[0],s[1],s[2],s[3],s[4],s[5]),e[0].remove(),e[1].remove(),e[2].remove(),e[3].remove(),e[4].remove(),e[5].remove()),s.splice(0),console.log("======================="),console.log("this is playField",s),console.log("this is beaten",n),console.log("======================="),v.disabled=!0,p.disabled=!1})),p.addEventListener("click",(()=>{((e,t,l,s,n)=>{if(0===s.deck.length)return p.innerHTML="Cards finished",void(p.disabled=!0);for(let r=e.length;r<6;r++){let i=s.takeOneCard();s.putOneCard(i,e),c.insertAdjacentHTML("beforeend",`<img src="./assets/${i.level}${i.suit}.png"\n                    alt="${i.level}${i.suit}"/>`);let a=c.querySelectorAll("img")[r];a.addEventListener("click",(()=>{q(a,t,l,r,e,n)}))}for(let e=l.length;e<6;e++){let e=s.takeOneCard();s.putOneCard(e,l),d.insertAdjacentHTML("beforeend",`<img src="./assets/${e.level}${e.suit}.png"\n                    alt="${e.level}${e.suit}"/>`)}})(e,s,t,r,l)}))})(n,r,i,[],[],l)})();