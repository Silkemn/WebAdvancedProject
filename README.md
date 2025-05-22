Cat API

#PROJECTBESCHRIJVING EN FUNCTIONALITEITEN: 

Ik heb een kattenwebsite gemaakt. 
Je kan : 
1)Filteren op ras 
2)Een ras opzoeken
3)Kattenfoto's opslagen bij favorites 
4)Favorites bekijken
5)Een refreshbutton om meer katten te laden

#GEBRUIKTE API:
https://thecatapi.com/ 

#INSTALLATIEHANDLEIDING: 
api_key = "live_0fVuf0Q22tVHszoeEtNZm40Y0zdJ2ku58i9Rl9h5DwRbFiED7KoNPhe1xIvtmSbK" 

    npm run build

    npm run preview


#IMPLEMENTATIE TECHNISCHE VEREISTEN: 
1) DOM manipulatie:
   
   -DOM ELEMENTEN SELECTEREN:
    lijn 6: Document.GetElementById gebruikt om DOM elementen te selecteren. Om de favorites te laten tonen
   - lijn 5, lijn 7, lijn 8
   - ELEMENTEN MANIPULEREN: 
   -  lijn 55: grid.innerHTML = ""; Gebruikt om de elementen te manipuleren en aan te passen.
   -  lijn 76, 77, 78, 79 : elementen aanpassen en aanmaken.
   -  EVENT-LISTENERS KOPPELEN AAN DOM ELEMENTEN
   -  lijn 195 - 215 : 1 element
   -  lijn 85-90 : meerdere elementen 
   - lijn 201: showfavorites.AddEventListener: showfavorites aan een event koppelen.

3) Modern Javascript:
   - CONST:
   - lijn 3: const api-key : const voor niet veranderlijke variabelen
   - lijn 5 - 9
   - lijn 57-58
   - lijn 115-116
   - ...
   - TEMPLATE LITERALS:
   - lijn 108: ${favorite} : om variabelen direct in een string te schrijven
   - lijn 118-122
   - ... 
   - ITERATIES OVER ARRAYS:
   - lijn 85: (".favorites").ForEach: Foreach voor elke kattenfoto een favorite button
   - lijn 73: .map
   - ARRAY METHODES: lijn 85, 73
   - ARROW FUNCTIONS:
   - lijn 85
   - lijn 136 : voor elke ras dat uit de API wordt gehaald voeg ik een optie toe bij de select
   - TERNARY OPERATOR: 
   - lijn 172 - 176 : Als de data er is wordt de html leeg gemaakt
   - CALLBACK FUNCTIONS :
   - lijn 42 - 45 : de favorites wordt naar een eventlistener gestuurd voor als je elke keer op de button clicked
   - PROMISES :
   - lijn 66: als de api server een response stuurt wordt dat omgezet naar json code
   - lijn 69: het wordt omgezet naar data
   - ASYNC & WAIT :
   - lijn 1 : wacht op de code
   - lijn 54: code voor de katten te tonen en op te roepen
   - lijn 103: favorites laden
   - lijn 133: rassen laden
   - lijn 160: filteren op rassen 
   - OBSERVER API :
   - ontbreekt

  4) Data & API :
     FETCH OM DATA OP TE HALEN :
     -lijn 66: als de api server een response stuurt wordt dat omgezet naar json code
     - lijn 69: het wordt omgezet naar data
     - lijn 109: haalt data van de kattenapi
     - lijn 134: haalt de breeds van de kattenapi
     JSON MANIPULEREN EN WEERGEVEN:
     -lijn 15: haalt de opgeslagen favorites op
     -lijn 67: zet de data om naar json
     -lijn 112: zet de data om naar json
  5) Opslag en validatie
     LOCALSTORAGE :
     -lijn 15
     -lijn 19
  6) Styling & layout
     style.css :
     -lijn 45 display grid
     -lijn 52: display flex 
  8) Tooling & structure
     vite
     main.js, src: style.css


#SCREENSHOTS : 
![Screenshot 2025-05-22 143609](https://github.com/user-attachments/assets/a90d7348-7739-43d3-93b2-333f727aa3d7)
![Screenshot 2025-05-22 143626](https://github.com/user-attachments/assets/33114db4-b82e-40eb-b083-ce658c7421f1)

     
