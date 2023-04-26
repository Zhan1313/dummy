(()=>{"use strict";const e=["6","7","8","9","10","J","Q","K","A"];class l{constructor(e,l){this.level=e,this.suit=l}}const t=new class{constructor(){this.deck=[]}generateCardsDeck(e,t){for(let s=0;s<t.length;s++)for(let r=0;r<e.length;r++)this.deck.push(new l(e[r],t[s]))}shuffleDeck(){let e=[],l=(t,s)=>{if(t.length<1)return e;let r=Math.floor(Math.random()*s);e.push(t[r]);let n=t.filter((e=>e!==t[r]));l(n,s-1)};l(this.deck,this.deck.length),this.deck=e}takeOneCard(){return this.deck.pop()}putOneCard(e,l){return l.push(e),l}};t.generateCardsDeck(e,["Spades","Clubs","Diamonds","Hearts"]),t.shuffleDeck();const s=((e,l)=>{for(let s=0;s<6;s++){let s=t.takeOneCard();t.putOneCard(s,e),s=t.takeOneCard(),t.putOneCard(s,l)}return[e,l,t.takeOneCard()]})([],[]);let r=s[0],n=s[1],i=s[2];const o=(l,t,s,r,n)=>{for(let i=0;i<e.length;i++)if(l===e[i])for(let l=0;l<e.length;l++)if(s===e[l])return l>i&&t===r||l<=i&&r===n&&t!==n},a=document.querySelector(".wrapper"),c=a.querySelector(".player1"),u=a.querySelector(".player2"),d=a.querySelector(".middleField"),g=d.querySelector(".playField"),v=d.querySelector(".mainDeck"),m=d.querySelector(".finishedCards"),$=a.querySelector(".beaten button"),p=(a.querySelector(".getMoreCards button"),(e,l)=>{c.insertAdjacentHTML("beforeend",`<img src="./assets/${e[l].level}${e[l].suit}.png" \n                    alt="${e[l].level}${e[l].suit}"/>`)}),h=(e,l)=>{u.insertAdjacentHTML("beforeend",`<img src="./assets/${e[l].level}${e[l].suit}.png" \n                    alt="${e[l].level}${e[l].suit}"/>`)},f=e=>{e.remove()},y=(e,l)=>{e.push(l),console.log("this is cards on playField",e),console.log("playField =================")},k=e=>{g.insertAdjacentHTML("afterbegin",`<img src="./assets/${e.level}${e.suit}.png" \n                    alt="${e.level}${e.suit}"/>`)},C=e=>{$.disabled=e},b=(e,l)=>{let t=e.filter((t=>t===e[l]))[0];return console.log("this is defendCard of player2",t),t},S=(e,l)=>{e.splice(l,1),console.log("this is updated Player2Deck",e)},q=(e,l,t,s,r)=>{let n=((e,l)=>{let t=e.filter((t=>t===e[l]))[0];return console.log("this is attacking card",t),t})(r,s);if(((e,l)=>0===e.length||((e,l)=>!!e.find((e=>e.level===l.level)))(e,l))(l,n)){let a=((e,l)=>{let t=e.filter((t=>t!==e[l]));return console.log("this is updated Player1Deck",t),t})(r,s);return f(e),y(l,n),k(n),C(!0),((e,l,t)=>{setTimeout((()=>{for(let s=0;s<l.length;s++){let r=o(e.level,e.suit,l[s].level,l[s].suit,i.suit);if(console.log("player2 wins?",r),console.log("====",s),!0===r){let e=b(l,s);S(l,s);let r=u.querySelectorAll("img")[s];return f(r),y(t,e),k(e),void C(!1)}}let s=g.querySelectorAll("img");1===t.length?(l.push(t[0]),s[0].remove(),((e,l)=>{u.insertAdjacentHTML("beforeend",`<img src="./assets/${e[0].level}${e[0].suit}.png" \n                            alt="${e[0].level}${e[0].suit}"/>`)})(t)):3===t.length?(l.push(t[0],t[1],t[2]),s[0].remove(),s[1].remove(),s[2].remove(),u.insertAdjacentHTML("beforeend",`<img src="./assets/${t[0].level}${t[0].suit}.png" \n                            alt="${t[0].level}${t[0].suit}"/>, \n                            <img src="./assets/${t[1].level}${t[1].suit}.png" \n                            alt="${t[1].level}${t[1].suit}"/>, \n                            <img src="./assets/${t[2].level}${t[2].suit}.png" \n                            alt="${t[2].level}${t[2].suit}"/>`)):5===t.length&&(l.push(t[0],t[1],t[2],t[3],t[4]),s[0].remove(),s[1].remove(),s[2].remove(),s[3].remove(),s[4].remove(),u.insertAdjacentHTML("beforeend",`<img src="./assets/${t[0].level}${t[0].suit}.png" \n                            alt="${t[0].level}${t[0].suit}"/>, \n                            <img src="./assets/${t[1].level}${t[1].suit}.png" \n                            alt="${t[1].level}${t[1].suit}"/>, \n                            <img src="./assets/${t[2].level}${t[2].suit}.png" \n                            alt="${t[2].level}${t[2].suit}"/>, \n                            <img src="./assets/${t[3].level}${t[3].suit}.png" \n                            alt="${t[3].level}${t[3].suit}"/>, \n                            <img src="./assets/${t[4].level}${t[4].suit}.png" \n                            alt="${t[4].level}${t[4].suit}"/>`)),t.splice(0),console.log("this is updated cards on playField",t),console.log("========"),console.log("========")}),2e3)})(n,t,l),a}return e.className="wrongCard",r};((e,l,t,s,r)=>{for(let t=0;t<e.length;t++){p(e,t),console.log("new updated.");let r=c.querySelectorAll("img")[t];r.addEventListener("click",(()=>{let n=c.querySelectorAll("img");console.log("new updated ."),r===n.item(t)?e=q(r,s,l,t,e):r===n.item(t-1)?e=q(r,s,l,t-1,e):r===n.item(t-2)?e=q(r,s,l,t-2,e):r===n.item(t-3)?e=q(r,s,l,t-3,e):r===n.item(t-4)?e=q(r,s,l,t-4,e):r===n.item(t-5)&&(e=q(r,s,l,t-5,e))})),h(l,t)}v.insertAdjacentHTML("afterbegin",`<img src="./assets/${t.level}${t.suit}.png" alt="${t.level}${t.suit}"/>`),$.addEventListener("click",(()=>{let e=g.querySelectorAll("img");0===r.length&&m.insertAdjacentHTML("beforeend",'<img src="assets/CardBack.png" alt="CardBack"/>'),2===s.length?(r.push(s[0],s[1]),e[0].remove(),e[1].remove()):4===s.length?(r.push(s[0],s[1],s[2],s[3]),e[0].remove(),e[1].remove(),e[2].remove(),e[3].remove()):6===s.length&&(r.push(s[0],s[1],s[2],s[3],s[4],s[5]),e[0].remove(),e[1].remove(),e[2].remove(),e[3].remove(),e[4].remove(),e[5].remove()),s.splice(0),console.log("======================="),console.log("this is playField",s),console.log("this is beaten",r),console.log("======================="),$.disabled=!0}))})(r,n,i,[],[])})();